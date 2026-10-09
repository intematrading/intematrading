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
  tagline: { en: "The Quality Warehouse", am: "የጥራት መጋዘን" },
  address: { en: "Arada Sub City, Addis Ababa", am: "አራዳ ክፍለ ከተማ፣ አዲስ አበባ" },
  poBox: { en: "P.O. Box 24527, Addis Ababa, Ethiopia", am: "ፖ.ሣ.ቁ. 24527፣ አዲስ አበባ፣ ኢትዮጵያ" },
  email: "import@intematrading.com",
  website: "https://intematrading.com/",
  phones: [
    "+251 111 264454",
    "+251 911 258980",
    "+251 911 258981",
    "+251 911 258982",
    "+251 911 258983",
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
    en: "The Quality Warehouse — Importing, Producing & Exporting *Across East Africa*",
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
        en: "Established as a privately held company, headquartered in Arada Sub City, Addis Ababa.",
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
      _key: "accounts",
      value: "20–30",
      label: { en: "Retail accounts serviced daily", am: "በየቀኑ የሚስተናገዱ የችርቻሮ ደንበኞች" },
      note: {
        en: "Wholesale and retail accounts visited by our sales team every day, with deliveries twice a week.",
        am: "የሽያጭ ቡድናችን በየቀኑ የሚጎበኛቸው የጅምላና የችርቻሮ ደንበኞች፤ ምርት በሳምንት ሁለት ጊዜ ይደርሳል።",
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
    en: "We import and distribute food, beverages and fast-moving consumer goods from established international brands, from Heinz sauces and Campbell’s soups to Nido milk and Power Horse energy drinks. Products reach wholesalers, supermarkets and shops across Ethiopia through our own sales and delivery network, with regular deliveries that keep favourite brands on the shelf.",
    fr: "Nous importons et distribuons des produits alimentaires, des boissons et des produits de grande consommation de marques internationales reconnues, des sauces Heinz et soupes Campbell’s au lait Nido et aux boissons énergisantes Power Horse. Ils parviennent aux grossistes, supermarchés et boutiques de toute l’Éthiopie grâce à notre propre réseau de vente et de livraison, avec des livraisons régulières qui gardent les marques préférées en rayon.",
  },
  nonFoodInfo: {
    en: "Our non-food range covers personal care, beauty and hygiene, from Clere body lotions and Fa shower gels to Vatika hair care and Reckitt’s household names. As the main importer of L’Oréal Professionnel, we also run a dedicated channel for salons and professional beauty, supplying the products and support that professionals rely on.",
    fr: "Notre gamme non alimentaire couvre les soins personnels, la beauté et l’hygiène, des laits corporels Clere et gels douche Fa aux soins capillaires Vatika et aux grandes marques de Reckitt. Principal importateur de L’Oréal Professionnel, nous gérons aussi un canal dédié aux salons et à la beauté professionnelle, avec les produits et l’accompagnement dont les professionnels ont besoin.",
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
    en: "INTEMA Trading PLC. is an FMCG importer, distributor, manufacturer and exporter, connecting trusted global brands with wholesale and retail markets across Ethiopia.",
    fr: "INTEMA Trading PLC. est un importateur, distributeur, fabricant et exportateur de produits de grande consommation qui relie des marques mondiales de confiance aux marchés de gros et de détail de toute l’Éthiopie.",
  },
  entryCards: [
    {
      _key: "import",
      section: "import",
      title: { en: "We Import", fr: "Nous importons" },
      description: {
        en: "Trusted food and non-food brands from America, Europe and Asia, distributed across Ethiopia.",
        fr: "Des marques alimentaires et non alimentaires d’Amérique, d’Europe et d’Asie, distribuées dans toute l’Éthiopie.",
      },
    },
    {
      _key: "produce",
      section: "produce",
      title: { en: "We Produce", fr: "Nous produisons" },
      description: { en: "INTEMA makes its own Abay candles in Ethiopia, sold in 8-candle packs, alongside a legacy line of soap brands.", fr: "INTEMA fabrique ses propres bougies Abay en Éthiopie, vendues en paquets de 8, ainsi qu’une gamme historique de savons." },
    },
    {
      _key: "export",
      section: "export",
      title: { en: "We Export", fr: "Nous exportons" },
      description: {
        en: "Ethiopian coffee, exported under our two registered brands, Seedcup and Bella, to buyers in the Middle East, Asia and Europe.",
        fr: "Du café éthiopien, exporté sous nos deux marques déposées, Seedcup et Bella, vers des acheteurs au Moyen-Orient, en Asie et en Europe.",
      },
    },
  ],
  // Adapted from the About Us "Mission" and "Keys to Success" copy.
  commitmentEyebrow: { en: "Our mission", am: "ተልዕኳችን" },
  commitmentHeadline: {
    en: "We do not only sell product, *we provide service.*",
    am: "ምርት ብቻ አንሸጥም፤ *አገልግሎት እንሰጣለን።*",
  },
  commitmentBody: {
    en: "We build strong relationships with key customers so we're viewed as indispensable partners, not just another supplier.",
    am: "ከቁልፍ ደንበኞቻችን ጋር ጠንካራ ግንኙነት በመገንባት እንደ ሌላ አቅራቢ ሳይሆን እንደ አስፈላጊ አጋር እንድንታይ እንሠራለን።",
  },
  mission: {
    en: "To be an indispensable partner to our key customers, not just another supplier: advising on assortment, stock levels, pricing, display and promotions.",
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
      en: "INTEMA Trading PLC. — Importing, Producing & Exporting Across East Africa",
      am: "ኢንተማ ትሬዲንግ — በምሥራቅ አፍሪካ ማስመጣት፣ ማምረትና መላክ",
    },
    description: {
      en: "The Quality Warehouse. Since 2014, INTEMA Trading PLC. has been connecting trusted global brands with Ethiopia.",
      fr: "The Quality Warehouse. Depuis 2014, INTEMA Trading PLC. relie des marques mondiales de confiance à l’Éthiopie.",
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
    en: "Trusted global FMCG brands, food and non-food.",
    am: "የታመኑ ዓለም አቀፍ የፍጆታ ምርት ብራንዶች — ምግብና ምግብ ነክ ያልሆኑ።",
  },
  nonFoodIntro: {
    en: "Cosmetic and personal care supplies — skin, hair and body care from trusted international brands — for wholesale and retail stands across Ethiopia, Djibouti and Sudan.",
    am: "የኮስሞቲክስና የግል እንክብካቤ ምርቶች — ከታመኑ ዓለም አቀፍ ብራንዶች የቆዳ፣ የፀጉርና የሰውነት እንክብካቤ — በኢትዮጵያ፣ በጅቡቲና በሱዳን ለሚገኙ የጅምላና የችርቻሮ መሸጫዎች።",
  },
  foodIntro: {
    en: "Specialty food and drinks — from dairy and sauces to soups, snacks and beverages — delivered to our accounts twice a week.",
    am: "ልዩ ምግብና መጠጦች — ከወተት ተዋጽኦና ሶሶች እስከ ሾርባ፣ መክሰስና መጠጦች — ለደንበኞቻችን በሳምንት ሁለት ጊዜ ይደርሳሉ።",
  },

  produceHeading: { en: "We Produce", am: "እናመርታለን" },
  produceIntro: {
    en: "INTEMA manufactures its own candle brand, Abay (አባይ ሻማ), sold in 8-candle packs, with Netsanet Workneh as brand ambassador.",
    am: "ኢንተማ አባይ (አባይ ሻማ) የተሰኘውን የራሱን የሻማ ብራንድ ያመርታል። ምርቱ በ8 ሻማ ጥቅል የሚሸጥ ሲሆን የብራንዱ አምባሳደር ነፃነት ወርቅነህ ነው።",
  },
  productsIntro: {
    en: "Made in-house: our Abay candle brand and a legacy line of soap brands.",
    am: "በራሳችን የሚመረቱ፦ የአባይ ሻማ ብራንዳችንና ነባር የሳሙና ብራንዶቻችን።",
  },

  exportHeading: { en: "We Export", am: "እንልካለን" },
  exportIntro: {
    en: "Ethiopian coffee to the Middle East, Asia & Europe.",
    am: "የኢትዮጵያ ቡና ወደ መካከለኛው ምሥራቅ፣ እስያና አውሮፓ።",
  },
  exportBody: {
    en: "Coffee is Ethiopia's main export commodity — internationally recognised for its high quality and taste, and a way for INTEMA to secure forex for its import business. Through two registered export brands, Seedcup and Bella, INTEMA aims to spread the popularity of Ethiopian coffee tradition to the Middle East, Asia and Europe. Our team has invested in coffee training and education, including participation in an Ethiopian/Saudi coffee exchange and international trade shows such as Gulfood.",
    am: "ቡና የኢትዮጵያ ዋነኛ የወጪ ንግድ ምርት ሲሆን በጥራቱና በጣዕሙ በዓለም አቀፍ ደረጃ የታወቀ ነው፤ እንዲሁም ኢንተማ ለማስመጣት ሥራው የውጭ ምንዛሪ የሚያገኝበት መንገድ ነው። ሲድካፕ እና ቤላ በተባሉ ሁለት የተመዘገቡ የወጪ ንግድ ብራንዶች አማካኝነት ኢንተማ የኢትዮጵያን የቡና ባህል ተወዳጅነት ወደ መካከለኛው ምሥራቅ፣ እስያና አውሮፓ ለማስፋፋት ያለመ ነው። ቡድናችን በቡና ሥልጠናና ትምህርት ላይ ኢንቨስት ያደረገ ሲሆን፣ በኢትዮጵያ–ሳዑዲ የቡና ልውውጥ እና እንደ ጋልፉድ ባሉ ዓለም አቀፍ የንግድ ትርዒቶች ተሳትፏል።",
  },
  exportBrandsIntro: {
    en: "Two registered export brands carrying Ethiopian coffee to the Middle East, Asia and Europe.",
    am: "የኢትዮጵያን ቡና ወደ መካከለኛው ምሥራቅ፣ እስያና አውሮፓ የሚወስዱ ሁለት የተመዘገቡ የወጪ ንግድ ብራንዶች።",
  },
  routeHeading: { en: "Every step, handled", fr: "Chaque étape, maîtrisée" },
  routeIntro: {
    en: "Beyond importing, INTEMA runs the whole journey in-house, from the supplier’s dock to the store shelf. Here is how each step works.",
    fr: "Au-delà de l’importation, INTEMA gère tout le parcours en interne, du quai du fournisseur jusqu’au rayon. Voici comment se déroule chaque étape.",
  },
  exportMarkets: [
    { _key: "middleEast", title: { en: "Middle East", fr: "Moyen-Orient" }, body: { en: "Saudi Arabia and the Gulf, where Ethiopian coffee has a long-standing following.", fr: "L’Arabie saoudite et le Golfe, où le café éthiopien est apprécié de longue date." } },
    { _key: "asia", title: { en: "Asia", fr: "Asie" }, body: { en: "Growing specialty-coffee markets across East and Southeast Asia.", fr: "Des marchés du café de spécialité en pleine croissance en Asie de l’Est et du Sud-Est." } },
    { _key: "europe", title: { en: "Europe", fr: "Europe" }, body: { en: "Roasters and buyers who prize Ethiopia’s distinctive origins.", fr: "Des torréfacteurs et acheteurs qui recherchent les origines singulières de l’Éthiopie." } },
  ],

  seo: {
    title: {
      en: "Our Services — Import, Production & Coffee Export",
      am: "አገልግሎቶቻችን — ማስመጣት፣ ማምረትና የቡና ወጪ ንግድ",
    },
    description: {
      en: "We import trusted global FMCG brands, produce the Abay candle brand and a legacy soap line, and export Ethiopian coffee through Seedcup and Bella.",
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
    en: "INTEMA is led by principal owners Bedru Hussen Jemal and Eliyas Abrar Sh., whose combined experience brings upper office management skills, high levels of customer service, and over 10 years in distribution and sales management.",
    am: "ኢንተማ የሚመራው በዋና ባለቤቶቹ በድሩ ሁሴን ጀማል እና ኤልያስ አብራር ሸ. ሲሆን፣ ጥምር ልምዳቸው የከፍተኛ አመራር ክህሎትን፣ ከፍተኛ የደንበኞች አገልግሎትን እና በማከፋፈልና በሽያጭ አመራር ከ10 ዓመታት በላይ ልምድን ያካትታል።",
  },
  leadershipHeading: { en: "Leadership", am: "አመራር" },
  leadershipIntro: {
    en: "Relationships are the key to success in distribution, and personal selling is led from the top — Bedru with his skill and experience in sales and distribution, and Eliyas in customer service and relations.",
    am: "በማከፋፈል ሥራ የስኬት ቁልፉ ግንኙነት ነው፤ በአካል የሚደረግ ሽያጭም ከላይ ይመራል — በድሩ በሽያጭና በማከፋፈል ክህሎቱና ልምዱ፣ ኤልያስ ደግሞ በደንበኞች አገልግሎትና ግንኙነት።",
  },
  headsHeading: { en: "Our departments", fr: "Nos départements" },
  headsIntro: {
    en: "Day to day, INTEMA runs on twenty-six people across nine departments. Sales, marketing and media (ten people) win and serve our customers, administration and finance (four) keep the business running, and operations (eleven) keep stock ready and moving, each led by one of the heads below.",
    fr: "Au quotidien, INTEMA s’appuie sur vingt-six personnes réparties dans neuf départements. Les ventes, le marketing et les médias (dix personnes) gagnent et servent nos clients, l’administration et les finances (quatre) font tourner l’entreprise, et les opérations (onze) tiennent le stock prêt et en mouvement, chacun sous la direction d’un des responsables ci-dessous.",
  },
  ambassadorName: { en: "Netsanet Workneh", am: "ነፃነት ወርቅነህ" },
  ambassadorRole: { en: "Brand ambassador", fr: "Visage de la marque" },
  ambassadorBio: {
    en: "Netsanet Workneh is the face of Abay, INTEMA’s own candle brand. Abay candles are made by INTEMA in Ethiopia and sold in 8-candle packs through the same wholesale and retail network that carries our imported brands. As brand ambassador, Netsanet represents Abay to customers and retail partners, helping a locally made product earn its place on shelves and in homes across the country.",
    fr: "Netsanet Workneh est le visage d’Abay, la marque de bougies d’INTEMA. Fabriquées par INTEMA en Éthiopie, les bougies Abay sont vendues en paquets de 8 via le même réseau de gros et de détail que nos marques importées. Visage de la marque, Netsanet représente Abay auprès des clients et des partenaires commerciaux, et aide un produit local à gagner sa place dans les rayons et les foyers de tout le pays.",
  },
  facts: [
    { _key: "team", value: "26+", label: { en: "Team members", fr: "Collaborateurs" }, note: { en: "Across nine departments", fr: "Répartis dans neuf départements" } },
    { _key: "fleet", value: "4+", label: { en: "Delivery fleet", am: "የማከፋፈያ ተሽከርካሪዎች" }, note: { en: "Doubled within a year", am: "በአንድ ዓመት ውስጥ በእጥፍ አድጓል" } },
    { _key: "accounts", value: "30+", label: { en: "Accounts serviced daily", am: "በየቀኑ የሚስተናገዱ ደንበኞች" }, note: { en: "Deliveries twice weekly", am: "በሳምንት ሁለት ጊዜ ማድረስ" } },
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
      body: { en: "A six-person sales team serves current customers and wins new business, with marketing and media & communications: ten people in all.", fr: "Une équipe commerciale de six personnes sert nos clients et en gagne de nouveaux, avec le marketing et les médias et la communication : dix personnes au total." },
    },
    {
      _key: "admin",
      title: { en: "Administration & finance", fr: "Administration et finances" },
      body: { en: "HR and the executive office, finance and general services: four people keeping the business running.", fr: "RH et secrétariat de direction, finances et services généraux : quatre personnes qui font tourner l’entreprise." },
    },
    {
      _key: "operations",
      title: { en: "Operations", fr: "Opérations" },
      body: { en: "A ten-person store and warehouse team plus technical support, with deliveries Monday to Friday on routes planned to save time and fuel.", fr: "Une équipe de dix personnes au magasin et à l’entrepôt, plus le support technique, avec des livraisons du lundi au vendredi sur des itinéraires conçus pour économiser temps et carburant." },
    },
  ],
  trainingHeading: { en: "Training", am: "ሥልጠና" },
  training: {
    en: "INTEMA has invested in coffee training and education so its team is knowledgeable and well prepared — including an Ethiopian/Saudi coffee exchange (“Coffee Talk” with Saudi coffee expert Ali Al Diwani) and international trade shows such as Gulfood.",
    am: "ኢንተማ ቡድኑ ዕውቀት ያለውና በሚገባ የተዘጋጀ እንዲሆን በቡና ሥልጠናና ትምህርት ላይ ኢንቨስት አድርጓል — በኢትዮጵያ–ሳዑዲ የቡና ልውውጥ (ከሳዑዲው የቡና ባለሙያ አሊ አል ዲዋኒ ጋር “ኮፊ ቶክ”) እና እንደ ጋልፉድ ባሉ ዓለም አቀፍ የንግድ ትርዒቶች መሳተፍን ጨምሮ።",
  },
  partnerHeading: { en: "Partner *with us*", am: "*ከእኛ ጋር* ይሥሩ" },
  partnerBody: {
    en: "Brand principals looking for distribution in Ethiopia, Djibouti and Sudan, retailers and wholesalers, and collaborators — tell us about your business and our team will get back to you.",
    am: "በኢትዮጵያ፣ በጅቡቲና በሱዳን አከፋፋይ የሚፈልጉ የብራንድ ባለቤቶች፣ ቸርቻሪዎችና ጅምላ ሻጮች እንዲሁም ተባባሪዎች — ስለ ሥራዎ ይንገሩን፤ ቡድናችን ምላሽ ይሰጥዎታል።",
  },
  seo: {
    title: { en: "Our Team — Leadership & Sales", am: "ቡድናችን — አመራርና ሽያጭ" },
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
    _id: "team-eliyas",
    name: { en: "Eliyas Abrar Sh.", fr: "Eliyas Abrar Sh.", am: "ኤልያስ አብራር ሸ." },
    role: { en: "Principal owner", fr: "Copropriétaire", am: "ዋና ባለቤት" },
    group: "leadership",
    bio: { en: "Leads customer service and relations.", fr: "Dirige le service et la relation client.", am: "የደንበኞች አገልግሎትንና ግንኙነትን ይመራል።" },
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
    en: "Tell us who you are and what you're looking for — our sales team will get back to you.",
    am: "ማን እንደሆኑና ምን እንደሚፈልጉ ይንገሩን — የሽያጭ ቡድናችን ምላሽ ይሰጥዎታል።",
  },
};

