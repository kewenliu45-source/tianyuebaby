import { defineField, defineType } from "sanity";

export const successCase = defineType({
  name: "successCase",
  title: "成功案例",
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
      name: "excerpt",
      title: "摘要",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
    }),
    defineField({
      name: "clientProfile",
      title: "客户情况",
      type: "string",
      description: "如：高龄备孕家庭、多次失败后重新评估",
    }),
    defineField({
      name: "serviceType",
      title: "服务类型",
      type: "string",
      description: "如：三代试管、冻卵、第三方辅助生殖",
    }),
    defineField({
      name: "resultSummary",
      title: "结果概述",
      type: "text",
      rows: 2,
      description: "去隐私化，不承诺结果",
    }),
    defineField({
      name: "content",
      title: "正文",
      type: "richText",
    }),
    defineField({
      name: "publishedAt",
      title: "发布时间",
      type: "datetime",
    }),
    defineField({
      name: "isFeatured",
      title: "推荐",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "排序",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "tags",
      title: "标签",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "排序（升序）",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "发布时间（新到旧）",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "clientProfile",
      media: "coverImage.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || "未设置客户情况",
        media,
      };
    },
  },
});
