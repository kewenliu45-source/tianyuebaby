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
      description:
        "前台位置：富文本正文内嵌图片。是否建议修改：建议改。修改效果：替换正文中的配图。注意：前台按 16:9 显示并使用 object-cover，建议 1280×720、1600×900 或 1920×1080，主体居中。",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "替代文本",
      type: "string",
      description: "图片加载失败时显示，也是屏幕阅读器读取的内容。",
      validation: (rule) => rule.max(125),
    }),
    defineField({
      name: "caption",
      title: "图片说明",
      type: "string",
      description: "可选。显示在图片下方，适合填写图片来源或简短说明。",
    }),
  ],
  preview: {
    select: {
      media: "image",
      title: "alt",
      subtitle: "caption",
    },
  },
});
