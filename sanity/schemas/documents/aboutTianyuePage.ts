import { defineField, defineType } from "sanity";

export const aboutTianyuePage = defineType({
  name: "aboutTianyuePage",
  title: "走进天悦宝贝页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({
      name: "pageTitle",
      title: "页面标题",
      type: "string",
      description:
        "前台位置：浏览器标签页标题及搜索结果标题。是否建议修改：建议改。修改效果：影响 SEO 搜索展示。注意：建议控制在 30 字以内，包含核心关键词。\"",
    }),
    defineField({
      name: "pageDescription",
      title: "页面描述",
      type: "text",
      rows: 3,
      description:
        "前台位置：搜索结果中标题下方的摘要文字。是否建议修改：建议改。修改效果：影响搜索引擎点击率。注意：建议控制在 80-160 字，准确概括页面内容。\"",
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description:
        "前台位置：不直接展示，影响搜索引擎收录。是否建议修改：可不改。修改效果：高级 SEO 优化。注意：如无特殊需求保持默认即可。\"",
    }),

    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
      description:
        "前台位置：页面顶部轮播大图。是否建议修改：建议改。修改效果：直接影响页面首屏视觉效果。注意：桌面图建议 1920×600 像素，手机图建议 750×600 像素，保持同一批图片比例一致。\"",
    }),

    // ── 品牌介绍 ──
    defineField({
      name: "brandTitle",
      title: "品牌介绍标题",
      type: "string",
      description:
        "前台位置：品牌介绍区域的标题文字。是否建议修改：建议改。修改效果：影响品牌板块的视觉层次。注意：建议简短有力，不超过 20 字。\"",
    }),
    defineField({
      name: "brandDescription",
      title: "品牌介绍描述",
      type: "text",
      rows: 4,
      description:
        "前台位置：品牌介绍区域的正文描述。是否建议修改：建议改。修改效果：传递品牌理念和核心价值。注意：建议 100-300 字，段落清晰。\"",
    }),
    defineField({
      name: "brandImage",
      title: "品牌介绍图片",
      type: "imageWithAlt",
      description:
        "前台位置：品牌介绍区域的配图。是否建议修改：建议改。修改效果：提升品牌板块的视觉吸引力。注意：建议尺寸 800x600 像素以上，图片清晰、与品牌调性一致。\"",
    }),

    // ── 联系模块 ──
    defineField({
      name: "contactTitle",
      title: "联系模块标题",
      type: "string",
      description:
        "前台位置：联系模块区域的标题文字。是否建议修改：可不改。修改效果：影响联系模块的视觉层次。注意：默认即可，如需修改建议不超过 15 字。\"",
    }),
    defineField({
      name: "phone",
      title: "联系电话",
      type: "string",
      description:
        "前台位置：联系模块显示的电话号码，点击可拨打。是否建议修改：必改。修改效果：直接影响客户来电咨询。注意：填写真实有效的客服电话号码，建议格式如 400-xxx-xxxx 或 010-xxxxxxxx。\"",
    }),
    defineField({
      name: "wechatQrCode",
      title: "微信二维码",
      type: "image",
      options: { hotspot: false },
      description:
        "前台位置：联系模块展示的微信二维码图片。是否建议修改：必改。修改效果：影响用户添加微信咨询。注意：建议上传清晰的二维码图片，尺寸 300x300 像素以上，确保扫码可识别。\"",
    }),
    defineField({
      name: "serviceHours",
      title: "服务时间",
      type: "string",
      description:
        "前台位置：联系模块显示的服务时间。是否建议修改：建议改。修改效果：告知用户可咨询的时间段。注意：建议格式如\"周一至周五 9:00-18:00\"。\"",
    }),
    defineField({
      name: "consultationNote",
      title: "咨询说明",
      type: "text",
      rows: 3,
      description:
        "前台位置：联系模块下方的补充说明文字。是否建议修改：建议改。修改效果：引导用户咨询或说明服务流程。注意：建议 50-150 字，语言亲切友好。\"",
    }),
  ],
  preview: {
    prepare() {
      return { title: "走进天悦宝贝页面" };
    },
  },
});
