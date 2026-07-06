/**
 * Sanity 数据获取函数
 *
 * 每个函数封装一个 GROQ 查询，返回强类型数据。
 * CMS 无数据时返回 null，不抛出错误。
 */

import type {
  SiteSettings,
  NewsArticle,
  NewsPage,
  SuccessCase,
  FaqItem,
  NewsCategory,
  FaqCategory,
  ScienceVideo,
} from "@/types/sanity";
import type {
  LayoutData,
  HomePageData,
  IntendedParentsPageData,
  JourneyPageData,
  NewsListPageData,
  NewsDetailPageData,
  WhyUsPageData,
  FaqPageData,
  StartJourneyPageData,
  AboutTianyuePageData,
  PrivacyPageData,
  ThirdGenerationIvfPageData,
  IvfServicesPageData,
  EggSpermFreezingPageData,
  ThirdPartyAssistedReproductionPageData,
  PrivateCustomizationPageData,
  SuccessCasesPageData,
  SuccessCaseDetailPageData,
  MedicalServicesPageData,
  VideosPageData,
  VideoDetailPageData,
} from "@/types/page";

import {
  siteSettingsQuery,
  layoutDataQuery,
  homePageDataQuery,
  intendedParentsPageQuery,
  journeyPageQuery,
  newsListPageQuery,
  newsPageQuery,
  newsArticleBySlugQuery,
  relatedNewsQuery,
  newsSlugsQuery,
  whyUsPageQuery,
  faqPageDataQuery,
  startJourneyPageQuery,
  aboutTianyuePageDataQuery,
  privacyPageDataQuery,
  thirdGenerationIvfPageDataQuery,
  ivfServicesPageDataQuery,
  eggSpermFreezingPageDataQuery,
  thirdPartyAssistedReproductionPageDataQuery,
  privateCustomizationPageDataQuery,
  successCasesPageDataQuery,
  successCaseBySlugQuery,
  relatedSuccessCasesQuery,
  successCaseSlugsQuery,
  medicalServicesPageDataQuery,
  videosPageDataQuery,
  videosPageQuery,
  scienceVideoBySlugQuery,
  relatedVideosQuery,
  videoSlugsQuery,
  allNewsForSitemapQuery,
} from "./queries";
import { sanityFetch } from "./fetch";

// ─────────────────────────────────────────────
// 网站基础信息
// ─────────────────────────────────────────────

/** 获取站点设置（单例），无数据返回 null */
export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch siteSettings");
    return null;
  }
}

