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
      description:
        "前台位置：新闻列表页顶部分类标签、新闻详情页面包屑。是否建议修改：建议改。修改效果：前台分类导航名称同步更新。注意：修改后已关联的新闻仍归属此分类，仅名称变化。",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "前台位置：新闻分类页 URL 路径（如 /news/category/xxx）。是否建议修改：谨慎改。修改效果：该分类的前台访问地址变化。注意：修改后旧链接将失效，请确认没有在其他地方引用旧 slug；建议首次设置后不再更改。",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "排序",
      type: "number",
      description:
        "前台位置：新闻列表页顶部分类标签的排列顺序。是否建议修改：谨慎改。修改效果：数字越小越靠前，前台分类标签顺序随之调整。注意：所有分类建议使用不重复的数字（如 0、10、20）便于后续插入。",
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
