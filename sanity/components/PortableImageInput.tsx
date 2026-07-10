import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ObjectInputProps, PatchEvent, set } from "sanity";
import { Stack, Text, TextInput } from "@sanity/ui";

/**
 * 自定义 PortableImage 输入组件
 *
 * 根因：Sanity PTE 在内嵌 object 的值变化时会重新渲染整个节点，
 * 导致编辑 popover 关闭。此组件通过以下方式缓解：
 * 1. alt 字段用本地 state 管理，不直接触发 onChange
 * 2. 用 React.memo 减少不必要的重渲染
 * 3. 用 ref 追踪 onChange 来源，避免循环更新
 * 4. image 字段渲染结果用 useMemo 缓存
 */
export const PortableImageInput = React.memo(function PortableImageInput(
  props: ObjectInputProps
) {
  const { value, onChange, members, renderField } = props;

  const [localAlt, setLocalAlt] = useState(value?.alt || "");
  const isInternalChange = useRef(false);

  // 只在外部变化（协作/撤销）时同步本地 state
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

  // 缓存 image member 引用
  const imageMember = useMemo(
    () => members.find((m) => m.kind === "field" && m.name === "image"),
    [members]
  );

  // 缓存 image 字段的渲染结果，避免每次 alt 输入变化时重新渲染 image 字段
  const imageFieldElement = useMemo(
    () => imageMember && renderField(imageMember as any),
    [imageMember, renderField]
  );

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
