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
    }),

    // ── 联系信息 ──
    defineField({
      name: "phone",
      title: "联系电话",
      type: "string",
    }),
    defineField({
      name: "wechatQrCode",
      title: "微信二维码",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "serviceHours",
      title: "服务时间",
      type: "string",
    }),
    defineField({
      name: "consultationNote",
      title: "咨询说明",
      type: "text",
      rows: 3,
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
      return { title: "踏上为人父母之旅" };
    },
  },
});
