/**
 * 全局 store：管理 portableImage 编辑状态
 *
 * 使用 useSyncExternalStore 模式，不依赖 React 生命周期。
 * PortableImageInput 在 mount 时注册，unmount 后 store 保留数据，
 * Dialog 可以继续使用存储的 onChange 发送 patch。
 */

import { useSyncExternalStore } from "react";
import type { PatchEvent } from "sanity";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface EditorInfo {
  documentId: string;
  documentType: string;
  onChange: (event: PatchEvent) => void;
  fieldPath: string[]; // 例如 ['content']，不含 {_key} 和 'alt'
  imageKey: string;
  currentValue: Record<string, any> | null; // portableImage 的当前值
}

interface StoreState {
  editingImageKey: string | null;
  editorInfo: EditorInfo | null;
}

// ─── Store ─────────────────────────────────────────────────────────────────

let state: StoreState = {
  editingImageKey: null,
  editorInfo: null,
};

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): StoreState {
  return state;
}

// ─── Actions ───────────────────────────────────────────────────────────────

/**
 * 注册编辑器信息（PortableImageInput mount 时调用）
 * 不会自动打开 Dialog，需要配合 openEditor 使用
 */
export function registerEditor(info: EditorInfo): void {
  state = {
    ...state,
    editorInfo: info,
  };
  emitChange();
}

/**
 * 打开编辑器（设置 editingImageKey）
 */
export function openEditor(imageKey: string): void {
  if (state.editingImageKey === imageKey) return; // 已经打开
  state = {
    ...state,
    editingImageKey: imageKey,
  };
  emitChange();
}

/**
 * 关闭编辑器
 */
export function closeEditor(): void {
  if (state.editingImageKey === null) return; // 已经关闭
  state = {
    ...state,
    editingImageKey: null,
  };
  emitChange();
}

/**
 * 更新当前值（PortableImageInput value 变化时调用）
 */
export function updateCurrentValue(value: Record<string, any>): void {
  if (!state.editorInfo) return;
  state = {
    ...state,
    editorInfo: {
      ...state.editorInfo,
      currentValue: value,
    },
  };
  emitChange();
}

// ─── React Hook ────────────────────────────────────────────────────────────

/**
 * 订阅 store 的 React hook
 */
export function usePortableImageEditorStore(): StoreState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
