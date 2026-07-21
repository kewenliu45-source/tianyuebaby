import { defineField, defineType } from "sanity";

export const bannerSlide = defineType({
  name: "bannerSlide",
  title: "Banner 幻灯片",
  type: "object",
  fields: [
    defineField({
      name: "desktopImage",
      title: "桌面图片",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      description: '前台位置：PC 端 Banner 大图。是否建议修改：建议改。修改效果：影响电脑端页面顶部视觉。注意：建议 1920×600px，WebP/JPG 格式，800KB 以内。',
    }),
    defineField({
      name: "mobileImage",
      title: "移动端图片",
      type: "image",
      options: { hotspot: true },
      description: '前台位置：手机端 Banner 大图。是否建议修改：建议改。修改效果：影响手机端页面顶部视觉。注意：建议 750×600px，WebP/JPG 格式，留空则使用桌面图片。',
    }),
    defineField({
      name: "alt",
      title: "Alt 文本",
      type: "string",
      validation: (rule) => rule.required(),
      description: '前台位置：图片替代文字（屏幕阅读器和 SEO）。是否建议修改：建议改。修改效果：提升无障碍访问和搜索引擎理解。注意：简短描述图片内容，如「天悦宝贝月子中心外景」。',
    }),
    defineField({
      name: "title",
      title: "标题",
      type: "string",
      description: '前台位置：Banner 主标题。是否建议修改：建议改。修改效果：更换轮播图大标题文字。',
    }),
    defineField({
      name: "subtitle",
      title: "副标题",
      type: "string",
      description: '前台位置：Banner 副标题。是否建议修改：建议改。修改效果：更换轮播图副标题文字。',
    }),
    defineField({
      name: "buttonText",
      title: "按钮文字",
      type: "string",
      description: '前台位置：Banner 按钮文案。是否建议修改：可不改。修改效果：按钮文字。注意：如「了解更多」「立即咨询」。',
    }),
    defineField({
      name: "buttonLink",
      title: "按钮链接",
      type: "string",
      description: '前台位置：Banner 按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式，不要填不存在的地址。',
    }),
    defineField({
      name: "isActive",
      title: "启用",
      type: "boolean",
      initialValue: true,
      description: '前台位置：控制该幻灯片是否显示。是否建议修改：谨慎改。修改效果：关闭后前台隐藏该幻灯片。注意：不确定时保持开启。',
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "alt",
      media: "desktopImage",
    },
  },
});
