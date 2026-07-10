import { defineField, defineType } from "sanity";

export const videosPage = defineType({
  name: "videosPage",
  title: "科普视频页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({ name: "pageTitle", title: "页面标题", type: "string", description: "前台位置：浏览器标签页标题及搜索结果标题。是否建议修改：建议改。修改效果：影响搜索引擎展示的页面名称。注意：建议控制在 30 字以内，包含「科普视频」等关键词。" }),
    defineField({ name: "pageDescription", title: "页面描述", type: "text", rows: 3, description: "前台位置：搜索结果摘要文字。是否建议修改：建议改。修改效果：影响搜索引擎展示的页面简介。注意：建议 80-160 字，简要说明科普视频内容。" }),
    defineField({ name: "seo", title: "SEO 设置", type: "seo", description: "前台位置：搜索引擎优化相关设置。是否建议修改：可不改。修改效果：影响搜索引擎收录和展示。注意：如无特殊需求，保持默认即可。" }),

    // ── Hero ──
    defineField({ name: "heroTitle", title: "Hero 标题", type: "string", description: "前台位置：页面顶部大图区域主标题。是否建议修改：建议改。修改效果：影响页面首屏视觉效果。注意：建议控制在 15 字以内，简洁有力。" }),
    defineField({ name: "heroSubtitle", title: "Hero 副标题", type: "string", description: "前台位置：页面顶部大图区域副标题。是否建议修改：建议改。修改效果：补充说明主标题内容。注意：建议控制在 30 字以内。" }),
    defineField({ name: "heroDescription", title: "Hero 描述", type: "text", rows: 3, description: "前台位置：页面顶部大图区域描述文字。是否建议修改：建议改。修改效果：详细说明科普视频内容。注意：建议 50-100 字。" }),
    defineField({ name: "heroImage", title: "Hero 背景图", type: "imageWithAlt", description: "前台位置：页面顶部大图区域背景图。是否建议修改：建议改。修改效果：影响页面首屏视觉效果。注意：建议尺寸 1920×600 像素，大小不超过 500KB。" }),
    defineField({ name: "mobileHeroImage", title: "移动端 Hero 图片", type: "imageWithAlt", description: "前台位置：手机端 Hero 背景图。是否建议改：建议改。修改效果：优化手机端首屏视觉。注意：建议 750×600px，留空则使用桌面图。" }),
    defineField({ name: "heroPrimaryButtonText", title: "主按钮文字", type: "string", description: "前台位置：Hero 区域主按钮文案。是否建议修改：可不改。修改效果：影响用户点击行为。注意：建议 4-6 字，如「立即咨询」「了解更多」。" }),
    defineField({ name: "heroPrimaryButtonLink", title: "主按钮链接", type: "string", description: "前台位置：Hero 区域主按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后跳转到指定页面。注意：站内用 /path 形式，不要填不存在的地址。" }),

    // ── 推荐区 ──
    defineField({ name: "featuredTitle", title: "推荐区标题", type: "string", description: "前台位置：推荐视频区域标题。是否建议修改：可不改。修改效果：影响推荐区模块标题展示。注意：建议控制在 10 字以内。" }),
    defineField({ name: "featuredDescription", title: "推荐区说明", type: "text", rows: 2, description: "前台位置：推荐视频区域描述文字。是否建议修改：建议改。修改效果：补充说明推荐视频内容。注意：建议 30-60 字。" }),

    // ── 视频列表区 ──
    defineField({ name: "listTitle", title: "列表区标题", type: "string", description: "前台位置：视频列表区域标题。是否建议修改：可不改。修改效果：影响列表区模块标题展示。注意：建议控制在 10 字以内。" }),
    defineField({ name: "listDescription", title: "列表区说明", type: "text", rows: 3, description: "前台位置：视频列表区域描述文字。是否建议修改：建议改。修改效果：补充说明视频列表内容。注意：建议 30-60 字。" }),

    // ── 分类筛选 ──
    defineField({
      name: "categoryFilterEnabled",
      title: "启用分类筛选",
      type: "boolean",
      initialValue: true,
      description: "前台位置：视频列表区域顶部分类筛选功能。是否建议修改：谨慎改。修改效果：关闭后用户无法按分类筛选视频。注意：关闭后前台隐藏该模块。"
    }),

    // ── Sidebar 咨询 ──
    defineField({ name: "sidebarConsultTitle", title: "侧栏咨询标题", type: "string", description: "前台位置：视频列表右侧咨询模块标题。是否建议修改：建议改。修改效果：影响咨询模块的吸引力。注意：建议控制在 10 字以内。" }),
    defineField({ name: "sidebarConsultDescription", title: "侧栏咨询说明", type: "text", rows: 3, description: "前台位置：视频列表右侧咨询模块描述文字。是否建议修改：建议改。修改效果：补充说明咨询服务内容。注意：建议 30-60 字。" }),
    defineField({ name: "sidebarConsultButtonText", title: "侧栏咨询按钮文字", type: "string", description: "前台位置：视频列表右侧咨询模块按钮文案。是否建议修改：可不改。修改效果：影响用户点击行为。注意：建议 4-6 字，如「立即咨询」「预约挂号」。" }),
    defineField({ name: "sidebarConsultButtonLink", title: "侧栏咨询按钮链接", type: "string", description: "前台位置：视频列表右侧咨询模块按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后跳转到指定页面。注意：站内用 /path 形式，不要填不存在的地址。" }),
    defineField({ name: "sidebarPhone", title: "侧栏电话", type: "string", description: "前台位置：视频列表右侧咨询模块联系电话。是否建议修改：必改。修改效果：影响用户拨打的咨询电话号码。注意：请填写真实有效的电话号码，如 400-xxx-xxxx。" }),
    defineField({
      name: "sidebarHotLinks",
      title: "侧栏热门链接",
      type: "array",
      description: "前台位置：视频列表右侧热门链接列表。是否建议修改：谨慎改。修改效果：影响侧栏热门链接的展示内容。注意：建议保留 3-5 个热门链接。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "链接显示的文字，建议控制在 10 字以内。" }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: "链接跳转地址。站内用 /path 形式，不要填不存在的地址。" }),
          ],
        },
      ],
    }),
    defineField({
      name: "sidebarRelatedLinks",
      title: "侧栏相关链接",
      type: "array",
      description: "前台位置：视频列表右侧相关链接列表。是否建议修改：谨慎改。修改效果：影响侧栏相关链接的展示内容。注意：建议保留 3-5 个相关页面链接。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "链接显示的文字，建议控制在 10 字以内。" }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: "链接跳转地址。站内用 /path 形式，不要填不存在的地址。" }),
          ],
        },
      ],
    }),

    // ── 最终 CTA ──
    defineField({ name: "finalCtaTitle", title: "最终 CTA - 标题", type: "string", description: "前台位置：页面底部行动号召区域主标题。是否建议修改：建议改。修改效果：影响最终转化效果。注意：建议控制在 15 字以内，具有号召力。" }),
    defineField({ name: "finalCtaDescription", title: "最终 CTA - 描述", type: "text", rows: 3, description: "前台位置：页面底部行动号召区域描述文字。是否建议修改：建议改。修改效果：补充说明行动号召内容。注意：建议 50-100 字。" }),
    defineField({ name: "finalCtaPrimaryButtonText", title: "主按钮文字", type: "string", description: "前台位置：页面底部行动号召区域主按钮文案。是否建议修改：可不改。修改效果：影响用户点击行为。注意：建议 4-6 字，如「立即咨询」「预约挂号」。" }),
    defineField({ name: "finalCtaPrimaryButtonLink", title: "主按钮链接", type: "string", description: "前台位置：页面底部行动号召区域主按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后跳转到指定页面。注意：站内用 /path 形式，不要填不存在的地址。" }),
    defineField({ name: "finalCtaSecondaryButtonText", title: "次按钮文字", type: "string", description: "前台位置：页面底部行动号召区域次按钮文案。是否建议修改：可不改。修改效果：影响用户点击行为。注意：建议 4-6 字，如「了解更多」「查看案例」。" }),
    defineField({ name: "finalCtaSecondaryButtonLink", title: "次按钮链接", type: "string", description: "前台位置：页面底部行动号召区域次按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后跳转到指定页面。注意：站内用 /path 形式，不要填不存在的地址。" }),
    defineField({ name: "finalCtaBackgroundImage", title: "背景图片", type: "imageWithAlt", description: "前台位置：页面底部行动号召区域背景图。是否建议修改：建议改。修改效果：影响行动号召区域的视觉效果。注意：建议尺寸 1920×600 像素，大小不超过 500KB。" }),

    // ── 文案 ──
    defineField({
      name: "emptyStateText",
      title: "空数据提示",
      type: "string",
      description: "前台位置：视频列表为空时显示的提示文字。是否建议修改：可不改。修改效果：影响无数据时的用户体验。注意：建议语气友好，如「暂无视频内容，敬请期待」。",
    }),
    defineField({
      name: "playbackErrorText",
      title: "播放失败提示",
      type: "string",
      description: "前台位置：视频播放失败时显示的提示文字。是否建议修改：可不改。修改效果：影响播放失败时的用户体验。注意：建议语气友好，如「视频播放失败，请稍后重试」。",
    }),
    defineField({
      name: "medicalDisclaimer",
      title: "医疗免责声明",
      type: "text",
      rows: 3,
      description: "前台位置：视频详情页底部医疗免责声明。是否建议修改：谨慎改。修改效果：影响法律合规性。注意：请确保内容符合医疗广告法规要求，建议咨询法务后再修改。",
    }),
  ],
  preview: {
    prepare() {
      return { title: "科普视频页面" };
    },
  },
});
