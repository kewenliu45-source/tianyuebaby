import { defineField, defineType } from "sanity";

export const journey = defineType({
  name: "journey",
  title: "助孕流程",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
    }),

    // ── 流程步骤 ──
    defineField({
      name: "stepsTitle",
      title: "流程步骤标题",
      type: "string",
    }),
    defineField({
      name: "steps",
      title: "流程步骤",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string" }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "icon", title: "图标", type: "string" }),
            defineField({ name: "stepNumber", title: "步骤编号", type: "number" }),
            defineField({
              name: "details",
              title: "详细说明",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),

    // ── 注意事项 ──
    defineField({
      name: "notesTitle",
      title: "注意事项标题",
      type: "string",
    }),
    defineField({
      name: "notes",
      title: "注意事项",
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

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "助孕流程" };
    },
  },
});
