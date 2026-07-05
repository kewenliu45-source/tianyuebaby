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
  Fingerprint,
} from "lucide-react";
import { ConsultationForm } from "@/components/shared/consultation-form";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { fetchPrivateCustomizationPageData } from "@/sanity/lib/fetchers";
import { contentImageUrl, bannerImageUrl } from "@/sanity/lib/image";
import type { PrivateCustomizationPage, ImageWithAlt } from "@/types/sanity";

// ── 默认 SEO ──

const DEFAULT_SEO = {
  title: "私人订制辅助生殖方案与个性化生育规划 | 天悦宝贝",
  description:
    "天悦宝贝提供私人订制辅助生殖方案咨询服务，涵盖个性化生育规划、性别需求咨询、双胎需求评估、海外合法合规方案、三代试管与胚胎检测咨询、医学评估与全程流程陪伴，帮助家庭在合法合规前提下做出知情决策。",
};

// ── 默认 Hero ──

const DEFAULT_HERO = {
  title: "私人订制辅助生殖方案与个性化生育规划",
  subtitle:
    "因人而异 · 合法合规 · 专业评估 · 一对一顾问全程陪伴",
  description:
    "天悦宝贝为有个性化生育需求的家庭提供私人订制辅助生殖咨询服务。每位客户的情况各不相同，我们会根据您的身体状况、家庭需求和实际情况，由资深顾问团队进行一对一的需求梳理与方案评估，帮助您在合法合规的前提下了解可行的方案选择。",
  primaryButtonText: "立即咨询",
  primaryButtonLink: "#consultation",
  secondaryButtonText: "预约方案评估",
  secondaryButtonLink: "#content-start",
};

// ── 默认目录 ──

const DEFAULT_TOC = [
  { title: "什么是私人订制辅助生殖", anchor: "what-is-customization" },
  { title: "哪些家庭适合了解", anchor: "suitable-for" },
  { title: "个性化方案如何制定", anchor: "how-plan" },
  { title: "性别需求咨询", anchor: "gender-request" },
  { title: "双胎需求咨询", anchor: "twin-request" },
  { title: "医学评估与资料准备", anchor: "medical-evaluation" },
  { title: "海外国家与机构选择", anchor: "overseas-options" },
  { title: "服务流程", anchor: "service-process" },
  { title: "案例参考", anchor: "cases" },
  { title: "常见问题", anchor: "faq" },
];

// ── 默认正文模块 ──

const DEFAULT_CONTENT_BLOCKS: NonNullable<
  PrivateCustomizationPage["contentBlocks"]
