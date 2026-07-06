/**
 * Sanity CMS 数据类型定义
 *
 * 与 sanity/schemas/ 下的 Schema 一一对应。
 */

// ─────────────────────────────────────────────
// 通用基础类型
// ─────────────────────────────────────────────

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: { x: number; y: number };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface ImageWithAlt {
  image: SanityImage;
  alt: string;
  caption?: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImage;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface SanityLink {
  label: string;
  href: string;
  openInNewTab?: boolean;
}

export interface Cta {
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface Slug {
  current: string;
  _type: "slug";
}

/** Portable Text block */
export type RichTextBlock = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};

// ─────────────────────────────────────────────
// Banner 类型
// ─────────────────────────────────────────────

export interface BannerSlide {
  _type: "bannerSlide";
  desktopImage: SanityImage;
  mobileImage?: SanityImage;
  alt: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
}

// ─────────────────────────────────────────────
// 文档类型
// ─────────────────────────────────────────────

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  siteName: string;
  siteNameEn?: string;
  description?: string;
  logo?: ImageWithAlt;
  favicon?: SanityImage;
  defaultShareImage?: SanityImage;
  phone?: string;
  serviceHours?: string;
  wechatQrCode?: SanityImage;
  wechatPublicQrCode?: SanityImage;
  footerWechatQrCode?: SanityImage;
  sidebarCtaText?: string;
  mobileCtaText?: string;
  footerDescription?: string;
  icpNumber?: string;
  copyrightText?: string;
  defaultSeo?: Seo;
  defaultBanner?: BannerSlide;
  navLabels?: {
    home?: string;
    intendedParents?: string;
    journey?: string;
    news?: string;
    whyUs?: string;
    faq?: string;
    startJourney?: string;
  };
}

export interface HomePage {
  _id: string;
  _type: "homePage";
  banners?: BannerSlide[];
  heroImage?: ImageWithAlt;
  hero?: {
    isEnabled?: boolean;
    desktopImage?: ImageWithAlt;
    mobileImage?: ImageWithAlt;
    overlayStrength?: number;
    eyebrow?: string;
    title?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    badges?: string[];
    stats?: Array<{ value: string; label: string }>;
  };
  expertiseSection?: {
    isEnabled?: boolean;
    eyebrow?: string;
    title?: string;
    description?: string;
    capabilities?: Array<{ title: string; description?: string }>;
    buttonText?: string;
    buttonLink?: string;
    mainImage?: ImageWithAlt;
    secondaryImage?: ImageWithAlt;
    tertiaryImage?: ImageWithAlt;
  };
  servicesSection?: {
    isEnabled?: boolean;
    title?: string;
    description?: string;
    items?: Array<{
      isEnabled?: boolean;
      image?: ImageWithAlt;
      title: string;
      audience?: string;
      description?: string;
      buttonText?: string;
      buttonLink?: string;
    }>;
  };
  sectionVisibility?: {
    advantages?: boolean;
    journey?: boolean;
    stats?: boolean;
    news?: boolean;
    faq?: boolean;
    cta?: boolean;
  };
  brandIntroTitle?: string;
  brandIntroContent?: string;
  brandIntroImage?: ImageWithAlt;
  ivfTitle?: string;
  ivfDescription?: string;
  ivfFeatures?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
  advantagesTitle?: string;
  advantagesDescription?: string;
  advantagesMainImage?: ImageWithAlt;
  advantages?: Array<{
    title: string;
    description?: string;
    icon?: string;
    color?: "pink" | "purple" | "yellow" | "green";
    image?: ImageWithAlt;
    isEnabled?: boolean;
  }>;
  journeyTitle?: string;
  journeyDescription?: string;
  journeyMainImage?: ImageWithAlt;
  journeyImageOverlay?: string;
  journeyButtonText?: string;
  journeyButtonLink?: string;
  journeySteps?: Array<{
    title: string;
    description?: string;
    stepNumber: number;
    icon?: string;
    isEnabled?: boolean;
  }>;
  statsTitle?: string;
  statsDescription?: string;
  statsBackgroundImage?: ImageWithAlt;
  statsButtonText?: string;
  statsButtonLink?: string;
  stats?: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  newsTitle?: string;
  featuredNewsCount?: number;
  featuredNews?: NewsArticle[];
  faqTitle?: string;
  featuredFaqCount?: number;
  cta?: Cta;
  seo?: Seo;
}

