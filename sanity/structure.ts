import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("内容管理")
    .items([
      // ── 站点设置 ──
      S.listItem()
        .id("site-settings")
        .title("站点设置")
        .child(
          S.document()
            .id("site-settings-doc")
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .views([S.view.form()])
        ),
      S.divider(),

      // ── 固定页面 ──
      S.listItem()
        .id("fixed-pages")
        .title("固定页面")
        .child(
          S.list()
            .id("fixed-pages-list")
            .title("固定页面")
            .items([
              S.listItem()
                .id("home-page")
                .title("首页")
                .child(
                  S.document()
                    .id("home-page-doc")
                    .schemaType("homePage")
                    .documentId("homePage")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("privacy-page")
                .title("隐私政策")
                .child(
                  S.document()
                    .id("privacy-page-doc")
                    .schemaType("privacyPage")
                    .documentId("privacyPage")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("third-generation-ivf")
                .title("三代试管婴儿")
                .child(
                  S.document()
                    .id("third-generation-ivf-doc")
                    .schemaType("thirdGenerationIvfPage")
                    .documentId("thirdGenerationIvfPage")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("ivf-services")
                .title("试管服务区域")
                .child(
                  S.document()
                    .id("ivf-services-doc")
                    .schemaType("ivfServicesPage")
                    .documentId("ivfServicesPage")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("egg-sperm-freezing")
                .title("冻卵/冻精")
                .child(
                  S.document()
                    .id("egg-sperm-freezing-doc")
                    .schemaType("eggSpermFreezingPage")
                    .documentId("eggSpermFreezingPage")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("third-party-assisted-reproduction")
                .title("第三方辅助生殖")
                .child(
                  S.document()
                    .id("third-party-assisted-reproduction-doc")
                    .schemaType("thirdPartyAssistedReproductionPage")
                    .documentId("thirdPartyAssistedReproductionPage")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("private-customization")
                .title("私人订制")
                .child(
                  S.document()
                    .id("private-customization-doc")
                    .schemaType("privateCustomizationPage")
                    .documentId("privateCustomizationPage")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("news-page")
                .title("新闻资讯页面")
                .child(
                  S.document()
                    .id("news-page-doc")
                    .schemaType("newsPage")
                    .documentId("newsPage")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("medical-services-page")
                .title("医疗服务页面")
                .child(
                  S.document()
                    .id("medical-services-page-doc")
                    .schemaType("medicalServicesPage")
                    .documentId("medicalServicesPage")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("videos-page")
                .title("科普视频页面")
                .child(
                  S.document()
                    .id("videos-page-doc")
                    .schemaType("videosPage")
                    .documentId("videosPage")
                    .views([S.view.form()])
                ),
            ])
        ),
      S.divider(),

      // ── 新闻资讯 ──
      S.listItem()
        .id("news")
        .title("新闻资讯")
        .child(
          S.list()
            .id("news-list")
            .title("新闻资讯")
            .items([
              S.listItem()
                .id("news-articles")
                .title("全部文章")
                .child(
                  S.documentList()
                    .id("news-articles-list")
                    .title("全部文章")
                    .filter('_type == "newsArticle"')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .id("pinned-articles")
                .title("置顶文章")
                .child(
                  S.documentList()
                    .id("pinned-articles-list")
                    .title("置顶文章")
                    .filter('_type == "newsArticle" && isPinned == true')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .id("featured-articles")
                .title("推荐文章")
                .child(
                  S.documentList()
                    .id("featured-articles-list")
                    .title("推荐文章")
                    .filter('_type == "newsArticle" && isFeatured == true')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
              S.divider(),
              S.listItem()
                .id("news-categories")
                .title("文章分类")
                .child(
                  S.documentList()
                    .id("news-categories-list")
                    .title("文章分类")
                    .filter('_type == "newsCategory"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
            ])
        ),
      S.divider(),

      // ── 科普视频中心 ──
      S.listItem()
        .id("science-videos")
        .title("科普视频中心")
        .child(
          S.list()
            .id("science-videos-list")
            .title("科普视频中心")
            .items([
              S.listItem()
                .id("science-videos-all")
                .title("全部视频")
                .child(
                  S.documentList()
                    .id("science-videos-all-list")
                    .title("全部视频")
                    .filter('_type == "scienceVideo"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.listItem()
                .id("science-videos-featured")
                .title("推荐视频")
                .child(
                  S.documentList()
                    .id("science-videos-featured-list")
                    .title("推荐视频")
                    .filter('_type == "scienceVideo" && isFeatured == true')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.divider(),
              S.listItem()
                .id("video-categories")
                .title("视频分类")
                .child(
                  S.documentList()
                    .id("video-categories-list")
                    .title("视频分类")
                    .filter('_type == "videoCategory"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
            ])
        ),
      S.divider(),

      // ── 咨询记录 ──
      S.listItem()
        .id("consultations")
        .title("咨询记录")
        .child(
          S.list()
            .id("consultations-list")
            .title("咨询记录")
            .items([
              S.listItem()
                .id("consultation-all")
                .title("全部记录")
                .child(
                  S.documentList()
                    .id("consultation-all-list")
                    .title("全部记录")
                    .filter('_type == "consultationLead"')
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .id("consultation-pending")
                .title("待跟进")
                .child(
                  S.documentList()
                    .id("consultation-pending-list")
                    .title("待跟进")
                    .filter(
                      '_type == "consultationLead" && status == "pending"'
                    )
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .id("consultation-in-progress")
                .title("跟进中")
                .child(
                  S.documentList()
                    .id("consultation-in-progress-list")
                    .title("跟进中")
                    .filter(
                      '_type == "consultationLead" && status == "in_progress"'
                    )
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
            ])
        ),
      S.divider(),

      // ── 常见问题 ──
      S.listItem()
        .id("faq")
        .title("常见问题")
        .child(
          S.list()
            .id("faq-list")
            .title("常见问题")
            .items([
              S.listItem()
                .id("faq-items")
                .title("全部问题")
                .child(
                  S.documentList()
                    .id("faq-items-list")
                    .title("全部问题")
                    .filter('_type == "faqItem"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.listItem()
                .id("featured-faqs")
                .title("推荐问题")
                .child(
                  S.documentList()
                    .id("featured-faqs-list")
                    .title("推荐问题")
                    .filter('_type == "faqItem" && isFeatured == true')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.divider(),
              S.listItem()
                .id("faq-categories")
                .title("问题分类")
                .child(
                  S.documentList()
                    .id("faq-categories-list")
                    .title("问题分类")
                    .filter('_type == "faqCategory"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
            ])
        ),
      S.divider(),

      // ── 其他文档 ──
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "siteSettings",
            "homePage",
            "privacyPage",
            "thirdGenerationIvfPage",
            "ivfServicesPage",
            "eggSpermFreezingPage",
            "thirdPartyAssistedReproductionPage",
            "privateCustomizationPage",
            "newsPage",
            "medicalServicesPage",
            "newsArticle",
            "newsCategory",
            "faqItem",
            "faqCategory",
            "consultationLead",
            "scienceVideo",
            "videosPage",
            "videoCategory",
          ].includes(listItem.getId() ?? "")
      ),
    ]);
