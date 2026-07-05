import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  ChevronDown,
  Clock,
  User,
  Calendar,
  MessageCircle,
  Shield,
  Heart,
  CheckCircle2,
  ExternalLink,
  MapPin,
  FileSearch,
  Stethoscope,
  Scale,
  Users,
} from "lucide-react";
import { ConsultationForm } from "@/components/shared/consultation-form";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { fetchThirdPartyAssistedReproductionPageData } from "@/sanity/lib/fetchers";
import { contentImageUrl, bannerImageUrl } from "@/sanity/lib/image";
import type {
  ThirdPartyAssistedReproductionPage,
  ImageWithAlt,
} from "@/types/sanity";

// ── 默认 SEO ──

const DEFAULT_SEO = {
  title: "第三方辅助生殖咨询与海外合法方案评估 | 天悦宝贝",
  description:
    "天悦宝贝提供第三方辅助生殖专业咨询服务，涵盖海外合法合规辅助生殖方案、志愿者资源匹配咨询、医学评估、胚胎检测、孕期管理与全程流程陪伴，帮助家庭在充分了解信息的基础上做出知情决策。",
};

// ── 默认 Hero ──

const DEFAULT_HERO = {
  title: "第三方辅助生殖咨询与海外合法方案评估",
  subtitle:
    "合法合规 · 专业评估 · 一对一顾问陪伴，帮助家庭了解海外辅助生殖方案与流程",
  description:
    "天悦宝贝为有特殊生育需求的家庭提供第三方辅助生殖相关的专业咨询服务，包括前期医学评估、海外合法合规方案解读、志愿者资源匹配咨询、试管周期流程说明与全程陪伴。我们致力于帮助每位客户在充分了解信息的基础上，结合医生的专业判断做出适合自身情况的决定。",
  primaryButtonText: "立即咨询",
  primaryButtonLink: "#consultation",
  secondaryButtonText: "预约方案评估",
  secondaryButtonLink: "#content-start",
};

// ── 默认目录 ──

const DEFAULT_TOC = [
  { title: "什么是第三方辅助生殖", anchor: "what-is-third-party" },
  { title: "哪些家庭适合了解", anchor: "suitable-for" },
  { title: "合法合规为什么重要", anchor: "legal-compliance" },
  { title: "服务流程", anchor: "service-process" },
  { title: "医学评估与资料准备", anchor: "medical-evaluation" },
  { title: "第三方资源匹配", anchor: "resource-matching" },
  { title: "海外国家与机构选择", anchor: "overseas-options" },
  { title: "周期管理与陪伴", anchor: "cycle-management" },
  { title: "案例参考", anchor: "cases" },
  { title: "常见问题", anchor: "faq" },
];

// ── 默认正文模块 ──

const DEFAULT_CONTENT_BLOCKS: NonNullable<
  ThirdPartyAssistedReproductionPage["contentBlocks"]
