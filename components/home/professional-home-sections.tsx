import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cardImageUrl, contentImageUrl } from "@/sanity/lib/image";
import type { HomePage, ImageWithAlt } from "@/types/sanity";

const defaults = {
  capabilities: [
    { title: "专业顾问团队", description: "基于家庭情况进行一对一需求评估与路径梳理" },
    { title: "全球医疗资源", description: "连接优质合作资源，为不同需求提供更多方案选择" },
    { title: "严谨方案管理", description: "明确阶段目标、关键节点与风险提示，全程持续跟进" },
  ],
  services: [
    {
      title: "三代试管婴儿",
      audience: "适合有遗传筛查与生育规划需求的家庭",
      description: "从前期评估到方案执行，提供专业路径咨询与资源对接。",
      buttonLink: "/third-generation-ivf",
      image: "/images/site/embryology-lab.png",
    },
    {
      title: "试管服务区域",
      audience: "适合希望比较不同地区方案的家庭",
      description: "了解不同地区的医疗资源、服务特点与规划重点。",
      buttonLink: "/ivf-services",
      image: "/images/site/hospital-corridor.png",
    },
    {
      title: "冻卵 / 冻精",
      audience: "适合希望提前保存生育力的人群",
      description: "提供周期准备、资源选择及后续使用路径的专业建议。",
      buttonLink: "/egg-sperm-freezing",
      image: "/images/site/microscope-workstation.png",
    },
    {
      title: "私人订制",
      audience: "适合需要专属服务与复杂方案的家庭",
      description: "围绕个体需求配置顾问、资源与全流程服务计划。",
      buttonLink: "/private-customization",
      image: "/images/site/doctor-consultation.png",
    },
  ],
};

function imageUrl(image: ImageWithAlt | undefined, fallback: string) {
  return image?.image
    ? contentImageUrl(image.image as unknown as Parameters<typeof contentImageUrl>[0])
    : fallback;
}

export function ProfessionalHomeSections({ homePage }: { homePage?: HomePage | null }) {
  const expertise = homePage?.expertiseSection;
  const services = homePage?.servicesSection;
  const items = services?.items?.filter((item) => item.isEnabled !== false).length
    ? services.items.filter((item) => item.isEnabled !== false)
    : defaults.services;

  return (
    <>
      {expertise?.isEnabled !== false && (
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="text-sm font-bold tracking-[.16em] text-[#3475ed]">
                {expertise?.eyebrow || "专业团队 · 科学规划"}
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#173b68] lg:text-[2.5rem]">
                {expertise?.title || homePage?.brandIntroTitle || "专业能力，体现在每一个服务细节"}
              </h2>
              <p className="mt-6 text-[15px] leading-8 text-[#53657f]">
                {expertise?.description ||
                  homePage?.brandIntroContent ||
                  "我们以专业顾问团队为核心，整合全球医疗与服务资源，通过系统化评估和个性化规划，帮助每个家庭更清晰地理解选择、更从容地推进计划。"}
              </p>
              <div className="mt-8 space-y-5">
                {(expertise?.capabilities?.length ? expertise.capabilities : defaults.capabilities)
                  .slice(0, 4)
                  .map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3475ed]" />
                      <div>
                        <h3 className="font-bold text-[#1a2e52]">{item.title}</h3>
                        {item.description && (
                          <p className="mt-1 text-sm leading-6 text-[#64748b]">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              <Link
                href={expertise?.buttonLink || "/about-tianyue"}
                className="mt-8 inline-flex items-center gap-2 font-bold text-[#2868df] transition hover:gap-3"
              >
                {expertise?.buttonText || "了解我们的专业团队"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid h-[470px] grid-cols-[1.12fr_.88fr] grid-rows-2 gap-3 sm:h-[560px] sm:gap-4">
              <figure className="group relative row-span-2 overflow-hidden rounded-[24px]">
                <Image
                  src={imageUrl(
                    expertise?.mainImage || homePage?.brandIntroImage,
                    "/images/site/care-team.png"
                  )}
                  alt={
                    expertise?.mainImage?.alt || homePage?.brandIntroImage?.alt || "专业顾问团队"
                  }
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:1024px) 55vw, 32vw"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071e3f]/85 to-transparent p-5 pt-16 text-sm font-bold text-white">
                  {expertise?.mainImage?.caption || "专业顾问团队"}
                </figcaption>
              </figure>
              <GalleryImage
                image={expertise?.secondaryImage}
                fallback="/images/site/embryology-lab.png"
                alt="实验室与技术资源"
                caption={expertise?.secondaryImage?.caption || "实验室与技术资源"}
              />
              <GalleryImage
                image={expertise?.tertiaryImage}
                fallback="/images/site/doctor-consultation.png"
                alt="一对一方案沟通"
                caption={expertise?.tertiaryImage?.caption || "一对一方案沟通"}
              />
            </div>
          </div>
        </section>
      )}

      {services?.isEnabled !== false && (
        <section className="bg-[#f2f6fb] py-16 lg:py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold tracking-[.16em] text-[#3475ed]">核心服务</p>
              <h2 className="mt-3 text-3xl font-bold text-[#173b68] lg:text-[2.35rem]">
                {services?.title || "快速找到适合您的服务方向"}
              </h2>
              <p className="mt-4 leading-7 text-[#64748b]">
                {services?.description ||
                  "从生育力保存到个性化辅助生育方案，专业顾问将根据您的实际情况提供清晰建议。"}
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {items.slice(0, 6).map((item, index) => {
                const local =
                  "image" in item && typeof item.image === "string" ? item.image : undefined;
                const sanityImage =
                  "image" in item && typeof item.image === "object" ? item.image : undefined;
                const src = sanityImage?.image
                  ? cardImageUrl(sanityImage.image as unknown as Parameters<typeof cardImageUrl>[0])
                  : local || defaults.services[index % defaults.services.length].image;
                return (
                  <article
                    key={`${item.title}-${index}`}
                    className="group overflow-hidden rounded-2xl bg-white shadow-[0_10px_35px_rgba(33,72,120,.08)] ring-1 ring-blue-100/70 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(33,72,120,.14)]"
                  >
                    <div className="relative aspect-[4/2.75] overflow-hidden">
                      <Image
                        src={src}
                        alt={sanityImage?.alt || item.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-[#173b68]">{item.title}</h3>
                      {item.audience && (
                        <p className="mt-2 text-xs font-semibold leading-5 text-[#3475ed]">
                          {item.audience}
                        </p>
                      )}
                      <p className="mt-3 text-sm leading-6 text-[#64748b]">{item.description}</p>
                      <Link
                        href={item.buttonLink || "/start-your-journey"}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#2868df]"
                      >
                        {("buttonText" in item && item.buttonText) || "了解服务"}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function GalleryImage({
  image,
  fallback,
  alt,
  caption,
}: {
  image?: ImageWithAlt;
  fallback: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="group relative overflow-hidden rounded-[20px]">
      <Image
        src={imageUrl(image, fallback)}
        alt={image?.alt || alt}
        fill
        className="object-cover transition duration-500 group-hover:scale-[1.04]"
        sizes="(max-width:1024px) 40vw, 22vw"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071e3f]/80 to-transparent p-4 pt-10 text-xs font-bold text-white sm:text-sm">
        {caption}
      </figcaption>
    </figure>
  );
}
