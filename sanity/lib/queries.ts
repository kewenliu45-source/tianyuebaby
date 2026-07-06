/**
 * Sanity GROQ 查询集合
 *
 * 所有查询统一管理，供 fetchers.ts 调用。
 * 查询中展开图片字段以满足 image builder 使用。
 */

// ─────────────────────────────────────────────
// 图片段复用
// ─────────────────────────────────────────────

/** 展开 imageWithAlt 对象 */
const IMAGE_WITH_ALT = `{
  image{
    ...,
    asset->
  },
  alt,
  caption
}`;

/** 展开 SanityImage */
const IMAGE_ASSET = `{
  ...,
  asset->
}`;

/** 展开 SEO 对象 */
const SEO = `{
  metaTitle,
  metaDescription,
  keywords,
  ogTitle,
  ogDescription,
  ogImage${IMAGE_ASSET},
  canonicalUrl,
  noIndex
}`;

/** 展开 bannerSlide 对象 */
const BANNER_SLIDE = `{
  desktopImage${IMAGE_ASSET},
  mobileImage${IMAGE_ASSET},
  alt,
  title,
  subtitle,
  buttonText,
  buttonLink,
  isActive
}`;

/** 展开 CTA 对象 */
const CTA = `{
  title,
  description,
  buttonText,
  buttonLink
}`;

// ─────────────────────────────────────────────
// 网站基础信息
// ─────────────────────────────────────────────

/** 站点设置（单例） */
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  _type,
  siteName,
  siteNameEn,
  description,
  logo${IMAGE_WITH_ALT},
  favicon${IMAGE_ASSET},
  defaultShareImage${IMAGE_ASSET},
  phone,
  serviceHours,
  wechatQrCode${IMAGE_ASSET},
  wechatPublicQrCode${IMAGE_ASSET},
  footerWechatQrCode${IMAGE_ASSET},
  sidebarCtaText,
  mobileCtaText,
  footerDescription,
  icpNumber,
  copyrightText,
  defaultSeo${SEO},
  defaultBanner${BANNER_SLIDE},
  navLabels
}`;

/** 布局数据（Header + Footer 共需） */
export const layoutDataQuery = `{
  "siteSettings": ${siteSettingsQuery}
}`;

// ─────────────────────────────────────────────
// 首页
// ─────────────────────────────────────────────

/** 首页数据 */
export const homePageQuery = `*[_type == "homePage"][0]{
  _id,
  _type,
  banners[]${BANNER_SLIDE},
  heroImage${IMAGE_WITH_ALT},
  hero{
    isEnabled,
    desktopImage${IMAGE_WITH_ALT},
    mobileImage${IMAGE_WITH_ALT},
    overlayStrength,
    eyebrow,
    title,
    description,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    badges,
    stats[]{value,label}
  },
  expertiseSection{
    isEnabled,
    eyebrow,
    title,
    description,
    capabilities[]{title,description},
    buttonText,
    buttonLink,
    mainImage${IMAGE_WITH_ALT},
    secondaryImage${IMAGE_WITH_ALT},
    tertiaryImage${IMAGE_WITH_ALT}
  },
  servicesSection{
    isEnabled,
    title,
    description,
    items[]{
      isEnabled,
      image${IMAGE_WITH_ALT},
      title,
      audience,
      description,
      buttonText,
      buttonLink
    }
  },
  sectionVisibility{advantages,journey,stats,news,faq,cta},
  brandIntroTitle,
  brandIntroContent,
  brandIntroImage${IMAGE_WITH_ALT},
  ivfTitle,
  ivfDescription,
  ivfFeatures[]{
    title,
    description,
    icon
  },
  advantagesTitle,
  advantages[]{
    title,
    description,
    icon,
    color
  },
  journeyTitle,
  journeySteps[]{
    title,
    description,
    stepNumber
  },
  statsTitle,
  stats[]{
    value,
    label,
    description
  },
  newsTitle,
  featuredNewsCount,
  featuredNews[]->{
    _id,
    _type,
    title,
    slug,
    excerpt,
    coverImage${IMAGE_WITH_ALT},
    publishedAt
  },
  faqTitle,
  featuredFaqCount,
  cta${CTA},
  seo${SEO}
}`;

/** 首页推荐新闻 */
export const featuredNewsQuery = `*[_type == "newsArticle" && isFeatured == true] | order(publishedAt desc)[0...7]{
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  category->{
    _id,
    _type,
    name,
    slug
  },
  publishedAt
}`;

/** 首页精选 FAQ */
export const featuredFaqsQuery = `*[_type == "faqItem" && isFeatured == true] | order(sortOrder asc)[0...5]{
  _id,
  _type,
  question,
  answer,
  category->{
    _id,
    _type,
    name,
    slug
  }
}`;

/** 首页聚合查询 */
export const homePageDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "homePage": ${homePageQuery},
  "newsArticles": ${featuredNewsQuery},
  "faqItems": ${featuredFaqsQuery}
}`;

