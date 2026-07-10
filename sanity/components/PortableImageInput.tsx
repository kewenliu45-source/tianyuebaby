import React, { useCallback, useEffect, useRef, useState } from "react";
import { ObjectInputProps, PatchEvent, set } from "sanity";
import { Stack, Text, TextInput } from "@sanity/ui";

/**
 * 自定义 PortableImage 输入组件
 *
 * 根因：Sanity PTE 中内嵌图片编辑时，按键事件冒泡到编辑器，
 * 触发焦点/重渲染循环，导致 popover 关闭。
 *
 * 方案：在 alt 输入框上 stopPropagation() 阻止事件冒泡。
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
      e.stopPropagation();
      const next = e.target.value;
      setLocalAlt(next);
      isInternalChange.current = true;
      onChange(PatchEvent.from(set(next, ["alt"])));
    },
    [onChange]
  );

  // 阻止所有键盘事件冒泡到 PTE
  const stopPropagation = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  const imageMember = (members || []).find(
    (m) => m.kind === "field" && m.name === "image"
  );

  return (
    <Stack space={3}>
      {/* image 字段使用默认渲染 */}
      {imageMember && renderField && renderField(imageMember as any)}

      {/* alt 字段 - 阻止事件冒泡 */}
      <Stack space={2}>
        <Text size={1} weight="medium">
          替代文本
        </Text>
        <div
          onKeyDown={stopPropagation}
          onKeyUp={stopPropagation}
          onKeyPress={stopPropagation}
          onMouseDown={stopPropagation}
          onFocus={stopPropagation}
        >
          <TextInput
            value={localAlt}
            onChange={handleAltChange}
            placeholder="图片加载失败时显示"
          />
        </div>
      </Stack>
    </Stack>
  );
}
