import { defineField, defineType } from "sanity";

export const faqPage = defineType({
  name: "faqPage",
  title: "常见问题页面",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
      description: "前台位置：常见问题页面顶部轮播图区域。是否建议修改：建议改。修改效果：更换页面顶部大图及文案。注意：建议添加 1-3 张，桌面图建议 1920×600 像素，移动端图建议 750×600 像素。",
    }),

    // ── 页面标题 ──
    defineField({
      name: "pageTitle",
      title: "页面标题",
      type: "string",
      description: "前台位置：常见问题页面主标题。是否建议修改：建议改。修改效果：更换页面顶部大标题文字。",
    }),
    defineField({
      name: "pageDescription",
      title: "页面描述",
      type: "text",
      rows: 2,
      description: "前台位置：页面标题下方的说明文字。是否建议修改：建议改。修改效果：更换页面副标题或引导语。",
    }),

    // ── 咨询入口 ──
    defineField({
      name: "cta",
      title: "咨询入口",
      type: "cta",
      description: "前台位置：页面底部咨询引导模块。是否建议修改：建议改。修改效果：更换咨询区标题、说明和按钮。注意：按钮链接站内用 /path 形式，不要填不存在的地址。",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "前台位置：不直接展示，影响搜索引擎和社交分享。是否建议修改：可不改。修改效果：优化搜索排名和分享卡片展示。注意：noIndex 勾选后页面将不出现在搜索结果中，谨慎操作。",
    }),
  ],
  preview: {
    prepare() {
      return { title: "常见问题页面" };
    },
  },
});