export interface IntendedParents {
  _id: string;
  _type: "intendedParents";
  banners?: BannerSlide[];
  suitableForTitle?: string;
  suitableForItems?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
  needsTitle?: string;
  needsItems?: Array<{
    title: string;
    description?: string;
  }>;
  preparationTitle?: string;
  preparationItems?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
  boundariesTitle?: string;
  boundariesContent?: string;
  cta?: Cta;
  seo?: Seo;
}

export interface Journey {
  _id: string;
  _type: "journey";
  banners?: BannerSlide[];
  stepsTitle?: string;
  steps?: Array<{
    title: string;
    description?: string;
    icon?: string;
    stepNumber: number;
    details?: string[];
  }>;
  notesTitle?: string;
  notes?: Array<{
    title: string;
    description?: string;
  }>;
  seo?: Seo;
}

export interface WhyUs {
  _id: string;
  _type: "whyUs";
  banners?: BannerSlide[];
  introTitle?: string;
  introContent?: string;
  introImage?: ImageWithAlt;
  advantagesTitle?: string;
  advantages?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
  resourcesTitle?: string;
  resources?: Array<{
    name: string;
    description?: string;
    logo?: SanityImage;
  }>;
  standardsTitle?: string;
  standards?: Array<{
    title: string;
    description?: string;
  }>;
  statsTitle?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  cta?: Cta;
  seo?: Seo;
}

export interface FaqPage {
  _id: string;
  _type: "faqPage";
  banners?: BannerSlide[];
  pageTitle?: string;
  pageDescription?: string;
  cta?: Cta;
  seo?: Seo;
}

export interface StartJourney {
  _id: string;
  _type: "startJourney";
  banners?: BannerSlide[];
  phone?: string;
  wechatQrCode?: SanityImage;
  serviceHours?: string;
  consultationNote?: string;
  seo?: Seo;
}

export interface AboutTianyuePage {
  _id: string;
  _type: "aboutTianyuePage";
  pageTitle?: string;
  pageDescription?: string;
  seo?: Seo;
  banners?: BannerSlide[];
  brandTitle?: string;
  brandDescription?: string;
  brandImage?: ImageWithAlt;
  contactTitle?: string;
  phone?: string;
  wechatQrCode?: SanityImage;
  serviceHours?: string;
  consultationNote?: string;
}

export interface PrivacyPage {
  _id: string;
  _type: "privacyPage";
  banners?: BannerSlide[];
  pageTitle?: string;
  content?: RichTextBlock[];
  seo?: Seo;
}

export interface NewsArticle {
  _id: string;
  _type: "newsArticle";
  title: string;
  slug: Slug;
  category?: NewsCategoryRef;
  coverImage?: ImageWithAlt;
  banner?: BannerSlide;
  excerpt?: string;
  content?: RichTextBlock[];
  publishedAt: string;
  isPinned?: boolean;
  isFeatured?: boolean;
  seo?: Seo;
}

export interface NewsPage {
  _id: string;
  _type: "newsPage";
  pageTitle?: string;
  pageDescription?: string;
  seo?: Seo;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: ImageWithAlt;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  timelineTitle?: string;
  timelineDescription?: string;
  timelineItems?: Array<{
    year?: string;
    title?: string;
    description?: string;
    image?: ImageWithAlt;
  }>;
  breadcrumbCurrentLabel?: string;
  listTitle?: string;
  listDescription?: string;
  sidebarConsultTitle?: string;
  sidebarConsultDescription?: string;
  sidebarConsultButtonText?: string;
  sidebarConsultButtonLink?: string;
  sidebarResourceTitle?: string;
  sidebarResourceDescription?: string;
  sidebarResourceImage?: ImageWithAlt;
  sidebarExpertsTitle?: string;
  sidebarExpertsDescription?: string;
  sidebarExpertItems?: Array<{
    title?: string;
    description?: string;
    icon?: string;
  }>;
  sidebarFeaturedTitle?: string;
  sidebarServiceTitle?: string;
  sidebarServiceItems?: Array<{
    title?: string;
    href?: string;
    icon?: string;
  }>;
  brandSectionTitle?: string;
  brandSectionSubtitle?: string;
  brandSectionDescription?: string;
  brandSectionBackgroundImage?: ImageWithAlt;
  consultationTitle?: string;
  consultationDescription?: string;
  consultationBackgroundImage?: ImageWithAlt;
}

