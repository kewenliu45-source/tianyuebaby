/**
 * Custom input for portableImage embedded in Portable Text.
 *
 * 职责：
 * 1. 调用 useDocumentPane() 获取 documentId、documentType、onChange
 * 2. 注册编辑器信息到全局 store
 * 3. 渲染默认 UI (renderDefault) + "编辑 Alt" 按钮
 * 4. 点击按钮时打开独立 Dialog
 *
 * 本组件可能在 ObjectEditModal 关闭后 unmount，
 * 但 store 中的数据保留，Dialog 继续工作。
 */

import React, { useCallback, useEffect } from "react";
import { ObjectInputProps } from "sanity";
import { useDocumentPane } from "sanity/structure";
import {
  registerEditor,
  openEditor,
  updateCurrentValue,
} from "./portableImageEditorStore";

export function PortableImageInput(props: ObjectInputProps) {
  const pane = useDocumentPane();
  const imageKey = (props.value as Record<string, any>)?._key;

  // 从 props.path 推导 fieldPath
  const fieldPath = (props.path || []).slice(0, -1).filter(
    (seg) => typeof seg === "string"
  ) as string[];

  // 注册编辑器信息（mount 时和 value 变化时）
  useEffect(() => {
    if (!imageKey) return;
    registerEditor({
      documentId: pane.documentId,
      documentType: pane.documentType,
      onChange: pane.onChange,
      fieldPath,
      imageKey,
      currentValue: (props.value as Record<string, any>) || null,
    });
  }, [imageKey, pane.documentId, pane.documentType, props.value]);

  // 更新当前值（value 变化时）
  useEffect(() => {
    if (imageKey && props.value) {
      updateCurrentValue(props.value as Record<string, any>);
    }
  }, [imageKey, props.value]);

  // 打开自定义 Dialog
  const handleOpenDialog = useCallback(() => {
    if (imageKey) {
      openEditor(imageKey);
    }
  }, [imageKey]);

  return (
    <div>
      {/* 保留 Sanity 默认 UI */}
      {props.renderDefault(props)}

      {/* 自定义按钮：打开独立 Dialog 编辑 Alt */}
      <div style={{ padding: "8px 0" }}>
        <button
          type="button"
          onClick={handleOpenDialog}
          style={{
            background: "none",
            border: "1px solid #999",
            borderRadius: 3,
            padding: "4px 8px",
            cursor: "pointer",
            fontSize: 12,
            color: "#666",
          }}
        >
          用独立窗口编辑 Alt
        </button>
      </div>
    </div>
  );
}
