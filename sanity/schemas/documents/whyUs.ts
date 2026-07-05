import { defineField, defineType } from "sanity";

export const whyUs = defineType({
  name: "whyUs",
  title: "为什么选择我们",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
    }),

    // ── 机构介绍 ──
    defineField({
      name: "introTitle",
      title: "机构介绍标题",
      type: "string",
    }),
    defineField({
      name: "introContent",
      title: "机构介绍内容",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "introImage",
      title: "机构介绍图片",
      type: "imageWithAlt",
    }),

    // ── 服务优势 ──
    defineField({
      name: "advantagesTitle",
      title: "服务优势标题",
      type: "string",
    }),
    defineField({
      name: "advantages",
      title: "服务优势",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string" }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "icon", title: "图标", type: "string" }),
          ],
        },
      ],
    }),

    // ── 合作资源 ──
    defineField({
      name: "resourcesTitle",
      title: "合作资源标题",
      type: "string",
    }),
    defineField({
      name: "resources",
      title: "合作资源",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "名称", type: "string" }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "logo", title: "Logo", type: "image" }),
          ],
        },
      ],
    }),

    // ── 服务标准 ──
    defineField({
      name: "standardsTitle",
      title: "服务标准标题",
      type: "string",
    }),
    defineField({
      name: "standards",
      title: "服务标准",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string" }),
            defineField({ name: "description", title: "描述", type: "text" }),
          ],
        },
      ],
    }),

    // ── 数据展示 ──
    defineField({
      name: "statsTitle",
      title: "数据展示标题",
      type: "string",
    }),
    defineField({
      name: "stats",
      title: "数据展示",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "数值", type: "string" }),
            defineField({ name: "label", title: "标签", type: "string" }),
          ],
        },
      ],
    }),

    // ── 咨询入口 ──
    defineField({
      name: "cta",
      title: "咨询入口",
      type: "cta",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "为什么选择我们" };
    },
  },
});
