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
  Snowflake,
  Heart,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Beaker,
  FileSearch,
  Stethoscope,
} from "lucide-react";
import { ConsultationForm } from "@/components/shared/consultation-form";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { fetchEggSpermFreezingPageData } from "@/sanity/lib/fetchers";
import { contentImageUrl, bannerImageUrl } from "@/sanity/lib/image";
import type { EggSpermFreezingPage, ImageWithAlt } from "@/types/sanity";

// ── 默认 SEO ──

const DEFAULT_SEO = {
  title: "冻卵冻精咨询与生育力保存方案 | 天悦宝贝",
  description:
    "天悦宝贝提供冻卵、冻精、生育力保存专业咨询服务，涵盖海外冻卵方案、试管前评估、实验室玻璃化冷冻技术、适用人群分析与全程流程陪伴，帮助您做出知情决策。",
};

// ── 默认 Hero ──

const DEFAULT_HERO = {
  title: "冻卵冻精咨询与生育力保存方案",
  subtitle:
    "科学评估 · 专业陪伴 · 帮助您更清晰地了解冻卵冻精技术与生育力保存选择",
  description:
    "天悦宝贝为有需求的人群提供冻卵、冻精生育力保存相关的专业咨询服务，包括前期评估、技术解读、试管前检查、海外方案比较与全程流程陪伴。无论您是因职业规划、健康治疗还是其他个人原因希望保存生育力，我们的顾问团队都将为您提供专业、保密的一对一咨询支持。",
  primaryButtonText: "立即咨询",
  primaryButtonLink: "#consultation",
  secondaryButtonText: "预约方案评估",
  secondaryButtonLink: "#content-start",
};

// ── 默认目录 ──

const DEFAULT_TOC = [
  { title: "什么是冻卵/冻精", anchor: "what-is-freezing" },
  { title: "哪些人适合考虑", anchor: "suitable-for" },
  { title: "冻卵流程", anchor: "egg-freezing-process" },
  { title: "冻精流程", anchor: "sperm-freezing-process" },
  { title: "实验室冷冻技术", anchor: "lab-technology" },
  { title: "成功率影响因素", anchor: "success-factors" },
  { title: "费用与周期", anchor: "cost-and-cycle" },
  { title: "海外冻卵方案", anchor: "overseas-options" },
  { title: "医生建议", anchor: "doctor-advice" },
  { title: "案例参考", anchor: "cases" },
  { title: "常见问题", anchor: "faq" },
];

// ── 默认正文模块 ──

const DEFAULT_CONTENT_BLOCKS: NonNullable<
  EggSpermFreezingPage["contentBlocks"]
