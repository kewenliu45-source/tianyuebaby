import { defineField, defineType } from "sanity";

export const eggSpermFreezingPage = defineType({
  name: "eggSpermFreezingPage",
  title: "冻卵/冻精页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({ name: "pageTitle", title: "页面标题", type: "string", description: "前台位置：浏览器标签页标题和搜索结果标题。建议改。修改效果：影响 SEO 搜索排名和搜索结果展示。" }),
    defineField({ name: "pageDescription", title: "页面描述", type: "text", rows: 3, description: "前台位置：搜索结果摘要文字。建议改。修改效果：影响 SEO 点击率，建议 120-160 字。" }),
    defineField({ name: "seo", title: "SEO 设置", type: "seo", description: "前台位置：搜索引擎元数据。可不改。修改效果：高级 SEO 优化。" }),

    // ── Hero ──
    defineField({ name: "heroTitle", title: "Hero 标题", type: "string", description: "前台位置：页面顶部 Hero 区域大标题。建议改。修改效果：用户第一眼看到的核心信息。" }),
    defineField({ name: "heroSubtitle", title: "Hero 副标题", type: "string", description: "前台位置：Hero 区域副标题，位于大标题下方。建议改。修改效果：补充说明主标题。" }),
    defineField({ name: "heroDescription", title: "Hero 描述", type: "text", rows: 3, description: "前台位置：Hero 区域描述段落。建议改。修改效果：详细说明服务亮点。" }),
    defineField({ name: "heroImage", title: "Hero 图片", type: "imageWithAlt", description: "前台位置：Hero 区域主图/背景图。建议改。修改效果：页面视觉第一印象。建议尺寸：1920x800px。" }),
    defineField({ name: "mobileHeroImage", title: "移动端 Hero 图片", type: "imageWithAlt", description: "前台位置：手机端 Hero 背景图。是否建议改：建议改。修改效果：优化手机端首屏视觉。注意：建议 900×1200px 竖图，主体居中，留空则使用桌面图。" }),
    defineField({ name: "publishedAt", title: "发布时间", type: "datetime", description: "前台位置：文章详情页显示发布时间。可不改。修改效果：影响文章排序和时间展示。" }),
    defineField({ name: "readingTime", title: "阅读时长", type: "string", description: "前台位置：Hero 区域显示预估阅读时长。可不改。修改效果：帮助用户判断内容长度。" }),
    defineField({ name: "authorName", title: "作者姓名", type: "string", description: "前台位置：Hero 区域显示作者姓名。建议改。修改效果：增加内容可信度。" }),
    defineField({ name: "authorTitle", title: "作者职称", type: "string", description: "前台位置：Hero 区域显示作者职称/头衔。建议改。修改效果：增加专业权威性。" }),
    defineField({ name: "heroPrimaryButtonText", title: "主按钮文字", type: "string", description: "前台位置：Hero 区域主按钮文案。可不改。修改效果：引导用户点击咨询。" }),
    defineField({ name: "heroPrimaryButtonLink", title: "主按钮链接", type: "string", description: "前台位置：Hero 主按钮跳转地址。谨慎改。注意：站内用 /path 形式，不要填不存在的地址。" }),
    defineField({ name: "heroSecondaryButtonText", title: "次按钮文字", type: "string", description: "前台位置：Hero 区域次按钮文案。可不改。修改效果：提供备选行动引导。" }),
    defineField({ name: "heroSecondaryButtonLink", title: "次按钮链接", type: "string", description: "前台位置：Hero 次按钮跳转地址。谨慎改。注意：站内用 /path 形式，不要填不存在的地址。" }),

    // ── 目录 ──
    defineField({
      name: "tocItems",
      title: "目录项",
      type: "array",
      description: "前台位置：页面侧边栏或顶部目录导航。建议改。修改效果：帮助用户快速跳转到感兴趣的内容段落。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "目录项显示文字，建议简洁明了。" }),
            defineField({ name: "anchor", title: "锚点", type: "string", validation: (r) => r.required(), description: "对应正文模块的锚点 ID，需保持一致。谨慎改。" }),
          ],
        },
      ],
    }),

    // ── 正文模块 ──
    defineField({
      name: "contentBlocks",
      title: "正文模块",
      type: "array",
      description: "前台位置：页面正文内容区域，可添加多种类型的模块。建议改。修改效果：构成页面主要内容。",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "blockType",
              title: "模块类型",
              type: "string",
              description: "选择模块展示形式，不同类型的模块前台样式不同。谨慎改。",
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
            defineField({ name: "anchor", title: "锚点", type: "string", description: "用于目录跳转的锚点 ID，需与目录项的锚点对应。谨慎改。" }),
            defineField({ name: "title", title: "标题", type: "string", description: "模块标题，显示在模块顶部。建议改。" }),
            defineField({ name: "subtitle", title: "副标题", type: "string", description: "模块副标题，显示在标题下方。建议改。" }),
            defineField({ name: "body", title: "正文内容", type: "text", rows: 6, description: "模块正文段落，支持多行文本。建议改。" }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt", description: "模块配图。建议改。建议尺寸：800x600px。" }),
            defineField({
              name: "imagePosition",
              title: "图片位置",
              type: "string",
              description: "图文混排模块中图片显示在左侧还是右侧。可不改。",
              options: {
                list: [
                  { title: "左侧", value: "left" },
                  { title: "右侧", value: "right" },
                ],
              },
            }),
            defineField({ name: "caption", title: "图片说明", type: "string", description: "图片下方的说明文字。可不改。" }),
            defineField({
              name: "cardTone",
              title: "卡片色调",
              type: "string",
              description: "信息卡片模块的配色方案。可不改。",
              options: {
                list: [
                  { title: "蓝色", value: "blue" },
                  { title: "警告", value: "warning" },
                  { title: "成功", value: "success" },
                  { title: "中性", value: "neutral" },
                ],
              },
            }),
            defineField({ name: "buttonText", title: "按钮文字", type: "string", description: "模块内按钮的文案。可不改。" }),
            defineField({ name: "buttonLink", title: "按钮链接", type: "string", description: "模块内按钮跳转地址。谨慎改。注意：站内用 /path 形式，不要填不存在的地址。" }),
            defineField({
              name: "items",
              title: "子项列表",
              type: "array",
              description: "用于数据统计、流程时间线等模块的子项数据。建议改。",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "标题", type: "string", description: "子项标题。建议改。" }),
                    defineField({ name: "description", title: "描述", type: "text", description: "子项描述文字。建议改。" }),
                    defineField({ name: "value", title: "数值", type: "string", description: "数据统计模块的数值显示。建议改。" }),
                    defineField({ name: "icon", title: "图标名称", type: "string", description: "子项图标名称，需使用系统支持的图标。可不改。" }),
                    defineField({ name: "image", title: "图片", type: "imageWithAlt", description: "子项配图。可不改。建议尺寸：400x300px。" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),

    // ── 医生模块 ──
    defineField({ name: "doctorName", title: "医生姓名", type: "string", description: "前台位置：医生模块显示的医生姓名。建议改。修改效果：展示专家信息。" }),
    defineField({ name: "doctorTitle", title: "医生职称", type: "string", description: "前台位置：医生模块显示的职称/头衔。建议改。修改效果：展示专业资质。" }),
    defineField({ name: "doctorExperience", title: "医生经历", type: "text", rows: 3, description: "前台位置：医生模块显示的从业经历。建议改。修改效果：增加患者信任感。" }),
    defineField({
      name: "doctorSpecialties",
      title: "医生专长",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "前台位置：医生模块显示的专业领域标签。建议改。修改效果：展示医生擅长方向。",
    }),
    defineField({ name: "doctorAvatar", title: "医生头像", type: "imageWithAlt", description: "前台位置：医生模块显示的头像照片。建议改。修改效果：增加亲和力。建议尺寸：400x400px，正方形。" }),
    defineField({ name: "doctorButtonText", title: "医生按钮文字", type: "string", description: "前台位置：医生模块的行动按钮文案。可不改。" }),
    defineField({ name: "doctorButtonLink", title: "医生按钮链接", type: "string", description: "前台位置：医生模块按钮跳转地址。谨慎改。注意：站内用 /path 形式，不要填不存在的地址。" }),

    // ── 案例模块 ──
    defineField({
      name: "caseItems",
      title: "案例列表",
      type: "array",
      description: "前台位置：案例展示模块，展示成功案例增加信任感。建议改。修改效果：提升转化率。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "案例标题，建议简洁概括案例。建议改。" }),
            defineField({ name: "profile", title: "家庭情况", type: "string", description: "案例家庭背景描述。建议改。注意：去隐私化处理。" }),
            defineField({ name: "story", title: "案例故事", type: "text", description: "案例详细故事。建议改。修改效果：增加情感共鸣。" }),
            defineField({ name: "resultDescription", title: "结果说明", type: "text", description: "去隐私化，不承诺结果。建议改。注意：避免使用绝对化用语。" }),
            defineField({ name: "testimonial", title: "客户感言", type: "text", description: "客户亲述感言。建议改。修改效果：增加真实性。" }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt", description: "案例配图。建议改。建议尺寸：600x400px。注意：需获得客户授权。" }),
          ],
        },
      ],
    }),

    // ── FAQ ──
    defineField({ name: "faqTitle", title: "FAQ - 标题", type: "string", description: "前台位置：FAQ 模块标题。建议改。修改效果：引导用户查看常见问题。" }),
    defineField({ name: "faqDescription", title: "FAQ - 描述", type: "text", rows: 3, description: "前台位置：FAQ 模块描述文字。建议改。修改效果：补充说明 FAQ 内容范围。" }),
    defineField({
      name: "faqItems",
      title: "FAQ 列表",
      type: "array",
      description: "前台位置：FAQ 模块的问答列表。建议改。修改效果：解答用户常见疑问，提升 SEO。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "问题", type: "string", validation: (r) => r.required(), description: "用户常见问题。建议改。" }),
            defineField({ name: "answer", title: "回答", type: "text", validation: (r) => r.required(), description: "问题解答内容。建议改。" }),
          ],
        },
      ],
    }),

    // ── Sidebar ──
    defineField({ name: "sidebarTitle", title: "侧边栏标题", type: "string", description: "前台位置：侧边栏顶部标题。建议改。修改效果：引导用户关注侧边栏内容。" }),
    defineField({ name: "sidebarDescription", title: "侧边栏描述", type: "text", rows: 3, description: "前台位置：侧边栏描述文字。建议改。修改效果：补充说明侧边栏内容。" }),
    defineField({ name: "sidebarPrimaryButtonText", title: "侧边栏主按钮文字", type: "string", description: "前台位置：侧边栏主按钮文案。可不改。" }),
    defineField({ name: "sidebarPrimaryButtonLink", title: "侧边栏主按钮链接", type: "string", description: "前台位置：侧边栏主按钮跳转地址。谨慎改。注意：站内用 /path 形式，不要填不存在的地址。" }),
    defineField({ name: "sidebarSecondaryButtonText", title: "侧边栏次按钮文字", type: "string", description: "前台位置：侧边栏次按钮文案。可不改。" }),
    defineField({ name: "sidebarSecondaryButtonLink", title: "侧边栏次按钮链接", type: "string", description: "前台位置：侧边栏次按钮跳转地址。谨慎改。注意：站内用 /path 形式，不要填不存在的地址。" }),
    defineField({ name: "sidebarPhoneLabel", title: "侧边栏电话标签", type: "string", description: "前台位置：电话号码前面的标签文字。可不改。" }),
    defineField({ name: "sidebarPhone", title: "侧边栏电话", type: "string", description: "前台位置：侧边栏显示的咨询电话号码。必改。修改效果：影响客户联系转化。" }),
    defineField({ name: "sidebarWechatText", title: "侧边栏微信文案", type: "string", description: "前台位置：侧边栏微信咨询引导文案。建议改。修改效果：引导用户添加微信。" }),
    defineField({ name: "sidebarWhatsappText", title: "侧边栏 WhatsApp 文案", type: "string", description: "前台位置：侧边栏 WhatsApp 咨询引导文案。建议改。修改效果：引导海外用户联系。" }),
    defineField({
      name: "sidebarHotArticles",
      title: "侧边栏热门文章",
      type: "array",
      description: "前台位置：侧边栏热门文章推荐列表。建议改。修改效果：增加页面浏览深度。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "文章标题。建议改。" }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: "文章链接地址。谨慎改。注意：站内用 /path 形式，不要填不存在的地址。" }),
          ],
        },
      ],
    }),
    defineField({
      name: "sidebarRelatedLinks",
      title: "侧边栏相关链接",
      type: "array",
      description: "前台位置：侧边栏相关服务链接列表。建议改。修改效果：引导用户了解其他服务。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "链接标题。建议改。" }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: "链接地址。谨慎改。注意：站内用 /path 形式，不要填不存在的地址。" }),
          ],
        },
      ],
    }),
    defineField({
      name: "sidebarCountries",
      title: "侧边栏国家列表",
      type: "array",
      description: "前台位置：侧边栏国家/地区服务入口。建议改。修改效果：引导用户了解各国服务详情。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: "国家/地区名称。建议改。" }),
            defineField({ name: "href", title: "链接", type: "string", validation: (r) => r.required(), description: "对应页面链接。谨慎改。注意：站内用 /path 形式，不要填不存在的地址。" }),
          ],
        },
      ],
    }),

    // ── 最终 CTA ──
    defineField({ name: "finalCtaTitle", title: "最终 CTA - 标题", type: "string", description: "前台位置：页面底部最终行动号召标题。建议改。修改效果：引导用户最终转化。" }),
    defineField({ name: "finalCtaDescription", title: "最终 CTA - 描述", type: "text", rows: 3, description: "前台位置：最终 CTA 区域描述文字。建议改。修改效果：增强行动号召力。" }),
    defineField({ name: "finalCtaPrimaryButtonText", title: "主按钮文字", type: "string", description: "前台位置：最终 CTA 主按钮文案。可不改。" }),
    defineField({ name: "finalCtaPrimaryButtonLink", title: "主按钮链接", type: "string", description: "前台位置：最终 CTA 主按钮跳转地址。谨慎改。注意：站内用 /path 形式，不要填不存在的地址。" }),
    defineField({ name: "finalCtaSecondaryButtonText", title: "次按钮文字", type: "string", description: "前台位置：最终 CTA 次按钮文案。可不改。" }),
    defineField({ name: "finalCtaSecondaryButtonLink", title: "次按钮链接", type: "string", description: "前台位置：最终 CTA 次按钮跳转地址。谨慎改。注意：站内用 /path 形式，不要填不存在的地址。" }),
    defineField({ name: "finalCtaBackgroundImage", title: "背景图片", type: "imageWithAlt", description: "前台位置：最终 CTA 区域背景图。建议改。修改效果：增强视觉吸引力。建议尺寸：1920x600px。" }),
  ],
  preview: {
    prepare() {
      return { title: "冻卵/冻精页面" };
    },
  },
});