export interface NewsCategory {
  _id: string;
  _type: "newsCategory";
  name: string;
  slug: Slug;
  sortOrder?: number;
}

export interface NewsCategoryRef {
  _id: string;
  _type: "newsCategory";
  name: string;
  slug: Slug;
}

export interface FaqItem {
  _id: string;
  _type: "faqItem";
  question: string;
  answer: string;
  category?: FaqCategoryRef;
  sortOrder?: number;
  isFeatured?: boolean;
}

export interface FaqCategory {
  _id: string;
  _type: "faqCategory";
  name: string;
  slug: Slug;
  sortOrder?: number;
}

export interface FaqCategoryRef {
  _id: string;
  _type: "faqCategory";
  name: string;
  slug: Slug;
}

// ─────────────────────────────────────────────
// 三代试管婴儿页面
// ─────────────────────────────────────────────

export interface ThirdGenerationIvfPage {
  _id: string;
  _type: "thirdGenerationIvfPage";
  pageTitle?: string;
  pageDescription?: string;
  seo?: Seo;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: ImageWithAlt;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  heroSecondaryButtonText?: string;
  heroSecondaryButtonLink?: string;
  heroBadges?: string[];
  heroFormTitle?: string;
  heroFormFields?: string[];
  heroFormButtonText?: string;
  introTitle?: string;
  introSubtitle?: string;
  introBody?: string;
  introImage?: ImageWithAlt;
  introImageCaption?: string;
  introPoints?: string[];
  trustItems?: Array<{
    value: string;
    label?: string;
    description?: string;
  }>;
  whyChooseTitle?: string;
  whyChooseDescription?: string;
  whyChooseImage?: ImageWithAlt;
  whyChooseItems?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
  servicesTitle?: string;
  servicesDescription?: string;
  serviceItems?: Array<{
    title: string;
    description?: string;
    image?: ImageWithAlt;
    points?: string[];
  }>;
  hospitalsTitle?: string;
  hospitalsDescription?: string;
  hospitalItems?: Array<{
    name: string;
    location?: string;
    description?: string;
    image?: ImageWithAlt;
    tags?: string[];
  }>;
  expertsTitle?: string;
  expertsDescription?: string;
  expertItems?: Array<{
    name: string;
    title?: string;
    description?: string;
    avatar?: ImageWithAlt;
    specialties?: string[];
  }>;
  processTitle?: string;
  processDescription?: string;
  processImage?: ImageWithAlt;
  processSteps?: Array<{
    stepNumber: number;
    title: string;
    description?: string;
    duration?: string;
    image?: ImageWithAlt;
  }>;
  casesTitle?: string;
  casesDescription?: string;
  caseItems?: Array<{
    title: string;
    profile?: string;
    summary?: string;
    resultDescription?: string;
    image?: ImageWithAlt;
  }>;
  testimonialsTitle?: string;
  testimonialsDescription?: string;
  testimonialsImage?: ImageWithAlt;
  testimonialItems?: Array<{
    displayName?: string;
    profile?: string;
    content: string;
    rating?: number;
    avatar?: ImageWithAlt;
  }>;
  faqTitle?: string;
  faqDescription?: string;
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
  finalCtaPrimaryButtonText?: string;
  finalCtaPrimaryButtonLink?: string;
  finalCtaSecondaryButtonText?: string;
  finalCtaSecondaryButtonLink?: string;
  finalCtaBackgroundImage?: ImageWithAlt;
}

