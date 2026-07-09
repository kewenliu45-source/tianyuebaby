import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO 设置",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "页面标题（Meta Title）",
      type: "string",
      description: "前台位置：浏览器标签页标题、搜索结果标题。是否建议修改：可不改。修改效果：影响搜索结果中的标题显示和浏览器标签。注意：建议 50-60 个字符，过长会被搜索引擎截断",
      validation: (rule) =>
        rule.max(60).warning("建议不超过 60 个字符，过长会被搜索引擎截断"),
    }),
    defineField({
      name: "metaDescription",
      title: "页面描述（Meta Description）",
      type: "text",
      rows: 3,
      description: "前台位置：搜索结果标题下方的摘要文字。是否建议修改：可不改。修改效果：影响搜索结果中显示的描述内容。注意：建议 120-160 个字符，过长会被截断",
      validation: (rule) =>
        rule.max(160).warning("建议不超过 160 个字符"),
    }),
    defineField({
      name: "keywords",
      title: "关键词",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "前台位置：不直接显示，仅供内部管理参考。是否建议修改：可不改。修改效果：帮助团队记录页面核心关键词。注意：输入后按回车添加标签",
    }),
    defineField({
      name: "ogTitle",
      title: "社交分享标题（OG Title）",
      type: "string",
      description: "前台位置：微信、微博等社交平台分享卡片标题。是否建议修改：可不改。修改效果：影响社交分享时显示的标题。注意：建议不超过 70 个字符，留空则使用页面标题",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "ogDescription",
      title: "社交分享描述（OG Description）",
      type: "text",
      rows: 2,
      description: "前台位置：社交平台分享卡片的描述文字。是否建议修改：可不改。修改效果：影响社交分享时显示的描述内容。注意：建议不超过 200 个字符，留空则使用页面描述",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "ogImage",
      title: "社交分享图片（OG Image）",
      type: "image",
      options: { hotspot: true },
      description: "前台位置：社交平台分享卡片的封面图片。是否建议修改：可不改。修改效果：影响微信、微博等平台分享时显示的图片。注意：建议尺寸 1200×630 像素，比例 1.91:1，文件大小不超过 5MB",
    }),
    defineField({
      name: "canonicalUrl",
      title: "规范链接（Canonical URL）",
      type: "url",
      description: "前台位置：不直接显示，告诉搜索引擎哪个 URL 是权威版本。是否建议修改：谨慎改。修改效果：解决重复内容问题，集中页面权重。注意：通常留空即可，仅在有多个 URL 指向同一内容时填写，填写完整 URL 如 https://zhuyunbaby.com/page",
    }),
    defineField({
      name: "noIndex",
      title: "禁止搜索引擎索引",
      type: "boolean",
      initialValue: false,
      description: "前台位置：不直接显示，控制搜索引擎是否收录该页面。是否建议修改：谨慎改。修改效果：勾选后该页面将从搜索结果中消失。注意：一般页面不要勾选，仅用于隐私政策、测试页面等不需要被搜索到的内容",
    }),
  ],
});
