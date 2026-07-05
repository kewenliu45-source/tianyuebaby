import { defineField, defineType } from "sanity";

export const successCasesPage = defineType({
  name: "successCasesPage",
  title: "成功案例页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({ name: "pageTitle", title: "页面标题", type: "string" }),
    defineField({ name: "pageDescription", title: "页面描述", type: "text", rows: 3 }),
    defineField({ name: "seo", title: "SEO 设置", type: "seo" }),

    // ── Hero ──
    defineField({ name: "heroTitle", title: "Hero 标题", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero 副标题", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero 描述", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hero 图片", type: "imageWithAlt" }),
    defineField({ name: "heroPrimaryButtonText", title: "主按钮文字", type: "string" }),
    defineField({ name: "heroPrimaryButtonLink", title: "主按钮链接", type: "string" }),

    // ── 时间线 ──
    defineField({ name: "timelineTitle", title: "时间线标题", type: "string" }),
    defineField({
      name: "timelineItems",
      title: "时间线项目",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "年份", type: "string", validation: (r) => r.required() }),
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt" }),
          ],
        },
      ],
    }),

    // ── 列表区 ──
    defineField({ name: "listTitle", title: "列表标题", type: "string" }),
    defineField({ name: "listDescription", title: "列表描述", type: "text", rows: 3 }),

    // ── Sidebar ──
    defineField({ name: "sidebarTitle", title: "侧边栏标题", type: "string" }),
    defineField({ name: "sidebarDescription", title: "侧边栏描述", type: "text", rows: 3 }),
    defineField({ name: "sidebarPrimaryButtonText", title: "侧边栏主按钮文字", type: "string" }),
    defineField({ name: "sidebarPrimaryButtonLink", title: "侧边栏主按钮链接", type: "string" }),
    defineField({ name: "sidebarPhone", title: "侧边栏电话", type: "string" }),
    defineField({
      name: "sidebarHotLinks",
      title: "侧边栏热门链接",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: "sidebarRelatedLinks",
      title: "侧边栏相关链接",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required() }),
          ],
        },
      ],
    }),

    // ── 最终 CTA ──
    defineField({ name: "finalCtaTitle", title: "最终 CTA - 标题", type: "string" }),
    defineField({ name: "finalCtaDescription", title: "最终 CTA - 描述", type: "text", rows: 3 }),
    defineField({ name: "finalCtaPrimaryButtonText", title: "主按钮文字", type: "string" }),
    defineField({ name: "finalCtaPrimaryButtonLink", title: "主按钮链接", type: "string" }),
    defineField({ name: "finalCtaBackgroundImage", title: "背景图片", type: "imageWithAlt" }),
  ],
  preview: {
    prepare() {
      return { title: "成功案例页面" };
    },
  },
});