// ─────────────────────────────────────────────
// 冻卵/冻精页面
// ─────────────────────────────────────────────

export interface EggSpermFreezingPage {
  _id: string;
  _type: "eggSpermFreezingPage";
  pageTitle?: string;
  pageDescription?: string;
  seo?: Seo;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: ImageWithAlt;
  publishedAt?: string;
  readingTime?: string;
  authorName?: string;
  authorTitle?: string;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  heroSecondaryButtonText?: string;
  heroSecondaryButtonLink?: string;
  tocItems?: Array<{
    title: string;
    anchor: string;
  }>;
  contentBlocks?: Array<{
    blockType: string;
    anchor?: string;
    title?: string;
    subtitle?: string;
    body?: string;
    image?: ImageWithAlt;
    imagePosition?: "left" | "right";
    caption?: string;
    cardTone?: "blue" | "warning" | "success" | "neutral";
    buttonText?: string;
    buttonLink?: string;
    items?: Array<{
      title?: string;
      description?: string;
      value?: string;
      icon?: string;
      image?: ImageWithAlt;
    }>;
  }>;
  doctorName?: string;
  doctorTitle?: string;
  doctorExperience?: string;
  doctorSpecialties?: string[];
  doctorAvatar?: ImageWithAlt;
  doctorButtonText?: string;
  doctorButtonLink?: string;
  caseItems?: Array<{
    title: string;
    profile?: string;
    story?: string;
    resultDescription?: string;
    testimonial?: string;
    image?: ImageWithAlt;
  }>;
  faqTitle?: string;
  faqDescription?: string;
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
  sidebarTitle?: string;
  sidebarDescription?: string;
  sidebarPrimaryButtonText?: string;
  sidebarPrimaryButtonLink?: string;
  sidebarSecondaryButtonText?: string;
  sidebarSecondaryButtonLink?: string;
  sidebarPhoneLabel?: string;
  sidebarPhone?: string;
  sidebarWechatText?: string;
  sidebarWhatsappText?: string;
  sidebarHotArticles?: Array<{
    title: string;
    href: string;
  }>;
  sidebarRelatedLinks?: Array<{
    title: string;
    href: string;
  }>;
  sidebarCountries?: Array<{
    title: string;
    href: string;
  }>;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
  finalCtaPrimaryButtonText?: string;
  finalCtaPrimaryButtonLink?: string;
  finalCtaSecondaryButtonText?: string;
  finalCtaSecondaryButtonLink?: string;
  finalCtaBackgroundImage?: ImageWithAlt;
}

// ─────────────────────────────────────────────
// 第三方辅助生殖页面
// ─────────────────────────────────────────────

export interface ThirdPartyAssistedReproductionPage {
  _id: string;
  _type: "thirdPartyAssistedReproductionPage";
  pageTitle?: string;
  pageDescription?: string;
  seo?: Seo;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: ImageWithAlt;
  publishedAt?: string;
  readingTime?: string;
  authorName?: string;
  authorTitle?: string;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  heroSecondaryButtonText?: string;
  heroSecondaryButtonLink?: string;
  tocItems?: Array<{
    title: string;
    anchor: string;
  }>;
  contentBlocks?: Array<{
    blockType: string;
    anchor?: string;
    title?: string;
    subtitle?: string;
    body?: string;
    image?: ImageWithAlt;
    imagePosition?: "left" | "right";
    caption?: string;
    cardTone?: "blue" | "warning" | "success" | "neutral";
    buttonText?: string;
    buttonLink?: string;
    items?: Array<{
      title?: string;
      description?: string;
      value?: string;
      icon?: string;
      image?: ImageWithAlt;
    }>;
  }>;
  doctorName?: string;
  doctorTitle?: string;
  doctorExperience?: string;
  doctorSpecialties?: string[];
  doctorAvatar?: ImageWithAlt;
  doctorButtonText?: string;
  doctorButtonLink?: string;
  caseItems?: Array<{
    title: string;
    profile?: string;
    story?: string;
    resultDescription?: string;
    testimonial?: string;
    image?: ImageWithAlt;
  }>;
  faqTitle?: string;
  faqDescription?: string;
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
  sidebarTitle?: string;
  sidebarDescription?: string;
  sidebarPrimaryButtonText?: string;
  sidebarPrimaryButtonLink?: string;
  sidebarSecondaryButtonText?: string;
  sidebarSecondaryButtonLink?: string;
  sidebarPhoneLabel?: string;
  sidebarPhone?: string;
  sidebarWechatText?: string;
  sidebarWhatsappText?: string;
  sidebarHotArticles?: Array<{
    title: string;
    href: string;
  }>;
  sidebarRelatedLinks?: Array<{
    title: string;
    href: string;
  }>;
  sidebarCountries?: Array<{
    title: string;
    href: string;
  }>;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
  finalCtaPrimaryButtonText?: string;
  finalCtaPrimaryButtonLink?: string;
  finalCtaSecondaryButtonText?: string;
  finalCtaSecondaryButtonLink?: string;
  finalCtaBackgroundImage?: ImageWithAlt;
}

