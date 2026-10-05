import { aboutPage } from "./aboutPage";
import { brand } from "./brand";
import { contactPage } from "./contactPage";
import { exportItem } from "./exportItem";
import { homePage } from "./homePage";
import { inquiry } from "./inquiry";
import { localeString, localeText } from "./locale";
import { producedItem } from "./producedItem";
import { seo } from "./seo";
import { servicesPage } from "./servicesPage";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";

export const schemaTypes = [
  localeString,
  localeText,
  seo,
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  contactPage,
  brand,
  producedItem,
  exportItem,
  testimonial,
  inquiry,
];

/** One-per-site documents: edited in place, never created or deleted. */
export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "servicesPage",
  "contactPage",
]);