// ─────────────────────────────────────────────
// 关于准父母
// ─────────────────────────────────────────────

/** 关于准父母页面数据 */
export const intendedParentsQuery = `*[_type == "intendedParents"][0]{
  _id,
  _type,
  banners[]${BANNER_SLIDE},
  suitableForTitle,
  suitableForItems[]{
    title,
    description,
    icon
  },
  needsTitle,
  needsItems[]{
    title,
    description
  },
  preparationTitle,
  preparationItems[]{
    title,
    description,
    icon
  },
  boundariesTitle,
  boundariesContent,
  cta${CTA},
  seo${SEO}
}`;

/** 关于准父母聚合查询 */
export const intendedParentsPageQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "intendedParents": ${intendedParentsQuery}
}`;

// ─────────────────────────────────────────────
// 助孕流程
// ─────────────────────────────────────────────

/** 助孕流程页面数据 */
export const journeyQuery = `*[_type == "journey"][0]{
  _id,
  _type,
  banners[]${BANNER_SLIDE},
  stepsTitle,
  steps[]{
    title,
    description,
    icon,
    stepNumber,
    details
  },
  notesTitle,
  notes[]{
    title,
    description
  },
  seo${SEO}
}`;

/** 助孕流程聚合查询 */
export const journeyPageQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "journey": ${journeyQuery}
}`;

// ─────────────────────────────────────────────
// 新闻资讯
// ─────────────────────────────────────────────

/** 新闻文章列表 */
export const newsArticlesQuery = `*[_type == "newsArticle"] | order(isPinned desc, publishedAt desc){
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  category->{
    _id,
    _type,
    name,
    slug
  },
  publishedAt,
  isPinned,
  isFeatured
}`;

/** 置顶新闻 */
export const pinnedNewsQuery = `*[_type == "newsArticle" && isPinned == true] | order(publishedAt desc){
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  category->{
    _id,
    _type,
    name,
    slug
  },
  publishedAt,
  isPinned
}`;

/** 新闻分类列表 */
export const newsCategoriesQuery = `*[_type == "newsCategory"] | order(sortOrder asc){
  _id,
  _type,
  name,
  slug,
  sortOrder
}`;

/** 新闻资讯页面配置 */
export const newsPageQuery = `*[_type == "newsPage"][0]{
  _id,
  _type,
  pageTitle,
  pageDescription,
  seo${SEO},
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage${IMAGE_WITH_ALT},
  heroPrimaryButtonText,
  heroPrimaryButtonLink,
  timelineTitle,
  timelineDescription,
  timelineItems[]{
    year,
    title,
    description,
    image${IMAGE_WITH_ALT}
  },
  breadcrumbCurrentLabel,
  listTitle,
  listDescription,
  sidebarConsultTitle,
  sidebarConsultDescription,
  sidebarConsultButtonText,
  sidebarConsultButtonLink,
  sidebarResourceTitle,
  sidebarResourceDescription,
  sidebarResourceImage${IMAGE_WITH_ALT},
  sidebarExpertsTitle,
  sidebarExpertsDescription,
  sidebarExpertItems[]{
    title,
    description,
    icon
  },
  sidebarFeaturedTitle,
  sidebarServiceTitle,
  sidebarServiceItems[]{
    title,
    href,
    icon
  },
  brandSectionTitle,
  brandSectionSubtitle,
  brandSectionDescription,
  brandSectionBackgroundImage${IMAGE_WITH_ALT},
  consultationTitle,
  consultationDescription,
  consultationBackgroundImage${IMAGE_WITH_ALT}
}`;

