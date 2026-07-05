import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "海外生殖",
  description:
    "天悦宝贝为您提供海外辅助生殖咨询服务，覆盖美国、泰国、日本、格鲁吉亚等多个国家和地区的优质生殖医疗资源。",
};

export default function OverseasFertilityPage() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            海外生殖
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            不同国家和地区的辅助生殖政策、技术水平和医疗资源各有差异。天悦宝贝根据您的具体需求，为您筛选和推荐合适的海外生殖目的地与合作机构，并提供从咨询到出行的全流程支持。
          </p>
          <Link
            href="/start-your-journey"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors"
          >
            咨询详情
          </Link>
        </div>
      </div>
    </section>
  );
}
