import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  ChevronDown,
  Users,
  Heart,
  Shield,
  Award,
  ClipboardCheck,
  Stethoscope,
  FileSearch,
  Building2,
  Clock,
  Headphones,
  Star,
  CheckCircle2,
} from "lucide-react";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { PhoneConsultButton } from "@/components/shared/phone-consult-button";
import { fetchThirdGenerationIvfPageData } from "@/sanity/lib/fetchers";
import { contentImageUrl, iconImageUrl } from "@/sanity/lib/image";
import type { ImageWithAlt } from "@/types/sanity";
import { buildPageMetadata } from "@/lib/social-metadata";

// ── 默认数据 ──

const DEFAULT_HERO = {
  title: "三代试管婴儿咨询与方案评估",
  subtitle: "科学评估，专业陪伴，帮助家庭更清晰地了解生育方案",
  description:
    "天悦宝贝为有需求的家庭提供第三代试管婴儿（PGT）相关的专业咨询服务，包括前期评估、资料整理、医疗资源匹配与全程流程陪伴。",
  primaryButtonText: "立即咨询",
  primaryButtonLink: "#consultation",
  secondaryButtonText: "了解服务流程",
  secondaryButtonLink: "#process",
  badges: ["专业顾问", "流程陪伴", "隐私保护"],
  formTitle: "免费咨询",
  formFields: ["姓名", "电话", "需求描述"],
  formButtonText: "提交咨询",
};

const DEFAULT_TRUST = [
  { value: "多年", label: "行业服务经验", description: "深耕辅助生殖咨询领域" },
  { value: "一对一", label: "顾问陪伴", description: "专属顾问全程跟进" },
  { value: "多地区", label: "合作医疗资源", description: "覆盖国内外优质机构" },
  { value: "严格", label: "隐私信息保护", description: "信息加密管理与保密机制" },
];

const DEFAULT_WHY_CHOOSE = {
  title: "为什么选择天悦宝贝",
  description: "我们专注于为家庭提供专业、合规、贴心的助孕咨询服务。",
  items: [
    { title: "个性化方案评估", description: "根据家庭情况、年龄、病史等因素，提供针对性的方案分析与建议。", icon: "clipboard" },
    { title: "专业顾问全程陪伴", description: "从初次咨询到流程结束，专属顾问提供持续的沟通与支持。", icon: "headphones" },
    { title: "医疗资源协调", description: "帮助家庭了解并对接合适的医疗资源，节省自行搜索的时间。", icon: "building" },
    { title: "隐私与信息保护", description: "严格的隐私保护机制，确保客户信息不被泄露。", icon: "shield" },
  ],
};

// 扩展默认数据类型以匹配 CMS 可选字段
type ServiceItem = { title: string; description: string; points: string[]; image?: ImageWithAlt };
type HospitalItem = { name: string; location: string; description: string; tags: string[]; image?: ImageWithAlt };
type ExpertItem = { name: string; title: string; description: string; specialties: string[]; avatar?: ImageWithAlt };
type CaseItem = { title: string; profile: string; summary: string; resultDescription: string; image?: ImageWithAlt };
type TestimonialItem = { displayName: string; profile: string; content: string; rating: number; avatar?: ImageWithAlt };
type ProcessStep = { stepNumber: number; title: string; description?: string; duration?: string; image?: ImageWithAlt };

const DEFAULT_IMAGES = {
  hero: "/images/site/embryology-lab.png",
  intro: "/images/site/microscope-workstation.png",
  whyChoose: "/images/site/doctor-consultation.png",
  process: "/images/site/documents-review.png",
  testimonial: "/images/site/newborn-family.png",
  cta: "/images/site/hospital-corridor.png",
  services: [
    "/images/site/doctor-consultation.png",
    "/images/site/microscope-workstation.png",
    "/images/site/documents-review.png",
    "/images/site/embryology-lab.png",
    "/images/site/care-team.png",
    "/images/site/hospital-corridor.png",
  ],
  hospitals: [
    "/images/site/clinic-reception.png",
    "/images/site/embryology-lab.png",
    "/images/site/hospital-corridor.png",
  ],
  experts: [
    "/images/site/care-team.png",
    "/images/site/doctor-consultation.png",
    "/images/site/documents-review.png",
  ],
  cases: [
    "/images/site/newborn-family.png",
    "/images/site/doctor-consultation.png",
    "/images/site/documents-review.png",
  ],
} as const;

