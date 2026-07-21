import { defineField, defineType } from "sanity";

export const privacyPage = defineType({
  name: "privacyPage",
  title: "隐私政策",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
      description: "前台位置：页面顶部轮播区域。是否建议修改：建议改。修改效果：更换页面顶部大图和文案。注意：建议至少保留一张幻灯片，桌面图建议 1920×600 像素，手机图建议 750×600 像素。",
    }),

    // ── 页面内容 ──
    defineField({
      name: "pageTitle",
      title: "页面标题",
      type: "string",
      initialValue: "隐私政策",
      description: "前台位置：页面正文区域上方主标题。是否建议修改：可不改。修改效果：更换页面大标题文案。",
    }),
    defineField({
      name: "pageDescription",
      title: "页面描述",
      type: "string",
      description: "前台位置：页面 meta description，影响搜索结果摘要。是否建议修改：建议改。修改效果：优化搜索引擎展示效果。注意：建议 120-160 个字符，过长会被截断。",
    }),
    defineField({
      name: "content",
      title: "正文内容",
      type: "array",
      of: [
        { type: "block" },
        { type: "imageWithAlt" },
      ],
      description: "前台位置：页面核心正文区域。是否建议修改：必改。修改效果：更新隐私政策全部条款内容。注意：支持富文本排版和插入图片，请根据最新法规要求撰写完整隐私政策文本。",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "前台位置：不直接展示，影响搜索引擎收录和社交分享。是否建议修改：可不改。修改效果：优化搜索排名和分享卡片展示。",
    }),
  ],
  preview: {
    prepare() {
      return { title: "隐私政策" };
    },
  },
});
