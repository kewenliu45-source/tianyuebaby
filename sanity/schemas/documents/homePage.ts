import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "首页",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
    }),

    // ── 首屏 Hero 图 ──
    defineField({
      name: "heroImage",
      title: "首屏 Hero 图",
      type: "imageWithAlt",
      description: "首页首屏大图，建议上传 2400×1200 px、WebP/JPG 格式、300KB 以内",
    }),
    defineField({
      name: "hero",
      title: "专业首屏",
      type: "object",
      description: "填写后优先使用；未填写图片时继续使用旧首屏图片",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "isEnabled", title: "显示首屏", type: "boolean", initialValue: true }),
        defineField({
          name: "desktopImage",
          title: "桌面端大图",
          type: "imageWithAlt",
          description: "建议 2400×1200 px，人物或视觉主体位于右侧，500KB 以内",
        }),
        defineField({
          name: "mobileImage",
          title: "移动端大图",
          type: "imageWithAlt",
          description: "建议 900×1200 px，主体居中，300KB 以内",
        }),
        defineField({
          name: "overlayStrength",
          title: "文字区遮罩强度",
          type: "number",
          initialValue: 72,
          validation: (rule) => rule.min(35).max(90),
        }),
        defineField({ name: "eyebrow", title: "眉题", type: "string" }),
        defineField({
          name: "title",
          title: "主标题",
          type: "string",
          validation: (rule) => rule.max(42),
        }),
        defineField({ name: "description", title: "专业说明", type: "text", rows: 3 }),
        defineField({ name: "primaryButtonText", title: "主按钮文字", type: "string" }),
        defineField({ name: "primaryButtonLink", title: "主按钮链接", type: "string" }),
        defineField({ name: "secondaryButtonText", title: "次按钮文字", type: "string" }),
        defineField({ name: "secondaryButtonLink", title: "次按钮链接", type: "string" }),
        defineField({
          name: "badges",
          title: "专业能力标签",
          type: "array",
          validation: (rule) => rule.max(4),
          of: [{ type: "string" }],
        }),
        defineField({
          name: "stats",
          title: "首屏数据栏",
          type: "array",
          validation: (rule) => rule.max(4),
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "value", title: "数值", type: "string" }),
                defineField({ name: "label", title: "说明", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "expertiseSection",
      title: "专业能力多图区",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "isEnabled",
          title: "显示此模块",
          type: "boolean",
          initialValue: true,
        }),
        defineField({ name: "eyebrow", title: "眉题", type: "string" }),
        defineField({ name: "title", title: "标题", type: "string" }),
        defineField({ name: "description", title: "机构介绍", type: "text", rows: 4 }),
        defineField({
          name: "capabilities",
          title: "专业能力",
          type: "array",
          validation: (rule) => rule.max(4),
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "标题", type: "string" }),
                defineField({ name: "description", title: "说明", type: "string" }),
              ],
            },
          ],
        }),
        defineField({ name: "buttonText", title: "按钮文字", type: "string" }),
        defineField({ name: "buttonLink", title: "按钮链接", type: "string" }),
        defineField({
          name: "mainImage",
          title: "团队/专家主图",
          type: "imageWithAlt",
          description: "建议 1200×1500 px",
        }),
        defineField({
          name: "secondaryImage",
          title: "实验室辅助图",
          type: "imageWithAlt",
          description: "建议 1000×700 px",
        }),
        defineField({
          name: "tertiaryImage",
          title: "咨询场景辅助图",
          type: "imageWithAlt",
          description: "建议 1000×700 px",
        }),
      ],
    }),

    defineField({
      name: "servicesSection",
      title: "快速服务入口",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "isEnabled",
          title: "显示此模块",
          type: "boolean",
          initialValue: true,
        }),
        defineField({ name: "title", title: "标题", type: "string" }),
        defineField({ name: "description", title: "说明", type: "text", rows: 2 }),
        defineField({
          name: "items",
          title: "服务卡片（可拖动排序）",
          type: "array",
          validation: (rule) => rule.max(6),
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "isEnabled",
                  title: "显示",
                  type: "boolean",
                  initialValue: true,
                }),
                defineField({
                  name: "image",
                  title: "图片",
                  type: "imageWithAlt",
                  description: "建议 1200×800 px，500KB 以内",
                }),
                defineField({ name: "title", title: "标题", type: "string" }),
                defineField({ name: "audience", title: "适用人群", type: "string" }),
                defineField({ name: "description", title: "简短说明", type: "text", rows: 2 }),
                defineField({ name: "buttonText", title: "按钮文字", type: "string" }),
                defineField({ name: "buttonLink", title: "按钮链接", type: "string" }),
              ],
              preview: { select: { title: "title", subtitle: "audience", media: "image.image" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "sectionVisibility",
      title: "后续模块显示设置",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "advantages",
          title: "显示核心优势",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "journey",
          title: "显示服务流程",
          type: "boolean",
          initialValue: true,
        }),
        defineField({ name: "stats", title: "显示服务数据", type: "boolean", initialValue: true }),
        defineField({ name: "news", title: "显示新闻资讯", type: "boolean", initialValue: true }),
        defineField({ name: "faq", title: "显示常见问题", type: "boolean", initialValue: true }),
        defineField({ name: "cta", title: "显示咨询行动区", type: "boolean", initialValue: true }),
      ],
    }),

    // ── 品牌简介 ──
    defineField({
      name: "brandIntroTitle",
      title: "品牌简介标题",
      type: "string",
    }),
    defineField({
      name: "brandIntroContent",
      title: "品牌简介内容",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "brandIntroImage",
      title: "品牌简介图片",
      type: "imageWithAlt",
    }),

    // ── 第三代试管服务介绍 ──
    defineField({
      name: "ivfTitle",
      title: "第三代试管服务标题",
      type: "string",
    }),
    defineField({
      name: "ivfDescription",
      title: "第三代试管服务描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ivfFeatures",
      title: "服务特点",
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

    // ── 核心优势 ──
    defineField({
      name: "advantagesTitle",
      title: "核心优势标题",
      type: "string",
    }),
    defineField({
      name: "advantagesDescription",
      title: "核心优势说明",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "advantagesMainImage",
      title: "核心优势主图（左侧场景图）",
      type: "imageWithAlt",
      description: "建议 1200×900 px，团队/咨询/服务场景",
    }),
    defineField({
      name: "advantages",
      title: "核心优势（可拖动排序）",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string" }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "icon", title: "图标", type: "string" }),
            defineField({
              name: "color",
              title: "颜色",
              type: "string",
              options: { list: ["pink", "purple", "yellow", "green"] },
            }),
            defineField({ name: "image", title: "小图片", type: "imageWithAlt", description: "建议 400×300 px" }),
            defineField({ name: "isEnabled", title: "显示", type: "boolean", initialValue: true }),
          ],
        },
      ],
    }),

    // ── 助孕流程摘要 ──
    defineField({
      name: "journeyTitle",
      title: "助孕流程标题",
      type: "string",
    }),
    defineField({
      name: "journeyDescription",
      title: "助孕流程说明",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "journeyMainImage",
      title: "助孕流程主图（左侧场景图）",
      type: "imageWithAlt",
      description: "建议 1200×900 px，顾问沟通/资料评估场景",
    }),
    defineField({
      name: "journeyImageOverlay",
      title: "图片叠加文案",
      type: "string",
      description: '显示在流程主图上的短文案，如"专属顾问全程陪伴"',
    }),
    defineField({
      name: "journeyButtonText",
      title: "图片叠加按钮文字",
      type: "string",
    }),
    defineField({
      name: "journeyButtonLink",
      title: "图片叠加按钮链接",
      type: "string",
    }),
    defineField({
      name: "journeySteps",
      title: "流程步骤（可拖动排序）",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string" }),
            defineField({ name: "description", title: "描述", type: "text" }),
            defineField({ name: "stepNumber", title: "步骤编号", type: "number" }),
            defineField({ name: "icon", title: "图标", type: "string" }),
            defineField({ name: "isEnabled", title: "显示", type: "boolean", initialValue: true }),
          ],
        },
      ],
    }),

    // ── 服务数据 ──
    defineField({
      name: "statsTitle",
      title: "服务数据标题",
      type: "string",
    }),
    defineField({
      name: "statsDescription",
      title: "服务数据说明",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "statsBackgroundImage",
      title: "数据区背景图",
      type: "imageWithAlt",
      description: "建议 2400×1200 px，家庭/新生儿/团队场景",
    }),
    defineField({
      name: "statsButtonText",
      title: "数据区按钮文字",
      type: "string",
    }),
    defineField({
      name: "statsButtonLink",
      title: "数据区按钮链接",
      type: "string",
    }),
    defineField({
      name: "stats",
      title: "服务数据（可拖动排序）",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "数值", type: "string" }),
            defineField({ name: "label", title: "标签", type: "string" }),
            defineField({ name: "description", title: "描述", type: "string" }),
          ],
        },
      ],
    }),

    // ── 新闻推荐 ──
    defineField({
      name: "newsTitle",
      title: "新闻推荐标题",
      type: "string",
    }),
    defineField({
      name: "featuredNewsCount",
      title: "推荐新闻数量",
      type: "number",
      initialValue: 3,
    }),
    defineField({
      name: "featuredNews",
      title: "首页新闻选稿",
      type: "array",
      description:
        "手动选择最多 7 篇新闻，支持拖动排序。第 1 篇为主新闻（中间 4:5 封面），第 2、3、4 篇在左侧，第 5、6、7 篇在右侧。未配置时自动回退为最新推荐新闻。",
      validation: (rule) => rule.max(7).unique(),
      of: [
        {
          type: "reference",
          to: [{ type: "newsArticle" }],
          options: { disableNew: true },
        },
      ],
      options: {
        sortable: true,
      },
    }),

    // ── 常见问题精选 ──
    defineField({
      name: "faqTitle",
      title: "常见问题标题",
      type: "string",
    }),
    defineField({
      name: "featuredFaqCount",
      title: "精选问题数量",
      type: "number",
      initialValue: 5,
    }),

    // ── 咨询行动区 ──
    defineField({
      name: "cta",
      title: "咨询行动区",
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
      return { title: "首页" };
    },
  },
});
