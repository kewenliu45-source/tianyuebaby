import { defineField, defineType } from "sanity";

export const intendedParents = defineType({
  name: "intendedParents",
  title: "关于准父母",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
    }),

    // ── 适合人群 ──
    defineField({
      name: "suitableForTitle",
      title: "适合人群标题",
      type: "string",
    }),
    defineField({
      name: "suitableForItems",
      title: "适合人群",
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

    // ── 常见需求 ──
    defineField({
      name: "needsTitle",
      title: "常见需求标题",
      type: "string",
    }),
    defineField({
      name: "needsItems",
      title: "常见需求",
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

    // ── 准备事项 ──
    defineField({
      name: "preparationTitle",
      title: "准备事项标题",
      type: "string",
    }),
    defineField({
      name: "preparationItems",
      title: "准备事项",
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

    // ── 服务边界 ──
    defineField({
      name: "boundariesTitle",
      title: "服务边界标题",
      type: "string",
    }),
    defineField({
      name: "boundariesContent",
      title: "服务边界内容",
      type: "text",
      rows: 4,
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
      return { title: "关于准父母" };
    },
  },
});