/** 布局数据（siteSettings），用于 Header/Footer */
export async function fetchLayoutData(): Promise<LayoutData> {
  try {
    return await sanityFetch<LayoutData>({
      query: layoutDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch layout data");
    return { siteSettings: null };
  }
}

// ─────────────────────────────────────────────
// 首页
// ─────────────────────────────────────────────

/** 首页聚合数据，CMS 无数据时返回合理空结构 */
export async function fetchHomePageData(): Promise<HomePageData> {
  try {
    return await sanityFetch<HomePageData>({
      query: homePageDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch home page data");
    return {
      siteSettings: null,
      homePage: null,
      newsArticles: [],
      faqItems: [],
    };
  }
}

// ─────────────────────────────────────────────
// 关于准父母
// ─────────────────────────────────────────────

/** 关于准父母聚合数据 */
export async function fetchIntendedParentsPageData(): Promise<IntendedParentsPageData> {
  try {
    return await sanityFetch<IntendedParentsPageData>({
      query: intendedParentsPageQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch intended parents page data");
    return {
      siteSettings: null,
      intendedParents: null,
    };
  }
}

// ─────────────────────────────────────────────
// 助孕流程
// ─────────────────────────────────────────────

/** 助孕流程聚合数据 */
export async function fetchJourneyPageData(): Promise<JourneyPageData> {
  try {
    return await sanityFetch<JourneyPageData>({
      query: journeyPageQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch journey page data");
    return {
      siteSettings: null,
      journey: null,
    };
  }
}

// ─────────────────────────────────────────────
// 新闻资讯
// ─────────────────────────────────────────────

/** 新闻列表聚合数据 */
export async function fetchNewsListPageData(): Promise<NewsListPageData> {
  try {
    const data = await sanityFetch<{
      siteSettings: SiteSettings | null;
      newsPage: NewsPage | null;
      newsArticles: NewsArticle[];
      categories: NewsCategory[];
      pinnedArticles: NewsArticle[];
    }>({
      query: newsListPageQuery,
      cache: "force-cache",
      revalidate: 60,
    });

    return {
      ...data,
      totalPages: Math.ceil(data.newsArticles.length / 10),
      currentPage: 1,
    };
  } catch {
    console.warn("Failed to fetch news list page data");
    return {
      siteSettings: null,
      newsPage: null,
      newsArticles: [],
      categories: [],
      pinnedArticles: [],
      totalPages: 0,
      currentPage: 1,
    };
  }
}

/** 新闻详情数据 */
export async function fetchNewsDetailPageData(
  slug: string
): Promise<NewsDetailPageData> {
  try {
    const [article, newsPage] = await Promise.all([
      sanityFetch<NewsArticle | null>({
        query: newsArticleBySlugQuery,
        params: { slug },
        cache: "force-cache",
        revalidate: 60,
      }),
      sanityFetch<NewsPage | null>({
        query: newsPageQuery,
        cache: "force-cache",
        revalidate: 60,
      }),
    ]);

    if (!article) {
      return {
        siteSettings: null,
        newsPage: newsPage || null,
        article: null,
        relatedArticles: [],
      };
    }

    // 获取相关文章
    const relatedArticles = article.category
      ? await sanityFetch<NewsArticle[]>({
          query: relatedNewsQuery,
          params: { slug, categoryId: article.category._id },
          cache: "force-cache",
          revalidate: 60,
        })
      : [];

    const siteSettings = await fetchSiteSettings();

    return {
      siteSettings,
      newsPage: newsPage || null,
      article,
      relatedArticles: relatedArticles || [],
    };
  } catch {
    console.warn(`Failed to fetch news detail page data for slug: ${slug}`);
    return {
      siteSettings: null,
      newsPage: null,
      article: null,
      relatedArticles: [],
    };
  }
}

/** 获取所有新闻 slug，用于 generateStaticParams */
export async function fetchNewsSlugs(): Promise<string[]> {
  try {
    const result = await sanityFetch<{ slug: string }[]>({
      query: newsSlugsQuery,
      cache: "force-cache",
      revalidate: 60,
    });
    return result.map((item) => item.slug);
  } catch {
    console.warn("Failed to fetch news slugs");
    return [];
  }
}

// ─────────────────────────────────────────────
// 为什么选择我们
// ─────────────────────────────────────────────

/** 为什么选择我们聚合数据 */
export async function fetchWhyUsPageData(): Promise<WhyUsPageData> {
  try {
    return await sanityFetch<WhyUsPageData>({
      query: whyUsPageQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch why us page data");
    return {
      siteSettings: null,
      whyUs: null,
    };
  }
}

// ─────────────────────────────────────────────
// 常见问题
// ─────────────────────────────────────────────

/** 常见问题聚合数据 */
export async function fetchFaqPageData(): Promise<FaqPageData> {
  try {
    return await sanityFetch<FaqPageData>({
      query: faqPageDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch FAQ page data");
    return {
      siteSettings: null,
      faqPage: null,
      faqItems: [],
      categories: [],
    };
  }
}

// ─────────────────────────────────────────────
// 踏上为人父母之旅
// ─────────────────────────────────────────────

/** 踏上为人父母之旅聚合数据 */
export async function fetchStartJourneyPageData(): Promise<StartJourneyPageData> {
  try {
    return await sanityFetch<StartJourneyPageData>({
      query: startJourneyPageQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch start journey page data");
    return {
      siteSettings: null,
      startJourney: null,
    };
  }
}

// ─────────────────────────────────────────────
// 走进天悦宝贝页面
// ─────────────────────────────────────────────

/** 走进天悦宝贝聚合数据 */
export async function fetchAboutTianyuePageData(): Promise<AboutTianyuePageData> {
  try {
    return await sanityFetch<AboutTianyuePageData>({
      query: aboutTianyuePageDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch about Tianyue page data");
    return {
      siteSettings: null,
      aboutTianyuePage: null,
    };
  }
}

// ─────────────────────────────────────────────
// 隐私政策
// ─────────────────────────────────────────────

/** 隐私政策聚合数据 */
export async function fetchPrivacyPageData(): Promise<PrivacyPageData> {
  try {
    return await sanityFetch<PrivacyPageData>({
      query: privacyPageDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch privacy page data");
    return {
      siteSettings: null,
      privacyPage: null,
    };
  }
}

// ─────────────────────────────────────────────
// 三代试管婴儿页面
// ─────────────────────────────────────────────

/** 三代试管婴儿聚合数据 */
export async function fetchThirdGenerationIvfPageData(): Promise<ThirdGenerationIvfPageData> {
  try {
    return await sanityFetch<ThirdGenerationIvfPageData>({
      query: thirdGenerationIvfPageDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch third generation IVF page data");
    return {
      siteSettings: null,
      thirdGenerationIvfPage: null,
    };
  }
}

// ─────────────────────────────────────────────
// 试管服务区域页面
// ─────────────────────────────────────────────

/** 试管服务区域聚合数据 */
export async function fetchIvfServicesPageData(): Promise<IvfServicesPageData> {
  try {
    return await sanityFetch<IvfServicesPageData>({
      query: ivfServicesPageDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch IVF services page data");
    return {
      siteSettings: null,
      ivfServicesPage: null,
    };
  }
}

// ─────────────────────────────────────────────
// 冻卵/冻精页面
// ─────────────────────────────────────────────

/** 冻卵/冻精聚合数据 */
export async function fetchEggSpermFreezingPageData(): Promise<EggSpermFreezingPageData> {
  try {
    return await sanityFetch<EggSpermFreezingPageData>({
      query: eggSpermFreezingPageDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch egg/sperm freezing page data");
    return {
      siteSettings: null,
      eggSpermFreezingPage: null,
    };
  }
}

// ─────────────────────────────────────────────
// 第三方辅助生殖页面
// ─────────────────────────────────────────────

/** 第三方辅助生殖聚合数据 */
export async function fetchThirdPartyAssistedReproductionPageData(): Promise<ThirdPartyAssistedReproductionPageData> {
  try {
    return await sanityFetch<ThirdPartyAssistedReproductionPageData>({
      query: thirdPartyAssistedReproductionPageDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch third-party assisted reproduction page data");
    return {
      siteSettings: null,
      thirdPartyAssistedReproductionPage: null,
    };
  }
}

// ─────────────────────────────────────────────
// 私人订制页面
// ─────────────────────────────────────────────

/** 私人订制聚合数据 */
export async function fetchPrivateCustomizationPageData(): Promise<PrivateCustomizationPageData> {
  try {
    return await sanityFetch<PrivateCustomizationPageData>({
      query: privateCustomizationPageDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch private customization page data");
    return {
      siteSettings: null,
      privateCustomizationPage: null,
    };
  }
}

// ─────────────────────────────────────────────
// 成功案例页面
// ─────────────────────────────────────────────

/** 成功案例页面聚合数据 */
export async function fetchSuccessCasesPageData(): Promise<SuccessCasesPageData> {
  try {
    return await sanityFetch<SuccessCasesPageData>({
      query: successCasesPageDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch success cases page data");
    return {
      siteSettings: null,
      successCasesPage: null,
      successCases: [],
      featuredSuccessCases: [],
    };
  }
}

/** 成功案例详情数据 */
export async function fetchSuccessCaseDetailPageData(
  slug: string
): Promise<SuccessCaseDetailPageData> {
  try {
    const successCase = await sanityFetch<SuccessCase | null>({
      query: successCaseBySlugQuery,
      params: { slug },
      cache: "force-cache",
      revalidate: 60,
    });

    if (!successCase) {
      return {
        siteSettings: null,
        successCase: null,
        relatedCases: [],
      };
    }

    const relatedCases = successCase.serviceType
      ? await sanityFetch<SuccessCase[]>({
          query: relatedSuccessCasesQuery,
          params: { slug, serviceType: successCase.serviceType },
          cache: "force-cache",
          revalidate: 60,
        })
      : [];

    const siteSettings = await fetchSiteSettings();

    return {
      siteSettings,
      successCase,
      relatedCases: relatedCases || [],
    };
  } catch {
    console.warn(`Failed to fetch success case detail data for slug: ${slug}`);
    return {
      siteSettings: null,
      successCase: null,
      relatedCases: [],
    };
  }
}

/** 获取所有成功案例 slug，用于 generateStaticParams */
export async function fetchSuccessCaseSlugs(): Promise<string[]> {
  try {
    const result = await sanityFetch<{ slug: string }[]>({
      query: successCaseSlugsQuery,
      cache: "force-cache",
      revalidate: 60,
    });
    return result.map((item) => item.slug);
  } catch {
    console.warn("Failed to fetch success case slugs");
    return [];
  }
}

// ─────────────────────────────────────────────
// 医疗服务页面
// ─────────────────────────────────────────────

/** 医疗服务页面聚合数据 */
export async function fetchMedicalServicesPageData(): Promise<MedicalServicesPageData> {
  try {
    return await sanityFetch<MedicalServicesPageData>({
      query: medicalServicesPageDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch medical services page data");
    return {
      siteSettings: null,
      medicalServicesPage: null,
    };
  }
}

// ─────────────────────────────────────────────
// 科普视频中心
// ─────────────────────────────────────────────

/** 科普视频中心聚合数据 */
export async function fetchVideosPageData(): Promise<VideosPageData> {
  try {
    return await sanityFetch<VideosPageData>({
      query: videosPageDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch videos page data");
    return {
      siteSettings: null,
      videosPage: null,
      scienceVideos: [],
      categories: [],
      featuredVideos: [],
    };
  }
}

/** 科普视频详情数据 */
export async function fetchVideoDetailPageData(
  slug: string
): Promise<VideoDetailPageData> {
  try {
    const video = await sanityFetch<ScienceVideo | null>({
      query: scienceVideoBySlugQuery,
      params: { slug },
      cache: "force-cache",
      revalidate: 60,
    });

    if (!video) {
      return {
        siteSettings: null,
        videosPage: null,
        video: null,
        relatedVideos: [],
      };
    }

    const relatedVideos = video.category?._id
      ? await sanityFetch<ScienceVideo[]>({
          query: relatedVideosQuery,
          params: { slug, categoryId: video.category._id },
          cache: "force-cache",
          revalidate: 60,
        })
      : [];

    const [siteSettings, videosPage] = await Promise.all([
      fetchSiteSettings(),
      sanityFetch<import("@/types/sanity").VideosPage | null>({
        query: videosPageQuery,
        cache: "force-cache",
        revalidate: 60,
      }),
    ]);

    return {
      siteSettings,
      videosPage,
      video,
      relatedVideos: relatedVideos || [],
    };
  } catch {
    console.warn(`Failed to fetch video detail data for slug: ${slug}`);
    return {
      siteSettings: null,
      videosPage: null,
      video: null,
      relatedVideos: [],
    };
  }
}

/** 获取所有科普视频 slug，用于 generateStaticParams */
export async function fetchVideoSlugs(): Promise<string[]> {
  try {
    const result = await sanityFetch<{ slug: string }[]>({
      query: videoSlugsQuery,
      cache: "force-cache",
      revalidate: 60,
    });
    return result.map((item) => item.slug);
  } catch {
    console.warn("Failed to fetch video slugs");
    return [];
  }
}

// ─────────────────────────────────────────────
// SEO 相关
// ─────────────────────────────────────────────

/** 获取所有新闻（用于 sitemap） */
export async function fetchAllNewsForSitemap(): Promise<
  Array<{ slug: string; publishedAt: string; _updatedAt: string }>
> {
  try {
    return await sanityFetch<
      Array<{ slug: string; publishedAt: string; _updatedAt: string }>
    >({
      query: allNewsForSitemapQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch news for sitemap");
    return [];
  }
}