/** 新闻列表页聚合查询 */
export const newsListPageQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "newsPage": ${newsPageQuery},
  "newsArticles": ${newsArticlesQuery},
  "categories": ${newsCategoriesQuery},
  "pinnedArticles": ${pinnedNewsQuery}
}`;

/** 新闻详情（按 slug） */
export const newsArticleBySlugQuery = `*[_type == "newsArticle" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  banner${BANNER_SLIDE},
  category->{
    _id,
    _type,
    name,
    slug
  },
  content[]{
    ...,
    _type == "imageWithAlt"${IMAGE_WITH_ALT}
  },
  publishedAt,
  isPinned,
  isFeatured,
  seo${SEO}
}`;

/** 相关新闻（同分类，排除当前文章） */
export const relatedNewsQuery = `*[_type == "newsArticle" && slug.current != $slug && category._ref == $categoryId] | order(publishedAt desc)[0...3]{
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  publishedAt
}`;

/** 所有新闻 slug（用于 generateStaticParams） */
export const newsSlugsQuery = `*[_type == "newsArticle" && defined(slug.current)][]{
  "slug": slug.current
}`;

// ─────────────────────────────────────────────
// 为什么选择我们
// ─────────────────────────────────────────────

/** 为什么选择我们页面数据 */
export const whyUsQuery = `*[_type == "whyUs"][0]{
  _id,
  _type,
  banners[]${BANNER_SLIDE},
  introTitle,
  introContent,
  introImage${IMAGE_WITH_ALT},
  advantagesTitle,
  advantages[]{
    title,
    description,
    icon
  },
  resourcesTitle,
  resources[]{
    name,
    description,
    logo${IMAGE_ASSET}
  },
  standardsTitle,
  standards[]{
    title,
    description
  },
  statsTitle,
  stats[]{
    value,
    label
  },
  cta${CTA},
  seo${SEO}
}`;

/** 为什么选择我们聚合查询 */
export const whyUsPageQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "whyUs": ${whyUsQuery}
}`;

// ─────────────────────────────────────────────
// 常见问题
// ─────────────────────────────────────────────

/** 常见问题页面数据 */
export const faqPageQuery = `*[_type == "faqPage"][0]{
  _id,
  _type,
  banners[]${BANNER_SLIDE},
  pageTitle,
  pageDescription,
  cta${CTA},
  seo${SEO}
}`;

/** FAQ 列表 */
export const faqItemsQuery = `*[_type == "faqItem"] | order(sortOrder asc){
  _id,
  _type,
  question,
  answer,
  category->{
    _id,
    _type,
    name,
    slug
  },
  sortOrder,
  isFeatured
}`;

/** FAQ 分类列表 */
export const faqCategoriesQuery = `*[_type == "faqCategory"] | order(sortOrder asc){
  _id,
  _type,
  name,
  slug,
  sortOrder
}`;

/** 常见问题聚合查询 */
export const faqPageDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "faqPage": ${faqPageQuery},
  "faqItems": ${faqItemsQuery},
  "categories": ${faqCategoriesQuery}
}`;

// ─────────────────────────────────────────────
// 踏上为人父母之旅
// ─────────────────────────────────────────────

/** 踏上为人父母之旅页面数据 */
export const startJourneyQuery = `*[_type == "startJourney"][0]{
  _id,
  _type,
  banners[]${BANNER_SLIDE},
  phone,
  wechatQrCode${IMAGE_ASSET},
  serviceHours,
  consultationNote,
  seo${SEO}
}`;

/** 踏上为人父母之旅聚合查询 */
export const startJourneyPageQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "startJourney": ${startJourneyQuery}
}`;

// ─────────────────────────────────────────────
// 走进天悦宝贝页面
// ─────────────────────────────────────────────

/** 走进天悦宝贝页面数据 */
export const aboutTianyuePageQuery = `*[_type == "aboutTianyuePage"][0]{
  _id,
  _type,
  pageTitle,
  pageDescription,
  seo${SEO},
  banners[]${BANNER_SLIDE},
  brandTitle,
  brandDescription,
  brandImage${IMAGE_WITH_ALT},
  contactTitle,
  phone,
  wechatQrCode${IMAGE_ASSET},
  serviceHours,
  consultationNote
}`;

