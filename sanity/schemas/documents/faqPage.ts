import { defineField, defineType } from "sanity";

export const faqPage = defineType({
  name: "faqPage",
  title: "常见问题页面",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
    }),

    // ── 页面标题 ──
    defineField({
      name: "pageTitle",
      title: "页面标题",
      type: "string",
    }),
    defineField({
      name: "pageDescription",
      title: "页面描述",
      type: "text",
      rows: 2,
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
      return { title: "常见问题页面" };
    },
  },
});
