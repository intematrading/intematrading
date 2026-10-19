// Copy from the "Website Content" package, in the same shape as the Sanity
// documents. The site renders this until Sanity is connected (and whenever a
// document hasn't been created there yet).
//
// Amharic strings are first drafts and need review by a native speaker
// before launch.

import type {
  AboutPage,
  Brand,
  ContactPage,
  ExportItem,
  HomePage,
  Partner,
  ProducedItem,
  ServicesPage,
  SiteSettings,
  TeamMember,
  TeamPage,
  Testimonial,
} from "./types";

export const siteSettings: SiteSettings = {
  companyName: { en: "INTEMA Trading PLC.", am: "ኢንተማ ትሬዲንግ ኃ.የተ.የግ.ማ." },
  address: { en: "Office No. 203, Woreda 03, Bole Sub City (near Atlas Hotel), Addis Ababa", fr: "Bureau n° 203, woreda 03, district de Bole (près de l’hôtel Atlas), Addis-Abeba" },
  poBox: { en: "P.O. Box 24527, Addis Ababa, Ethiopia", am: "ፖ.ሣ.ቁ. 24527፣ አዲስ አበባ፣ ኢትዮጵያ" },
  email: "info@intematrading.com",
  otherEmails: ["amira@intematrading.com", "bedru@intematrading.com"],
  website: "https://intematrading.com/",
  phones: [
    "+251 911 258980",
    "+251 956 997777",
  ],
  // PLACEHOLDERS: network homepages until the real profile URLs are entered
  // in Site settings. The WhatsApp number is assumed; confirm it.
  socialLinks: [
    { _key: "linkedin", platform: "linkedin", url: "https://www.linkedin.com/" },
    { _key: "facebook", platform: "facebook", url: "https://www.facebook.com/" },
    { _key: "instagram", platform: "instagram", url: "https://www.instagram.com/" },
    { _key: "whatsapp", platform: "whatsapp", url: "https://wa.me/251911258980" },
    { _key: "tiktok", platform: "tiktok", url: "https://www.tiktok.com/" },
  ],
  seo: {
    title: { en: "INTEMA Trading PLC.", am: "ኢንተማ ትሬዲንግ" },
    description: {
      en: "Since 2014, INTEMA Trading PLC. has been connecting trusted global brands with Ethiopia.",
    fr: "Depuis 2014, INTEMA Trading PLC. relie des marques mondiales de confiance à l’Éthiopie.",
      am: "ከ2014 ጀምሮ ኢንተማ ትሬዲንግ የታመኑ ዓለም አቀፍ ብራንዶችን በኢትዮጵያ፣ በጅቡቲና በሱዳን ከሚገኙ ቸርቻሪዎች ጋር ሲያገናኝ ቆይቷል።",
    },
  },
};