/** 走进天悦宝贝聚合查询 */
export const aboutTianyuePageDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "aboutTianyuePage": ${aboutTianyuePageQuery}
}`;

// ─────────────────────────────────────────────
// 三代试管婴儿页面
// ─────────────────────────────────────────────

/** 三代试管婴儿页面数据 */
export const thirdGenerationIvfPageQuery = `*[_type == "thirdGenerationIvfPage"][0]{
  _id,
  _type,
  pageTitle,
  pageDescription,
  seo${SEO},
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage${IMAGE_WITH_ALT},
  heroPrimaryButtonText,
  heroPrimaryButtonLink,
  heroSecondaryButtonText,
  heroSecondaryButtonLink,
  heroBadges,
  heroFormTitle,
  heroFormFields,
  heroFormButtonText,
  introTitle,
  introSubtitle,
  introBody,
  introImage${IMAGE_WITH_ALT},
  introImageCaption,
  introPoints,
  trustItems[]{
    value,
    label,
    description
  },
  whyChooseTitle,
  whyChooseDescription,
  whyChooseImage${IMAGE_WITH_ALT},
  whyChooseItems[]{
    title,
    description,
    icon
  },
  servicesTitle,
  servicesDescription,
  serviceItems[]{
    title,
    description,
    image${IMAGE_WITH_ALT},
    points
  },
  hospitalsTitle,
  hospitalsDescription,
  hospitalItems[]{
    name,
    location,
    description,
    image${IMAGE_WITH_ALT},
    tags
  },
  expertsTitle,
  expertsDescription,
  expertItems[]{
    name,
    title,
    description,
    avatar${IMAGE_WITH_ALT},
    specialties
  },
  processTitle,
  processDescription,
  processImage${IMAGE_WITH_ALT},
  processSteps[]{
    stepNumber,
    title,
    description,
    duration,
    image${IMAGE_WITH_ALT}
  },
  casesTitle,
  casesDescription,
  caseItems[]{
    title,
    profile,
    summary,
    resultDescription,
    image${IMAGE_WITH_ALT}
  },
  testimonialsTitle,
  testimonialsDescription,
  testimonialsImage${IMAGE_WITH_ALT},
  testimonialItems[]{
    displayName,
    profile,
    content,
    rating,
    avatar${IMAGE_WITH_ALT}
  },
  faqTitle,
  faqDescription,
  faqItems[]{
    question,
    answer
  },
  finalCtaTitle,
  finalCtaDescription,
  finalCtaPrimaryButtonText,
  finalCtaPrimaryButtonLink,
  finalCtaSecondaryButtonText,
  finalCtaSecondaryButtonLink,
  finalCtaBackgroundImage${IMAGE_WITH_ALT}
}`;

/** 三代试管婴儿聚合查询 */
export const thirdGenerationIvfPageDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "thirdGenerationIvfPage": ${thirdGenerationIvfPageQuery}
}`;

// ─────────────────────────────────────────────
// 试管服务区域页面
// ─────────────────────────────────────────────

/** 试管服务区域页面数据 */
export const ivfServicesPageQuery = `*[_type == "ivfServicesPage"][0]{
  _id,
  _type,
  pageTitle,
  pageDescription,
  seo${SEO},
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage${IMAGE_WITH_ALT},
  heroPrimaryButtonText,
  heroPrimaryButtonLink,
  heroSecondaryButtonText,
  heroSecondaryButtonLink,
  heroBadges,
  regionTrustTitle,
  regionTrustItems[]{
    value,
    label,
    description
  },
  serviceAreasTitle,
  serviceAreasDescription,
  serviceAreaItems[]{
    name,
    subtitle,
    description,
    serviceHighlights,
    commonNeeds,
    image${IMAGE_WITH_ALT},
    ctaText,
    ctaLink
  },
  serviceRegions[]{
    name,
    subtitle,
    description,
    image${IMAGE_WITH_ALT},
    serviceHighlights,
    ctaText,
    ctaLink,
    mapLabel,
    lng,
    lat
  },
  regionalServiceTitle,
  regionalServiceDescription,
  regionalServiceSteps[]{
    title,
    description,
    icon
  },
  experienceTitle,
  experienceDescription,
  experienceItems[]{
    title,
    description,
    icon
  },
  remoteProcessTitle,
  remoteProcessDescription,
  remoteProcessSteps[]{
    stepNumber,
    title,
    description,
    duration
  },
  needsTitle,
  needsDescription,
  needsItems[]{
    title,
    description,
    icon
  },
  conversionTitle,
  conversionDescription,
  conversionFields,
  conversionButtonText,
  conversionImage${IMAGE_WITH_ALT},
  conversionBackgroundImage${IMAGE_WITH_ALT},
  regionalCasesTitle,
  regionalCasesDescription,
  regionalCaseItems[]{
    title,
    city,
    profile,
    challenge,
    serviceSupport,
    resultDescription,
    image${IMAGE_WITH_ALT},
    buttonText,
    buttonLink
  },
  faqTitle,
  faqDescription,
  faqItems[]{
    question,
    answer
  },
  appointmentTitle,
  appointmentDescription,
  appointmentFields,
  appointmentButtonText,
  appointmentBackgroundImage${IMAGE_WITH_ALT}
}`;

