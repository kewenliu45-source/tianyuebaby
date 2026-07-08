import { defineField, defineType } from "sanity";

export const medicalServicesPage = defineType({
  name: "medicalServicesPage",
  title: "医疗服务页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({
      name: "pageTitle",
      title: "页面标题",
      type: "string",
      description: "前台位置：浏览器标签页标题及搜索结果标题。是否建议修改：建议改。修改效果：影响 SEO 搜索结果展示。注意：建议控制在 30 字以内，包含核心关键词。",
    }),
    defineField({
      name: "pageDescription",
      title: "页面描述",
      type: "text",
      rows: 3,
      description: "前台位置：搜索结果中的页面摘要描述。是否建议修改：建议改。修改效果：影响搜索引擎点击率。注意：建议 80-160 字，简明扼要说明页面核心内容。",
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "前台位置：SEO 高级设置。是否可不改：可不改。修改效果：影响搜索引擎收录。注意：非专业人员建议保持默认。",
    }),

    // ── Hero ──
    defineField({
      name: "heroTitle",
      title: "Hero 标题",
      type: "string",
      description: "前台位置：页面顶部大图区域的主标题。是否建议修改：建议改。修改效果：用户进入页面第一眼看到的文字，影响转化率。注意：建议简洁有力，10-20 字为宜。",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero 副标题",
      type: "string",
      description: "前台位置：Hero 区域主标题下方的副标题。是否建议修改：建议改。修改效果：补充说明主标题，增强吸引力。",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero 描述",
      type: "text",
      rows: 3,
      description: "前台位置：Hero 区域的详细描述文字。是否建议修改：建议改。修改效果：向用户传达核心服务价值。注意：建议 50-100 字。",
    }),
    defineField({
      name: "heroImage",
      title: "Hero 背景图",
      type: "imageWithAlt",
      description: "前台位置：页面顶部大图区域的背景图。是否建议修改：建议改。修改效果：直接影响页面视觉效果和用户第一印象。注意：建议尺寸 1920x800 像素，文件不超过 500KB。",
    }),
    defineField({
      name: "heroPrimaryButtonText",
      title: "Hero 主按钮文字",
      type: "string",
      description: "前台位置：Hero 区域主按钮上显示的文字。是否可不改：可不改。修改效果：影响用户点击意愿。",
    }),
    defineField({
      name: "heroPrimaryButtonLink",
      title: "Hero 主按钮链接",
      type: "string",
      description: "前台位置：Hero 主按钮的跳转地址。是否谨慎改：谨慎改。修改效果：点击按钮后跳转到目标页面。注意：站内用 /path 形式，不要填不存在的地址。",
    }),

    // ── 品牌历程/时间轴 ──
    defineField({
      name: "timelineTitle",
      title: "品牌历程标题",
      type: "string",
      description: "前台位置：品牌历程/时间轴区域的标题。是否建议修改：建议改。修改效果：引导用户了解品牌发展历程。",
    }),
    defineField({
      name: "timelineDescription",
      title: "品牌历程描述",
      type: "text",
      rows: 3,
      description: "前台位置：品牌历程标题下方的描述文字。是否建议修改：建议改。修改效果：补充说明品牌发展历程的整体概况。",
    }),
    defineField({
      name: "timelineItems",
      title: "时间轴节点",
      type: "array",
      description: "前台位置：品牌历程时间轴的各个节点。是否建议修改：建议改。修改效果：展示品牌发展的重要里程碑。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "年份", type: "string", description: "前台位置：时间轴节点显示的年份。是否建议修改：建议改。修改效果：标识时间节点。注意：格式如 2020、2021。" }),
            defineField({ name: "title", title: "标题", type: "string", description: "前台位置：时间轴节点的标题。是否建议修改：建议改。修改效果：概括该时间节点的核心事件。" }),
            defineField({ name: "description", title: "描述", type: "text", description: "前台位置：时间轴节点的详细描述。是否建议修改：建议改。修改效果：补充说明该时间节点的具体内容。" }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt", description: "前台位置：时间轴节点的配图。是否建议修改：建议改。修改效果：增强视觉展示效果。注意：建议尺寸 800x600 像素。" }),
          ],
        },
      ],
    }),

    // ── Breadcrumb ──
    defineField({
      name: "breadcrumbCurrentLabel",
      title: "面包屑当前页标签",
      type: "string",
      description: "前台位置：面包屑导航中当前页面的显示文字。是否谨慎改：谨慎改。修改效果：影响导航层级展示。注意：应与页面实际内容一致。",
    }),

    // ── 页面导语 ──
    defineField({
      name: "introTitle",
      title: "导语标题",
      type: "string",
      description: "前台位置：页面导语区域的标题。是否建议修改：建议改。修改效果：引导用户了解页面核心内容。",
    }),
    defineField({
      name: "introDescription",
      title: "导语描述",
      type: "text",
      rows: 4,
      description: "前台位置：导语标题下方的描述文字。是否建议修改：建议改。修改效果：详细说明医疗服务的整体介绍。注意：建议 100-200 字。",
    }),
    defineField({
      name: "introImage",
      title: "导语图片",
      type: "imageWithAlt",
      description: "前台位置：导语区域的配图。是否建议修改：建议改。修改效果：增强页面视觉吸引力。注意：建议尺寸 800x600 像素。",
    }),

    // ── 核心服务模块 ──
    defineField({
      name: "serviceSections",
      title: "核心服务模块",
      type: "array",
      description: "前台位置：页面中部的核心服务展示区域。是否建议修改：建议改。修改效果：展示各项医疗服务的详细内容。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "sectionNumber", title: "编号", type: "string", description: "前台位置：服务模块左上角显示的编号。是否可不改：可不改。修改效果：标识服务模块顺序。" }),
            defineField({ name: "title", title: "标题", type: "string", description: "前台位置：服务模块的主标题。是否建议修改：建议改。修改效果：概括该服务的核心内容。" }),
            defineField({ name: "subtitle", title: "副标题", type: "string", description: "前台位置：服务模块标题下方的副标题。是否建议修改：建议改。修改效果：补充说明服务特点。" }),
            defineField({ name: "body", title: "正文", type: "text", rows: 4, description: "前台位置：服务模块的详细描述文字。是否建议修改：建议改。修改效果：向用户介绍该服务的具体内容。注意：建议 100-300 字。" }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt", description: "前台位置：服务模块的配图。是否建议修改：建议改。修改效果：增强服务展示的视觉效果。注意：建议尺寸 800x600 像素。" }),
            defineField({
              name: "imagePosition",
              title: "图片位置",
              type: "string",
              description: "前台位置：图片在模块中的显示位置。是否可不改：可不改。修改效果：调整图片与文字的布局关系。",
              options: {
                list: [
                  { title: "左侧", value: "left" },
                  { title: "右侧", value: "right" },
                ],
              },
            }),
            defineField({ name: "buttonText", title: "按钮文字", type: "string", description: "前台位置：服务模块底部的按钮文字。是否可不改：可不改。修改效果：引导用户进行下一步操作。" }),
            defineField({ name: "buttonLink", title: "按钮链接", type: "string", description: "前台位置：服务模块按钮的跳转地址。是否谨慎改：谨慎改。修改效果：点击按钮后跳转到目标页面。注意：站内用 /path 形式，不要填不存在的地址。" }),
            defineField({
              name: "items",
              title: "子项列表",
              type: "array",
              description: "前台位置：服务模块内的子项展示区域。是否建议修改：建议改。修改效果：展示该服务的具体细分项目。",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "标题", type: "string", description: "前台位置：子项的标题。是否建议修改：建议改。修改效果：标识该子项的名称。" }),
                    defineField({ name: "description", title: "描述", type: "text", description: "前台位置：子项的描述文字。是否建议修改：建议改。修改效果：说明该子项的具体内容。" }),
                    defineField({ name: "value", title: "数值", type: "string", description: "前台位置：子项显示的数值（如成功率、数量等）。是否建议修改：建议改。修改效果：用数据增强说服力。" }),
                    defineField({ name: "icon", title: "图标", type: "string", description: "前台位置：子项显示的图标名称。是否可不改：可不改。修改效果：增强视觉识别度。注意：需使用系统支持的图标名称。" }),
                    defineField({ name: "image", title: "图片", type: "imageWithAlt", description: "前台位置：子项的配图。是否建议修改：建议改。修改效果：增强子项的视觉展示。注意：建议尺寸 400x300 像素。" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),

    // ── 优势 Banner ──
    defineField({
      name: "advantagesTitle",
      title: "优势标题",
      type: "string",
      description: "前台位置：优势展示区域的标题。是否建议修改：建议改。修改效果：引导用户关注服务优势。",
    }),
    defineField({
      name: "advantagesDescription",
      title: "优势描述",
      type: "text",
      rows: 3,
      description: "前台位置：优势标题下方的描述文字。是否建议修改：建议改。修改效果：补充说明整体优势概况。",
    }),
    defineField({
      name: "advantagesImage",
      title: "优势图片",
      type: "imageWithAlt",
      description: "前台位置：优势展示区域的配图。是否建议修改：建议改。修改效果：增强优势区域的视觉效果。注意：建议尺寸 800x600 像素。",
    }),
    defineField({
      name: "advantageItems",
      title: "优势列表",
      type: "array",
      description: "前台位置：优势展示区域的各项优势。是否建议修改：建议改。修改效果：逐一展示服务的核心优势。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", description: "前台位置：优势项的标题。是否建议修改：建议改。修改效果：概括该项优势的核心卖点。" }),
            defineField({ name: "description", title: "描述", type: "text", description: "前台位置：优势项的详细描述。是否建议修改：建议改。修改效果：说明该项优势的具体内容。" }),
            defineField({ name: "icon", title: "图标", type: "string", description: "前台位置：优势项显示的图标名称。是否可不改：可不改。修改效果：增强视觉识别度。注意：需使用系统支持的图标名称。" }),
          ],
        },
      ],
    }),

    // ── 相关推荐 ──
    defineField({
      name: "relatedTitle",
      title: "相关推荐标题",
      type: "string",
      description: "前台位置：相关推荐区域的标题。是否建议修改：建议改。修改效果：引导用户查看更多相关内容。",
    }),
    defineField({
      name: "relatedItems",
      title: "相关推荐列表",
      type: "array",
      description: "前台位置：相关推荐区域的推荐项。是否建议修改：建议改。修改效果：引导用户浏览更多服务或内容。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", description: "前台位置：推荐项的标题。是否建议修改：建议改。修改效果：吸引用户点击查看详情。" }),
            defineField({ name: "description", title: "描述", type: "text", description: "前台位置：推荐项的简要描述。是否建议修改：建议改。修改效果：补充说明推荐内容。" }),
            defineField({ name: "href", title: "链接", type: "string", description: "前台位置：推荐项的跳转地址。是否谨慎改：谨慎改。修改效果：点击后跳转到对应页面。注意：站内用 /path 形式，不要填不存在的地址。" }),
          ],
        },
      ],
    }),

    // ── 服务流程 ──
    defineField({
      name: "processTitle",
      title: "服务流程标题",
      type: "string",
      description: "前台位置：服务流程区域的标题。是否建议修改：建议改。修改效果：引导用户了解服务流程。",
    }),
    defineField({
      name: "processDescription",
      title: "服务流程描述",
      type: "text",
      rows: 3,
      description: "前台位置：服务流程标题下方的描述文字。是否建议修改：建议改。修改效果：补充说明服务流程的整体概况。",
    }),
    defineField({
      name: "processSteps",
      title: "流程步骤",
      type: "array",
      description: "前台位置：服务流程区域的各个步骤。是否建议修改：建议改。修改效果：展示服务的完整流程，增强用户信任感。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", description: "前台位置：流程步骤的标题。是否建议修改：建议改。修改效果：概括该步骤的核心内容。" }),
            defineField({ name: "description", title: "描述", type: "text", description: "前台位置：流程步骤的详细描述。是否建议修改：建议改。修改效果：说明该步骤的具体操作。" }),
            defineField({ name: "icon", title: "图标", type: "string", description: "前台位置：流程步骤显示的图标名称。是否可不改：可不改。修改效果：增强视觉识别度。注意：需使用系统支持的图标名称。" }),
          ],
        },
      ],
    }),

    // ── Sidebar 咨询 ──
    defineField({
      name: "sidebarConsultTitle",
      title: "侧栏咨询标题",
      type: "string",
      description: "前台位置：侧栏咨询模块的标题。是否建议修改：建议改。修改效果：吸引用户进行在线咨询。",
    }),
    defineField({
      name: "sidebarConsultDescription",
      title: "侧栏咨询描述",
      type: "text",
      rows: 3,
      description: "前台位置：侧栏咨询标题下方的描述文字。是否建议修改：建议改。修改效果：引导用户进行咨询。",
    }),
    defineField({
      name: "sidebarConsultButtonText",
      title: "侧栏咨询按钮文字",
      type: "string",
      description: "前台位置：侧栏咨询按钮上显示的文字。是否可不改：可不改。修改效果：影响用户点击意愿。",
    }),
    defineField({
      name: "sidebarConsultButtonLink",
      title: "侧栏咨询按钮链接",
      type: "string",
      description: "前台位置：侧栏咨询按钮的跳转地址。是否谨慎改：谨慎改。修改效果：点击按钮后跳转到目标页面。注意：站内用 /path 形式，不要填不存在的地址。",
    }),

    // ── Sidebar 资源 ──
    defineField({
      name: "sidebarResourceTitle",
      title: "侧栏资源标题",
      type: "string",
      description: "前台位置：侧栏资源模块的标题。是否建议修改：建议改。修改效果：引导用户查看相关资源。",
    }),
    defineField({
      name: "sidebarResourceDescription",
      title: "侧栏资源描述",
      type: "text",
      rows: 3,
      description: "前台位置：侧栏资源标题下方的描述文字。是否建议修改：建议改。修改效果：补充说明资源内容。",
    }),
    defineField({
      name: "sidebarResourceImage",
      title: "侧栏资源图片",
      type: "imageWithAlt",
      description: "前台位置：侧栏资源模块的配图。是否建议修改：建议改。修改效果：增强资源区域的视觉效果。注意：建议尺寸 600x400 像素。",
    }),

    // ── Sidebar 专家 ──
    defineField({
      name: "sidebarExpertsTitle",
      title: "侧栏专家标题",
      type: "string",
      description: "前台位置：侧栏专家模块的标题。是否建议修改：建议改。修改效果：引导用户了解专家团队。",
    }),
    defineField({
      name: "sidebarExpertsDescription",
      title: "侧栏专家描述",
      type: "text",
      rows: 3,
      description: "前台位置：侧栏专家标题下方的描述文字。是否建议修改：建议改。修改效果：补充说明专家团队概况。",
    }),
    defineField({
      name: "sidebarExpertItems",
      title: "专家列表",
      type: "array",
      description: "前台位置：侧栏专家模块的专家列表。是否建议修改：建议改。修改效果：展示专家团队成员信息。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", description: "前台位置：专家的姓名或头衔。是否建议修改：建议改。修改效果：标识专家身份。" }),
            defineField({ name: "description", title: "描述", type: "text", description: "前台位置：专家的简介或擅长领域。是否建议修改：建议改。修改效果：增强用户对专家的信任感。" }),
            defineField({ name: "icon", title: "图标", type: "string", description: "前台位置：专家项显示的图标名称。是否可不改：可不改。修改效果：增强视觉识别度。注意：需使用系统支持的图标名称。" }),
          ],
        },
      ],
    }),

    // ── Sidebar 精选案例 ──
    defineField({
      name: "sidebarFeaturedCaseTitle",
      title: "侧栏精选案例标题",
      type: "string",
      description: "前台位置：侧栏精选案例模块的标题。是否建议修改：建议改。修改效果：引导用户查看成功案例。",
    }),
    defineField({
      name: "sidebarFeaturedCaseDescription",
      title: "侧栏精选案例描述",
      type: "text",
      rows: 3,
      description: "前台位置：侧栏精选案例标题下方的描述文字。是否建议修改：建议改。修改效果：简要介绍案例内容，吸引用户点击。",
    }),
    defineField({
      name: "sidebarFeaturedCaseImage",
      title: "侧栏精选案例图片",
      type: "imageWithAlt",
      description: "前台位置：侧栏精选案例的封面图。是否建议修改：建议改。修改效果：增强案例的视觉吸引力。注意：建议尺寸 600x400 像素。",
    }),
    defineField({
      name: "sidebarFeaturedCaseLink",
      title: "侧栏精选案例链接",
      type: "string",
      description: "前台位置：侧栏精选案例的跳转地址。是否谨慎改：谨慎改。修改效果：点击后跳转到案例详情页。注意：站内用 /path 形式，不要填不存在的地址。",
    }),

    // ── Sidebar 服务通道 ──
    defineField({
      name: "sidebarServiceTitle",
      title: "侧栏服务通道标题",
      type: "string",
      description: "前台位置：侧栏服务通道模块的标题。是否建议修改：建议改。修改效果：引导用户快速访问各项服务。",
    }),
    defineField({
      name: "sidebarServiceItems",
      title: "服务通道列表",
      type: "array",
      description: "前台位置：侧栏服务通道的各个入口。是否建议修改：建议改。修改效果：提供快速导航到各项服务的入口。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", description: "前台位置：服务通道的名称。是否建议修改：建议改。修改效果：标识该服务通道。" }),
            defineField({ name: "href", title: "链接", type: "string", description: "前台位置：服务通道的跳转地址。是否谨慎改：谨慎改。修改效果：点击后跳转到对应服务页面。注意：站内用 /path 形式，不要填不存在的地址。" }),
            defineField({ name: "icon", title: "图标", type: "string", description: "前台位置：服务通道显示的图标名称。是否可不改：可不改。修改效果：增强视觉识别度。注意：需使用系统支持的图标名称。" }),
          ],
        },
      ],
    }),

    // ── 底部品牌沉淀区 ──
    defineField({
      name: "brandSectionTitle",
      title: "品牌沉淀区标题",
      type: "string",
      description: "前台位置：底部品牌沉淀区域的标题。是否建议修改：建议改。修改效果：展示品牌实力和历史沉淀。",
    }),
    defineField({
      name: "brandSectionSubtitle",
      title: "品牌沉淀区副标题",
      type: "string",
      description: "前台位置：品牌沉淀区标题下方的副标题。是否建议修改：建议改。修改效果：补充说明品牌沉淀的核心理念。",
    }),
    defineField({
      name: "brandSectionDescription",
      title: "品牌沉淀区描述",
      type: "text",
      rows: 4,
      description: "前台位置：品牌沉淀区的详细描述文字。是否建议修改：建议改。修改效果：展示品牌的历史、成就和价值观。注意：建议 100-300 字。",
    }),
    defineField({
      name: "brandSectionBackgroundImage",
      title: "品牌沉淀区背景图",
      type: "imageWithAlt",
      description: "前台位置：品牌沉淀区域的背景图。是否建议修改：建议改。修改效果：增强品牌区域的视觉效果和氛围感。注意：建议尺寸 1920x800 像素，文件不超过 500KB。",
    }),

    // ── 在线咨询区 ──
    defineField({
      name: "consultationTitle",
      title: "在线咨询区标题",
      type: "string",
      description: "前台位置：底部在线咨询区域的标题。是否建议修改：建议改。修改效果：吸引用户进行在线咨询。",
    }),
    defineField({
      name: "consultationDescription",
      title: "在线咨询区描述",
      type: "text",
      rows: 3,
      description: "前台位置：在线咨询区标题下方的描述文字。是否建议修改：建议改。修改效果：引导用户发起咨询，提升转化率。",
    }),
    defineField({
      name: "consultationBackgroundImage",
      title: "在线咨询区背景图",
      type: "imageWithAlt",
      description: "前台位置：在线咨询区域的背景图。是否建议修改：建议改。修改效果：增强在线咨询区域的视觉吸引力。注意：建议尺寸 1920x600 像素，文件不超过 500KB。",
    }),
  ],
  preview: {
    prepare() {
      return { title: "医疗服务页面" };
    },
  },
});
