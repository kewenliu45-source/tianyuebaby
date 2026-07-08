import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "开始咨询",
  description: "预约天悦宝贝专业咨询服务。",
};

export default function StartJourneyRedirectPage() {
  redirect("/about-tianyue#consultation-form");
}
