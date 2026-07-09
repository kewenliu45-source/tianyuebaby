import { defineField, defineType } from "sanity";

export const thirdGenerationIvfPage = defineType({
  name: "thirdGenerationIvfPage",
  title: "三代试管婴儿页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({
      name: "pageTitle",
      title: "页面标题",
      type: "string",
      description: '前台位置：浏览器标签页标题及 SEO title。是否建议修改：建议改。修改效果：影响搜索引擎展示标题。注意：建议 50-60 字符。',
    }),
    defineField({
      name: "pageDescription",
      title: "页面描述",
      type: "text",
      rows: 3,
      description: '前台位置：搜索引擎结果摘要。是否建议修改：建议改。修改效果：影响搜索结果中的描述文字。注意：建议 120-160 字。',
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: '前台位置：SEO 相关高级设置。是否建议修改：可不改。修改效果：控制搜索引擎索引行为。注意：非专业人员不建议修改。',
    }),

    // ── Hero ──
    defineField({ name: "heroTitle", title: "Hero 标题", type: "string", description: '前台位置：页面顶部大标题（H1）。是否建议修改：建议改。修改效果：用户进入页面第一眼看到的主标题，直接影响转化。注意：建议 10-25 字。' }),
    defineField({ name: "heroSubtitle", title: "Hero 副标题", type: "string", description: '前台位置：Hero 主标题下方。是否建议修改：建议改。修改效果：补充说明主标题。注意：建议 10-30 字。' }),
    defineField({ name: "heroDescription", title: "Hero 描述", type: "text", rows: 3, description: '前台位置：Hero 区域描述文字。是否建议修改：建议改。修改效果：详细介绍三代试管服务。注意：建议 30-80 字。' }),
    defineField({ name: "heroImage", title: "Hero 图片", type: "imageWithAlt", description: '前台位置：Hero 区域背景图。是否建议修改：建议改。修改效果：影响页面第一印象。注意：建议 1920×800px，500KB 以内。' }),
    defineField({ name: "mobileHeroImage", title: "移动端 Hero 图片", type: "imageWithAlt", description: "前台位置：手机端 Hero 背景图。是否建议改：建议改。修改效果：优化手机端首屏视觉。注意：建议 750×600px，留空则使用桌面图。" }),
    defineField({ name: "heroPrimaryButtonText", title: "主按钮文字", type: "string", description: '前台位置：Hero 主按钮文案。是否建议修改：可不改。修改效果：引导用户操作。注意：如「立即咨询」。' }),
    defineField({ name: "heroPrimaryButtonLink", title: "主按钮链接", type: "string", description: '前台位置：Hero 主按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式，锚点用 #id 形式。' }),
    defineField({ name: "heroSecondaryButtonText", title: "次按钮文字", type: "string", description: '前台位置：Hero 次按钮文案。是否建议修改：可不改。修改效果：辅助引导用户。注意：如「了解服务流程」。' }),
    defineField({ name: "heroSecondaryButtonLink", title: "次按钮链接", type: "string", description: '前台位置：Hero 次按钮跳转地址。是否建议修改：谨慎改。修改效果：点击次按钮后的跳转目标。注意：站内用 /path 形式。' }),
    defineField({
      name: "heroBadges",
      title: "Hero 标签",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: '前台位置：Hero 区域展示的标签列表。是否建议修改：建议改。修改效果：增强用户信任感。注意：建议 3-5 个标签，如「高成功率」「专业团队」。',
    }),
    defineField({ name: "heroFormTitle", title: "Hero 表单标题", type: "string", description: '前台位置：Hero 右侧表单标题。是否建议修改：可不改。修改效果：表单区域的标题文字。注意：如「免费咨询」。' }),
    defineField({
      name: "heroFormFields",
      title: "Hero 表单字段",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: '前台位置：Hero 表单的字段名称列表。是否建议修改：谨慎改。修改效果：改变表单收集的信息。注意：建议包含「姓名」「电话」。',
    }),
    defineField({ name: "heroFormButtonText", title: "Hero 表单按钮文字", type: "string", description: '前台位置：Hero 表单提交按钮文案。是否建议修改：可不改。修改效果：表单按钮文字。注意：如「提交咨询」。' }),

    // ── 三代试管科普 ──
    defineField({ name: "introTitle", title: "科普模块 - 标题", type: "string", description: '前台位置：科普模块主标题。是否建议修改：建议改。修改效果：科普区域的标题。' }),
    defineField({ name: "introSubtitle", title: "科普模块 - 副标题", type: "string", description: '前台位置：科普模块副标题。是否建议修改：建议改。修改效果：补充说明科普主题。' }),
    defineField({ name: "introBody", title: "科普模块 - 正文", type: "text", rows: 8, description: '前台位置：科普模块正文内容。是否建议修改：建议改。修改效果：详细介绍三代试管技术。注意：建议 200-500 字，支持换行分段。' }),
    defineField({ name: "introImage", title: "科普模块 - 图片", type: "imageWithAlt", description: '前台位置：科普模块配图。是否建议修改：建议改。修改效果：增强科普内容的视觉展示。注意：建议 800×600px。' }),
    defineField({ name: "introImageCaption", title: "科普模块 - 图片说明", type: "string", description: '前台位置：科普图片下方说明文字。是否建议修改：可不改。修改效果：图片的补充说明。' }),
    defineField({
      name: "introPoints",
      title: "科普模块 - 信息要点",
      type: "array",
      of: [{ type: "string" }],
      description: '前台位置：科普模块要点列表。是否建议修改：建议改。修改效果：突出关键信息。注意：建议 3-5 个要点。',
    }),

    // ── Trust Bar ──
    defineField({
      name: "trustItems",
      title: "数据背书",
      type: "array",
      description: '前台位置：页面数据背书区域。是否建议修改：建议改。修改效果：通过数据增强用户信任感。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "数值/关键词", type: "string", validation: (r) => r.required(), description: '前台位置：数据展示的数值部分。是否建议修改：建议改。修改效果：展示关键数据。注意：如「15年+」「90%」。' }),
            defineField({ name: "label", title: "说明", type: "string", description: '前台位置：数值下方的说明文字。是否建议修改：建议改。修改效果：解释数据含义。注意：如「行业经验」。' }),
            defineField({ name: "description", title: "补充描述", type: "string", description: '前台位置：说明下方的补充文字。是否建议修改：可不改。修改效果：进一步解释数据。' }),
          ],
        },
      ],
    }),

    // ── 为什么选择我们 ──
    defineField({ name: "whyChooseTitle", title: "为什么选择我们 - 标题", type: "string", description: '前台位置：「为什么选择我们」模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "whyChooseDescription", title: "为什么选择我们 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明选择理由。注意：建议 30-80 字。' }),
    defineField({ name: "whyChooseImage", title: "为什么选择我们 - 主图", type: "imageWithAlt", description: '前台位置：模块配图。是否建议修改：建议改。修改效果：增强模块视觉展示。注意：建议 800×600px。' }),
    defineField({
      name: "whyChooseItems",
      title: "优势列表",
      type: "array",
      description: '前台位置：优势卡片列表。是否建议修改：建议改。修改效果：展示服务优势。注意：建议 3-6 项。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：优势卡片标题。是否建议修改：建议改。修改效果：展示优势名称。' }),
            defineField({ name: "description", title: "描述", type: "text", description: '前台位置：优势卡片描述。是否建议修改：建议改。修改效果：详细说明优势内容。' }),
            defineField({ name: "icon", title: "图标名称", type: "string", description: '前台位置：优势卡片图标。是否建议修改：谨慎改。修改效果：改变卡片图标。注意：使用系统提供的图标名称，如 users、heart、shield、award。' }),
          ],
        },
      ],
    }),

    // ── 核心服务 ──
    defineField({ name: "servicesTitle", title: "核心服务 - 标题", type: "string", description: '前台位置：核心服务模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "servicesDescription", title: "核心服务 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明核心服务。注意：建议 30-80 字。' }),
    defineField({
      name: "serviceItems",
      title: "服务列表",
      type: "array",
      description: '前台位置：服务卡片列表。是否建议修改：建议改。修改效果：展示核心服务项目。注意：建议 3-6 项。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：服务卡片标题。是否建议修改：建议改。修改效果：展示服务名称。' }),
            defineField({ name: "description", title: "描述", type: "text", description: '前台位置：服务卡片描述。是否建议修改：建议改。修改效果：详细说明服务内容。' }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt", description: '前台位置：服务卡片配图。是否建议修改：建议改。修改效果：增强卡片视觉展示。注意：建议 800×600px。' }),
            defineField({
              name: "points",
              title: "要点",
              type: "array",
              of: [{ type: "string" }],
              description: '前台位置：服务卡片要点列表。是否建议修改：建议改。修改效果：突出服务关键特点。注意：建议 3-5 个要点。',
            }),
          ],
        },
      ],
    }),

    // ── 合作医院 ──
    defineField({ name: "hospitalsTitle", title: "合作医院 - 标题", type: "string", description: '前台位置：合作医院模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "hospitalsDescription", title: "合作医院 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明合作医院信息。注意：建议 30-80 字。' }),
    defineField({
      name: "hospitalItems",
      title: "医院/资源列表",
      type: "array",
      description: '前台位置：医院卡片列表。是否建议修改：建议改。修改效果：展示合作医院信息。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "名称", type: "string", validation: (r) => r.required(), description: '前台位置：医院卡片名称。是否建议修改：建议改。修改效果：展示医院名称。' }),
            defineField({ name: "location", title: "所在地", type: "string", description: '前台位置：医院卡片所在地。是否建议修改：建议改。修改效果：展示医院位置。' }),
            defineField({ name: "description", title: "简介", type: "text", description: '前台位置：医院卡片简介。是否建议修改：建议改。修改效果：详细介绍医院信息。' }),
            defineField({ name: "image", title: "图片/Logo", type: "imageWithAlt", description: '前台位置：医院卡片图片。是否建议修改：建议改。修改效果：展示医院形象。注意：建议 400×300px。' }),
            defineField({
              name: "tags",
              title: "标签",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
              description: '前台位置：医院卡片标签。是否建议修改：建议改。修改效果：展示医院特色。注意：建议 2-4 个标签。',
            }),
          ],
        },
      ],
    }),

    // ── 专家团队 ──
    defineField({ name: "expertsTitle", title: "专家团队 - 标题", type: "string", description: '前台位置：专家团队模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "expertsDescription", title: "专家团队 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明专家团队。注意：建议 30-80 字。' }),
    defineField({
      name: "expertItems",
      title: "专家/顾问列表",
      type: "array",
      description: '前台位置：专家卡片列表。是否建议修改：建议改。修改效果：展示专家团队信息。注意：建议 3-6 位专家。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "姓名/角色", type: "string", validation: (r) => r.required(), description: '前台位置：专家卡片姓名。是否建议修改：建议改。修改效果：展示专家身份。' }),
            defineField({ name: "title", title: "职称", type: "string", description: '前台位置：专家卡片职称。是否建议修改：建议改。修改效果：展示专家资质。' }),
            defineField({ name: "description", title: "简介", type: "text", description: '前台位置：专家卡片简介。是否建议修改：建议改。修改效果：详细介绍专家背景。' }),
            defineField({ name: "avatar", title: "头像", type: "imageWithAlt", description: '前台位置：专家卡片头像。是否建议修改：建议改。修改效果：展示专家形象。注意：建议 300×300px 正方形。' }),
            defineField({
              name: "specialties",
              title: "专长领域",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
              description: '前台位置：专家卡片专长标签。是否建议修改：建议改。修改效果：展示专家专长领域。注意：建议 3-5 个标签。',
            }),
          ],
        },
      ],
    }),

    // ── 服务流程 ──
    defineField({ name: "processTitle", title: "服务流程 - 标题", type: "string", description: '前台位置：服务流程模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "processDescription", title: "服务流程 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明服务流程。注意：建议 30-80 字。' }),
    defineField({ name: "processImage", title: "服务流程 - 主图", type: "imageWithAlt", description: '前台位置：流程模块配图。是否建议修改：建议改。修改效果：增强模块视觉展示。注意：建议 800×600px。' }),
    defineField({
      name: "processSteps",
      title: "流程步骤",
      type: "array",
      description: '前台位置：流程步骤列表。是否建议修改：建议改。修改效果：展示服务流程。注意：建议 4-8 个步骤。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "stepNumber", title: "步骤编号", type: "number", validation: (r) => r.required(), description: '前台位置：步骤序号标识。是否建议修改：谨慎改。修改效果：改变步骤顺序。注意：从 1 开始递增。' }),
            defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：步骤标题。是否建议修改：建议改。修改效果：展示步骤名称。' }),
            defineField({ name: "description", title: "描述", type: "text", description: '前台位置：步骤描述。是否建议修改：建议改。修改效果：详细说明步骤内容。' }),
            defineField({ name: "duration", title: "预计时长", type: "string", description: '前台位置：步骤时长标识。是否建议修改：可不改。修改效果：告知用户步骤所需时间。注意：如「1-2周」。' }),
            defineField({ name: "image", title: "步骤图片", type: "imageWithAlt", description: '前台位置：步骤配图。是否建议修改：建议改。修改效果：增强步骤的视觉展示。注意：建议 400×300px。' }),
          ],
        },
      ],
    }),

    // ── 真实案例 ──
    defineField({ name: "casesTitle", title: "真实案例 - 标题", type: "string", description: '前台位置：真实案例模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "casesDescription", title: "真实案例 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明案例展示。注意：建议 30-80 字。' }),
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
            defineField({ name: "profile", title: "家庭情况", type: "string", description: '前台位置：案例卡片家庭情况。是否建议修改：建议改。修改效果：描述客户背景。注意：如「高龄备孕家庭」，需去隐私化。' }),
            defineField({ name: "summary", title: "案例概述", type: "text", description: '前台位置：案例卡片概述。是否建议修改：建议改。修改效果：简要描述案例经过。注意：需去隐私化，不承诺结果。' }),
            defineField({ name: "resultDescription", title: "结果说明", type: "text", description: '前台位置：案例结果说明。是否建议修改：谨慎改。修改效果：描述案例结果。注意：必须去隐私化，不得使用承诺性语言，如「保证成功」。' }),
            defineField({ name: "image", title: "图片", type: "imageWithAlt", description: '前台位置：案例卡片配图。是否建议修改：建议改。修改效果：增强案例的视觉展示。注意：需确保已获客户授权。' }),
          ],
        },
      ],
    }),

    // ── 客户评价 ──
    defineField({ name: "testimonialsTitle", title: "客户评价 - 标题", type: "string", description: '前台位置：客户评价模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "testimonialsDescription", title: "客户评价 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明客户评价。注意：建议 30-80 字。' }),
    defineField({ name: "testimonialsImage", title: "客户评价 - 场景图", type: "imageWithAlt", description: '前台位置：评价模块配图。是否建议修改：建议改。修改效果：增强模块视觉展示。注意：建议 800×600px。' }),
    defineField({
      name: "testimonialItems",
      title: "评价列表",
      type: "array",
      description: '前台位置：客户评价卡片列表。是否建议修改：建议改。修改效果：展示客户评价。注意：建议 3-6 条评价。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "displayName", title: "显示名称", type: "string", description: '前台位置：评价卡片显示名称。是否建议修改：建议改。修改效果：展示客户名称。注意：建议使用化名或「张先生」「李女士」。' }),
            defineField({ name: "profile", title: "身份描述", type: "string", description: '前台位置：评价卡片身份描述。是否建议修改：建议改。修改效果：描述客户身份。注意：如「35岁，深圳」。' }),
            defineField({ name: "content", title: "评价内容", type: "text", validation: (r) => r.required(), description: '前台位置：评价卡片正文。是否建议修改：建议改。修改效果：展示客户评价内容。注意：建议 30-100 字。' }),
            defineField({ name: "rating", title: "评分(1-5)", type: "number", description: '前台位置：评价卡片星级评分。是否建议修改：可不改。修改效果：展示客户满意度评分。注意：范围 1-5。' }),
            defineField({ name: "avatar", title: "头像", type: "imageWithAlt", description: '前台位置：评价卡片头像。是否建议修改：建议改。修改效果：展示客户形象。注意：建议 200×200px 正方形。' }),
          ],
        },
      ],
    }),

    // ── FAQ ──
    defineField({ name: "faqTitle", title: "FAQ - 标题", type: "string", description: '前台位置：FAQ 模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "faqDescription", title: "FAQ - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明常见问题。注意：建议 30-80 字。' }),
    defineField({
      name: "faqItems",
      title: "FAQ 列表",
      type: "array",
      description: '前台位置：FAQ 问答列表。是否建议修改：建议改。修改效果：展示常见问题和解答。注意：建议 5-10 个问题。',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "问题", type: "string", validation: (r) => r.required(), description: '前台位置：FAQ 问题标题。是否建议修改：建议改。修改效果：展示问题内容。注意：建议简洁明了，10-30 字。' }),
            defineField({ name: "answer", title: "回答", type: "text", validation: (r) => r.required(), description: '前台位置：FAQ 问题回答。是否建议修改：建议改。修改效果：展示问题解答。注意：建议 30-100 字，语言专业友好。' }),
          ],
        },
      ],
    }),

    // ── 最终 CTA ──
    defineField({ name: "finalCtaTitle", title: "最终 CTA - 标题", type: "string", description: '前台位置：页面底部 CTA 标题。是否建议修改：建议改。修改效果：引导用户咨询的主标题。' }),
    defineField({ name: "finalCtaDescription", title: "最终 CTA - 描述", type: "text", rows: 3, description: '前台位置：CTA 描述文字。是否建议修改：建议改。修改效果：引导用户咨询的说明。注意：建议 20-60 字。' }),
    defineField({ name: "finalCtaPrimaryButtonText", title: "主按钮文字", type: "string", description: '前台位置：CTA 主按钮文案。是否建议修改：可不改。修改效果：主按钮文字。注意：如「立即咨询」。' }),
    defineField({ name: "finalCtaPrimaryButtonLink", title: "主按钮链接", type: "string", description: '前台位置：CTA 主按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式。' }),
    defineField({ name: "finalCtaSecondaryButtonText", title: "次按钮文字", type: "string", description: '前台位置：CTA 次按钮文案。是否建议修改：可不改。修改效果：次按钮文字。注意：如「了解服务流程」。' }),
    defineField({ name: "finalCtaSecondaryButtonLink", title: "次按钮链接", type: "string", description: '前台位置：CTA 次按钮跳转地址。是否建议修改：谨慎改。修改效果：点击次按钮后的跳转目标。注意：站内用 /path 形式。' }),
    defineField({ name: "finalCtaBackgroundImage", title: "背景图片", type: "imageWithAlt", description: '前台位置：CTA 背景大图。是否建议修改：建议改。修改效果：影响 CTA 区域视觉效果。注意：建议 1920×600px。' }),
  ],
  preview: {
    prepare() {
      return { title: "三代试管婴儿页面" };
    },
  },
});