> = [
  // ① 什么是第三方辅助生殖 — textImage
  {
    blockType: "textImage",
    anchor: "what-is-third-party",
    title: "什么是第三方辅助生殖",
    subtitle: "了解第三方辅助生殖的基本概念与适用范围",
    body: "第三方辅助生殖是指在合法合规的地区，借助经过医学评估的志愿者资源（如卵子志愿者、孕母志愿者等），为有特殊生育需求的家庭提供辅助生殖支持的综合服务模式。这一方式主要面向因身体条件限制无法自行完成妊娠过程的家庭。\n\n在不同国家和地区，第三方辅助生殖的法律框架、适用条件和操作规范存在显著差异。天悦宝贝的角色是为家庭提供信息咨询、方案评估和流程陪伴服务，而非直接实施医疗操作。我们会帮助您了解不同地区的合法合规要求，并协助您与具备资质的海外医疗团队和法律团队进行沟通。\n\n需要特别强调的是，第三方辅助生殖涉及医学、法律、伦理等多个层面，每个家庭的情况各不相同。是否适合这一方案，需要由专业医生根据您的身体状况进行综合评估，并在充分了解当地法律法规的前提下做出知情决策。",
    imagePosition: "right",
    cardTone: "blue",
  },
  // ② 适用人群 — infoCard
  {
    blockType: "infoCard",
    anchor: "suitable-for",
    title: "哪些家庭适合了解第三方辅助生殖",
    subtitle:
      "以下情况的家庭可以考虑了解，具体是否适合需由专业医生评估",
    items: [
      {
        title: "因医学原因无法自行妊娠的家庭",
        description:
          "因先天性无子宫、子宫发育异常或子宫切除等原因无法自行完成妊娠过程的家庭，可在合法合规地区了解第三方辅助生殖方案。",
        icon: "heart",
      },
      {
        title: "子宫相关疾病或手术史人群",
        description:
          "患有严重子宫腺肌症、子宫内膜异位症、多次宫腔粘连手术史等，经医生评估妊娠风险较高的家庭。",
        icon: "stethoscope",
      },
      {
        title: "多次试管失败后需要重新评估的家庭",
        description:
          "经历多次试管婴儿周期未能成功，经医生评估后建议了解其他辅助生殖途径的家庭。建议先系统回顾既往资料，明确失败原因。",
        icon: "file",
      },
      {
        title: "高龄或卵巢功能下降家庭",
        description:
          "年龄较大或卵巢储备功能明显下降，自行促排获卵困难的家庭。医生可能会根据情况建议考虑卵子志愿者等方案。",
        icon: "clock",
      },
      {
        title: "有遗传病风险、需要胚胎检测的家庭",
        description:
          "夫妻双方或一方携带已知遗传病基因，需要通过 PGT（胚胎植入前遗传学检测）筛选健康胚胎的家庭。",
        icon: "shield",
      },
      {
        title: "希望了解海外合法方案的家庭",
        description:
          "对海外辅助生殖政策、流程和服务感兴趣，希望获取专业信息咨询和方案比较的家庭。不同地区政策差异较大，建议详细了解。",
        icon: "scale",
      },
    ],
    cardTone: "blue",
  },
  // ③ 合法合规 — textImage
  {
    blockType: "textImage",
    anchor: "legal-compliance",
    title: "合法合规为什么重要",
    subtitle: "了解第三方辅助生殖的法律框架与合规要求",
    body: "第三方辅助生殖涉及复杂的法律、伦理和社会问题，不同国家和地区的法律规定差异显著。在某些国家（如美国部分州、乌克兰、格鲁吉亚等），第三方辅助生殖在特定法律框架下是被允许和规范的；而在许多其他国家和地区，这一服务可能受到严格限制或明确禁止。\n\n合法合规是第三方辅助生殖的首要前提。选择在法律明确支持的地区开展相关流程，可以更好地保障各方权益，包括意向父母的亲权确认、志愿者的权益保护，以及未来孩子的法律身份。\n\n天悦宝贝在咨询服务中会重点帮助家庭了解以下内容：目标地区的法律法规要求、志愿者筛选标准和保护措施、合同和法律文件的基本框架、亲权确认流程、以及可能涉及的跨国法律问题。我们建议家庭在做出任何决定前，务必充分了解相关法律信息，并在专业律师的指导下完成法律文件的签署。",
    imagePosition: "left",
    cardTone: "blue",
  },
  // ④ 服务流程 — processTimeline
  {
    blockType: "processTimeline",
    anchor: "service-process",
    title: "第三方辅助生殖服务流程",
    subtitle: "了解从咨询到完成的完整服务流程",
    items: [
      {
        title: "初步咨询与需求了解",
        description:
          "通过线上或线下方式与顾问沟通，了解您的基本情况、生育需求和顾虑。顾问会介绍第三方辅助生殖的基本概念、适用条件和大致流程，帮助您初步判断是否需要进一步了解。",
        icon: "message",
      },
      {
        title: "资料收集与整理",
        description:
          "协助您收集和整理既往的医疗检查报告、病史资料、治疗记录等。这些资料是后续医学评估和方案制定的重要基础。",
        icon: "file",
      },
      {
        title: "医学评估与方案建议",
        description:
          "由合作的生殖医学专家根据您的资料进行评估，判断是否适合第三方辅助生殖，并提供初步的方案建议。评估内容包括身体状况、生育史、遗传风险等。",
        icon: "stethoscope",
      },
      {
        title: "合法合规方案说明",
        description:
          "详细介绍不同国家和地区的法律政策、适用条件和流程差异，帮助您了解在哪些地区可以合法开展第三方辅助生殖，以及各地区的具体要求。",
        icon: "scale",
      },
      {
        title: "海外机构与志愿者资源匹配咨询",
        description:
          "根据您的需求和选择的地区，介绍合作的海外医疗机构和志愿者资源库的基本情况，包括机构资质、志愿者筛选标准、匹配流程等信息。",
        icon: "users",
      },
      {
        title: "试管周期准备与协调",
        description:
          "协助您与海外医疗团队沟通，了解试管周期的具体安排，包括促排卵方案、取卵/取精安排、胚胎培养计划等。顾问会协助处理行程和沟通事宜。",
        icon: "clock",
      },
      {
        title: "胚胎培养与遗传学检测",
        description:
          "了解胚胎培养过程和 PGT（胚胎植入前遗传学检测）的基本原理、适用范围和检测流程。检测结果由医疗团队解读，顾问协助沟通。",
        icon: "shield",
      },
      {
        title: "移植与孕期管理",
        description:
          "了解胚胎移植的基本流程和孕期管理安排。在合法合规地区，医疗团队会提供专业的孕期监测和支持。顾问会协助您了解孕期进展和相关安排。",
        icon: "heart",
      },
      {
        title: "后续沟通与持续支持",
        description:
          "在流程完成后，顾问会继续提供沟通支持，协助您了解后续的亲权确认、回国手续等事宜。如有后续需求，也可随时联系顾问。",
        icon: "check",
      },
    ],
    cardTone: "blue",
  },
  // ⑤ 医学评估 — infoCard
  {
    blockType: "infoCard",
    anchor: "medical-evaluation",
    title: "医学评估与资料准备",
    subtitle: "充分的前期评估和资料准备是了解方案的基础",
    items: [
      {
        title: "基础生育力检查",
        description:
          "包括激素六项、AMH 检测、超声检查、精液分析等，评估夫妻双方的生育能力和身体状况。这些检查结果是医生判断适用性的重要依据。",
        icon: "stethoscope",
      },
      {
        title: "既往病史与治疗记录",
        description:
          "整理既往的生育相关病史、手术记录、试管婴儿周期记录等。详细的病史资料有助于医生更全面地了解情况，避免重复检查。",
        icon: "file",
      },
      {
        title: "遗传学检查与评估",
        description:
          "如有遗传病家族史或已知遗传风险，建议进行遗传学咨询和相关检测。检测结果会影响是否需要进行胚胎遗传学检测（PGT）以及检测方案的选择。",
        icon: "shield",
      },
      {
        title: "心理评估与准备",
        description:
          "第三方辅助生殖对家庭的心理影响较大，建议在开始流程前进行心理咨询和评估。部分海外机构会要求意向父母完成心理评估。",
        icon: "heart",
      },
    ],
    cardTone: "blue",
  },
  // ⑥ 第三方资源匹配 — textImage
  {
    blockType: "textImage",
    anchor: "resource-matching",
    title: "第三方志愿者资源匹配",
    subtitle: "了解志愿者筛选标准和匹配流程",
    body: "在合法合规的地区，第三方辅助生殖的志愿者（包括卵子志愿者和孕母志愿者）需要经过严格的医学和心理筛选。不同地区和机构的筛选标准可能有所不同，但通常包括以下方面：年龄范围、身体健康检查、传染病筛查、心理健康评估、遗传病筛查等。\n\n天悦宝贝在咨询服务中会帮助您了解以下内容：合作机构的志愿者筛选标准和流程、志愿者的基本信息（在法律允许的范围内）、匹配的时间预期和流程安排、以及志愿者权益保护的相关措施。\n\n需要说明的是，志愿者资源的可用性和匹配时间受多种因素影响，包括所在地区、志愿者库规模、您的具体需求等。顾问会根据您的情况提供预期时间的参考，但无法保证具体的匹配时间。我们建议您在充分了解匹配流程和时间预期的基础上做出决定。",
    imagePosition: "right",
    cardTone: "blue",
  },
  // ⑦ 海外国家选择 — textImage
  {
    blockType: "textImage",
    anchor: "overseas-options",
    title: "海外国家与机构选择",
    subtitle: "了解不同国家的政策特点和机构资质",
    body: "不同国家对第三方辅助生殖的法律政策、医疗水平和服务模式存在显著差异。天悦宝贝可为您提供多个海外目的地的信息咨询，包括美国、乌克兰、格鲁吉亚、哥伦比亚等地的相关政策、医疗资源和服务流程。\n\n在选择海外目的地时，建议综合考虑以下因素：当地法律是否明确支持第三方辅助生殖、法律对意向父母的保护程度、医疗技术水平和机构资质、语言沟通便利性、旅行和生活成本、以及亲权确认流程的便利性。\n\n天悦宝贝的顾问会根据您的具体情况，提供不同地区的方案对比分析，帮助您在充分了解信息的基础上做出适合自己的选择。我们会重点介绍各地区的法律框架和合规要求，确保您在合法合规的前提下开展相关流程。",
    imagePosition: "left",
    cardTone: "blue",
  },
  // ⑧ 周期管理 — stats
  {
    blockType: "stats",
    anchor: "cycle-management",
    title: "周期管理与陪伴支持",
    subtitle: "天悦宝贝在第三方辅助生殖流程中的服务内容",
    items: [
      {
        title: "一对一专属顾问",
        value: "一对一",
        description: "每位客户配备专属咨询顾问，全程陪伴沟通",
      },
      {
        title: "多地合作资源",
        value: "多地资源",
        description: "覆盖多个合法合规地区的合作医疗和法律资源",
      },
      {
        title: "隐私信息保护",
        value: "严格保密",
        description: "所有客户信息严格保密，未经授权不向第三方披露",
      },
      {
        title: "咨询响应时效",
        value: "24h 内",
        description: "收到咨询后 24 小时内安排顾问与您联系",
      },
    ],
    cardTone: "blue",
  },
  // ⑨ 费用参考 — stats
  {
    blockType: "stats",
    title: "第三方辅助生殖费用构成参考",
    subtitle:
      "以下为一般性费用构成参考，具体费用因地区、机构和个人情况差异较大",
    items: [
      {
        title: "医学检查与评估",
        value: "按项",
        description: "前期检查费用根据项目不同而异",
      },
      {
        title: "试管周期医疗费用",
        value: "因地区而异",
        description: "包括促排、取卵、胚胎培养和检测等",
      },
      {
        title: "志愿者相关费用",
        value: "因地区而异",
        description: "包括志愿者筛选、补偿和保险等",
      },
      {
        title: "法律与行政费用",
        value: "按需",
        description: "包括合同、亲权确认和翻译认证等",
      },
    ],
    cardTone: "blue",
  },
  // ⑩ 医生建议 — inlineCta
  {
    blockType: "inlineCta",
    title: "专业顾问建议",
    subtitle:
      "第三方辅助生殖是涉及多方面的重大决定，建议在充分了解信息后再做选择",
    body: "第三方辅助生殖涉及医学、法律、伦理和财务等多个层面，每个家庭的情况各不相同。天悦宝贝建议您在做出任何决定前，先与专业的生殖医学顾问进行充分沟通，了解自身的身体状况、适用的方案选择、合法合规地区的政策要求、以及可能涉及的风险和注意事项。我们的顾问团队可以为您提供一对一的咨询服务，帮助您梳理信息、了解方案，但最终决定应基于医生的专业评估、法律意见和您自身的实际情况。",
    buttonText: "预约专业咨询",
    buttonLink: "#consultation",
    cardTone: "blue",
  },
];

