import { defineField, defineType } from "sanity";

export const eggSpermFreezingPage = defineType({
  name: "eggSpermFreezingPage",
  title: "冻卵/冻精页面",
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
    defineField({ name: "publishedAt", title: "发布时间", type: "datetime" }),
    defineField({ name: "readingTime", title: "阅读时长", type: "string" }),
    defineField({ name: "authorName", title: "作者姓名", type: "string" }),
    defineField({ name: "authorTitle", title: "作者职称", type: "string" }),
    defineField({ name: "heroPrimaryButtonText", title: "主按钮文字", type: "string" }),
    defineField({ name: "heroPrimaryButtonLink", title: "主按钮链接", type: "string" }),
    defineField({ name: "heroSecondaryButtonText", title: "次按钮文字", type: "string" }),
    defineField({ name: "heroSecondaryButtonLink", title: "次按钮链接", type: "string" }),

    // ── 目录 ──
    defineField({
      name: "tocItems",
      title: "目录项",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
            defineField({ name: "anchor", title: "锚点", type: "string", validation: (r) => r.required() }),
          ],
        },
      ],
    }),

    // ── 正文模块 ──
    defineField({
      name: "contentBlocks",
      title: "正文模块",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "blockType",
              title: "模块类型",
              type: "string",
              options: {
                list: [
                  { title: "图文混排", value: "textImage" },
                  { title: "全宽图片", value: "fullImage" },
                  { title: "信息卡片", value: "infoCard" },
                  { title: "数据统计", value: "stats" },
                  { title: "流程时间线", value: "processTimeline" },
                  { title: "医生简介", value: "doctorProfile" },
                  { title: "案例展示", value: "caseStudy" },
                  { title: "内嵌 CTA", value: "inlineCta" },
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({ name: "anchor", title: "锚点", type: "string" }),
            defineField({ name: "title", title: "标题", type: "string" }),
            defineField({ name: "subtitle", title: "副标题", type: "string" }),
            defineField({ name: "body", title: "正文内容", type: "text", rows: 6 }),
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
            defineField({ name: "caption", title: "图片说明", type: "string" }),
            defineField({
              name: "cardTone",
              title: "卡片色调",
              type: "string",
              options: {
                list: [
                  { title: "蓝色", value: "blue" },
                  { title: "警告", value: "warning" },
                  { title: "成功", value: "success" },
                  { title: "中性", value: "neutral" },
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
                    defineField({ name: "icon", title: "图标名称", type: "string" }),
                    defineField({ name: "image", title: "图片", type: "imageWithAlt" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),

    // ── 医生模块 ──
    defineField({ name: "doctorName", title: "医生姓名", type: "string" }),
    defineField({ name: "doctorTitle", title: "医生职称", type: "string" }),
    defineField({ name: "doctorExperience", title: "医生经历", type: "text", rows: 3 }),
    defineField({
      name: "doctorSpecialties",
      title: "医生专长",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "doctorAvatar", title: "医生头像", type: "imageWithAlt" }),
    defineField({ name: "doctorButtonText", title: "医生按钮文字", type: "string" }),
    defineField({ name: "doctorButtonLink", title: "医生按钮链接", type: "string" }),

    // ── 案例模块 ──
    defineField({
      name: "caseItems",
      title: "案例列表",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
            defineField({ name: "profile", title: "家庭情况", type: "string" }),
            defineField({ name: "story", title: "案例故事", type: "text" }),
            defineField({ name: "resultDescription", title: "结果说明", type: "text", description: "去隐私化，不承诺结果" }),
            defineField({ name: "testimonial", title: "客户感言", type: "text" }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt" }),
          ],
        },
      ],
    }),

    // ── FAQ ──
    defineField({ name: "faqTitle", title: "FAQ - 标题", type: "string" }),
    defineField({ name: "faqDescription", title: "FAQ - 描述", type: "text", rows: 3 }),
    defineField({
      name: "faqItems",
      title: "FAQ 列表",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "问题", type: "string", validation: (r) => r.required() }),
            defineField({ name: "answer", title: "回答", type: "text", validation: (r) => r.required() }),
          ],
        },
      ],
    }),

    // ── Sidebar ──
    defineField({ name: "sidebarTitle", title: "侧边栏标题", type: "string" }),
    defineField({ name: "sidebarDescription", title: "侧边栏描述", type: "text", rows: 3 }),
    defineField({ name: "sidebarPrimaryButtonText", title: "侧边栏主按钮文字", type: "string" }),
    defineField({ name: "sidebarPrimaryButtonLink", title: "侧边栏主按钮链接", type: "string" }),
    defineField({ name: "sidebarSecondaryButtonText", title: "侧边栏次按钮文字", type: "string" }),
    defineField({ name: "sidebarSecondaryButtonLink", title: "侧边栏次按钮链接", type: "string" }),
    defineField({ name: "sidebarPhoneLabel", title: "侧边栏电话标签", type: "string" }),
    defineField({ name: "sidebarPhone", title: "侧边栏电话", type: "string" }),
    defineField({ name: "sidebarWechatText", title: "侧边栏微信文案", type: "string" }),
    defineField({ name: "sidebarWhatsappText", title: "侧边栏 WhatsApp 文案", type: "string" }),
    defineField({
      name: "sidebarHotArticles",
      title: "侧边栏热门文章",
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
    defineField({
      name: "sidebarCountries",
      title: "侧边栏国家列表",
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
  ],
  preview: {
    prepare() {
      return { title: "冻卵/冻精页面" };
    },
  },
});