// ─────────────────────────────────────────────
// 私人订制页面
// ─────────────────────────────────────────────

export interface PrivateCustomizationPage {
  _id: string;
  _type: "privateCustomizationPage";
  pageTitle?: string;
  pageDescription?: string;
  seo?: Seo;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: ImageWithAlt;
  publishedAt?: string;
  readingTime?: string;
  authorName?: string;
  authorTitle?: string;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  heroSecondaryButtonText?: string;
  heroSecondaryButtonLink?: string;
  tocItems?: Array<{
    title: string;
    anchor: string;
  }>;
  contentBlocks?: Array<{
    blockType: string;
    anchor?: string;
    title?: string;
    subtitle?: string;
    body?: string;
    image?: ImageWithAlt;
    imagePosition?: "left" | "right";
    caption?: string;
    cardTone?: "blue" | "warning" | "success" | "neutral";
    buttonText?: string;
    buttonLink?: string;
    items?: Array<{
      title?: string;
      description?: string;
      value?: string;
      icon?: string;
      image?: ImageWithAlt;
    }>;
  }>;
  doctorName?: string;
  doctorTitle?: string;
  doctorExperience?: string;
  doctorSpecialties?: string[];
  doctorAvatar?: ImageWithAlt;
  doctorButtonText?: string;
  doctorButtonLink?: string;
  caseItems?: Array<{
    title: string;
    profile?: string;
    story?: string;
    resultDescription?: string;
    testimonial?: string;
    image?: ImageWithAlt;
  }>;
  faqTitle?: string;
  faqDescription?: string;
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
  sidebarTitle?: string;
  sidebarDescription?: string;
  sidebarPrimaryButtonText?: string;
  sidebarPrimaryButtonLink?: string;
  sidebarSecondaryButtonText?: string;
  sidebarSecondaryButtonLink?: string;
  sidebarPhoneLabel?: string;
  sidebarPhone?: string;
  sidebarWechatText?: string;
  sidebarWhatsappText?: string;
  sidebarHotArticles?: Array<{
    title: string;
    href: string;
  }>;
  sidebarRelatedLinks?: Array<{
    title: string;
    href: string;
  }>;
  sidebarCountries?: Array<{
    title: string;
    href: string;
  }>;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
  finalCtaPrimaryButtonText?: string;
  finalCtaPrimaryButtonLink?: string;
  finalCtaSecondaryButtonText?: string;
  finalCtaSecondaryButtonLink?: string;
  finalCtaBackgroundImage?: ImageWithAlt;
}

// ─────────────────────────────────────────────
// 试管服务区域页面
// ─────────────────────────────────────────────

