import { defineField, defineType } from "sanity";

export const medicalServicesPage = defineType({
  name: "medicalServicesPage",
  title: "医疗服务页面",
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

    // ── 页面导语 ──
    defineField({
      name: "introTitle",
      title: "导语标题",
      type: "string",
    }),
    defineField({
      name: "introDescription",
      title: "导语描述",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "introImage",
      title: "导语图片",
      type: "imageWithAlt",
    }),

    // ── 核心服务模块 ──
    defineField({
      name: "serviceSections",
      title: "核心服务模块",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "sectionNumber", title: "编号", type: "string" }),
            defineField({ name: "title", title: "标题", type: "string" }),
            defineField({ name: "subtitle", title: "副标题", type: "string" }),
            defineField({ name: "body", title: "正文", type: "text", rows: 4 }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt" }),
            defineField({
              name: "imagePosition",
              title: "图片位置",
              type: "string",
              options: {
                list: [
                  { title: "左侧", value: "left" },
                  { title: "右侧", value: "right" },
                ],
              },
            }),
            defineField({ name: "buttonText", title: "按钮文字", type: "string" }),
            defineField({ name: "buttonLink", title: "按钮链接", type: "string" }),
            defineField({
              name: "items",
              title: "子项列表",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "标题", type: "string" }),
                    defineField({ name: "description", title: "描述", type: "text" }),
                    defineField({ name: "value", title: "数值", type: "string" }),
                    defineField({ name: "icon", title: "图标", type: "string" }),
                    defineField({ name: "image", title: "图片", type: "imageWithAlt" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),

    // ── 优势 Banner ──
    defineField({
      name: "advantagesTitle",
      title: "优势标题",
      type: "string",
    }),
    defineField({
      name: "advantagesDescription",
      title: "优势描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "advantagesImage",
      title: "优势图片",
      type: "imageWithAlt",
    }),
    defineField({
      name: "advantageItems",
      title: "优势列表",
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

    // ── 相关推荐 ──
    defineField({
      name: "relatedTitle",
      title: "相关推荐标题",
      type: "string",
    }),
    defineField({
      name: "relatedItems",
      title: "相关推荐列表",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string" }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "href", title: "链接", type: "string" }),
          ],
        },
      ],
    }),

    // ── 服务流程 ──
    defineField({
      name: "processTitle",
      title: "服务流程标题",
      type: "string",
    }),
    defineField({
      name: "processDescription",
      title: "服务流程描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "processSteps",
      title: "流程步骤",
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

    // ── Sidebar 精选案例 ──
    defineField({
      name: "sidebarFeaturedCaseTitle",
      title: "侧栏精选案例标题",
      type: "string",
    }),
    defineField({
      name: "sidebarFeaturedCaseDescription",
      title: "侧栏精选案例描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sidebarFeaturedCaseImage",
      title: "侧栏精选案例图片",
      type: "imageWithAlt",
    }),
    defineField({
      name: "sidebarFeaturedCaseLink",
      title: "侧栏精选案例链接",
      type: "string",
    }),

    // ── Sidebar 服务通道 ──
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
      return { title: "医疗服务页面" };
    },
  },
});