export const homePage: HomePage = {
  heroHeadline: {
    en: "Trusted Brands, Delivered — Importing, Producing & Exporting *Across East Africa*",
    fr: "Des marques de confiance, livrées — Importer, produire et exporter *en Afrique de l'Est*",
    am: "የጥራት መጋዘን — *በምሥራቅ አፍሪካ* እናስመጣለን፣ እናመርታለን፣ እንልካለን",
  },
  heroSubheadline: {
    en: "Since 2014, INTEMA Trading PLC. has been connecting trusted global brands with Ethiopia.",
    fr: "Depuis 2014, INTEMA Trading PLC. relie des marques mondiales de confiance à l’Éthiopie.",
  },
  stats: [
    {
      _key: "founded",
      value: "2014",
      label: { en: "Founded", am: "የተመሠረተበት ዓመት" },
      note: {
        en: "Established as a privately held company, headquartered in Bole Sub City, Addis Ababa.",
        am: "በግል የተያዘ ኩባንያ ሆኖ የተመሠረተ፣ ዋና መሥሪያ ቤቱ በአራዳ ክፍለ ከተማ፣ አዲስ አበባ ነው።",
      },
    },
    {
      _key: "market",
      value: "135M",
      label: {
        en: "Ethiopian market",
        fr: "Marché éthiopien",
        am: "በኢትዮጵያ፣ በጅቡቲና በሱዳን ያለ ጥምር ገበያ",
      },
      note: {
        en: "Africa’s second most populous country, with around 135 million people.",
        fr: "Le deuxième pays le plus peuplé d’Afrique, avec environ 135 millions d’habitants.",
        am: "ኢትዮጵያ፣ ጅቡቲና ሱዳን በአንድነት ወደ 170 ሚሊዮን የሚጠጋ ሕዝብ ያለው ገበያ ናቸው።",
      },
    },
    {
      _key: "countries",
      value: "3",
      label: { en: "Countries served", fr: "Pays desservis" },
      note: {
        en: "Ethiopia, Djibouti and Sudan, a combined market of around 170 million people.",
        fr: "Éthiopie, Djibouti et Soudan, un marché d’environ 170 millions de personnes.",
      },
    },
    {
      _key: "team",
      value: "26",
      label: { en: "Team members", fr: "Collaborateurs" },
      note: { en: "Across sales, operations, administration and finance.", fr: "Entre ventes, opérations, administration et finances." },
    },
  ],
  foodInfo: {
    en: "Food, beverages and everyday consumer goods from established international brands, including Heinz, Campbell's, Nido and Power Horse, supplied to wholesalers, supermarkets and retailers by our own sales and delivery teams on planned, recurring schedules.",
    fr: "Produits alimentaires, boissons et biens de consommation courante de grandes marques internationales, dont Heinz, Campbell's, Nido et Power Horse, livrés aux grossistes, supermarchés et détaillants par nos propres équipes commerciales et de livraison, selon des tournées planifiées et régulières.",
  },
  nonFoodInfo: {
    en: "Personal care, beauty and hygiene from brands including Clere, Fa, Vatika and Reckitt. INTEMA is also the main importer of L'Oréal Professionnel, with a dedicated team serving salons and beauty professionals.",
    fr: "Soins personnels, beauté et hygiène avec des marques comme Clere, Fa, Vatika et Reckitt. INTEMA est également l’importateur principal de L’Oréal Professionnel, avec une équipe dédiée aux salons et aux professionnels de la beauté.",
  },  foodCategories: [
    { en: "Dairy", fr: "Produits laitiers" },
    { en: "Food products", fr: "Produits alimentaires" },
    { en: "Beverages", fr: "Boissons" },
    { en: "Confectionery", fr: "Confiserie" },
    { en: "Soups", fr: "Soupes" },
    { en: "Energy drinks", fr: "Boissons énergisantes" },
    { en: "Packaged consumer products", fr: "Produits de consommation emballés" },
  ],
  nonFoodCategories: [
    { en: "Personal care", fr: "Soins personnels" },
    { en: "Beauty", fr: "Beauté" },
    { en: "Professional hair care", fr: "Soins capillaires professionnels" },
    { en: "Hygiene", fr: "Hygiène" },
    { en: "Consumer health & wellness", fr: "Santé et bien-être" },
    { en: "Household & lifestyle", fr: "Maison et art de vivre" },
  ],

  whatWeDoIntro: {
    en: "INTEMA imports and distributes international FMCG brands, manufactures its own products and exports Ethiopian coffee.",
    fr: "INTEMA importe et distribue des marques internationales de grande consommation, fabrique ses propres produits et exporte du café éthiopien.",
  },
  entryCards: [
    {
      _key: "import",
      section: "import",
      title: { en: "We Import", fr: "Nous importons" },
      description: {
        en: "International food and non-food brands from America, Europe and Asia, imported and built in the Ethiopian market.",
        fr: "Des marques internationales alimentaires et non alimentaires d’Amérique, d’Europe et d’Asie, importées et développées sur le marché éthiopien.",
      },
    },
    {
      _key: "produce",
      section: "produce",
      title: { en: "We Produce", fr: "Nous produisons" },
      description: { en: "We make our own Abay candles here in Ethiopia and sell them in packs of 8.", fr: "Nous fabriquons nos propres bougies Abay en Éthiopie et les vendons en paquets de 8." },
    },
    {
      _key: "export",
      section: "export",
      title: { en: "We Export", fr: "Nous exportons" },
      description: {
        en: "We export Ethiopian coffee under our two brands, Seedcup and Bella, to buyers in the Middle East, Asia and Europe.",
        fr: "Nous exportons du café éthiopien sous nos deux marques, Seedcup et Bella, vers des acheteurs au Moyen-Orient, en Asie et en Europe.",
      },
    },
  ],
  // Adapted from the About Us "Mission" and "Keys to Success" copy.
  commitmentEyebrow: { en: "Our mission", am: "ተልዕኳችን" },
  commitmentHeadline: {
    en: "We don't just sell products, *we establish brands.*",
    am: "ምርት ብቻ አንሸጥም፤ *አገልግሎት እንሰጣለን።*",
  },
  commitmentBody: {
    en: "We build strong relationships with key customers so we're viewed as indispensable partners, not just another supplier.",
    am: "ከቁልፍ ደንበኞቻችን ጋር ጠንካራ ግንኙነት በመገንባት እንደ ሌላ አቅራቢ ሳይሆን እንደ አስፈላጊ አጋር እንድንታይ እንሠራለን።",
  },
  mission: {
    en: "To be a partner our key customers can rely on, not just another supplier. We help them with product choice, stock levels, pricing, display and promotions.",
  },
  vision: {
    en: "To become Ethiopia's recognised distributor of specialty food, cosmetic and personal care products to wholesale and retail outlets.",
  },
  // Descriptions are the company profile's own wording (Keys to success and
  // Our partners).
  commitmentPoints: [
    {
      title: { en: "Innovative, quality products", am: "ፈጠራ የታከለባቸው ጥራት ያላቸው ምርቶች" },
      description: {
        en: "Trusted global food and non-food brands, imported and distributed across Ethiopia.",
      },
    },
    {
      title: { en: "Individualised customer service", am: "ለእያንዳንዱ ደንበኛ የተለየ አገልግሎት" },
      description: {
        en: "Providing customers with what they want, when and how they want it.",
        am: "ደንበኞች የሚፈልጉትን፣ በሚፈልጉት ጊዜና መንገድ ማቅረብ።",
      },
    },
    {
      title: { en: "Exclusive distribution rights to groundbreaking products", am: "ለአዳዲስ ምርቶች ብቸኛ የማከፋፈል መብት" },
      description: {
        en: "For products not currently available in our markets.",
        am: "በገበያዎቻችን ገና ላልተገኙ ምርቶች።",
      },
    },
  ],
  seo: {
    title: {
      en: "INTEMA Trading PLC. | Importing, Producing & Exporting Across East Africa",
      am: "ኢንተማ ትሬዲንግ — በምሥራቅ አፍሪካ ማስመጣት፣ ማምረትና መላክ",
    },
    description: {
      en: "Trusted brands, delivered. Since 2014, INTEMA Trading PLC. has been connecting trusted global brands with Ethiopia.",
      fr: "Des marques de confiance, livrées. Depuis 2014, INTEMA Trading PLC. relie des marques mondiales de confiance à l’Éthiopie.",
    },
  },
};

