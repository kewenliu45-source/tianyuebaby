import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "链接",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "链接文字",
      type: "string",
      validation: (rule) => rule.required(),
      description: '前台位置：显示的可点击文字。是否建议修改：建议改。修改效果：改变链接显示的文字。注意：建议简短明确，如「了解更多」「立即预约」。',
    }),
    defineField({
      name: "href",
      title: "链接地址",
      type: "string",
      description: '前台位置：链接跳转目标。是否建议修改：谨慎改。修改效果：点击链接后的跳转目标。注意：站内用 /path 形式，外部链接用 https://example.com 完整地址，不要填不存在的路径。',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "新窗口打开",
      type: "boolean",
      initialValue: false,
      description: '前台位置：链接打开方式。是否建议修改：谨慎改。修改效果：开启后点击链接会在新标签页打开。注意：外部链接建议开启，站内链接保持关闭。',
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
});
