import { defineField, defineType } from "sanity";

/**
 * 专用于富文本编辑器的图片类型
 * 绕过 imageWithAlt 在 portable text 中上传时的 progress bug
 */
export const portableImage = defineType({
  name: "portableImage",
  title: "图片",
  type: "image",
  options: { hotspot: true },
  fields: [
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
      media: "asset",
      title: "alt",
    },
  },
});
