import { defineField, defineType } from "sanity";

export const faqCategory = defineType({
  name: "faqCategory",
  title: "FAQ 分类",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "名称",
      type: "string",
      description: "前台位置：前台 FAQ 页面的分类标签名称。是否建议修改：建议改。修改效果：修改后前台 FAQ 分类名称同步更新。注意：名称需简洁明了，便于用户快速识别分类内容。",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "前台位置：FAQ 分类页面的 URL 路径标识。是否建议修改：谨慎改。修改效果：修改后该分类的前台访问地址会变化。注意：修改后旧链接将失效，建议生成后不要随意更改。",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "排序",
      type: "number",
      description: "前台位置：FAQ 分类列表的显示顺序。是否建议修改：谨慎改。修改效果：数值越小越靠前显示。注意：建议按重要程度递增设置，如 0、10、20，方便后续插入新分类。",
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
