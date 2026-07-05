import { defineField, defineType } from "sanity";

export const thirdGenerationIvfPage = defineType({
  name: "thirdGenerationIvfPage",
  title: "三代试管婴儿页面",
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
    defineField({ name: "heroTitle", title: "Hero 标题", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero 副标题", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero 描述", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hero 图片", type: "imageWithAlt" }),
    defineField({ name: "heroPrimaryButtonText", title: "主按钮文字", type: "string" }),
    defineField({ name: "heroPrimaryButtonLink", title: "主按钮链接", type: "string" }),
    defineField({ name: "heroSecondaryButtonText", title: "次按钮文字", type: "string" }),
    defineField({ name: "heroSecondaryButtonLink", title: "次按钮链接", type: "string" }),
    defineField({
      name: "heroBadges",
      title: "Hero 标签",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "heroFormTitle", title: "Hero 表单标题", type: "string" }),
    defineField({
      name: "heroFormFields",
      title: "Hero 表单字段",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "heroFormButtonText", title: "Hero 表单按钮文字", type: "string" }),

    // ── Trust Bar ──
    defineField({
      name: "trustItems",
      title: "数据背书",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "数值/关键词", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "说明", type: "string" }),
            defineField({ name: "description", title: "补充描述", type: "string" }),
          ],
        },
      ],
    }),

    // ── 为什么选择我们 ──
    defineField({ name: "whyChooseTitle", title: "为什么选择我们 - 标题", type: "string" }),
    defineField({ name: "whyChooseDescription", title: "为什么选择我们 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "whyChooseItems",
      title: "优势列表",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "icon", title: "图标名称", type: "string", description: "如 users, heart, shield, award" }),
          ],
        },
      ],
    }),

    // ── 核心服务 ──
    defineField({ name: "servicesTitle", title: "核心服务 - 标题", type: "string" }),
    defineField({ name: "servicesDescription", title: "核心服务 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "serviceItems",
      title: "服务列表",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt" }),
            defineField({
              name: "points",
              title: "要点",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),

    // ── 合作医院 ──
    defineField({ name: "hospitalsTitle", title: "合作医院 - 标题", type: "string" }),
    defineField({ name: "hospitalsDescription", title: "合作医院 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "hospitalItems",
      title: "医院/资源列表",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "名称", type: "string", validation: (r) => r.required() }),
            defineField({ name: "location", title: "所在地", type: "string" }),
            defineField({ name: "description", title: "简介", type: "text" }),
            defineField({ name: "image", title: "图片/Logo", type: "imageWithAlt" }),
            defineField({
              name: "tags",
              title: "标签",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            }),
          ],
        },
      ],
    }),

    // ── 专家团队 ──
    defineField({ name: "expertsTitle", title: "专家团队 - 标题", type: "string" }),
    defineField({ name: "expertsDescription", title: "专家团队 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "expertItems",
      title: "专家/顾问列表",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "姓名/角色", type: "string", validation: (r) => r.required() }),
            defineField({ name: "title", title: "职称", type: "string" }),
            defineField({ name: "description", title: "简介", type: "text" }),
            defineField({ name: "avatar", title: "头像", type: "imageWithAlt" }),
            defineField({
              name: "specialties",
              title: "专长领域",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            }),
          ],
        },
      ],
    }),

    // ── 服务流程 ──
    defineField({ name: "processTitle", title: "服务流程 - 标题", type: "string" }),
    defineField({ name: "processDescription", title: "服务流程 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "processSteps",
      title: "流程步骤",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "stepNumber", title: "步骤编号", type: "number", validation: (r) => r.required() }),
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "duration", title: "预计时长", type: "string" }),
          ],
        },
      ],
    }),

    // ── 真实案例 ──
    defineField({ name: "casesTitle", title: "真实案例 - 标题", type: "string" }),
    defineField({ name: "casesDescription", title: "真实案例 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "caseItems",
      title: "案例列表",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
            defineField({ name: "profile", title: "家庭情况", type: "string", description: "如：高龄备孕家庭" }),
            defineField({ name: "summary", title: "案例概述", type: "text" }),
            defineField({ name: "resultDescription", title: "结果说明", type: "text", description: "去隐私化，不承诺结果" }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt" }),
          ],
        },
      ],
    }),

    // ── 客户评价 ──
    defineField({ name: "testimonialsTitle", title: "客户评价 - 标题", type: "string" }),
    defineField({ name: "testimonialsDescription", title: "客户评价 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "testimonialItems",
      title: "评价列表",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "displayName", title: "显示名称", type: "string" }),
            defineField({ name: "profile", title: "身份描述", type: "string" }),
            defineField({ name: "content", title: "评价内容", type: "text", validation: (r) => r.required() }),
            defineField({ name: "rating", title: "评分(1-5)", type: "number" }),
            defineField({ name: "avatar", title: "头像", type: "imageWithAlt" }),
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
      return { title: "三代试管婴儿页面" };
    },
  },
});
