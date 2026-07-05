import { defineField, defineType } from "sanity";

export const newsCategory = defineType({
  name: "newsCategory",
  title: "新闻分类",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "名称",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "排序",
      type: "number",
      initialValue: 0,
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
      title: "name",
      subtitle: "slug.current",
    },
  },
});
