import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "站点设置",
  type: "document",
  fields: [
    // ── 品牌信息 ──
    defineField({
      name: "siteName",
      title: "网站名称",
      type: "string",
      description:
        '前台位置：页头 Logo 旁、页脚品牌名、浏览器标签标题。是否建议修改：必改。修改效果：影响全站品牌展示。注意：建议 10-20 个字，如「天悦宝贝（国际）助孕中心」。',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteNameEn",
      title: "英文网站名称",
      type: "string",
      description:
        '前台位置：页脚中文名称下方。是否建议修改：可不改。修改效果：显示英文品牌名。注意：留空则使用默认英文名。',
    }),
    defineField({
      name: "description",
      title: "网站描述",
      type: "text",
      rows: 3,
      description:
        '前台位置：首页 meta description、社交分享默认描述。是否建议修改：建议改。修改效果：影响搜索引擎摘要和社交分享文案。注意：建议 50-100 字，包含核心关键词。',
    }),
    defineField({
      name: "logo",
      title: "网站 Logo",
      type: "imageWithAlt",
      description:
        '前台位置：页头左上角、页脚品牌区。是否建议修改：必改。修改效果：影响全站品牌形象。注意：建议使用透明背景 PNG，宽度 200-400px。',
    }),
    defineField({
      name: "favicon",
      title: "浏览器图标 (Favicon)",
      type: "image",
      description:
        '前台位置：浏览器标签栏小图标。是否建议修改：可不改。修改效果：浏览器标签显示的品牌小图标。注意：建议 32×32 或 64×64 像素 PNG，支持透明背景。',
      options: { hotspot: false },
    }),
    defineField({
      name: "defaultShareImage",
      title: "默认分享图",
      type: "image",
      description:
        '仅在页面未设置专属分享图、封面图或 Hero 图时使用。建议主体放在画面中央；推荐上传不小于 800×800 的清晰 JPG/PNG，系统会按平台自动裁切。',
    }),

    // ── 联系方式 ──
    defineField({
      name: "phone",
      title: "联系电话",
      type: "string",
      description:
        '前台位置：页头、页脚、右侧悬浮栏、所有咨询按钮弹窗。是否建议修改：必改。修改效果：影响全站所有咨询入口的电话号码。注意：填写完整号码，如 400-xxx-xxxx 或 1xx-xxxx-xxxx。',
    }),
    defineField({
      name: "serviceHours",
      title: "服务时间",
      type: "string",
      description:
        '前台位置：页头联系电话旁、页脚联系区。是否建议修改：建议改。修改效果：告知用户可咨询的时间段。注意：如「周一至周日 9:00-21:00」。',
    }),
    defineField({
      name: "wechatQrCode",
      title: "微信咨询二维码",
      type: "image",
      description:
        '前台位置：右侧悬浮微信咨询弹窗。是否建议修改：必改。修改效果：用户扫码添加微信咨询。注意：建议上传正方形图片，不低于 500×500px，确保二维码清晰可扫。',
      options: { hotspot: false },
    }),
    defineField({
      name: "wechatPublicQrCode",
      title: "微信公众号二维码",
      type: "image",
      description:
        '前台位置：走进天悦宝贝页面关注公众号区域。是否建议修改：建议改。修改效果：用户扫码关注公众号。注意：建议正方形，不低于 500×500px。',
      options: { hotspot: false },
    }),
    defineField({
      name: "footerWechatQrCode",
      title: "页脚微信二维码",
      type: "image",
      options: { hotspot: false },
      description:
        '前台位置：网站公共页脚。是否建议修改：建议改。修改效果：页脚展示的微信二维码。注意：仅用于页脚，不影响右侧悬浮微信咨询二维码。建议正方形，不低于 500×500px。',
    }),

    // ── 咨询栏文字 ──
    defineField({
      name: "sidebarCtaText",
      title: "侧边栏咨询文字",
      type: "string",
      description:
        '前台位置：PC 端右侧悬浮咨询栏按钮文案。是否建议修改：可不改。修改效果：改变右侧悬浮按钮的文字。注意：建议简短，如「添加微信咨询」。',
    }),
    defineField({
      name: "mobileCtaText",
      title: "移动咨询栏文字",
      type: "string",
      description:
        '前台位置：手机端底部固定咨询栏按钮文案。是否建议修改：可不改。修改效果：改变移动端底部按钮的文字。注意：建议简短，如「立即咨询」。',
    }),

    // ── 页脚信息 ──
    defineField({
      name: "footerDescription",
      title: "页脚简介",
      type: "text",
      rows: 2,
      description:
        '前台位置：页脚品牌介绍区域。是否建议修改：必改。修改效果：页脚展示的品牌简介文案。注意：建议 50-100 字，语言简洁有力。',
    }),
    defineField({
      name: "icpNumber",
      title: "备案号",
      type: "string",
      description:
        '前台位置：页脚最底部备案信息。是否建议修改：建议改。修改效果：展示 ICP 备案号。注意：如「京ICP备XXXXXXXX号」。',
    }),
    defineField({
      name: "copyrightText",
      title: "版权文字",
      type: "string",
      description:
        '前台位置：页脚备案号上方。是否建议修改：可不改。修改效果：展示版权信息。注意：留空则自动生成。',
    }),

    // ── 默认 SEO ──
    defineField({
      name: "defaultSeo",
      title: "默认 SEO",
      type: "seo",
      description:
        '前台位置：全站页面的 meta 标签兜底值。是否建议修改：可不改。修改效果：未单独设置 SEO 的页面会使用这里的值。注意：建议填写品牌核心关键词。',
    }),

    // ── 默认 Banner ──
    defineField({
      name: "defaultBanner",
      title: "默认 Banner",
      type: "bannerSlide",
      description:
        '前台位置：未配置专属 Banner 的页面顶部轮播区。是否建议修改：建议改。修改效果：作为全站默认的顶部大图。注意：建议桌面图 2400×800px。',
    }),

    // ── 导航显示文字 ──
    defineField({
      name: "navLabels",
      title: "导航显示文字",
      type: "object",
      description:
        '前台位置：顶部导航菜单各菜单项文字。是否建议修改：可不改。修改效果：改变导航菜单显示的文字。注意：当前导航由代码控制，此处仅供参考。',
      fields: [
        defineField({ name: "home", title: "首页", type: "string", initialValue: "首页" }),
        defineField({ name: "intendedParents", title: "关于准父母", type: "string", initialValue: "关于准父母" }),
        defineField({ name: "journey", title: "助孕流程", type: "string", initialValue: "助孕流程" }),
        defineField({ name: "news", title: "新闻资讯", type: "string", initialValue: "新闻资讯" }),
        defineField({ name: "whyUs", title: "为什么选择我们", type: "string", initialValue: "为什么选择我们？" }),
        defineField({ name: "faq", title: "常见问题", type: "string", initialValue: "常见问题" }),
        defineField({ name: "startJourney", title: "踏上为人父母之旅", type: "string", initialValue: "踏上为人父母之旅" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "站点设置" };
    },
  },
});