const DEFAULT_INTRO = {
  title: "什么是第三代试管婴儿（PGT）",
  subtitle: "在胚胎移植前了解染色体或特定遗传风险",
  body: "第三代试管婴儿通常指胚胎植入前遗传学检测（PGT）。在体外受精形成胚胎后，实验室会在适当阶段取少量细胞进行检测，帮助医生了解胚胎的染色体情况，或判断是否携带特定遗传变异。\n\nPGT 并不适用于所有家庭，也不能保证妊娠结果。是否需要检测、采用哪一种检测方式，需要结合年龄、既往妊娠史、家族遗传病史和医生评估综合判断。",
  caption: "胚胎学实验室通过规范流程完成培养、取样与检测衔接",
  points: ["PGT-A：关注胚胎染色体数目", "PGT-M：针对已知单基因遗传病", "PGT-SR：适用于部分染色体结构异常"],
};

function cmsImageUrl(image: ImageWithAlt | undefined, fallback: string) {
  return image?.image
    ? contentImageUrl(image.image as unknown as Parameters<typeof contentImageUrl>[0])
    : fallback;
}

const DEFAULT_SERVICES = {
  title: "核心服务内容",
  description: "覆盖三代试管咨询全流程，帮助家庭系统了解方案。",
  items: [
    { title: "前期咨询评估", description: "了解家庭基本情况，评估是否适合了解三代试管方案。", points: ["一对一沟通", "病史资料初步分析", "方案可行性评估"] },
    { title: "三代试管知识解读", description: "帮助家庭理解 PGT/PGS/PGD 等技术概念与适用范围。", points: ["技术原理讲解", "适用人群说明", "常见疑问解答"] },
    { title: "检查资料整理", description: "协助整理前期检查报告，为医疗咨询做好准备。", points: ["检查清单梳理", "报告归档整理", "资料补充建议"] },
    { title: "医疗资源匹配", description: "根据需求推荐合适的医疗资源，帮助家庭做出知情选择。", points: ["资源信息汇总", "机构特点对比", "方案匹配建议"] },
    { title: "周期流程陪伴", description: "在治疗周期中提供持续的沟通与流程协调支持。", points: ["流程节点提醒", "沟通协调支持", "心理关怀"] },
    { title: "后续跟进支持", description: "治疗周期结束后，提供必要的后续咨询与关怀。", points: ["定期回访", "问题答疑", "后续方案建议"] },
  ] satisfies ServiceItem[],
};

const DEFAULT_HOSPITALS = {
  title: "合作医疗资源",
  description: "天悦宝贝与多地区优质医疗资源建立合作关系，为家庭提供更多选择。",
  items: [
    { name: "合作医疗资源 A", location: "中国大陆", description: "具备开展辅助生殖技术资质的专业医疗机构。", tags: ["三甲资质", "PGT 技术"] },
    { name: "合作医疗资源 B", location: "东南亚地区", description: "服务国际客户的辅助生殖医疗中心。", tags: ["国际服务", "多语言"] },
    { name: "合作医疗资源 C", location: "北美地区", description: "拥有先进实验室设备的生殖医学中心。", tags: ["先进技术", "高成功率"] },
  ] satisfies HospitalItem[],
};

