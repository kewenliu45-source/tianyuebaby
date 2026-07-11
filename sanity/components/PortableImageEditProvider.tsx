/**
 * Provider + Dialog：独立于 PortableImageInput 生命周期
 *
 * 挂载在 studio.components.layout，不随 form state 重建而卸载。
 * Dialog 使用 store 中的 onChange（来自 useDocumentPane，ref 模式）发送 patch。
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog, TextInput, Button, Box, Stack, Flex, Text } from "@sanity/ui";
import { PatchEvent, set } from "sanity";
import { urlForImage } from "../lib/image";
import {
  usePortableImageEditorStore,
  closeEditor,
  type EditorInfo,
} from "./portableImageEditorStore";

// ─── Provider ──────────────────────────────────────────────────────────────

interface ProviderProps {
  children: React.ReactNode;
}

export function PortableImageEditProvider({ children }: ProviderProps) {
  const store = usePortableImageEditorStore();

  return (
    <>
      {children}
      {store.editingImageKey && store.editorInfo && (
        <PortableImageEditDialog
          imageKey={store.editingImageKey}
          editorInfo={store.editorInfo}
        />
      )}
    </>
  );
}

// ─── Dialog ────────────────────────────────────────────────────────────────

interface DialogProps {
  imageKey: string;
  editorInfo: EditorInfo;
}

function PortableImageEditDialog({ imageKey, editorInfo }: DialogProps) {
  const renderCount = useRef(0);
  renderCount.current++;
  const renderId = renderCount.current;

  // 本地 alt state
  const [altValue, setAltValue] = useState(
    editorInfo.currentValue?.alt || ""
  );

  // 当 imageKey 或 editorInfo 变化时，同步 alt 值
  useEffect(() => {
    const newAlt = editorInfo.currentValue?.alt || "";
    console.log(
      `[ImageDialog #${renderId}] 🔄 Syncing alt: "${newAlt}" (key=${imageKey})`
    );
    setAltValue(newAlt);
  }, [imageKey, editorInfo.currentValue?.alt]);

  // 生命周期日志
  useEffect(() => {
    console.log(`[ImageDialog #${renderId}] ✅ MOUNT (key=${imageKey})`);
    return () => {
      console.log(`[ImageDialog #${renderId}] ❌ UNMOUNT (key=${imageKey})`);
    };
  }, []);

  // alt 输入处理
  const handleAltChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAlt = e.target.value;
      console.log(`[ImageDialog] Alt changed: "${newAlt}"`);
      setAltValue(newAlt);

      // 构造完整 patch path
      // fieldPath 例如 ['content']
      // 完整 path: ['content', {_key: imageKey}, 'alt']
      const fullPath = [...editorInfo.fieldPath, { _key: imageKey }, "alt"];
      console.log(`[ImageDialog] Patch path:`, fullPath);

      editorInfo.onChange(PatchEvent.from([set(newAlt, fullPath)]));
    },
    [imageKey, editorInfo]
  );

  // 关闭处理
  const handleClose = useCallback(() => {
    console.log(`[ImageDialog] Close requested`);
    closeEditor();
  }, []);

  // 图片预览 URL
  const imageUrl = useMemo(() => {
    const imageValue = editorInfo.currentValue?.image;
    if (!imageValue?.asset) return null;
    try {
      return urlForImage(imageValue).width(400).url();
    } catch {
      return null;
    }
  }, [editorInfo.currentValue?.image]);

  console.log(
    `[ImageDialog #${renderId}] 🔄 RENDER (key=${imageKey}, alt="${altValue}")`
  );

  return (
    <Dialog
      header="编辑图片"
      id="portable-image-edit"
      onClose={handleClose}
      onClickOutside={handleClose}
      width={1}
    >
      <Box padding={4}>
        <Stack space={4}>
          {imageUrl && (
            <Box>
              <img
                src={imageUrl}
                alt={altValue || "预览"}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 4,
                }}
              />
            </Box>
          )}

          <Stack space={2}>
            <Text size={1} weight="medium">
              替代文本（Alt）
            </Text>
            <TextInput
              value={altValue}
              onChange={handleAltChange}
              placeholder="描述图片内容，用于无障碍和SEO"
            />
            <Text size={1} muted>
              图片加载失败时显示，也是屏幕阅读器读取的内容。
            </Text>
          </Stack>

          <Flex justify="flex-end">
            <Button text="完成" onClick={handleClose} tone="primary" />
          </Flex>
        </Stack>
      </Box>
    </Dialog>
  );
}
