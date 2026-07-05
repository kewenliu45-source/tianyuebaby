import { defineField, defineType } from "sanity";

export const bannerSlide = defineType({
  name: "bannerSlide",
  title: "Banner 幻灯片",
  type: "object",
  fields: [
    defineField({
      name: "desktopImage",
      title: "桌面图片",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mobileImage",
      title: "移动端图片",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "alt",
      title: "Alt 文本",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "标题",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "副标题",
      type: "string",
    }),
    defineField({
      name: "buttonText",
      title: "按钮文字",
      type: "string",
    }),
    defineField({
      name: "buttonLink",
      title: "按钮链接",
      type: "string",
    }),
    defineField({
      name: "isActive",
      title: "启用",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "alt",
      media: "desktopImage",
    },
  },
});
