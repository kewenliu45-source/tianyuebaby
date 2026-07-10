import { defineField, defineType } from "sanity";
import { DebugPortableImageInput } from "../../components/DebugPortableImageInput";

/**
 * 专用于富文本编辑器的图片类型
 * 绕过 imageWithAlt 在 portable text 中上传时的 progress bug
 * 使用 object 类型 + image 字段，而非直接 type: "image"
 */
export const portableImage = defineType({
  name: "portableImage",
  title: "图片",
  type: "object",
  components: {
    input: DebugPortableImageInput,
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