const DEFAULT_EXPERTS = {
  title: "顾问团队",
  description: "由经验丰富的生殖咨询顾问组成，为家庭提供专业支持。",
  items: [
    { name: "资深生殖咨询顾问", title: "高级顾问", description: "拥有多年辅助生殖咨询经验，熟悉各类方案流程。", specialties: ["方案评估", "流程协调"] },
    { name: "医疗资源协调顾问", title: "资源顾问", description: "负责对接合作医疗资源，帮助家庭匹配合适机构。", specialties: ["资源匹配", "机构对接"] },
    { name: "客户服务顾问", title: "客服顾问", description: "提供日常沟通、答疑与心理支持服务。", specialties: ["客户关怀", "心理支持"] },
  ] satisfies ExpertItem[],
};

const DEFAULT_PROCESS = {
  title: "服务流程",
  description: "清晰的六步流程，让您了解每一步的内容。",
  steps: [
    { stepNumber: 1, title: "初步咨询", description: "通过电话或在线咨询，了解家庭基本情况与需求。", duration: "1-2 天" },
    { stepNumber: 2, title: "资料收集", description: "协助整理既往检查报告、病史等基础资料。", duration: "3-5 天" },
    { stepNumber: 3, title: "方案评估", description: "顾问团队分析资料，提供初步方案评估与建议。", duration: "5-7 天" },
    { stepNumber: 4, title: "医疗资源匹配", description: "根据评估结果，推荐合适的医疗资源供家庭参考。", duration: "3-5 天" },
    { stepNumber: 5, title: "周期流程陪伴", description: "在治疗周期中提供全程沟通协调与流程支持。", duration: "按周期" },
    { stepNumber: 6, title: "后续跟进", description: "周期结束后定期回访，提供后续咨询支持。", duration: "持续" },
  ],
};

const DEFAULT_CASES = {
  title: "咨询案例参考",
  description: "以下案例仅供参考，已做去隐私化处理，不构成任何承诺。",
  items: [
    { title: "高龄备孕家庭的方案评估", profile: "高龄备孕家庭", summary: "一对 40+ 夫妻，经过多次自然受孕未果，通过咨询了解了三代试管的适用性与流程。", resultDescription: "顾问帮助整理了既往检查资料，并匹配了适合的医疗资源进行进一步评估。" },
    { title: "多次失败后的重新评估", profile: "多次尝试后寻求新方案", summary: "家庭曾有辅助生殖经历但未达预期，希望重新评估方案选择。", resultDescription: "通过系统梳理既往资料，顾问提供了不同角度的方案分析与建议。" },
    { title: "初次了解三代试管的家庭", profile: "初次咨询家庭", summary: "对三代试管技术不了解的家庭，通过咨询系统学习了相关知识。", resultDescription: "顾问详细讲解了技术原理、适用范围与注意事项，帮助家庭做出知情决策。" },
  ] satisfies CaseItem[],
};

const DEFAULT_TESTIMONIALS = {
  title: "客户反馈",
  description: "来自咨询家庭的真实反馈（已做匿名处理）。",
  items: [
    { displayName: "匿名客户 A", profile: "咨询家庭", content: "顾问非常耐心，帮我们梳理了很多之前不了解的信息，让我们对方案有了更清晰的认识。", rating: 5 },
    { displayName: "匿名客户 B", profile: "咨询家庭", content: "整个咨询过程很专业，没有压力感，顾问会根据我们的实际情况给出建议。", rating: 5 },
    { displayName: "匿名客户 C", profile: "咨询家庭", content: "感谢顾问的全程陪伴，从资料整理到对接医疗资源，每一步都很清晰。", rating: 4 },
  ] satisfies TestimonialItem[],
};

