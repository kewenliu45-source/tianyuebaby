import { defineField, defineType } from "sanity";

export const richText = defineType({
  name: "richText",
  title: "富文本",
  type: "array",
  of: [
    // 基础文本块
    {
      type: "block",
      styles: [
        { title: "正文", value: "normal" },
        { title: "标题 2", value: "h2" },
        { title: "标题 3", value: "h3" },
        { title: "引用", value: "blockquote" },
      ],
      lists: [
        { title: "无序列表", value: "bullet" },
        { title: "有序列表", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "加粗", value: "strong" },
          { title: "斜体", value: "em" },
          { title: "下划线", value: "underline" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "链接",
            fields: [
              defineField({
                name: "href",
                title: "链接地址",
                description:
                  "前台位置：富文本内超链接。是否建议修改：谨慎改。修改效果：点击文本后跳转到该地址。注意：站内用 /path 形式，不要填不存在的地址；外链需包含 https://。",
                type: "url",
                validation: (rule) => rule.required(),
              }),
              defineField({
                name: "blank",
                title: "新窗口打开",
                description:
                  "前台位置：富文本内超链接。是否建议修改：谨慎改。修改效果：开启后点击链接将在新标签页打开，关闭则在当前页面跳转。注意：外链建议开启，站内链接建议关闭。",
                type: "boolean",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    },
    // 内嵌图片
    {
      type: "imageWithAlt",
    },
  ],
});
