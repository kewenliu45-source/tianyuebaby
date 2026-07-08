import { defineField, defineType } from "sanity";

export const journey = defineType({
  name: "journey",
  title: "助孕流程",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
      description: "前台位置：助孕流程页面顶部轮播图。是否建议修改：可不改。修改效果：更换页面顶部展示的图片和文案。注意：该页面已从后台隐藏，非必要不修改。",
    }),

    // ── 流程步骤 ──
    defineField({
      name: "stepsTitle",
      title: "流程步骤标题",
      type: "string",
      description: "前台位置：流程步骤区域的主标题。是否建议修改：可不改。修改效果：更改流程步骤区域的标题文案。注意：该页面已从后台隐藏，非必要不修改。",
    }),
    defineField({
      name: "steps",
      title: "流程步骤",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "标题",
              type: "string",
              description: "该流程步骤的名称。是否建议修改：可不改。",
            }),
            defineField({
              name: "description",
              title: "描述",
              type: "text",
              description: "该流程步骤的简要说明。是否建议修改：可不改。",
            }),
            defineField({
              name: "icon",
              title: "图标",
              type: "string",
              description: "该步骤对应的图标标识。是否建议修改：谨慎改。注意：修改需确保图标标识有效。",
            }),
            defineField({
              name: "stepNumber",
              title: "步骤编号",
              type: "number",
              description: "该步骤的序号，决定显示顺序。是否建议修改：谨慎改。注意：编号应按流程顺序递增。",
            }),
            defineField({
              name: "details",
              title: "详细说明",
              type: "array",
              of: [{ type: "string" }],
              description: "该步骤的详细说明列表。是否建议修改：可不改。",
            }),
          ],
        },
      ],
      description: "前台位置：助孕流程页面的步骤展示区域。是否建议修改：可不改。修改效果：增删或修改流程步骤内容。注意：该页面已从后台隐藏，非必要不修改。",
    }),

    // ── 注意事项 ──
    defineField({
      name: "notesTitle",
      title: "注意事项标题",
      type: "string",
      description: "前台位置：注意事项区域的主标题。是否建议修改：可不改。修改效果：更改注意事项区域的标题文案。注意：该页面已从后台隐藏，非必要不修改。",
    }),
    defineField({
      name: "notes",
      title: "注意事项",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "标题",
              type: "string",
              description: "该注意事项的标题。是否建议修改：可不改。",
            }),
            defineField({
              name: "description",
              title: "描述",
              type: "text",
              description: "该注意事项的详细说明。是否建议修改：可不改。",
            }),
          ],
        },
      ],
      description: "前台位置：助孕流程页面的注意事项展示区域。是否建议修改：可不改。修改效果：增删或修改注意事项内容。注意：该页面已从后台隐藏，非必要不修改。",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "前台位置：页面 SEO 元信息。是否建议修改：可不改。修改效果：影响搜索引擎收录和展示。注意：该页面已从后台隐藏，非必要不修改。",
    }),
  ],
  preview: {
    prepare() {
      return { title: "助孕流程" };
    },
  },
});