const DEFAULT_FAQ = {
  title: "常见问题",
  description: "关于三代试管婴儿咨询的常见疑问。",
  items: [
    { question: "什么是第三代试管婴儿？", answer: "第三代试管婴儿技术（PGT）是在胚胎移植前对胚胎进行遗传学检测的技术，主要目的是筛选出染色体正常或不携带特定遗传疾病的胚胎进行移植。它适用于有遗传病风险、高龄、反复流产等情况的家庭。" },
    { question: "哪些家庭适合了解三代试管？", answer: "以下情况的家庭可以考虑了解：有遗传病家族史、女方年龄较大（35 岁以上）、多次试管婴儿失败、反复自然流产、染色体异常等。具体是否适合需要由医疗专业人员评估。" },
    { question: "PGT 检测是否适合所有人？", answer: "PGT 并非适用于所有人。它主要针对有特定医学指征的家庭。是否需要进行 PGT 检测，应由生殖医学专家根据具体情况评估决定。" },
    { question: "咨询前需要准备哪些资料？", answer: "建议准备：夫妻双方的体检报告、既往生育相关检查结果、病史资料、身份信息等。具体清单顾问会在初次沟通时详细说明。" },
    { question: "服务过程中如何保护隐私？", answer: "天悦宝贝采用严格的信息管理机制，所有客户资料加密存储，仅限专属顾问访问。未经客户授权，不会向任何第三方披露个人信息。" },
    { question: "如何开始咨询？", answer: "您可以通过页面上的在线咨询表单、拨打客服电话或添加微信客服开始咨询。顾问会在 24 小时内与您取得联系。" },
  ],
};

const DEFAULT_FINAL_CTA = {
  title: "开始了解三代试管婴儿方案",
  description: "专业的咨询顾问随时为您服务，帮助您更清晰地了解生育方案选择。",
  primaryButtonText: "立即咨询",
  primaryButtonLink: "#consultation",
  secondaryButtonText: "了解服务流程",
  secondaryButtonLink: "#process",
};

// ── Icon 映射 ──

function getIcon(name?: string) {
  switch (name) {
    case "clipboard": return <ClipboardCheck className="w-6 h-6" />;
    case "headphones": return <Headphones className="w-6 h-6" />;
    case "building": return <Building2 className="w-6 h-6" />;
    case "shield": return <Shield className="w-6 h-6" />;
    case "users": return <Users className="w-6 h-6" />;
    case "heart": return <Heart className="w-6 h-6" />;
    case "award": return <Award className="w-6 h-6" />;
    case "stethoscope": return <Stethoscope className="w-6 h-6" />;
    case "file": return <FileSearch className="w-6 h-6" />;
    case "clock": return <Clock className="w-6 h-6" />;
    default: return <CheckCircle2 className="w-6 h-6" />;
  }
}

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  const { thirdGenerationIvfPage: p, siteSettings } =
    await fetchThirdGenerationIvfPageData();
  const seo = p?.seo;
  return buildPageMetadata({
    title: p?.pageTitle || "三代试管婴儿咨询与方案评估 | 天悦宝贝",
    description:
      p?.pageDescription ||
      DEFAULT_HERO.description,
    pathname: "/third-generation-ivf",
    seo,
    siteSettings,
    image: p?.heroImage?.image,
    imageAlt: p?.heroImage?.alt,
  });
}

// ── Page Component ──

