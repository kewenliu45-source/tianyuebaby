import { defineField, defineType } from "sanity";

/**
 * Image member used inside Portable Text.
 *
 * Keep this as Sanity's native image type. Wrapping image in a custom object
 * causes the Portable Text edit dialog to be recreated during upload progress
 * patches, which closes the editor while users upload or edit inline images.
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
