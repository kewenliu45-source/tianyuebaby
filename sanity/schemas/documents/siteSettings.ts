import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "站点设置",
  type: "document",
  fields: [
    // ── 品牌信息 ──
    defineField({
      name: "siteName",
      title: "网站名称",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "网站描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "网站 Logo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "defaultShareImage",
      title: "默认分享图",
      type: "image",
      description: "社交分享默认图片",
    }),

    // ── 联系方式 ──
    defineField({
      name: "phone",
      title: "联系电话",
      type: "string",
    }),
    defineField({
      name: "serviceHours",
      title: "服务时间",
      type: "string",
    }),
    defineField({
      name: "wechatQrCode",
      title: "微信咨询二维码",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "wechatPublicQrCode",
      title: "微信公众号二维码",
      type: "image",
      options: { hotspot: false },
    }),

    // ── 咨询栏文字 ──
    defineField({
      name: "sidebarCtaText",
      title: "侧边栏咨询文字",
      type: "string",
    }),
    defineField({
      name: "mobileCtaText",
      title: "移动咨询栏文字",
      type: "string",
    }),

    // ── 页脚信息 ──
    defineField({
      name: "footerDescription",
      title: "页脚简介",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "icpNumber",
      title: "备案号",
      type: "string",
    }),
    defineField({
      name: "copyrightText",
      title: "版权文字",
      type: "string",
    }),

    // ── 默认 SEO ──
    defineField({
      name: "defaultSeo",
      title: "默认 SEO",
      type: "seo",
    }),

    // ── 默认 Banner ──
    defineField({
      name: "defaultBanner",
      title: "默认 Banner",
      type: "bannerSlide",
      description: "当页面没有 Banner 时显示",
    }),

    // ── 导航显示文字 ──
    defineField({
      name: "navLabels",
      title: "导航显示文字",
      type: "object",
      fields: [
        defineField({ name: "home", title: "首页", type: "string", initialValue: "首页" }),
        defineField({ name: "intendedParents", title: "关于准父母", type: "string", initialValue: "关于准父母" }),
        defineField({ name: "journey", title: "助孕流程", type: "string", initialValue: "助孕流程" }),
        defineField({ name: "news", title: "新闻资讯", type: "string", initialValue: "新闻资讯" }),
        defineField({ name: "whyUs", title: "为什么选择我们", type: "string", initialValue: "为什么选择我们？" }),
        defineField({ name: "faq", title: "常见问题", type: "string", initialValue: "常见问题" }),
        defineField({ name: "startJourney", title: "踏上为人父母之旅", type: "string", initialValue: "踏上为人父母之旅" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "站点设置" };
    },
  },
});