// ── 默认医生/顾问 ──

const DEFAULT_DOCTOR = {
  name: "天悦宝贝顾问团队",
  title: "生殖咨询顾问",
  experience:
    "天悦宝贝顾问团队拥有多年辅助生殖咨询服务经验，熟悉海外第三方辅助生殖的法律政策、医疗流程和机构特点。团队成员持续关注各国辅助生殖领域的政策变化和最新进展，致力于为每个家庭提供专业、客观、保密的咨询服务。已为众多有特殊生育需求的家庭提供过方案评估与流程指导。",
  specialties: [
    "第三方辅助生殖咨询",
    "海外合法方案评估",
    "志愿者资源匹配咨询",
    "试管周期流程说明",
    "法律合规指导",
    "隐私保护",
    "流程协调",
  ],
};

// ── 默认案例 ──

const DEFAULT_CASES: NonNullable<
  ThirdPartyAssistedReproductionPage["caseItems"]
> = [
  {
    title: "因子宫疾病无法自行妊娠家庭的方案咨询",
    profile: "30 多岁的夫妻",
    story:
      "一对 30 多岁的夫妻，女方因严重的子宫腺肌症和多次手术史，经医生评估自行妊娠风险较高。他们通过天悦宝贝咨询了第三方辅助生殖的基本概念、适用条件和海外合法方案。顾问根据他们的身体状况和需求，建议先完成详细的医学评估，并介绍了不同国家和地区的法律政策差异。",
    resultDescription:
      "在完成医学评估后，顾问为他们整理了不同合法合规地区的方案对比信息，包括法律保护程度、医疗水平、费用构成和流程时间。他们表示通过咨询对第三方辅助生殖有了更全面的认识，可以根据自身情况做出知情决策。",
    testimonial:
      "我们之前对第三方辅助生殖了解很少，顾问帮我们梳理了很多关键信息，特别是法律和合规方面的注意事项，让我们能更理性地看待这个选择。",
  },
  {
    title: "多次试管失败后的方案重新评估",
    profile: "经历多次试管失败的夫妻",
    story:
      "一对经历多次试管婴儿周期未能成功的夫妻，身心俱疲，希望了解是否还有其他选择。他们通过天悦宝贝咨询了第三方辅助生殖的可能性。顾问建议他们先系统回顾既往的治疗记录，与生殖医学专家沟通明确失败原因，再评估是否适合第三方辅助生殖方案。",
    resultDescription:
      "顾问协助他们整理了既往的治疗资料，并安排了与生殖医学专家的沟通。专家根据资料分析了可能的失败原因，并就第三方辅助生殖的适用性给出了专业意见。他们表示这次评估让他们对未来的选择有了更清晰的方向。",
    testimonial:
      "顾问没有急于推荐方案，而是建议我们先弄清楚之前失败的原因。这种负责任的态度让我们感到安心。",
  },
  {
    title: "高龄家庭的海外方案了解",
    profile: "40 岁出头的夫妻",
    story:
      "一对 40 岁出头的夫妻，女方卵巢功能明显下降，自行促排获卵困难。他们希望了解在合法合规的海外地区是否可以通过卵子志愿者等方式实现生育愿望。顾问详细介绍了不同国家的法律政策、卵子志愿者的筛选标准和匹配流程，以及相关的费用和时间安排。",
    resultDescription:
      "顾问为他们提供了多个合法合规地区的方案对比，重点说明了各地区的法律保护程度和医疗机构资质。他们表示通过咨询了解了更多选择，但也理解了每个方案都有其限制和不确定性，需要谨慎考虑。",
    testimonial:
      "顾问非常客观地分析了各种方案的利弊，没有给我们任何不切实际的期望。这让我们觉得值得信赖。",
  },
];

