// Shapes of the Sanity documents as the site reads them. Every translatable
// field is a LocaleString: one object holding both languages.

// `am` is legacy Amharic copy, kept in the data but no longer shown.
export type LocaleString = { en: string; fr?: string; am?: string };

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
/** What a home "What we do" card stands for: the two import platforms, or produce / export. */

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

/** A "From port to shelf" step: short line on Home; details too on Services. */
export type RouteStep = TitledText & { details?: LocaleString };

export type HomePage = {
  heroHeadline: LocaleString;
  heroSubheadline?: LocaleString;
  heroImage?: SanityImage;
  stats?: { _key: string; value: string; label: LocaleString; note?: LocaleString }[];
  entryCards?: {
    _key: string;
    section: ServiceSection;
    title: LocaleString;
    description?: LocaleString;
    categories?: LocaleString[];
    image?: SanityImage;
  }[];
  whatWeDoIntro?: LocaleString;
  foodInfo?: LocaleString;
  nonFoodInfo?: LocaleString;
  foodCategories?: LocaleString[];
  nonFoodCategories?: LocaleString[];
  routeHeading?: LocaleString;
  routeIntro?: LocaleString;
  routeSteps?: RouteStep[];
  teamImage?: SanityImage;
  commitmentEyebrow?: LocaleString;
  commitmentHeadline?: LocaleString;
  commitmentBody?: LocaleString;
  mission?: LocaleString;
  vision?: LocaleString;
  commitmentImage?: SanityImage;
  commitmentPoints?: { _key?: string; title: LocaleString; description?: LocaleString }[];
  seo?: Seo;
};

export type ServicesPage = {
  title: LocaleString;
  eyebrow?: LocaleString;
  intro?: LocaleString;
  heroImage?: SanityImage;
  marketHeading?: LocaleString;
  marketIntro?: LocaleString;
  marketStats?: Stat[];
  marketSource?: LocaleString;
  sourcingRegions?: TitledText[];
  importHeading?: LocaleString;
  importIntro?: LocaleString;
  nonFoodIntro?: LocaleString;
  foodIntro?: LocaleString;
  produceHeading?: LocaleString;
  produceIntro?: LocaleString;
  produceImage?: SanityImage;
  productsIntro?: LocaleString;
  exportHeading?: LocaleString;
  exportIntro?: LocaleString;
  exportBody?: LocaleString;
  exportBrandsIntro?: LocaleString;
  exportMarkets?: TitledText[];
  routeHeading?: LocaleString;
  routeIntro?: LocaleString;
  seo?: Seo;
};

export type Brand = {
  _id: string;
  name: string;
  category: "food" | "nonFood";
  subBrands?: string[];
  description?: LocaleString;
  image?: SanityImage;
  /** Named in the home page's "main importer of …" highlight. */
  featured?: boolean;
};

/** A company in the partner logo strip, independent of the imported brands. */
export type Partner = {
  _id: string;
  name: string;
  logo?: SanityImage;
  website?: string;
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

export type Stat = { _key: string; value: string; label: LocaleString; note?: LocaleString };
type TitledText = { _key: string; title: LocaleString; body?: LocaleString };
type CaptionedImage = { _key: string; image?: SanityImage; caption: LocaleString };

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
  visionImage?: SanityImage;
  processHeading?: LocaleString;
  processIntro?: LocaleString;
  processSteps?: TitledText[];
  keysHeading?: LocaleString;
  keysImage?: SanityImage;
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

export type TeamGroupKey = "leadership" | "sales" | "admin" | "operations";

export type TeamMember = {
  _id: string;
  name: LocaleString;
  role: LocaleString;
  group: TeamGroupKey;
  bio?: LocaleString;
  photo?: SanityImage;
};

export type TeamPage = {
  title: LocaleString;
  eyebrow?: LocaleString;
  intro?: LocaleString;
  heroImage?: SanityImage;
  leadershipHeading?: LocaleString;
  leadershipIntro?: LocaleString;
  headsHeading?: LocaleString;
  headsIntro?: LocaleString;
  ambassadorName?: LocaleString;
  ambassadorRole?: LocaleString;
  ambassadorBio?: LocaleString;
  ambassadorImage?: SanityImage;
  ambassadorBackground?: SanityImage;
  facts?: Stat[];
  departments?: TitledText[];
  trainingHeading?: LocaleString;
  training?: LocaleString;
  partnerHeading?: LocaleString;
  partnerBody?: LocaleString;
  partnerImage?: SanityImage;
  seo?: Seo;
};

export type ContactPage = {
  intro?: LocaleString;
  formHeading?: LocaleString;
  formIntro?: LocaleString;
};
