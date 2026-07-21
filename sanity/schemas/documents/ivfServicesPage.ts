import { defineField, defineType } from "sanity";

export const ivfServicesPage = defineType({
  name: "ivfServicesPage",
  title: "试管服务区域页面",
  type: "document",
  fields: [
    // ── SEO ──
    defineField({ name: "pageTitle", title: "页面标题", type: "string", description: '前台位置：浏览器标签页标题及 SEO title。是否建议修改：建议改。修改效果：影响搜索引擎展示标题。注意：建议 50-60 字符。' }),
    defineField({ name: "pageDescription", title: "页面描述", type: "text", rows: 3, description: '前台位置：搜索引擎结果摘要。是否建议修改：建议改。修改效果：影响搜索结果中的描述文字。注意：建议 120-160 字。' }),
    defineField({ name: "seo", title: "SEO 设置", type: "seo", description: '前台位置：SEO 相关高级设置。是否建议修改：可不改。修改效果：控制搜索引擎索引行为。注意：非专业人员不建议修改。' }),

    // ── Hero ──
    defineField({ name: "heroTitle", title: "Hero 标题", type: "string", description: '前台位置：页面顶部大标题。是否建议修改：建议改。修改效果：用户进入页面第一眼看到的主标题。注意：建议 10-25 字。' }),
    defineField({ name: "heroSubtitle", title: "Hero 副标题", type: "string", description: '前台位置：Hero 主标题下方。是否建议修改：建议改。修改效果：补充说明主标题。' }),
    defineField({ name: "heroDescription", title: "Hero 描述", type: "text", rows: 3, description: '前台位置：Hero 区域描述文字。是否建议修改：建议改。修改效果：详细介绍试管服务区域。注意：建议 30-80 字。' }),
    defineField({ name: "heroImage", title: "Hero 图片", type: "imageWithAlt", description: '前台位置：Hero 区域背景图。是否建议修改：建议改。修改效果：影响页面第一印象。注意：建议 1920×800px，500KB 以内。' }),
    defineField({ name: "mobileHeroImage", title: "移动端 Hero 图片", type: "imageWithAlt", description: "前台位置：手机端 Hero 背景图。是否建议改：建议改。修改效果：优化手机端首屏视觉。注意：建议 900×1200px 竖图，主体居中，留空则使用桌面图。" }),
    defineField({ name: "heroPrimaryButtonText", title: "主按钮文字", type: "string", description: '前台位置：Hero 主按钮文案。是否建议修改：可不改。修改效果：引导用户操作。注意：如「立即咨询」。' }),
    defineField({ name: "heroPrimaryButtonLink", title: "主按钮链接", type: "string", description: '前台位置：Hero 主按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式。' }),
    defineField({ name: "heroSecondaryButtonText", title: "次按钮文字", type: "string", description: '前台位置：Hero 次按钮文案。是否建议修改：可不改。修改效果：辅助引导用户。' }),
    defineField({ name: "heroSecondaryButtonLink", title: "次按钮链接", type: "string", description: '前台位置：Hero 次按钮跳转地址。是否建议修改：谨慎改。修改效果：点击次按钮后的跳转目标。注意：站内用 /path 形式。' }),
    defineField({ name: "heroBadges", title: "Hero 标签", type: "array", of: [{ type: "string" }], options: { layout: "tags" }, description: '前台位置：Hero 区域展示的标签列表。是否建议修改：建议改。修改效果：增强用户信任感。注意：建议 3-5 个标签。' }),

    // ── 区域信任条 ──
    defineField({ name: "regionTrustTitle", title: "信任条标题", type: "string", description: '前台位置：信任条模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({
      name: "regionTrustItems",
      title: "信任条数据",
      type: "array",
      description: '前台位置：信任条数据列表。是否建议修改：建议改。修改效果：通过数据增强用户信任感。',
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "关键词", type: "string", validation: (r) => r.required(), description: '前台位置：数据关键词。是否建议修改：建议改。修改效果：展示核心数据。注意：如「10年+」「500+」。' }),
          defineField({ name: "label", title: "说明", type: "string", description: '前台位置：数据说明文字。是否建议修改：建议改。修改效果：解释数据含义。' }),
          defineField({ name: "description", title: "补充描述", type: "string", description: '前台位置：数据补充描述。是否建议修改：可不改。修改效果：进一步解释数据。' }),
        ],
      }],
    }),

    // ── 服务覆盖地区 ──
    defineField({ name: "serviceAreasTitle", title: "服务覆盖地区 - 标题", type: "string", description: '前台位置：服务覆盖地区模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "serviceAreasDescription", title: "服务覆盖地区 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明服务范围。注意：建议 30-80 字。' }),
    defineField({
      name: "serviceAreaItems",
      title: "地区列表（旧版，兼容）",
      type: "array",
      hidden: true,
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "地区名称", type: "string", validation: (r) => r.required() }),
          defineField({ name: "subtitle", title: "副标题", type: "string" }),
          defineField({ name: "description", title: "描述", type: "text" }),
          defineField({ name: "serviceHighlights", title: "服务亮点", type: "array", of: [{ type: "string" }] }),
          defineField({ name: "commonNeeds", title: "常见需求", type: "array", of: [{ type: "string" }] }),
          defineField({ name: "image", title: "图片", type: "imageWithAlt" }),
          defineField({ name: "ctaText", title: "按钮文字", type: "string" }),
          defineField({ name: "ctaLink", title: "按钮链接", type: "string" }),
        ],
      }],
    }),

    // ── 服务区域（含地图标记） ──
    defineField({
      name: "serviceRegions",
      title: "服务区域（含地图标记）",
      type: "array",
      description: '前台位置：地图上的服务区域标记和区域详情卡片。是否建议修改：建议改。修改效果：展示服务覆盖的地区。',
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "地区名称", type: "string", validation: (r) => r.required(), description: '前台位置：区域卡片名称。是否建议修改：建议改。修改效果：展示地区名称。' }),
          defineField({ name: "subtitle", title: "副标题", type: "string", description: '前台位置：区域卡片副标题。是否建议修改：建议改。修改效果：补充说明地区特色。' }),
          defineField({ name: "description", title: "简介", type: "text", rows: 3, description: '前台位置：区域卡片简介。是否建议修改：建议改。修改效果：详细介绍该地区服务。' }),
          defineField({ name: "image", title: "地区图片", type: "imageWithAlt", description: '前台位置：区域卡片配图。是否建议修改：建议改。修改效果：增强区域的视觉展示。注意：建议 800×600px。' }),
          defineField({ name: "serviceHighlights", title: "服务标签", type: "array", of: [{ type: "string" }], description: '前台位置：区域卡片服务标签。是否建议修改：建议改。修改效果：展示该地区服务特色。' }),
          defineField({ name: "ctaText", title: "按钮文字", type: "string", description: '前台位置：区域卡片按钮文案。是否建议修改：可不改。修改效果：按钮文字。' }),
          defineField({ name: "ctaLink", title: "按钮链接", type: "string", description: '前台位置：区域卡片按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式。' }),
          defineField({ name: "mapLabel", title: "地图标注名称", type: "string", description: '前台位置：地图上显示的名称。是否建议修改：可不改。修改效果：地图标记的文字。注意：可与地区名称不同。' }),
          defineField({ name: "lng", title: "经度", type: "number", description: '前台位置：地图标记经度坐标。是否建议修改：谨慎改。修改效果：决定地图标记的水平位置。注意：范围 70-140，如北京 116.4074。', validation: (r) => r.min(70).max(140) }),
          defineField({ name: "lat", title: "纬度", type: "number", description: '前台位置：地图标记纬度坐标。是否建议修改：谨慎改。修改效果：决定地图标记的垂直位置。注意：范围 0-60，如北京 39.9042。', validation: (r) => r.min(0).max(60) }),
        ],
        preview: {
          select: { title: "name", subtitle: "subtitle" },
        },
      }],
    }),

    // ── 不同地区客户如何服务 ──
    defineField({ name: "regionalServiceTitle", title: "地区服务流程 - 标题", type: "string", description: '前台位置：地区服务流程模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "regionalServiceDescription", title: "地区服务流程 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明服务流程。' }),
    defineField({
      name: "regionalServiceSteps",
      title: "服务步骤",
      type: "array",
      description: '前台位置：服务步骤列表。是否建议修改：建议改。修改效果：展示地区服务流程。',
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：步骤标题。是否建议修改：建议改。修改效果：展示步骤名称。' }),
          defineField({ name: "description", title: "描述", type: "text", description: '前台位置：步骤描述。是否建议修改：建议改。修改效果：详细说明步骤内容。' }),
          defineField({ name: "icon", title: "图标", type: "string", description: '前台位置：步骤图标。是否建议修改：谨慎改。修改效果：改变步骤图标。注意：使用系统提供的图标名称。' }),
        ],
      }],
    }),

    // ── 区域服务经验 ──
    defineField({ name: "experienceTitle", title: "区域服务经验 - 标题", type: "string", description: '前台位置：区域服务经验模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "experienceDescription", title: "区域服务经验 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明服务经验。' }),
    defineField({
      name: "experienceItems",
      title: "经验列表",
      type: "array",
      description: '前台位置：服务经验列表。是否建议修改：建议改。修改效果：展示区域服务经验。',
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：经验项标题。是否建议修改：建议改。修改效果：展示经验名称。' }),
          defineField({ name: "description", title: "描述", type: "text", description: '前台位置：经验项描述。是否建议修改：建议改。修改效果：详细说明经验内容。' }),
          defineField({ name: "icon", title: "图标", type: "string", description: '前台位置：经验项图标。是否建议修改：谨慎改。修改效果：改变经验项图标。注意：使用系统提供的图标名称。' }),
        ],
      }],
    }),

    // ── 本地检查与远程咨询流程 ──
    defineField({ name: "remoteProcessTitle", title: "远程咨询流程 - 标题", type: "string", description: '前台位置：远程咨询流程模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "remoteProcessDescription", title: "远程咨询流程 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明远程咨询流程。' }),
    defineField({
      name: "remoteProcessSteps",
      title: "流程步骤",
      type: "array",
      description: '前台位置：远程咨询流程步骤列表。是否建议修改：建议改。修改效果：展示远程咨询流程。',
      of: [{
        type: "object",
        fields: [
          defineField({ name: "stepNumber", title: "步骤编号", type: "number", validation: (r) => r.required(), description: '前台位置：步骤序号标识。是否建议修改：谨慎改。修改效果：改变步骤顺序。注意：从 1 开始递增。' }),
          defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：步骤标题。是否建议修改：建议改。修改效果：展示步骤名称。' }),
          defineField({ name: "description", title: "描述", type: "text", description: '前台位置：步骤描述。是否建议修改：建议改。修改效果：详细说明步骤内容。' }),
          defineField({ name: "duration", title: "预计时长", type: "string", description: '前台位置：步骤时长标识。是否建议修改：可不改。修改效果：告知用户步骤所需时间。注意：如「1-2周」。' }),
        ],
      }],
    }),

    // ── 客户常见需求 ──
    defineField({ name: "needsTitle", title: "常见需求 - 标题", type: "string", description: '前台位置：常见需求模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "needsDescription", title: "常见需求 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明常见需求。' }),
    defineField({
      name: "needsItems",
      title: "需求列表",
      type: "array",
      description: '前台位置：常见需求列表。是否建议修改：建议改。修改效果：展示客户常见需求。',
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：需求项标题。是否建议修改：建议改。修改效果：展示需求名称。' }),
          defineField({ name: "description", title: "描述", type: "text", description: '前台位置：需求项描述。是否建议修改：建议改。修改效果：详细说明需求内容。' }),
          defineField({ name: "icon", title: "图标", type: "string", description: '前台位置：需求项图标。是否建议修改：谨慎改。修改效果：改变需求项图标。注意：使用系统提供的图标名称。' }),
        ],
      }],
    }),

    // ── 强转化咨询模块 ──
    defineField({ name: "conversionTitle", title: "转化模块 - 标题", type: "string", description: '前台位置：转化模块标题。是否建议修改：建议改。修改效果：引导用户咨询的主标题。' }),
    defineField({ name: "conversionDescription", title: "转化模块 - 描述", type: "text", rows: 3, description: '前台位置：转化模块描述。是否建议修改：建议改。修改效果：引导用户咨询的说明文字。' }),
    defineField({ name: "conversionFields", title: "表单字段", type: "array", of: [{ type: "string" }], options: { layout: "tags" }, description: '前台位置：转化表单字段名称列表。是否建议修改：谨慎改。修改效果：改变表单收集的信息。注意：建议包含「姓名」「电话」。' }),
    defineField({ name: "conversionButtonText", title: "按钮文字", type: "string", description: '前台位置：转化表单按钮文案。是否建议修改：可不改。修改效果：按钮文字。' }),
    defineField({ name: "conversionImage", title: "配图", type: "imageWithAlt", description: '前台位置：转化模块配图。是否建议修改：建议改。修改效果：增强模块视觉展示。注意：建议 800×600px。' }),
    defineField({ name: "conversionBackgroundImage", title: "背景图", type: "imageWithAlt", description: '前台位置：转化模块背景大图。是否建议修改：建议改。修改效果：影响转化区视觉效果。注意：建议 1920×600px。' }),

    // ── 区域案例 ──
    defineField({ name: "regionalCasesTitle", title: "区域案例 - 标题", type: "string", description: '前台位置：区域案例模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "regionalCasesDescription", title: "区域案例 - 描述", type: "text", rows: 3, description: '前台位置：模块描述文字。是否建议修改：建议改。修改效果：补充说明区域案例。' }),
    defineField({
      name: "regionalCaseItems",
      title: "案例列表",
      type: "array",
      description: '前台位置：区域案例卡片列表。是否建议修改：建议改。修改效果：展示区域真实案例。注意：案例内容需去隐私化，不承诺结果。',
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "标题", type: "string", validation: (r) => r.required(), description: '前台位置：案例卡片标题。是否建议修改：建议改。修改效果：展示案例名称。' }),
          defineField({ name: "city", title: "所在城市", type: "string", description: '前台位置：案例卡片城市标识。是否建议修改：建议改。修改效果：展示案例所在城市。' }),
          defineField({ name: "profile", title: "家庭情况", type: "string", description: '前台位置：案例卡片家庭情况。是否建议修改：建议改。修改效果：描述客户背景。注意：需去隐私化。' }),
          defineField({ name: "challenge", title: "面临挑战", type: "text", description: '前台位置：案例卡片挑战描述。是否建议修改：建议改。修改效果：描述客户面临的困难。' }),
          defineField({ name: "serviceSupport", title: "服务支持", type: "text", description: '前台位置：案例卡片服务支持描述。是否建议修改：建议改。修改效果：描述提供的服务支持。' }),
          defineField({ name: "resultDescription", title: "结果说明", type: "text", description: '前台位置：案例结果说明。是否建议修改：谨慎改。修改效果：描述案例结果。注意：必须去隐私化，不得使用承诺性语言。' }),
          defineField({ name: "image", title: "图片", type: "imageWithAlt", description: '前台位置：案例卡片配图。是否建议修改：建议改。修改效果：增强案例的视觉展示。注意：需确保已获客户授权。' }),
          defineField({ name: "buttonText", title: "按钮文字", type: "string", description: '前台位置：案例卡片按钮文案。是否建议修改：可不改。修改效果：按钮文字。' }),
          defineField({ name: "buttonLink", title: "按钮链接", type: "string", description: '前台位置：案例卡片按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后的跳转目标。注意：站内用 /path 形式。' }),
        ],
      }],
    }),

    // ── FAQ ──
    defineField({ name: "faqTitle", title: "FAQ - 标题", type: "string", description: '前台位置：FAQ 模块标题。是否建议修改：可不改。修改效果：模块主标题。' }),
    defineField({ name: "faqDescription", title: "FAQ - 描述", type: "text", rows: 3, description: '前台位置：FAQ 模块描述。是否建议修改：建议改。修改效果：补充说明常见问题。' }),
    defineField({
      name: "faqItems",
      title: "FAQ 列表",
      type: "array",
      description: '前台位置：FAQ 问答列表。是否建议修改：建议改。修改效果：展示常见问题和解答。注意：建议 5-10 个问题。',
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", title: "问题", type: "string", validation: (r) => r.required(), description: '前台位置：FAQ 问题标题。是否建议修改：建议改。修改效果：展示问题内容。注意：建议简洁明了。' }),
          defineField({ name: "answer", title: "回答", type: "text", validation: (r) => r.required(), description: '前台位置：FAQ 问题回答。是否建议修改：建议改。修改效果：展示问题解答。注意：建议 30-100 字。' }),
        ],
      }],
    }),

    // ── 最终 CTA / 在线预约 ──
    defineField({ name: "appointmentTitle", title: "预约模块 - 标题", type: "string", description: '前台位置：页面底部预约模块标题。是否建议修改：建议改。修改效果：引导用户预约的主标题。' }),
    defineField({ name: "appointmentDescription", title: "预约模块 - 描述", type: "text", rows: 3, description: '前台位置：预约模块描述。是否建议修改：建议改。修改效果：引导用户预约的说明文字。' }),
    defineField({ name: "appointmentFields", title: "预约表单字段", type: "array", of: [{ type: "string" }], options: { layout: "tags" }, description: '前台位置：预约表单字段名称列表。是否建议修改：谨慎改。修改效果：改变表单收集的信息。注意：建议包含「姓名」「电话」。' }),
    defineField({ name: "appointmentButtonText", title: "预约按钮文字", type: "string", description: '前台位置：预约表单按钮文案。是否建议修改：可不改。修改效果：按钮文字。' }),
    defineField({ name: "appointmentBackgroundImage", title: "预约背景图", type: "imageWithAlt", description: '前台位置：预约模块背景大图。是否建议修改：建议改。修改效果：影响预约区视觉效果。注意：建议 1920×600px。' }),
  ],
  preview: {
    prepare() {
      return { title: "试管服务区域页面" };
    },
  },
});
