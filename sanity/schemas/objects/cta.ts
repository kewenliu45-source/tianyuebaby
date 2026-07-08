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
      description: '前台位置：页面底部咨询行动区大标题。是否建议修改：建议改。修改效果：引导用户咨询的主标题。注意：各页面有独立实例，如需统一修改需逐页调整。',
    }),
    defineField({
      name: "description",
      title: "说明",
      type: "text",
      rows: 2,
      description: '前台位置：咨询行动区描述文字。是否建议修改：建议改。修改效果：引导用户咨询的说明。注意：建议 20-60 字。',
    }),
    defineField({
      name: "buttonText",
      title: "按钮文字",
      type: "string",
      description: '前台位置：咨询行动区按钮文案。是否建议修改：可不改。修改效果：按钮文字。注意：如「开始咨询」「预约参观」。',
    }),
    defineField({
      name: "buttonLink",
      title: "按钮链接",
      type: "string",
      description: '前台位置：咨询行动区按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式，外部链接用 https://example.com 完整地址。',
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "buttonText",
    },
  },
});
