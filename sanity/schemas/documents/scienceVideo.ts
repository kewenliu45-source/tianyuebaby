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
      description:
        '前台位置：视频列表页卡片标题、视频详情页标题。是否建议修改：建议改。修改效果：影响视频列表和详情页展示。注意：建议 10-30 字。',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        '前台位置：视频详情页 URL 路径。是否建议修改：谨慎改。修改效果：改变视频详情页的网址。注意：修改后旧链接会失效，建议从标题自动生成后不再更改。',
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "摘要",
      type: "text",
      rows: 3,
      description:
        '前台位置：视频列表页卡片简介、社交分享描述。是否建议修改：建议改。修改效果：影响列表页展示和分享文案。注意：建议 50-120 字。',
    }),
    defineField({
      name: "content",
      title: "科普正文",
      type: "richText",
      description:
        '前台位置：视频详情页正文内容。是否建议修改：建议改。修改效果：视频下方的科普文字内容。注意：支持图文混排。',
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description:
        '前台位置：视频列表页卡片封面、视频详情页封面。是否建议修改：建议改。修改效果：影响视频的视觉展示。注意：建议 16:9 横版，宽度不小于 1200px。',
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "reference",
      description:
        '前台位置：视频列表页分类标签。是否建议修改：谨慎改。修改效果：改变视频所属分类。注意：需先在「视频分类」中创建分类。',
      to: [{ type: "videoCategory" }],
    }),
    defineField({
      name: "presenter",
      title: "讲解人",
      type: "string",
      description:
        '前台位置：视频列表页和详情页的讲解人姓名。是否建议修改：建议改。修改效果：展示视频主讲人信息。',
    }),
    defineField({
      name: "duration",
      title: "时长",
      type: "string",
      description:
        '前台位置：视频列表页和详情页的时长标识。是否建议修改：建议改。修改效果：告知用户视频时长。注意：格式如「12:30」或「1小时30分」。',
    }),
    defineField({
      name: "videoSource",
      title: "视频来源",
      type: "string",
      description:
        '前台位置：决定视频播放方式。是否建议修改：谨慎改。修改效果：切换外部嵌入或本地上传模式。注意：切换后需对应填写外部地址或上传文件。',
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
        '前台位置：视频播放区域。是否建议修改：谨慎改。修改效果：决定嵌入播放的视频源。注意：支持 YouTube、Bilibili、腾讯视频、优酷的链接或嵌入地址，确保链接可访问。',
      hidden: ({ parent }) => parent?.videoSource !== "external",
    }),
    defineField({
      name: "videoFile",
      title: "上传视频文件",
      type: "file",
      description:
        '前台位置：视频播放区域。是否建议修改：谨慎改。修改效果：决定本地播放的视频文件。注意：仅支持 MP4 格式，文件大小影响加载速度。',
      options: { accept: "video/mp4" },
      hidden: ({ parent }) => parent?.videoSource !== "upload",
    }),
    defineField({
      name: "publishedAt",
      title: "发布时间",
      type: "datetime",
      description:
        '前台位置：视频详情页发布时间显示、列表页排序依据。是否建议修改：建议改。修改效果：影响视频在列表中的排序和日期展示。',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isFeatured",
      title: "推荐",
      type: "boolean",
      description:
        '前台位置：视频列表页推荐标识。是否建议修改：谨慎改。修改效果：开启后视频在推荐区域优先展示。注意：关闭后前台隐藏推荐标识。',
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "排序",
      type: "number",
      description:
        '前台位置：视频列表页排序。是否建议修改：谨慎改。修改效果：数值越小越靠前。注意：建议用 10、20、30 间隔，方便后续插入。',
      initialValue: 0,
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description:
        '前台位置：视频详情页的搜索引擎和社交分享设置。是否建议修改：可不改。修改效果：影响搜索结果展示。注意：留空则自动使用标题和摘要。',
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
