import { defineField, defineType } from "sanity";

export const whyUs = defineType({
  name: "whyUs",
  title: "为什么选择我们",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
      description: '前台位置：页面顶部轮播大图。是否建议修改：建议改。修改效果：影响页面首屏视觉。注意：建议 1-3 张，桌面图 1920×600px。',
    }),

    // ── 机构介绍 ──
    defineField({
      name: "introTitle",
      title: "机构介绍标题",
      type: "string",
      description: '前台位置：机构介绍模块标题。是否建议修改：建议改。修改效果：模块主标题。注意：建议不超过 20 字。',
    }),
    defineField({
      name: "introContent",
      title: "机构介绍内容",
      type: "text",
      rows: 4,
      description: '前台位置：机构介绍正文。是否建议修改：建议改。修改效果：详细介绍机构背景和优势。注意：建议 100-300 字。',
    }),
    defineField({
      name: "introImage",
      title: "机构介绍图片",
      type: "imageWithAlt",
      description: '前台位置：机构介绍配图。是否建议修改：建议改。修改效果：增强机构介绍的视觉展示。注意：建议 800×600px。',
    }),

    // ── 服务优势 ──
    defineField({
      name: "advantagesTitle",
      title: "服务优势标题",
      type: "string",
      description: '前台位置：服务优势模块标题。是否建议修改：可不改。修改效果：模块主标题。',
    }),
    defineField({
      name: "advantages",
      title: "服务优势",
      type: "array",
      description: '前台位置：服务优势卡片列表。是否建议修改：建议改。修改效果：展示服务优势。注意：建议 3-6 项。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", description: '前台位置：优势卡片标题。是否建议修改：建议改。修改效果：展示优势名称。' }),
            defineField({ name: "description", title: "描述", type: "text", description: '前台位置：优势卡片描述。是否建议修改：建议改。修改效果：详细说明优势内容。' }),
            defineField({ name: "icon", title: "图标", type: "string", description: '前台位置：优势卡片图标。是否建议修改：谨慎改。修改效果：改变卡片图标。注意：使用系统提供的图标名称。' }),
          ],
        },
      ],
    }),

    // ── 合作资源 ──
    defineField({
      name: "resourcesTitle",
      title: "合作资源标题",
      type: "string",
      description: '前台位置：合作资源模块标题。是否建议修改：可不改。修改效果：模块主标题。',
    }),
    defineField({
      name: "resources",
      title: "合作资源",
      type: "array",
      description: '前台位置：合作资源卡片列表。是否建议修改：建议改。修改效果：展示合作机构信息。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "名称", type: "string", description: '前台位置：资源卡片名称。是否建议修改：建议改。修改效果：展示合作机构名称。' }),
            defineField({ name: "description", title: "描述", type: "text", description: '前台位置：资源卡片描述。是否建议修改：建议改。修改效果：详细介绍合作机构。' }),
            defineField({ name: "logo", title: "Logo", type: "image", description: '前台位置：资源卡片 Logo。是否建议修改：建议改。修改效果：展示合作机构形象。注意：建议 200×200px 正方形 PNG。' }),
          ],
        },
      ],
    }),

    // ── 服务标准 ──
    defineField({
      name: "standardsTitle",
      title: "服务标准标题",
      type: "string",
      description: '前台位置：服务标准模块标题。是否建议修改：可不改。修改效果：模块主标题。',
    }),
    defineField({
      name: "standards",
      title: "服务标准",
      type: "array",
      description: '前台位置：服务标准列表。是否建议修改：建议改。修改效果：展示服务标准和承诺。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", description: '前台位置：标准项标题。是否建议修改：建议改。修改效果：展示标准名称。' }),
            defineField({ name: "description", title: "描述", type: "text", description: '前台位置：标准项描述。是否建议修改：建议改。修改效果：详细说明标准内容。' }),
          ],
        },
      ],
    }),

    // ── 数据展示 ──
    defineField({
      name: "statsTitle",
      title: "数据展示标题",
      type: "string",
      description: '前台位置：数据展示模块标题。是否建议修改：可不改。修改效果：模块主标题。',
    }),
    defineField({
      name: "stats",
      title: "数据展示",
      type: "array",
      description: '前台位置：数据展示列表。是否建议修改：建议改。修改效果：通过数据增强用户信任感。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "数值", type: "string", description: '前台位置：数据展示数值。是否建议修改：建议改。修改效果：展示关键数据。注意：如「15年+」「90%」。' }),
            defineField({ name: "label", title: "标签", type: "string", description: '前台位置：数值下方说明。是否建议修改：建议改。修改效果：解释数据含义。注意：如「行业经验」。' }),
          ],
        },
      ],
    }),

    // ── 咨询入口 ──
    defineField({
      name: "cta",
      title: "咨询入口",
      type: "cta",
      description: '前台位置：页面底部咨询行动区。是否建议修改：建议改。修改效果：引导用户咨询。',
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: '前台位置：SEO 相关高级设置。是否建议修改：可不改。修改效果：控制搜索引擎索引行为。注意：非专业人员不建议修改。',
    }),
  ],
  preview: {
    prepare() {
      return { title: "为什么选择我们" };
    },
  },
});
