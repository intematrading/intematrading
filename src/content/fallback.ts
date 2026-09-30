// Copy from the "Website Content" package, in the same shape as the Sanity
// documents. The site renders this until Sanity is connected (and whenever a
// document hasn't been created there yet).
//
// Amharic strings are first drafts and need review by a native speaker
// before launch.

import type {
  AboutPage,
  Brand,
  ExportItem,
  ProducedItem,
  ContactPage,
  HomePage,
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
      en: "Since 2014, INTEMA Trading PLC. has connected trusted global brands with retailers across Ethiopia, Djibouti & Sudan.",
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
    en: "Since 2014, INTEMA Trading PLC. has connected trusted global brands with retailers across Ethiopia, Djibouti & Sudan.",
    am: "ከ2014 ጀምሮ ኢንተማ ትሬዲንግ ኃ.የተ.የግ.ማ. የታመኑ ዓለም አቀፍ ብራንዶችን በኢትዮጵያ፣ በጅቡቲና በሱዳን ከሚገኙ ቸርቻሪዎች ጋር ሲያገናኝ ቆይቷል።",
  },
  stats: [
    { _key: "founded", value: "2014", label: { en: "Founded", am: "የተመሠረተበት ዓመት" } },
    {
      _key: "market",
      value: "170M",
      label: {
        en: "Combined market across Ethiopia, Djibouti & Sudan",
        am: "በኢትዮጵያ፣ በጅቡቲና በሱዳን ያለ ጥምር ገበያ",
      },
    },
    {
      _key: "accounts",
      value: "20–30",
      label: { en: "Retail accounts serviced daily", am: "በየቀኑ የሚስተናገዱ የችርቻሮ ደንበኞች" },
    },
  ],
  entryCards: [
    {
      _key: "import",
      section: "import",
      title: { en: "We Import", am: "እናስመጣለን" },
      description: {
        en: "Trusted global FMCG brands, food and non-food",
        am: "የታመኑ ዓለም አቀፍ የፍጆታ ምርት ብራንዶች — ምግብና ምግብ ነክ ያልሆኑ",
      },
    },
    {
      _key: "produce",
      section: "produce",
      title: { en: "We Produce", am: "እናመርታለን" },
      description: { en: "Our own Abay candle brand", am: "የራሳችን የአባይ ሻማ ብራንድ" },
    },
    {
      _key: "export",
      section: "export",
      title: { en: "We Export", am: "እንልካለን" },
      description: {
        en: "Ethiopian coffee to the Middle East, Asia & Europe",
        am: "የኢትዮጵያ ቡና ወደ መካከለኛው ምሥራቅ፣ እስያና አውሮፓ",
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
  commitmentPoints: [
    { en: "Innovative, quality products", am: "ፈጠራ የታከለባቸው ጥራት ያላቸው ምርቶች" },
    { en: "Individualised customer service", am: "ለእያንዳንዱ ደንበኛ የተለየ አገልግሎት" },
    { en: "Exclusive distribution rights to groundbreaking products", am: "ለአዳዲስ ምርቶች ብቸኛ የማከፋፈል መብት" },
  ],
  seo: {
    title: {
      en: "INTEMA Trading PLC. — Importing, Producing & Exporting Across East Africa",
      am: "ኢንተማ ትሬዲንግ — በምሥራቅ አፍሪካ ማስመጣት፣ ማምረትና መላክ",
    },
    description: {
      en: "The Quality Warehouse. Since 2014, INTEMA Trading PLC. has connected trusted global brands with retailers across Ethiopia, Djibouti & Sudan.",
      am: "የጥራት መጋዘን። ከ2014 ጀምሮ ኢንተማ ትሬዲንግ የታመኑ ዓለም አቀፍ ብራንዶችን በኢትዮጵያ፣ በጅቡቲና በሱዳን ከሚገኙ ቸርቻሪዎች ጋር ሲያገናኝ ቆይቷል።",
    },
  },
};

export const servicesPage: ServicesPage = {
  title: { en: "Our Services", am: "አገልግሎቶቻችን" },
  eyebrow: { en: "Import · Produce · Export", am: "እናስመጣለን · እናመርታለን · እንልካለን" },
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
  exportMarkets: [
    { en: "Middle East", am: "መካከለኛው ምሥራቅ" },
    { en: "Asia", am: "እስያ" },
    { en: "Europe", am: "አውሮፓ" },
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
  eyebrow: { en: "The people behind INTEMA", am: "ከኢንተማ ጀርባ ያሉ ሰዎች" },
  intro: {
    en: "INTEMA is led by principal owners Bedru Hussen Jemal and Eliyas Abrar Sh., whose combined experience brings upper office management skills, high levels of customer service, and over 10 years in distribution and sales management.",
    am: "ኢንተማ የሚመራው በዋና ባለቤቶቹ በድሩ ሁሴን ጀማል እና ኤልያስ አብራር ሸ. ሲሆን፣ ጥምር ልምዳቸው የከፍተኛ አመራር ክህሎትን፣ ከፍተኛ የደንበኞች አገልግሎትን እና በማከፋፈልና በሽያጭ አመራር ከ10 ዓመታት በላይ ልምድን ያካትታል።",
  },
  leadershipHeading: { en: "Leadership", am: "አመራር" },
  leadershipIntro: {
    en: "Relationships are the key to success in distribution, and personal selling is led from the top — Bedru with his skill and experience in sales and distribution, and Eliyas in customer service and relations.",
    am: "በማከፋፈል ሥራ የስኬት ቁልፉ ግንኙነት ነው፤ በአካል የሚደረግ ሽያጭም ከላይ ይመራል — በድሩ በሽያጭና በማከፋፈል ክህሎቱና ልምዱ፣ ኤልያስ ደግሞ በደንበኞች አገልግሎትና ግንኙነት።",
  },
  salesHeading: { en: "Sales & marketing", am: "ሽያጭና ማርኬቲንግ" },
  salesIntro: {
    en: "Sales operations are handled by an 8-person team under Head of Sales Tesfaye Hassen and Marketing Manager Kalid Hussen.",
    am: "የሽያጭ ሥራዎች በሽያጭ ኃላፊ ተስፋዬ ሐሰን እና በማርኬቲንግ ሥራ አስኪያጅ ካሊድ ሁሴን የሚመራ ባለ 8 አባላት ቡድን ይከናወናሉ።",
  },
  salesTeamSize: "8",
  ambassadorName: { en: "Netsanet Workneh", am: "ነፃነት ወርቅነህ" },
  ambassadorRole: { en: "Brand ambassador", am: "የብራንድ አምባሳደር" },
  ambassadorBio: {
    en: "Brand ambassador for Abay, INTEMA's own candle brand.",
    am: "የኢንተማ የራሱ የሻማ ብራንድ የሆነው የአባይ አምባሳደር።",
  },
  facts: [
    { _key: "reps", value: "8", label: { en: "Sales representatives", am: "የሽያጭ ተወካዮች" }, note: { en: "Up from 2 at founding", am: "ሲመሠረት ከነበሩት 2 አድጎ" } },
    { _key: "fleet", value: "2→4", label: { en: "Delivery fleet", am: "የማከፋፈያ ተሽከርካሪዎች" }, note: { en: "Doubled within a year", am: "በአንድ ዓመት ውስጥ በእጥፍ አድጓል" } },
    { _key: "accounts", value: "20–30", label: { en: "Accounts serviced daily", am: "በየቀኑ የሚስተናገዱ ደንበኞች" }, note: { en: "Deliveries twice weekly", am: "በሳምንት ሁለት ጊዜ ማድረስ" } },
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
      title: { en: "Sales & delivery", am: "ሽያጭና ማድረስ" },
      body: {
        en: "8 delivery/sales representatives provide full service and delivery to current customers and make sales calls for new business.",
        am: "8 የማድረስ/የሽያጭ ተወካዮች ለነባር ደንበኞች ሙሉ አገልግሎትና ማድረስ ይሰጣሉ፤ ለአዲስ ሥራም የሽያጭ ጉብኝት ያደርጋሉ።",
      },
    },
    {
      _key: "marketing",
      title: { en: "Marketing", am: "ማርኬቲንግ" },
      body: {
        en: "Marketing and sales are closely integrated around the name “The Quality Warehouse”, including in-store campaigns such as the Clere shampoo campaign.",
        am: "ማርኬቲንግና ሽያጭ “የጥራት መጋዘን” በሚለው ስም ዙሪያ በቅርበት የተሳሰሩ ናቸው፤ እንደ ክሌር ሻምፑ ዘመቻ ያሉ የሱቅ ውስጥ ዘመቻዎችንም ያካትታሉ።",
      },
    },
    {
      _key: "logistics",
      title: { en: "Logistics & distribution", am: "ሎጂስቲክስና ማከፋፈል" },
      body: {
        en: "Delivery fleet, warehouse and merchandising teams, with deliveries Monday to Friday on routes planned to save time and fuel.",
        am: "የማከፋፈያ ተሽከርካሪዎች፣ የመጋዘንና የምርት አቀራረብ ቡድኖች፤ ጊዜና ነዳጅ በሚቆጥቡ መስመሮች ከሰኞ እስከ ዓርብ ማድረስ።",
      },
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
    name: { en: "Bedru Hussen Jemal", am: "በድሩ ሁሴን ጀማል" },
    role: { en: "Principal owner", am: "ዋና ባለቤት" },
    group: "leadership",
    bio: {
      en: "Leads sales and distribution, personally calling on potential customers to review our product line and services.",
      am: "ሽያጭንና ማከፋፈልን ይመራል፤ የምርትና የአገልግሎት ዝርዝራችንን ለማቅረብ ደንበኞችን በአካል ይጎበኛል።",
    },
  },
  {
    _id: "team-eliyas",
    name: { en: "Eliyas Abrar Sh.", am: "ኤልያስ አብራር ሸ." },
    role: { en: "Principal owner", am: "ዋና ባለቤት" },
    group: "leadership",
    bio: { en: "Leads customer service and relations.", am: "የደንበኞች አገልግሎትንና ግንኙነትን ይመራል።" },
  },
  {
    _id: "team-tesfaye",
    name: { en: "Tesfaye Hassen", am: "ተስፋዬ ሐሰን" },
    role: { en: "Head of Sales", am: "የሽያጭ ኃላፊ" },
    group: "sales",
    bio: { en: "Works in close connection with our 8 delivery/sales representatives.", am: "ከ8ቱ የማድረስ/የሽያጭ ተወካዮቻችን ጋር በቅርበት ይሠራል።" },
  },
  {
    _id: "team-kalid",
    name: { en: "Kalid Hussen", am: "ካሊድ ሁሴን" },
    role: { en: "Marketing Manager", am: "የማርኬቲንግ ሥራ አስኪያጅ" },
    group: "sales",
    bio: { en: "Works in close connection with our 8 delivery/sales representatives.", am: "ከ8ቱ የማድረስ/የሽያጭ ተወካዮቻችን ጋር በቅርበት ይሠራል።" },
  },
];

export const contactPage: ContactPage = {
  title: { en: "Contact", am: "ያግኙን" },
  eyebrow: { en: "Talk to our sales team", am: "የሽያጭ ቡድናችንን ያነጋግሩ" },
  intro: {
    en: "Retail partners, buyers and brand principals can reach our sales team directly.",
    am: "የችርቻሮ አጋሮች፣ ገዢዎችና የብራንድ ባለቤቶች የሽያጭ ቡድናችንን በቀጥታ ማግኘት ይችላሉ።",
  },
  formHeading: { en: "Send an inquiry", am: "ጥያቄ ይላኩ" },
  formIntro: {
    en: "Tell us who you are and what you're looking for — our sales team will get back to you.",
    am: "ማን እንደሆኑና ምን እንደሚፈልጉ ይንገሩን — የሽያጭ ቡድናችን ምላሽ ይሰጥዎታል።",
  },
  seo: {
    title: { en: "Contact INTEMA Trading PLC.", am: "ኢንተማ ትሬዲንግን ያግኙ" },
    description: {
      en: "Contact INTEMA Trading PLC. in Addis Ababa — phone, email and an inquiry form for retail partners, buyers and brand principals.",
      am: "በአዲስ አበባ የሚገኘውን ኢንተማ ትሬዲንግን ያግኙ — ስልክ፣ ኢሜይልና ለችርቻሮ አጋሮች፣ ለገዢዎችና ለብራንድ ባለቤቶች የጥያቄ ቅጽ።",
    },
  },
};

export const aboutPage: AboutPage = {
  title: { en: "About Us", am: "ስለ እኛ" },
  eyebrow: { en: "Since 2014", am: "ከ2014 ጀምሮ" },
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
    { _key: "reps", value: "8", label: { en: "Sales representatives", am: "የሽያጭ ተወካዮች" }, note: { en: "Up from 2 at founding", am: "ሲመሠረት ከነበሩት 2 አድጎ" } },
    { _key: "accounts", value: "20–30", label: { en: "Accounts serviced daily", am: "በየቀኑ የሚስተናገዱ ደንበኞች" }, note: { en: "Deliveries twice weekly", am: "በሳምንት ሁለት ጊዜ ማድረስ" } },
    { _key: "fleet", value: "2→4", label: { en: "Delivery fleet", am: "የማከፋፈያ ተሽከርካሪዎች" }, note: { en: "Doubled within a year", am: "በአንድ ዓመት ውስጥ በእጥፍ አድጓል" } },
  ],
  gallery: [
    { _key: "warehouse", caption: { en: "Warehouse and merchandising teams keep stock moving", am: "የመጋዘንና የምርት አቀራረብ ቡድኖች ምርትን ያንቀሳቅሳሉ" } },
    { _key: "fleet", caption: { en: "Our delivery fleet doubled within its first year", am: "የማከፋፈያ ተሽከርካሪዎቻችን በመጀመሪያው ዓመት በእጥፍ አድገዋል" } },
    { _key: "retail", caption: { en: "20–30 wholesale and retail accounts serviced every day", am: "በየቀኑ 20–30 የጅምላና የችርቻሮ ደንበኞች ይስተናገዳሉ" } },
    { _key: "port", caption: { en: "Trusted global brands imported for East African markets", am: "ለምሥራቅ አፍሪካ ገበያዎች የሚገቡ የታመኑ ዓለም አቀፍ ብራንዶች" } },
    { _key: "candles", caption: { en: "Abay candles, produced in-house", am: "በራሳችን የሚመረቱ የአባይ ሻማዎች" } },
    { _key: "coffee", caption: { en: "Ethiopian coffee exported through Seedcup and Bella", am: "በሲድካፕና ቤላ ብራንዶች የሚላክ የኢትዮጵያ ቡና" } },
    {
      _key: "training",
      caption: { en: "Coffee training, including “Coffee Talk” with Saudi coffee expert Ali Al Diwani", am: "የቡና ሥልጠና — ከሳዑዲው የቡና ባለሙያ አሊ አል ዲዋኒ ጋር “ኮፊ ቶክ”ን ጨምሮ" },
    },
  ],
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
    description: { en: "Our own candle brand, sold in 8-candle packs.", am: "የራሳችን የሻማ ብራንድ፤ በ8 ሻማ ጥቅል ይሸጣል።" },
  },
  ...(["Skor", "Cool", "Mama", "Abu", "Kanna", "Pass"] as const).map((name) => ({
    _id: `produce-${name.toLowerCase()}`,
    name: { en: name },
    category: { en: "Soap", am: "ሳሙና" },
    description: { en: "Part of our legacy soap line.", am: "የነባር የሳሙና ምርቶቻችን አካል።" },
  })),
];

export const exportItems: ExportItem[] = [
  { _id: "export-seedcup", name: "Seedcup", description: { en: "Registered export brand", am: "የተመዘገበ የወጪ ንግድ ብራንድ" } },
  { _id: "export-bella", name: "Bella", description: { en: "Registered export brand", am: "የተመዘገበ የወጪ ንግድ ብራንድ" } },
];