export interface IvfServicesPage {
  _id: string;
  _type: "ivfServicesPage";
  pageTitle?: string;
  pageDescription?: string;
  seo?: Seo;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: ImageWithAlt;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  heroSecondaryButtonText?: string;
  heroSecondaryButtonLink?: string;
  heroBadges?: string[];
  regionTrustTitle?: string;
  regionTrustItems?: Array<{
    value: string;
    label?: string;
    description?: string;
  }>;
  serviceAreasTitle?: string;
  serviceAreasDescription?: string;
  serviceAreaItems?: Array<{
    name: string;
    subtitle?: string;
    description?: string;
    serviceHighlights?: string[];
    commonNeeds?: string[];
    image?: ImageWithAlt;
    ctaText?: string;
    ctaLink?: string;
  }>;
  serviceRegions?: Array<{
    name: string;
    subtitle?: string;
    description?: string;
    image?: ImageWithAlt;
    serviceHighlights?: string[];
    ctaText?: string;
    ctaLink?: string;
    mapLabel?: string;
    lng?: number;
    lat?: number;
  }>;
  regionalServiceTitle?: string;
  regionalServiceDescription?: string;
  regionalServiceSteps?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
  experienceTitle?: string;
  experienceDescription?: string;
  experienceItems?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
  remoteProcessTitle?: string;
  remoteProcessDescription?: string;
  remoteProcessSteps?: Array<{
    stepNumber: number;
    title: string;
    description?: string;
    duration?: string;
  }>;
  needsTitle?: string;
  needsDescription?: string;
  needsItems?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
  conversionTitle?: string;
  conversionDescription?: string;
  conversionFields?: string[];
  conversionButtonText?: string;
  conversionImage?: ImageWithAlt;
  conversionBackgroundImage?: ImageWithAlt;
  regionalCasesTitle?: string;
  regionalCasesDescription?: string;
  regionalCaseItems?: Array<{
    title: string;
    city?: string;
    profile?: string;
    challenge?: string;
    serviceSupport?: string;
    resultDescription?: string;
    image?: ImageWithAlt;
    buttonText?: string;
    buttonLink?: string;
  }>;
  faqTitle?: string;
  faqDescription?: string;
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
  appointmentTitle?: string;
  appointmentDescription?: string;
  appointmentFields?: string[];
  appointmentButtonText?: string;
  appointmentBackgroundImage?: ImageWithAlt;
}

// ─────────────────────────────────────────────
// 成功案例页面
// ─────────────────────────────────────────────

export interface SuccessCasesPage {
  _id: string;
  _type: "successCasesPage";
  pageTitle?: string;
  pageDescription?: string;
  seo?: Seo;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: ImageWithAlt;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  timelineTitle?: string;
  timelineItems?: Array<{
    year: string;
    title: string;
    description?: string;
    image?: ImageWithAlt;
  }>;
  listTitle?: string;
  listDescription?: string;
  sidebarTitle?: string;
  sidebarDescription?: string;
  sidebarPrimaryButtonText?: string;
  sidebarPrimaryButtonLink?: string;
  sidebarPhone?: string;
  sidebarHotLinks?: Array<{
    title: string;
    href: string;
  }>;
  sidebarRelatedLinks?: Array<{
    title: string;
    href: string;
  }>;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
  finalCtaPrimaryButtonText?: string;
  finalCtaPrimaryButtonLink?: string;
  finalCtaBackgroundImage?: ImageWithAlt;
}

// ─────────────────────────────────────────────
// 成功案例
// ─────────────────────────────────────────────

export interface SuccessCase {
  _id: string;
  _type: "successCase";
  title: string;
  slug: Slug;
  excerpt?: string;
  coverImage?: ImageWithAlt;
  clientProfile?: string;
  serviceType?: string;
  resultSummary?: string;
  content?: RichTextBlock[];
  publishedAt?: string;
  isFeatured?: boolean;
  sortOrder?: number;
  tags?: string[];
  seo?: Seo;
}

// ─────────────────────────────────────────────
// 医疗服务页面
// ─────────────────────────────────────────────