/** 试管服务区域聚合查询 */
export const ivfServicesPageDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "ivfServicesPage": ${ivfServicesPageQuery}
}`;

// ─────────────────────────────────────────────
// 冻卵/冻精页面
// ─────────────────────────────────────────────

/** 冻卵/冻精页面数据 */
export const eggSpermFreezingPageQuery = `*[_type == "eggSpermFreezingPage"][0]{
  _id,
  _type,
  pageTitle,
  pageDescription,
  seo${SEO},
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage${IMAGE_WITH_ALT},
  publishedAt,
  readingTime,
  authorName,
  authorTitle,
  heroPrimaryButtonText,
  heroPrimaryButtonLink,
  heroSecondaryButtonText,
  heroSecondaryButtonLink,
  tocItems[]{
    title,
    anchor
  },
  contentBlocks[]{
    blockType,
    anchor,
    title,
    subtitle,
    body,
    image${IMAGE_WITH_ALT},
    imagePosition,
    caption,
    cardTone,
    buttonText,
    buttonLink,
    items[]{
      title,
      description,
      value,
      icon,
      image${IMAGE_WITH_ALT}
    }
  },
  doctorName,
  doctorTitle,
  doctorExperience,
  doctorSpecialties,
  doctorAvatar${IMAGE_WITH_ALT},
  doctorButtonText,
  doctorButtonLink,
  caseItems[]{
    title,
    profile,
    story,
    resultDescription,
    testimonial,
    image${IMAGE_WITH_ALT}
  },
  faqTitle,
  faqDescription,
  faqItems[]{
    question,
    answer
  },
  sidebarTitle,
  sidebarDescription,
  sidebarPrimaryButtonText,
  sidebarPrimaryButtonLink,
  sidebarSecondaryButtonText,
  sidebarSecondaryButtonLink,
  sidebarPhoneLabel,
  sidebarPhone,
  sidebarWechatText,
  sidebarWhatsappText,
  sidebarHotArticles[]{
    title,
    href
  },
  sidebarRelatedLinks[]{
    title,
    href
  },
  sidebarCountries[]{
    title,
    href
  },
  finalCtaTitle,
  finalCtaDescription,
  finalCtaPrimaryButtonText,
  finalCtaPrimaryButtonLink,
  finalCtaSecondaryButtonText,
  finalCtaSecondaryButtonLink,
  finalCtaBackgroundImage${IMAGE_WITH_ALT}
}`;

/** 冻卵/冻精聚合查询 */
export const eggSpermFreezingPageDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "eggSpermFreezingPage": ${eggSpermFreezingPageQuery}
}`;

// ─────────────────────────────────────────────
// 第三方辅助生殖页面
// ─────────────────────────────────────────────

/** 第三方辅助生殖页面数据 */
export const thirdPartyAssistedReproductionPageQuery = `*[_type == "thirdPartyAssistedReproductionPage"][0]{
  _id,
  _type,
  pageTitle,
  pageDescription,
  seo${SEO},
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage${IMAGE_WITH_ALT},
  publishedAt,
  readingTime,
  authorName,
  authorTitle,
  heroPrimaryButtonText,
  heroPrimaryButtonLink,
  heroSecondaryButtonText,
  heroSecondaryButtonLink,
  tocItems[]{
    title,
    anchor
  },
  contentBlocks[]{
    blockType,
    anchor,
    title,
    subtitle,
    body,
    image${IMAGE_WITH_ALT},
    imagePosition,
    caption,
    cardTone,
    buttonText,
    buttonLink,
    items[]{
      title,
      description,
      value,
      icon,
      image${IMAGE_WITH_ALT}
    }
  },
  doctorName,
  doctorTitle,
  doctorExperience,
  doctorSpecialties,
  doctorAvatar${IMAGE_WITH_ALT},
  doctorButtonText,
  doctorButtonLink,
  caseItems[]{
    title,
    profile,
    story,
    resultDescription,
    testimonial,
    image${IMAGE_WITH_ALT}
  },
  faqTitle,
  faqDescription,
  faqItems[]{
    question,
    answer
  },
  sidebarTitle,
  sidebarDescription,
  sidebarPrimaryButtonText,
  sidebarPrimaryButtonLink,
  sidebarSecondaryButtonText,
  sidebarSecondaryButtonLink,
  sidebarPhoneLabel,
  sidebarPhone,
  sidebarWechatText,
  sidebarWhatsappText,
  sidebarHotArticles[]{
    title,
    href
  },
  sidebarRelatedLinks[]{
    title,
    href
  },
  sidebarCountries[]{
    title,
    href
  },
  finalCtaTitle,
  finalCtaDescription,
  finalCtaPrimaryButtonText,
  finalCtaPrimaryButtonLink,
  finalCtaSecondaryButtonText,
  finalCtaSecondaryButtonLink,
  finalCtaBackgroundImage${IMAGE_WITH_ALT}
}`;