export const servicesPage: ServicesPage = {
  title: { en: "Our Services", am: "አገልግሎቶቻችን" },
  eyebrow: { en: "Import · Produce · Export", fr: "Importer · Produire · Exporter", am: "እናስመጣለን · እናመርታለን · እንልካለን" },
  intro: {
    en: "INTEMA Trading PLC. is an FMCG importer, distributor, manufacturer and exporter serving wholesale and retail markets across Ethiopia, Djibouti and Sudan.",
    am: "ኢንተማ ትሬዲንግ ኃ.የተ.የግ.ማ. በኢትዮጵያ፣ በጅቡቲና በሱዳን የጅምላና የችርቻሮ ገበያዎችን የሚያገለግል የፍጆታ ምርቶች አስመጪ፣ አከፋፋይ፣ አምራችና ላኪ ነው።",
  },

  importHeading: { en: "We Import", am: "እናስመጣለን" },
  importIntro: {
    en: "More than a decade of importing for international brand owners, with the supplier network, know-how and track record to bring their products into Ethiopia reliably.",
    am: "የታመኑ ዓለም አቀፍ የፍጆታ ምርት ብራንዶች — ምግብና ምግብ ነክ ያልሆኑ።",
  },
  nonFoodIntro: {
    en: "Skin, hair and body care from trusted international brands, for wholesale and retail customers across Ethiopia, Djibouti and Sudan.",
    am: "የኮስሞቲክስና የግል እንክብካቤ ምርቶች — ከታመኑ ዓለም አቀፍ ብራንዶች የቆዳ፣ የፀጉርና የሰውነት እንክብካቤ — በኢትዮጵያ፣ በጅቡቲና በሱዳን ለሚገኙ የጅምላና የችርቻሮ መሸጫዎች።",
  },
  foodIntro: {
    en: "Specialty food and drinks, including dairy, sauces, soups, snacks and beverages, delivered to our customers twice a week.",
    am: "ልዩ ምግብና መጠጦች — ከወተት ተዋጽኦና ሶሶች እስከ ሾርባ፣ መክሰስና መጠጦች — ለደንበኞቻችን በሳምንት ሁለት ጊዜ ይደርሳሉ።",
  },

  produceHeading: { en: "We Produce", am: "እናመርታለን" },
  produceIntro: {
    en: "INTEMA manufactures its own candle brand, Abay (አባይ ሻማ), sold in 8-candle packs, with Netsanet Workneh as brand ambassador.",
    am: "ኢንተማ አባይ (አባይ ሻማ) የተሰኘውን የራሱን የሻማ ብራንድ ያመርታል። ምርቱ በ8 ሻማ ጥቅል የሚሸጥ ሲሆን የብራንዱ አምባሳደር ነፃነት ወርቅነህ ነው።",
  },
  productsIntro: {
    en: "Abay is our own candle brand, made here in Ethiopia and sold in packs of 8.",
    am: "በራሳችን የሚመረቱ፦ የአባይ ሻማ ብራንዳችንና ነባር የሳሙና ብራንዶቻችን።",
  },

  exportHeading: { en: "We Export", am: "እንልካለን" },
  exportIntro: {
    en: "Ethiopian coffee to the Middle East, Asia & Europe.",
    am: "የኢትዮጵያ ቡና ወደ መካከለኛው ምሥራቅ፣ እስያና አውሮፓ።",
  },
  exportBody: {
    en: "Coffee is Ethiopia's biggest export and it's known around the world for its quality and taste. Exporting it also earns the foreign currency that keeps our import business going. Through our two registered brands, Seedcup and Bella, we want more people in the Middle East, Asia and Europe to enjoy Ethiopian coffee. Our team has trained in coffee, taken part in an Ethiopian and Saudi coffee exchange, and shown at international trade fairs like Gulfood.",
    am: "ቡና የኢትዮጵያ ዋነኛ የወጪ ንግድ ምርት ሲሆን በጥራቱና በጣዕሙ በዓለም አቀፍ ደረጃ የታወቀ ነው፤ እንዲሁም ኢንተማ ለማስመጣት ሥራው የውጭ ምንዛሪ የሚያገኝበት መንገድ ነው። ሲድካፕ እና ቤላ በተባሉ ሁለት የተመዘገቡ የወጪ ንግድ ብራንዶች አማካኝነት ኢንተማ የኢትዮጵያን የቡና ባህል ተወዳጅነት ወደ መካከለኛው ምሥራቅ፣ እስያና አውሮፓ ለማስፋፋት ያለመ ነው። ቡድናችን በቡና ሥልጠናና ትምህርት ላይ ኢንቨስት ያደረገ ሲሆን፣ በኢትዮጵያ–ሳዑዲ የቡና ልውውጥ እና እንደ ጋልፉድ ባሉ ዓለም አቀፍ የንግድ ትርዒቶች ተሳትፏል።",
  },
  exportBrandsIntro: {
    en: "Two registered export brands carrying Ethiopian coffee to the Middle East, Asia and Europe.",
    am: "የኢትዮጵያን ቡና ወደ መካከለኛው ምሥራቅ፣ እስያና አውሮፓ የሚወስዱ ሁለት የተመዘገቡ የወጪ ንግድ ብራንዶች።",
  },
  routeHeading: { en: "Every step of the way", fr: "À chaque étape" },
  routeIntro: {
    en: "We don't stop at importing. We look after the whole journey ourselves, from the supplier's dock to the shop shelf.",
    fr: "Nous ne nous arrêtons pas à l’importation. Nous gérons nous-mêmes tout le trajet, du quai du fournisseur jusqu’au rayon du magasin.",
  },
  exportMarkets: [
    { _key: "middleEast", title: { en: "Middle East", fr: "Moyen-Orient" }, body: { en: "Saudi Arabia and the Gulf, where people have loved Ethiopian coffee for a long time.", fr: "L’Arabie saoudite et le Golfe, où l’on apprécie le café éthiopien depuis longtemps." } },
    { _key: "asia", title: { en: "Asia", fr: "Asie" }, body: { en: "Specialty coffee is taking off across East and Southeast Asia.", fr: "Le café de spécialité est en plein essor en Asie de l’Est et du Sud-Est." } },
    { _key: "europe", title: { en: "Europe", fr: "Europe" }, body: { en: "Roasters and buyers who know and value Ethiopian coffee.", fr: "Des torréfacteurs et acheteurs qui connaissent et apprécient le café éthiopien." } },
  ],

  seo: {
    title: {
      en: "Our Services | Import, Production & Coffee Export",
      am: "አገልግሎቶቻችን — ማስመጣት፣ ማምረትና የቡና ወጪ ንግድ",
    },
    description: {
      en: "We import trusted international consumer brands, make our own Abay candles and export Ethiopian coffee under the Seedcup and Bella brands.",
      am: "የታመኑ ዓለም አቀፍ የፍጆታ ምርቶችን እናስመጣለን፣ የአባይ ሻማንና ነባር የሳሙና ምርቶችን እናመርታለን፣ የኢትዮጵያ ቡናን በሲድካፕና ቤላ ብራንዶች እንልካለን።",
    },
  },
};

