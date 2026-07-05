import { defineField, defineType } from "sanity";

export const privacyPage = defineType({
  name: "privacyPage",
  title: "隐私政策",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
    }),

    // ── 页面内容 ──
    defineField({
      name: "pageTitle",
      title: "页面标题",
      type: "string",
      initialValue: "隐私政策",
    }),
    defineField({
      name: "content",
      title: "正文内容",
      type: "array",
      of: [
        { type: "block" },
        { type: "imageWithAlt" },
      ],
      description: "隐私政策正文，支持富文本编辑",
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
      return { title: "隐私政策" };
    },
  },
});
