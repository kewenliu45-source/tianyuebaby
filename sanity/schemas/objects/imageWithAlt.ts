import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "图片（含替代文本）",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "图片",
      type: "image",
      options: { hotspot: true },
      description:
        "前台位置：被引用的页面/模块中显示。是否建议修改：建议改。修改效果：替换对应位置显示的图片。注意：建议上传宽度 800px 以上的高清图片，支持 JPG/PNG/WebP 格式。\"",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "替代文本（Alt）",
      type: "string",
      description:
        "前台位置：图片加载失败时显示，也是屏幕阅读器读取的内容。是否建议修改：建议改。修改效果：提升无障碍体验和搜索引擎收录。注意：必填，最多 125 字符，简明描述图片内容即可，例如\"天悦宝贝月子中心外景\"。\"",
      validation: (rule) => rule.required().max(125),
    }),
    defineField({
      name: "caption",
      title: "图片说明",
      type: "string",
      description:
        "前台位置：图片下方的小字说明。是否建议修改：可不改。修改效果：在图片底部显示补充说明文字。注意：选填，留空则不显示，适合用于标注图片来源或简要描述。\"",
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