// Descriptions are short, factual product categories; there is no brand copy
// in the content package. International Collection is left blank until the
// team supplies a line for it.
// Partner companies for the logo strip (logos are uploaded in the Studio).
export const partners: Partner[] = [
  { _id: "partner-loreal-professionnel", name: "L’Oréal Professionnel" },
  { _id: "partner-reckitt", name: "Reckitt" },
  { _id: "partner-queen-elisabeth", name: "Queen Elisabeth Cocoa Butter" },
  { _id: "partner-clere", name: "Clere" },
  { _id: "partner-fa", name: "Fa" },
  { _id: "partner-vatika", name: "Vatika" },
  { _id: "partner-nido", name: "Nido" },
  { _id: "partner-heinz", name: "Heinz" },
  { _id: "partner-campbells", name: "Campbell's Soup" },
  { _id: "partner-international-collection", name: "International Collection" },
  { _id: "partner-power-horse", name: "Power Horse" },
  { _id: "partner-irn-bru", name: "Irn Bru" },
];

export const brands: Brand[] = [
  {
    _id: "brand-reckitt",
    name: "Reckitt",
    category: "nonFood",
    subBrands: ["Durex", "KY", "Veet"],
    description: { en: "Sexual wellbeing and hair-removal care", am: "የግል ጤንነትና የፀጉር ማስወገጃ ምርቶች" },
  },
  {
    _id: "brand-queen-elisabeth",
    name: "Queen Elisabeth Cocoa Butter",
    category: "nonFood",
    description: { en: "Cocoa butter skin care", am: "የኮኮዋ ቅቤ የቆዳ እንክብካቤ" },
  },
  { _id: "brand-clere", name: "Clere", category: "nonFood", description: { en: "Body lotions and hair care", am: "የሰውነት ቅባቶችና የፀጉር እንክብካቤ" } },
  { _id: "brand-fa", name: "Fa", category: "nonFood", description: { en: "Shower gels and deodorants", am: "የገላ መታጠቢያ ጄሎችና ዲኦድራንቶች" } },
  {
    _id: "brand-vatika",
    name: "Vatika",
    category: "nonFood",
    subBrands: ["by Dabur"],
    description: { en: "Hair oils and hair care", am: "የፀጉር ዘይቶችና የፀጉር እንክብካቤ" },
  },
  { _id: "brand-nido", name: "Nido", category: "food", description: { en: "Powdered milk", am: "የዱቄት ወተት" } },
  { _id: "brand-heinz", name: "Heinz", category: "food", description: { en: "Ketchup and sauces", am: "ኬትጪፕና ሶሶች" } },
  { _id: "brand-campbells", name: "Campbell's Soup", category: "food", description: { en: "Ready-made soups", am: "የተዘጋጁ ሾርባዎች" } },
  { _id: "brand-international-collection", name: "International Collection", category: "food" },
  { _id: "brand-power-horse", name: "Power Horse", category: "food", description: { en: "Energy drink", am: "የኃይል መጠጥ" } },
  { _id: "brand-irn-bru", name: "Irn Bru", category: "food", description: { en: "Soft drink", am: "ለስላሳ መጠጥ" } },
];

