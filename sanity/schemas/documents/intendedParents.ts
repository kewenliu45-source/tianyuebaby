import { defineField, defineType } from "sanity";

export const intendedParents = defineType({
  name: "intendedParents",
  title: "关于准父母",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      description: "前台位置：页面顶部轮播图。可不改。修改效果：更换页面顶部大图。",
      type: "array",
      of: [{ type: "bannerSlide" }],
    }),

    // ── 适合人群 ──
    defineField({
      name: "suitableForTitle",
      title: "适合人群标题",
      description: "前台位置：适合人群模块标题。可不改。",
      type: "string",
    }),
    defineField({
      name: "suitableForItems",
      title: "适合人群",
      description: "前台位置：适合人群卡片列表。建议改。修改效果：更新展示的人群分类。",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", description: "人群名称。", type: "string" }),
            defineField({ name: "description", title: "描述", description: "人群简要说明。", type: "text" }),
            defineField({ name: "icon", title: "图标", description: "图标标识，可不改。", type: "string" }),
          ],
        },
      ],
    }),

    // ── 常见需求 ──
    defineField({
      name: "needsTitle",
      title: "常见需求标题",
      description: "前台位置：常见需求模块标题。可不改。",
      type: "string",
    }),
    defineField({
      name: "needsItems",
      title: "常见需求",
      description: "前台位置：常见需求卡片列表。建议改。修改效果：更新展示的需求项。",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", description: "需求名称。", type: "string" }),
            defineField({ name: "description", title: "描述", description: "需求简要说明。", type: "text" }),
          ],
        },
      ],
    }),

    // ── 准备事项 ──
    defineField({
      name: "preparationTitle",
      title: "准备事项标题",
      description: "前台位置：准备事项模块标题。可不改。",
      type: "string",
    }),
    defineField({
      name: "preparationItems",
      title: "准备事项",
      description: "前台位置：准备事项卡片列表。建议改。修改效果：更新展示的准备事项。",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", description: "准备事项名称。", type: "string" }),
            defineField({ name: "description", title: "描述", description: "准备事项简要说明。", type: "text" }),
            defineField({ name: "icon", title: "图标", description: "图标标识，可不改。", type: "string" }),
          ],
        },
      ],
    }),

    // ── 服务边界 ──
    defineField({
      name: "boundariesTitle",
      title: "服务边界标题",
      description: "前台位置：服务边界模块标题。可不改。",
      type: "string",
    }),
    defineField({
      name: "boundariesContent",
      title: "服务边界内容",
      description: "前台位置：服务边界说明文字。建议改。修改效果：更新服务范围说明。",
      type: "text",
      rows: 4,
    }),

    // ── 咨询入口 ──
    defineField({
      name: "cta",
      title: "咨询入口",
      description: "前台位置：页面底部咨询按钮区域。可不改。",
      type: "cta",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      description: "搜索引擎优化相关设置，可不改。",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "关于准父母" };
    },
  },
});
