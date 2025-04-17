export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
  category: string;
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "30",
    title: "Wat is AI?",
    date: "17/04/25",
    excerpt: "Je hoort het overal: AI verandert de wereld. Maar wat is AI nou eigenlijk? Kunstmatige intelligentie (AI) is niet langer sciencefiction – het is de technologie achter je Netflix-aanbevelingen, chatbots en zelfs zelfrijdende auto’s.",
    image: "/images/blog/ai.png",
    slug: "wat-is-ai",
    category: "AI Modelleren",
    readingTime: "5 min"
  },
  {
    id: "29",
    title: "DeepSeek: Wat is het?",
    date: "17/04/25",
    excerpt: "DeepSeek AI is een open-source AI-model dat geboren is uit een visionair idee en gedreven door jonge talenten. Met open-source modellen, lage kosten en ongeëvenaarde efficiëntie maakt DeepSeek geavanceerde technologie toegankelijk voor iedereen.",
    image: "/images/blog/deepseek.png",
    slug: "deepseek-ai-wat-is-het",
    category: "AI Modelleren",
    readingTime: "5 min"
  },
  {
    id: "28",
    title: "Hulpmiddelen voor Kandidaatselectie: De Slimme Manier om Werven",
    date: "15/04/25",
    excerpt: "Ontdek hoe slimme hulpmiddelen zoals AI-screening en geautomatiseerde interviews je wervingsproces sneller, eerlijker en efficiënter maken.",
    image: "/images/blog/candidate-selection-tools.png",
    slug: "hulpmiddelen-voor-kandidaatselectie-slimme-manier-werven",
    category: "Recruitment & AI",
    readingTime: "5 min"
  },
  {
    id: "27",
    title: "AI-Gedreven Recruitment: De Toekomst van Werving",
    date: "12/04/25",
    excerpt: "Leer hoe AI-gestuurde recruitment je wervingsproces transformeert met snelle screening, bias-vrije selectie en een betere kandidaatervaring.",
    image: "/images/blog/ai-driven-recruitment.png",
    slug: "ai-gedreven-recruitment-toekomst-werving",
    category: "Recruitment & AI",
    readingTime: "5 min"
  },
  {
    id: "26",
    title: "Leads Genereren met AI: Boost Je Verkoop",
    date: "09/04/25",
    excerpt: "Ontdek hoe AI hyper-personalisatie, leadscoring en 24/7 automatisering inzet om je leadgeneratie te verbeteren en je verkoop te boosten.",
    image: "/images/blog/ai-lead-generation.png",
    slug: "leads-genereren-ai-boost-verkoop",
    category: "Verkoop & Marketing",
    readingTime: "5 min"
  },
  {
    id: "25",
    title: "Hulpmiddelen voor Kandidaatselectie: Vind Talent Sneller",
    date: "06/04/25",
    excerpt: "Leer hoe moderne tools zoals AI-screening en geautomatiseerde interviews je helpen om sneller en efficiënter topkandidaten te vinden.",
    image: "/images/blog/candidate-selection.png",
    slug: "hulpmiddelen-kandidaatselectie-vind-talent-sneller",
    category: "Recruitment & AI",
    readingTime: "5 min"
  },
  {
    id: "24",
    title: "Auteursrechten voor Software Ontwikkelaars: Bescherm Je Werk",
    date: "03/04/25",
    excerpt: "Een praktische gids om je code te beschermen met auteursrechten, inclusief tips over licenties, documentatie en juridische stappen.",
    image: "/images/blog/software-copyright.png",
    slug: "auteursrechten-software-ontwikkelaars-bescherm-je-werk",
    category: "Intellectueel Eigendom",
    readingTime: "5 min"
  },
  {
    id: "23",
    title: "Mens-AI Samenwerking: Het Beste van Twee Werelden",
    date: "31/03/25",
    excerpt: "Ontdek hoe menselijke creativiteit en AI-efficiëntie samenkomen om je team productiever en innovatiever te maken.",
    image: "/images/blog/human-ai-collaboration.png",
    slug: "mens-ai-samenwerking-beste-twee-werelden",
    category: "Werkplek Innovatie",
    readingTime: "5 min"
  },
  {
    id: "22",
    title: "Revolutie in Bedrijfsprocessen met AI",
    date: "28/03/25",
    excerpt: "Leer hoe AI bedrijfsprocessen transformeert door efficiëntie, slimme beslissingen en een ongeëvenaarde klantbeleving.",
    image: "/images/blog/ai-business-revolution.png",
    slug: "revolutie-bedrijfsprocessen-ai",
    category: "Bedrijfsautomatisering",
    readingTime: "5 min"
  },
  {
    id: "21",
    title: "Agent2Agent Protocol: AI Samenwerking Revolutie",
    date: "25/03/25",
    excerpt: "Ontdek hoe het Agent2Agent Protocol (A2A) AI-systemen laat samenwerken als een dreamteam, met voorbeelden uit diverse sectoren.",
    image: "/images/blog/agent2agent-protocol.png",
    slug: "agent2agent-protocol-ai-samenwerking-revolutie",
    category: "AI Communicatie",
    readingTime: "10 min"
  },
  {
    id: "20",
    title: "Model Context Protocol: AI Communicatie Revolutie",
    date: "22/03/25",
    excerpt: "Leer hoe het Model Context Protocol (MCP) AI-communicatie menselijker en effectiever maakt, met praktische toepassingen.",
    image: "/images/blog/model-context-protocol.png",
    slug: "model-context-protocol-ai-communicatie-revolutie",
    category: "AI Communicatie",
    readingTime: "10 min"
  },
  {
    id: "19",
    title: "ROI van AI Agents: Bereken de Zakelijke Waarde voor Uw Bedrijf",
    date: "19/03/25",
    excerpt: "Een praktische gids voor het berekenen van de return on investment (ROI) bij de implementatie van AI agents in uw bedrijf.",
    image: "/images/blog/ai-roi-calculation.png",
    slug: "roi-ai-agents-bereken-zakelijke-waarde-bedrijf",
    category: "Business Case",
    readingTime: "8 min"
  },
  {
    id: "18",
    title: "Implementatie van AI Agents in het MKB: Een Stap-voor-Stap Handleiding",
    date: "16/03/25",
    excerpt: "Praktische strategieën voor MKB-bedrijven om AI agents te integreren zonder grote IT-afdeling of enorm budget.",
    image: "/images/blog/ai-implementation-smb.png",
    slug: "implementatie-ai-agents-mkb-stap-voor-stap-handleiding",
    category: "MKB & AI",
    readingTime: "10 min"
  },
  {
    id: "17",
    title: "AI Agents vs. Traditionele Automatisering: Wat Werkt Beter voor Uw Bedrijf?",
    date: "13/03/25",
    excerpt: "Een vergelijking tussen AI agents en traditionele automatiseringsoplossingen, met use cases en kostenanalyse.",
    image: "/images/blog/ai-vs-automation.png",
    slug: "ai-agents-vs-traditionele-automatisering-vergelijking",
    category: "Automatisering",
    readingTime: "9 min"
  },
  {
    id: "16",
    title: "Kostenbesparing door AI Agents: 7 Gebieden Waar Bedrijven Direct Voordeel Behalen",
    date: "10/03/25",
    excerpt: "Ontdek hoe AI agents kosten besparen in zeven cruciale gebieden, met praktijkvoorbeelden en implementatietips.",
    image: "/images/blog/ai-cost-savings.png",
    slug: "kostenbesparing-ai-agents-7-gebieden-directe-voordelen",
    category: "Operationele Efficiëntie",
    readingTime: "7 min"
  },
  {
    id: "15",
    title: "AI Integration in Existing Business Software: Compatibiliteit met Uw Huidige Systemen",
    date: "07/03/25",
    excerpt: "Hoe AI agents integreren met software zoals SAP, Exact, Microsoft en Salesforce, met technische best practices.",
    image: "/images/blog/ai-software-integration.png",
    slug: "ai-integration-existing-business-software-compatibiliteit",
    category: "Systeem Integratie",
    readingTime: "11 min"
  },
  {
    id: "14",
    title: "AI Agents voor Klantservice: Verhoog Klanttevredenheid en Verlaag Kosten",
    date: "04/03/25",
    excerpt: "Hoe AI agents de klantervaring verbeteren en kosten verlagen, met succesvolle implementaties als voorbeeld.",
    image: "/images/blog/ai-customer-service.png",
    slug: "ai-agents-klantservice-verhoog-tevredenheid-verlaag-kosten",
    category: "Klantervaring",
    readingTime: "8 min"
  },
  {
    id: "13",
    title: "Training van Medewerkers voor Samenwerking met AI Agents: Praktische Tips",
    date: "01/03/25",
    excerpt: "Strategieën om je team voor te bereiden op samenwerking met AI agents, van weerstand overwinnen tot productiviteit boosten.",
    image: "/images/blog/ai-employee-training.png",
    slug: "training-medewerkers-samenwerking-ai-agents-tips",
    category: "Personeelsontwikkeling",
    readingTime: "6 min"
  },
  {
    id: "12",
    title: "AI Agents voor Procesautomatisering: Van Handmatig naar Autonoom",
    date: "26/02/25",
    excerpt: "Hoe bedrijven processen transformeren naar autonome workflows met AI agents, met casestudy’s uit diverse sectoren.",
    image: "/images/blog/ai-process-automation.png",
    slug: "ai-agents-procesautomatisering-van-handmatig-naar-autonoom",
    category: "Procesoptimalisatie",
    readingTime: "9 min"
  },
  {
    id: "11",
    title: "Beveiliging en Privacy bij AI Agent Implementatie: Voldoen aan Wet- en Regelgeving",
    date: "23/02/25",
    excerpt: "Essentiële beveiligings- en privacytips voor AI-implementaties, inclusief AVG-compliance en risicobeheer.",
    image: "/images/blog/ai-security-privacy.png",
    slug: "beveiliging-privacy-ai-agent-implementatie-wetgeving",
    category: "Compliance & Beveiliging",
    readingTime: "10 min"
  },
  {
    id: "10",
    title: "AI Agents voor Verkoop en Marketing: Boost Uw Conversie en Lead-Generatie",
    date: "20/02/25",
    excerpt: "Hoe AI agents verkoop- en marketingprocessen verbeteren met geautomatiseerde leads en gepersonaliseerde communicatie.",
    image: "/images/blog/ai-sales-marketing.png",
    slug: "ai-agents-verkoop-marketing-boost-conversie-leads",
    category: "Verkoop & Marketing",
    readingTime: "7 min"
  },
  {
    id: "9",
    title: "AI Agent Huren: Praktijkgids voor Bedrijven in Nederland",
    date: "17/02/25",
    excerpt: "Alles over het huren van AI agents, inclusief kosten, implementatie en ROI voor Nederlandse bedrijven.",
    image: "/images/blog/ai-agent-huren.jpg",
    slug: "ai-agent-huren-praktijkgids-bedrijven-nederland",
    category: "AI Implementatie",
    readingTime: "7 min"
  },
  {
    id: "8",
    title: "AI voor Recruitment: Revolutionaire Technologie voor Moderne Recruiters",
    date: "14/02/25",
    excerpt: "Hoe AI recruitment transformeert, van kandidaatselectie tot onboarding, voor recruiters die voorop willen lopen.",
    image: "/images/blog/ai-recruitment.jpg",
    slug: "ai-voor-recruitment-technologie-moderne-recruiters",
    category: "Recruitment & AI",
    readingTime: "9 min"
  },
  {
    id: "7",
    title: "AI voor HR, Finance en Productie: De belangrijkste bedrijfstakken transformeren",
    date: "11/02/25",
    excerpt: "Hoe AI HR, Finance en Productie revolutionair verandert, met praktische toepassingen voor besluitvormers.",
    image: "/images/blog/ai-business-departments.jpg",
    slug: "ai-voor-hr-finance-productie-bedrijfstakken-transformeren",
    category: "Bedrijfstakken & AI",
    readingTime: "10 min"
  },
  {
    id: "0",
    title: "AI Agents vs Digitale Medewerkers: De Evolutie van Intelligente Assistenten",
    date: "08/02/25",
    excerpt: "Een vergelijking tussen AI Agents en Digitale Medewerkers, en welke technologie het beste bij je organisatie past.",
    image: "/images/blog/ai-digital-employee.jpg",
    slug: "ai-agents-vs-digitale-medewerkers-evolutie",
    category: "AI Technologie",
    readingTime: "8 min"
  },
  {
    id: "1",
    title: "Kunstmatige Intelligentie: De Toekomst van Bedrijfsautomatisering",
    date: "05/02/25",
    excerpt: "Hoe AI-gestuurde automatisering de efficiëntie van bedrijven verbetert en de toekomst van werk vormgeeft.",
    image: "/images/blog/ai-automation.jpg",
    slug: "kunstmatige-intelligentie-toekomst-bedrijfsautomatisering",
    category: "Automatisering",
    readingTime: "5 min"
  },
  {
    id: "2",
    title: "Data-analyse als Concurrentievoordeel: Praktische Toepassingen",
    date: "02/02/25",
    excerpt: "Hoe bedrijven data-analyse gebruiken om strategische beslissingen te nemen en een voorsprong te krijgen.",
    image: "/images/blog/data-analytics.jpg",
    slug: "data-analyse-concurrentievoordeel-praktische-toepassingen",
    category: "Data Analyse",
    readingTime: "7 min"
  },
  {
    id: "3",
    title: "Moderne Werkplekken: Mens en AI Samenwerking",
    date: "30/01/25",
    excerpt: "Hoe menselijke creativiteit en AI-ondersteuning samenkomen om moderne werkplekken productiever te maken.",
    image: "/images/blog/future-work.jpg",
    slug: "moderne-werkplekken-mens-ai-samenwerking",
    category: "Werkplek Innovatie",
    readingTime: "6 min"
  },
  {
    id: "4",
    title: "Ethische AI: Verantwoord Innoveren in het Digitale Tijdperk",
    date: "27/01/25",
    excerpt: "De belangrijkste ethische richtlijnen voor AI-ontwikkeling en implementatie in een snel digitaliserende wereld.",
    image: "/images/blog/ethical-ai.jpg",
    slug: "ethische-ai-verantwoord-innoveren-digitale-tijdperk",
    category: "AI Ethiek",
    readingTime: "8 min"
  },
  {
    id: "5",
    title: "Natuurlijke Taalverwerking: Revolutie in Klantenservice",
    date: "24/01/25",
    excerpt: "Hoe NLP-technologie klantenservice transformeert met slimme chatbots en geautomatiseerde ondersteuning.",
    image: "/images/blog/nlp-customer-service.jpg",
    slug: "natuurlijke-taalverwerking-revolutie-klantenservice",
    category: "Klantenservice",
    readingTime: "5 min"
  },
  {
    id: "6",
    title: "De Opkomst van Agile AI-implementaties",
    date: "21/01/25",
    excerpt: "Hoe bedrijven Agile-methodologieën gebruiken voor snellere en flexibelere AI-implementaties.",
    image: "/images/blog/agile-ai.jpg",
    slug: "opkomst-agile-ai-implementaties",
    category: "Implementatie",
    readingTime: "6 min"
  }
];