export const teamPage: TeamPage = {
  title: { en: "Our Team", am: "ቡድናችን" },
  eyebrow: { en: "The people behind INTEMA", fr: "L’équipe derrière INTEMA", am: "ከኢንተማ ጀርባ ያሉ ሰዎች" },
  intro: {
    en: "INTEMA is led by its principal owner and CEO, Bedru Hussen Jemal. Our leadership brings senior management experience, a strong focus on customer service and more than 10 years in distribution and sales management.",
    fr: "INTEMA est dirigée par son associé principal et PDG, Bedru Hussen Jemal. Notre direction apporte une expérience de direction, un vrai sens du service client et plus de 10 ans dans la distribution et la gestion commerciale.",
  },
  leadershipHeading: { en: "Leadership", am: "አመራር" },
  leadershipIntro: {
    en: "Distribution is built on relationships, and ours are led from the top. Bedru and the leadership team bring more than ten years of distribution and sales management experience with Beiersdorf, L'Oréal Professionnel and L'Oréal Consumer Products, and Bedru remains personally involved with key accounts.",
    fr: "La distribution repose sur les relations, et les nôtres sont portées par la direction. Bedru et l’équipe dirigeante apportent plus de dix ans d’expérience en distribution et en direction commerciale chez Beiersdorf, L’Oréal Professionnel et L’Oréal Produits Grand Public, et Bedru reste personnellement impliqué auprès des comptes clés.",
  },
  headsHeading: { en: "Our departments", fr: "Nos départements" },
  headsIntro: {
    en: "Twenty-six people across nine departments run INTEMA day to day. Ten work in sales, marketing and media, four in administration and finance, and eleven in operations. Each department has a head, and you can meet them below.",
    fr: "Vingt-six personnes réparties dans neuf départements font tourner INTEMA au quotidien. Dix travaillent dans les ventes, le marketing et les médias, quatre dans l’administration et les finances, et onze dans les opérations. Chaque département a un responsable, que vous pouvez découvrir ci-dessous.",
  },
  ambassadorName: { en: "Netsanet Workneh", am: "ነፃነት ወርቅነህ" },
  ambassadorRole: { en: "Brand ambassador", fr: "Visage de la marque" },
  ambassadorBio: {
    en: "Netsanet Workneh is the face of Abay, the candle brand we make here in Ethiopia. Abay is sold in packs of 8 through the same wholesale and retail network as the brands we import. Netsanet represents Abay to our customers and retail partners and helps a homegrown product find its way into more shops and homes.",
    fr: "Netsanet Workneh est le visage d’Abay, la marque de bougies que nous fabriquons ici en Éthiopie. Abay est vendue en paquets de 8 via le même réseau de gros et de détail que nos marques importées. Netsanet représente Abay auprès de nos clients et partenaires commerciaux et aide ce produit local à entrer dans plus de boutiques et de foyers.",
  },
  facts: [
    { _key: "team", value: "26+", label: { en: "Team members", fr: "Collaborateurs" }, note: { en: "Across nine departments", fr: "Répartis dans neuf départements" } },
    { _key: "fleet", value: "", label: { en: "Delivery vehicles", fr: "Véhicules de livraison" } },
    { _key: "accounts", value: "", label: { en: "Active accounts", fr: "Clients actifs" } },
    {
      _key: "experience",
      value: "10+",
      label: { en: "Years in distribution & sales management", am: "ዓመታት በማከፋፈልና በሽያጭ አመራር" },
      note: { en: "Beiersdorf, L'Oréal Professional, L'Oréal Consumer Products", am: "ቤየርስዶርፍ፣ ሎሬያል ፕሮፌሽናል፣ ሎሬያል ኮንሲውመር ፕሮዳክትስ" },
    },
  ],
  departments: [
    {
      _key: "sales",
      title: { en: "Sales & marketing", fr: "Ventes et marketing" },
      body: { en: "A six-person field sales team managing key accounts and new-outlet development, working alongside marketing and media: ten people in total.", fr: "Une équipe de vente terrain de six personnes qui gère les comptes clés et le développement de nouveaux points de vente, aux côtés du marketing et des médias : dix personnes au total." },
    },
    {
      _key: "admin",
      title: { en: "Administration & finance", fr: "Administration et finances" },
      body: { en: "HR, the executive office, finance and general services: four people running the company's core functions.", fr: "RH, secrétariat de direction, finances et services généraux : quatre personnes qui assurent les fonctions centrales de l’entreprise." },
    },
    {
      _key: "operations",
      title: { en: "Operations", fr: "Opérations" },
      body: { en: "A ten-person store and warehouse team plus technical support, running dispatch and deliveries Monday to Friday.", fr: "Une équipe de dix personnes au magasin et à l’entrepôt, plus le support technique, qui assure l’expédition et les livraisons du lundi au vendredi." },
    },
  ],
  trainingHeading: { en: "Training", am: "ሥልጠና" },
  training: {
    en: "We've invested in coffee training so our team really knows the product. That includes an Ethiopian and Saudi coffee exchange (\"Coffee Talk\" with Saudi coffee expert Ali Al Diwani) and international trade fairs like Gulfood.",
    am: "ኢንተማ ቡድኑ ዕውቀት ያለውና በሚገባ የተዘጋጀ እንዲሆን በቡና ሥልጠናና ትምህርት ላይ ኢንቨስት አድርጓል — በኢትዮጵያ–ሳዑዲ የቡና ልውውጥ (ከሳዑዲው የቡና ባለሙያ አሊ አል ዲዋኒ ጋር “ኮፊ ቶክ”) እና እንደ ጋልፉድ ባሉ ዓለም አቀፍ የንግድ ትርዒቶች መሳተፍን ጨምሮ።",
  },
  seo: {
    title: { en: "Our Team | Leadership & Sales", am: "ቡድናችን — አመራርና ሽያጭ" },
    description: {
      en: "Meet the leadership and sales team behind INTEMA Trading PLC., with over 10 years in distribution and sales management.",
      am: "ከ10 ዓመታት በላይ የማከፋፈልና የሽያጭ አመራር ልምድ ያላቸውን የኢንተማ ትሬዲንግ አመራርና የሽያጭ ቡድን ይተዋወቁ።",
    },
  },
};