> = [
  // ① 什么是私人订制辅助生殖 — textImage
  {
    blockType: "textImage",
    anchor: "what-is-customization",
    title: "什么是私人订制辅助生殖",
    subtitle: "了解个性化辅助生殖方案咨询的核心理念",
    body: "私人订制辅助生殖并非一种独立的医疗技术，而是一种以客户需求为导向的咨询服务模式。每位家庭的生育需求、身体状况、年龄、遗传背景和生活规划各不相同，标准化的流程未必能完全覆盖所有个性化需求。\n\n天悦宝贝的私人订制服务，核心在于\"先了解，再规划\"。我们会通过一对一的深度沟通，全面了解您的家庭情况、生育目标和顾虑，再结合专业医生的医学评估，为您梳理可行的方案路径。\n\n需要强调的是，私人订制方案的制定必须建立在医学评估和合法合规的基础之上。任何辅助生殖方案都需要由专业医生根据您的身体状况进行评估后才能确定，我们的角色是帮助您梳理信息、匹配资源、协调流程，而非替代医生做出医疗决策。",
    imagePosition: "right",
    cardTone: "blue",
  },
  // ② 适用人群 — infoCard
  {
    blockType: "infoCard",
    anchor: "suitable-for",
    title: "哪些家庭适合了解私人订制方案",
    subtitle:
      "以下情况的家庭可以考虑了解个性化辅助生殖方案，具体是否适合需由医生评估",
    items: [
      {
        title: "希望进行个性化生育规划的家庭",
        description:
          "每个家庭的生育时间表和生活规划不同。有些家庭希望在特定年龄段完成生育，有些则因职业、学业等原因需要灵活安排。私人订制方案可以帮助您在充分了解信息的基础上，制定适合自身节奏的生育规划。",
        icon: "heart",
      },
      {
        title: "有性别相关生育需求的家庭",
        description:
          "部分家庭因遗传病风险或其他原因，希望了解与胚胎性别相关的合法合规路径。在允许胚胎遗传学检测（PGT）的合法地区，医生可以在医学指征范围内提供专业评估。需要强调的是，性别选择涉及法律和伦理问题，必须在合法合规地区、有医学指征的前提下进行。",
        icon: "fingerprint",
      },
      {
        title: "希望了解双胎方案的家庭",
        description:
          "部分家庭希望通过辅助生殖技术一次移植两个胚胎以提高效率。但双胎妊娠本身属于高危妊娠，对母婴健康均有额外风险。医生会根据您的子宫条件、年龄和身体状况评估双胎移植的可行性和风险，最终方案需以医生的专业判断为准。",
        icon: "users",
      },
      {
        title: "多次试管失败后需要重新评估的家庭",
        description:
          "经历多次试管婴儿周期失败的家庭，往往需要从更全面的角度重新审视方案。私人订制服务可以协助您系统梳理既往治疗记录，分析可能的失败原因，并在合法合规地区寻找更适合的医疗资源和技术方案。",
        icon: "file",
      },
      {
        title: "高龄备孕或卵巢功能下降的家庭",
        description:
          "随着年龄增长，卵巢功能和卵子质量会逐渐下降。高龄备孕家庭可能需要更个性化的促排方案、更严格的胚胎筛选，或在合法合规地区了解其他辅助方案。具体可行性需由医生根据您的身体检查结果进行评估。",
        icon: "clock",
      },
      {
        title: "有遗传病风险、需要胚胎检测咨询的家庭",
        description:
          "如果夫妻双方或一方携带已知遗传病基因，可以通过 PGT（胚胎植入前遗传学检测）在合法合规地区筛选不携带特定遗传疾病的胚胎。私人订制服务可以为您匹配具备相关检测能力的医疗资源，并协助您了解检测的适用范围和局限性。",
        icon: "shield",
      },
    ],
    cardTone: "blue",
  },
  // ③ 个性化方案如何制定 — textImage
  {
    blockType: "textImage",
    anchor: "how-plan",
    title: "个性化方案如何制定",
    subtitle: "了解私人订制方案的制定流程与核心原则",
    body: "私人订制方案的制定是一个系统性的过程，核心原则是\"医学评估先行，方案匹配在后\"。我们不会在未了解您身体状况的情况下推荐任何具体方案，而是通过以下步骤帮助您逐步明确方向。\n\n首先是一对一深度咨询，顾问会详细了解您的家庭情况、生育历史、既往检查和治疗记录、以及您对方案的期望和顾虑。其次是资料收集与整理，我们会协助您收集和整理相关的医学检查报告，为后续的医生评估做好准备。\n\n然后是医学评估环节，由合作的生殖医学专家根据您的资料进行专业评估，判断您的身体条件适合哪些方案，以及各方案的预期效果和可能的风险。最后是方案说明与资源匹配，顾问会根据医生的评估结果，为您详细解读可行的方案选项，包括不同国家和地区的合法合规路径、费用构成、时间安排等，帮助您做出知情决策。",
    imagePosition: "left",
    cardTone: "blue",
  },
  // ④ 性别需求咨询 — textImage
  {
    blockType: "textImage",
    anchor: "gender-request",
    title: "性别需求咨询",
    subtitle: "了解胚胎性别相关检测的合法合规路径",
    body: "部分家庭因遗传病风险（如 X 连锁遗传病）或其他医学原因，希望了解胚胎性别相关的检测信息。在允许胚胎遗传学检测（PGT）的合法地区，医生可以在有医学指征的前提下，通过 PGT-A 或 PGT-M 技术对胚胎进行染色体或基因层面的检测。\n\n需要特别强调的是：1）胚胎性别检测并非所有地区都允许，必须在合法合规的地区进行；2）即使在合法地区，也需要有明确的医学指征，不能仅因个人偏好而进行性别筛选；3）天悦宝贝的角色是帮助您了解不同地区的法律政策和医疗资源，而非直接提供医疗服务。\n\n我们的顾问会为您梳理不同国家和地区在胚胎检测方面的法律政策，帮助您了解哪些地区在什么条件下可以进行相关检测，并协助您与具备资质的医疗团队进行沟通。所有方案的确定都需要经过医生的专业评估和法律合规审查。",
    imagePosition: "right",
    cardTone: "blue",
  },
  // ⑤ 双胎需求咨询 — textImage
  {
    blockType: "textImage",
    anchor: "twin-request",
    title: "双胎需求咨询",
    subtitle: "了解双胎移植的风险、可行性与医学建议",
    body: "部分家庭希望通过一次移植两个胚胎来提高成功率或实现双胎妊娠。从医学角度来看，双胎妊娠属于高危妊娠，对母婴健康均有额外风险，包括早产、妊娠期高血压、妊娠期糖尿病、产后出血等并发症的发生率会显著增加。\n\n医生在决定是否进行双胎移植时，会综合考虑以下因素：女方的年龄和子宫条件、胚胎质量、既往移植史、以及身体是否适合多胎妊娠。对于子宫条件不理想或有其他高危因素的患者，医生通常建议单胚胎移植以降低风险。\n\n天悦宝贝的顾问会帮助您客观了解双胎移植的利弊，包括医学风险、成功率差异和各国医疗团队的不同策略。我们不会承诺\"一定双胎\"或\"保证成功\"，而是协助您与医生充分沟通，在了解所有风险和限制的基础上做出适合自己的决定。",
    imagePosition: "left",
    cardTone: "blue",
  },
  // ⑥ 医学评估与资料准备 — infoCard
  {
    blockType: "infoCard",
    anchor: "medical-evaluation",
    title: "医学评估与资料准备",
    subtitle: "充分的前期评估是制定个性化方案的基础",
    items: [
      {
        title: "基础生育力检查",
        description:
          "包括激素六项、AMH 检测、超声检查、精液分析等，评估夫妻双方的生育能力和身体状况。这些检查结果是医生判断适用方案的重要依据。",
        icon: "stethoscope",
      },
      {
        title: "既往病史与治疗记录",
        description:
          "整理既往的生育相关病史、手术记录、试管婴儿周期记录等。详细的病史资料有助于医生更全面地了解情况，避免重复检查和治疗。",
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
          "辅助生殖过程可能带来较大的心理压力，部分海外机构会要求进行心理评估。天悦宝贝建议在开始周期前做好充分的心理准备，必要时寻求专业心理支持。",
        icon: "heart",
      },
    ],
    cardTone: "blue",
  },
  // ⑦ 海外国家与机构选择 — textImage
  {
    blockType: "textImage",
    anchor: "overseas-options",
    title: "海外国家与机构选择",
    subtitle: "了解不同国家的法律政策与医疗资源特点",
    body: "不同国家和地区在辅助生殖领域的法律政策、技术水平和服务模式存在显著差异。天悦宝贝可为您提供多个海外目的地的信息咨询，包括美国、泰国、日本、马来西亚、格鲁吉亚、哥伦比亚等地的相关政策、医疗资源和服务流程。\n\n在选择海外方案时，建议综合考虑以下因素：当地法律是否允许您的具体需求（如 PGT 检测、第三方辅助生殖等）、医疗技术水平和实验室条件、语言沟通便利性、后续使用的便捷性、以及旅行和生活成本。\n\n我们的顾问会根据您的具体需求和医生的评估结果，为您筛选适合的海外目的地和医疗机构，并提供详细的方案对比分析。需要强调的是，所有海外方案都必须在合法合规的框架内进行，天悦宝贝不会推荐任何违反当地法律或中国法律的服务。",
    imagePosition: "right",
    cardTone: "blue",
  },
  // ⑧ 服务流程 — processTimeline
  {
    blockType: "processTimeline",
    anchor: "service-process",
    title: "私人订制服务流程",
    subtitle: "了解从咨询到完成的完整服务流程",
    items: [
      {
        title: "初步咨询",
        description:
          "通过线上或线下方式与顾问进行初步沟通，了解您的基本需求和生育目标，介绍私人订制服务的内容和流程。",
        icon: "message",
      },
      {
        title: "需求梳理与分析",
        description:
          "顾问深入了解您的家庭情况、生育历史、既往检查和治疗记录、以及您对方案的具体期望和顾虑，形成初步的需求分析报告。",
        icon: "file",
      },
      {
        title: "资料收集与整理",
        description:
          "协助您收集和整理相关的医学检查报告、病史资料等，确保医生评估时有完整的参考信息。",
        icon: "stethoscope",
      },
      {
        title: "医学评估",
        description:
          "由合作的生殖医学专家根据您的资料进行专业评估，判断您的身体条件适合哪些方案，以及各方案的预期效果和可能的风险。",
        icon: "shield",
      },
      {
        title: "合法合规方案说明",
        description:
          "顾问根据医生的评估结果，为您详细解读可行的方案选项，包括不同国家和地区的法律政策、适用条件和流程差异。",
        icon: "scale",
      },
      {
        title: "国家与机构匹配",
        description:
          "根据您的需求和医生建议，筛选适合的海外目的地和医疗机构，提供详细的机构资质、医生团队、费用构成等对比信息。",
        icon: "map",
      },
      {
        title: "试管周期准备",
        description:
          "确定方案后，协助您与海外医疗团队沟通，安排行程、翻译、住宿等事宜，并指导您进行周期前的身体准备。",
        icon: "clock",
      },
      {
        title: "胚胎培养与检测咨询",
        description:
          "在试管周期进行期间，协助您了解胚胎培养进展和遗传学检测（如适用）的结果解读，与医疗团队保持沟通。",
        icon: "beaker",
      },
      {
        title: "移植计划与孕期管理",
        description:
          "根据胚胎情况和您的身体状况，协助制定移植计划。移植后提供孕期管理的基本指导和资源对接。",
        icon: "heart",
      },
      {
        title: "后续沟通与支持",
        description:
          "在整个流程完成后，继续提供后续沟通支持，包括孕期疑问解答、产后随访资源对接等。",
        icon: "message",
      },
    ],
    cardTone: "blue",
  },
  // ⑨ 数据卡片 — stats
  {
    blockType: "stats",
    title: "天悦宝贝服务数据",
    subtitle: "我们致力于为每位客户提供专业、可靠的咨询服务",
    items: [
      {
        title: "多年行业服务经验",
        value: "多年",
        description: "深耕辅助生殖咨询领域",
      },
      {
        title: "多地合作医疗资源",
        value: "多地资源",
        description: "覆盖国内外多个地区",
      },
      {
        title: "一对一专属顾问",
        value: "一对一",
        description: "每位客户配备专属顾问",
      },
      {
        title: "24 小时内响应",
        value: "24h 响应",
        description: "收到咨询后快速安排联系",
      },
    ],
    cardTone: "blue",
  },
  // ⑩ 专业建议 — inlineCta
  {
    blockType: "inlineCta",
    anchor: "professional-advice",
    title: "专业顾问建议",
    subtitle: "私人订制方案需要建立在充分了解和专业评估的基础上",
    body: "私人订制辅助生殖涉及医学、法律、伦理等多个层面，每个家庭的情况各不相同。天悦宝贝建议您在做出任何决定前，先与专业的生殖医学顾问进行充分沟通，了解自身的身体状况、适用的方案选择、合法合规地区的政策要求、以及可能涉及的风险和注意事项。我们的顾问团队可以为您提供一对一的咨询服务，帮助您梳理信息、了解方案，但最终决定应基于医生的专业评估、法律意见和您自身的实际情况。",
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
    "天悦宝贝顾问团队拥有多年辅助生殖咨询服务经验，熟悉国内外辅助生殖政策、技术流程与医疗机构特点。团队成员持续关注辅助生殖领域的最新进展，致力于为每位客户提供专业、客观、保密的咨询服务。已为众多有个性化生育需求的家庭提供过方案评估与流程指导。",
  specialties: [
    "个性化方案评估",
    "性别需求咨询",
    "双胎方案评估",
    "海外合法方案规划",
    "胚胎检测咨询",
    "遗传病风险评估",
    "流程协调与陪伴",
  ],
};

// ── 默认案例 ──

const DEFAULT_CASES: NonNullable<PrivateCustomizationPage["caseItems"]> = [
  {
    title: "高龄家庭的个性化方案评估",
    profile: "40 岁出头的夫妻",
    story:
      "一对 40 岁出头的夫妻，女方卵巢功能明显下降，既往在国内有过两次试管失败的经历。他们通过天悦宝贝咨询了是否有其他可行的方案选择。顾问在详细了解了他们的既往治疗记录和身体状况后，建议先进行一次全面的生育力评估，并整理了海外不同地区的方案对比信息。",
    resultDescription:
      "在完成评估后，顾问为他们梳理了多个合法合规地区的方案选项，包括不同国家的 PGT 技术特点、费用构成和流程差异。他们表示通过咨询对可行的方案有了更清晰的认识，可以根据自身情况做出知情决策。",
    testimonial:
      "之前对海外方案了解很少，顾问帮我们梳理了很多细节，让我们知道有哪些合法合规的选择，也帮我们理解了每个方案的利弊。",
  },
  {
    title: "有遗传病风险家庭的胚胎检测咨询",
    profile: "有遗传病家族史的年轻夫妻",
    story:
      "一对年轻夫妻，男方家族有已知的单基因遗传病史，他们希望了解是否可以通过胚胎检测避免将遗传病传给下一代。顾问建议他们先进行遗传学咨询和基因检测，明确遗传风险类型，再根据结果了解 PGT-M（单基因病检测）的适用性和流程。",
    resultDescription:
      "遗传学咨询结果显示该遗传病属于常染色体隐性遗传，PGT-M 技术可以在合法合规地区对胚胎进行针对性检测。顾问为他们整理了具备 PGT-M 资质的海外机构信息，并协助安排了与医疗团队的沟通。他们表示对检测的适用范围和局限性有了更全面的了解。",
    testimonial:
      "顾问非常专业，帮我们理清了遗传检测的流程和注意事项，也让我们知道检测不是万能的，需要理性看待。",
  },
  {
    title: "希望了解双胎方案家庭的风险评估",
    profile: "30 多岁的夫妻",
    story:
      "一对 30 多岁的夫妻，在咨询试管婴儿方案时表达了希望通过一次移植实现双胎的愿望。顾问在了解了女方的子宫条件和身体状况后，详细介绍了双胎妊娠的医学风险，并建议他们与医生充分沟通后再做决定。",
    resultDescription:
      "医生根据女方的子宫条件和年龄，评估后建议单胚胎移植以降低风险，同时解释了双胎妊娠可能带来的并发症。顾问帮助夫妻理解了医生的建议，并介绍了不同医疗团队在移植策略上的差异。他们最终决定遵循医生的专业建议。",
    testimonial:
      "一开始我们确实想一次搞定双胎，但顾问和医生详细解释了风险后，我们理解了为什么单胚胎移植更安全。感谢顾问的耐心沟通。",
  },
];

// ── 默认 FAQ ──

const DEFAULT_FAQ = [
  {
    question: "什么是私人订制辅助生殖？和普通试管婴儿有什么区别？",
    answer:
      "私人订制辅助生殖并非一种独立的医疗技术，而是一种以客户需求为导向的咨询服务模式。与标准化的试管婴儿流程不同，私人订制服务会根据每个家庭的具体情况（如年龄、身体状况、生育历史、特殊需求等），进行一对一的需求梳理和方案评估，帮助客户在合法合规的框架内找到最适合的方案路径。普通试管婴儿通常在一个医疗机构内按照标准流程进行，而私人订制服务可能涉及多个地区的医疗资源对比、不同技术方案的评估、以及更全面的流程协调和陪伴服务。",
  },
  {
    question: "私人订制方案是否适合所有家庭？",
    answer:
      "不是。私人订制方案主要面向有特殊需求或情况较为复杂的家庭，如多次试管失败、有遗传病风险、需要了解海外合法方案等。对于身体状况良好、需求较为简单的家庭，标准化的试管婴儿流程可能已经足够。是否需要私人订制服务，建议先与顾问沟通，了解不同服务模式的适用范围后再做决定。天悦宝贝的顾问会根据您的实际情况，客观地建议您选择最适合的服务方式，而不会过度推荐不必要的服务。",
  },
  {
    question: "性别需求是否可以保证？在哪些地区可以合法进行？",
    answer:
      "胚胎性别选择涉及法律和伦理问题，不同国家和地区的法律政策差异很大。在部分允许胚胎遗传学检测（PGT）的合法地区（如美国部分州），医生可以在有医学指征（如 X 连锁遗传病）的前提下，通过 PGT-A 或 PGT-M 技术对胚胎进行染色体层面的检测，其中包含性别信息。但需要注意的是：1）性别选择不能仅因个人偏好而进行，必须有医学指征；2）天悦宝贝不会承诺\"一定男孩\"或\"一定女孩\"，所有方案都需在合法合规的框架内进行；3）我们的角色是帮助您了解不同地区的法律政策和医疗资源，而非直接提供医疗服务。",
  },
  {
    question: "双胎是否可以指定？双胎移植有什么风险？",
    answer:
      "双胎移植并非所有情况都可行，也不能\"指定\"双胎。双胎妊娠属于高危妊娠，对母婴健康均有额外风险，包括早产、低出生体重、妊娠期高血压、妊娠期糖尿病、产后出血等并发症的发生率会显著增加。医生在决定是否进行双胎移植时，会综合考虑女方的年龄、子宫条件、胚胎质量和既往移植史等因素。对于子宫条件不理想或有其他高危因素的患者，医生通常建议单胚胎移植以降低风险。天悦宝贝会帮助您客观了解双胎移植的利弊，但最终方案需以医生的专业判断为准，我们不会承诺\"一定双胎\"。",
  },
  {
    question: "为什么要先做医学评估？评估包括哪些内容？",
    answer:
      "医学评估是制定任何辅助生殖方案的基础和前提。通过医学评估，医生可以了解您的生育能力、身体状况和可能的风险因素，从而判断哪些方案适合您、哪些方案不适合或风险较高。评估通常包括：1）基础生育力检查，如激素六项、AMH、超声、精液分析等；2）既往病史和治疗记录回顾；3）遗传学检查与评估（如有需要）；4）心理评估与准备。详细的评估结果有助于制定更精准的方案，也有助于您在充分了解自身情况的基础上做出知情决策。天悦宝贝会协助您收集和整理相关资料，并安排与生殖医学专家的沟通。",
  },
  {
    question: "海外合法合规方案如何选择？需要考虑哪些因素？",
    answer:
      "选择海外方案时，建议综合考虑以下因素：1）法律法规，目标国家或地区是否允许您的具体需求（如 PGT 检测、第三方辅助生殖等），法律对各方权益的保护程度如何；2）医疗技术水平，了解目标地区辅助生殖领域的技术实力、实验室条件和医生团队经验；3）语言沟通，是否有中文服务或翻译支持；4）后续使用便利性，如未来是否需要在同一地区进行后续治疗；5）费用构成，包括医疗费用、药物费用、旅行住宿费用等；6）时间安排，是否需要多次前往。天悦宝贝的顾问会根据您的具体情况提供不同地区的方案对比分析和建议。",
  },
  {
    question: "私人订制方案的流程通常需要多长时间？",
    answer:
      "私人订制方案的时间因个人情况和选择的方案而异。一般来说，从开始咨询到确定方案，通常需要 2-4 周，包括初步咨询、需求梳理、资料收集和医学评估等环节。确定方案后，具体的时间安排取决于所选的技术路径和目的地：如选择海外试管婴儿方案，从准备到完成整个周期可能需要 2-3 个月；如涉及更复杂的需求（如第三方辅助生殖），时间可能更长。顾问会根据您的具体情况提供更详细的时间预期。",
  },
  {
    question: "私人订制方案的费用由哪些部分组成？",
    answer:
      "私人订制方案的费用构成因方案不同而有较大差异，通常包括以下几个部分：1）咨询服务费用，包括方案评估、资源匹配、流程协调等服务；2）医疗费用，包括检查、药物、手术、胚胎培养和检测等，具体费用因地区和医疗机构而异；3）法律费用，如涉及合同、亲权确认等法律事务；4）旅行和生活费用，如涉及海外就医，需考虑机票、住宿、翻译等费用；5）其他费用，如保险、心理支持等。天悦宝贝会在方案说明阶段为您提供详细的费用清单，帮助您做好充分的财务准备。",
  },
  {
    question: "隐私如何保护？咨询过程是否保密？",
    answer:
      "天悦宝贝非常重视客户隐私保护。我们采取以下措施确保您的信息安全：1）所有客户资料严格保密，未经授权不会向任何第三方披露；2）咨询过程完全保密，您可以放心沟通您的需求和顾虑；3）我们会根据您的意愿，在必要时与海外医疗团队进行匿名或化名沟通；4）所有合作的海外机构都需遵守当地的隐私保护法规。如果您对隐私保护有任何特殊要求，可以在咨询时与顾问沟通，我们会尽力满足您的需求。",
  },
  {
    question: "辅助生殖有哪些医学风险？",
    answer:
      "辅助生殖涉及的医学风险需要从多个角度了解：1）促排卵和取卵过程可能存在卵巢过度刺激综合征（OHSS）、出血、感染等风险，但发生率较低；2）胚胎移植的成功率受多种因素影响，无法保证每次移植都能成功；3）如涉及第三方辅助生殖，可能存在妊娠并发症等风险；4）胚胎遗传学检测（PGT）可以筛选已知遗传风险，但不能排除所有遗传问题；5）辅助生殖出生的后代在长期健康方面已有较多研究支持，但仍建议在孕期和产后进行规范的医学随访。建议在咨询时向医生详细了解您个人情况下的具体风险和注意事项。",
  },
  {
    question: "需要准备哪些资料才能开始咨询？",
    answer:
      "开始咨询前，建议准备以下资料：1）夫妻双方的身份信息；2）既往的生育相关检查报告（如激素检查、超声报告、精液分析等）；3）既往的治疗记录（如试管婴儿周期记录、手术记录等）；4）如有遗传病家族史，提供相关的遗传学检查报告；5）您希望了解的具体问题和需求清单。这些资料有助于顾问更准确地了解您的情况，提供更有针对性的方案建议。如果您暂时没有完整的资料，也可以先进行初步咨询，顾问会告知您还需要补充哪些检查。",
  },
  {
    question: "如何开始私人订制辅助生殖咨询？",
    answer:
      "开始咨询非常简单：1）您可以通过页面上的在线咨询表单提交基本信息和咨询需求，顾问会在 24 小时内与您联系；2）也可以拨打咨询热线或添加微信客服直接沟通；3）初次咨询通常为线上沟通，顾问会了解您的基本情况、需求和顾虑，并提供初步的方案建议；4）如有近期的检查报告，建议在咨询时提供，以便顾问更准确地评估您的情况。咨询过程完全保密，您可以放心沟通。天悦宝贝致力于为每个家庭提供专业、客观、保密的咨询服务。",
  },
];

// ── 默认 Sidebar ──

const DEFAULT_SIDEBAR = {
  title: "私人订制咨询",
  description:
    "专业顾问为您提供个性化辅助生殖方案评估与咨询服务，帮助您了解合法合规方案、评估适用性。",
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
  title: "开始了解私人订制方案",
  description:
    "每个家庭的情况都是独特的。专业的咨询顾问随时为您服务，帮助您更清晰地了解个性化方案选择，做出适合自己的知情决策。",
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
    case "fingerprint":
      return <Fingerprint className="w-5 h-5" />;
    case "map":
      return <MapPin className="w-5 h-5" />;
    case "beaker":
      return <FileSearch className="w-5 h-5" />;
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
  const { privateCustomizationPage: p, siteSettings } =
    await fetchPrivateCustomizationPageData();
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
  block: NonNullable<PrivateCustomizationPage["contentBlocks"]>[number];
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
  data: PrivateCustomizationPage;
  doctor: PrivateCustomizationPage;
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
        <ConsultationForm source="private-customization" />
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
          {DEFAULT_STATS.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <span className="text-xs font-bold text-[#2563eb]">
                  {item.value}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#173b68]">
                  {item.title}
                </p>
                <p className="text-xs text-[#8a9bb5]">{item.description}</p>
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

      {/* 热门国家/地区 */}
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

// ── 默认数据卡片（用于 Sidebar） ──

const DEFAULT_STATS = [
  {
    title: "多年行业服务经验",
    value: "多年",
    description: "深耕辅助生殖咨询领域",
  },
  {
    title: "多地合作医疗资源",
    value: "多地资源",
    description: "覆盖国内外多个地区",
  },
  {
    title: "一对一专属顾问",
    value: "一对一",
    description: "每位客户配备专属顾问",
  },
  {
    title: "24 小时内响应",
    value: "24h 响应",
    description: "收到咨询后快速安排联系",
  },
];

// ── Page Component ──

export default async function PrivateCustomizationPage() {
  const { privateCustomizationPage: p, siteSettings } =
    await fetchPrivateCustomizationPageData();

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
    p?.faqDescription || "关于私人订制辅助生殖的常见疑问解答";

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
  const readingTime = p?.readingTime || "10 分钟阅读";
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
        url="https://www.tianyuebaby.com/private-customization"
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
            <span className="text-white/90 font-medium">私人订制</span>
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
                  data={p || ({} as PrivateCustomizationPage)}
                  doctor={p || ({} as PrivateCustomizationPage)}
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
            data={p || ({} as PrivateCustomizationPage)}
            doctor={p || ({} as PrivateCustomizationPage)}
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
