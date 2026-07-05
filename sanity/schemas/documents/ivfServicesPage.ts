import { defineField, defineType } from "sanity";

export const ivfServicesPage = defineType({
  name: "ivfServicesPage",
  title: "试管服务区域页面",
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
    defineField({ name: "heroSecondaryButtonText", title: "次按钮文字", type: "string" }),
    defineField({ name: "heroSecondaryButtonLink", title: "次按钮链接", type: "string" }),
    defineField({ name: "heroBadges", title: "Hero 标签", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),

    // ── 区域信任条 ──
    defineField({ name: "regionTrustTitle", title: "信任条标题", type: "string" }),
    defineField({
      name: "regionTrustItems",
      title: "信任条数据",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "关键词", type: "string", validation: (r) => r.required() }),
          defineField({ name: "label", title: "说明", type: "string" }),
          defineField({ name: "description", title: "补充描述", type: "string" }),
        ],
      }],
    }),

    // ── 服务覆盖地区 ──
    defineField({ name: "serviceAreasTitle", title: "服务覆盖地区 - 标题", type: "string" }),
    defineField({ name: "serviceAreasDescription", title: "服务覆盖地区 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "serviceAreaItems",
      title: "地区列表",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "地区名称", type: "string", validation: (r) => r.required() }),
          defineField({ name: "subtitle", title: "副标题", type: "string" }),
          defineField({ name: "description", title: "描述", type: "text" }),
          defineField({ name: "serviceHighlights", title: "服务亮点", type: "array", of: [{ type: "string" }] }),
          defineField({ name: "commonNeeds", title: "常见需求", type: "array", of: [{ type: "string" }] }),
          defineField({ name: "image", title: "图片", type: "imageWithAlt" }),
          defineField({ name: "ctaText", title: "按钮文字", type: "string" }),
          defineField({ name: "ctaLink", title: "按钮链接", type: "string" }),
        ],
      }],
    }),

    // ── 不同地区客户如何服务 ──
    defineField({ name: "regionalServiceTitle", title: "地区服务流程 - 标题", type: "string" }),
    defineField({ name: "regionalServiceDescription", title: "地区服务流程 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "regionalServiceSteps",
      title: "服务步骤",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
          defineField({ name: "description", title: "描述", type: "text" }),
          defineField({ name: "icon", title: "图标", type: "string" }),
        ],
      }],
    }),

    // ── 区域服务经验 ──
    defineField({ name: "experienceTitle", title: "区域服务经验 - 标题", type: "string" }),
    defineField({ name: "experienceDescription", title: "区域服务经验 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "experienceItems",
      title: "经验列表",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
          defineField({ name: "description", title: "描述", type: "text" }),
          defineField({ name: "icon", title: "图标", type: "string" }),
        ],
      }],
    }),

    // ── 本地检查与远程咨询流程 ──
    defineField({ name: "remoteProcessTitle", title: "远程咨询流程 - 标题", type: "string" }),
    defineField({ name: "remoteProcessDescription", title: "远程咨询流程 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "remoteProcessSteps",
      title: "流程步骤",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "stepNumber", title: "步骤编号", type: "number", validation: (r) => r.required() }),
          defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
          defineField({ name: "description", title: "描述", type: "text" }),
          defineField({ name: "duration", title: "预计时长", type: "string" }),
        ],
      }],
    }),

    // ── 客户常见需求 ──
    defineField({ name: "needsTitle", title: "常见需求 - 标题", type: "string" }),
    defineField({ name: "needsDescription", title: "常见需求 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "needsItems",
      title: "需求列表",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
          defineField({ name: "description", title: "描述", type: "text" }),
          defineField({ name: "icon", title: "图标", type: "string" }),
        ],
      }],
    }),

    // ── 强转化咨询模块 ──
    defineField({ name: "conversionTitle", title: "转化模块 - 标题", type: "string" }),
    defineField({ name: "conversionDescription", title: "转化模块 - 描述", type: "text", rows: 3 }),
    defineField({ name: "conversionFields", title: "表单字段", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "conversionButtonText", title: "按钮文字", type: "string" }),
    defineField({ name: "conversionImage", title: "配图", type: "imageWithAlt" }),
    defineField({ name: "conversionBackgroundImage", title: "背景图", type: "imageWithAlt" }),

    // ── 区域案例 ──
    defineField({ name: "regionalCasesTitle", title: "区域案例 - 标题", type: "string" }),
    defineField({ name: "regionalCasesDescription", title: "区域案例 - 描述", type: "text", rows: 3 }),
    defineField({
      name: "regionalCaseItems",
      title: "案例列表",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required() }),
          defineField({ name: "city", title: "所在城市", type: "string" }),
          defineField({ name: "profile", title: "家庭情况", type: "string" }),
          defineField({ name: "challenge", title: "面临挑战", type: "text" }),
          defineField({ name: "serviceSupport", title: "服务支持", type: "text" }),
          defineField({ name: "resultDescription", title: "结果说明", type: "text", description: "去隐私化，不承诺结果" }),
          defineField({ name: "image", title: "图片", type: "imageWithAlt" }),
          defineField({ name: "buttonText", title: "按钮文字", type: "string" }),
          defineField({ name: "buttonLink", title: "按钮链接", type: "string" }),
        ],
      }],
    }),

    // ── FAQ ──
    defineField({ name: "faqTitle", title: "FAQ - 标题", type: "string" }),
    defineField({ name: "faqDescription", title: "FAQ - 描述", type: "text", rows: 3 }),
    defineField({
      name: "faqItems",
      title: "FAQ 列表",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", title: "问题", type: "string", validation: (r) => r.required() }),
          defineField({ name: "answer", title: "回答", type: "text", validation: (r) => r.required() }),
        ],
      }],
    }),

    // ── 最终 CTA / 在线预约 ──
    defineField({ name: "appointmentTitle", title: "预约模块 - 标题", type: "string" }),
    defineField({ name: "appointmentDescription", title: "预约模块 - 描述", type: "text", rows: 3 }),
    defineField({ name: "appointmentFields", title: "预约表单字段", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "appointmentButtonText", title: "预约按钮文字", type: "string" }),
    defineField({ name: "appointmentBackgroundImage", title: "预约背景图", type: "imageWithAlt" }),
  ],
  preview: {
    prepare() {
      return { title: "试管服务区域页面" };
    },
  },
});