export const aboutPage: AboutPage = {
  title: { en: "About Us", am: "ስለ እኛ" },
  eyebrow: { en: "Since 2014", fr: "Depuis 2014", am: "ከ2014 ጀምሮ" },
  intro: {
    en: "The Quality Warehouse — a diversified FMCG importer, distributor, manufacturer and exporter serving Ethiopia, Djibouti and Sudan since 2014.",
    am: "የጥራት መጋዘን — ከ2014 ጀምሮ ኢትዮጵያን፣ ጅቡቲንና ሱዳንን የሚያገለግል ሁለገብ የፍጆታ ምርቶች አስመጪ፣ አከፋፋይ፣ አምራችና ላኪ።",
  },
  whoWeAreHeading: { en: "Who we are & what we do", am: "ማን ነን፣ ምን እንሠራለን" },
  whoWeAre: [
    {
      en: "Established in 2014, INTEMA Trading PLC. is a privately held S-Corporation and a diversified FMCG importer, distributor, manufacturer and exporter headquartered in Arada Sub City, Addis Ababa — a prime location to service both wholesale and retail markets.",
      am: "በ2014 የተመሠረተው ኢንተማ ትሬዲንግ ኃ.የተ.የግ.ማ. የግል ኩባንያ ሲሆን፣ ዋና መሥሪያ ቤቱን በአራዳ ክፍለ ከተማ፣ አዲስ አበባ ያደረገ ሁለገብ የፍጆታ ምርቶች አስመጪ፣ አከፋፋይ፣ አምራችና ላኪ ነው — የጅምላና የችርቻሮ ገበያዎችን ለማገልገል ምቹ በሆነ ቦታ።",
    },
    {
      en: "INTEMA serves Ethiopia, Djibouti and Sudan, a combined market of roughly 170 million people, and is principally owned by Bedru Hussen Jemal and Eliyas Abrar Sh., whose combined experience brings upper office management skills, high levels of customer service, and over 10 years in distribution and sales management with Beiersdorf, L'Oréal Professional and L'Oréal Consumer Products.",
      am: "ኢንተማ በግምት 170 ሚሊዮን ሕዝብ ያለውን የኢትዮጵያ፣ የጅቡቲና የሱዳን ጥምር ገበያ ያገለግላል። ዋና ባለቤቶቹ በድሩ ሁሴን ጀማልና ኤልያስ አብራር ሸ. ሲሆኑ፣ ጥምር ልምዳቸው የከፍተኛ አመራር ክህሎትን፣ ከፍተኛ የደንበኞች አገልግሎትንና በቤየርስዶርፍ፣ በሎሬያል ፕሮፌሽናልና በሎሬያል ኮንሲውመር ፕሮዳክትስ ከ10 ዓመታት በላይ የማከፋፈልና የሽያጭ አመራር ልምድን ያካትታል።",
    },
    {
      en: "Beyond import and distribution, INTEMA manufactures its own candle brand, “Abay,” and exports Ethiopian coffee internationally through two registered export brands, Seedcup and Bella. We do not only sell product — we provide service.",
      am: "ከማስመጣትና ከማከፋፈል ባሻገር ኢንተማ “አባይ” የተሰኘውን የራሱን የሻማ ብራንድ ያመርታል፤ የኢትዮጵያን ቡናም ሲድካፕና ቤላ በተባሉ ሁለት የተመዘገቡ የወጪ ንግድ ብራንዶች ወደ ውጭ ይልካል። ምርት ብቻ አንሸጥም — አገልግሎት እንሰጣለን።",
    },
  ],
  stats: [
    { _key: "founded", value: "2014", label: { en: "Founded", am: "የተመሠረተበት" }, note: { en: "12 years in operation", am: "12 ዓመታት በሥራ ላይ" } },
    { _key: "market", value: "170M", label: { en: "Combined market", am: "ጥምር ገበያ" }, note: { en: "Ethiopia, Djibouti & Sudan", am: "ኢትዮጵያ፣ ጅቡቲና ሱዳን" } },
    { _key: "team", value: "26+", label: { en: "Team members", fr: "Collaborateurs" }, note: { en: "Across nine departments", fr: "Répartis dans neuf départements" } },
    { _key: "accounts", value: "30+", label: { en: "Accounts serviced daily", am: "በየቀኑ የሚስተናገዱ ደንበኞች" }, note: { en: "Deliveries twice weekly", am: "በሳምንት ሁለት ጊዜ ማድረስ" } },
    { _key: "fleet", value: "4+", label: { en: "Delivery fleet", am: "የማከፋፈያ ተሽከርካሪዎች" }, note: { en: "Doubled within a year", am: "በአንድ ዓመት ውስጥ በእጥፍ አድጓል" } },
  ],
  visionSectionHeading: { en: "What drives us", fr: "Ce qui nous anime" },
  visionSectionIntro: { en: "Everything we do is guided by a clear vision for where INTEMA is going and a mission for how we work with our customers every day.", fr: "Tout ce que nous faisons est guidé par une vision claire de l’avenir d’INTEMA et par une mission qui définit notre façon de travailler chaque jour avec nos clients." },
  visionHeading: { en: "Vision", am: "ራዕይ" },
  vision: {
    en: "To become a recognized distributor of specialty food, cosmetic and personal care supplies and services to wholesale and retail stands throughout the Ethiopian, Sudanese and Djiboutian markets.",
    am: "በኢትዮጵያ፣ በሱዳንና በጅቡቲ ገበያዎች ለሚገኙ የጅምላና የችርቻሮ መሸጫዎች የልዩ ምግብ፣ የኮስሞቲክስና የግል እንክብካቤ ምርቶችና አገልግሎቶች ዕውቅና ያለው አከፋፋይ መሆን።",
  },
  missionHeading: { en: "Mission", am: "ተልዕኮ" },
  mission: {
    en: "To develop strong relationships with key customers so INTEMA is viewed as an indispensable partner, not just another supplier — recommending product assortment, stocking levels, pricing, display and promotional ideas tailored to each customer's retail base.",
    am: "ኢንተማ እንደ ሌላ አቅራቢ ሳይሆን እንደ አስፈላጊ አጋር እንዲታይ ከቁልፍ ደንበኞች ጋር ጠንካራ ግንኙነት መገንባት — ለእያንዳንዱ ደንበኛ የሚስማማ የምርት ዓይነት፣ የክምችት መጠን፣ ዋጋ፣ አቀራረብና የማስተዋወቂያ ሐሳቦችን በመጠቆም።",
  },
  processHeading: { en: "Our process", am: "የአሠራር ሂደታችን" },
  processIntro: {
    en: "One platform, every market: INTEMA reaches its customers through a single integrated operation spanning import distribution, own-brand manufacturing and coffee export — across three countries.",
    am: "አንድ መድረክ፣ ሁሉም ገበያ፦ ኢንተማ ማስመጣትና ማከፋፈልን፣ የራሱን ብራንድ ማምረትንና የቡና ወጪ ንግድን በሚያጣምር አንድ የተቀናጀ አሠራር በሦስት አገሮች ደንበኞቹን ይደርሳል።",
  },
  processSteps: [
    {
      _key: "source",
      title: { en: "Source", am: "ማስመጣት" },
      body: {
        en: "We import trusted food and non-food brands — including exclusive distribution rights to groundbreaking products not yet available in our markets.",
        am: "የታመኑ የምግብና ምግብ ነክ ያልሆኑ ብራንዶችን እናስመጣለን — በገበያዎቻችን ገና ላልተገኙ አዳዲስ ምርቶች ብቸኛ የማከፋፈል መብትን ጨምሮ።",
      },
    },
    {
      _key: "order",
      title: { en: "Order", am: "ማዘዝ" },
      body: {
        en: "Phone your order in by 2:30 p.m. the afternoon before your delivery day, fax a completed order sheet, or choose tel-sell and we'll call you to check quantities.",
        am: "ከማድረሻ ቀንዎ በፊት ባለው ቀን እስከ ከሰዓት 8፡30 በስልክ ያዝዙ፣ የተሞላ የትዕዛዝ ቅጽ በፋክስ ይላኩ፣ ወይም መጠኑን ለማረጋገጥ እኛ እንድንደውልልዎ ይምረጡ።",
      },
    },
    {
      _key: "deliver",
      title: { en: "Deliver", am: "ማድረስ" },
      body: {
        en: "Deliveries run Monday to Friday on routes planned to save time and fuel, with each account served once or twice a week.",
        am: "ጊዜና ነዳጅ በሚቆጥቡ መስመሮች ከሰኞ እስከ ዓርብ እናደርሳለን፤ እያንዳንዱ ደንበኛ በሳምንት አንድ ወይም ሁለት ጊዜ ይስተናገዳል።",
      },
    },
    {
      _key: "support",
      title: { en: "Grow", am: "ማሳደግ" },
      body: {
        en: "We help customers increase sales with tailored assortment and pricing, creative promotions, advertising and custom marketing material.",
        am: "በሚስማማ የምርት ዓይነትና ዋጋ፣ በፈጠራ የታከሉ ማስተዋወቂያዎች፣ በማስታወቂያና በልዩ የማርኬቲንግ ቁሳቁሶች ደንበኞች ሽያጫቸውን እንዲጨምሩ እንረዳለን።",
      },
    },
  ],
  keysIntro: { en: "Five principles explain why retailers, wholesalers and brand owners choose to work with INTEMA, and keep working with us.", fr: "Cinq principes expliquent pourquoi détaillants, grossistes et propriétaires de marques choisissent de travailler avec INTEMA, et nous restent fidèles." },
  keysHeading: { en: "Keys to success", am: "የስኬት ቁልፎች" },
  keysToSuccess: [
    { en: "Innovative, quality products.", am: "ፈጠራ የታከለባቸው ጥራት ያላቸው ምርቶች።" },
    {
      en: "Individualised customer service — providing customers with what they want, when and how they want it.",
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
    title: { en: "About INTEMA Trading PLC. — The Quality Warehouse", am: "ስለ ኢንተማ ትሬዲንግ — የጥራት መጋዘን" },
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
    description: { en: "Abay (አባይ ሻማ) is INTEMA’s own candle brand, made in Ethiopia and sold in packs of 8. Dependable, clean-burning household candles for everyday use, from power cuts to celebrations, at a price that suits every home.\n\nAbay reaches shops and wholesalers across the country through the same sales and delivery network that carries our imported brands, with Netsanet Workneh as its brand ambassador.", fr: "Abay (አባይ ሻማ) est la marque de bougies d’INTEMA, fabriquée en Éthiopie et vendue en paquets de 8. Des bougies domestiques fiables, à la combustion propre, pour tous les jours, des coupures de courant aux fêtes, à un prix adapté à chaque foyer.\n\nAbay est distribuée aux boutiques et grossistes de tout le pays grâce au même réseau de vente et de livraison que nos marques importées, avec Netsanet Workneh comme visage de la marque." },
  },
];

export const exportItems: ExportItem[] = [
  { _id: "export-seedcup", name: "Seedcup", description: { en: "Registered export brand", am: "የተመዘገበ የወጪ ንግድ ብራንድ" } },
  { _id: "export-bella", name: "Bella", description: { en: "Registered export brand", am: "የተመዘገበ የወጪ ንግድ ብራንድ" } },
];
