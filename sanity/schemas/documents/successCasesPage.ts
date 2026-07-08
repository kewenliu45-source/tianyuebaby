import { defineField, defineType } from "sanity";

export const successCasesPage = defineType({
  name: "successCasesPage",
  title: "成功案例页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({ name: "pageTitle", title: "页面标题", type: "string", description: "前台位置：浏览器标签页标题及页面顶部。是否建议修改：建议改。修改效果：影响页面标题显示和 SEO 标题。" }),
    defineField({ name: "pageDescription", title: "页面描述", type: "text", rows: 3, description: "前台位置：搜索引擎结果页摘要。是否建议修改：建议改。修改效果：影响搜索结果中的描述文案，建议 150 字以内。" }),
    defineField({ name: "seo", title: "SEO 设置", type: "seo", description: "前台位置：搜索引擎抓取的 meta 信息。是否建议修改：可不改。修改效果：高级 SEO 配置，不填则使用页面标题和描述作为默认值。" }),

    // ── Hero ──
    defineField({ name: "heroTitle", title: "Hero 标题", type: "string", description: "前台位置：页面顶部横幅大标题。是否建议修改：建议改。修改效果：影响首屏视觉重点。" }),
    defineField({ name: "heroSubtitle", title: "Hero 副标题", type: "string", description: "前台位置：Hero 大标题下方的副标题。是否建议修改：建议改。修改效果：补充说明首屏信息。" }),
    defineField({ name: "heroDescription", title: "Hero 描述", type: "text", rows: 3, description: "前台位置：Hero 区域描述文字。是否建议修改：建议改。修改效果：首屏详细说明。" }),
    defineField({ name: "heroImage", title: "Hero 图片", type: "imageWithAlt", description: "前台位置：页面顶部横幅背景图。是否建议修改：建议改。修改效果：影响首屏视觉效果，建议尺寸 1920×800 像素以上。" }),
    defineField({ name: "heroPrimaryButtonText", title: "主按钮文字", type: "string", description: "前台位置：Hero 区域主按钮文案。是否建议修改：可不改。修改效果：影响按钮显示文字。" }),
    defineField({ name: "heroPrimaryButtonLink", title: "主按钮链接", type: "string", description: "前台位置：Hero 主按钮跳转地址。是否建议修改：谨慎改。修改效果：影响按钮跳转目标。注意：站内用 /path 形式，不要填不存在的地址。" }),

    // ── 时间线 ──
    defineField({ name: "timelineTitle", title: "时间线标题", type: "string", description: "前台位置：发展历程区域标题。是否建议修改：可不改。修改效果：影响时间线模块标题。" }),
    defineField({
      name: "timelineItems",
      title: "时间线项目",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "年份", type: "string", validation: (r) => r.required(), description: "前台位置：时间线节点显示的年份。是否建议修改：建议改。修改效果：影响时间线年份标识。" }),
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "前台位置：时间线节点标题。是否建议修改：建议改。修改效果：影响节点标题显示。" }),
            defineField({ name: "description", title: "描述", type: "text", description: "前台位置：时间线节点描述文字。是否建议修改：建议改。修改效果：影响节点详细说明。" }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt", description: "前台位置：时间线节点配图。是否建议修改：建议改。修改效果：影响节点视觉展示，建议尺寸 800×600 像素。" }),
          ],
        },
      ],
    }),

    // ── 列表区 ──
    defineField({ name: "listTitle", title: "列表标题", type: "string", description: "前台位置：案例列表区域标题。是否建议修改：可不改。修改效果：影响列表模块标题。" }),
    defineField({ name: "listDescription", title: "列表描述", type: "text", rows: 3, description: "前台位置：案例列表区域描述文字。是否建议修改：建议改。修改效果：影响列表模块的说明文案。" }),

    // ── Sidebar ──
    defineField({ name: "sidebarTitle", title: "侧边栏标题", type: "string", description: "前台位置：页面侧边栏标题。是否建议修改：可不改。修改效果：影响侧边栏模块标题。" }),
    defineField({ name: "sidebarDescription", title: "侧边栏描述", type: "text", rows: 3, description: "前台位置：侧边栏描述文字。是否建议修改：建议改。修改效果：影响侧边栏的说明文案。" }),
    defineField({ name: "sidebarPrimaryButtonText", title: "侧边栏主按钮文字", type: "string", description: "前台位置：侧边栏主按钮文案。是否建议修改：可不改。修改效果：影响按钮显示文字。" }),
    defineField({ name: "sidebarPrimaryButtonLink", title: "侧边栏主按钮链接", type: "string", description: "前台位置：侧边栏主按钮跳转地址。是否建议修改：谨慎改。修改效果：影响按钮跳转目标。注意：站内用 /path 形式，不要填不存在的地址。" }),
    defineField({ name: "sidebarPhone", title: "侧边栏电话", type: "string", description: "前台位置：侧边栏显示的电话号码。是否建议修改：必改。修改效果：影响用户拨打的咨询电话，请填写真实有效的号码。" }),
    defineField({
      name: "sidebarHotLinks",
      title: "侧边栏热门链接",
      type: "array",
      description: "前台位置：侧边栏热门链接列表。是否建议修改：建议改。修改效果：影响侧边栏快捷导航。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "前台位置：链接显示文字。是否建议修改：建议改。修改效果：影响链接文案。" }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: "前台位置：链接跳转地址。是否建议修改：谨慎改。修改效果：影响链接跳转目标。注意：站内用 /path 形式，不要填不存在的地址。" }),
          ],
        },
      ],
    }),
    defineField({
      name: "sidebarRelatedLinks",
      title: "侧边栏相关链接",
      type: "array",
      description: "前台位置：侧边栏相关链接列表。是否建议修改：建议改。修改效果：影响侧边栏相关内容导航。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "前台位置：链接显示文字。是否建议修改：建议改。修改效果：影响链接文案。" }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: "前台位置：链接跳转地址。是否建议修改：谨慎改。修改效果：影响链接跳转目标。注意：站内用 /path 形式，不要填不存在的地址。" }),
          ],
        },
      ],
    }),

    // ── 最终 CTA ──
    defineField({ name: "finalCtaTitle", title: "最终 CTA - 标题", type: "string", description: "前台位置：页面底部行动号召标题。是否建议修改：建议改。修改效果：影响底部引导文案。" }),
    defineField({ name: "finalCtaDescription", title: "最终 CTA - 描述", type: "text", rows: 3, description: "前台位置：页面底部行动号召描述。是否建议修改：建议改。修改效果：影响底部引导说明文案。" }),
    defineField({ name: "finalCtaPrimaryButtonText", title: "主按钮文字", type: "string", description: "前台位置：底部 CTA 主按钮文案。是否建议修改：可不改。修改效果：影响按钮显示文字。" }),
    defineField({ name: "finalCtaPrimaryButtonLink", title: "主按钮链接", type: "string", description: "前台位置：底部 CTA 主按钮跳转地址。是否建议修改：谨慎改。修改效果：影响按钮跳转目标。注意：站内用 /path 形式，不要填不存在的地址。" }),
    defineField({ name: "finalCtaBackgroundImage", title: "背景图片", type: "imageWithAlt", description: "前台位置：底部 CTA 区域背景图。是否建议修改：建议改。修改效果：影响底部视觉效果，建议尺寸 1920×600 像素以上。" }),
  ],
  preview: {
    prepare() {
      return { title: "成功案例页面" };
    },
  },
});
