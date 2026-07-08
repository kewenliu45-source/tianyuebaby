import { defineField, defineType } from "sanity";

export const newsPage = defineType({
  name: "newsPage",
  title: "新闻资讯页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({
      name: "pageTitle",
      title: "页面标题",
      type: "string",
      description:
        '前台位置：浏览器标签页标题及 SEO title。是否建议修改：建议改。修改效果：影响搜索引擎展示标题。注意：建议 50-60 字符。',
    }),
    defineField({
      name: "pageDescription",
      title: "页面描述",
      type: "text",
      rows: 3,
      description:
        '前台位置：搜索引擎结果摘要。是否建议修改：建议改。修改效果：影响搜索结果中的描述文字。注意：建议 120-160 字。',
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description:
        '前台位置：SEO 相关高级设置。是否建议修改：可不改。修改效果：控制搜索引擎索引行为。注意：非专业人员不建议修改。',
    }),

    // ── Hero ──
    defineField({
      name: "heroTitle",
      title: "Hero 标题",
      type: "string",
      description:
        '前台位置：新闻页面顶部大标题。是否建议修改：建议改。修改效果：用户进入页面第一眼看到的主标题。注意：建议 10-25 字。',
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero 副标题",
      type: "string",
      description:
        '前台位置：Hero 主标题下方。是否建议修改：建议改。修改效果：补充说明主标题。注意：建议 10-30 字。',
    }),
    defineField({
      name: "heroDescription",
      title: "Hero 描述",
      type: "text",
      rows: 3,
      description:
        '前台位置：Hero 区域描述文字。是否建议修改：建议改。修改效果：详细介绍新闻板块内容。注意：建议 30-80 字。',
    }),
    defineField({
      name: "heroImage",
      title: "Hero 背景图",
      type: "imageWithAlt",
      description:
        '前台位置：新闻页面顶部背景图。是否建议修改：建议改。修改效果：影响页面第一印象。注意：建议 1920×600px，500KB 以内。',
    }),
    defineField({
      name: "heroPrimaryButtonText",
      title: "Hero 主按钮文字",
      type: "string",
      description:
        '前台位置：Hero 区域主按钮文案。是否建议修改：可不改。修改效果：引导用户操作。注意：如「浏览最新资讯」。',
    }),
    defineField({
      name: "heroPrimaryButtonLink",
      title: "Hero 主按钮链接",
      type: "string",
      description:
        '前台位置：Hero 主按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式，锚点用 #id 形式。',
    }),

    // ── 品牌历程/时间轴 ──
    defineField({
      name: "timelineTitle",
      title: "品牌历程标题",
      type: "string",
      description:
        '前台位置：品牌历程模块标题。是否建议修改：可不改。修改效果：概括下方时间轴的主题。',
    }),
    defineField({
      name: "timelineDescription",
      title: "品牌历程描述",
      type: "text",
      rows: 3,
      description:
        '前台位置：品牌历程模块描述。是否建议修改：建议改。修改效果：补充说明品牌发展历程。注意：建议 30-80 字。',
    }),
    defineField({
      name: "timelineItems",
      title: "时间轴节点",
      type: "array",
      description:
        '前台位置：品牌历程时间轴上的各个节点。是否建议修改：建议改。修改效果：展示品牌发展的重要里程碑。注意：建议按时间顺序排列。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "年份", type: "string", description: '前台位置：时间轴节点年份标识。是否建议修改：建议改。修改效果：标识时间节点。注意：如「2020」或「2020年」。' }),
            defineField({ name: "title", title: "标题", type: "string", description: '前台位置：时间轴节点标题。是否建议修改：建议改。修改效果：概括该年重要事件。注意：建议 5-15 字。' }),
            defineField({ name: "description", title: "描述", type: "text", description: '前台位置：时间轴节点详细描述。是否建议修改：建议改。修改效果：补充说明事件详情。注意：建议 20-50 字。' }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt", description: '前台位置：时间轴节点配图。是否建议修改：建议改。修改效果：增强视觉表现力。注意：建议 400×300px。' }),
          ],
        },
      ],
    }),

    // ── Breadcrumb ──
    defineField({
      name: "breadcrumbCurrentLabel",
      title: "面包屑当前页标签",
      type: "string",
      description:
        '前台位置：面包屑导航最后一项文字。是否建议修改：可不改。修改效果：改变面包屑显示的文字。注意：默认「新闻资讯」。',
    }),

    // ── 列表区 ──
    defineField({
      name: "listTitle",
      title: "列表区标题",
      type: "string",
      description:
        '前台位置：新闻列表区域标题。是否建议修改：可不改。修改效果：新闻列表上方的标题文字。',
    }),
    defineField({
      name: "listDescription",
      title: "列表区描述",
      type: "text",
      rows: 3,
      description:
        '前台位置：新闻列表区域描述。是否建议修改：建议改。修改效果：新闻列表上方的描述文字。注意：建议 20-60 字。',
    }),

    // ── Sidebar 咨询 ──
    defineField({
      name: "sidebarConsultTitle",
      title: "侧栏咨询标题",
      type: "string",
      description:
        '前台位置：新闻详情页侧栏咨询卡片标题。是否建议修改：可不改。修改效果：侧栏咨询卡片的标题。',
    }),
    defineField({
      name: "sidebarConsultDescription",
      title: "侧栏咨询描述",
      type: "text",
      rows: 3,
      description:
        '前台位置：侧栏咨询卡片描述。是否建议修改：建议改。修改效果：引导用户咨询。注意：建议 20-60 字。',
    }),
    defineField({
      name: "sidebarConsultButtonText",
      title: "侧栏咨询按钮文字",
      type: "string",
      description:
        '前台位置：侧栏咨询按钮文案。是否建议修改：可不改。修改效果：按钮文字。注意：如「立即咨询」。',
    }),
    defineField({
      name: "sidebarConsultButtonLink",
      title: "侧栏咨询按钮链接",
      type: "string",
      description:
        '前台位置：侧栏咨询按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式。',
    }),

    // ── Sidebar 资源 ──
    defineField({
      name: "sidebarResourceTitle",
      title: "侧栏资源标题",
      type: "string",
      description:
        '前台位置：侧栏资源卡片标题。是否建议修改：可不改。修改效果：资源卡片的标题。',
    }),
    defineField({
      name: "sidebarResourceDescription",
      title: "侧栏资源描述",
      type: "text",
      rows: 3,
      description:
        '前台位置：侧栏资源卡片描述。是否建议修改：建议改。修改效果：资源卡片的说明文字。',
    }),
    defineField({
      name: "sidebarResourceImage",
      title: "侧栏资源图片",
      type: "imageWithAlt",
      description:
        '前台位置：侧栏资源卡片配图。是否建议修改：建议改。修改效果：资源卡片的视觉展示。注意：建议 400×300px。',
    }),

    // ── Sidebar 专家 ──
    defineField({
      name: "sidebarExpertsTitle",
      title: "侧栏专家标题",
      type: "string",
      description:
        '前台位置：侧栏专家卡片标题。是否建议修改：可不改。修改效果：专家卡片的标题。',
    }),
    defineField({
      name: "sidebarExpertsDescription",
      title: "侧栏专家描述",
      type: "text",
      rows: 3,
      description:
        '前台位置：侧栏专家卡片描述。是否建议修改：建议改。修改效果：专家卡片的说明文字。',
    }),
    defineField({
      name: "sidebarExpertItems",
      title: "专家列表",
      type: "array",
      description:
        '前台位置：侧栏专家卡片列表。是否建议修改：建议改。修改效果：展示专家信息。注意：建议 2-4 位专家。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", description: '前台位置：专家卡片标题，如专家姓名。是否建议修改：建议改。修改效果：展示专家身份。' }),
            defineField({ name: "description", title: "描述", type: "text", description: '前台位置：专家卡片描述。是否建议修改：建议改。修改效果：补充说明专家专长。' }),
            defineField({ name: "icon", title: "图标", type: "string", description: '前台位置：专家卡片图标。是否建议修改：可不改。修改效果：增强视觉识别度。' }),
          ],
        },
      ],
    }),

    // ── Sidebar 精选/服务 ──
    defineField({
      name: "sidebarFeaturedTitle",
      title: "侧栏精选案例标题",
      type: "string",
      description:
        '前台位置：侧栏精选案例标题。是否建议修改：可不改。修改效果：精选案例卡片的标题。',
    }),
    defineField({
      name: "sidebarServiceTitle",
      title: "侧栏服务通道标题",
      type: "string",
      description:
        '前台位置：侧栏服务通道标题。是否建议修改：可不改。修改效果：服务通道卡片的标题。',
    }),
    defineField({
      name: "sidebarServiceItems",
      title: "服务通道列表",
      type: "array",
      description:
        '前台位置：侧栏服务通道链接列表。是否建议修改：建议改。修改效果：展示相关服务入口。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", description: '前台位置：服务通道链接文字。是否建议修改：建议改。修改效果：链接显示文字。' }),
            defineField({ name: "href", title: "链接", type: "string", description: '前台位置：服务通道跳转地址。是否建议修改：谨慎改。修改效果：点击后的跳转目标。注意：站内用 /path 形式。' }),
            defineField({ name: "icon", title: "图标", type: "string", description: '前台位置：服务通道图标。是否建议修改：可不改。修改效果：增强视觉识别度。' }),
          ],
        },
      ],
    }),

    // ── 底部品牌沉淀区 ──
    defineField({
      name: "brandSectionTitle",
      title: "品牌沉淀区标题",
      type: "string",
      description:
        '前台位置：页面底部品牌沉淀区标题。是否建议修改：建议改。修改效果：品牌沉淀模块的主标题。',
    }),
    defineField({
      name: "brandSectionSubtitle",
      title: "品牌沉淀区副标题",
      type: "string",
      description:
        '前台位置：品牌沉淀区副标题。是否建议修改：建议改。修改效果：补充说明品牌沉淀主题。',
    }),
    defineField({
      name: "brandSectionDescription",
      title: "品牌沉淀区描述",
      type: "text",
      rows: 4,
      description:
        '前台位置：品牌沉淀区描述文字。是否建议修改：建议改。修改效果：详细介绍品牌沉淀内容。注意：建议 50-150 字。',
    }),
    defineField({
      name: "brandSectionBackgroundImage",
      title: "品牌沉淀区背景图",
      type: "imageWithAlt",
      description:
        '前台位置：品牌沉淀区背景大图。是否建议修改：建议改。修改效果：影响品牌沉淀区视觉效果。注意：建议 1920×800px。',
    }),

    // ── 在线咨询区 ──
    defineField({
      name: "consultationTitle",
      title: "在线咨询区标题",
      type: "string",
      description:
        '前台位置：页面底部在线咨询 CTA 标题。是否建议修改：建议改。修改效果：引导用户咨询的主标题。',
    }),
    defineField({
      name: "consultationDescription",
      title: "在线咨询区描述",
      type: "text",
      rows: 3,
      description:
        '前台位置：在线咨询 CTA 描述。是否建议修改：建议改。修改效果：引导用户咨询的说明文字。注意：建议 20-60 字。',
    }),
    defineField({
      name: "consultationBackgroundImage",
      title: "在线咨询区背景图",
      type: "imageWithAlt",
      description:
        '前台位置：在线咨询 CTA 背景图。是否建议修改：建议改。修改效果：影响在线咨询区视觉效果。注意：建议 1920×600px。',
    }),
  ],
  preview: {
    prepare() {
      return { title: "新闻资讯页面" };
    },
  },
});