/** 第三方辅助生殖聚合查询 */
export const thirdPartyAssistedReproductionPageDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "thirdPartyAssistedReproductionPage": ${thirdPartyAssistedReproductionPageQuery}
}`;

// ─────────────────────────────────────────────
// 私人订制页面
// ─────────────────────────────────────────────

/** 私人订制页面数据 */
export const privateCustomizationPageQuery = `*[_type == "privateCustomizationPage"][0]{
  _id,
  _type,
  pageTitle,
  pageDescription,
  seo${SEO},
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage${IMAGE_WITH_ALT},
  publishedAt,
  readingTime,
  authorName,
  authorTitle,
  heroPrimaryButtonText,
  heroPrimaryButtonLink,
  heroSecondaryButtonText,
  heroSecondaryButtonLink,
  tocItems[]{
    title,
    anchor
  },
  contentBlocks[]{
    blockType,
    anchor,
    title,
    subtitle,
    body,
    image${IMAGE_WITH_ALT},
    imagePosition,
    caption,
    cardTone,
    buttonText,
    buttonLink,
    items[]{
      title,
      description,
      value,
      icon,
      image${IMAGE_WITH_ALT}
    }
  },
  doctorName,
  doctorTitle,
  doctorExperience,
  doctorSpecialties,
  doctorAvatar${IMAGE_WITH_ALT},
  doctorButtonText,
  doctorButtonLink,
  caseItems[]{
    title,
    profile,
    story,
    resultDescription,
    testimonial,
    image${IMAGE_WITH_ALT}
  },
  faqTitle,
  faqDescription,
  faqItems[]{
    question,
    answer
  },
  sidebarTitle,
  sidebarDescription,
  sidebarPrimaryButtonText,
  sidebarPrimaryButtonLink,
  sidebarSecondaryButtonText,
  sidebarSecondaryButtonLink,
  sidebarPhoneLabel,
  sidebarPhone,
  sidebarWechatText,
  sidebarWhatsappText,
  sidebarHotArticles[]{
    title,
    href
  },
  sidebarRelatedLinks[]{
    title,
    href
  },
  sidebarCountries[]{
    title,
    href
  },
  finalCtaTitle,
  finalCtaDescription,
  finalCtaPrimaryButtonText,
  finalCtaPrimaryButtonLink,
  finalCtaSecondaryButtonText,
  finalCtaSecondaryButtonLink,
  finalCtaBackgroundImage${IMAGE_WITH_ALT}
}`;

/** 私人订制聚合查询 */
export const privateCustomizationPageDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "privateCustomizationPage": ${privateCustomizationPageQuery}
}`;

// ─────────────────────────────────────────────
// 隐私政策
// ─────────────────────────────────────────────

/** 隐私政策页面数据 */
export const privacyPageQuery = `*[_type == "privacyPage"][0]{
  _id,
  _type,
  banners[]${BANNER_SLIDE},
  pageTitle,
  content[]{
    ...,
    _type == "imageWithAlt"${IMAGE_WITH_ALT}
  },
  seo${SEO}
}`;

