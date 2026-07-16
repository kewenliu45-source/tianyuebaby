import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { fetchStartJourneyPageData } from "@/sanity/lib/fetchers";
import { buildPageMetadata, getBannerShareImage } from "@/lib/social-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { startJourney, siteSettings } = await fetchStartJourneyPageData();

  return buildPageMetadata({
    title: "开始咨询",
    description: "预约天悦宝贝专业咨询服务。",
    pathname: "/start-your-journey",
    seo: startJourney?.seo,
    siteSettings,
    image: getBannerShareImage(startJourney?.banners),
  });
}

export default function StartJourneyRedirectPage() {
  redirect("/about-tianyue#consultation-form");
}