// ── 默认 FAQ ──

const DEFAULT_FAQ = [
  {
    question: "什么是第三方辅助生殖？基本概念是什么？",
    answer:
      "第三方辅助生殖是指在合法合规的地区，借助经过医学评估的志愿者资源（如卵子志愿者、孕母志愿者等），为有特殊生育需求的家庭提供辅助生殖支持的服务模式。这种方式主要面向因身体条件限制无法自行完成妊娠过程的家庭。需要强调的是，第三方辅助生殖涉及医学、法律、伦理等多个层面，不同国家和地区的法律规定差异显著。天悦宝贝的角色是为家庭提供信息咨询、方案评估和流程陪伴服务，而非直接实施医疗操作。",
  },
  {
    question: "第三方辅助生殖是否适合所有家庭？",
    answer:
      "不是。第三方辅助生殖并不适合所有家庭，是否适合需要由专业医生根据您的身体状况、生育史和具体需求进行综合评估。通常情况下，医生会建议先尝试其他辅助生殖方式（如常规试管婴儿），在确认其他方式不适合或风险较高后，才会建议了解第三方辅助生殖。此外，选择第三方辅助生殖还需要充分了解目标地区的法律法规、费用构成、流程时间和可能的风险。建议在做出任何决定前，先与生殖医学专家和咨询顾问进行充分沟通。",
  },
  {
    question: "国内和海外在第三方辅助生殖政策上有什么差异？",
    answer:
      "不同国家和地区对第三方辅助生殖的法律政策存在显著差异。在中国，第三方辅助生殖受到严格限制，相关服务在法律上存在明确限制。而在部分海外国家和地区（如美国部分州、乌克兰、格鲁吉亚、哥伦比亚等），第三方辅助生殖在特定法律框架下是被允许和规范的。这些地区通常对志愿者的筛选标准、意向父母的权益保护、合同规范和亲权确认流程有明确的法律规定。天悦宝贝建议家庭在了解方案时，重点关注目标地区的法律合规性，确保在法律明确支持的地区开展相关流程。",
  },
  {
    question: "为什么需要先做医学评估？评估包括哪些内容？",
    answer:
      "医学评估是了解第三方辅助生殖方案的基础和前提。通过医学评估，医生可以判断您是否真的需要第三方辅助生殖，还是有其他更适合的方案选择。评估通常包括：基础生育力检查（如激素六项、AMH、超声、精液分析等）、既往病史和治疗记录回顾、遗传学检查与评估、以及心理评估。详细的医学评估有助于制定更准确的方案建议，也有助于您在充分了解自身情况的基础上做出知情决策。天悦宝贝会协助您收集和整理相关资料，并安排与生殖医学专家的沟通。",
  },
  {
    question: "第三方志愿者资源是如何筛选和匹配的？",
    answer:
      "在合法合规的地区，第三方志愿者需要经过严格的医学和心理筛选。筛选标准通常包括：年龄范围、身体健康检查、传染病筛查、心理健康评估、遗传病筛查等。不同机构的筛选标准可能有所不同，但都会遵循当地的法律要求和行业规范。匹配过程通常需要考虑志愿者的可用性、与意向父母的需求匹配度等因素。天悦宝贝在咨询服务中会帮助您了解合作机构的志愿者筛选标准、匹配流程和时间预期，但无法保证具体的匹配时间，因为这受多种因素影响。",
  },
  {
    question: "第三方辅助生殖的整个流程通常需要多长时间？",
    answer:
      "第三方辅助生殖的整个流程时间因地区、机构和个人情况而异，通常需要较长时间。一般来说，从开始咨询到完成整个流程，可能需要 1-2 年甚至更长时间。主要阶段包括：前期咨询与评估（1-2 个月）、医学检查与资料准备（1-3 个月）、志愿者匹配（时间不确定，取决于多种因素）、试管周期与胚胎培养（2-3 个月）、移植与孕期（约 9-10 个月）。以上时间仅为大致参考，实际时间会受到地区差异、机构安排、志愿者匹配情况等多种因素影响。顾问会根据您的具体情况提供更详细的时间预期。",
  },
  {
    question: "第三方辅助生殖的费用由哪些部分组成？",
    answer:
      "第三方辅助生殖的费用构成较为复杂，通常包括以下几个主要部分：1）医学检查与评估费用，包括前期的生育力检查和遗传学检测等；2）试管周期医疗费用，包括促排卵药物、取卵/取精、胚胎培养和遗传学检测等；3）志愿者相关费用，包括志愿者的筛选、补偿和保险等；4）法律与行政费用，包括合同起草、亲权确认、翻译认证等；5）旅行与生活费用，包括往返机票、住宿、当地交通等；6）机构服务费用。具体费用因地区、机构和个体方案不同而有较大差异，建议在咨询时详细了解费用明细。",
  },
  {
    question: "在第三方辅助生殖过程中，隐私如何保护？",
    answer:
      "隐私保护是第三方辅助生殖中的重要环节。天悦宝贝采取以下措施保护客户隐私：1）所有客户信息严格保密，未经授权不向任何第三方披露；2）客户资料仅限专属顾问和必要的合作机构人员访问；3）在合法合规地区，法律通常对各方隐私有明确的保护规定；4）合同中通常包含隐私保护条款，明确各方的保密义务。我们建议您在选择服务机构时，重点关注其隐私保护政策和措施，并在合同中明确隐私保护的具体条款。",
  },
  {
    question: "如何选择合适的海外国家和机构？",
    answer:
      "选择海外国家和机构时，建议重点考虑以下因素：1）法律合规性，目标地区是否明确支持第三方辅助生殖，法律对意向父母的保护程度如何；2）医疗水平，合作机构的资质、医生团队的经验和实验室条件；3）语言沟通，是否有中文服务或翻译支持；4）志愿者资源，志愿者库的规模和筛选标准；5）费用构成，包括医疗费用、法律费用和生活费用等；6）亲权确认流程，当地法律对意向父母身份确认的便利性。天悦宝贝的顾问会根据您的具体情况提供不同地区的方案对比分析，帮助您做出适合自己的选择。",
  },
  {
    question: "第三方辅助生殖有哪些医学风险？",
    answer:
      "第三方辅助生殖涉及的医学风险需要从多个角度了解：1）促排卵和取卵过程（针对卵子志愿者）可能存在卵巢过度刺激综合征等风险，但发生率较低；2）胚胎移植的成功率受多种因素影响，包括胚胎质量、志愿者身体条件等，无法保证每次移植都能成功；3）孕期管理中可能面临妊娠并发症等风险，需要专业的医疗团队进行监测和管理；4）胚胎遗传学检测（PGT）可以筛选已知遗传风险，但不能排除所有遗传问题。建议在咨询时向医生详细了解您个人情况下的具体风险和注意事项。",
  },
  {
    question: "开始第三方辅助生殖咨询需要准备哪些资料？",
    answer:
      "开始咨询时，建议准备以下资料：1）夫妻双方的身份信息；2）既往的生育相关检查报告（如激素检查、超声报告、精液分析等）；3）既往的治疗记录（如试管婴儿周期记录、手术记录等）；4）如有遗传病家族史，提供相关的遗传学检查报告；5）您希望了解的具体问题和需求。这些资料有助于顾问更准确地了解您的情况，提供更有针对性的方案建议。如果您暂时没有完整的资料，也可以先进行初步咨询，顾问会告知您还需要补充哪些检查。",
  },
  {
    question: "如何开始第三方辅助生殖咨询？",
    answer:
      "开始咨询非常简单：1）您可以通过页面上的在线咨询表单提交基本信息和咨询需求，顾问会在 24 小时内与您联系；2）也可以拨打咨询热线或添加微信客服直接沟通；3）初次咨询通常为线上沟通，顾问会了解您的基本情况、需求和顾虑，并提供初步的方案建议；4）如有近期的检查报告，建议在咨询时提供，以便顾问更准确地评估您的情况。咨询过程完全保密，您可以放心沟通。天悦宝贝致力于为每个家庭提供专业、客观、保密的咨询服务。",
  },
];

