import React, { useCallback, useEffect, useRef, useState } from "react";
import { StringInputProps, PatchEvent, set, unset } from "sanity";

/**
 * 自定义字符串输入组件，阻止事件冒泡到 PTE 编辑器
 * 解决 PTE 中内嵌图片编辑时按键导致 popover 关闭的问题
 */
export function StopPropagationInput(props: StringInputProps) {
  const { value = "", onChange, elementProps } = props;

  const [localValue, setLocalValue] = useState(value);
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (!isInternalChange.current) {
      setLocalValue(value);
    }
    isInternalChange.current = false;
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      const next = e.target.value;
      setLocalValue(next);
      isInternalChange.current = true;
      onChange(next ? set(next) : unset());
    },
    [onChange]
  );

  const stop = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      onKeyDown={stop}
      onKeyUp={stop}
      onKeyPress={stop}
      onMouseDown={stop}
      onFocus={stop}
    >
      <input
        {...elementProps}
        type="text"
        value={localValue}
        onChange={handleChange}
      />
    </div>
  );
}
