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
      description:
        "前台位置：新闻列表页和详情页顶部标题。是否建议修改：建议改。修改效果：影响文章在列表中的显示名称及浏览器标签标题。注意：建议控制在 30 字以内，避免过长。",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description:
        "前台位置：文章详情页 URL 路径，如 /news/your-slug。是否建议修改：谨慎改。修改效果：改变文章的访问地址。注意：发布后修改 slug 会导致旧链接失效，需重新生成静态页面。",
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "reference",
      to: [{ type: "newsCategory" }],
      description:
        "前台位置：新闻列表页分类筛选及文章详情页标签。是否建议修改：谨慎改。修改效果：决定文章归属哪个分类，影响分类页列表。注意：分类需先在「新闻分类」中创建才能选择。",
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description:
        "前台位置：新闻列表页卡片缩略图。是否建议修改：建议改。修改效果：影响文章在列表中的视觉吸引力。注意：建议尺寸 750×500 像素，比例 3:2，大小不超过 2MB。",
    }),
    defineField({
      name: "banner",
      title: "文章 Banner",
      type: "bannerSlide",
      description:
        "前台位置：文章详情页顶部大图横幅。是否建议修改：可不改。修改效果：为该文章设置专属顶部 Banner；留空则使用全站默认 Banner。注意：Banner 图片建议宽度 1920 像素，高度 400-500 像素。",
    }),
    defineField({
      name: "excerpt",
      title: "摘要",
      type: "text",
      rows: 3,
      description:
        "前台位置：新闻列表页卡片下方简介文字，以及分享时的描述。是否建议修改：建议改。修改效果：影响列表页展示效果及社交分享的预览文字。注意：建议 80-150 字，留空则自动截取正文前 200 字。",
    }),
    defineField({
      name: "content",
      title: "正文",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          title: "图片",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "替代文本",
              type: "string",
              description: "图片加载失败时显示，也是屏幕阅读器读取的内容。",
              validation: (rule) => rule.max(125),
            }),
          ],
        },
      ],
      description:
        "前台位置：文章详情页正文内容。是否建议修改：建议改。修改效果：决定文章详情页的完整内容。注意：支持富文本和内嵌图片，图片建议宽度不超过 800 像素。",
    }),
    defineField({
      name: "publishedAt",
      title: "发布时间",
      type: "datetime",
      validation: (rule) => rule.required(),
      description:
        "前台位置：文章详情页及列表页显示的发布日期。是否建议修改：建议改。修改效果：影响文章排序和显示的日期。注意：必填字段，设置为过去的时间可让文章立即出现在列表中。",
    }),
    defineField({
      name: "isPinned",
      title: "置顶",
      type: "boolean",
      initialValue: false,
      description:
        "前台位置：新闻列表页置顶显示。是否建议修改：谨慎改。修改效果：开启后该文章始终显示在列表最前面。注意：建议同时只置顶 1-2 篇文章，过多置顶会影响浏览体验。",
    }),
    defineField({
      name: "isFeatured",
      title: "推荐",
      type: "boolean",
      initialValue: false,
      description:
        "前台位置：首页或推荐模块可能展示推荐文章。是否建议修改：谨慎改。修改效果：标记为推荐的文章可能出现在首页推荐位。注意：建议选择内容质量较高的文章进行推荐。",
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description:
        "前台位置：搜索引擎展示的标题、描述和分享卡片。是否建议修改：可不改。修改效果：影响搜索引擎收录和社交分享效果。注意：留空则自动使用文章标题和摘要作为 SEO 信息。",
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
