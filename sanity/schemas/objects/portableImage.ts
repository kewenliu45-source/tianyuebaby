import { defineField, defineType } from "sanity";
import { StopPropagationInput } from "../../components/StopPropagationInput";

/**
 * 专用于富文本编辑器的图片类型
 * alt 字段使用自定义输入组件，阻止事件冒泡到 PTE 编辑器，
 * 解决编辑内嵌图片时 popover 自动关闭的问题
 */
export const portableImage = defineType({
  name: "portableImage",
  title: "图片",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "图片",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "替代文本",
      type: "string",
      description: "图片加载失败时显示，也是屏幕阅读器读取的内容。",
      validation: (rule) => rule.max(125),
      components: {
        input: StopPropagationInput,
      },
    }),
  ],
  preview: {
    select: {
      media: "image",
      title: "alt",
    },
  },
});