/** 隐私政策聚合查询 */
export const privacyPageDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "privacyPage": ${privacyPageQuery}
}`;

// ─────────────────────────────────────────────
// 成功案例页面
// ─────────────────────────────────────────────

/** 成功案例页面配置 */
export const successCasesPageQuery = `*[_type == "successCasesPage"][0]{
  _id,
  _type,
  pageTitle,
  pageDescription,
  seo${SEO},
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage${IMAGE_WITH_ALT},
  heroPrimaryButtonText,
  heroPrimaryButtonLink,
  timelineTitle,
  timelineItems[]{
    year,
    title,
    description,
    image${IMAGE_WITH_ALT}
  },
  listTitle,
  listDescription,
  sidebarTitle,
  sidebarDescription,
  sidebarPrimaryButtonText,
  sidebarPrimaryButtonLink,
  sidebarPhone,
  sidebarHotLinks[]{
    title,
    href
  },
  sidebarRelatedLinks[]{
    title,
    href
  },
  finalCtaTitle,
  finalCtaDescription,
  finalCtaPrimaryButtonText,
  finalCtaPrimaryButtonLink,
  finalCtaBackgroundImage${IMAGE_WITH_ALT}
}`;

/** 全部成功案例列表 */
export const successCasesListQuery = `*[_type == "successCase"] | order(sortOrder asc, publishedAt desc){
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  clientProfile,
  serviceType,
  resultSummary,
  publishedAt,
  isFeatured,
  sortOrder,
  tags
}`;

/** 推荐成功案例 */
export const featuredSuccessCasesQuery = `*[_type == "successCase" && isFeatured == true] | order(sortOrder asc, publishedAt desc){
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  clientProfile,
  serviceType,
  resultSummary,
  publishedAt,
  tags
}`;

/** 成功案例详情（按 slug） */
export const successCaseBySlugQuery = `*[_type == "successCase" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  clientProfile,
  serviceType,
  resultSummary,
  content[]{
    ...,
    _type == "imageWithAlt"${IMAGE_WITH_ALT}
  },
  publishedAt,
  isFeatured,
  tags,
  seo${SEO}
}`;

/** 相关成功案例（同服务类型，排除当前案例） */
export const relatedSuccessCasesQuery = `*[_type == "successCase" && slug.current != $slug && serviceType == $serviceType] | order(sortOrder asc, publishedAt desc)[0...3]{
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  clientProfile,
  serviceType,
  publishedAt
}`;

/** 所有成功案例 slug（用于 generateStaticParams） */
export const successCaseSlugsQuery = `*[_type == "successCase" && defined(slug.current)][]{
  "slug": slug.current
}`;

/** 成功案例页面聚合查询 */
export const successCasesPageDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "successCasesPage": ${successCasesPageQuery},
  "successCases": ${successCasesListQuery},
  "featuredSuccessCases": ${featuredSuccessCasesQuery}
}`;

// ─────────────────────────────────────────────
// 医疗服务页面
// ─────────────────────────────────────────────

/** 医疗服务页面配置 */
export const medicalServicesPageQuery = `*[_type == "medicalServicesPage"][0]{
  _id,
  _type,
  pageTitle,
  pageDescription,
  seo${SEO},
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage${IMAGE_WITH_ALT},
  heroPrimaryButtonText,
  heroPrimaryButtonLink,
  timelineTitle,
  timelineDescription,
  timelineItems[]{
    year,
    title,
    description,
    image${IMAGE_WITH_ALT}
  },
  breadcrumbCurrentLabel,
  introTitle,
  introDescription,
  introImage${IMAGE_WITH_ALT},
  serviceSections[]{
    sectionNumber,
    title,
    subtitle,
    body,
    image${IMAGE_WITH_ALT},
    imagePosition,
    buttonText,
    buttonLink,
    items[]{
      title,
      description,
      value,
      icon,
      image${IMAGE_WITH_ALT}
    }
  },
  advantagesTitle,
  advantagesDescription,
  advantagesImage${IMAGE_WITH_ALT},
  advantageItems[]{
    title,
    description,
    icon
  },
  relatedTitle,
  relatedItems[]{
    title,
    description,
    href
  },
  processTitle,
  processDescription,
  processSteps[]{
    title,
    description,
    icon
  },
  sidebarConsultTitle,
  sidebarConsultDescription,
  sidebarConsultButtonText,
  sidebarConsultButtonLink,
  sidebarResourceTitle,
  sidebarResourceDescription,
  sidebarResourceImage${IMAGE_WITH_ALT},
  sidebarExpertsTitle,
  sidebarExpertsDescription,
  sidebarExpertItems[]{
    title,
    description,
    icon
  },
  sidebarFeaturedCaseTitle,
  sidebarFeaturedCaseDescription,
  sidebarFeaturedCaseImage${IMAGE_WITH_ALT},
  sidebarFeaturedCaseLink,
  sidebarServiceTitle,
  sidebarServiceItems[]{
    title,
    href,
    icon
  },
  brandSectionTitle,
  brandSectionSubtitle,
  brandSectionDescription,
  brandSectionBackgroundImage${IMAGE_WITH_ALT},
  consultationTitle,
  consultationDescription,
  consultationBackgroundImage${IMAGE_WITH_ALT}
}`;

