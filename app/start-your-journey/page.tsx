import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "页面已迁移",
  description: "此页面已迁移至走进天悦宝贝。",
};

export default function StartJourneyRedirectPage() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-8">
            <Image
              src="/images/site/doctor-consultation.png"
              alt="顾问咨询服务"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            页面已迁移
          </h1>
          <p className="text-muted-foreground mb-8">
            此页面内容已迁移至&ldquo;走进天悦宝贝&rdquo;，请点击下方按钮前往。
          </p>
          <Link
            href="/about-tianyue"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors"
          >
            前往走进天悦宝贝
          </Link>
        </div>
      </div>
    </section>
  );
}
