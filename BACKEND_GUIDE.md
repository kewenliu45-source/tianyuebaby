# 天赐宝贝 Sanity 后台管理指南

> 本指南帮助运营人员理解 Sanity 后台每个字段在网站前台的对应位置。
> 登录后台后，左侧菜单分为「固定页面」「新闻资讯」「成功案例」「常见问题」「咨询记录」等区域。
> ⚠️ 标记说明：✅ = 当前前台已展示 | 📝 = 需要填写才会显示 | ⬜ = 预留字段，暂未使用

---

## 目录

- [一、站点设置（全局）](#一站点设置全局)
- [二、固定页面](#二固定页面)
- [三、新闻资讯](#三新闻资讯)
- [四、成功案例](#四成功案例)
- [五、常见问题](#五常见问题)
- [六、咨询记录](#六咨询记录)
- [七、全站图片字段速查表](#七全站图片字段速查表)

---

## 一、站点设置（全局）

> 路径：左侧菜单 → **站点设置**

这是全站共享的配置，影响所有页面的页头、页脚和默认值。

### 1.1 品牌信息

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 说明 |
|---------|--------|---------|---------|------|
| 网站名称 | `siteName` | ✅ | 所有页面 Header 左上角（无 Logo 图时显示文字）、所有页面页脚品牌名、浏览器标签默认标题 | 必填，如"天悦宝贝（国际）助孕中心" |
| 英文网站名称 | `siteNameEn` | ✅ | 所有页面页脚，中文品牌名正下方 | 如"Tianyue Baby International Fertility Center"，留空则显示默认值 |
| 网站描述 | `description` | ✅ | 首页 `<meta description>`、社交分享（OG）描述的回退值 | 一句话介绍 |
| 网站 Logo | `logo` | ✅ | 所有页面顶部导航栏左上角，点击回首页 | **400×80px** PNG 透明底，宽高比约 5:1。未上传时显示"网站名称"文字 |
| 默认分享图 | `defaultShareImage` | ✅ | 微信/社交平台分享链接时的默认封面图（当页面未设置自己的 OG 图片时使用） | **1200×630px** JPG，重要文字和 Logo 居中放置 |

### 1.2 联系方式

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 说明 |
|---------|--------|---------|---------|------|
| 联系电话 | `phone` | ✅ | 所有页面页脚"联系我们"区域、"踏上为人父母之旅"页面左侧电话卡片、所有页面底部 CTA 的电话按钮（点击可拨号） | 如"400-123-4567" |
| 服务时间 | `serviceHours` | ✅ | 所有页面页脚"联系我们"区域电话下方、"踏上为人父母之旅"页面电话卡片下方 | 如"周一至周日 9:00-18:00" |
| 微信咨询二维码 | `wechatQrCode` | ✅ | 移动端所有页面底部固定栏"微信咨询"按钮点击后弹出的二维码弹窗中 | **500×500px** 方形 PNG，白底，微信扫码可识别 |
| 微信公众号二维码 | `wechatPublicQrCode` | ✅ | 桌面端所有页面右侧悬浮"微信公众号"按钮，鼠标悬停后弹出的浮层中显示 | **500×500px** 方形 PNG，白底 |
| 页脚微信二维码 | `footerWechatQrCode` | ✅ | 所有页面页脚"联系我们"区域下方，电话和服务时间下方显示。与右侧悬浮二维码互不影响 | **500×500px** 方形 PNG，白底。未上传时不显示（不会出现破图） |

### 1.3 页脚信息

| 后台字段 | 字段名 | 是否显示 | 前台位置 |
|---------|--------|---------|---------|
| 页脚简介 | `footerDescription` | ✅ | 所有页面页脚左侧，品牌名下方的描述文字 |
| 备案号 | `icpNumber` | ✅ | 所有页面页脚最底部右侧 |
| 版权文字 | `copyrightText` | ✅ | 所有页面页脚最底部左侧 |

### 1.4 默认 SEO

当某个页面没有设置自己的 SEO 时，会使用这里的值作为回退。

| 后台字段 | 字段名 | 是否显示 | 说明 |
|---------|--------|---------|------|
| 页面标题 | `defaultSeo.metaTitle` | ✅ | 浏览器标签标题（各页面未设置时回退到此） |
| 页面描述 | `defaultSeo.metaDescription` | ✅ | 搜索引擎结果摘要 |
| 关键词 | `defaultSeo.keywords` | ✅ | 搜索引擎关键词 |
| OG 标题 | `defaultSeo.ogTitle` | ✅ | 微信/社交平台分享标题 |
| OG 描述 | `defaultSeo.ogDescription` | ✅ | 微信/社交平台分享描述 |
| OG 图片 | `defaultSeo.ogImage` | ✅ | 微信/社交平台分享封面图，**1200×630px** |
| 规范链接 | `defaultSeo.canonicalUrl` | ✅ | SEO 规范 URL |
| 禁止索引 | `defaultSeo.noIndex` | ✅ | 勾选后全站默认 noindex |

### 1.5 导航显示文字

可修改导航栏显示文字，但**不能修改路由、顺序或增加一级页面**。

| 后台字段 | 默认值 | 前台位置 |
|---------|--------|---------|
| 首页 | 首页 | 所有页面顶部导航栏 |
| 关于准父母 | 关于准父母 | 导航栏 |
| 助孕流程 | 助孕流程 | 导航栏 |
| 新闻资讯 | 新闻资讯 | 导航栏 |
| 为什么选择我们 | 为什么选择我们？ | 导航栏 |
| 常见问题 | 常见问题 | 导航栏 |
| 踏上为人父母之旅 | 踏上为人父母之旅 | 导航栏 |

### 1.6 默认 Banner

当某个页面没有设置自己的 Banner 时，使用此默认 Banner。当前使用此 Banner 的页面：首页（无自定义首屏时）、关于准父母、助孕流程、为什么选择我们、常见问题、踏上为人父母之旅、隐私政策。

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 桌面图片 | `defaultBanner.desktopImage` | ✅ | 上述页面顶部全宽 Banner（桌面端），高度约 300-500px | **1920×600px** JPG/WebP |
| 移动图片 | `defaultBanner.mobileImage` | ✅ | 同上，移动端 | **750×500px** JPG/WebP |
| Alt 文本 | `defaultBanner.alt` | ✅ | 图片替代文本（SEO/无障碍） | 必填 |
| 标题 | `defaultBanner.title` | ✅ | Banner 上覆盖的大标题 | — |
| 副标题 | `defaultBanner.subtitle` | ✅ | 标题下方说明文字 | — |
| 按钮文字 | `defaultBanner.buttonText` | ✅ | Banner 上的按钮 | — |
| 按钮链接 | `defaultBanner.buttonLink` | ✅ | 按钮跳转地址 | — |
| 启用 | `defaultBanner.isActive` | ✅ | 是否显示 | — |

---

## 二、固定页面

> 路径：左侧菜单 → **固定页面 → [页面名]**

每个固定页面都是单例文档（只有一份），用于控制该页面的装修内容。

---

### 2.1 首页

> 路径：固定页面 → **首页**
> 前台地址：`/`

#### 专业首屏（Hero 区域）

占据页面最顶部，全屏高度约 560-650px。

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 显示首屏 | `hero.isEnabled` | ✅ | 开关，开启时使用新首屏，关闭时回退到旧 Banner 轮播 | — |
| 桌面端大图 | `hero.desktopImage` | ✅ | 首屏全宽背景图（桌面端），整个首屏区域铺满 | **2400×1200px** JPG/WebP，人物或视觉主体偏右侧，左侧留空给文字叠加 |
| 移动端大图 | `hero.mobileImage` | ✅ | 首屏全宽背景图（移动端） | **900×1200px** JPG/WebP，主体居中 |
| 文字区遮罩强度 | `hero.overlayStrength` | ✅ | 控制左侧文字区域的暗色遮罩深度，35-90，数字越大越暗 | — |
| 眉题 | `hero.eyebrow` | ✅ | 主标题上方小字，如"国际生育咨询与全流程服务" | — |
| 主标题 | `hero.title` | ✅ | 首屏大标题（H1），如"以专业判断，为每个家庭规划清晰的生育路径" | 最多 42 字 |
| 专业说明 | `hero.description` | ✅ | 标题下方描述文字 | — |
| 主按钮文字 | `hero.primaryButtonText` | ✅ | 如"预约专业顾问" | — |
| 主按钮链接 | `hero.primaryButtonLink` | ✅ | 如 `/start-your-journey` | — |
| 次按钮文字 | `hero.secondaryButtonText` | ✅ | 如"了解服务项目" | — |
| 次按钮链接 | `hero.secondaryButtonLink` | ✅ | 如 `/medical-services` | — |
| 专业能力标签 | `hero.badges` | ✅ | 主标题下方的 4 个小标签，如"专业团队""个性化方案" | 最多 4 个 |
| 首屏数据栏 | `hero.stats` | ✅ | 首屏底部深色半透明条，4 列数据展示，如"15+ 年行业服务经验" | 最多 4 项，每项有数值+说明 |

#### 核心优势（为什么选择我们）

首屏下方的区块，左侧大图 + 右侧 2×2 卡片。

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `advantagesTitle` | ✅ | 区块标题，默认"为什么选择我们" | — |
| 说明 | `advantagesDescription` | ✅ | 标题下方描述文字，同时显示在左侧大图底部叠加文字 | — |
| 主图 | `advantagesMainImage` | ✅ | 左侧大图，约占区块宽度一半，圆角阴影 | **1200×900px** JPG/WebP，团队/咨询/服务场景 |
| 优势列表 | `advantages[]` | ✅ | 右侧 2×2 卡片网格 | — |
| ↳ 标题 | `item.title` | ✅ | 卡片标题 | — |
| ↳ 描述 | `item.description` | ✅ | 卡片描述文字 | — |
| ↳ 图标 | `item.icon` | ✅ | 卡片左侧图标 | 可选：users / heart / shield / award |
| ↳ 颜色 | `item.color` | ✅ | 图标背景色 | 可选：pink / purple / yellow / green |
| ↳ 小图片 | `item.image` | ✅ | 卡片左侧小图（替代图标） | **400×300px** JPG/WebP |
| ↳ 显示 | `item.isEnabled` | ✅ | 控制该卡片是否显示 | — |

#### 助孕流程

核心优势下方的区块，左侧大图 + 右侧纵向时间轴。

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `journeyTitle` | ✅ | 区块标题，默认"助孕流程" | — |
| 说明 | `journeyDescription` | ✅ | 标题下方描述 | — |
| 主图 | `journeyMainImage` | ✅ | 左侧大图 | **1200×900px** JPG/WebP，顾问沟通/方案讨论场景 |
| 图片叠加文案 | `journeyImageOverlay` | ✅ | 图片底部叠加的白色文字，如"专属顾问全程陪伴" | — |
| 图片叠加按钮文字 | `journeyButtonText` | ✅ | 图片上的按钮文字，如"了解完整流程" | — |
| 图片叠加按钮链接 | `journeyButtonLink` | ✅ | 按钮跳转地址，如 `/journey` | — |
| 流程步骤 | `journeySteps[]` | ✅ | 右侧纵向时间轴，蓝色圆点+连接线 | — |
| ↳ 标题 | `step.title` | ✅ | 步骤名称 | — |
| ↳ 描述 | `step.description` | ✅ | 步骤说明 | — |
| ↳ 步骤编号 | `step.stepNumber` | ✅ | 圆点中的数字 | — |
| ↳ 显示 | `step.isEnabled` | ✅ | 控制该步骤是否显示 | — |

#### 我们的成绩

助孕流程下方的深蓝色沉浸式区块，左侧文案 + 右侧 2×2 数据卡片。

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `statsTitle` | ✅ | 区块标题，默认"我们的成绩" | — |
| 说明 | `statsDescription` | ✅ | 标题下方描述文字 | — |
| 背景图 | `statsBackgroundImage` | ✅ | 整个区块的深色背景图（可选，不上传时使用默认深蓝渐变） | **2400×1200px** JPG/WebP，家庭/新生儿/团队场景 |
| 按钮文字 | `statsButtonText` | ✅ | 如"了解天悦宝贝" | — |
| 按钮链接 | `statsButtonLink` | ✅ | 如 `/about-tianyue` | — |
| 服务数据 | `stats[]` | ✅ | 右侧 2×2 半透明白色卡片 | — |
| ↳ 数值 | `stat.value` | ✅ | 大号数字，如"15+" | — |
| ↳ 标签 | `stat.label` | ✅ | 数字下方文字，如"年行业经验" | — |
| ↳ 描述 | `stat.description` | ✅ | 标签下方小字补充说明 | — |

#### 其他首页模块

| 后台字段 | 字段名 | 是否显示 | 前台位置 |
|---------|--------|---------|---------|
| 品牌简介标题 | `brandIntroTitle` | ⬜ | 预留，当前隐藏 |
| 品牌简介内容 | `brandIntroContent` | ⬜ | 预留 |
| 品牌简介图片 | `brandIntroImage` | ⬜ | 预留 |
| 第三代试管服务标题 | `ivfTitle` | ⬜ | 预留 |
| 第三代试管服务描述 | `ivfDescription` | ⬜ | 预留 |
| 服务特点 | `ivfFeatures[]` | ⬜ | 预留 |
| 新闻推荐标题 | `newsTitle` | ✅ | 首页新闻区块标题，默认"新闻资讯" |
| 推荐数量 | `featuredNewsCount` | ✅ | 控制首页显示几篇新闻（默认 3） |
| 常见问题标题 | `faqTitle` | ✅ | 首页 FAQ 区块标题，默认"常见问题" |
| 精选数量 | `featuredFaqCount` | ✅ | 控制首页显示几条 FAQ（默认 5） |
| 咨询行动区 | `cta` | ✅ | 首页底部深蓝色区块（标题+描述+按钮） |
| 后续模块显示设置 | `sectionVisibility` | ✅ | 控制各区块是否显示的开关 |

---

### 2.2 三代试管婴儿

> 路径：固定页面 → **三代试管婴儿**
> 前台地址：`/third-generation-ivf`

#### Hero 区域

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| Hero 标题 | `heroTitle` | ✅ | 页面顶部大标题（H1） | — |
| Hero 副标题 | `heroSubtitle` | ✅ | 标题下方小字 | — |
| Hero 描述 | `heroDescription` | ✅ | 副标题下方说明 | — |
| Hero 图片 | `heroImage` | ✅ | 页面右侧配图 | **1200×900px** JPG/WebP |
| Hero 标签 | `heroBadges` | ✅ | 标题上方小标签 | 最多 4 个 |
| Hero 表单标题 | `heroFormTitle` | ✅ | 右侧表单标题 | — |
| Hero 表单按钮 | `heroFormButtonText` | ✅ | 表单提交按钮文字 | — |
| 主按钮文字/链接 | `heroPrimaryButtonText/Link` | ✅ | 如"立即咨询" | — |
| 次按钮文字/链接 | `heroSecondaryButtonText/Link` | ✅ | 如"预约方案评估" | — |

#### 科普模块

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `introTitle` | ✅ | 科普区标题 | — |
| 副标题 | `introSubtitle` | ✅ | 标题下方 | — |
| 正文 | `introBody` | ✅ | 科普文字内容 | — |
| 图片 | `introImage` | ✅ | 科普区配图 | **1200×800px** |
| 图片说明 | `introImageCaption` | ✅ | 图片下方小字 | — |
| 信息要点 | `introPoints` | ✅ | 要点列表 | — |

#### 数据背书

| 后台字段 | 字段名 | 是否显示 | 前台位置 |
|---------|--------|---------|---------|
| 数据背书 | `trustItems[]` | ✅ | Hero 下方横向数据条 |
| ↳ 数值/关键词 | `item.value` | ✅ | 大号数字 |
| ↳ 说明 | `item.label` | ✅ | 数字下方文字 |
| ↳ 补充描述 | `item.description` | ✅ | 说明下方小字 |

#### 为什么选择我们

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `whyChooseTitle` | ✅ | 区块标题 | — |
| 描述 | `whyChooseDescription` | ✅ | 标题下方 | — |
| 主图 | `whyChooseImage` | ✅ | 区块配图 | **1200×900px** |
| 优势列表 | `whyChooseItems[]` | ✅ | 2×2 或 4 列卡片 | — |
| ↳ 标题 | `item.title` | ✅ | 卡片标题 | — |
| ↳ 描述 | `item.description` | ✅ | 卡片描述 | — |
| ↳ 图标 | `item.icon` | ✅ | 卡片图标 | 可选：users/heart/shield/award |

#### 核心服务

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `servicesTitle` | ✅ | 区块标题 | — |
| 描述 | `servicesDescription` | ✅ | 标题下方 | — |
| 服务列表 | `serviceItems[]` | ✅ | 服务卡片 | — |
| ↳ 标题 | `item.title` | ✅ | 卡片标题 | — |
| ↳ 描述 | `item.description` | ✅ | 卡片描述 | — |
| ↳ 图片 | `item.image` | ✅ | 卡片封面图 | **800×600px** |
| ↳ 要点 | `item.points[]` | ✅ | 卡片内要点列表 | — |

#### 合作医院

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `hospitalsTitle` | ✅ | 区块标题 | — |
| 描述 | `hospitalsDescription` | ✅ | 标题下方 | — |
| 医院列表 | `hospitalItems[]` | ✅ | 医院/资源展示卡片 | — |
| ↳ 名称 | `item.name` | ✅ | 卡片标题 | — |
| ↳ 所在地 | `item.location` | ✅ | 名称下方 | — |
| ↳ 简介 | `item.description` | ✅ | 卡片描述 | — |
| ↳ 图片/Logo | `item.image` | ✅ | 卡片封面或 Logo | **600×400px** |
| ↳ 标签 | `item.tags[]` | ✅ | 卡片底部标签 | — |

#### 专家团队

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `expertsTitle` | ✅ | 区块标题 | — |
| 描述 | `expertsDescription` | ✅ | 标题下方 | — |
| 专家列表 | `expertItems[]` | ✅ | 专家卡片 | — |
| ↳ 姓名/角色 | `item.name` | ✅ | 卡片标题 | — |
| ↳ 职称 | `item.title` | ✅ | 名称下方 | — |
| ↳ 简介 | `item.description` | ✅ | 卡片描述 | — |
| ↳ 头像 | `item.avatar` | ✅ | 卡片顶部圆形头像 | **400×400px** 方形，人脸居中 |
| ↳ 专长领域 | `item.specialties[]` | ✅ | 卡片底部标签 | — |

#### 服务流程

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `processTitle` | ✅ | 区块标题 | — |
| 描述 | `processDescription` | ✅ | 标题下方 | — |
| 主图 | `processImage` | ✅ | 区块配图 | **1200×800px** |
| 流程步骤 | `processSteps[]` | ✅ | 时间轴步骤 | — |
| ↳ 步骤编号 | `item.stepNumber` | ✅ | 蓝色圆点中的数字 | — |
| ↳ 标题 | `item.title` | ✅ | 步骤标题 | — |
| ↳ 描述 | `item.description` | ✅ | 步骤描述 | — |
| ↳ 预计时长 | `item.duration` | ✅ | 标题旁小标签 | — |
| ↳ 步骤图片 | `item.image` | ✅ | 步骤配图 | **800×600px** |

#### 真实案例

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `casesTitle` | ✅ | 区块标题 | — |
| 描述 | `casesDescription` | ✅ | 标题下方 | — |
| 案例列表 | `caseItems[]` | ✅ | 案例卡片 | — |
| ↳ 标题 | `item.title` | ✅ | 卡片标题 | — |
| ↳ 家庭情况 | `item.profile` | ✅ | 标题下方标签，如"高龄备孕家庭" | — |
| ↳ 案例概述 | `item.summary` | ✅ | 卡片描述 | — |
| ↳ 结果说明 | `item.resultDescription` | ✅ | 卡片底部小字（去隐私化，不承诺结果） | — |
| ↳ 图片 | `item.image` | ✅ | 卡片封面 | **800×600px** |

#### 客户评价

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `testimonialsTitle` | ✅ | 区块标题 | — |
| 描述 | `testimonialsDescription` | ✅ | 标题下方 | — |
| 场景图 | `testimonialsImage` | ✅ | 区块配图 | **1200×800px** |
| 评价列表 | `testimonialItems[]` | ✅ | 评价卡片 | — |
| ↳ 显示名称 | `item.displayName` | ✅ | 卡片名称（匿名处理） | — |
| ↳ 身份描述 | `item.profile` | ✅ | 名称下方 | — |
| ↳ 评价内容 | `item.content` | ✅ | 引用文字 | — |
| ↳ 评分 | `item.rating` | ✅ | 星星评分 1-5 | — |
| ↳ 头像 | `item.avatar` | ✅ | 卡片头像 | **200×200px** 方形 |

#### FAQ

| 后台字段 | 字段名 | 是否显示 | 前台位置 |
|---------|--------|---------|---------|
| 标题 | `faqTitle` | ✅ | 区块标题 |
| 描述 | `faqDescription` | ✅ | 标题下方 |
| FAQ 列表 | `faqItems[]` | ✅ | 手风琴折叠列表 |
| ↳ 问题 | `item.question` | ✅ | 折叠标题 |
| ↳ 回答 | `item.answer` | ✅ | 展开后内容 |

#### 最终 CTA

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `finalCtaTitle` | ✅ | 底部深蓝色区域大标题 | — |
| 描述 | `finalCtaDescription` | ✅ | 标题下方 | — |
| 主按钮文字/链接 | `finalCtaPrimaryButtonText/Link` | ✅ | 如"立即咨询" | — |
| 次按钮文字/链接 | `finalCtaSecondaryButtonText/Link` | ✅ | 如"预约方案评估" | — |
| 背景图片 | `finalCtaBackgroundImage` | ✅ | 深色区域背景图（可选） | **2400×800px** JPG/WebP，深色调 |

---

### 2.3 冻卵/冻精

> 路径：固定页面 → **冻卵/冻精**
> 前台地址：`/egg-sperm-freezing`

页面结构：Hero + 目录导航 + 左侧正文（contentBlocks） + 右侧 Sidebar + 案例 + FAQ + 最终 CTA

#### Hero 额外字段

| 后台字段 | 字段名 | 是否显示 | 前台位置 |
|---------|--------|---------|---------|
| 发布时间 | `publishedAt` | ✅ | Hero 区域日期显示 |
| 阅读时长 | `readingTime` | ✅ | Hero 区域，如"10 分钟阅读" |
| 作者姓名 | `authorName` | ✅ | Hero 区域作者名 |
| 作者职称 | `authorTitle` | ✅ | Hero 区域作者职称 |

#### 目录

| 后台字段 | 字段名 | 是否显示 | 前台位置 |
|---------|--------|---------|---------|
| 目录项 | `tocItems[]` | ✅ | Hero 下方水平目录导航栏 |
| ↳ 标题 | `item.title` | ✅ | 目录文字 |
| ↳ 锚点 | `item.anchor` | ✅ | 点击跳转的锚点 ID |

#### 正文模块（contentBlocks）

| 模块类型 | blockType | 前台渲染 | 图片要求 |
|---------|-----------|---------|---------|
| 图文混排 | `textImage` | 左图右文或右图左文，交替排列 | **1200×900px** |
| 全宽图片 | `fullImage` | 横跨整行的大图 | **1920×800px** |
| 信息卡片 | `infoCard` | 2 列卡片网格，每张有图标+标题+描述 | 子项图片 **400×300px** |
| 数据统计 | `stats` | 4 列数字卡片 | — |
| 流程时间线 | `processTimeline` | 纵向步骤列表，蓝色圆点+连接线 | — |
| 医生简介 | `doctorProfile` | 由顶层医生字段控制，模块内跳过 | — |
| 案例展示 | `caseStudy` | 由顶层案例字段控制，模块内跳过 | — |
| 内嵌 CTA | `inlineCta` | 蓝色渐变背景的行动号召区 | — |

每个模块通用字段：`anchor`（锚点）、`title`（标题）、`subtitle`（副标题）、`body`（正文）、`image`（图片）、`imagePosition`（左/右）、`caption`（图片说明）、`cardTone`（色调）、`buttonText`（按钮文字）、`buttonLink`（按钮链接）、`items[]`（子项列表）

#### 医生/顾问模块

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 医生姓名 | `doctorName` | ✅ | Sidebar 顾问卡片标题 | — |
| 医生职称 | `doctorTitle` | ✅ | 名称下方 | — |
| 医生经历 | `doctorExperience` | ✅ | 卡片描述 | — |
| 医生专长 | `doctorSpecialties[]` | ✅ | 底部标签 | — |
| 医生头像 | `doctorAvatar` | ✅ | 卡片左侧圆形头像 | **400×400px** 方形 |
| 医生按钮文字/链接 | `doctorButtonText/Link` | ✅ | 卡片底部按钮 | — |

#### 案例模块

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 案例列表 | `caseItems[]` | ✅ | 正文下方案例卡片区域 | — |
| ↳ 标题 | `item.title` | ✅ | 卡片标题 | — |
| ↳ 家庭情况 | `item.profile` | ✅ | 标题下方标签 | — |
| ↳ 案例故事 | `item.story` | ✅ | 卡片描述 | — |
| ↳ 结果说明 | `item.resultDescription` | ✅ | 卡片底部小字 | — |
| ↳ 客户感言 | `item.testimonial` | ✅ | 斜体引用 | — |
| ↳ 图片 | `item.image` | ✅ | 卡片封面 | **800×600px** |

#### Sidebar

| 后台字段 | 字段名 | 是否显示 | 前台位置 |
|---------|--------|---------|---------|
| 侧边栏标题 | `sidebarTitle` | ✅ | 右侧卡片标题 |
| 侧边栏描述 | `sidebarDescription` | ✅ | 卡片描述 |
| 侧边栏主按钮文字/链接 | `sidebarPrimaryButtonText/Link` | ✅ | 如"在线咨询" |
| 侧边栏次按钮文字/链接 | `sidebarSecondaryButtonText/Link` | ✅ | 如"预约方案评估" |
| 侧边栏电话 | `sidebarPhone` | ✅ | 电话号码 |
| 侧边栏微信文案 | `sidebarWechatText` | ✅ | 微信联系方式 |
| 侧边栏 WhatsApp 文案 | `sidebarWhatsappText` | ✅ | WhatsApp 联系方式 |
| 侧边栏热门文章 | `sidebarHotArticles[]` | ✅ | 链接列表 |
| 侧边栏相关链接 | `sidebarRelatedLinks[]` | ✅ | 链接列表 |
| 侧边栏国家列表 | `sidebarCountries[]` | ✅ | 链接列表 |

#### 最终 CTA

同三代试管婴儿页面结构（标题+描述+双按钮+背景图）。

---

### 2.4 第三方辅助生殖

> 路径：固定页面 → **第三方辅助生殖**
> 前台地址：`/third-party-assisted-reproduction`

结构与冻卵/冻精页面完全一致（Hero + 目录 + contentBlocks + 医生 + 案例 + FAQ + Sidebar + 最终 CTA），图片要求相同。

---

### 2.5 私人订制

> 路径：固定页面 → **私人订制**
> 前台地址：`/private-customization`

结构与冻卵/冻精页面完全一致，图片要求相同。

---

### 2.6 试管服务区域

> 路径：固定页面 → **试管服务区域**
> 前台地址：`/ivf-services`

#### 服务区域（含地图标记）

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `serviceAreasTitle` | ✅ | 区块标题 | — |
| 描述 | `serviceAreasDescription` | ✅ | 标题下方 | — |
| 服务区域 | `serviceRegions[]` | ✅ | 中国地图标记 + 下方 5 列卡片 | — |
| ↳ 地区名称 | `item.name` | ✅ | 卡片标题 + 地图标注 | — |
| ↳ 副标题 | `item.subtitle` | ✅ | 卡片副标题 | — |
| ↳ 简介 | `item.description` | ✅ | 卡片描述 | — |
| ↳ 地区图片 | `item.image` | ✅ | 卡片封面图 | **800×600px** |
| ↳ 服务标签 | `item.serviceHighlights[]` | ✅ | 卡片内标签 | — |
| ↳ 按钮文字/链接 | `item.ctaText/Link` | ✅ | 卡片底部按钮 | — |
| ↳ 地图标注名称 | `item.mapLabel` | ✅ | 地图上显示的文字（可与地区名称不同） | — |
| ↳ 经度 | `item.lng` | ✅ | 地图标记水平位置，如北京 116.4074 | — |
| ↳ 纬度 | `item.lat` | ✅ | 地图标记垂直位置，如北京 39.9042 | — |

---

### 2.7 医疗服务

> 路径：固定页面 → **医疗服务**
> 前台地址：`/medical-services`

#### 品牌历程时间轴

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `timelineTitle` | ✅ | 时间轴区块标题 | — |
| 描述 | `timelineDescription` | ✅ | 标题下方 | — |
| 时间轴节点 | `timelineItems[]` | ✅ | 横向时间轴 | — |
| ↳ 年份 | `item.year` | ✅ | 节点上方大字 | — |
| ↳ 标题 | `item.title` | ✅ | 节点标题 | — |
| ↳ 描述 | `item.description` | ✅ | 节点描述 | — |
| ↳ 图片 | `item.image` | ✅ | 节点图标/图片（替代默认日历图标） | **200×200px** |

#### 页面导语

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 导语标题 | `introTitle` | ✅ | 时间轴下方标题 | — |
| 导语描述 | `introDescription` | ✅ | 标题下方文字 | — |
| 导语图片 | `introImage` | ✅ | 导语区配图 | **1200×600px** |

#### 核心服务模块

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 服务模块 | `serviceSections[]` | ✅ | 4 个服务分段，图文交替排列 | — |
| ↳ 编号 | `item.sectionNumber` | ✅ | 如"01""02" | — |
| ↳ 标题 | `item.title` | ✅ | 模块标题 | — |
| ↳ 副标题 | `item.subtitle` | ✅ | 标题下方小字 | — |
| ↳ 正文 | `item.body` | ✅ | 模块描述文字 | — |
| ↳ 图片 | `item.image` | ✅ | 模块配图（左/右交替） | **800×600px** |
| ↳ 图片位置 | `item.imagePosition` | ✅ | 左/右 | — |
| ↳ 按钮文字/链接 | `item.buttonText/Link` | ✅ | 模块底部按钮 | — |
| ↳ 子项列表 | `item.items[]` | ✅ | 图标要点 | — |

#### 优势 Banner

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 优势标题 | `advantagesTitle` | ✅ | 深色横幅标题 | — |
| 优势描述 | `advantagesDescription` | ✅ | 标题下方 | — |
| 优势图片 | `advantagesImage` | ✅ | 横幅背景图（可选） | **2400×600px** |
| 优势列表 | `advantageItems[]` | ✅ | 5 列图标+文字 | — |

#### 相关推荐

| 后台字段 | 字段名 | 是否显示 | 前台位置 |
|---------|--------|---------|---------|
| 标题 | `relatedTitle` | ✅ | 区块标题 |
| 推荐列表 | `relatedItems[]` | ✅ | 2 列推荐卡片 |
| ↳ 标题 | `item.title` | ✅ | 卡片标题 |
| ↳ 描述 | `item.description` | ✅ | 卡片描述 |
| ↳ 链接 | `item.href` | ✅ | 卡片跳转 |

#### 服务流程

| 后台字段 | 字段名 | 是否显示 | 前台位置 |
|---------|--------|---------|---------|
| 标题 | `processTitle` | ✅ | 区块标题 |
| 描述 | `processDescription` | ✅ | 标题下方 |
| 流程步骤 | `processSteps[]` | ✅ | 时间轴步骤 |

#### Sidebar

同冻卵/冻精页面 Sidebar 结构。

#### 品牌沉淀区

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `brandSectionTitle` | ✅ | 数据亮点区标题 | — |
| 副标题 | `brandSectionSubtitle` | ✅ | 标题下方 | — |
| 描述 | `brandSectionDescription` | ✅ | 副标题下方 | — |
| 背景图 | `brandSectionBackgroundImage` | ✅ | 区块背景图（可选） | **2400×800px** |

#### 在线咨询区

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `consultationTitle` | ✅ | 底部深色区块标题 | — |
| 描述 | `consultationDescription` | ✅ | 标题下方 | — |
| 背景图 | `consultationBackgroundImage` | ✅ | 区块背景图（可选） | **2400×800px** |

---

### 2.8 新闻资讯页面

> 路径：固定页面 → **新闻资讯页面**
> 前台地址：`/news`

控制 `/news` 列表页的装修内容。新闻文章本身通过「新闻资讯」菜单管理。

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| Hero 标题 | `heroTitle` | ✅ | 列表页顶部标题 | — |
| Hero 副标题 | `heroSubtitle` | ✅ | 标题下方 | — |
| Hero 描述 | `heroDescription` | ✅ | 副标题下方 | — |
| Hero 图片 | `heroImage` | ✅ | 列表页顶部背景图 | **2400×1200px** |
| 时间轴标题 | `timelineTitle` | ✅ | Hero 下方时间轴标题 | — |
| 时间轴描述 | `timelineDescription` | ✅ | 标题下方 | — |
| 时间轴节点 | `timelineItems[]` | ✅ | 横向时间轴 | — |
| ↳ 年份 | `item.year` | ✅ | 节点年份 | — |
| ↳ 标题 | `item.title` | ✅ | 节点标题 | — |
| ↳ 描述 | `item.description` | ✅ | 节点描述 | — |
| ↳ 图片 | `item.image` | ✅ | 节点图标 | **200×200px** |
| Breadcrumb 标签 | `breadcrumbCurrentLabel` | ✅ | 面包屑当前页文字 | — |
| 列表区标题 | `listTitle` | ✅ | 新闻列表上方标题 | — |
| 列表区描述 | `listDescription` | ✅ | 标题下方 | — |
| Sidebar 咨询标题 | `sidebarConsultTitle` | ✅ | 右侧咨询卡标题 | — |
| Sidebar 咨询描述 | `sidebarConsultDescription` | ✅ | 卡片描述 | — |
| Sidebar 咨询按钮 | `sidebarConsultButtonText/Link` | ✅ | 卡片按钮 | — |
| Sidebar 资源标题 | `sidebarResourceTitle` | ✅ | 资源卡片标题 | — |
| Sidebar 资源描述 | `sidebarResourceDescription` | ✅ | 卡片描述 | — |
| Sidebar 资源图片 | `sidebarResourceImage` | ✅ | 资源卡片封面 | **600×400px** |
| Sidebar 专家标题 | `sidebarExpertsTitle` | ✅ | 专家列表标题 | — |
| Sidebar 专家描述 | `sidebarExpertsDescription` | ✅ | 标题下方 | — |
| Sidebar 专家列表 | `sidebarExpertItems[]` | ✅ | 专家列表 | — |
| Sidebar 精选标题 | `sidebarFeaturedTitle` | ✅ | 精选案例/资讯标题 | — |
| Sidebar 服务标题 | `sidebarServiceTitle` | ✅ | 服务通道标题 | — |
| Sidebar 服务列表 | `sidebarServiceItems[]` | ✅ | 服务通道链接 | — |
| 品牌沉淀标题 | `brandSectionTitle` | ✅ | 底部数据区标题 | — |
| 品牌沉淀副标题 | `brandSectionSubtitle` | ✅ | 标题下方 | — |
| 品牌沉淀描述 | `brandSectionDescription` | ✅ | 副标题下方 | — |
| 品牌沉淀背景图 | `brandSectionBackgroundImage` | ✅ | 区块背景图 | **2400×800px** |
| 咨询区标题 | `consultationTitle` | ✅ | 底部表单区标题 | — |
| 咨询区描述 | `consultationDescription` | ✅ | 标题下方 | — |
| 咨询区背景图 | `consultationBackgroundImage` | ✅ | 区块背景图 | **2400×800px** |

---

### 2.9 成功案例页面

> 路径：固定页面 → **成功案例页面**
> 前台地址：`/success-cases`

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| Hero 标题 | `heroTitle` | ✅ | 列表页顶部标题 | — |
| Hero 副标题 | `heroSubtitle` | ✅ | 标题下方 | — |
| Hero 描述 | `heroDescription` | ✅ | 副标题下方 | — |
| Hero 图片 | `heroImage` | ✅ | 列表页顶部背景图 | **2400×1200px** |
| Hero 主按钮 | `heroPrimaryButtonText/Link` | ✅ | 按钮 | — |
| 时间线标题 | `timelineTitle` | ✅ | 时间线区块标题 | — |
| 时间线项目 | `timelineItems[]` | ✅ | 纵向时间线 | — |
| ↳ 年份 | `item.year` | ✅ | 节点年份 | — |
| ↳ 标题 | `item.title` | ✅ | 节点标题 | — |
| ↳ 描述 | `item.description` | ✅ | 节点描述 | — |
| ↳ 图片 | `item.image` | ✅ | 节点图片 | **200×200px** |
| 列表标题 | `listTitle` | ✅ | 案例列表上方标题 | — |
| 列表描述 | `listDescription` | ✅ | 标题下方 | — |
| Sidebar 标题 | `sidebarTitle` | ✅ | 右侧咨询卡标题 | — |
| Sidebar 描述 | `sidebarDescription` | ✅ | 卡片描述 | — |
| Sidebar 按钮 | `sidebarPrimaryButtonText/Link` | ✅ | 卡片按钮 | — |
| Sidebar 电话 | `sidebarPhone` | ✅ | 电话号码 | — |
| Sidebar 热门链接 | `sidebarHotLinks[]` | ✅ | 链接列表 | — |
| Sidebar 相关链接 | `sidebarRelatedLinks[]` | ✅ | 链接列表 | — |
| 最终 CTA | 同三代试管结构 | ✅ | 底部深蓝区块 | 背景图 **2400×800px** |

---

### 2.10 其他固定页面

| 页面 | 前台地址 | 主要图片字段 | 图片要求 | 说明 |
|------|---------|------------|---------|------|
| 关于准父母 | `/intended-parents` | Banner | **1920×600px** | 适合人群、常见需求、准备事项 |
| 助孕流程 | `/journey` | Banner、步骤图 | Banner **1920×600px**，步骤图 **800×600px** | 流程步骤时间轴 |
| 为什么选择我们 | `/why-us` | Banner、介绍图、Logo | Banner **1920×600px**，Logo **600×400px** | 机构介绍、优势、资源 |
| 常见问题 | `/faq` | Banner | **1920×600px** | FAQ 列表（条目单独管理） |
| 踏上为人父母之旅 | `/about-tianyue` | Banner、微信二维码 | Banner **1920×600px**，二维码 **500×500px** | 电话+表单 |
| 隐私政策 | `/privacy` | Banner | **1920×600px** | 富文本正文 |

---

## 三、新闻资讯

### 3.1 文章管理

> 路径：左侧菜单 → **新闻资讯 → 全部文章**
> 前台地址：`/news`（列表）和 `/news/[slug]`（详情）

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `title` | ✅ | 列表卡片标题、详情页 H1 | — |
| Slug | `slug` | ✅ | URL 路径 `/news/[slug]` | — |
| 分类 | `category` | ✅ | 列表筛选按钮、文章标签 | — |
| 封面图片 | `coverImage` | ✅ | 列表卡片左侧缩略图、详情页顶部封面 | **1200×800px** JPG/WebP（3:2） |
| 文章 Banner | `banner` | ✅ | 详情页顶部全宽 Banner（优先于默认） | 桌面 **1920×600px**，移动 **750×500px** |
| 摘要 | `excerpt` | ✅ | 列表卡片描述、SEO 描述回退 | — |
| 正文 | `content` | ✅ | 详情页正文区域 | 富文本，支持标题/列表/图片/链接 |
| 发布时间 | `publishedAt` | ✅ | 列表排序、详情页日期 | — |
| 置顶 | `isPinned` | ✅ | 列表顶部优先显示，卡片有蓝色边框 | — |
| 推荐 | `isFeatured` | ✅ | 首页"新闻推荐"区块 | — |
| SEO | `seo` | ✅ | 详情页 SEO | OG 图 **1200×630px** |

### 3.2 新闻分类

> 路径：**新闻资讯 → 文章分类**

| 后台字段 | 字段名 | 是否显示 | 前台位置 |
|---------|--------|---------|---------|
| 名称 | `name` | ✅ | 列表筛选按钮、文章标签 |
| Slug | `slug` | ✅ | URL 标识 |
| 排序 | `sortOrder` | ✅ | 筛选按钮显示顺序 |

---

## 四、成功案例

### 4.1 案例文章管理

> 路径：左侧菜单 → **成功案例 → 全部案例**
> 前台地址：`/success-cases`（列表）和 `/success-cases/[slug]`（详情）

| 后台字段 | 字段名 | 是否显示 | 前台位置 | 图片要求 |
|---------|--------|---------|---------|---------|
| 标题 | `title` | ✅ | 列表卡片标题、详情页 H1 | — |
| Slug | `slug` | ✅ | URL 路径 | — |
| 摘要 | `excerpt` | ✅ | 列表卡片描述 | — |
| 封面图片 | `coverImage` | ✅ | 列表卡片封面、详情页封面 | **1200×800px** |
| 客户情况 | `clientProfile` | ✅ | 卡片标签 | — |
| 服务类型 | `serviceType` | ✅ | 卡片标签 | — |
| 结果概述 | `resultSummary` | ✅ | 详情页结果说明 | — |
| 正文 | `content` | ✅ | 详情页正文 | 富文本 |
| 发布时间 | `publishedAt` | ✅ | 排序依据 | — |
| 推荐 | `isFeatured` | ✅ | Sidebar 推荐 | — |
| 排序 | `sortOrder` | ✅ | 数字越小越靠前 | — |
| 标签 | `tags` | ✅ | 卡片标签 | — |

---

## 五、常见问题

### 5.1 问题管理

> 路径：左侧菜单 → **常见问题 → 全部问题**

| 后台字段 | 字段名 | 是否显示 | 前台位置 |
|---------|--------|---------|---------|
| 问题 | `question` | ✅ | FAQ 折叠标题、首页精选 FAQ |
| 回答 | `answer` | ✅ | FAQ 折叠内容、JSON-LD 结构化数据 |
| 分类 | `category` | ✅ | FAQ 列表筛选按钮 |
| 排序 | `sortOrder` | ✅ | 显示顺序 |
| 推荐 | `isFeatured` | ✅ | 首页"常见问题精选" |

---

## 六、咨询记录

> 路径：左侧菜单 → **咨询记录**

此为后台管理区域，**不出现在前台**。记录由用户提交表单后自动创建。

| 后台字段 | 说明 |
|---------|------|
| 姓名 | 用户填写 |
| 手机号码 | 用户填写 |
| 微信号 | 选填 |
| 所在城市 | 选填 |
| 咨询需求 | 用户描述 |
| 方便联系时间 | 随时/上午/下午/晚上 |
| 处理状态 | 待跟进（默认）/ 跟进中 / 已完成 / 无效 |
| 提交时间 | 自动记录 |

---

## 七、全站图片字段速查表

### 按页面分类

#### 站点设置（所有页面共享）

| 字段名 | 前台位置 | 建议尺寸 | 格式 | 未上传时 |
|--------|---------|---------|------|---------|
| `logo` | 所有页面 Header 左上角 | 400×80px | PNG 透明底 | 显示"网站名称"文字 |
| `defaultShareImage` | 社交分享默认封面 | 1200×630px | JPG | 无分享图 |
| `defaultSeo.ogImage` | SEO OG 图片回退 | 1200×630px | JPG | 无 OG 图 |
| `defaultBanner.desktopImage` | 旧页面默认 Banner（桌面） | 1920×600px | JPG/WebP | 显示纯色渐变 |
| `defaultBanner.mobileImage` | 旧页面默认 Banner（移动） | 750×500px | JPG/WebP | 同上 |
| `wechatQrCode` | 移动端微信弹窗 | 500×500px | PNG 方形 | 不显示弹窗 |
| `wechatPublicQrCode` | 桌面端右侧悬浮浮层 | 500×500px | PNG 方形 | 不显示浮层 |
| `footerWechatQrCode` | 所有页面页脚二维码 | 500×500px | PNG 方形 | 页脚不显示二维码 |

#### 首页

| 字段名 | 前台位置 | 建议尺寸 | 格式 |
|--------|---------|---------|------|
| `hero.desktopImage` | 首屏全宽背景（桌面） | 2400×1200px | JPG/WebP |
| `hero.mobileImage` | 首屏全宽背景（移动） | 900×1200px | JPG/WebP |
| `advantagesMainImage` | 核心优势左侧大图 | 1200×900px | JPG/WebP |
| `advantages[].image` | 优势卡片小图 | 400×300px | JPG/WebP |
| `journeyMainImage` | 助孕流程左侧大图 | 1200×900px | JPG/WebP |
| `statsBackgroundImage` | 数据区深色背景 | 2400×1200px | JPG/WebP |

#### 三代试管婴儿

| 字段名 | 前台位置 | 建议尺寸 |
|--------|---------|---------|
| `heroImage` | Hero 配图 | 1200×900px |
| `introImage` | 科普模块配图 | 1200×800px |
| `whyChooseImage` | 为什么选择我们配图 | 1200×900px |
| `serviceItems[].image` | 服务卡片封面 | 800×600px |
| `hospitalItems[].image` | 医院/资源 Logo | 600×400px |
| `expertItems[].avatar` | 专家头像 | 400×400px |
| `processSteps[].image` | 流程步骤配图 | 800×600px |
| `caseItems[].image` | 案例卡片封面 | 800×600px |
| `testimonialItems[].avatar` | 评价头像 | 200×200px |
| `processImage` | 流程区块配图 | 1200×800px |
| `testimonialsImage` | 评价区块场景图 | 1200×800px |
| `finalCtaBackgroundImage` | 底部 CTA 背景 | 2400×800px |

#### 冻卵/冻精、第三方辅助生殖、私人订制（共用结构）

| 字段名 | 前台位置 | 建议尺寸 |
|--------|---------|---------|
| `heroImage` | Hero 背景图 | 2400×1200px |
| `contentBlocks[].image` | 正文模块配图 | 1200×900px |
| `contentBlocks[].items[].image` | 子项配图 | 400×300px |
| `doctorAvatar` | 顾问头像 | 400×400px |
| `caseItems[].image` | 案例卡片封面 | 800×600px |
| `finalCtaBackgroundImage` | 底部 CTA 背景 | 2400×800px |

#### 试管服务区域

| 字段名 | 前台位置 | 建议尺寸 |
|--------|---------|---------|
| `heroImage` | Hero 配图 | 2400×1200px |
| `serviceRegions[].image` | 地区卡片封面 | 800×600px |
| `conversionImage` | 转化模块配图 | 1200×800px |
| `conversionBackgroundImage` | 转化模块背景 | 2400×800px |
| `appointmentBackgroundImage` | 预约模块背景 | 2400×800px |

#### 医疗服务

| 字段名 | 前台位置 | 建议尺寸 |
|--------|---------|---------|
| `heroImage` | Hero 背景图 | 2400×1200px |
| `timelineItems[].image` | 时间轴节点图标 | 200×200px |
| `introImage` | 页面导语配图 | 1200×600px |
| `serviceSections[].image` | 核心服务模块配图 | 800×600px |
| `advantagesImage` | 优势 Banner 背景 | 2400×600px |
| `sidebarResourceImage` | Sidebar 资源卡片 | 600×400px |
| `sidebarFeaturedCaseImage` | Sidebar 案例卡片 | 600×400px |
| `brandSectionBackgroundImage` | 品牌沉淀区背景 | 2400×800px |
| `consultationBackgroundImage` | 在线咨询区背景 | 2400×800px |

#### 新闻资讯页面 / 成功案例页面

| 字段名 | 前台位置 | 建议尺寸 |
|--------|---------|---------|
| `heroImage` | 列表页 Hero 背景 | 2400×1200px |
| `timelineItems[].image` | 时间轴节点 | 200×200px |
| `sidebarResourceImage` | Sidebar 资源卡片 | 600×400px |
| `sidebarFeaturedCaseImage` | Sidebar 案例卡片 | 600×400px |
| `brandSectionBackgroundImage` | 品牌沉淀区背景 | 2400×800px |
| `consultationBackgroundImage` | 咨询区背景 | 2400×800px |
| `finalCtaBackgroundImage` | 最终 CTA 背景 | 2400×800px |

#### 新闻/案例文章

| 字段名 | 前台位置 | 建议尺寸 |
|--------|---------|---------|
| `coverImage`（新闻） | 列表卡片缩略图 + 详情页封面 | 1200×800px |
| `banner`（新闻） | 详情页顶部 Banner | 桌面 1920×600px，移动 750×500px |
| `coverImage`（案例） | 列表卡片 + 详情页封面 | 1200×800px |

#### 旧版页面 Banner

| 页面 | 字段名 | 建议尺寸 |
|------|--------|---------|
| 关于准父母 | `banners[].desktopImage` | 1920×600px |
| 助孕流程 | `banners[].desktopImage` | 1920×600px |
| 为什么选择我们 | `banners[].desktopImage` | 1920×600px |
| 常见问题 | `banners[].desktopImage` | 1920×600px |
| 踏上为人父母之旅 | `banners[].desktopImage` | 1920×600px |
| 隐私政策 | `banners[].desktopImage` | 1920×600px |

> 所有图片都需要填写 Alt 文本（替代文字），用于无障碍访问和 SEO。

---

## 八、SEO 回退逻辑

每个页面的 SEO 按以下顺序回退：

```
页面 SEO 字段 → 页面标题/描述字段 → 站点设置默认 SEO → 代码默认值
```

---

## 九、常见操作示例

### 如何修改首页 Hero 标题？

1. 左侧菜单 → 固定页面 → 首页
2. 展开「专业首屏」
3. 修改「主标题」字段
4. 点击右上角「发布」

### 如何添加一篇新闻？

1. 左侧菜单 → 新闻资讯 → 全部文章
2. 点击右上角「创建」
3. 填写标题、Slug（点右侧生成按钮）、分类、封面图（1200×800px）、摘要、正文、发布时间
4. 如需在首页显示，勾选「推荐」
5. 点击「发布」

### 如何更换页脚二维码？

1. 左侧菜单 → 站点设置
2. 展开「联系方式」
3. 上传「页脚微信二维码」（500×500px 方形 PNG）
4. 点击「发布」

### 如何给试管服务区域添加新地区？

1. 左侧菜单 → 固定页面 → 试管服务区域
2. 找到「服务区域（含地图标记）」数组
3. 点击「添加元素」
4. 填写地区名称、简介、上传图片（800×600px）
5. 填写经度和纬度（如上海：121.4737, 31.2304）
6. 点击「发布」

---

> 💡 **提示**：所有修改发布后，网站会在 60 秒内自动更新（ISR 增量静态再生）。如果需要立即看到效果，可以刷新页面。
