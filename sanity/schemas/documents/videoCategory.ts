import { defineField, defineType } from "sanity";

export const videoCategory = defineType({
  name: "videoCategory",
  title: "视频分类",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "名称",
      description: "前台位置：视频列表页分类标签、视频详情页分类标识。是否建议修改：建议改。修改效果：更改分类在前台的显示名称。注意：修改后需同步确认 Slug 是否仍适用。",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "前台位置：视频列表页 URL 路径中的分类标识符。是否建议修改：谨慎改。修改效果：更改后该分类的前台链接地址会变化，旧链接将失效。注意：修改前请确认无外部渠道引用了当前链接；建议只在创建时设置一次。",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "排序",
      description: "前台位置：视频列表页分类标签的排列顺序。是否建议修改：谨慎改。修改效果：数字越小越靠前。注意：多个分类请使用不重复的数字以便排序明确。",
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
