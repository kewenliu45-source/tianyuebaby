import { defineField, defineType } from "sanity";

export const thirdPartyAssistedReproductionPage = defineType({
  name: "thirdPartyAssistedReproductionPage",
  title: "第三方辅助生殖页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({ name: "pageTitle", title: "页面标题", type: "string", description: "前台位置：浏览器标签页标题及搜索结果标题。是否建议改：建议改。修改效果：影响搜索结果展示和浏览器标签显示。注意：建议控制在 30 字以内，包含核心关键词。" }),
    defineField({ name: "pageDescription", title: "页面描述", type: "text", rows: 3, description: "前台位置：搜索结果中标题下方的摘要文字。是否建议改：建议改。修改效果：影响搜索引擎点击率。注意：建议 80-160 字，简洁概括页面核心内容。" }),
    defineField({ name: "seo", title: "SEO 设置", type: "seo", description: "前台位置：页面头部 SEO 元信息。是否建议改：可不改。修改效果：影响搜索引擎收录和社交分享。注意：如无特殊需求可留空使用默认值。" }),

    // ── Hero ──
    defineField({ name: "heroTitle", title: "Hero 标题", type: "string", description: "前台位置：页面顶部大图区域的主标题。是否建议改：必改。修改效果：直接影响用户第一印象和页面核心信息传达。注意：建议 10-20 字，突出核心卖点。" }),
    defineField({ name: "heroSubtitle", title: "Hero 副标题", type: "string", description: "前台位置：Hero 主标题下方的补充说明。是否建议改：建议改。修改效果：补充说明核心服务优势。注意：建议 15-30 字。" }),
    defineField({ name: "heroDescription", title: "Hero 描述", type: "text", rows: 3, description: "前台位置：Hero 区域的详细描述文字。是否建议改：建议改。修改效果：进一步介绍服务内容和优势。注意：建议 50-100 字。" }),
    defineField({ name: "heroImage", title: "Hero 图片", type: "imageWithAlt", description: "前台位置：页面顶部大图背景。是否建议改：必改。修改效果：直接影响页面视觉效果和用户第一印象。注意：建议尺寸 1920x800px，文件大小不超过 500KB，格式为 JPG 或 WebP。" }),
    defineField({ name: "mobileHeroImage", title: "移动端 Hero 图片", type: "imageWithAlt", description: "前台位置：手机端 Hero 背景图。是否建议改：建议改。修改效果：优化手机端首屏视觉。注意：建议 700×1000px（竖版），留空则使用桌面图。" }),
    defineField({ name: "publishedAt", title: "发布时间", type: "datetime", description: "前台位置：文章顶部显示的发布日期。是否建议改：可不改。修改效果：显示文章发布时间，增强可信度。注意：默认使用文档创建时间。" }),
    defineField({ name: "readingTime", title: "阅读时长", type: "string", description: "前台位置：文章顶部显示的预计阅读时间。是否建议改：可不改。修改效果：帮助用户预估阅读时间。注意：填写格式如\"5 分钟\"。" }),
    defineField({ name: "authorName", title: "作者姓名", type: "string", description: "前台位置：文章顶部显示的作者名称。是否建议改：建议改。修改效果：显示文章作者，增强专业性和可信度。注意：建议使用医生或专家真实姓名。" }),
    defineField({ name: "authorTitle", title: "作者职称", type: "string", description: "前台位置：作者姓名下方显示的职称。是否建议改：建议改。修改效果：展示作者专业背景，增强权威性。注意：如\"主治医师\"\"生殖医学专家\"等。" }),
    defineField({ name: "heroPrimaryButtonText", title: "主按钮文字", type: "string", description: "前台位置：Hero 区域主按钮显示的文字。是否建议改：可不改。修改效果：引导用户点击咨询。注意：建议 4-8 字，如\"立即咨询\"\"预约问诊\"。" }),
    defineField({ name: "heroPrimaryButtonLink", title: "主按钮链接", type: "string", description: "前台位置：Hero 主按钮点击后跳转的地址。是否建议改：谨慎改。修改效果：点击按钮后跳转到目标页面。注意：站内用 /path 形式（如 /contact），站外用完整 URL（如 https://wa.me/xxx），不要填不存在的地址。" }),
    defineField({ name: "heroSecondaryButtonText", title: "次按钮文字", type: "string", description: "前台位置：Hero 区域次按钮显示的文字。是否建议改：可不改。修改效果：提供第二种行动引导。注意：建议 4-8 字，如\"了解更多\"。" }),
    defineField({ name: "heroSecondaryButtonLink", title: "次按钮链接", type: "string", description: "前台位置：Hero 次按钮点击后跳转的地址。是否建议改：谨慎改。修改效果：点击按钮后跳转到目标页面。注意：站内用 /path 形式，站外用完整 URL，不要填不存在的地址。" }),

    // ── 目录 ──
    defineField({
      name: "tocItems",
      title: "目录项",
      type: "array",
      description: "前台位置：页面正文区域的目录导航。是否建议改：建议改。修改效果：帮助用户快速跳转到感兴趣的内容段落。注意：标题应与正文模块的标题对应，锚点使用英文短横线格式（如 section-1）。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "前台位置：目录中显示的章节名称。是否建议改：建议改。修改效果：用户看到的目录文字。注意：应与对应正文模块标题一致。" }),
            defineField({ name: "anchor", title: "锚点", type: "string", validation: (r) => r.required(), description: "前台位置：点击目录项后跳转到的锚点 ID。是否建议改：谨慎改。修改效果：控制目录点击跳转位置。注意：使用英文短横线格式（如 section-1），必须与正文模块的锚点值完全一致。" }),
          ],
        },
      ],
    }),

    // ── 正文模块 ──
    defineField({
      name: "contentBlocks",
      title: "正文模块",
      type: "array",
      description: "前台位置：页面正文区域的内容模块列表。是否建议改：建议改。修改效果：控制页面正文的内容和排版。注意：可通过拖拽调整模块顺序。",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "blockType",
              title: "模块类型",
              type: "string",
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
              description: "前台位置：决定该模块的显示样式。是否建议改：谨慎改。修改效果：切换模块的展示形式（图文混排、全宽图片、信息卡片、数据统计、流程时间线、医生简介、案例展示、内嵌 CTA）。注意：切换类型后部分字段可能不适用。",
            }),
            defineField({ name: "anchor", title: "锚点", type: "string", description: "前台位置：用于目录跳转的锚点 ID。是否建议改：谨慎改。修改效果：与目录项关联，实现点击跳转。注意：使用英文短横线格式，需与目录项锚点值一致。" }),
            defineField({ name: "title", title: "标题", type: "string", description: "前台位置：模块标题。是否建议改：建议改。修改效果：模块的主标题文字。注意：简洁明了，10-20 字为宜。" }),
            defineField({ name: "subtitle", title: "副标题", type: "string", description: "前台位置：模块副标题。是否建议改：建议改。修改效果：对标题的补充说明。注意：可留空。" }),
            defineField({ name: "body", title: "正文内容", type: "text", rows: 6, description: "前台位置：模块的详细正文。是否建议改：建议改。修改效果：模块的核心文字内容。注意：支持换行，建议分段描述。" }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt", description: "前台位置：模块配图。是否建议改：建议改。修改效果：增强模块视觉效果。注意：建议尺寸 800x600px，文件大小不超过 300KB。" }),
            defineField({
              name: "imagePosition",
              title: "图片位置",
              type: "string",
              options: {
                list: [
                  { title: "左侧", value: "left" },
                  { title: "右侧", value: "right" },
                ],
              },
              description: "前台位置：图文混排模块中图片的显示位置。是否建议改：可不改。修改效果：调整图片在文字的左侧或右侧。注意：仅对图文混排类型模块生效。",
            }),
            defineField({ name: "caption", title: "图片说明", type: "string", description: "前台位置：图片下方的说明文字。是否建议改：可不改。修改效果：为图片添加补充说明。注意：可留空。" }),
            defineField({
              name: "cardTone",
              title: "卡片色调",
              type: "string",
              options: {
                list: [
                  { title: "蓝色", value: "blue" },
                  { title: "警告", value: "warning" },
                  { title: "成功", value: "success" },
                  { title: "中性", value: "neutral" },
                ],
              },
              description: "前台位置：信息卡片模块的背景色调。是否建议改：可不改。修改效果：改变卡片的视觉风格。注意：仅对信息卡片类型模块生效。",
            }),
            defineField({ name: "buttonText", title: "按钮文字", type: "string", description: "前台位置：模块内按钮显示的文字。是否建议改：可不改。修改效果：引导用户点击。注意：建议 4-8 字。" }),
            defineField({ name: "buttonLink", title: "按钮链接", type: "string", description: "前台位置：模块内按钮点击后跳转的地址。是否建议改：谨慎改。修改效果：点击按钮后跳转到目标页面。注意：站内用 /path 形式，站外用完整 URL，不要填不存在的地址。" }),
            defineField({
              name: "items",
              title: "子项列表",
              type: "array",
              description: "前台位置：模块内的子项列表（如数据统计项、流程步骤、案例列表等）。是否建议改：建议改。修改效果：控制模块内具体内容。注意：根据模块类型填写对应内容。",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "标题", type: "string", description: "前台位置：子项标题。是否建议改：建议改。修改效果：子项的主标题。" }),
                    defineField({ name: "description", title: "描述", type: "text", description: "前台位置：子项描述文字。是否建议改：建议改。修改效果：子项的详细说明。" }),
                    defineField({ name: "value", title: "数值", type: "string", description: "前台位置：数据统计子项的数值显示。是否建议改：建议改。修改效果：显示具体数据（如成功率、案例数）。注意：仅对数据统计类型模块生效。" }),
                    defineField({ name: "icon", title: "图标名称", type: "string", description: "前台位置：子项图标。是否建议改：可不改。修改效果：为子项添加图标。注意：填写系统支持的图标名称。" }),
                    defineField({ name: "image", title: "图片", type: "imageWithAlt", description: "前台位置：子项配图。是否建议改：建议改。修改效果：为子项添加图片展示。注意：建议尺寸 400x300px。" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),

    // ── 医生/顾问模块 ──
    defineField({ name: "doctorName", title: "医生姓名", type: "string", description: "前台位置：医生/顾问模块显示的姓名。是否建议改：建议改。修改效果：展示医生真实姓名，增强可信度。注意：建议使用真实姓名。" }),
    defineField({ name: "doctorTitle", title: "医生职称", type: "string", description: "前台位置：医生姓名下方的职称。是否建议改：建议改。修改效果：展示医生专业资质。注意：如\"主治医师\"\"生殖医学博士\"等。" }),
    defineField({ name: "doctorExperience", title: "医生经历", type: "text", rows: 3, description: "前台位置：医生简介区域的经历描述。是否建议改：建议改。修改效果：展示医生的从业经历和背景。注意：建议 50-150 字。" }),
    defineField({
      name: "doctorSpecialties",
      title: "医生专长",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "前台位置：医生简介区域的专长标签。是否建议改：建议改。修改效果：展示医生擅长的领域。注意：建议 3-6 个标签。",
    }),
    defineField({ name: "doctorAvatar", title: "医生头像", type: "imageWithAlt", description: "前台位置：医生简介区域的头像。是否建议改：建议改。修改效果：展示医生形象，增强信任感。注意：建议尺寸 400x400px 正方形，文件大小不超过 200KB。" }),
    defineField({ name: "doctorButtonText", title: "医生按钮文字", type: "string", description: "前台位置：医生简介区域按钮的文字。是否建议改：可不改。修改效果：引导用户预约咨询。注意：建议 4-8 字，如\"预约咨询\"。" }),
    defineField({ name: "doctorButtonLink", title: "医生按钮链接", type: "string", description: "前台位置：医生简介区域按钮的跳转地址。是否建议改：谨慎改。修改效果：点击按钮后跳转到目标页面。注意：站内用 /path 形式，站外用完整 URL，不要填不存在的地址。" }),

    // ── 案例模块 ──
    defineField({
      name: "caseItems",
      title: "案例列表",
      type: "array",
      description: "前台位置：页面中的案例展示模块。是否建议改：建议改。修改效果：展示真实案例，增强用户信任。注意：案例内容需去隐私化处理。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "前台位置：案例卡片的标题。是否建议改：建议改。修改效果：案例的主标题。注意：建议 10-20 字，概括案例核心。" }),
            defineField({ name: "profile", title: "家庭情况", type: "string", description: "前台位置：案例卡片显示的家庭背景。是否建议改：建议改。修改效果：展示案例背景信息。注意：需去隐私化，如\"35岁夫妻，备孕3年\"。" }),
            defineField({ name: "story", title: "案例故事", type: "text", description: "前台位置：案例详情的故事描述。是否建议改：建议改。修改效果：详细的案例故事内容。注意：需去隐私化处理，100-300 字为宜。" }),
            defineField({ name: "resultDescription", title: "结果说明", type: "text", description: "前台位置：案例的结果描述。是否建议改：建议改。修改效果：展示案例最终结果。注意：去隐私化，不承诺具体结果，避免使用\"100%成功\"等绝对化表述。" }),
            defineField({ name: "testimonial", title: "客户感言", type: "text", description: "前台位置：案例卡片中客户说的话。是否建议改：建议改。修改效果：增强案例真实性和感染力。注意：需获得客户授权，去隐私化处理。" }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt", description: "前台位置：案例卡片的配图。是否建议改：建议改。修改效果：增强案例的视觉展示。注意：建议尺寸 600x400px，注意保护隐私。" }),
          ],
        },
      ],
    }),

    // ── FAQ ──
    defineField({ name: "faqTitle", title: "FAQ - 标题", type: "string", description: "前台位置：FAQ 模块的主标题。是否建议改：建议改。修改效果：FAQ 区域的标题文字。注意：建议 10-20 字，如\"常见问题解答\"。" }),
    defineField({ name: "faqDescription", title: "FAQ - 描述", type: "text", rows: 3, description: "前台位置：FAQ 模块标题下方的描述文字。是否建议改：可不改。修改效果：对 FAQ 的补充说明。注意：可留空。" }),
    defineField({
      name: "faqItems",
      title: "FAQ 列表",
      type: "array",
      description: "前台位置：FAQ 模块的问答列表。是否建议改：建议改。修改效果：展示常见问题及解答，帮助用户快速了解服务。注意：建议 5-10 个常见问题。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "问题", type: "string", validation: (r) => r.required(), description: "前台位置：FAQ 问题文字。是否建议改：建议改。修改效果：用户看到的问题内容。注意：使用用户常问的口语化表达。" }),
            defineField({ name: "answer", title: "回答", type: "text", validation: (r) => r.required(), description: "前台位置：FAQ 回答文字。是否建议改：建议改。修改效果：问题的详细解答。注意：回答要专业、准确、易懂，50-200 字为宜。" }),
          ],
        },
      ],
    }),

    // ── Sidebar ──
    defineField({ name: "sidebarTitle", title: "侧边栏标题", type: "string", description: "前台位置：右侧侧边栏的标题。是否建议改：可不改。修改效果：侧边栏区域的主标题。注意：建议 10-15 字。" }),
    defineField({ name: "sidebarDescription", title: "侧边栏描述", type: "text", rows: 3, description: "前台位置：侧边栏标题下方的描述文字。是否建议改：可不改。修改效果：对侧边栏内容的补充说明。注意：建议 30-80 字。" }),
    defineField({ name: "sidebarPrimaryButtonText", title: "侧边栏主按钮文字", type: "string", description: "前台位置：侧边栏主按钮显示的文字。是否建议改：可不改。修改效果：引导用户点击咨询。注意：建议 4-8 字，如\"立即咨询\"。" }),
    defineField({ name: "sidebarPrimaryButtonLink", title: "侧边栏主按钮链接", type: "string", description: "前台位置：侧边栏主按钮的跳转地址。是否建议改：谨慎改。修改效果：点击按钮后跳转到目标页面。注意：站内用 /path 形式，站外用完整 URL，不要填不存在的地址。" }),
    defineField({ name: "sidebarSecondaryButtonText", title: "侧边栏次按钮文字", type: "string", description: "前台位置：侧边栏次按钮显示的文字。是否建议改：可不改。修改效果：提供第二种行动引导。注意：建议 4-8 字。" }),
    defineField({ name: "sidebarSecondaryButtonLink", title: "侧边栏次按钮链接", type: "string", description: "前台位置：侧边栏次按钮的跳转地址。是否建议改：谨慎改。修改效果：点击按钮后跳转到目标页面。注意：站内用 /path 形式，站外用完整 URL，不要填不存在的地址。" }),
    defineField({ name: "sidebarPhoneLabel", title: "侧边栏电话标签", type: "string", description: "前台位置：电话号码前的标签文字。是否建议改：可不改。修改效果：显示在电话号码前，如\"咨询热线\"。注意：建议 2-4 字。" }),
    defineField({ name: "sidebarPhone", title: "侧边栏电话", type: "string", description: "前台位置：侧边栏显示的电话号码。是否建议改：必改。修改效果：用户可通过此号码电话咨询。注意：填写真实有效的电话号码，格式如 400-xxx-xxxx 或 +86 xxx xxxx xxxx。" }),
    defineField({ name: "sidebarWechatText", title: "侧边栏微信文案", type: "string", description: "前台位置：侧边栏微信联系的引导文案。是否建议改：建议改。修改效果：引导用户通过微信联系。注意：建议 10-20 字，如\"添加微信，一对一咨询\"。" }),
    defineField({ name: "sidebarWhatsappText", title: "侧边栏 WhatsApp 文案", type: "string", description: "前台位置：侧边栏 WhatsApp 联系的引导文案。是否建议改：建议改。修改效果：引导海外用户通过 WhatsApp 联系。注意：建议 10-20 字。" }),
    defineField({
      name: "sidebarHotArticles",
      title: "侧边栏热门文章",
      type: "array",
      description: "前台位置：侧边栏的热门文章推荐列表。是否建议改：建议改。修改效果：引导用户阅读相关文章，增加页面浏览量。注意：建议 3-5 篇。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "前台位置：文章链接的标题文字。是否建议改：建议改。修改效果：用户看到的文章标题。注意：建议 10-20 字。" }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: "前台位置：点击标题后跳转的地址。是否建议改：谨慎改。修改效果：跳转到对应文章页面。注意：站内用 /path 形式（如 /news/xxx），不要填不存在的地址。" }),
          ],
        },
      ],
    }),
    defineField({
      name: "sidebarRelatedLinks",
      title: "侧边栏相关链接",
      type: "array",
      description: "前台位置：侧边栏的相关服务链接列表。是否建议改：建议改。修改效果：引导用户了解其他相关服务。注意：建议 3-5 个链接。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "前台位置：链接标题文字。是否建议改：建议改。修改效果：用户看到的链接标题。注意：建议 5-15 字。" }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: "前台位置：点击标题后跳转的地址。是否建议改：谨慎改。修改效果：跳转到对应服务页面。注意：站内用 /path 形式，不要填不存在的地址。" }),
          ],
        },
      ],
    }),
    defineField({
      name: "sidebarCountries",
      title: "侧边栏国家列表",
      type: "array",
      description: "前台位置：侧边栏的国家/地区导航列表。是否建议改：建议改。修改效果：帮助用户按国家筛选服务信息。注意：建议 3-8 个国家。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "前台位置：国家名称显示。是否建议改：建议改。修改效果：用户看到的国家/地区名称。注意：使用中文名称，如\"美国\"\"泰国\"。" }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: "前台位置：点击国家名称后跳转的地址。是否建议改：谨慎改。修改效果：跳转到对应国家的服务页面。注意：站内用 /path 形式，不要填不存在的地址。" }),
          ],
        },
      ],
    }),

    // ── 最终 CTA ──
    defineField({ name: "finalCtaTitle", title: "最终 CTA - 标题", type: "string", description: "前台位置：页面底部 CTA 区域的主标题。是否建议改：建议改。修改效果：最终引导用户行动的标题。注意：建议 10-20 字，突出行动号召。" }),
    defineField({ name: "finalCtaDescription", title: "最终 CTA - 描述", type: "text", rows: 3, description: "前台位置：CTA 标题下方的描述文字。是否建议改：建议改。修改效果：补充说明，增强行动引导。注意：建议 30-80 字。" }),
    defineField({ name: "finalCtaPrimaryButtonText", title: "主按钮文字", type: "string", description: "前台位置：CTA 区域主按钮显示的文字。是否建议改：可不改。修改效果：引导用户点击咨询。注意：建议 4-8 字，如\"立即咨询\"\"预约问诊\"。" }),
    defineField({ name: "finalCtaPrimaryButtonLink", title: "主按钮链接", type: "string", description: "前台位置：CTA 主按钮的跳转地址。是否建议改：谨慎改。修改效果：点击按钮后跳转到目标页面。注意：站内用 /path 形式（如 /contact），站外用完整 URL（如 https://wa.me/xxx），不要填不存在的地址。" }),
    defineField({ name: "finalCtaSecondaryButtonText", title: "次按钮文字", type: "string", description: "前台位置：CTA 区域次按钮显示的文字。是否建议改：可不改。修改效果：提供第二种行动引导。注意：建议 4-8 字，如\"了解更多\"。" }),
    defineField({ name: "finalCtaSecondaryButtonLink", title: "次按钮链接", type: "string", description: "前台位置：CTA 次按钮的跳转地址。是否建议改：谨慎改。修改效果：点击按钮后跳转到目标页面。注意：站内用 /path 形式，站外用完整 URL，不要填不存在的地址。" }),
    defineField({ name: "finalCtaBackgroundImage", title: "背景图片", type: "imageWithAlt", description: "前台位置：CTA 区域的背景图片。是否建议改：建议改。修改效果：增强 CTA 区域的视觉吸引力。注意：建议尺寸 1920x600px，文件大小不超过 500KB，格式为 JPG 或 WebP。" }),
  ],
  preview: {
    prepare() {
      return { title: "第三方辅助生殖页面" };
    },
  },
});
