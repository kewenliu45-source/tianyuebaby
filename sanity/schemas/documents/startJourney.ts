import { defineField, defineType } from "sanity";

export const startJourney = defineType({
  name: "startJourney",
  title: "踏上为人父母之旅",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
      description: "前台位置：页面顶部轮播图区域。是否建议修改：建议改。修改效果：更换或增删页面顶部的轮播幻灯片。注意：桌面图建议 1920×600 像素，手机图建议 750×600 像素；每张幻灯片需设置桌面图和 Alt 文本。",
    }),

    // ── 联系信息 ──
    defineField({
      name: "phone",
      title: "联系电话",
      type: "string",
      description: "前台位置：页面联系区域显示的电话号码。是否建议修改：必改。修改效果：更新前台展示的咨询电话。注意：填写真实有效的电话号码，带区号（如 010-12345678）。",
    }),
    defineField({
      name: "wechatQrCode",
      title: "微信二维码",
      type: "image",
      options: { hotspot: false },
      description: "前台位置：页面联系区域显示的微信二维码图片。是否建议修改：必改。修改效果：更换用户扫码添加的微信二维码。注意：建议使用正方形图片（如 500×500 像素），JPG/PNG 格式，确保二维码清晰可扫描。",
    }),
    defineField({
      name: "serviceHours",
      title: "服务时间",
      type: "string",
      description: "前台位置：页面联系区域显示的服务时间。是否建议修改：建议改。修改效果：更新前台展示的营业/服务时间。",
    }),
    defineField({
      name: "consultationNote",
      title: "咨询说明",
      type: "text",
      rows: 3,
      description: "前台位置：页面联系区域的补充说明文字。是否建议修改：建议改。修改效果：更新咨询相关的提示或说明内容。",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "前台位置：搜索引擎和社交平台展示信息。是否建议修改：可不改。修改效果：影响搜索结果和社交分享时显示的标题、描述和图片。",
    }),
  ],
  preview: {
    prepare() {
      return { title: "踏上为人父母之旅" };
    },
  },
});