> = [
  // ① 什么是冻卵冻精 — textImage
  {
    blockType: "textImage",
    anchor: "what-is-freezing",
    title: "什么是冻卵/冻精",
    subtitle: "了解生育力保存的基本概念与技术原理",
    body: "冻卵（卵母细胞冷冻保存）和冻精（精子冷冻保存）是现代辅助生殖技术中的重要生育力保存手段。通过超低温冷冻技术，将卵子或精子在 -196°C 的液氮环境中长期保存，以便在未来需要时使用。\n\n冻卵技术的核心是\"玻璃化冷冻\"（Vitrification），这是一种快速冷冻方法，能够在极短时间内将细胞温度降至极低，避免冰晶形成对细胞结构造成损伤。相比早期的慢速冷冻技术，玻璃化冷冻显著提高了卵子复苏后的存活率。\n\n冻精技术则更为成熟，精子由于体积小、结构相对简单，冷冻复苏的存活率通常较高。冷冻保存的精子可在辅助生殖周期中随时解冻使用。\n\n需要强调的是，冻卵冻精并非保证未来一定能成功生育，而是为生育力提供一个\"时间暂停\"的机会。是否适合进行冻卵冻精，需要由专业医生根据个人身体状况进行评估。",
    imagePosition: "right",
    cardTone: "blue",
  },
  // ② 适用人群 — infoCard
  {
    blockType: "infoCard",
    anchor: "suitable-for",
    title: "哪些人适合考虑冻卵冻精",
    subtitle: "以下人群可以考虑了解生育力保存，具体是否适合需由医生评估",
    items: [
      {
        title: "职业规划期女性",
        description:
          "目前暂无生育计划，但希望保留未来生育可能性的职业女性。冻卵可以在卵子质量较好的年龄段保存优质卵子，为未来的生育选择提供更多灵活性。",
        icon: "user",
      },
      {
        title: "即将接受医疗治疗者",
        description:
          "即将接受化疗、放疗、卵巢手术或其他可能影响生育能力的医疗治疗的患者，可在治疗前进行冻卵或冻精保存生育力。建议尽早与生殖科医生沟通。",
        icon: "shield",
      },
      {
        title: "辅助生殖周期中的夫妻",
        description:
          "在试管婴儿周期中，如有多余的优质卵子或胚胎，可以选择冷冻保存以备后续使用。这可以减少重复促排卵的需要。",
        icon: "heart",
      },
      {
        title: "有卵巢早衰风险的人群",
        description:
          "有家族遗传病史、卵巢早衰风险、或 AMH 值偏低的人群，可考虑提前保存生育力。建议先进行卵巢储备功能评估。",
        icon: "shield",
      },
      {
        title: "暂无生育计划的单身男性",
        description:
          "冻精流程相对简单，适合因工作、学业或个人原因暂无生育计划但希望保存生育力的单身男性。",
        icon: "user",
      },
      {
        title: "需要辅助生殖前评估的家庭",
        description:
          "计划进行试管婴儿或其他辅助生殖技术的家庭，可在正式进入周期前先进行冻卵冻精作为备选方案。",
        icon: "heart",
      },
    ],
    cardTone: "blue",
  },
  // ③ 冻卵流程 — processTimeline
  {
    blockType: "processTimeline",
    anchor: "egg-freezing-process",
    title: "冻卵流程详解",
    subtitle: "了解冻卵的完整步骤与各阶段注意事项",
    items: [
      {
        title: "前期咨询与评估",
        description:
          "通过专业咨询了解冻卵技术的适用性、流程与注意事项。医生会安排 AMH 检测、超声检查等评估卵巢储备功能，判断是否适合冻卵以及预期获卵数量。",
        icon: "stethoscope",
      },
      {
        title: "身体检查与方案制定",
        description:
          "完成激素六项、传染病筛查、盆腔超声等基础检查。医生根据检查结果、年龄和卵巢功能制定个性化的促排卵方案，包括药物选择和剂量调整。",
        icon: "file",
      },
      {
        title: "促排卵周期",
        description:
          "在医生指导下进行促排卵治疗，通常持续 10-14 天。期间需要定期到院进行超声监测和血液检查，观察卵泡发育情况，适时调整药物剂量。",
        icon: "clock",
      },
      {
        title: "取卵手术",
        description:
          "当卵泡发育成熟后，注射 HCG 触发排卵。约 36 小时后在静脉麻醉下进行经阴道超声引导取卵手术，手术时间通常为 15-30 分钟，术后观察 1-2 小时即可离院。",
        icon: "snowflake",
      },
      {
        title: "卵子评估与冷冻",
        description:
          "取出的卵子在实验室中进行成熟度评估。成熟的卵子（MII 期）采用玻璃化冷冻技术快速降温至 -196°C，保存在液氮罐中。未成熟卵子可能需要体外成熟培养。",
        icon: "beaker",
      },
      {
        title: "冷冻保存与后续管理",
        description:
          "冷冻保存的卵子在液氮环境中可长期保存。医疗机构会定期检查液氮罐状态，确保保存条件稳定。您可与顾问保持联系，了解后续使用时的解冻和受精流程。",
        icon: "shield",
      },
    ],
    cardTone: "blue",
  },
  // ④ 冻精流程 — processTimeline
  {
    blockType: "processTimeline",
    anchor: "sperm-freezing-process",
    title: "冻精流程详解",
    subtitle: "冻精流程相对简单，以下为基本步骤",
    items: [
      {
        title: "咨询与检查",
        description:
          "与医生沟通冻精需求，完成精液常规分析、传染病筛查等基础检查，评估精子质量是否适合冷冻保存。",
        icon: "stethoscope",
      },
      {
        title: "禁欲准备",
        description:
          "通常建议在取精前禁欲 2-7 天，以获得质量较好的精液样本。具体禁欲时间由医生根据个人情况建议。",
        icon: "clock",
      },
      {
        title: "取精与处理",
        description:
          "通过自行取精方式获取精液样本。实验室会对精液进行处理，包括精液液化、精子筛选和添加冷冻保护剂。",
        icon: "beaker",
      },
      {
        title: "冷冻与保存",
        description:
          "处理后的精子样本采用冷冻技术降温至 -196°C，保存在液氮罐中。冷冻精子可长期保存，需要使用时解冻复苏即可。",
        icon: "snowflake",
      },
    ],
    cardTone: "blue",
  },
  // ⑤ 实验室冷冻技术 — textImage
  {
    blockType: "textImage",
    anchor: "lab-technology",
    title: "实验室玻璃化冷冻技术",
    subtitle: "了解冻卵冻精背后的实验室技术",
    body: "玻璃化冷冻（Vitrification）是目前冻卵领域主流的冷冻技术。与早期的慢速冷冻方法不同，玻璃化冷冻通过极高的降温速率（约 15,000-30,000°C/分钟），使细胞内的液体在形成冰晶之前直接转变为玻璃态固体，从而避免冰晶对细胞结构的损伤。\n\n在冻卵过程中，卵子首先会被脱水并替换为含有高浓度冷冻保护剂的溶液，然后迅速放入预冷至 -196°C 的液氮中。整个过程在数秒内完成。\n\n研究表明，采用玻璃化冷冻技术的卵子复苏存活率可达 90% 以上（具体数据因实验室条件和卵子质量而异）。冻精技术则更为成熟，精子由于体积小、结构相对简单，冷冻复苏的存活率通常较高。\n\n需要说明的是，冷冻保存技术虽然已经较为成熟，但并不能保证所有冷冻的卵子或精子在复苏后都能成功受精或发育为健康胚胎。成功率受多种因素影响，包括冷冻时的年龄、卵子/精子质量、实验室条件等。",
    imagePosition: "left",
    cardTone: "blue",
  },
  // ⑥ 成功率影响因素 — infoCard
  {
    blockType: "infoCard",
    anchor: "success-factors",
    title: "影响冻卵冻精效果的因素",
    subtitle: "冻卵冻精的效果受多种因素影响，了解这些因素有助于做出知情决策",
    items: [
      {
        title: "年龄",
        description:
          "年龄是影响冻卵效果最重要的因素之一。女性在 25-35 岁期间卵子质量相对较好，冻卵效果也相对理想。35 岁以后卵子质量会逐渐下降，40 岁以上冻卵的效果可能受到较大影响。冻精受年龄影响相对较小。",
        icon: "clock",
      },
      {
        title: "卵巢储备功能",
        description:
          "卵巢储备功能通过 AMH 值、窦卵泡计数（AFC）等指标评估。卵巢储备功能较好的女性，促排卵后通常能获得更多卵子，冻卵的\"可用资源\"也相对充足。",
        icon: "heart",
      },
      {
        title: "精子质量",
        description:
          "冻精效果与精子质量密切相关。精液常规分析中的精子浓度、活力、形态等指标会影响冷冻复苏后的精子质量。如有异常，医生可能建议先进行治疗或调理。",
        icon: "user",
      },
      {
        title: "冷冻与复苏技术",
        description:
          "实验室的冷冻技术水平、设备条件和操作规范对冻卵冻精效果有重要影响。选择具备成熟冷冻技术的实验室和医疗团队是保障冻卵冻精质量的重要因素。",
        icon: "beaker",
      },
      {
        title: "冷冻保存条件",
        description:
          "冷冻后的卵子和精子需要在稳定的液氮环境中保存。规范的医疗机构会定期监控液氮罐状态，确保保存条件稳定，避免因温度波动影响样本质量。",
        icon: "shield",
      },
      {
        title: "解冻与受精方式",
        description:
          "解冻后的卵子需要通过 ICSI（卵胞浆内单精子注射）方式受精。受精后的胚胎培养和移植成功率同样受多种因素影响，包括子宫内膜条件、胚胎质量等。",
        icon: "stethoscope",
      },
    ],
    cardTone: "blue",
  },
  // ⑦ 费用与周期 — stats
  {
    blockType: "stats",
    anchor: "cost-and-cycle",
    title: "冻卵冻精费用与周期参考",
    subtitle: "以下为一般性参考信息，具体费用和周期因地区、机构和个人情况而异",
    items: [
      {
        title: "冻卵促排周期",
        value: "10-14 天",
        description: "一般促排卵治疗周期",
      },
      {
        title: "取卵手术时间",
        value: "15-30 分钟",
        description: "通常在静脉麻醉下完成",
      },
      {
        title: "冻精取精时间",
        value: "约 30 分钟",
        description: "含样本处理时间",
      },
      {
        title: "术后恢复",
        value: "1-2 天",
        description: "取卵后一般恢复时间",
      },
    ],
    cardTone: "blue",
  },
  // ⑧ 海外冻卵方案 — textImage
  {
    blockType: "textImage",
    anchor: "overseas-options",
    title: "海外冻卵冻精方案",
    subtitle: "了解不同地区的冻卵冻精政策与服务",
    body: "不同国家和地区对冻卵冻精的政策、法规和服务模式存在差异。天悦宝贝可为您提供多个海外冻卵冻精目的地的信息咨询，包括美国、泰国、日本、马来西亚等地的相关政策、费用参考、医疗资源与服务流程。\n\n在选择海外方案时，建议综合考虑以下因素：当地法律法规是否允许您的情况（如单身冻卵）、医疗技术水平和实验室条件、语言沟通便利性、后续使用的便捷性（如未来是否需要在同一地区解冻使用）、以及旅行和住宿成本。\n\n我们的顾问会根据您的具体情况，提供针对性的海外方案分析与建议，帮助您在充分了解信息的基础上做出适合自己的选择。",
    imagePosition: "right",
    cardTone: "blue",
  },
  // ⑨ 医生建议 — inlineCta（居中提示）
  {
    blockType: "inlineCta",
    anchor: "doctor-advice",
    title: "专业医生建议",
    subtitle: "冻卵冻精是重要的个人决定，建议在充分了解信息后再做选择",
    body: "冻卵冻精涉及医学、法律、伦理等多个层面。建议您在做出决定前，先与专业的生殖科医生或咨询顾问进行充分沟通，了解自身的身体状况、适用性、可能的风险与限制，以及后续使用时的注意事项。天悦宝贝的顾问团队可以为您提供一对一的咨询服务，帮助您梳理信息、了解方案，但最终决定应基于医生的专业评估和您自身的实际情况。",
    buttonText: "预约专业咨询",
    buttonLink: "#consultation",
    cardTone: "blue",
  },
];

