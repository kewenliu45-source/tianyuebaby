import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "首页",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
    }),

    // ── 首屏 Hero 图 ──
    defineField({
      name: "heroImage",
      title: "首屏 Hero 图",
      type: "imageWithAlt",
      description: "首页首屏大图，建议上传 2400×1200 px、WebP/JPG 格式、300KB 以内",
    }),

    // ── 品牌简介 ──
    defineField({
      name: "brandIntroTitle",
      title: "品牌简介标题",
      type: "string",
    }),
    defineField({
      name: "brandIntroContent",
      title: "品牌简介内容",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "brandIntroImage",
      title: "品牌简介图片",
      type: "imageWithAlt",
    }),

    // ── 第三代试管服务介绍 ──
    defineField({
      name: "ivfTitle",
      title: "第三代试管服务标题",
      type: "string",
    }),
    defineField({
      name: "ivfDescription",
      title: "第三代试管服务描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ivfFeatures",
      title: "服务特点",
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

    // ── 核心优势 ──
    defineField({
      name: "advantagesTitle",
      title: "核心优势标题",
      type: "string",
    }),
    defineField({
      name: "advantages",
      title: "核心优势",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string" }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "icon", title: "图标", type: "string" }),
            defineField({ name: "color", title: "颜色", type: "string", options: { list: ["pink", "purple", "yellow", "green"] } }),
          ],
        },
      ],
    }),

    // ── 助孕流程摘要 ──
    defineField({
      name: "journeyTitle",
      title: "助孕流程标题",
      type: "string",
    }),
    defineField({
      name: "journeySteps",
      title: "流程步骤",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string" }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "stepNumber", title: "步骤编号", type: "number" }),
          ],
        },
      ],
    }),

    // ── 服务数据 ──
    defineField({
      name: "statsTitle",
      title: "服务数据标题",
      type: "string",
    }),
    defineField({
      name: "stats",
      title: "服务数据",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "数值", type: "string" }),
            defineField({ name: "label", title: "标签", type: "string" }),
            defineField({ name: "description", title: "描述", type: "string" }),
          ],
        },
      ],
    }),

    // ── 新闻推荐 ──
    defineField({
      name: "newsTitle",
      title: "新闻推荐标题",
      type: "string",
    }),
    defineField({
      name: "featuredNewsCount",
      title: "推荐新闻数量",
      type: "number",
      initialValue: 3,
    }),

    // ── 常见问题精选 ──
    defineField({
      name: "faqTitle",
      title: "常见问题标题",
      type: "string",
    }),
    defineField({
      name: "featuredFaqCount",
      title: "精选问题数量",
      type: "number",
      initialValue: 5,
    }),

    // ── 咨询行动区 ──
    defineField({
      name: "cta",
      title: "咨询行动区",
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
      return { title: "首页" };
    },
  },
});
