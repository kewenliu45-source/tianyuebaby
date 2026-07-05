import { defineField, defineType } from "sanity";

export const newsArticle = defineType({
  name: "newsArticle",
  title: "新闻文章",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "标题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "reference",
      to: [{ type: "newsCategory" }],
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
    }),
    defineField({
      name: "banner",
      title: "文章 Banner",
      type: "bannerSlide",
      description: "文章详情页顶部 Banner，留空则使用默认 Banner",
    }),
    defineField({
      name: "excerpt",
      title: "摘要",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "content",
      title: "正文",
      type: "array",
      of: [
        { type: "block" },
        { type: "imageWithAlt" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "发布时间",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isPinned",
      title: "置顶",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isFeatured",
      title: "推荐",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "发布时间（新到旧）",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "置顶优先",
      name: "pinnedFirst",
      by: [
        { field: "isPinned", direction: "desc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "coverImage.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString("zh-CN") : "未发布",
        media,
      };
    },
  },
});