// ── 默认数据卡片 ──

const DEFAULT_STATS = [
  {
    title: "多年行业服务经验",
    value: "多年",
    description: "深耕辅助生殖咨询领域，积累丰富服务经验",
  },
  {
    title: "多地合作医疗资源",
    value: "多地资源",
    description: "覆盖国内外多个地区的合作医疗机构",
  },
  {
    title: "一对一专属顾问",
    value: "一对一",
    description: "每位客户配备专属咨询顾问，全程陪伴",
  },
  {
    title: "24 小时内响应",
    value: "24h 响应",
    description: "收到咨询后 24 小时内安排顾问与您联系",
  },
];

// ── 默认医生 ──

const DEFAULT_DOCTOR = {
  name: "天悦宝贝顾问团队",
  title: "生殖咨询顾问",
  experience:
    "天悦宝贝顾问团队拥有多年辅助生殖咨询服务经验，熟悉国内外冻卵冻精政策、技术流程与医疗机构特点。团队成员持续关注辅助生殖领域的最新进展，致力于为每位客户提供专业、客观、保密的咨询服务。已为众多有生育力保存需求的个人和家庭提供过方案评估与流程指导。",
  specialties: [
    "冻卵咨询",
    "冻精咨询",
    "生育力评估",
    "海外方案规划",
    "试管前评估",
    "流程协调",
    "隐私保护",
  ],
};