// ── 默认 Sidebar ──

const DEFAULT_SIDEBAR = {
  title: "第三方辅助生殖咨询",
  description:
    "专业顾问为您提供第三方辅助生殖、海外合法方案评估相关的咨询服务，帮助您了解方案、评估适用性。",
  primaryButtonText: "在线咨询",
  primaryButtonLink: "#consultation",
  secondaryButtonText: "预约方案评估",
  secondaryButtonLink: "#content-start",
  phoneLabel: "咨询热线",
  phone: "400-xxx-xxxx",
  wechatText: "添加微信客服",
  whatsappText: "WhatsApp 咨询",
};

// ── 默认最终 CTA ──

const DEFAULT_FINAL_CTA = {
  title: "开始了解第三方辅助生殖方案",
  description:
    "第三方辅助生殖是涉及多方面的重大决定。专业的咨询顾问随时为您服务，帮助您更清晰地了解合法合规方案、流程与选择，做出适合自己的知情决策。",
  primaryButtonText: "立即咨询",
  primaryButtonLink: "#consultation",
  secondaryButtonText: "预约方案评估",
  secondaryButtonLink: "#content-start",
};

// ── Icon 映射 ──

function getIcon(name?: string) {
  switch (name) {
    case "user":
      return <User className="w-5 h-5" />;
    case "shield":
      return <Shield className="w-5 h-5" />;
    case "heart":
      return <Heart className="w-5 h-5" />;
    case "clock":
      return <Clock className="w-5 h-5" />;
    case "phone":
      return <Phone className="w-5 h-5" />;
    case "message":
      return <MessageCircle className="w-5 h-5" />;
    case "file":
      return <FileSearch className="w-5 h-5" />;
    case "stethoscope":
      return <Stethoscope className="w-5 h-5" />;
    case "scale":
      return <Scale className="w-5 h-5" />;
    case "users":
      return <Users className="w-5 h-5" />;
    case "check":
      return <CheckCircle2 className="w-5 h-5" />;
    default:
      return <CheckCircle2 className="w-5 h-5" />;
  }
}

// ── 辅助函数 ──

function getImageUrl(
  img: ImageWithAlt | undefined,
  fallback: "banner" | "content" = "content"
): string | null {
  if (!img?.image) return null;
  return fallback === "banner"
    ? bannerImageUrl(
        img.image as unknown as Parameters<typeof bannerImageUrl>[0]
      )
    : contentImageUrl(
        img.image as unknown as Parameters<typeof contentImageUrl>[0]
      );
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "2025-01-15";
  try {
    return new Date(dateStr).toISOString().split("T")[0];
  } catch {
    return "2025-01-15";
  }
}

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  const { thirdPartyAssistedReproductionPage: p, siteSettings } =
    await fetchThirdPartyAssistedReproductionPageData();
  const seo = p?.seo;
  const fallback = siteSettings?.defaultSeo;

  return {
    title: seo?.metaTitle || p?.pageTitle || DEFAULT_SEO.title,
    description:
      seo?.metaDescription || p?.pageDescription || DEFAULT_SEO.description,
    keywords: seo?.keywords || fallback?.keywords,
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || p?.pageTitle,
      description:
        seo?.ogDescription || seo?.metaDescription || p?.pageDescription,
    },
    robots: seo?.noIndex ? "noindex" : "index, follow",
    ...(seo?.canonicalUrl && { alternates: { canonical: seo.canonicalUrl } }),
  };
}

// ── Content Block 渲染器 ──