export const teamMembers: TeamMember[] = [
  {
    _id: "team-bedru",
    name: { en: "Bedru Hussen Jemal", fr: "Bedru Hussen Jemal", am: "በድሩ ሁሴን ጀማል" },
    role: { en: "CEO & Principal Owner", fr: "PDG et associé principal" },
    group: "leadership",
    bio: { en: "Leads sales and distribution, personally calling on potential customers to review our product line and services.", fr: "Dirige les ventes et la distribution, et rend visite en personne aux clients potentiels pour leur présenter notre gamme et nos services.", am: "ሽያጭንና ማከፋፈልን ይመራል፤ የምርትና የአገልግሎት ዝርዝራችንን ለማቅረብ ደንበኞችን በአካል ይጎበኛል።" },
  },
  {
    _id: "team-seid",
    name: { en: "Seid Kedir", fr: "Seid Kedir" },
    role: { en: "Head of Sales", fr: "Responsable des ventes" },
    group: "sales",
    bio: { en: "Leads our six-person sales team, serving wholesale and retail customers every day.", fr: "Dirige notre équipe commerciale de six personnes, qui sert chaque jour nos clients de gros et de détail." },
  },
  {
    _id: "team-amira",
    name: { en: "Amira Mehsen", fr: "Amira Mehsen" },
    role: { en: "Marketing Manager", fr: "Responsable marketing" },
    group: "sales",
    bio: { en: "Leads our two-person marketing team, from in-store campaigns to promotions for the brands we distribute.", fr: "Dirige notre équipe marketing de deux personnes, des campagnes en magasin aux promotions des marques que nous distribuons." },
  },
  {
    _id: "team-noah",
    name: { en: "Noah Habtamu", fr: "Noah Habtamu" },
    role: { en: "Head of Media & Communications", fr: "Responsable médias et communication" },
    group: "sales",
    bio: { en: "Leads our two-person media & communications team and INTEMA’s brand presence.", fr: "Dirige notre équipe médias et communication de deux personnes, ainsi que l’image de marque d’INTEMA." },
  },
  {
    _id: "team-sebrina",
    name: { en: "Sebrina Nibras", fr: "Sebrina Nibras" },
    role: { en: "HR Manager & Executive Secretary", fr: "Responsable RH et secrétaire de direction" },
    group: "admin",
    bio: { en: "Leads human resources and runs the executive office.", fr: "Dirige les ressources humaines et le secrétariat de direction." },
  },
  {
    _id: "team-abdu",
    name: { en: "Abdu", fr: "Abdu" },
    role: { en: "Finance Manager", fr: "Responsable financier" },
    group: "admin",
    bio: { en: "Leads our two-person finance and accounting team.", fr: "Dirige notre équipe finances et comptabilité de deux personnes." },
  },
  {
    _id: "team-beza",
    name: { en: "Beza Yirga", fr: "Beza Yirga" },
    role: { en: "General Services Manager", fr: "Responsable des services généraux" },
    group: "admin",
    bio: { en: "Manages general services, facilities and office support.", fr: "Gère les services généraux, les locaux et le soutien administratif." },
  },
  {
    _id: "team-seada",
    name: { en: "Seada Kedir", fr: "Seada Kedir" },
    role: { en: "Store & Warehouse Manager", fr: "Responsable du magasin et de l’entrepôt" },
    group: "operations",
    bio: { en: "Leads our ten-person store and warehouse team, keeping stock ready for delivery.", fr: "Dirige notre équipe de dix personnes au magasin et à l’entrepôt, qui tient le stock prêt pour la livraison." },
  },
  {
    _id: "team-neima",
    name: { en: "Neima Ahmed", fr: "Neima Ahmed" },
    role: { en: "Technical Lead", fr: "Responsable technique" },
    group: "operations",
    bio: { en: "Heads technical support for INTEMA’s operations.", fr: "Dirige le support technique des opérations d’INTEMA." },
  },
];

export const contactPage: ContactPage = {
  intro: {
    en: "Retail partners, buyers and brand principals can reach our sales team directly.",
    am: "የችርቻሮ አጋሮች፣ ገዢዎችና የብራንድ ባለቤቶች የሽያጭ ቡድናችንን በቀጥታ ማግኘት ይችላሉ።",
  },
  formHeading: { en: "Send an inquiry", am: "ጥያቄ ይላኩ" },
  formIntro: {
    en: "Tell us who you are and what you're looking for, and our sales team will get back to you.",
    am: "ማን እንደሆኑና ምን እንደሚፈልጉ ይንገሩን — የሽያጭ ቡድናችን ምላሽ ይሰጥዎታል።",
  },
};