// ── 默认案例 ──

const DEFAULT_CASES: NonNullable<EggSpermFreezingPage["caseItems"]> = [
  {
    title: "职业女性的冻卵咨询与方案评估",
    profile: "30 岁出头的职业女性",
    story:
      "一位 30 岁出头的职业女性，目前事业处于上升期，暂无近期生育计划，但希望为未来保留生育可能性。她通过天悦宝贝咨询了冻卵的适用性、流程、费用以及国内与海外冻卵的政策差异。顾问根据她的年龄和身体状况，建议她先进行 AMH 检测和基础超声检查，评估卵巢储备功能。",
    resultDescription:
      "在完成前期评估后，顾问为她整理了国内与海外冻卵方案的对比信息，包括政策、费用和后续使用的便利性。她表示通过咨询对冻卵有了更全面的认识，可以根据自身情况做出知情决策。",
    testimonial:
      "之前对冻卵了解很少，以为很简单就能做。顾问帮我梳理了很多细节，让我知道需要考虑的方面比想象中多，也帮我了解了不同方案的利弊。",
  },
  {
    title: "化疗前的生育力保存咨询",
    profile: "即将接受化疗治疗的患者",
    story:
      "一位即将接受化疗治疗的患者，在确诊后得知化疗可能影响生育能力，希望在治疗前了解冻卵或冻精保存生育力的可能性。由于时间紧迫，顾问在接到咨询当天即安排了初步沟通，帮助客户了解了紧急冻卵的流程、时间要求和可能的方案选择。",
    resultDescription:
      "顾问协助客户在有限时间内完成了前期评估和方案匹配，并协调了医疗机构的紧急就诊安排。客户在化疗开始前完成了生育力保存的相关流程。需要说明的是，紧急冻卵的获卵数量和质量可能因个体情况和时间限制而有所不同。",
    testimonial:
      "在最焦虑的时候，顾问的专业和及时响应让我感到安心。虽然时间很紧，但整个过程安排得很有序。",
  },
  {
    title: "夫妻的综合生育力保存规划",
    profile: "新婚不久的年轻夫妻",
    story:
      "一对新婚不久的年轻夫妻，目前双方都希望先完成职业发展目标，但又担心随着年龄增长生育能力会下降。他们同时咨询了冻卵和冻精两种方案，希望了解哪种更适合自己。顾问根据双方的年龄、身体状况和未来规划，分析了冻卵、冻精以及两者结合的方案优劣。",
    resultDescription:
      "顾问为他们整理了不同方案的时间安排、费用构成和后续使用流程的对比信息，并建议他们先完成基础生育力评估。他们表示通过咨询对未来生育规划有了更清晰的思路。",
    testimonial:
      "我们之前不太清楚冻卵和冻精的区别，顾问很耐心地帮我们对比了各种方案，让我们能更好地规划未来。",
  },
];

