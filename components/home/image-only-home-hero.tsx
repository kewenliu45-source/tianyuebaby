import Image from "next/image";
import { bannerImageUrl } from "@/sanity/lib/image";
import type { ImageWithAlt } from "@/types/sanity";

export interface ImageOnlyHomeHeroProps {
  heroImage?: ImageWithAlt | null;
}

export function ImageOnlyHomeHero({ heroImage }: ImageOnlyHomeHeroProps) {
  const src = heroImage?.image
    ? bannerImageUrl(heroImage.image as unknown as Parameters<typeof bannerImageUrl>[0])
    : "/images/home-hero.png";
  const alt = heroImage?.alt || "天悦宝贝（国际）助孕中心首页横幅";

  return (
    <section
      className="relative h-[620px] overflow-hidden md:h-[700px] lg:h-[720px]"
      aria-label="天悦宝贝（国际）助孕中心首页横幅"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[64%_center] md:object-center"
        unoptimized
      />
    </section>
  );
}