function ContentBlockRenderer({
  block,
}: {
  block: NonNullable<
    ThirdPartyAssistedReproductionPage["contentBlocks"]
  >[number];
}) {
  const { blockType, title, subtitle, body, items, cardTone } = block;

  const toneClasses = {
    blue: "border-l-[#2563eb]",
    warning: "border-l-amber-400",
    success: "border-l-emerald-400",
    neutral: "border-l-gray-300",
  };

  const toneBg = {
    blue: "bg-blue-50",
    warning: "bg-amber-50",
    success: "bg-emerald-50",
    neutral: "bg-gray-50",
  };

  const borderClass = toneClasses[cardTone || "blue"];
  const bgClass = toneBg[cardTone || "blue"];

  switch (blockType) {
    case "textImage": {
      const imageUrl = getImageUrl(block.image, "content");
      const isLeft = block.imagePosition === "left";
      return (
        <div className="mb-10">
          {title && (
            <h2
              className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4"
              id={block.anchor}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[#5a6d8a] mb-4 pl-4">{subtitle}</p>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {imageUrl && (
              <div
                className={`relative aspect-[4/3] rounded-lg overflow-hidden ${isLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"}`}
              >
                <Image
                  src={imageUrl}
                  alt={block.image?.alt || title || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
                {block.caption && (
                  <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-3 py-2">
                    {block.caption}
                  </p>
                )}
              </div>
            )}
            <div
              className={`${isLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"} ${!imageUrl ? "lg:col-span-2" : ""}`}
            >
              {body &&
                body.split("\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-[18px] leading-[1.9] text-[#374151] mb-7"
                  >
                    {para}
                  </p>
                ))}
            </div>
          </div>
        </div>
      );
    }

    case "fullImage": {
      const imageUrl = getImageUrl(block.image, "banner");
      return (
        <div className="mb-10">
          {imageUrl && (
            <div className="relative aspect-[16/7] rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={block.image?.alt || title || ""}
                fill
                className="object-cover"
                sizes="100vw"
                loading="lazy"
              />
            </div>
          )}
          {block.caption && (
            <p className="text-sm text-[#8a9bb5] mt-2 text-center">
              {block.caption}
            </p>
          )}
        </div>
      );
    }

    case "infoCard":
      return (
        <div className="mb-10">
          {title && (
            <h2
              className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4"
              id={block.anchor}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[#5a6d8a] mb-6 pl-4">{subtitle}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {items?.map((item, i) => (
              <div
                key={i}
                className={`${bgClass} rounded-lg p-5 border-l-4 ${borderClass}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#2563eb] shadow-sm">
                    {getIcon(item.icon)}
                  </div>
                  {item.title && (
                    <h3 className="font-semibold text-[#173b68]">
                      {item.title}
                    </h3>
                  )}
                </div>
                {item.description && (
                  <p className="text-sm text-[#5a6d8a] leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case "stats":
      return (
        <div className="mb-10">
          {title && (
            <h2
              className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4"
              id={block.anchor}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[#5a6d8a] mb-6 pl-4">{subtitle}</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items?.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-5 text-center ring-1 ring-blue-100/60"
              >
                <p className="text-2xl md:text-3xl font-bold text-[#2563eb] mb-1">
                  {item.value}
                </p>
                {item.title && (
                  <p className="text-sm font-semibold text-[#173b68] mb-1">
                    {item.title}
                  </p>
                )}
                {item.description && (
                  <p className="text-xs text-[#8a9bb5]">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case "processTimeline":
      return (
        <div className="mb-10">
          {title && (
            <h2
              className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4"
              id={block.anchor}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[#5a6d8a] mb-6 pl-4">{subtitle}</p>
          )}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-blue-200 hidden md:block" />
            <div className="space-y-6">
              {items?.map((item, i) => (
                <div key={i} className="relative flex gap-5">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white font-bold text-sm shadow-md shadow-blue-600/20">
                    {i + 1}
                  </div>
                  <div className="bg-white rounded-lg p-5 ring-1 ring-blue-100/60 flex-1">
                    <h3 className="font-semibold text-[#173b68] mb-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-[#5a6d8a] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "doctorProfile":
      return null;

    case "caseStudy":
      return null;

    case "inlineCta":
      return (
        <div className="mb-10">
          <div
            className="bg-gradient-to-r from-[#1a3a6b] to-[#2563eb] rounded-xl p-8 text-center"
            id={block.anchor}
          >
            {title && (
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            )}
            {subtitle && <p className="text-blue-200 mb-4">{subtitle}</p>}
            {body && (
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">{body}</p>
            )}
            {block.buttonText && (
              <Link
                href={block.buttonLink || "#consultation"}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
              >
                {block.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}

// ── Sidebar 组件 ──

function Sidebar({
  data,
  doctor,
}: {
  data: ThirdPartyAssistedReproductionPage;
  doctor: ThirdPartyAssistedReproductionPage;
}) {
  const sidebar = {
    title: data.sidebarTitle || DEFAULT_SIDEBAR.title,
    description: data.sidebarDescription || DEFAULT_SIDEBAR.description,
    primaryButtonText:
      data.sidebarPrimaryButtonText || DEFAULT_SIDEBAR.primaryButtonText,
    primaryButtonLink:
      data.sidebarPrimaryButtonLink || DEFAULT_SIDEBAR.primaryButtonLink,
    secondaryButtonText:
      data.sidebarSecondaryButtonText || DEFAULT_SIDEBAR.secondaryButtonText,
    secondaryButtonLink:
      data.sidebarSecondaryButtonLink || DEFAULT_SIDEBAR.secondaryButtonLink,
    phoneLabel: data.sidebarPhoneLabel || DEFAULT_SIDEBAR.phoneLabel,
    phone: data.sidebarPhone || DEFAULT_SIDEBAR.phone,
    wechatText: data.sidebarWechatText || DEFAULT_SIDEBAR.wechatText,
    whatsappText: data.sidebarWhatsappText || DEFAULT_SIDEBAR.whatsappText,
  };

  return (
    <aside className="space-y-6">
      {/* 咨询表单 */}
      <div id="consultation">
        <ConsultationForm source="third-party-assisted-reproduction" />
      </div>

      {/* 快速联系 */}
      <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
        <h3 className="text-base font-semibold text-[#173b68] mb-3">
          {sidebar.title}
        </h3>
        <p className="text-sm text-[#5a6d8a] mb-4">{sidebar.description}</p>
        <div className="space-y-3">
          <Link
            href={sidebar.primaryButtonLink}
            className="flex items-center gap-2 w-full justify-center rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {sidebar.primaryButtonText}
          </Link>
          <Link
            href={sidebar.secondaryButtonLink}
            className="flex items-center gap-2 w-full justify-center rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#2563eb] hover:bg-blue-50 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            {sidebar.secondaryButtonText}
          </Link>
        </div>
        {sidebar.phone && (
          <div className="mt-4 flex items-center gap-2 text-sm text-[#5a6d8a]">
            <Phone className="w-4 h-4 text-[#2563eb]" />
            <span>
              {sidebar.phoneLabel}：{sidebar.phone}
            </span>
          </div>
        )}
        {sidebar.wechatText && (
          <div className="mt-2 flex items-center gap-2 text-sm text-[#5a6d8a]">
            <MessageCircle className="w-4 h-4 text-[#2563eb]" />
            <span>{sidebar.wechatText}</span>
          </div>
        )}
        {sidebar.whatsappText && (
          <div className="mt-2 flex items-center gap-2 text-sm text-[#5a6d8a]">
            <ExternalLink className="w-4 h-4 text-[#2563eb]" />
            <span>{sidebar.whatsappText}</span>
          </div>
        )}
      </div>

      {/* 医生/顾问 */}
      {(doctor.doctorName || DEFAULT_DOCTOR.name) && (
        <div className="bg-[#f8fbff] rounded-xl p-5 ring-1 ring-blue-100/60">
          <div className="flex items-center gap-3 mb-3">
            {doctor.doctorAvatar?.image ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={contentImageUrl(
                    doctor.doctorAvatar.image as unknown as Parameters<
                      typeof contentImageUrl
                    >[0]
                  )}
                  alt={doctor.doctorAvatar.alt || doctor.doctorName || ""}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-6 h-6 text-[#2563eb]" />
              </div>
            )}
            <div>
              <p className="font-semibold text-[#173b68] text-sm">
                {doctor.doctorName || DEFAULT_DOCTOR.name}
              </p>
              <p className="text-xs text-[#2563eb]">
                {doctor.doctorTitle || DEFAULT_DOCTOR.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#5a6d8a] leading-relaxed mb-3">
            {doctor.doctorExperience || DEFAULT_DOCTOR.experience}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(doctor.doctorSpecialties?.length
              ? doctor.doctorSpecialties
              : DEFAULT_DOCTOR.specialties
            ).map((s) => (
              <span
                key={s}
                className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-[#2563eb]"
              >
                {s}
              </span>
            ))}
          </div>
          {doctor.doctorButtonText && (
            <Link
              href={doctor.doctorButtonLink || "#consultation"}
              className="mt-4 flex items-center gap-2 w-full justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#2563eb] ring-1 ring-blue-200 hover:bg-blue-50 transition-colors"
            >
              {doctor.doctorButtonText}
            </Link>
          )}
        </div>
      )}

      {/* 数据卡片 */}
      <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
        <h3 className="text-base font-semibold text-[#173b68] mb-3">
          为什么选择天悦宝贝
        </h3>
        <div className="space-y-3">
          {[
            {
              value: "一对一",
              title: "专属顾问全程陪伴",
              desc: "每位客户配备专属咨询顾问",
            },
            {
              value: "多地资源",
              title: "多地合作医疗资源",
              desc: "覆盖多个合法合规地区",
            },
            {
              value: "严格保密",
              title: "隐私信息保护",
              desc: "所有客户信息严格保密",
            },
            {
              value: "24h 内",
              title: "咨询响应时效",
              desc: "收到咨询后快速安排联系",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-[#2563eb]">
                  {item.value}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#173b68]">
                  {item.title}
                </p>
                <p className="text-xs text-[#8a9bb5]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 热门文章 */}
      {data.sidebarHotArticles && data.sidebarHotArticles.length > 0 && (
        <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
          <h3 className="text-base font-semibold text-[#173b68] mb-3">
            热门文章
          </h3>
          <ul className="space-y-2.5">
            {data.sidebarHotArticles.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="flex items-start gap-2 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 mt-1 flex-shrink-0" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 相关推荐 */}
      {data.sidebarRelatedLinks && data.sidebarRelatedLinks.length > 0 && (
        <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
          <h3 className="text-base font-semibold text-[#173b68] mb-3">
            相关推荐
          </h3>
          <ul className="space-y-2.5">
            {data.sidebarRelatedLinks.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="flex items-start gap-2 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 mt-1 flex-shrink-0" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 热门国家 */}
      {data.sidebarCountries && data.sidebarCountries.length > 0 && (
        <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
          <h3 className="text-base font-semibold text-[#173b68] mb-3">
            热门国家/地区
          </h3>
          <ul className="space-y-2.5">
            {data.sidebarCountries.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="flex items-start gap-2 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 mt-1 flex-shrink-0" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

// ── Page Component ──

export default async function ThirdPartyAssistedReproductionPage() {
  const { siteSettings, thirdPartyAssistedReproductionPage: p } =
    await fetchThirdPartyAssistedReproductionPageData();

  // 合并 CMS 数据与默认值
  const hero = {
    title: p?.heroTitle || DEFAULT_HERO.title,
    subtitle: p?.heroSubtitle || DEFAULT_HERO.subtitle,
    description: p?.heroDescription || DEFAULT_HERO.description,
    primaryButtonText:
      p?.heroPrimaryButtonText || DEFAULT_HERO.primaryButtonText,
    primaryButtonLink:
      p?.heroPrimaryButtonLink || DEFAULT_HERO.primaryButtonLink,
    secondaryButtonText:
      p?.heroSecondaryButtonText || DEFAULT_HERO.secondaryButtonText,
    secondaryButtonLink:
      p?.heroSecondaryButtonLink || DEFAULT_HERO.secondaryButtonLink,
  };

  const tocItems = p?.tocItems?.length ? p.tocItems : DEFAULT_TOC;
  const contentBlocks = p?.contentBlocks?.length
    ? p.contentBlocks
    : DEFAULT_CONTENT_BLOCKS;
  const caseItems = p?.caseItems?.length ? p.caseItems : DEFAULT_CASES;
  const faqItems = p?.faqItems?.length ? p.faqItems : DEFAULT_FAQ;
  const faqTitle = p?.faqTitle || "常见问题";
  const faqDescription =
    p?.faqDescription || "关于第三方辅助生殖的常见疑问解答";

  const finalCta = {
    title: p?.finalCtaTitle || DEFAULT_FINAL_CTA.title,
    description: p?.finalCtaDescription || DEFAULT_FINAL_CTA.description,
    primaryButtonText:
      p?.finalCtaPrimaryButtonText || DEFAULT_FINAL_CTA.primaryButtonText,
    primaryButtonLink:
      p?.finalCtaPrimaryButtonLink || DEFAULT_FINAL_CTA.primaryButtonLink,
    secondaryButtonText:
      p?.finalCtaSecondaryButtonText || DEFAULT_FINAL_CTA.secondaryButtonText,
    secondaryButtonLink:
      p?.finalCtaSecondaryButtonLink || DEFAULT_FINAL_CTA.secondaryButtonLink,
  };

  const publishedAt = formatDate(p?.publishedAt);
  const readingTime = p?.readingTime || "12 分钟阅读";
  const authorName = p?.authorName || DEFAULT_DOCTOR.name;
  const heroImageUrl = getImageUrl(p?.heroImage, "banner");
  const finalCtaBgUrl = getImageUrl(p?.finalCtaBackgroundImage, "banner");

  return (
    <>
      {/* 结构化数据 */}
      {faqItems.length > 0 && (
        <FaqJsonLd
          items={faqItems.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))}
        />
      )}
      <ArticleJsonLd
        title={p?.pageTitle || DEFAULT_SEO.title}
        description={p?.pageDescription || DEFAULT_SEO.description}
        image={heroImageUrl || undefined}
        datePublished={publishedAt}
        dateModified={publishedAt}
        authorName={authorName}
        url="https://www.tianyuebaby.com/third-party-assisted-reproduction"
      />

      {/* ════════════════════════════════════════
          1. Hero Banner
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 500 }}>
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={p?.heroImage?.alt || hero.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0fe] via-white to-[#f0f6ff]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2548]/85 via-[#1a3a6b]/75 to-[#1a3a6b]/60" />

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
            <span className="text-white/90 font-medium">
              第三方辅助生殖
            </span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4">
              {hero.title}
            </h1>
            <p className="text-lg text-blue-200 mb-3">{hero.subtitle}</p>
            <p className="text-[15px] text-white/70 leading-relaxed mb-5">
              {hero.description}
            </p>

            {/* 发布信息 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-8">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readingTime}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {authorName}
                {p?.authorTitle && (
                  <span className="text-white/40">· {p.authorTitle}</span>
                )}
              </span>
            </div>

            {/* 按钮 */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={hero.primaryButtonLink}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {hero.primaryButtonText}
              </Link>
              <Link
                href={hero.secondaryButtonLink}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {hero.secondaryButtonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. 目录导航
      ════════════════════════════════════════ */}
      <section className="bg-white border-b border-blue-100/60">
        <div className="container mx-auto max-w-[1200px] px-4 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto text-sm">
            <span className="text-[#8a9bb5] shrink-0 mr-1">目录：</span>
            {tocItems.map((item, i) => (
              <Link
                key={i}
                href={`#${item.anchor}`}
                className="shrink-0 px-3 py-1.5 rounded-full text-[#5a6d8a] hover:text-[#2563eb] hover:bg-blue-50 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. 主体区：左侧正文 + 右侧 Sidebar
      ════════════════════════════════════════ */}
      <section id="content-start" className="bg-[#f8fbff] py-12 lg:py-16">
        <div className="container mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            {/* 左侧正文 */}
            <main>
              {contentBlocks.map((block, i) => (
                <ContentBlockRenderer key={i} block={block} />
              ))}

              {/* 案例模块 */}
              {caseItems.length > 0 && (
                <div className="mb-10" id="cases">
                  <h2 className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4">
                    咨询案例参考
                  </h2>
                  <p className="text-[#5a6d8a] mb-6 pl-4">
                    以下案例仅供参考，已做去隐私化处理，不构成任何承诺。
                    每个家庭的情况不同，实际方案需由医生根据个人状况评估。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {caseItems.map((item, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-lg p-5 ring-1 ring-blue-100/60"
                      >
                        {item.image?.image && (
                          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                            <Image
                              src={contentImageUrl(
                                item.image.image as unknown as Parameters<
                                  typeof contentImageUrl
                                >[0]
                              )}
                              alt={item.image.alt || item.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <h3 className="font-semibold text-[#173b68] mb-2">
                          {item.title}
                        </h3>
                        {item.profile && (
                          <span className="inline-block text-xs text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-full mb-3">
                            {item.profile}
                          </span>
                        )}
                        {item.story && (
                          <p className="text-sm text-[#5a6d8a] leading-relaxed mb-3">
                            {item.story}
                          </p>
                        )}
                        {item.resultDescription && (
                          <p className="text-xs text-[#4b6fa8] border-t border-blue-100 pt-3 mb-2">
                            {item.resultDescription}
                          </p>
                        )}
                        {item.testimonial && (
                          <p className="text-sm text-[#5a6d8a] italic leading-relaxed">
                            &ldquo;{item.testimonial}&rdquo;
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {faqItems.length > 0 && (
                <div className="mb-10" id="faq">
                  <h2 className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4">
                    {faqTitle}
                  </h2>
                  <p className="text-[#5a6d8a] mb-6 pl-4">{faqDescription}</p>
                  <div className="space-y-3">
                    {faqItems.map((item, i) => (
                      <details
                        key={i}
                        className="bg-white rounded-lg overflow-hidden group ring-1 ring-blue-100/60"
                      >
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
              )}
            </main>

            {/* 右侧 Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Sidebar
                  data={p || ({} as ThirdPartyAssistedReproductionPage)}
                  doctor={p || ({} as ThirdPartyAssistedReproductionPage)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 移动端 Sidebar */}
      <section className="lg:hidden bg-white py-12">
        <div className="container mx-auto max-w-[1200px] px-4">
          <Sidebar
            data={p || ({} as ThirdPartyAssistedReproductionPage)}
            doctor={p || ({} as ThirdPartyAssistedReproductionPage)}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. 最终 CTA
      ════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#1a3a6b] to-[#0f2548] py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(37,99,235,.2),transparent_60%)]" />
        {finalCtaBgUrl && (
          <Image
            src={finalCtaBgUrl}
            alt={p?.finalCtaBackgroundImage?.alt || ""}
            fill
            className="object-cover opacity-10"
            loading="lazy"
          />
        )}
        <div className="container relative mx-auto max-w-[1200px] px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {finalCta.title}
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8">
            {finalCta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={finalCta.primaryButtonLink}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {finalCta.primaryButtonText}
            </Link>
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