// ── 默认 FAQ ──

const DEFAULT_FAQ = [
  {
    question: "什么是冻卵？冻卵的基本原理是什么？",
    answer:
      "冻卵，医学上称为卵母细胞冷冻保存（Oocyte Cryopreservation），是将女性的卵子从卵巢中取出后，通过超低温冷冻技术保存在 -196°C 的液氮环境中的过程。目前主流的冻卵技术是\"玻璃化冷冻\"（Vitrification），通过极高的降温速率使卵子内的液体直接转变为玻璃态固体，避免冰晶形成对细胞结构造成损伤。冻卵的目的是在卵子质量较好的年龄段保存卵子，以便在未来需要时解冻使用。需要说明的是，冻卵并不保证未来一定能成功生育，它只是为生育力提供一个保存的机会。",
  },
  {
    question: "什么是冻精？冻精和冻卵有什么区别？",
    answer:
      "冻精是将男性的精子通过冷冻技术保存在 -196°C 液氮环境中的过程。冻精和冻卵的主要区别在于：冻精流程相对简单，通常通过取精后经过实验室处理即可冷冻保存；冻卵流程则较为复杂，需要经历促排卵、定期监测、取卵手术等步骤，整个周期通常需要 2-4 周。从技术成熟度来看，冻精技术发展时间更长，冷冻复苏的成功率通常较高。冻精适合因工作、健康或其他原因需要保存生育力的男性，冻卵则主要面向有生育力保存需求的女性。",
  },
  {
    question: "哪些人适合考虑冻卵冻精？",
    answer:
      "冻卵冻精适合以下人群：1）目前暂无生育计划但希望保留未来生育可能性的职业女性或男性；2）即将接受化疗、放疗或其他可能影响生育能力的医疗治疗的患者；3）在辅助生殖周期中有多余卵子或精子需要保存的夫妻；4）有卵巢早衰风险或家族遗传病史的人群；5）因其他个人原因希望保存生育力的人群。是否适合进行冻卵冻精，需要由专业医生根据个人身体状况、年龄、卵巢储备功能等因素进行综合评估后决定。",
  },
  {
    question: "冻卵的最佳年龄是多少？年龄对冻卵效果有什么影响？",
    answer:
      "一般建议在 25-35 岁之间考虑冻卵，这个年龄段卵子质量相对较好，冻卵后的预期效果也相对理想。年龄是影响冻卵效果最重要的因素之一：女性在 35 岁以后卵子质量会逐渐下降，染色体异常的风险增加，40 岁以上冻卵的效果可能受到较大影响。但这并不意味着 35 岁以上就不能冻卵，只是需要对预期效果有合理的认识。冻精受年龄影响相对较小，但仍建议在精子质量较好的年龄段进行。具体是否适合冻卵冻精，需要根据个人身体状况由医生评估。",
  },
  {
    question: "AMH 值是什么？AMH 低还能冻卵吗？",
    answer:
      "AMH（抗苗勒氏管激素）是评估女性卵巢储备功能的重要指标之一。AMH 值可以反映卵巢中剩余卵泡的数量，一般 AMH 值越高，说明卵巢储备功能越好，促排卵后预期获得的卵子数量可能越多。但 AMH 值低并不意味着不能冻卵，只是预期获卵数量可能较少。卵巢储备功能还需要结合窦卵泡计数（AFC）、FSH 等指标综合判断。建议在咨询时向医生提供完整的检查报告，由医生评估是否适合冻卵以及预期效果。",
  },
  {
    question: "冻卵周期需要多长时间？整个流程是怎样的？",
    answer:
      "冻卵周期从开始促排卵到取卵完成，通常需要 2-4 周。具体流程包括：1）前期咨询与评估（1-2 周），包括 AMH 检测、超声检查、激素检查等；2）促排卵治疗（10-14 天），期间需要定期到院进行超声监测和血液检查；3）取卵手术（1 天），在卵泡成熟后进行，手术时间约 15-30 分钟，通常在静脉麻醉下完成；4）术后恢复（1-2 天）。如果加上前期检查和方案制定的时间，整个过程可能需要 4-6 周。具体时间因个人情况和医生方案而异。",
  },
  {
    question: "冻精前需要做什么准备？",
    answer:
      "冻精前的准备相对简单：1）咨询与检查，与医生沟通冻精需求，完成精液常规分析、传染病筛查等基础检查；2）禁欲准备，通常建议在取精前禁欲 2-7 天，以获得质量较好的精液样本，具体时间由医生根据个人情况建议；3）生活习惯调整，建议在取精前避免饮酒、吸烟、熬夜等不良习惯，保持规律作息；4）如有生殖系统疾病或感染，建议先治疗后再进行冻精。整个冻精流程从检查到完成冷冻保存，通常 1-2 周内可以完成。",
  },
  {
    question: "冷冻保存的卵子和精子可以保存多久？",
    answer:
      "在 -196°C 的液氮环境中，理论上卵子和精子可以长期保存。目前已有冷冻保存超过 10 年的卵子成功复苏并受孕的临床案例。精子由于体积小、结构相对简单，冷冻保存的效果通常更为稳定。但需要注意的是，冷冻保存的时间长短并不是决定未来使用效果的唯一因素，冷冻时的卵子/精子质量、冷冻技术、保存条件等同样重要。建议定期与保存机构确认样本的保存状态，并了解后续使用时的流程和注意事项。",
  },
  {
    question: "如何选择海外冻卵冻精方案？需要考虑哪些因素？",
    answer:
      "选择海外冻卵冻精方案时，建议综合考虑以下因素：1）法律法规，不同国家和地区对冻卵冻精的政策不同，如是否允许单身冻卵、冻卵后的使用限制等；2）医疗技术水平，了解目标地区辅助生殖领域的技术实力和实验室条件；3）语言沟通，是否有中文服务或翻译支持；4）后续使用便利性，如未来是否需要在同一地区解冻使用；5）费用构成，包括医疗费用、药物费用、旅行住宿费用等；6）时间安排，是否需要多次前往。天悦宝贝的顾问可以根据您的具体情况提供海外方案的对比分析和建议。",
  },
  {
    question: "冻卵冻精的费用大概由哪些部分构成？",
    answer:
      "冻卵冻精的费用通常包括以下几个部分：1）前期检查费用，包括 AMH 检测、激素检查、超声检查、传染病筛查等；2）促排卵药物费用（冻卵），根据方案不同，药物种类和用量有所差异；3）取卵/取精手术费用；4）实验室处理和冷冻保存费用；5）后续年度保存费用。海外冻卵还需考虑旅行、住宿、翻译等额外费用。具体费用因地区、医疗机构和个体方案不同而有较大差异。建议在咨询时详细了解费用明细，避免遗漏。",
  },
  {
    question: "冻卵冻精有哪些风险和注意事项？",
    answer:
      "冻卵冻精的常见注意事项包括：1）促排卵期间可能出现卵巢过度刺激综合征（OHSS），但发生率较低，医生会通过监测和调整药物来降低风险；2）取卵手术为微创手术，可能有轻微出血、感染等风险，但总体安全性较高；3）冷冻和复苏过程中可能有一定比例的卵子/精子损失；4）冻卵冻精并不保证未来一定能成功生育，它只是保存生育力的手段之一；5）长期冷冻保存的安全性已有较多研究支持，但仍建议定期确认保存状态。建议在咨询时向医生详细了解个人情况下的风险和注意事项。",
  },
  {
    question: "如何开始冻卵冻精咨询？需要准备什么？",
    answer:
      "开始冻卵冻精咨询非常简单：1）您可以通过页面上的在线咨询表单提交基本信息和咨询需求，顾问会在 24 小时内与您联系；2）也可以拨打咨询热线或添加微信客服直接沟通；3）初次咨询通常为线上沟通，顾问会了解您的基本情况、需求和顾虑，并提供初步的方案建议；4）如有近期的检查报告（如 AMH、激素六项、超声报告等），建议在咨询时提供，以便顾问更准确地评估您的情况。咨询过程完全保密，您可以放心沟通。",
  },
];

