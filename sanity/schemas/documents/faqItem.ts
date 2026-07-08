import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "常见问题",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "问题",
      type: "string",
      description: "前台位置：常见问题列表中每条的问题标题。是否建议修改：建议改。修改效果：直接展示给用户的问题文字。注意：建议简洁明了，一句话概括用户最关心的点。",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "回答",
      type: "text",
      description: "前台位置：常见问题列表中每条问题的详细回答。是否建议修改：建议改。修改效果：展开后显示的回答内容。注意：控制在2-4句话，避免过长影响阅读体验。",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "reference",
      description: "前台位置：常见问题页面的分类筛选标签。是否建议修改：谨慎改。修改效果：决定该问题归属哪个分类分组显示。注意：引用已有的 FAQ 分类，如需新增分类请先到「FAQ 分类」中创建。",
      to: [{ type: "faqCategory" }],
    }),
    defineField({
      name: "sortOrder",
      title: "排序",
      type: "number",
      description: "前台位置：同分类内问题的排列顺序。是否建议修改：谨慎改。修改效果：数值越小越靠前显示。注意：默认为 0，建议用 10、20、30 间隔编号，方便后续插入新条目。",
      initialValue: 0,
    }),
    defineField({
      name: "isFeatured",
      title: "推荐",
      type: "boolean",
      description: "前台位置：首页常见问题模块及常见问题页面顶部。是否建议修改：谨慎改。修改效果：开启后该问题会在首页和常见问题页面优先展示。注意：关闭后前台隐藏该推荐位，不影响在分类列表中的正常显示。",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "排序",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category.name",
    },
  },
});