export default async function ThirdGenerationIvfPage() {
  const { siteSettings, thirdGenerationIvfPage: p } =
    await fetchThirdGenerationIvfPageData();

  const phone = siteSettings?.phone || "400-123-4567";

  // 合并 CMS 数据与默认值
  const hero = {
    title: p?.heroTitle || DEFAULT_HERO.title,
    subtitle: p?.heroSubtitle || DEFAULT_HERO.subtitle,
    description: p?.heroDescription || DEFAULT_HERO.description,
    primaryButtonText: p?.heroPrimaryButtonText || DEFAULT_HERO.primaryButtonText,
    primaryButtonLink: p?.heroPrimaryButtonLink || DEFAULT_HERO.primaryButtonLink,
    secondaryButtonText: p?.heroSecondaryButtonText || DEFAULT_HERO.secondaryButtonText,
    secondaryButtonLink: p?.heroSecondaryButtonLink || DEFAULT_HERO.secondaryButtonLink,
    badges: p?.heroBadges?.length ? p.heroBadges : DEFAULT_HERO.badges,
    formTitle: p?.heroFormTitle || DEFAULT_HERO.formTitle,
    formButtonText: p?.heroFormButtonText || DEFAULT_HERO.formButtonText,
  };

  const trustItems = p?.trustItems?.length ? p.trustItems : DEFAULT_TRUST;
  const whyChoose = {
    title: p?.whyChooseTitle || DEFAULT_WHY_CHOOSE.title,
    description: p?.whyChooseDescription || DEFAULT_WHY_CHOOSE.description,
    items: p?.whyChooseItems?.length ? p.whyChooseItems : DEFAULT_WHY_CHOOSE.items,
  };
  const intro = {
    title: p?.introTitle || DEFAULT_INTRO.title,
    subtitle: p?.introSubtitle || DEFAULT_INTRO.subtitle,
    body: p?.introBody || DEFAULT_INTRO.body,
    image: p?.introImage,
    caption: p?.introImageCaption || p?.introImage?.caption || DEFAULT_INTRO.caption,
    points: p?.introPoints?.length ? p.introPoints : DEFAULT_INTRO.points,
  };
  const serviceItems: ServiceItem[] = p?.serviceItems?.length ? p.serviceItems as ServiceItem[] : DEFAULT_SERVICES.items;
  const services = {
    title: p?.servicesTitle || DEFAULT_SERVICES.title,
    description: p?.servicesDescription || DEFAULT_SERVICES.description,
    items: serviceItems,
  };
  const hospitalItems: HospitalItem[] = p?.hospitalItems?.length ? p.hospitalItems as HospitalItem[] : DEFAULT_HOSPITALS.items;
  const hospitals = {
    title: p?.hospitalsTitle || DEFAULT_HOSPITALS.title,
    description: p?.hospitalsDescription || DEFAULT_HOSPITALS.description,
    items: hospitalItems,
  };
  const expertItems: ExpertItem[] = p?.expertItems?.length ? p.expertItems as ExpertItem[] : DEFAULT_EXPERTS.items;
  const experts = {
    title: p?.expertsTitle || DEFAULT_EXPERTS.title,
    description: p?.expertsDescription || DEFAULT_EXPERTS.description,
    items: expertItems,
  };
  const process = {
    title: p?.processTitle || DEFAULT_PROCESS.title,
    description: p?.processDescription || DEFAULT_PROCESS.description,
    steps: (p?.processSteps?.length ? p.processSteps : DEFAULT_PROCESS.steps) as ProcessStep[],
  };
  const caseItems: CaseItem[] = p?.caseItems?.length ? p.caseItems as CaseItem[] : DEFAULT_CASES.items;
  const cases = {
    title: p?.casesTitle || DEFAULT_CASES.title,
    description: p?.casesDescription || DEFAULT_CASES.description,
    items: caseItems,
  };
  const testimonialItems: TestimonialItem[] = p?.testimonialItems?.length ? p.testimonialItems as TestimonialItem[] : DEFAULT_TESTIMONIALS.items;
  const testimonials = {
    title: p?.testimonialsTitle || DEFAULT_TESTIMONIALS.title,
    description: p?.testimonialsDescription || DEFAULT_TESTIMONIALS.description,
    items: testimonialItems,
  };
  const faq = {
    title: p?.faqTitle || DEFAULT_FAQ.title,
    description: p?.faqDescription || DEFAULT_FAQ.description,
    items: p?.faqItems?.length ? p.faqItems : DEFAULT_FAQ.items,
  };
  const finalCta = {
    title: p?.finalCtaTitle || DEFAULT_FINAL_CTA.title,
    description: p?.finalCtaDescription || DEFAULT_FINAL_CTA.description,
    primaryButtonText: p?.finalCtaPrimaryButtonText || DEFAULT_FINAL_CTA.primaryButtonText,
    primaryButtonLink: p?.finalCtaPrimaryButtonLink || DEFAULT_FINAL_CTA.primaryButtonLink,
    secondaryButtonText: p?.finalCtaSecondaryButtonText || DEFAULT_FINAL_CTA.secondaryButtonText,
    secondaryButtonLink: p?.finalCtaSecondaryButtonLink || DEFAULT_FINAL_CTA.secondaryButtonLink,
  };
  const heroImageUrl = cmsImageUrl(p?.heroImage, DEFAULT_IMAGES.hero);
  const mobileHeroImageUrl = cmsImageUrl(p?.mobileHeroImage, DEFAULT_IMAGES.hero) || heroImageUrl;

  return (
    <>
      {/* FAQ 结构化数据 */}
      {faq.items.length > 0 && (
        <FaqJsonLd
          items={faq.items.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))}
        />
      )}

      {/* ════════════════════════════════════════
          1. Hero Banner
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 500 }}>
        {heroImageUrl ? (
          <picture>
            <source media="(max-width: 767px)" srcSet={mobileHeroImageUrl} />
            <Image
              src={heroImageUrl}
              alt={p?.heroImage?.alt || hero.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </picture>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0fe] via-white to-[#f0f6ff]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,37,72,0.85)] via-[rgba(26,58,107,0.75)] to-[rgba(26,58,107,0.6)]" />

        <div
          className="container relative mx-auto max-w-[1200px] px-4 lg:px-8 py-16 lg:py-20 flex flex-col justify-center"
          style={{ minHeight: 500 }}
        >
          {/* 面包屑 */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              首页
            </Link>
            <span>/</span>
            <span className="text-white/90 font-medium">三代试管婴儿</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4">
              {hero.title}
            </h1>
            <p className="text-lg text-blue-200 mb-3">{hero.subtitle}</p>
            <p className="text-[15px] text-white/70 leading-relaxed mb-8">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <PhoneConsultButton
                phone={phone}
                className="rounded-lg bg-white px-7 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
                iconClassName="w-4 h-4"
                label={hero.primaryButtonText}
              />
              <Link
                href={hero.secondaryButtonLink}
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {hero.secondaryButtonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 三代试管科普 */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-4 lg:grid-cols-[1.02fr_.98fr] lg:gap-14 lg:px-8">
          <div className="order-2 lg:order-1">
            <div className="mb-5 border-l-4 border-[#2563eb] pl-5">
              <h2 className="text-2xl font-bold text-[#173b68] md:text-3xl">{intro.title}</h2>
              <p className="mt-2 text-[#4b6fa8]">{intro.subtitle}</p>
            </div>
            <div className="space-y-5 text-[16px] leading-[1.9] text-[#4d617d]">
              {intro.body.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {intro.points.map((point) => (
                <div key={point} className="flex items-start gap-2 border-t-2 border-blue-100 pt-3 text-sm font-semibold text-[#173b68]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" />
                  {point}
                </div>
              ))}
            </div>
          </div>
          <figure className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={cmsImageUrl(intro.image, DEFAULT_IMAGES.intro)}
                alt={intro.image?.alt || "胚胎学实验室显微镜观察工作场景"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
            <figcaption className="mt-3 text-sm text-[#6f8098]">{intro.caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. Trust Bar
      ════════════════════════════════════════ */}
      <section className="bg-white border-y border-blue-100/60">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustItems.map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-[#2563eb] mb-1">
                  {item.value}
                </p>
                <p className="text-sm font-semibold text-[#173b68]">{item.label}</p>
                {item.description && (
                  <p className="text-xs text-[#8a9bb5] mt-1">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. 为什么选择我们
      ════════════════════════════════════════ */}
      <section className="bg-[#f4f8fc] py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {whyChoose.title}
            </h2>
            <p className="text-[#5a6d8a]">{whyChoose.description}</p>
          </div>
          <div className="grid items-stretch gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative min-h-[360px] overflow-hidden rounded-lg lg:min-h-full">
              <Image
                src={cmsImageUrl(p?.whyChooseImage, DEFAULT_IMAGES.whyChoose)}
                alt={p?.whyChooseImage?.alt || "生殖医学顾问与家庭沟通方案"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg border border-blue-100 bg-blue-100 sm:grid-cols-2">
              {whyChoose.items.map((item, i) => (
                <div key={i} className="bg-white p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[#2563eb]">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="mb-2 font-semibold text-[#173b68]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#5a6d8a]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. 核心服务
      ════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {services.title}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">{services.description}</p>
          </div>
          <div className="space-y-8">
            {services.items.map((item, i) => (
              <div
                key={i}
                className="grid overflow-hidden rounded-lg border border-blue-100 bg-[#f8fbff] lg:grid-cols-2"
              >
                <div className={`relative min-h-[260px] ${i % 2 ? "lg:order-2" : ""}`}>
                  <Image
                    src={cmsImageUrl(item.image, DEFAULT_IMAGES.services[i % DEFAULT_IMAGES.services.length])}
                    alt={item.image?.alt || `${item.title}相关医疗服务场景`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 lg:p-10">
                  <span className="mb-4 text-sm font-bold text-[#2563eb]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mb-3 text-xl font-bold text-[#173b68]">{item.title}</h3>
                  <p className="mb-5 text-[15px] leading-relaxed text-[#5a6d8a]">{item.description}</p>
                  {item.points && item.points.length > 0 && (
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {item.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#4b6fa8]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5. 合作医院
      ════════════════════════════════════════ */}
      <section className="bg-[#f8fbff] py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {hospitals.title}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">{hospitals.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.items.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-blue-100/60"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={cmsImageUrl(item.image, DEFAULT_IMAGES.hospitals[i % DEFAULT_IMAGES.hospitals.length])}
                    alt={item.image?.alt || `${item.name}医疗环境`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-1 font-semibold text-[#173b68]">{item.name}</h3>
                  {item.location && <p className="mb-2 text-xs text-[#2563eb]">{item.location}</p>}
                  <p className="mb-3 text-sm leading-relaxed text-[#5a6d8a]">{item.description}</p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => <span key={tag} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-[#2563eb]">{tag}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          6. 专家团队
      ════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {experts.title}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">{experts.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.items.map((item, i) => (
              <div
                key={i}
                className="bg-[#f8fbff] rounded-xl p-6 text-center ring-1 ring-blue-100/60"
              >
                <div className="relative mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full">
                  <Image
                    src={cmsImageUrl(item.avatar, DEFAULT_IMAGES.experts[i % DEFAULT_IMAGES.experts.length])}
                    alt={item.avatar?.alt || `${item.name}专业形象`}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <h3 className="font-semibold text-[#173b68] mb-1">{item.name}</h3>
                {item.title && (
                  <p className="text-xs text-[#2563eb] mb-2">{item.title}</p>
                )}
                <p className="text-sm text-[#5a6d8a] leading-relaxed mb-3">
                  {item.description}
                </p>
                {item.specialties && item.specialties.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {item.specialties.map((s) => (
                      <span
                        key={s}
                        className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-[#2563eb]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          7. 服务流程
      ════════════════════════════════════════ */}
      <section id="process" className="bg-[#f8fbff] py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {process.title}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">{process.description}</p>
          </div>
          <div className="relative mb-10 aspect-[16/7] min-h-[260px] overflow-hidden rounded-lg">
            <Image
              src={cmsImageUrl(p?.processImage, DEFAULT_IMAGES.process)}
              alt={p?.processImage?.alt || "顾问团队整理医学资料并规划服务流程"}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-blue-200 md:block" />
            <div className="space-y-5">
              {process.steps.map((step) => (
                <div key={step.stepNumber} className="relative flex gap-6">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white font-bold text-sm shadow-md shadow-blue-600/20">
                    {step.stepNumber}
                  </div>
                  <div className="flex-1 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-blue-100/60 md:flex">
                    {step.image?.image && (
                      <div className="relative min-h-[150px] md:w-52 md:shrink-0">
                        <Image src={cmsImageUrl(step.image, DEFAULT_IMAGES.process)} alt={step.image.alt || step.title} fill className="object-cover" sizes="208px" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold text-[#173b68]">{step.title}</h3>
                        {step.duration && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-[#8a9bb5]">{step.duration}</span>}
                      </div>
                      <p className="text-sm leading-relaxed text-[#5a6d8a]">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          8. 真实案例
      ════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {cases.title}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">{cases.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.items.map((item, i) => (
              <div
                key={i}
                className="bg-[#f8fbff] rounded-xl p-6 ring-1 ring-blue-100/60"
              >
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={cmsImageUrl(item.image, DEFAULT_IMAGES.cases[i % DEFAULT_IMAGES.cases.length])}
                    alt={item.image?.alt || `${item.title}匿名案例场景`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-semibold text-[#173b68] mb-2">{item.title}</h3>
                {item.profile && (
                  <span className="inline-block text-xs text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-full mb-3">
                    {item.profile}
                  </span>
                )}
                <p className="text-sm text-[#5a6d8a] leading-relaxed mb-3">
                  {item.summary}
                </p>
                {item.resultDescription && (
                  <p className="text-xs text-[#4b6fa8] border-t border-blue-100 pt-3">
                    {item.resultDescription}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          9. 客户评价
      ════════════════════════════════════════ */}
      <section className="bg-[#f8fbff] py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {testimonials.title}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">{testimonials.description}</p>
          </div>
          <div className="grid items-stretch gap-8 lg:grid-cols-[.92fr_1.08fr]">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg">
              <Image
                src={cmsImageUrl(p?.testimonialsImage, DEFAULT_IMAGES.testimonial)}
                alt={p?.testimonialsImage?.alt || "家庭与新生儿的温暖生活场景"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="space-y-4">
            {testimonials.items.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 shadow-sm ring-1 ring-blue-100/60"
              >
                {/* 评分 */}
                {item.rating && (
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-4 h-4 ${j < item.rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                )}
                <p className="text-sm text-[#5a6d8a] leading-relaxed mb-4">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  {item.avatar?.image ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={iconImageUrl(item.avatar.image as unknown as Parameters<typeof iconImageUrl>[0])}
                        alt={item.avatar.alt || item.displayName || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-[#2563eb]">
                      {(item.displayName || "客")[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[#173b68]">
                      {item.displayName || "匿名客户"}
                    </p>
                    {item.profile && (
                      <p className="text-xs text-[#8a9bb5]">{item.profile}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          10. FAQ
      ════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {faq.title}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">{faq.description}</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faq.items.map((item, i) => (
              <details key={i} className="bg-[#f8fbff] rounded-xl overflow-hidden group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <h3 className="font-semibold text-[#173b68] pr-4 text-[15px]">
                    {item.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-[#8a9bb5] flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-[#5a6d8a] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          11. 最终 CTA
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#102c50] py-16 lg:py-24">
        <Image
          src={cmsImageUrl(p?.finalCtaBackgroundImage, DEFAULT_IMAGES.cta)}
          alt={p?.finalCtaBackgroundImage?.alt || "现代医疗中心走廊环境"}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(16,44,80,0.82)]" />
        <div className="container relative mx-auto max-w-[1180px] px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {finalCta.title}
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8">
            {finalCta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PhoneConsultButton
              phone={phone}
              className="rounded-lg bg-white px-8 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
              iconClassName="w-4 h-4"
              label={finalCta.primaryButtonText}
            />
            <Link
              href={finalCta.secondaryButtonLink}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {finalCta.secondaryButtonText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
