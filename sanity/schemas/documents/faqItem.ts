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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "回答",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "reference",
      to: [{ type: "faqCategory" }],
    }),
    defineField({
      name: "sortOrder",
      title: "排序",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "isFeatured",
      title: "推荐",
      type: "boolean",
      description: "在首页和常见问题页面优先显示",
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
