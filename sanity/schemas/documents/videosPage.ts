import { defineField, defineType } from "sanity";

export const videosPage = defineType({
  name: "videosPage",
  title: "科普视频页面",
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
    defineField({ name: "heroImage", title: "Hero 背景图", type: "imageWithAlt" }),
    defineField({ name: "heroPrimaryButtonText", title: "主按钮文字", type: "string" }),
    defineField({ name: "heroPrimaryButtonLink", title: "主按钮链接", type: "string" }),

    // ── 推荐区 ──
    defineField({ name: "featuredTitle", title: "推荐区标题", type: "string" }),
    defineField({ name: "featuredDescription", title: "推荐区说明", type: "text", rows: 2 }),

    // ── 视频列表区 ──
    defineField({ name: "listTitle", title: "列表区标题", type: "string" }),
    defineField({ name: "listDescription", title: "列表区说明", type: "text", rows: 3 }),

    // ── 分类筛选 ──
    defineField({
      name: "categoryFilterEnabled",
      title: "启用分类筛选",
      type: "boolean",
      initialValue: true,
    }),

    // ── Sidebar 咨询 ──
    defineField({ name: "sidebarConsultTitle", title: "侧栏咨询标题", type: "string" }),
    defineField({ name: "sidebarConsultDescription", title: "侧栏咨询说明", type: "text", rows: 3 }),
    defineField({ name: "sidebarConsultButtonText", title: "侧栏咨询按钮文字", type: "string" }),
    defineField({ name: "sidebarConsultButtonLink", title: "侧栏咨询按钮链接", type: "string" }),
    defineField({ name: "sidebarPhone", title: "侧栏电话", type: "string" }),
    defineField({
      name: "sidebarHotLinks",
      title: "侧栏热门链接",
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
      title: "侧栏相关链接",
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
    defineField({ name: "finalCtaSecondaryButtonText", title: "次按钮文字", type: "string" }),
    defineField({ name: "finalCtaSecondaryButtonLink", title: "次按钮链接", type: "string" }),
    defineField({ name: "finalCtaBackgroundImage", title: "背景图片", type: "imageWithAlt" }),

    // ── 文案 ──
    defineField({
      name: "emptyStateText",
      title: "空数据提示",
      type: "string",
      description: "无视频时显示的提示文字",
    }),
    defineField({
      name: "playbackErrorText",
      title: "播放失败提示",
      type: "string",
      description: "视频播放失败时显示的提示文字",
    }),
    defineField({
      name: "medicalDisclaimer",
      title: "医疗免责声明",
      type: "text",
      rows: 3,
      description: "视频详情页底部的医疗免责声明",
    }),
  ],
  preview: {
    prepare() {
      return { title: "科普视频页面" };
    },
  },
});
