/**
 * 页面数据类型定义
 *
 * 用于各页面的聚合查询返回类型。
 */

import type {
  SiteSettings,
  HomePage,
  IntendedParents,
  Journey,
  WhyUs,
  FaqPage,
  StartJourney,
  PrivacyPage,
  ThirdGenerationIvfPage,
  IvfServicesPage,
  EggSpermFreezingPage,
  ThirdPartyAssistedReproductionPage,
  PrivateCustomizationPage,
  SuccessCasesPage,
  SuccessCase,
  MedicalServicesPage,
  NewsArticle,
  NewsPage,
  NewsCategory,
  FaqItem,
  FaqCategory,
  BannerSlide,
  Seo,
} from "./sanity";

// ─────────────────────────────────────────────
// 布局数据
// ─────────────────────────────────────────────

export interface LayoutData {
  siteSettings: SiteSettings | null;
}

// ─────────────────────────────────────────────
// 首页数据
// ─────────────────────────────────────────────

export interface HomePageData {
  siteSettings: SiteSettings | null;
  homePage: HomePage | null;
  newsArticles: NewsArticle[];
  faqItems: FaqItem[];
}

// ─────────────────────────────────────────────
// 关于准父母数据
// ─────────────────────────────────────────────

export interface IntendedParentsPageData {
  siteSettings: SiteSettings | null;
  intendedParents: IntendedParents | null;
}

// ─────────────────────────────────────────────
// 助孕流程数据
// ─────────────────────────────────────────────

export interface JourneyPageData {
  siteSettings: SiteSettings | null;
  journey: Journey | null;
}

// ─────────────────────────────────────────────
// 新闻列表数据
// ─────────────────────────────────────────────

export interface NewsListPageData {
  siteSettings: SiteSettings | null;
  newsPage: NewsPage | null;
  newsArticles: NewsArticle[];
  categories: NewsCategory[];
  pinnedArticles: NewsArticle[];
  totalPages: number;
  currentPage: number;
}

// ─────────────────────────────────────────────
// 新闻详情数据
// ─────────────────────────────────────────────

export interface NewsDetailPageData {
  siteSettings: SiteSettings | null;
  newsPage: NewsPage | null;
  article: NewsArticle | null;
  relatedArticles: NewsArticle[];
}

// ─────────────────────────────────────────────
// 为什么选择我们数据
// ─────────────────────────────────────────────

export interface WhyUsPageData {
  siteSettings: SiteSettings | null;
  whyUs: WhyUs | null;
}

// ─────────────────────────────────────────────
// 常见问题数据
// ─────────────────────────────────────────────

export interface FaqPageData {
  siteSettings: SiteSettings | null;
  faqPage: FaqPage | null;
  faqItems: FaqItem[];
  categories: FaqCategory[];
}

// ─────────────────────────────────────────────
// 踏上为人父母之旅数据
// ─────────────────────────────────────────────

export interface StartJourneyPageData {
  siteSettings: SiteSettings | null;
  startJourney: StartJourney | null;
}

// ─────────────────────────────────────────────
// 隐私政策数据
// ─────────────────────────────────────────────

export interface PrivacyPageData {
  siteSettings: SiteSettings | null;
  privacyPage: PrivacyPage | null;
}

// ─────────────────────────────────────────────
// 三代试管婴儿页面数据
// ─────────────────────────────────────────────

export interface ThirdGenerationIvfPageData {
  siteSettings: SiteSettings | null;
  thirdGenerationIvfPage: ThirdGenerationIvfPage | null;
}

// ─────────────────────────────────────────────
// 冻卵/冻精页面数据
// ─────────────────────────────────────────────

export interface EggSpermFreezingPageData {
  siteSettings: SiteSettings | null;
  eggSpermFreezingPage: EggSpermFreezingPage | null;
}

// ─────────────────────────────────────────────
// 试管服务区域页面数据
// ─────────────────────────────────────────────

export interface IvfServicesPageData {
  siteSettings: SiteSettings | null;
  ivfServicesPage: IvfServicesPage | null;
}

// ─────────────────────────────────────────────
// 第三方辅助生殖页面数据
// ─────────────────────────────────────────────

export interface ThirdPartyAssistedReproductionPageData {
  siteSettings: SiteSettings | null;
  thirdPartyAssistedReproductionPage: ThirdPartyAssistedReproductionPage | null;
}

// ─────────────────────────────────────────────
// 私人订制页面数据
// ─────────────────────────────────────────────

export interface PrivateCustomizationPageData {
  siteSettings: SiteSettings | null;
  privateCustomizationPage: PrivateCustomizationPage | null;
}

// ─────────────────────────────────────────────
// 成功案例页面数据
// ─────────────────────────────────────────────

export interface SuccessCasesPageData {
  siteSettings: SiteSettings | null;
  successCasesPage: SuccessCasesPage | null;
  successCases: SuccessCase[];
  featuredSuccessCases: SuccessCase[];
}

// ─────────────────────────────────────────────
// 成功案例详情数据
// ─────────────────────────────────────────────

export interface SuccessCaseDetailPageData {
  siteSettings: SiteSettings | null;
  successCase: SuccessCase | null;
  relatedCases: SuccessCase[];
}

// ─────────────────────────────────────────────
// 医疗服务页面数据
// ─────────────────────────────────────────────

export interface MedicalServicesPageData {
  siteSettings: SiteSettings | null;
  medicalServicesPage: MedicalServicesPage | null;
}
