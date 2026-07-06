import { defineField, defineType } from "sanity";

export const aboutTianyuePage = defineType({
  name: "aboutTianyuePage",
  title: "走进天悦宝贝页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({ name: "pageTitle", title: "页面标题", type: "string" }),
    defineField({
      name: "pageDescription",
      title: "页面描述",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "seo", title: "SEO 设置", type: "seo" }),

    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
    }),

    // ── 品牌介绍 ──
    defineField({
      name: "brandTitle",
      title: "品牌介绍标题",
      type: "string",
    }),
    defineField({
      name: "brandDescription",
      title: "品牌介绍描述",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "brandImage",
      title: "品牌介绍图片",
      type: "imageWithAlt",
    }),

    // ── 联系模块 ──
    defineField({
      name: "contactTitle",
      title: "联系模块标题",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "联系电话",
      type: "string",
    }),
    defineField({
      name: "wechatQrCode",
      title: "微信二维码",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "serviceHours",
      title: "服务时间",
      type: "string",
    }),
    defineField({
      name: "consultationNote",
      title: "咨询说明",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: "走进天悦宝贝页面" };
    },
  },
});
