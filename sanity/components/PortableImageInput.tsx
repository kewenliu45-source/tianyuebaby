import React, { useCallback, useEffect, useRef, useState } from "react";
import { ObjectInputProps, PatchEvent, set } from "sanity";
import { Stack, Text, TextInput } from "@sanity/ui";

/**
 * 自定义 PortableImage 输入组件
 *
 * 根因：Sanity PTE 在内嵌 object 的值变化时会重新渲染整个节点，
 * 导致编辑 popover 关闭。
 *
 * 方案：alt 字段用本地 state + PatchEvent 精准更新，
 * 只更新 alt 路径，不触发整个 object 的重渲染。
 */
export function PortableImageInput(props: ObjectInputProps) {
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

  // 找到 image 的 member
  const imageMember = (members || []).find(
    (m) => m.kind === "field" && m.name === "image"
  );

  return (
    <Stack space={3}>
      {/* image 字段使用默认渲染 */}
      {imageMember && renderField && renderField(imageMember as any)}

      {/* alt 字段用本地 state，避免触发 PTE 重渲染 */}
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
}
