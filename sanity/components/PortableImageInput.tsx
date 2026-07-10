import React, { useCallback, useEffect, useRef, useState } from "react";
import { ObjectInputProps, PatchEvent, set } from "sanity";
import { Stack, Text, TextInput } from "@sanity/ui";

/**
 * 自定义 PortableImage 输入组件
 * alt 字段用本地 state + PatchEvent 精准更新，避免 PTE 编辑面板关闭
 */
export function PortableImageInput(props: ObjectInputProps) {
  const { value, onChange, members = [], renderField, renderInput } = props;

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
      {/* image 字段使用 renderInput 渲染（比 renderField 更轻量） */}
      {imageMember && renderInput && renderInput(imageMember as any)}

      {/* alt 字段用本地 state */}
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
