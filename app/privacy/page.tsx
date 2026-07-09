import type { Metadata } from "next";
import { PageBanner } from "@/components/shared/page-banner";
import { PortableTextRenderer } from "@/components/shared/portable-text";
import { fetchPrivacyPageData } from "@/sanity/lib/fetchers";
import { PhoneConsultButton } from "@/components/shared/phone-consult-button";

const DEFAULT_TITLE = "隐私政策";
const DEFAULT_DESC =
  "了解天悦宝贝如何收集、使用和保护您的个人信息。";

export async function generateMetadata(): Promise<Metadata> {
  const { privacyPage, siteSettings } = await fetchPrivacyPageData();
  const seo = privacyPage?.seo;
  const fallback = siteSettings?.defaultSeo;

  return {
    title: seo?.metaTitle || DEFAULT_TITLE,
    description: seo?.metaDescription || DEFAULT_DESC,
    keywords: seo?.keywords || fallback?.keywords,
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || DEFAULT_TITLE,
      description: seo?.ogDescription || seo?.metaDescription || DEFAULT_DESC,
    },
    robots: seo?.noIndex ? "noindex" : "index, follow",
    ...(seo?.canonicalUrl && { alternates: { canonical: seo.canonicalUrl } }),
  };
}

export default async function PrivacyPage() {
  const { siteSettings, privacyPage } = await fetchPrivacyPageData();

  return (
    <>
      {/* Banner */}
      <PageBanner
        banners={privacyPage?.banners}
        defaultBanner={siteSettings?.defaultBanner}
      />

      {/* 正文 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              {privacyPage?.pageTitle || DEFAULT_TITLE}
            </h1>

            {privacyPage?.content && privacyPage.content.length > 0 ? (
              <div className="prose prose-lg max-w-none">
                <PortableTextRenderer content={privacyPage.content} />
              </div>
            ) : (
              <div className="space-y-6 text-foreground leading-relaxed">
                <h2 className="text-xl font-semibold mt-8 mb-3">
                  一、信息收集
                </h2>
                <p>
                  当您使用我们的咨询服务时，我们可能会收集以下信息：姓名、手机号码、微信号、所在城市以及您主动提供的咨询需求描述。我们不会收集身份证号、银行卡号等敏感个人信息。
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-3">
                  二、信息使用目的
                </h2>
                <p>
                  我们收集的信息仅用于以下目的：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>为您提供助孕咨询服务</li>
                  <li>与您取得联系，沟通服务方案</li>
                  <li>改善我们的服务质量</li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-3">
                  三、信息保存与保护
                </h2>
                <p>
                  您的信息将安全存储在我们的系统中，我们采取合理的技术和管理措施保护您的个人信息不被未经授权的访问、使用或泄露。
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-3">
                  四、您的权利
                </h2>
                <p>
                  您有权随时要求查阅、更正或删除我们持有的您的个人信息。如需行使上述权利，请通过以下方式联系我们。
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-3">
                  五、联系方式
                </h2>
                <p>
                  如您对本隐私政策有任何疑问，请通过以下方式联系我们：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    电话：
                    <PhoneConsultButton
                      phone={siteSettings?.phone || "400-123-4567"}
                      className="text-primary underline underline-offset-2 bg-transparent inline"
                      iconClassName="hidden"
                      label={siteSettings?.phone || "400-123-4567"}
                    />
                  </li>
                  <li>
                    服务时间：{siteSettings?.serviceHours || "周一至周日 9:00-18:00"}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
