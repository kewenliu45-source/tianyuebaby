import type { SchemaTypeDefinition } from "sanity";

// Object Schemas
import { bannerSlide } from "./objects/bannerSlide";
import { cta } from "./objects/cta";
import { imageWithAlt } from "./objects/imageWithAlt";
import { portableImage } from "./objects/portableImage";
import { link } from "./objects/link";
import { richText } from "./objects/richText";
import { seo } from "./objects/seo";

// Document Schemas
import { siteSettings } from "./documents/siteSettings";
import { homePage } from "./documents/homePage";
import { intendedParents } from "./documents/intendedParents";
import { journey } from "./documents/journey";
import { whyUs } from "./documents/whyUs";
import { faqPage } from "./documents/faqPage";
import { startJourney } from "./documents/startJourney";
import { newsArticle } from "./documents/newsArticle";
import { newsPage } from "./documents/newsPage";
import { newsCategory } from "./documents/newsCategory";
import { faqItem } from "./documents/faqItem";
import { faqCategory } from "./documents/faqCategory";
import { consultationLead } from "./documents/consultationLead";
import { privacyPage } from "./documents/privacyPage";
import { thirdGenerationIvfPage } from "./documents/thirdGenerationIvfPage";
import { ivfServicesPage } from "./documents/ivfServicesPage";
import { eggSpermFreezingPage } from "./documents/eggSpermFreezingPage";
import { thirdPartyAssistedReproductionPage } from "./documents/thirdPartyAssistedReproductionPage";
import { privateCustomizationPage } from "./documents/privateCustomizationPage";
import { successCasesPage } from "./documents/successCasesPage";
import { successCase } from "./documents/successCase";
import { medicalServicesPage } from "./documents/medicalServicesPage";
import { scienceVideo } from "./documents/scienceVideo";
import { videosPage } from "./documents/videosPage";
import { videoCategory } from "./documents/videoCategory";
import { aboutTianyuePage } from "./documents/aboutTianyuePage";

/** 所有 Object Schema — 可被文档 Schema 复用 */
export const objectTypes: SchemaTypeDefinition[] = [
  seo,
  imageWithAlt,
  portableImage,
  richText,
  link,
  cta,
  bannerSlide,
];

/** 所有 Document Schema */
export const documentTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homePage,
  intendedParents,
  journey,
  whyUs,
  faqPage,
  startJourney,
  newsArticle,
  newsPage,
  newsCategory,
  faqItem,
  faqCategory,
  consultationLead,
  privacyPage,
  thirdGenerationIvfPage,
  ivfServicesPage,
  eggSpermFreezingPage,
  thirdPartyAssistedReproductionPage,
  privateCustomizationPage,
  successCasesPage,
  successCase,
  medicalServicesPage,
  scienceVideo,
  videosPage,
  videoCategory,
  aboutTianyuePage,
];

/** 汇总所有 Schema 类型 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...objectTypes, ...documentTypes],
};
