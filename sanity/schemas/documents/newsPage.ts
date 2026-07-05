import { defineField, defineType } from "sanity";

export const newsPage = defineType({
  name: "newsPage",
  title: "新闻资讯页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({
      name: "pageTitle",
      title: "页面标题",
      type: "string",
    }),
    defineField({
      name: "pageDescription",
      title: "页面描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
    }),

    // ── Hero ──
    defineField({
      name: "heroTitle",
      title: "Hero 标题",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero 副标题",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero 描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      title: "Hero 背景图",
      type: "imageWithAlt",
    }),
    defineField({
      name: "heroPrimaryButtonText",
      title: "Hero 主按钮文字",
      type: "string",
    }),
    defineField({
      name: "heroPrimaryButtonLink",
      title: "Hero 主按钮链接",
      type: "string",
    }),

    // ── 品牌历程/时间轴 ──
    defineField({
      name: "timelineTitle",
      title: "品牌历程标题",
      type: "string",
    }),
    defineField({
      name: "timelineDescription",
      title: "品牌历程描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "timelineItems",
      title: "时间轴节点",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "年份", type: "string" }),
            defineField({ name: "title", title: "标题", type: "string" }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt" }),
          ],
        },
      ],
    }),

    // ── Breadcrumb ──
    defineField({
      name: "breadcrumbCurrentLabel",
      title: "面包屑当前页标签",
      type: "string",
    }),

    // ── 列表区 ──
    defineField({
      name: "listTitle",
      title: "列表区标题",
      type: "string",
    }),
    defineField({
      name: "listDescription",
      title: "列表区描述",
      type: "text",
      rows: 3,
    }),

    // ── Sidebar 咨询 ──
    defineField({
      name: "sidebarConsultTitle",
      title: "侧栏咨询标题",
      type: "string",
    }),
    defineField({
      name: "sidebarConsultDescription",
      title: "侧栏咨询描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sidebarConsultButtonText",
      title: "侧栏咨询按钮文字",
      type: "string",
    }),
    defineField({
      name: "sidebarConsultButtonLink",
      title: "侧栏咨询按钮链接",
      type: "string",
    }),

    // ── Sidebar 资源 ──
    defineField({
      name: "sidebarResourceTitle",
      title: "侧栏资源标题",
      type: "string",
    }),
    defineField({
      name: "sidebarResourceDescription",
      title: "侧栏资源描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sidebarResourceImage",
      title: "侧栏资源图片",
      type: "imageWithAlt",
    }),

    // ── Sidebar 专家 ──
    defineField({
      name: "sidebarExpertsTitle",
      title: "侧栏专家标题",
      type: "string",
    }),
    defineField({
      name: "sidebarExpertsDescription",
      title: "侧栏专家描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sidebarExpertItems",
      title: "专家列表",
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

    // ── Sidebar 精选/服务 ──
    defineField({
      name: "sidebarFeaturedTitle",
      title: "侧栏精选案例标题",
      type: "string",
    }),
    defineField({
      name: "sidebarServiceTitle",
      title: "侧栏服务通道标题",
      type: "string",
    }),
    defineField({
      name: "sidebarServiceItems",
      title: "服务通道列表",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string" }),
            defineField({ name: "href", title: "链接", type: "string" }),
            defineField({ name: "icon", title: "图标", type: "string" }),
          ],
        },
      ],
    }),

    // ── 底部品牌沉淀区 ──
    defineField({
      name: "brandSectionTitle",
      title: "品牌沉淀区标题",
      type: "string",
    }),
    defineField({
      name: "brandSectionSubtitle",
      title: "品牌沉淀区副标题",
      type: "string",
    }),
    defineField({
      name: "brandSectionDescription",
      title: "品牌沉淀区描述",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "brandSectionBackgroundImage",
      title: "品牌沉淀区背景图",
      type: "imageWithAlt",
    }),

    // ── 在线咨询区 ──
    defineField({
      name: "consultationTitle",
      title: "在线咨询区标题",
      type: "string",
    }),
    defineField({
      name: "consultationDescription",
      title: "在线咨询区描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "consultationBackgroundImage",
      title: "在线咨询区背景图",
      type: "imageWithAlt",
    }),
  ],
  preview: {
    prepare() {
      return { title: "新闻资讯页面" };
    },
  },
});