export const aboutPage: AboutPage = {
  title: { en: "About Us", am: "ስለ እኛ" },
  eyebrow: { en: "Since 2014", fr: "Depuis 2014", am: "ከ2014 ጀምሮ" },
  intro: {
    en: "INTEMA brings trusted brands to shops across the region. We're a diversified FMCG importer, distributor, manufacturer and exporter, serving Ethiopia, Djibouti and Sudan since 2014.",
    am: "የጥራት መጋዘን — ከ2014 ጀምሮ ኢትዮጵያን፣ ጅቡቲንና ሱዳንን የሚያገለግል ሁለገብ የፍጆታ ምርቶች አስመጪ፣ አከፋፋይ፣ አምራችና ላኪ።",
  },
  whoWeAreHeading: { en: "Who we are & what we do", am: "ማን ነን፣ ምን እንሠራለን" },
  whoWeAre: [
    {
      en: "INTEMA Trading PLC. was founded in 2014. We're a privately held company that imports, distributes, makes and exports consumer goods, and our head office is in Bole Sub City, Addis Ababa.",
      am: "በ2014 የተመሠረተው ኢንተማ ትሬዲንግ ኃ.የተ.የግ.ማ. የግል ኩባንያ ሲሆን፣ ዋና መሥሪያ ቤቱን በአራዳ ክፍለ ከተማ፣ አዲስ አበባ ያደረገ ሁለገብ የፍጆታ ምርቶች አስመጪ፣ አከፋፋይ፣ አምራችና ላኪ ነው — የጅምላና የችርቻሮ ገበያዎችን ለማገልገል ምቹ በሆነ ቦታ።",
    },
    {
      en: "INTEMA serves Ethiopia, Djibouti and Sudan, a combined market of roughly 170 million people. It's principally owned by Bedru Hussen Jemal, and our leadership brings senior management experience, a strong focus on customer service and over 10 years in distribution and sales management with Beiersdorf, L'Oréal Professional and L'Oréal Consumer Products.",
      fr: "INTEMA dessert l’Éthiopie, Djibouti et le Soudan, un marché d’environ 170 millions de personnes. Son associé principal est Bedru Hussen Jemal, et notre direction apporte une expérience de direction, un vrai sens du service client et plus de 10 ans dans la distribution et la gestion commerciale chez Beiersdorf, L’Oréal Professionnel et L’Oréal Produits Grand Public.",
    },
    {
      en: "On top of import and distribution, we make our own candle brand, Abay, and export Ethiopian coffee under two registered brands, Seedcup and Bella. We don't just sell products: we establish brands and build lasting partnerships with the retailers who carry them.",
      am: "ከማስመጣትና ከማከፋፈል ባሻገር ኢንተማ “አባይ” የተሰኘውን የራሱን የሻማ ብራንድ ያመርታል፤ የኢትዮጵያን ቡናም ሲድካፕና ቤላ በተባሉ ሁለት የተመዘገቡ የወጪ ንግድ ብራንዶች ወደ ውጭ ይልካል። ምርት ብቻ አንሸጥም — አገልግሎት እንሰጣለን።",
    },
  ],
  stats: [
    { _key: "founded", value: "2014", label: { en: "Founded", am: "የተመሠረተበት" }, note: { en: "12 years in operation", am: "12 ዓመታት በሥራ ላይ" } },
    { _key: "market", value: "170M", label: { en: "Combined market", am: "ጥምር ገበያ" }, note: { en: "Ethiopia, Djibouti & Sudan", am: "ኢትዮጵያ፣ ጅቡቲና ሱዳን" } },
    { _key: "team", value: "26+", label: { en: "Team members", fr: "Collaborateurs" }, note: { en: "Across nine departments", fr: "Répartis dans neuf départements" } },
    { _key: "accounts", value: "", label: { en: "Active accounts", fr: "Clients actifs" } },
    { _key: "fleet", value: "", label: { en: "Delivery vehicles", fr: "Véhicules de livraison" } },
  ],
  visionSectionHeading: { en: "What drives us", fr: "Ce qui nous anime" },
  visionSectionIntro: { en: "Where we want INTEMA to go, and how we want to work with our customers along the way.", fr: "Où nous voulons mener INTEMA, et comment nous voulons travailler avec nos clients en chemin." },
  visionHeading: { en: "Vision", am: "ራዕይ" },
  vision: {
    en: "To become a recognized distributor of specialty food, cosmetic and personal care supplies and services to wholesale and retail stands throughout the Ethiopian, Sudanese and Djiboutian markets.",
    am: "በኢትዮጵያ፣ በሱዳንና በጅቡቲ ገበያዎች ለሚገኙ የጅምላና የችርቻሮ መሸጫዎች የልዩ ምግብ፣ የኮስሞቲክስና የግል እንክብካቤ ምርቶችና አገልግሎቶች ዕውቅና ያለው አከፋፋይ መሆን።",
  },
  missionHeading: { en: "Mission", am: "ተልዕኮ" },
  mission: {
    en: "To build strong relationships with our key customers so they see INTEMA as a partner they can't do without, not just another supplier. We help each one with product choice, stock levels, pricing, display and promotion ideas that suit their shop.",
    am: "ኢንተማ እንደ ሌላ አቅራቢ ሳይሆን እንደ አስፈላጊ አጋር እንዲታይ ከቁልፍ ደንበኞች ጋር ጠንካራ ግንኙነት መገንባት — ለእያንዳንዱ ደንበኛ የሚስማማ የምርት ዓይነት፣ የክምችት መጠን፣ ዋጋ፣ አቀራረብና የማስተዋወቂያ ሐሳቦችን በመጠቆም።",
  },
  processHeading: { en: "Our process", am: "የአሠራር ሂደታችን" },
  processIntro: {
    en: "Import, distribution, manufacturing and coffee export run as one integrated business, giving brand owners and retailers a single, accountable partner from sourcing to shelf.",
    am: "አንድ መድረክ፣ ሁሉም ገበያ፦ ኢንተማ ማስመጣትና ማከፋፈልን፣ የራሱን ብራንድ ማምረትንና የቡና ወጪ ንግድን በሚያጣምር አንድ የተቀናጀ አሠራር በሦስት አገሮች ደንበኞቹን ይደርሳል።",
  },
  processSteps: [
    {
      _key: "source",
      title: { en: "Source", am: "ማስመጣት" },
      body: {
        en: "Trusted international food and non-food brands, including exclusive lines not available elsewhere in our markets.",
        am: "የታመኑ የምግብና ምግብ ነክ ያልሆኑ ብራንዶችን እናስመጣለን — በገበያዎቻችን ገና ላልተገኙ አዳዲስ ምርቶች ብቸኛ የማከፋፈል መብትን ጨምሮ።",
      },
    },
    {
      _key: "order",
      title: { en: "Order", am: "ማዘዝ" },
      body: {
        en: "Orders are taken by phone, order sheet or tele-sales the day before delivery, so stock arrives exactly when it is needed.",
        am: "ከማድረሻ ቀንዎ በፊት ባለው ቀን እስከ ከሰዓት 8፡30 በስልክ ያዝዙ፣ የተሞላ የትዕዛዝ ቅጽ በፋክስ ይላኩ፣ ወይም መጠኑን ለማረጋገጥ እኛ እንድንደውልልዎ ይምረጡ።",
      },
    },
    {
      _key: "deliver",
      title: { en: "Deliver", am: "ማድረስ" },
      body: {
        en: "Planned routes run Monday to Friday, optimised for time and fuel, with every account served once or twice a week.",
        am: "ጊዜና ነዳጅ በሚቆጥቡ መስመሮች ከሰኞ እስከ ዓርብ እናደርሳለን፤ እያንዳንዱ ደንበኛ በሳምንት አንድ ወይም ሁለት ጊዜ ይስተናገዳል።",
      },
    },
    {
      _key: "support",
      title: { en: "Grow", am: "ማሳደግ" },
      body: {
        en: "Tailored assortment and pricing, trade promotions, advertising and point-of-sale material that drive sell-out for our customers.",
        am: "በሚስማማ የምርት ዓይነትና ዋጋ፣ በፈጠራ የታከሉ ማስተዋወቂያዎች፣ በማስታወቂያና በልዩ የማርኬቲንግ ቁሳቁሶች ደንበኞች ሽያጫቸውን እንዲጨምሩ እንረዳለን።",
      },
    },
  ],
  keysIntro: { en: "Here's why retailers, wholesalers and brand owners choose to work with us, and why they stay.", fr: "Voici pourquoi détaillants, grossistes et propriétaires de marques choisissent de travailler avec nous, et pourquoi ils restent." },
  keysHeading: { en: "Keys to success", am: "የስኬት ቁልፎች" },
  keysToSuccess: [
    { en: "Innovative, quality products.", am: "ፈጠራ የታከለባቸው ጥራት ያላቸው ምርቶች።" },
    {
      en: "Customer service built around each customer. We give people what they want, when and how they want it.",
      am: "ለእያንዳንዱ ደንበኛ የተለየ አገልግሎት — ደንበኞች የሚፈልጉትን፣ በሚፈልጉት ጊዜና መንገድ ማቅረብ።",
    },
    {
      en: "Fully integrated programs to help customers increase sales through menu development, creative promotions, advertising and custom marketing material.",
      am: "በምርት ዝርዝር ዝግጅት፣ በፈጠራ ማስተዋወቂያዎች፣ በማስታወቂያና በልዩ የማርኬቲንግ ቁሳቁሶች ደንበኞች ሽያጫቸውን እንዲጨምሩ የሚያግዙ የተቀናጁ ፕሮግራሞች።",
    },
    { en: "Exclusive distribution rights to groundbreaking products not currently available in our markets.", am: "በገበያዎቻችን ገና ላልተገኙ አዳዲስ ምርቶች ብቸኛ የማከፋፈል መብት።" },
    {
      en: "Over 10 years in distribution and sales management with Beiersdorf, L'Oréal Professional and L'Oréal Consumer Products.",
      am: "በቤየርስዶርፍ፣ በሎሬያል ፕሮፌሽናልና በሎሬያል ኮንሲውመር ፕሮዳክትስ ከ10 ዓመታት በላይ የማከፋፈልና የሽያጭ አመራር ልምድ።",
    },
  ],
  partnersHeading: { en: "Our partners", am: "አጋሮቻችን" },
  partnersIntro: {
    en: "We import and distribute trusted global food and non-food brands across Ethiopia, Djibouti and Sudan.",
    am: "የታመኑ ዓለም አቀፍ የምግብና ምግብ ነክ ያልሆኑ ብራንዶችን በኢትዮጵያ፣ በጅቡቲና በሱዳን እናስመጣለን፣ እናከፋፍላለን።",
  },
  seo: {
    title: { en: "About INTEMA Trading PLC. | Trusted Brands, Delivered", fr: "À propos d’INTEMA Trading PLC. | Des marques de confiance, livrées", am: "ስለ ኢንተማ ትሬዲንግ — የጥራት መጋዘን" },
    description: {
      en: "Since 2014, INTEMA Trading PLC. has imported, distributed, manufactured and exported across Ethiopia, Djibouti and Sudan. Our story, vision, process and partners.",
      am: "ከ2014 ጀምሮ ኢንተማ ትሬዲንግ በኢትዮጵያ፣ በጅቡቲና በሱዳን ሲያስመጣ፣ ሲያከፋፍል፣ ሲያመርትና ሲልክ ቆይቷል። ታሪካችን፣ ራዕያችን፣ አሠራራችንና አጋሮቻችን።",
    },
  },
};

