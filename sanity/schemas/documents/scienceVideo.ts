import { defineField, defineType } from "sanity";

export const scienceVideo = defineType({
  name: "scienceVideo",
  title: "科普视频",
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
      name: "content",
      title: "科普正文",
      type: "richText",
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "reference",
      to: [{ type: "videoCategory" }],
    }),
    defineField({
      name: "presenter",
      title: "讲解人",
      type: "string",
    }),
    defineField({
      name: "duration",
      title: "时长",
      type: "string",
      description: '视频时长，如 "12:30"',
    }),
    defineField({
      name: "videoSource",
      title: "视频来源",
      type: "string",
      options: {
        list: [
          { title: "外部嵌入（YouTube / Bilibili 等）", value: "external" },
          { title: "上传 MP4 文件", value: "upload" },
        ],
        layout: "radio",
      },
      initialValue: "external",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "externalUrl",
      title: "外部视频地址",
      type: "url",
      description:
        "支持 YouTube、Bilibili、腾讯视频、优酷的链接或嵌入地址",
      hidden: ({ parent }) => parent?.videoSource !== "external",
    }),
    defineField({
      name: "videoFile",
      title: "上传视频文件",
      type: "file",
      description: "支持 MP4 格式",
      options: { accept: "video/mp4" },
      hidden: ({ parent }) => parent?.videoSource !== "upload",
    }),
    defineField({
      name: "publishedAt",
      title: "发布时间",
      type: "datetime",
      validation: (rule) => rule.required(),
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
      subtitle: "presenter",
      media: "coverImage.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || "未设置讲解人",
        media,
      };
    },
  },
});
