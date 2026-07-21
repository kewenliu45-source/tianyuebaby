import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "首页",
  type: "document",
  fields: [
    // ── Banner ──
    defineField({
      name: "banners",
      title: "Banner 轮播",
      type: "array",
      of: [{ type: "bannerSlide" }],
      description: "前台位置：首页顶部轮播区域。是否建议修改：建议改。修改效果：替换首页最上方的轮播图和文案。注意：建议保留 2-4 张；普通轮播桌面图建议 1920×600px，手机图建议 750×600px，图片尺寸保持一致。",
    }),

    // ── 首屏 Hero 图 ──
    defineField({
      name: "heroImage",
      title: "首屏 Hero 图",
      type: "imageWithAlt",
      description: "前台位置：首页首屏大图（旧版）。是否建议修改：建议改。修改效果：替换首页最上方的全屏背景图。注意：建议 2400×1200 px，WebP/JPG 格式，300KB 以内。若已填写下方「专业首屏」则优先使用新版本。",
    }),
    defineField({
      name: "hero",
      title: "专业首屏",
      type: "object",
      description: "前台位置：首页首屏 Hero 区域。是否建议修改：必改。修改效果：决定访客看到的第一屏内容，直接影响转化率。注意：填写后优先于上方旧首屏图片；图片、标题、按钮为最核心内容。",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "isEnabled", title: "显示首屏", type: "boolean", initialValue: true, description: "前台位置：首屏 Hero 模块。是否建议修改：谨慎改。修改效果：关闭后首屏 Hero 区域将隐藏，访客无法看到。注意：通常保持开启。" }),
        defineField({
          name: "desktopImage",
          title: "桌面端大图",
          type: "imageWithAlt",
          description: "前台位置：首屏左侧文字区右侧的桌面端大图。是否建议修改：必改。修改效果：决定桌面端访客首屏视觉体验。注意：建议 2400×1200 px，人物或视觉主体放在右侧（左侧会被半透明遮罩覆盖），500KB 以内，WebP/JPG 格式。",
        }),
        defineField({
          name: "mobileImage",
          title: "移动端大图",
          type: "imageWithAlt",
          description: "前台位置：手机端首屏全屏背景图。是否建议修改：必改。修改效果：决定手机访客首屏视觉体验。注意：建议 900×1200px 竖图，主体居中，300KB 以内，WebP/JPG 格式。",
        }),
        defineField({
          name: "overlayStrength",
          title: "文字区遮罩强度",
          type: "number",
          initialValue: 72,
          description: "前台位置：首屏左侧文字区域的半透明黑色遮罩。是否建议修改：可不改。修改效果：数值越大遮罩越深、文字越清晰，但图片可见度降低。注意：范围 35-90，默认 72 适合大多数深色图片。",
          validation: (rule) => rule.min(35).max(90),
        }),
        defineField({ name: "eyebrow", title: "眉题", type: "string", description: "前台位置：主标题上方的小字标签。是否建议修改：建议改。修改效果：显示在主标题正上方，用于标注机构定位。注意：建议 6-12 字，如「专注辅助生殖 20 年」。" }),
        defineField({
          name: "title",
          title: "主标题",
          type: "string",
          description: "前台位置：首屏最显眼的大标题。是否建议修改：必改。修改效果：直接影响访客对机构的第一印象和点击意愿。注意：最多 42 字，建议 12-20 字，突出核心价值。",
          validation: (rule) => rule.max(42),
        }),
        defineField({ name: "description", title: "专业说明", type: "text", rows: 3, description: "前台位置：主标题下方的说明文字。是否建议修改：必改。修改效果：补充说明机构优势，增强访客信任感。注意：建议 40-80 字，简明扼要。" }),
        defineField({ name: "primaryButtonText", title: "主按钮文字", type: "string", description: "前台位置：首屏主按钮（左侧按钮）。是否建议修改：建议改。修改效果：影响访客点击咨询的意愿。注意：建议 4-6 字，如「立即咨询」「了解详情」。" }),
        defineField({ name: "primaryButtonLink", title: "主按钮链接", type: "string", description: "前台位置：首屏主按钮跳转地址。是否建议修改：谨慎改。修改效果：点击主按钮后跳转到此地址。注意：站内用 /path 形式（如 /contact），站外用完整 URL，不要填不存在的地址。" }),
        defineField({ name: "secondaryButtonText", title: "次按钮文字", type: "string", description: "前台位置：首屏次按钮（右侧按钮）。是否建议修改：建议改。修改效果：提供第二个行动入口。注意：建议 4-6 字，如「了解更多」「查看案例」。" }),
        defineField({ name: "secondaryButtonLink", title: "次按钮链接", type: "string", description: "前台位置：首屏次按钮跳转地址。是否建议修改：谨慎改。修改效果：点击次按钮后跳转到此地址。注意：站内用 /path 形式，站外用完整 URL，不要填不存在的地址。" }),
        defineField({
          name: "badges",
          title: "专业能力标签",
          type: "array",
          description: "前台位置：首屏文字区域下方的标签行。是否建议修改：建议改。修改效果：展示机构核心能力标签，增强专业感。注意：最多 4 个，每个建议 2-6 字，如「三代试管」「高成功率」「专家团队」。",
          validation: (rule) => rule.max(4),
          of: [{ type: "string" }],
        }),
        defineField({
          name: "stats",
          title: "首屏数据栏",
          type: "array",
          description: "前台位置：首屏底部的数据统计栏。是否建议修改：建议改。修改效果：用数据增强机构可信度。注意：最多 4 项，建议展示成功率、案例数等核心数据。",
          validation: (rule) => rule.max(4),
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "value", title: "数值", type: "string", description: "前台位置：数据栏中的数字部分。是否建议修改：建议改。修改效果：展示醒目的数据数值。注意：建议用简短形式，如「85%」「2000+」「20 年」。" }),
                defineField({ name: "label", title: "说明", type: "string", description: "前台位置：数据栏中数字下方的文字说明。是否建议修改：建议改。修改效果：解释数值含义。注意：建议 2-6 字，如「成功率」「成功案例」「行业经验」。" }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "expertiseSection",
      title: "专业能力多图区",
      type: "object",
      description: "前台位置：首屏下方的机构专业能力展示区，含多张图片和能力列表。是否建议修改：建议改。修改效果：展示团队实力和专业能力，增强访客信任。注意：图片和文案配合使用效果最佳。",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "isEnabled",
          title: "显示此模块",
          type: "boolean",
          initialValue: true,
          description: "前台位置：专业能力多图区整体。是否建议修改：谨慎改。修改效果：关闭后前台隐藏该模块。注意：通常保持开启。",
        }),
        defineField({ name: "eyebrow", title: "眉题", type: "string", description: "前台位置：模块标题上方的小字标签。是否建议修改：可不改。修改效果：标注模块定位。注意：建议 4-10 字。" }),
        defineField({ name: "title", title: "标题", type: "string", description: "前台位置：专业能力区的主标题。是否建议修改：建议改。修改效果：引导访客关注机构专业能力。注意：建议 8-16 字。" }),
        defineField({ name: "description", title: "机构介绍", type: "text", rows: 4, description: "前台位置：标题下方的机构介绍文字。是否建议修改：建议改。修改效果：让访客了解机构背景和优势。注意：建议 80-200 字。" }),
        defineField({
          name: "capabilities",
          title: "专业能力",
          type: "array",
          description: "前台位置：专业能力区的能力列表。是否建议修改：建议改。修改效果：逐项展示机构核心能力。注意：最多 4 项，建议 2-4 项。",
          validation: (rule) => rule.max(4),
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "标题", type: "string", description: "前台位置：能力项的标题。是否建议修改：建议改。修改效果：展示能力名称。注意：建议 4-8 字，如「三代试管技术」。" }),
                defineField({ name: "description", title: "说明", type: "string", description: "前台位置：能力项的说明文字。是否建议修改：建议改。修改效果：补充说明该项能力。注意：建议 15-40 字。" }),
              ],
            },
          ],
        }),
        defineField({ name: "buttonText", title: "按钮文字", type: "string", description: "前台位置：专业能力区底部按钮。是否建议修改：可不改。修改效果：引导访客进入详情页。注意：建议 4-6 字。" }),
        defineField({ name: "buttonLink", title: "按钮链接", type: "string", description: "前台位置：专业能力区按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后跳转到此地址。注意：站内用 /path 形式，不要填不存在的地址。" }),
        defineField({
          name: "mainImage",
          title: "团队/专家主图",
          type: "imageWithAlt",
          description: "前台位置：专业能力区左侧主图。是否建议修改：建议改。修改效果：展示团队或专家形象。注意：建议 1200×1500 px，WebP/JPG 格式，500KB 以内。",
        }),
        defineField({
          name: "secondaryImage",
          title: "实验室辅助图",
          type: "imageWithAlt",
          description: "前台位置：专业能力区右上辅助图。是否建议修改：建议改。修改效果：展示实验室或设备环境。注意：建议 1000×700 px，WebP/JPG 格式，300KB 以内。",
        }),
        defineField({
          name: "tertiaryImage",
          title: "咨询场景辅助图",
          type: "imageWithAlt",
          description: "前台位置：专业能力区右下辅助图。是否建议修改：建议改。修改效果：展示咨询或服务场景。注意：建议 1000×700 px，WebP/JPG 格式，300KB 以内。",
        }),
      ],
    }),

    defineField({
      name: "servicesSection",
      title: "快速服务入口",
      type: "object",
      description: "前台位置：首页快速服务卡片区域，展示各服务项目入口。是否建议修改：建议改。修改效果：帮助访客快速找到所需服务。注意：建议展示 3-6 个核心服务。",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "isEnabled",
          title: "显示此模块",
          type: "boolean",
          initialValue: true,
          description: "前台位置：快速服务入口模块整体。是否建议修改：谨慎改。修改效果：关闭后前台隐藏该模块。注意：通常保持开启。",
        }),
        defineField({ name: "title", title: "标题", type: "string", description: "前台位置：服务入口区的标题。是否建议修改：可不改。修改效果：引导访客浏览服务。注意：建议 4-10 字。" }),
        defineField({ name: "description", title: "说明", type: "text", rows: 2, description: "前台位置：服务入口区标题下方的说明。是否建议修改：可不改。修改效果：补充说明服务范围。注意：建议 20-60 字。" }),
        defineField({
          name: "items",
          title: "服务卡片（可拖动排序）",
          type: "array",
          description: "前台位置：快速服务入口区的卡片列表。是否建议修改：建议改。修改效果：展示各服务项目的入口卡片。注意：最多 6 个，可拖动调整顺序。",
          validation: (rule) => rule.max(6),
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "isEnabled",
                  title: "显示",
                  type: "boolean",
                  initialValue: true,
                  description: "是否建议修改：谨慎改。修改效果：关闭后该服务卡片将隐藏。注意：通常保持开启。",
                }),
                defineField({
                  name: "image",
                  title: "图片",
                  type: "imageWithAlt",
                  description: "前台位置：服务卡片封面图。是否建议修改：建议改。修改效果：展示服务项目的视觉形象。注意：建议 1200×800 px，WebP/JPG 格式，500KB 以内。",
                }),
                defineField({ name: "title", title: "标题", type: "string", description: "前台位置：服务卡片标题。是否建议修改：建议改。修改效果：展示服务名称。注意：建议 4-10 字，如「第三代试管婴儿」。" }),
                defineField({ name: "audience", title: "适用人群", type: "string", description: "前台位置：服务卡片中的适用人群标签。是否建议修改：建议改。修改效果：帮助访客判断是否适合自己。注意：建议 4-12 字，如「高龄备孕家庭」。" }),
                defineField({ name: "description", title: "简短说明", type: "text", rows: 2, description: "前台位置：服务卡片中的说明文字。是否建议修改：建议改。修改效果：简要介绍该服务。注意：建议 20-60 字。" }),
                defineField({ name: "buttonText", title: "按钮文字", type: "string", description: "前台位置：服务卡片按钮。是否建议修改：可不改。修改效果：引导访客进入服务详情。注意：建议 4-6 字。" }),
                defineField({ name: "buttonLink", title: "按钮链接", type: "string", description: "前台位置：服务卡片按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后跳转到此地址。注意：站内用 /path 形式（如 /services/ivf），不要填不存在的地址。" }),
              ],
              preview: { select: { title: "title", subtitle: "audience", media: "image.image" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "sectionVisibility",
      title: "后续模块显示设置",
      type: "object",
      description: "前台位置：首页下方各模块的显示/隐藏控制。是否建议修改：谨慎改。修改效果：关闭后对应模块在前台隐藏。注意：隐藏前确认该模块内容不再需要展示。",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "advantages",
          title: "显示核心优势",
          type: "boolean",
          initialValue: true,
          description: "是否建议修改：谨慎改。修改效果：关闭后前台隐藏核心优势模块。注意：通常保持开启。",
        }),
        defineField({
          name: "journey",
          title: "显示服务流程",
          type: "boolean",
          initialValue: true,
          description: "是否建议修改：谨慎改。修改效果：关闭后前台隐藏助孕流程模块。注意：通常保持开启。",
        }),
        defineField({ name: "stats", title: "显示服务数据", type: "boolean", initialValue: true, description: "是否建议修改：谨慎改。修改效果：关闭后前台隐藏服务数据模块。注意：通常保持开启。" }),
        defineField({ name: "news", title: "显示新闻资讯", type: "boolean", initialValue: true, description: "是否建议修改：谨慎改。修改效果：关闭后前台隐藏新闻推荐模块。注意：通常保持开启。" }),
        defineField({ name: "faq", title: "显示常见问题", type: "boolean", initialValue: true, description: "是否建议修改：谨慎改。修改效果：关闭后前台隐藏常见问题模块。注意：通常保持开启。" }),
        defineField({ name: "cta", title: "显示咨询行动区", type: "boolean", initialValue: true, description: "是否建议修改：谨慎改。修改效果：关闭后前台隐藏底部咨询行动区。注意：通常保持开启，该模块对转化很重要。" }),
      ],
    }),

    // ── 品牌简介 ──
    defineField({
      name: "brandIntroTitle",
      title: "品牌简介标题",
      type: "string",
      description: "前台位置：品牌简介区域标题。是否建议修改：建议改。修改效果：引导访客了解品牌背景。注意：建议 6-14 字。",
    }),
    defineField({
      name: "brandIntroContent",
      title: "品牌简介内容",
      type: "text",
      rows: 4,
      description: "前台位置：品牌简介区域正文。是否建议修改：建议改。修改效果：介绍机构背景、历史、理念等。注意：建议 100-300 字。",
    }),
    defineField({
      name: "brandIntroImage",
      title: "品牌简介图片",
      type: "imageWithAlt",
      description: "前台位置：品牌简介区域配图。是否建议修改：建议改。修改效果：展示机构环境或团队形象。注意：建议 1200×800 px，WebP/JPG 格式，500KB 以内。",
    }),

    // ── 第三代试管服务介绍 ──
    defineField({
      name: "ivfTitle",
      title: "第三代试管服务标题",
      type: "string",
      description: "前台位置：第三代试管服务介绍区标题。是否建议修改：建议改。修改效果：引导访客了解核心服务。注意：建议 8-16 字。",
    }),
    defineField({
      name: "ivfDescription",
      title: "第三代试管服务描述",
      type: "text",
      rows: 3,
      description: "前台位置：第三代试管服务介绍区正文。是否建议修改：建议改。修改效果：详细介绍三代试管技术优势。注意：建议 60-150 字。",
    }),
    defineField({
      name: "ivfFeatures",
      title: "服务特点",
      type: "array",
      description: "前台位置：第三代试管服务区的特点列表。是否建议修改：建议改。修改效果：逐项展示服务特色。注意：建议 3-6 项。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", description: "前台位置：特点项标题。是否建议修改：建议改。修改效果：展示特点名称。注意：建议 4-8 字。" }),
            defineField({ name: "description", title: "描述", type: "text", description: "前台位置：特点项说明。是否建议修改：建议改。修改效果：详细说明该特点。注意：建议 20-60 字。" }),
            defineField({ name: "icon", title: "图标", type: "string", description: "前台位置：特点项图标。是否建议修改：可不改。修改效果：更换图标样式。注意：使用项目中已有的图标名称。" }),
          ],
        },
      ],
    }),

    // ── 核心优势 ──
    defineField({
      name: "advantagesTitle",
      title: "核心优势标题",
      type: "string",
      description: "前台位置：核心优势模块标题。是否建议修改：建议改。修改效果：引导访客关注机构优势。注意：建议 6-14 字。",
    }),
    defineField({
      name: "advantagesDescription",
      title: "核心优势说明",
      type: "text",
      rows: 2,
      description: "前台位置：核心优势模块说明文字。是否建议修改：可不改。修改效果：补充说明核心优势。注意：建议 20-60 字。",
    }),
    defineField({
      name: "advantagesMainImage",
      title: "核心优势主图（左侧场景图）",
      type: "imageWithAlt",
      description: "前台位置：核心优势区左侧大图。是否建议修改：建议改。修改效果：展示团队或服务场景，增强信任感。注意：建议 1200×900 px，WebP/JPG 格式，500KB 以内。",
    }),
    defineField({
      name: "advantages",
      title: "核心优势（可拖动排序）",
      type: "array",
      description: "前台位置：核心优势区的优势列表。是否建议修改：建议改。修改效果：逐项展示机构核心竞争优势。注意：建议 3-5 项，可拖动调整顺序。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", description: "前台位置：优势项标题。是否建议修改：建议改。修改效果：展示优势名称。注意：建议 4-10 字，如「高成功率」「专家团队」。" }),
            defineField({ name: "description", title: "描述", type: "text", description: "前台位置：优势项说明。是否建议修改：建议改。修改效果：详细说明该优势。注意：建议 20-60 字。" }),
            defineField({ name: "icon", title: "图标", type: "string", description: "前台位置：优势项图标。是否建议修改：可不改。修改效果：更换图标样式。注意：使用项目中已有的图标名称。" }),
            defineField({
              name: "color",
              title: "颜色",
              type: "string",
              description: "前台位置：优势项的配色主题。是否建议修改：可不改。修改效果：改变该项的视觉配色。注意：可选 pink、purple、yellow、green。",
              options: { list: ["pink", "purple", "yellow", "green"] },
            }),
            defineField({ name: "image", title: "小图片", type: "imageWithAlt", description: "前台位置：优势项配图。是否建议修改：可不改。修改效果：为优势项添加配图。注意：建议 400×300 px，WebP/JPG 格式，200KB 以内。" }),
            defineField({ name: "isEnabled", title: "显示", type: "boolean", initialValue: true, description: "是否建议修改：谨慎改。修改效果：关闭后该优势项将隐藏。注意：通常保持开启。" }),
          ],
        },
      ],
    }),

    // ── 助孕流程摘要 ──
    defineField({
      name: "journeyTitle",
      title: "助孕流程标题",
      type: "string",
      description: "前台位置：助孕流程模块标题。是否建议修改：建议改。修改效果：引导访客了解服务流程。注意：建议 6-14 字。",
    }),
    defineField({
      name: "journeyDescription",
      title: "助孕流程说明",
      type: "text",
      rows: 2,
      description: "前台位置：助孕流程模块说明文字。是否建议修改：可不改。修改效果：补充说明服务流程。注意：建议 20-60 字。",
    }),
    defineField({
      name: "journeyMainImage",
      title: "助孕流程主图（左侧场景图）",
      type: "imageWithAlt",
      description: "前台位置：助孕流程区左侧大图。是否建议修改：建议改。修改效果：展示顾问沟通或服务场景。注意：建议 1200×900 px，WebP/JPG 格式，500KB 以内。",
    }),
    defineField({
      name: "journeyImageOverlay",
      title: "图片叠加文案",
      type: "string",
      description: '前台位置：流程主图上的叠加文案。是否建议修改：建议改。修改效果：在图片上显示引导性短文案。注意：建议 6-12 字，如"专属顾问全程陪伴"。',
    }),
    defineField({
      name: "journeyButtonText",
      title: "图片叠加按钮文字",
      type: "string",
      description: "前台位置：流程主图上的按钮文字。是否建议修改：可不改。修改效果：引导访客点击。注意：建议 4-6 字，如「立即咨询」。",
    }),
    defineField({
      name: "journeyButtonLink",
      title: "图片叠加按钮链接",
      type: "string",
      description: "前台位置：流程主图上按钮的跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后跳转到此地址。注意：站内用 /path 形式，不要填不存在的地址。",
    }),
    defineField({
      name: "journeySteps",
      title: "流程步骤（可拖动排序）",
      type: "array",
      description: "前台位置：助孕流程区的步骤列表。是否建议修改：建议改。修改效果：展示服务流程各步骤。注意：建议 3-6 步，可拖动调整顺序。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", description: "前台位置：步骤标题。是否建议修改：建议改。修改效果：展示步骤名称。注意：建议 4-8 字，如「初诊评估」。" }),
            defineField({ name: "description", title: "描述", type: "text", description: "前台位置：步骤说明。是否建议修改：建议改。修改效果：详细说明该步骤内容。注意：建议 20-60 字。" }),
            defineField({ name: "stepNumber", title: "步骤编号", type: "number", description: "前台位置：步骤序号。是否建议修改：谨慎改。修改效果：决定步骤的编号顺序。注意：按顺序填写 1、2、3……" }),
            defineField({ name: "icon", title: "图标", type: "string", description: "前台位置：步骤图标。是否建议修改：可不改。修改效果：更换图标样式。注意：使用项目中已有的图标名称。" }),
            defineField({ name: "isEnabled", title: "显示", type: "boolean", initialValue: true, description: "是否建议修改：谨慎改。修改效果：关闭后该步骤将隐藏。注意：通常保持开启。" }),
          ],
        },
      ],
    }),

    // ── 服务数据 ──
    defineField({
      name: "statsTitle",
      title: "服务数据标题",
      type: "string",
      description: "前台位置：服务数据模块标题。是否建议修改：可不改。修改效果：引导访客关注数据。注意：建议 6-14 字。",
    }),
    defineField({
      name: "statsDescription",
      title: "服务数据说明",
      type: "text",
      rows: 2,
      description: "前台位置：服务数据模块说明文字。是否建议修改：可不改。修改效果：补充说明数据含义。注意：建议 20-60 字。",
    }),
    defineField({
      name: "statsBackgroundImage",
      title: "数据区背景图",
      type: "imageWithAlt",
      description: "前台位置：服务数据区的全屏背景图。是否建议修改：建议改。修改效果：为数据展示提供视觉背景。注意：建议 2400×1200 px，WebP/JPG 格式，500KB 以内，选择温馨场景。",
    }),
    defineField({
      name: "statsButtonText",
      title: "数据区按钮文字",
      type: "string",
      description: "前台位置：服务数据区底部按钮。是否建议修改：可不改。修改效果：引导访客进一步行动。注意：建议 4-6 字。",
    }),
    defineField({
      name: "statsButtonLink",
      title: "数据区按钮链接",
      type: "string",
      description: "前台位置：数据区按钮跳转地址。是否建议修改：谨慎改。修改效果：点击按钮后跳转到此地址。注意：站内用 /path 形式，不要填不存在的地址。",
    }),
    defineField({
      name: "stats",
      title: "服务数据（可拖动排序）",
      type: "array",
      description: "前台位置：服务数据区的数据项列表。是否建议修改：建议改。修改效果：展示机构核心服务数据。注意：建议 3-5 项，可拖动调整顺序。",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "数值", type: "string", description: "前台位置：数据项的数字部分。是否建议修改：建议改。修改效果：展示醒目的数据数值。注意：建议用简短形式，如「85%」「2000+」。" }),
            defineField({ name: "label", title: "标签", type: "string", description: "前台位置：数据项的标签。是否建议修改：建议改。修改效果：说明数据类别。注意：建议 2-6 字，如「成功率」。" }),
            defineField({ name: "description", title: "描述", type: "string", description: "前台位置：数据项的补充说明。是否建议修改：可不改。修改效果：补充解释数据含义。注意：建议 10-30 字。" }),
          ],
        },
      ],
    }),

    // ── 新闻推荐 ──
    defineField({
      name: "newsTitle",
      title: "新闻推荐标题",
      type: "string",
      description: "前台位置：新闻推荐模块标题。是否建议修改：可不改。修改效果：引导访客浏览新闻。注意：建议 6-12 字。",
    }),
    defineField({
      name: "featuredNewsCount",
      title: "推荐新闻数量",
      type: "number",
      initialValue: 3,
      description: "前台位置：新闻推荐区显示的新闻条数。是否建议修改：谨慎改。修改效果：控制前台展示的新闻数量。注意：默认 3 篇，若已手动选稿则以选稿为准。",
    }),
    defineField({
      name: "featuredNews",
      title: "首页新闻选稿",
      type: "array",
      description:
        "前台位置：首页新闻推荐区的新闻列表。是否建议修改：建议改。修改效果：手动选择并排序首页展示的新闻。注意：最多 7 篇，第 1 篇为主新闻（中间大图），2-4 篇在左侧，5-7 篇在右侧。支持拖动排序。未配置时自动回退为最新推荐新闻。",
      validation: (rule) => rule.max(7).unique(),
      of: [
        {
          type: "reference",
          to: [{ type: "newsArticle" }],
          options: { disableNew: true },
        },
      ],
      options: {
        sortable: true,
      },
    }),

    // ── 常见问题精选 ──
    defineField({
      name: "faqTitle",
      title: "常见问题标题",
      type: "string",
      description: "前台位置：常见问题模块标题。是否建议修改：可不改。修改效果：引导访客查看常见问题。注意：建议 6-12 字。",
    }),
    defineField({
      name: "featuredFaqCount",
      title: "精选问题数量",
      type: "number",
      initialValue: 5,
      description: "前台位置：首页展示的常见问题条数。是否建议修改：谨慎改。修改效果：控制前台展示的 FAQ 数量。注意：默认 5 条，数据来自 FAQ 管理中设为推荐的问题。",
    }),

    // ── 咨询行动区 ──
    defineField({
      name: "cta",
      title: "咨询行动区",
      type: "cta",
      description: "前台位置：首页底部的咨询行动区，含标题、按钮和联系方式。是否建议修改：建议改。修改效果：引导访客进行咨询转化。注意：这是首页最后的转化入口，建议保持醒目的按钮文案。",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "前台位置：搜索引擎收录相关设置。是否建议修改：可不改。修改效果：影响搜索引擎对首页的展示标题和描述。注意：若不确定，保持默认即可；谨慎修改 noIndex 和 slug。",
    }),
  ],
  preview: {
    prepare() {
      return { title: "首页" };
    },
  },
});
