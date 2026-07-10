import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ObjectInputProps, PatchEvent, set } from "sanity";
import { Stack, Text, TextInput } from "@sanity/ui";

/**
 * 自定义 PortableImage 输入组件
 *
 * 根因：Sanity PTE 在内嵌 object 的值变化时会重新渲染整个节点，
 * 导致编辑 popover 关闭。
 *
 * 方案：
 * - alt 字段用本地 state + PatchEvent 精准更新
 * - image 字段用 useMemo 缓存渲染结果，只在 image 本身变化时才重渲染
 * - 这样 alt 输入时不会触发 image 重渲染 → PTE 不会关闭面板
 */
export const PortableImageInput = React.memo(function PortableImageInput(
  props: ObjectInputProps
) {
  const { value, onChange, members = [], renderField } = props;

  const [localAlt, setLocalAlt] = useState(value?.alt || "");
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (!isInternalChange.current) {
      setLocalAlt(value?.alt || "");
    }
    isInternalChange.current = false;
  }, [value?.alt]);

  const handleAltChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      setLocalAlt(next);
      isInternalChange.current = true;
      onChange(PatchEvent.from(set(next, ["alt"])));
    },
    [onChange]
  );

  const imageMember = useMemo(
    () => (members || []).find((m) => m.kind === "field" && m.name === "image"),
    [members]
  );

  // 缓存 image 字段渲染，只在 image 值本身变化时才重新渲染
  // alt 字段变化时不会触发 image 重渲染 → PTE 不会关闭编辑面板
  const imageAssetRef = value?.image?.asset?._ref;
  const imageFieldElement = useMemo(() => {
    if (!imageMember || !renderField) return null;
    return renderField(imageMember as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageMember, renderField, imageAssetRef]);

  return (
    <Stack space={3}>
      {imageFieldElement}

      <Stack space={2}>
        <Text size={1} weight="medium">
          替代文本
        </Text>
        <TextInput
          value={localAlt}
          onChange={handleAltChange}
          placeholder="图片加载失败时显示"
        />
      </Stack>
    </Stack>
  );
});
