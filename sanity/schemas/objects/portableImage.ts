import { defineField, defineType } from "sanity";
import { PortableImageInput } from "../../components/PortableImageInput";

/**
 * 专用于富文本编辑器的图片类型
 * 使用独立 Dialog 管理编辑状态，不依赖 Sanity 的 member.open
 */
export const portableImage = defineType({
  name: "portableImage",
  title: "图片",
  type: "object",
  options: {
    modal: { type: "dialog" },
  },
  components: {
    input: PortableImageInput,
  },
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
    }),
  ],
  preview: {
    select: {
      media: "image",
      title: "alt",
    },
  },
});
