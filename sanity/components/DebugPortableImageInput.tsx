import React, { useEffect, useRef } from "react";
import { ObjectInputProps } from "sanity";

/**
 * 调试组件：验证 portableImage 编辑面板自动关闭的根因
 *
 * 监控：
 * 1. 组件 mount/unmount 生命周期
 * 2. value 变化时机
 * 3. focused 变化（通过 elementProps）
 */
export function DebugPortableImageInput(props: ObjectInputProps) {
  const renderCount = useRef(0);
  renderCount.current++;
  const renderId = renderCount.current;

  // 1. 监控 mount/unmount
  useEffect(() => {
    console.log(`[PortableImage #${renderId}] ✅ MOUNT`);
    return () => {
      console.log(`[PortableImage #${renderId}] ❌ UNMOUNT`);
    };
  }, []);

  // 2. 监控 value 变化
  const prevValue = useRef(props.value);
  useEffect(() => {
    if (prevValue.current !== props.value) {
      console.log(`[PortableImage #${renderId}] 📝 VALUE CHANGED:`, JSON.stringify({
        prev: prevValue.current,
        next: props.value,
      }));
      prevValue.current = props.value;
    }
  }, [props.value]);

  // 3. 监控 focused 状态
  const prevFocused = useRef(props.focused);
  useEffect(() => {
    if (prevFocused.current !== props.focused) {
      console.log(`[PortableImage #${renderId}] 🎯 FOCUSED CHANGED:`, {
        prev: prevFocused.current,
        next: props.focused,
      });
      prevFocused.current = props.focused;
    }
  }, [props.focused]);

  // 4. 监控 presence 变化
  const prevPresence = useRef(props.presence);
  useEffect(() => {
    if (prevPresence.current !== props.presence) {
      console.log(`[PortableImage #${renderId}] 👁️ PRESENCE CHANGED:`, {
        prevLength: prevPresence.current?.length,
        nextLength: props.presence?.length,
      });
      prevPresence.current = props.presence;
    }
  }, [props.presence]);

  // 每次渲染都打印完整状态
  console.log(`[PortableImage #${renderId}] 🔄 RENDER:`, {
    focused: props.focused,
    readOnly: props.readOnly,
    value: props.value,
    path: props.path?.toString(),
    membersCount: props.members?.length,
  });

  // 使用默认渲染
  return props.renderDefault(props);
}