/** 医疗服务页面聚合查询 */
export const medicalServicesPageDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "medicalServicesPage": ${medicalServicesPageQuery}
}`;

// ─────────────────────────────────────────────
// 科普视频中心
// ─────────────────────────────────────────────

/** 科普视频通用字段片段 */
const SCIENCE_VIDEO_FIELDS = `{
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  category->{
    _id,
    _type,
    name,
    slug
  },
  presenter,
  duration,
  videoSource,
  externalUrl,
  videoFile{
    asset->
  },
  publishedAt,
  isFeatured,
  sortOrder
}`;

/** 视频列表 */
export const scienceVideosQuery = `*[_type == "scienceVideo"] | order(isFeatured desc, sortOrder asc, publishedAt desc)${SCIENCE_VIDEO_FIELDS}`;

/** 推荐视频 */
export const featuredVideosQuery = `*[_type == "scienceVideo" && isFeatured == true] | order(sortOrder asc, publishedAt desc)[0...6]${SCIENCE_VIDEO_FIELDS}`;

/** 视频分类列表 */
export const videoCategoriesQuery = `*[_type == "videoCategory"] | order(sortOrder asc){
  _id,
  _type,
  name,
  slug,
  sortOrder
}`;

/** 科普视频页面配置 */
export const videosPageQuery = `*[_type == "videosPage"][0]{
  _id,
  _type,
  pageTitle,
  pageDescription,
  seo${SEO},
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage${IMAGE_WITH_ALT},
  heroPrimaryButtonText,
  heroPrimaryButtonLink,
  featuredTitle,
  featuredDescription,
  listTitle,
  listDescription,
  categoryFilterEnabled,
  sidebarConsultTitle,
  sidebarConsultDescription,
  sidebarConsultButtonText,
  sidebarConsultButtonLink,
  sidebarPhone,
  sidebarHotLinks[]{
    title,
    href
  },
  sidebarRelatedLinks[]{
    title,
    href
  },
  finalCtaTitle,
  finalCtaDescription,
  finalCtaPrimaryButtonText,
  finalCtaPrimaryButtonLink,
  finalCtaSecondaryButtonText,
  finalCtaSecondaryButtonLink,
  finalCtaBackgroundImage${IMAGE_WITH_ALT},
  emptyStateText,
  playbackErrorText,
  medicalDisclaimer
}`;

/** 视频中心聚合查询 */
export const videosPageDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "videosPage": ${videosPageQuery},
  "scienceVideos": ${scienceVideosQuery},
  "categories": ${videoCategoriesQuery},
  "featuredVideos": ${featuredVideosQuery}
}`;

/** 视频详情（按 slug） */
export const scienceVideoBySlugQuery = `*[_type == "scienceVideo" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug,
  excerpt,
  content[]{
    ...,
    _type == "imageWithAlt"${IMAGE_WITH_ALT}
  },
  coverImage${IMAGE_WITH_ALT},
  category->{
    _id,
    _type,
    name,
    slug
  },
  presenter,
  duration,
  videoSource,
  externalUrl,
  videoFile{
    asset->
  },
  publishedAt,
  isFeatured,
  sortOrder,
  seo${SEO}
}`;

/** 相关视频（同分类，排除当前视频） */
export const relatedVideosQuery = `*[_type == "scienceVideo" && slug.current != $slug && category._ref == $categoryId] | order(publishedAt desc)[0...3]${SCIENCE_VIDEO_FIELDS}`;

/** 所有视频 slug（用于 generateStaticParams） */
export const videoSlugsQuery = `*[_type == "scienceVideo" && defined(slug.current)][]{
  "slug": slug.current
}`;

// ─────────────────────────────────────────────
// SEO 相关
// ─────────────────────────────────────────────

/** 所有已发布新闻（用于 sitemap） */
export const allNewsForSitemapQuery = `*[_type == "newsArticle"] | order(publishedAt desc){
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`;