export interface MedicalServicesPage {
  _id: string;
  _type: "medicalServicesPage";
  pageTitle?: string;
  pageDescription?: string;
  seo?: Seo;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: ImageWithAlt;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  timelineTitle?: string;
  timelineDescription?: string;
  timelineItems?: Array<{
    year?: string;
    title?: string;
    description?: string;
    image?: ImageWithAlt;
  }>;
  breadcrumbCurrentLabel?: string;
  introTitle?: string;
  introDescription?: string;
  introImage?: ImageWithAlt;
  serviceSections?: Array<{
    sectionNumber?: string;
    title?: string;
    subtitle?: string;
    body?: string;
    image?: ImageWithAlt;
    imagePosition?: string;
    buttonText?: string;
    buttonLink?: string;
    items?: Array<{
      title?: string;
      description?: string;
      value?: string;
      icon?: string;
      image?: ImageWithAlt;
    }>;
  }>;
  advantagesTitle?: string;
  advantagesDescription?: string;
  advantagesImage?: ImageWithAlt;
  advantageItems?: Array<{
    title?: string;
    description?: string;
    icon?: string;
  }>;
  relatedTitle?: string;
  relatedItems?: Array<{
    title?: string;
    description?: string;
    href?: string;
  }>;
  processTitle?: string;
  processDescription?: string;
  processSteps?: Array<{
    title?: string;
    description?: string;
    icon?: string;
  }>;
  sidebarConsultTitle?: string;
  sidebarConsultDescription?: string;
  sidebarConsultButtonText?: string;
  sidebarConsultButtonLink?: string;
  sidebarResourceTitle?: string;
  sidebarResourceDescription?: string;
  sidebarResourceImage?: ImageWithAlt;
  sidebarExpertsTitle?: string;
  sidebarExpertsDescription?: string;
  sidebarExpertItems?: Array<{
    title?: string;
    description?: string;
    icon?: string;
  }>;
  sidebarFeaturedCaseTitle?: string;
  sidebarFeaturedCaseDescription?: string;
  sidebarFeaturedCaseImage?: ImageWithAlt;
  sidebarFeaturedCaseLink?: string;
  sidebarServiceTitle?: string;
  sidebarServiceItems?: Array<{
    title?: string;
    href?: string;
    icon?: string;
  }>;
  brandSectionTitle?: string;
  brandSectionSubtitle?: string;
  brandSectionDescription?: string;
  brandSectionBackgroundImage?: ImageWithAlt;
  consultationTitle?: string;
  consultationDescription?: string;
  consultationBackgroundImage?: ImageWithAlt;
}

// ─────────────────────────────────────────────
// 科普视频中心
// ─────────────────────────────────────────────

export interface VideoCategory {
  _id: string;
  _type: "videoCategory";
  name: string;
  slug: Slug;
  sortOrder?: number;
}

export interface VideoCategoryRef {
  _id: string;
  _type: "videoCategory";
  name: string;
  slug: Slug;
}

export interface ScienceVideo {
  _id: string;
  _type: "scienceVideo";
  title: string;
  slug: Slug;
  excerpt?: string;
  content?: RichTextBlock[];
  coverImage?: ImageWithAlt;
  category?: VideoCategoryRef;
  presenter?: string;
  duration?: string;
  videoSource: "external" | "upload";
  externalUrl?: string;
  videoFile?: { asset: { _ref: string; _type: "reference" } };
  publishedAt: string;
  isFeatured?: boolean;
  sortOrder?: number;
  seo?: Seo;
}

export interface VideosPage {
  _id: string;
  _type: "videosPage";
  pageTitle?: string;
  pageDescription?: string;
  seo?: Seo;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: ImageWithAlt;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  featuredTitle?: string;
  featuredDescription?: string;
  listTitle?: string;
  listDescription?: string;
  categoryFilterEnabled?: boolean;
  sidebarConsultTitle?: string;
  sidebarConsultDescription?: string;
  sidebarConsultButtonText?: string;
  sidebarConsultButtonLink?: string;
  sidebarPhone?: string;
  sidebarHotLinks?: Array<{ title: string; href: string }>;
  sidebarRelatedLinks?: Array<{ title: string; href: string }>;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
  finalCtaPrimaryButtonText?: string;
  finalCtaPrimaryButtonLink?: string;
  finalCtaSecondaryButtonText?: string;
  finalCtaSecondaryButtonLink?: string;
  finalCtaBackgroundImage?: ImageWithAlt;
  emptyStateText?: string;
  playbackErrorText?: string;
  medicalDisclaimer?: string;
}
