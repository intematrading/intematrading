// Shapes of the Sanity documents as the site reads them. Every translatable
// field is a LocaleString: one object holding both languages.

export type LocaleString = { en: string; am?: string };

export type SanityImage = {
  _type?: "image";
  asset?: { _ref: string; _type?: "reference" };
  alt?: LocaleString;
  hotspot?: { x: number; y: number };
} | null;

export type Seo = {
  title?: LocaleString;
  description?: LocaleString;
  ogImage?: SanityImage;
};

export type ServiceSection = "import" | "produce" | "export";

export type SocialPlatform = "linkedin" | "facebook" | "instagram" | "whatsapp" | "tiktok";

export type SiteSettings = {
  companyName: LocaleString;
  tagline?: LocaleString;
  address?: LocaleString;
  poBox?: LocaleString;
  email: string;
  website?: string;
  phones?: string[];
  inquiryRecipient?: string;
  socialLinks?: { _key: string; platform: SocialPlatform; url: string }[];
  seo?: Seo;
};

export type HomePage = {
  heroHeadline: LocaleString;
  heroSubheadline?: LocaleString;
  heroImage?: SanityImage;
  stats?: { _key: string; value: string; label: LocaleString }[];
  entryCards?: {
    _key: string;
    section: ServiceSection;
    title: LocaleString;
    description?: LocaleString;
    image?: SanityImage;
  }[];
  commitmentEyebrow?: LocaleString;
  commitmentHeadline?: LocaleString;
  commitmentBody?: LocaleString;
  commitmentImage?: SanityImage;
  commitmentPoints?: LocaleString[];
  contactImage?: SanityImage;
  seo?: Seo;
};

export type ServicesPage = {
  title: LocaleString;
  eyebrow?: LocaleString;
  intro?: LocaleString;
  heroImage?: SanityImage;
  importHeading?: LocaleString;
  importIntro?: LocaleString;
  nonFoodIntro?: LocaleString;
  foodIntro?: LocaleString;
  produceHeading?: LocaleString;
  produceIntro?: LocaleString;
  productsIntro?: LocaleString;
  exportHeading?: LocaleString;
  exportIntro?: LocaleString;
  exportBody?: LocaleString;
  exportBrandsIntro?: LocaleString;
  exportMarkets?: LocaleString[];
  seo?: Seo;
};

export type Brand = {
  _id: string;
  name: string;
  category: "food" | "nonFood";
  subBrands?: string[];
  description?: LocaleString;
  image?: SanityImage;
  logo?: SanityImage;
};

export type ProducedItem = {
  _id: string;
  name: LocaleString;
  category?: LocaleString;
  description?: LocaleString;
  image?: SanityImage;
};

export type ExportItem = {
  _id: string;
  name: string;
  description?: LocaleString;
  image?: SanityImage;
};

export type TeamMember = {
  _id: string;
  name: LocaleString;
  role: LocaleString;
  group: "leadership" | "sales";
  bio?: LocaleString;
  photo?: SanityImage;
};

type Stat = { _key: string; value: string; label: LocaleString; note?: LocaleString };
type TitledText = { _key: string; title: LocaleString; body?: LocaleString };
type CaptionedImage = { _key: string; image?: SanityImage; caption: LocaleString };

export type TeamPage = {
  title: LocaleString;
  eyebrow?: LocaleString;
  intro?: LocaleString;
  heroImage?: SanityImage;
  leadershipHeading?: LocaleString;
  leadershipIntro?: LocaleString;
  leadershipImage?: SanityImage;
  salesHeading?: LocaleString;
  salesIntro?: LocaleString;
  salesTeamSize?: string;
  salesImage?: SanityImage;
  ambassadorName?: LocaleString;
  ambassadorRole?: LocaleString;
  ambassadorBio?: LocaleString;
  ambassadorImage?: SanityImage;
  facts?: Stat[];
  departments?: TitledText[];
  trainingHeading?: LocaleString;
  training?: LocaleString;
  partnerHeading?: LocaleString;
  partnerBody?: LocaleString;
  partnerImage?: SanityImage;
  seo?: Seo;
};

export type AboutPage = {
  title: LocaleString;
  eyebrow?: LocaleString;
  intro?: LocaleString;
  heroImage?: SanityImage;
  whoWeAreHeading?: LocaleString;
  whoWeAre?: LocaleString[];
  stats?: Stat[];
  gallery?: CaptionedImage[];
  visionHeading?: LocaleString;
  vision?: LocaleString;
  missionHeading?: LocaleString;
  mission?: LocaleString;
  processHeading?: LocaleString;
  processIntro?: LocaleString;
  processSteps?: TitledText[];
  keysHeading?: LocaleString;
  keysToSuccess?: LocaleString[];
  partnersHeading?: LocaleString;
  partnersIntro?: LocaleString;
  seo?: Seo;
};

export type Testimonial = {
  _id: string;
  quote: LocaleString;
  name: string;
  role?: LocaleString;
  company?: string;
  photo?: SanityImage;
  /** Layout samples shown only before Sanity is connected; never real quotes. */
  sample?: boolean;
};

export type ContactPage = {
  title: LocaleString;
  eyebrow?: LocaleString;
  intro?: LocaleString;
  heroImage?: SanityImage;
  formHeading?: LocaleString;
  formIntro?: LocaleString;
  seo?: Seo;
};
