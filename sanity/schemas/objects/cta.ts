import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "行动号召",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "标题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "说明",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "buttonText",
      title: "按钮文字",
      type: "string",
    }),
    defineField({
      name: "buttonLink",
      title: "按钮链接",
      type: "string",
      description: "固定目标页面，如 /start-your-journey",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "buttonText",
    },
  },
});