// ── 默认 Sidebar ──

const DEFAULT_SIDEBAR = {
  title: "冻卵冻精咨询",
  description:
    "专业顾问为您提供冻卵冻精、生育力保存相关的咨询服务，帮助您了解方案、评估适用性。",
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
  title: "开始了解冻卵冻精方案",
  description:
    "冻卵冻精是重要的个人决定。专业的咨询顾问随时为您服务，帮助您更清晰地了解技术、流程与方案选择，做出适合自己的知情决策。",
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
    case "snowflake":
      return <Snowflake className="w-5 h-5" />;
    case "phone":
      return <Phone className="w-5 h-5" />;
    case "message":
      return <MessageCircle className="w-5 h-5" />;
    case "beaker":
      return <Beaker className="w-5 h-5" />;
    case "file":
      return <FileSearch className="w-5 h-5" />;
    case "stethoscope":
      return <Stethoscope className="w-5 h-5" />;
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
  const { eggSpermFreezingPage: p, siteSettings } =
    await fetchEggSpermFreezingPageData();
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
  block: NonNullable<EggSpermFreezingPage["contentBlocks"]>[number];
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
      // doctorProfile 通过顶层 doctor 字段渲染，此处跳过
      return null;

    case "caseStudy":
      // caseStudy 通过顶层 caseItems 渲染，此处跳过
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
  data: EggSpermFreezingPage;
  doctor: EggSpermFreezingPage;
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
        <ConsultationForm source="egg-sperm-freezing" />
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
      {DEFAULT_STATS.length > 0 && (
        <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
          <h3 className="text-base font-semibold text-[#173b68] mb-3">
            为什么选择天悦宝贝
          </h3>
          <div className="space-y-3">
            {DEFAULT_STATS.map((item, i) => (
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
                  <p className="text-xs text-[#8a9bb5]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
            热门国家
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

export default async function EggSpermFreezingPage() {
  const { siteSettings, eggSpermFreezingPage: p } =
    await fetchEggSpermFreezingPageData();

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
    p?.faqDescription || "关于冻卵冻精的常见疑问解答";

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
        url="https://www.tianyuebaby.com/egg-sperm-freezing"
      />

      {/* ════════════════════════════════════════
          1. Hero Banner
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 500 }}>
        {/* 背景图 */}
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
        {/* 遮罩 */}
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
            <span className="text-white/90 font-medium">冻卵/冻精</span>
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
              {/* contentBlocks */}
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
                    每个人的情况不同，实际效果需由医生根据个人状况评估。
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
                  data={p || ({} as EggSpermFreezingPage)}
                  doctor={p || ({} as EggSpermFreezingPage)}
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
            data={p || ({} as EggSpermFreezingPage)}
            doctor={p || ({} as EggSpermFreezingPage)}
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