// Layout samples only: shown until Sanity is connected, then replaced by real
// testimonials from the Studio. Deliberately not written as quotes from real
// people — the text itself says it is a placeholder.
export const testimonials: Testimonial[] = [1, 2, 3].map((n) => ({
  _id: `sample-${n}`,
  sample: true,
  quote: {
    en: "A quote from a retail partner, buyer or brand principal will appear here once real testimonials are added in the Sanity Studio.",
    am: "በሳኒቲ ስቱዲዮ እውነተኛ ምስክርነቶች ሲጨመሩ ከችርቻሮ አጋር፣ ከገዢ ወይም ከብራንድ ባለቤት የተሰጠ አስተያየት እዚህ ይታያል።",
  },
  name: `Sample testimonial ${n}`,
  role: { en: "Partner role", am: "የአጋር ሚና" },
  company: "Company name",
}));

export const producedItems: ProducedItem[] = [
  {
    _id: "produce-abay",
    name: { en: "Abay", am: "አባይ ሻማ" },
    category: { en: "Candles", am: "ሻማ" },
    description: { en: "Abay (አባይ ሻማ) is our own candle brand, made here in Ethiopia and sold in packs of 8. They're simple, reliable household candles that families keep at home for power cuts, holidays and everyday use.\n\nYou'll find Abay in shops and with wholesalers across the country. It goes out through the same sales and delivery network as the brands we import, and Netsanet Workneh is the face of the brand.", fr: "Abay (አባይ ሻማ) est notre propre marque de bougies, fabriquée ici en Éthiopie et vendue en paquets de 8. Ce sont des bougies simples et fiables que les familles gardent à la maison pour les coupures de courant, les fêtes et le quotidien.\n\nOn trouve Abay dans les boutiques et chez les grossistes de tout le pays. Elle passe par le même réseau de vente et de livraison que nos marques importées, et Netsanet Workneh en est le visage." },
  },
];

export const exportItems: ExportItem[] = [
  { _id: "export-seedcup", name: "Seedcup", description: { en: "Registered export brand", am: "የተመዘገበ የወጪ ንግድ ብራንድ" } },
  { _id: "export-bella", name: "Bella", description: { en: "Registered export brand", am: "የተመዘገበ የወጪ ንግድ ብራንድ" } },
];
