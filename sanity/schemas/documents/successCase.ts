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
      description:
        "前台位置：案例详情页顶部标题。是否建议修改：建议改。修改效果：影响案例页面主标题和列表卡片标题显示。注意：应与具体案例对应，避免过于笼统。\"",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "前台位置：案例详情页 URL 路径。是否建议修改：谨慎改。修改效果：更改后页面 URL 随之变化。注意：由标题自动生成即可，修改会导致旧链接失效。\"",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "摘要",
      type: "text",
      description:
        "前台位置：案例列表卡片下方简介。是否建议修改：建议改。修改效果：影响列表页摘要文字展示，建议简洁概括案例要点。\"",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description:
        "前台位置：案例列表卡片和详情页封面图。是否建议修改：建议改。修改效果：影响案例列表卡片和详情页顶部展示。注意：建议使用 16:9 横版图片，尺寸不小于 1200×675 像素。注意：图片应去隐私化，不得包含可识别个人身份的内容。\"",
    }),
    defineField({
      name: "clientProfile",
      title: "客户情况",
      type: "string",
      description:
        "前台位置：案例详情页及列表卡片展示。是否建议修改：建议改。修改效果：简要描述客户背景，帮助访客快速判断是否与自身情况相似。注意：应去隐私化，仅保留与服务相关的关键信息，如：高龄备孕家庭、多次失败后重新评估。\"",
    }),
    defineField({
      name: "serviceType",
      title: "服务类型",
      type: "string",
      description:
        "前台位置：案例详情页及列表卡片展示。是否建议修改：建议改。修改效果：帮助访客按服务类型筛选和匹配案例。注意：常用值如三代试管、冻卵、第三方辅助生殖，请与实际服务保持一致。\"",
    }),
    defineField({
      name: "resultSummary",
      title: "结果概述",
      type: "text",
      rows: 2,
      description:
        "前台位置：案例详情页结果展示区域。是否建议修改：建议改。修改效果：简要呈现案例最终结果，增强访客信心。注意：必须去隐私化，不得出现具体姓名或可识别信息；不得使用承诺性语言（如\"保证成功\"），仅客观陈述事实。\"",
    }),
    defineField({
      name: "content",
      title: "正文",
      type: "richText",
      description:
        "前台位置：案例详情页正文内容区。是否建议修改：建议改。修改效果：案例的完整叙述内容，支持图文混排。注意：内容应去隐私化，不承诺治疗结果。\"",
    }),
    defineField({
      name: "publishedAt",
      title: "发布时间",
      type: "datetime",
      description:
        "前台位置：案例详情页日期显示。是否建议修改：可不改。修改效果：影响案例在列表中的排序（按时间倒序）及页面显示日期。\"",
    }),
    defineField({
      name: "isFeatured",
      title: "推荐",
      type: "boolean",
      description:
        "前台位置：是否在首页或案例列表中置顶/高亮展示。是否建议修改：谨慎改。修改效果：开启后该案例会被优先推荐展示。注意：关闭后前台隐藏推荐标识。\"",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "排序",
      type: "number",
      description:
        "前台位置：案例列表中的排列顺序。是否建议修改：谨慎改。修改效果：数值越小越靠前。注意：默认为 0，建议按 10、20、30 间隔填写，方便后续插入。\"",
      initialValue: 0,
    }),
    defineField({
      name: "tags",
      title: "标签",
      type: "array",
      description:
        "前台位置：案例详情页及列表筛选标签。是否建议修改：可不改。修改效果：用于分类和筛选案例，帮助访客快速定位相关内容。\"",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description:
        "前台位置：搜索引擎收录相关。是否建议修改：可不改。修改效果：影响案例页面在搜索结果中的标题、描述和索引行为。注意：无特殊需求保持默认即可。\"",
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
