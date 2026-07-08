import { defineField, defineType } from "sanity";

export const privateCustomizationPage = defineType({
  name: "privateCustomizationPage",
  title: "私人订制页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({ name: "pageTitle", title: "页面标题", type: "string", description: '前台位置：浏览器标签页标题及 SEO title。是否建议修改：建议改。修改效果：影响搜索引擎展示标题。注意：建议 50-60 字符。' }),
    defineField({ name: "pageDescription", title: "页面描述", type: "text", rows: 3, description: '前台位置：搜索引擎结果摘要。是否建议修改：建议改。修改效果：影响搜索结果中的描述文字。注意：建议 120-160 字。' }),
    defineField({ name: "seo", title: "SEO 设置", type: "seo", description: '前台位置：SEO 相关高级设置。是否建议修改：可不改。修改效果：控制搜索引擎索引行为。注意：非专业人员不建议修改。' }),

    // ── Hero ──
    defineField({ name: "heroTitle", title: "Hero 标题", type: "string", description: '前台位置：页面顶部大标题。是否建议修改：建议改。修改效果：用户进入页面第一眼看到的主标题。注意：建议 10-25 字。' }),
    defineField({ name: "heroSubtitle", title: "Hero 副标题", type: "string", description: '前台位置：Hero 主标题下方。是否建议修改：建议改。修改效果：补充说明主标题。' }),
    defineField({ name: "heroDescription", title: "Hero 描述", type: "text", rows: 3, description: '前台位置：Hero 区域描述文字。是否建议修改：建议改。修改效果：详细介绍私人订制服务。注意：建议 30-80 字。' }),
    defineField({ name: "heroImage", title: "Hero 图片", type: "imageWithAlt", description: '前台位置：Hero 区域背景图。是否建议修改：建议改。修改效果：影响页面第一印象。注意：建议 1920×800px，500KB 以内。' }),
    defineField({ name: "publishedAt", title: "发布时间", type: "datetime", description: '前台位置：页面发布时间显示。是否建议修改：可不改。修改效果：展示内容发布时间。' }),
    defineField({ name: "readingTime", title: "阅读时长", type: "string", description: '前台位置：页面阅读时长标识。是否建议修改：可不改。修改效果：告知用户预计阅读时间。注意：如「12 分钟」。' }),
    defineField({ name: "authorName", title: "作者姓名", type: "string", description: '前台位置：页面作者姓名。是否建议修改：建议改。修改效果：展示内容作者。' }),
    defineField({ name: "authorTitle", title: "作者职称", type: "string", description: '前台位置：页面作者职称。是否建议修改：建议改。修改效果：展示作者资质。' }),
    defineField({ name: "heroPrimaryButtonText", title: "主按钮文字", type: "string", description: '前台位置：Hero 主按钮文案。是否建议修改：可不改。修改效果：引导用户操作。注意：如「立即咨询」。' }),
    defineField({ name: "heroPrimaryButtonLink", title: "主按钮链接", type: "string", description: '前台位置：Hero 主按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式。' }),
    defineField({ name: "heroSecondaryButtonText", title: "次按钮文字", type: "string", description: '前台位置：Hero 次按钮文案。是否建议修改：可不改。修改效果：辅助引导用户。' }),
    defineField({ name: "heroSecondaryButtonLink", title: "次按钮链接", type: "string", description: '前台位置：Hero 次按钮跳转地址。是否建议修改：谨慎改。修改效果：点击次按钮后的跳转目标。注意：站内用 /path 形式。' }),

    // ── 目录 ──
    defineField({
      name: "tocItems",
      title: "目录项",
      type: "array",
      description: '前台位置：页面目录导航。是否建议修改：建议改。修改效果：帮助用户快速定位内容。注意：锚点需与正文模块的锚点一致。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：目录项文字。是否建议修改：建议改。修改效果：目录显示的文字。' }),
            defineField({ name: "anchor", title: "锚点", type: "string", validation: (r) => r.required(), description: '前台位置：目录项跳转目标。是否建议修改：谨慎改。修改效果：点击目录后跳转到的锚点。注意：需与正文模块锚点一致。' }),
          ],
        },
      ],
    }),

    // ── 正文模块 ──
    defineField({
      name: "contentBlocks",
      title: "正文模块",
      type: "array",
      description: '前台位置：页面正文内容区域。是否建议修改：建议改。修改效果：展示页面核心内容。注意：支持多种模块类型，可拖动排序。',
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "blockType",
              title: "模块类型",
              type: "string",
              description: '前台位置：决定该内容块的展示形式。是否建议修改：谨慎改。修改效果：改变内容块的布局和样式。注意：选择后需填写对应字段。',
              options: {
                list: [
                  { title: "图文混排", value: "textImage" },
                  { title: "全宽图片", value: "fullImage" },
                  { title: "信息卡片", value: "infoCard" },
                  { title: "数据统计", value: "stats" },
                  { title: "流程时间线", value: "processTimeline" },
                  { title: "医生简介", value: "doctorProfile" },
                  { title: "案例展示", value: "caseStudy" },
                  { title: "内嵌 CTA", value: "inlineCta" },
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({ name: "anchor", title: "锚点", type: "string", description: '前台位置：目录跳转目标。是否建议修改：谨慎改。修改效果：目录点击后跳转到此锚点。注意：需与目录项锚点一致。' }),
            defineField({ name: "title", title: "标题", type: "string", description: '前台位置：内容块标题。是否建议修改：建议改。修改效果：内容块的主标题。' }),
            defineField({ name: "subtitle", title: "副标题", type: "string", description: '前台位置：内容块副标题。是否建议修改：建议改。修改效果：补充说明标题。' }),
            defineField({ name: "body", title: "正文内容", type: "text", rows: 6, description: '前台位置：内容块正文。是否建议修改：建议改。修改效果：详细内容展示。注意：支持换行分段。' }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt", description: '前台位置：内容块配图。是否建议修改：建议改。修改效果：增强内容的视觉展示。注意：建议 800×600px。' }),
            defineField({
              name: "imagePosition",
              title: "图片位置",
              type: "string",
              description: '前台位置：图片相对于文字的位置。是否建议修改：可不改。修改效果：改变图文排列方式。',
              options: {
                list: [
                  { title: "左侧", value: "left" },
                  { title: "右侧", value: "right" },
                ],
              },
            }),
            defineField({ name: "caption", title: "图片说明", type: "string", description: '前台位置：图片下方说明文字。是否建议修改：可不改。修改效果：图片的补充说明。' }),
            defineField({
              name: "cardTone",
              title: "卡片色调",
              type: "string",
              description: '前台位置：信息卡片的背景色调。是否建议修改：可不改。修改效果：改变卡片的视觉风格。',
              options: {
                list: [
                  { title: "蓝色", value: "blue" },
                  { title: "警告", value: "warning" },
                  { title: "成功", value: "success" },
                  { title: "中性", value: "neutral" },
                ],
              },
            }),
            defineField({ name: "buttonText", title: "按钮文字", type: "string", description: '前台位置：内容块按钮文案。是否建议修改：可不改。修改效果：按钮文字。' }),
            defineField({ name: "buttonLink", title: "按钮链接", type: "string", description: '前台位置：内容块按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式。' }),
            defineField({
              name: "items",
              title: "子项列表",
              type: "array",
              description: '前台位置：内容块内的子项列表。是否建议修改：建议改。修改效果：展示多个子项内容。',
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "标题", type: "string", description: '前台位置：子项标题。是否建议修改：建议改。修改效果：子项名称。' }),
                    defineField({ name: "description", title: "描述", type: "text", description: '前台位置：子项描述。是否建议修改：建议改。修改效果：子项详细说明。' }),
                    defineField({ name: "value", title: "数值", type: "string", description: '前台位置：子项数值（数据统计类型时使用）。是否建议修改：建议改。修改效果：展示数据。' }),
                    defineField({ name: "icon", title: "图标名称", type: "string", description: '前台位置：子项图标。是否建议修改：谨慎改。修改效果：改变子项图标。注意：使用系统提供的图标名称。' }),
                    defineField({ name: "image", title: "图片", type: "imageWithAlt", description: '前台位置：子项配图。是否建议修改：建议改。修改效果：增强子项视觉展示。注意：建议 400×300px。' }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),

    // ── 医生/顾问模块 ──
    defineField({ name: "doctorName", title: "医生姓名", type: "string", description: '前台位置：医生模块姓名。是否建议修改：建议改。修改效果：展示医生身份。' }),
    defineField({ name: "doctorTitle", title: "医生职称", type: "string", description: '前台位置：医生模块职称。是否建议修改：建议改。修改效果：展示医生资质。' }),
    defineField({ name: "doctorExperience", title: "医生经历", type: "text", rows: 3, description: '前台位置：医生模块经历介绍。是否建议修改：建议改。修改效果：详细介绍医生背景。' }),
    defineField({
      name: "doctorSpecialties",
      title: "医生专长",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: '前台位置：医生模块专长标签。是否建议修改：建议改。修改效果：展示医生专长领域。注意：建议 3-5 个标签。',
    }),
    defineField({ name: "doctorAvatar", title: "医生头像", type: "imageWithAlt", description: '前台位置：医生模块头像。是否建议修改：建议改。修改效果：展示医生形象。注意：建议 400×400px 正方形。' }),
    defineField({ name: "doctorButtonText", title: "医生按钮文字", type: "string", description: '前台位置：医生模块按钮文案。是否建议修改：可不改。修改效果：按钮文字。' }),
    defineField({ name: "doctorButtonLink", title: "医生按钮链接", type: "string", description: '前台位置：医生模块按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式。' }),

    // ── 案例模块 ──
    defineField({
      name: "caseItems",
      title: "案例列表",
      type: "array",
      description: '前台位置：案例卡片列表。是否建议修改：建议改。修改效果：展示真实案例。注意：案例内容需去隐私化，不承诺结果。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：案例卡片标题。是否建议修改：建议改。修改效果：展示案例名称。' }),
            defineField({ name: "profile", title: "家庭情况", type: "string", description: '前台位置：案例卡片家庭情况。是否建议修改：建议改。修改效果：描述客户背景。注意：需去隐私化。' }),
            defineField({ name: "story", title: "案例故事", type: "text", description: '前台位置：案例卡片故事。是否建议修改：建议改。修改效果：详细描述案例经过。注意：需去隐私化。' }),
            defineField({ name: "resultDescription", title: "结果说明", type: "text", description: '前台位置：案例结果说明。是否建议修改：谨慎改。修改效果：描述案例结果。注意：必须去隐私化，不得使用承诺性语言。' }),
            defineField({ name: "testimonial", title: "客户感言", type: "text", description: '前台位置：案例卡片客户感言。是否建议修改：建议改。修改效果：展示客户反馈。注意：需确保已获客户授权。' }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt", description: '前台位置：案例卡片配图。是否建议修改：建议改。修改效果：增强案例的视觉展示。注意：需确保已获客户授权。' }),
          ],
        },
      ],
    }),

    // ── FAQ ──
    defineField({ name: "faqTitle", title: "FAQ - 标题", type: "string", description: '前台位置：FAQ 模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "faqDescription", title: "FAQ - 描述", type: "text", rows: 3, description: '前台位置：FAQ 模块描述。是否建议修改：建议改。修改效果：补充说明常见问题。' }),
    defineField({
      name: "faqItems",
      title: "FAQ 列表",
      type: "array",
      description: '前台位置：FAQ 问答列表。是否建议修改：建议改。修改效果：展示常见问题和解答。注意：建议 5-10 个问题。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "问题", type: "string", validation: (r) => r.required(), description: '前台位置：FAQ 问题标题。是否建议修改：建议改。修改效果：展示问题内容。注意：建议简洁明了。' }),
            defineField({ name: "answer", title: "回答", type: "text", validation: (r) => r.required(), description: '前台位置：FAQ 问题回答。是否建议修改：建议改。修改效果：展示问题解答。注意：建议 30-100 字。' }),
          ],
        },
      ],
    }),

    // ── Sidebar ──
    defineField({ name: "sidebarTitle", title: "侧边栏标题", type: "string", description: '前台位置：侧边栏标题。是否建议修改：可不改。修改效果：侧边栏主标题。' }),
    defineField({ name: "sidebarDescription", title: "侧边栏描述", type: "text", rows: 3, description: '前台位置：侧边栏描述文字。是否建议修改：建议改。修改效果：引导用户咨询。' }),
    defineField({ name: "sidebarPrimaryButtonText", title: "侧边栏主按钮文字", type: "string", description: '前台位置：侧边栏主按钮文案。是否建议修改：可不改。修改效果：按钮文字。' }),
    defineField({ name: "sidebarPrimaryButtonLink", title: "侧边栏主按钮链接", type: "string", description: '前台位置：侧边栏主按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式。' }),
    defineField({ name: "sidebarSecondaryButtonText", title: "侧边栏次按钮文字", type: "string", description: '前台位置：侧边栏次按钮文案。是否建议修改：可不改。修改效果：按钮文字。' }),
    defineField({ name: "sidebarSecondaryButtonLink", title: "侧边栏次按钮链接", type: "string", description: '前台位置：侧边栏次按钮跳转地址。是否建议修改：谨慎改。修改效果：点击次按钮后的跳转目标。注意：站内用 /path 形式。' }),
    defineField({ name: "sidebarPhoneLabel", title: "侧边栏电话标签", type: "string", description: '前台位置：侧边栏电话标签文字。是否建议修改：可不改。修改效果：电话号码前的标签。' }),
    defineField({ name: "sidebarPhone", title: "侧边栏电话", type: "string", description: '前台位置：侧边栏联系电话。是否建议修改：必改。修改效果：影响侧边栏咨询电话。注意：填写完整号码。' }),
    defineField({ name: "sidebarWechatText", title: "侧边栏微信文案", type: "string", description: '前台位置：侧边栏微信咨询文案。是否建议修改：可不改。修改效果：微信咨询按钮文字。' }),
    defineField({ name: "sidebarWhatsappText", title: "侧边栏 WhatsApp 文案", type: "string", description: '前台位置：侧边栏 WhatsApp 咨询文案。是否建议修改：可不改。修改效果：WhatsApp 咨询按钮文字。' }),
    defineField({
      name: "sidebarHotArticles",
      title: "侧边栏热门文章",
      type: "array",
      description: '前台位置：侧边栏热门文章链接列表。是否建议修改：建议改。修改效果：展示热门文章入口。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：文章链接文字。是否建议修改：建议改。修改效果：链接显示文字。' }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: '前台位置：文章跳转地址。是否建议修改：谨慎改。修改效果：点击后的跳转目标。注意：站内用 /news/slug 形式。' }),
          ],
        },
      ],
    }),
    defineField({
      name: "sidebarRelatedLinks",
      title: "侧边栏相关链接",
      type: "array",
      description: '前台位置：侧边栏相关链接列表。是否建议修改：建议改。修改效果：展示相关页面入口。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：链接文字。是否建议修改：建议改。修改效果：链接显示文字。' }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: '前台位置：跳转地址。是否建议修改：谨慎改。修改效果：点击后的跳转目标。注意：站内用 /path 形式。' }),
          ],
        },
      ],
    }),
    defineField({
      name: "sidebarCountries",
      title: "侧边栏国家列表",
      type: "array",
      description: '前台位置：侧边栏国家/地区链接列表。是否建议修改：建议改。修改效果：展示服务覆盖的国家/地区。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：国家/地区名称。是否建议修改：建议改。修改效果：链接显示文字。' }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: '前台位置：跳转地址。是否建议修改：谨慎改。修改效果：点击后的跳转目标。注意：站内用 /path 形式。' }),
          ],
        },
      ],
    }),

    // ── 最终 CTA ──
    defineField({ name: "finalCtaTitle", title: "最终 CTA - 标题", type: "string", description: '前台位置：页面底部 CTA 标题。是否建议修改：建议改。修改效果：引导用户咨询的主标题。' }),
    defineField({ name: "finalCtaDescription", title: "最终 CTA - 描述", type: "text", rows: 3, description: '前台位置：CTA 描述文字。是否建议修改：建议改。修改效果：引导用户咨询的说明。' }),
    defineField({ name: "finalCtaPrimaryButtonText", title: "主按钮文字", type: "string", description: '前台位置：CTA 主按钮文案。是否建议修改：可不改。修改效果：主按钮文字。' }),
    defineField({ name: "finalCtaPrimaryButtonLink", title: "主按钮链接", type: "string", description: '前台位置：CTA 主按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式。' }),
    defineField({ name: "finalCtaSecondaryButtonText", title: "次按钮文字", type: "string", description: '前台位置：CTA 次按钮文案。是否建议修改：可不改。修改效果：次按钮文字。' }),
    defineField({ name: "finalCtaSecondaryButtonLink", title: "次按钮链接", type: "string", description: '前台位置：CTA 次按钮跳转地址。是否建议修改：谨慎改。修改效果：点击次按钮后的跳转目标。注意：站内用 /path 形式。' }),
    defineField({ name: "finalCtaBackgroundImage", title: "背景图片", type: "imageWithAlt", description: '前台位置：CTA 背景大图。是否建议修改：建议改。修改效果：影响 CTA 区域视觉效果。注意：建议 1920×600px。' }),
  ],
  preview: {
    prepare() {
      return { title: "私人订制页面" };
    },
  },
});
