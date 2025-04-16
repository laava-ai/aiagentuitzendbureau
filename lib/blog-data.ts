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

// Blog posts data - would typically come from a CMS
export const blogPosts: BlogPost[] = [
  {
    id: "20",
    title: "Model Context Protocol: AI Communicatie Revolutie",
    date: "2025-04-16",
    excerpt: "Ontdek hoe het Model Context Protocol (MCP) de AI communicatie revolutioneert, met voorbeelden van toepassingen in verschillende gebieden.",
    image: "/images/blog/model-context-protocol.png",
    slug: "model-context-protocol-ai-communicatie-revolutie",
    category: "AI Communicatie",
    readingTime: "10 min"
  },
  {
    id: "19",
    title: "ROI van AI Agents: Bereken de Zakelijke Waarde voor Uw Bedrijf",
    date: "2024-12-15",
    excerpt: "Een praktische gids voor het berekenen van de return on investment (ROI) bij de implementatie van AI agents in uw bedrijf, met concrete methoden en voorbeelden.",
    image: "/images/blog/ai-roi-calculation.png",
    slug: "roi-ai-agents-bereken-zakelijke-waarde-bedrijf",
    category: "Business Case",
    readingTime: "8 min"
  },
  {
    id: "18",
    title: "Implementatie van AI Agents in het MKB: Een Stap-voor-Stap Handleiding",
    date: "2024-12-10",
    excerpt: "Praktische implementatiestrategieën voor MKB-bedrijven die AI agents willen integreren zonder grote IT-afdeling of enorm budget. Van eerste evaluatie tot volledige uitrol.",
    image: "/images/blog/ai-implementation-smb.png",
    slug: "implementatie-ai-agents-mkb-stap-voor-stap-handleiding",
    category: "MKB & AI",
    readingTime: "10 min"
  },
  {
    id: "17",
    title: "AI Agents vs. Traditionele Automatisering: Wat Werkt Beter voor Uw Bedrijf?",
    date: "2024-12-20",
    excerpt: "Een gedetailleerde vergelijking tussen AI agents en traditionele automatiseringsoplossingen, inclusief concrete use cases, kosten en implementatie-overwegingen.",
    image: "/images/blog/ai-vs-automation.png",
    slug: "ai-agents-vs-traditionele-automatisering-vergelijking",
    category: "Automatisering",
    readingTime: "9 min"
  },
  {
    id: "16",
    title: "Kostenbesparing door AI Agents: 7 Gebieden Waar Bedrijven Direct Voordeel Behalen",
    date: "2024-12-05",
    excerpt: "Ontdek de zeven belangrijkste gebieden waar AI agents aantoonbare kostenbesparingen realiseren, met praktijkvoorbeelden en implementatieadvies voor verschillende branches.",
    image: "/images/blog/ai-cost-savings.png",
    slug: "kostenbesparing-ai-agents-7-gebieden-directe-voordelen",
    category: "Operationele Efficiëntie",
    readingTime: "7 min"
  },
  {
    id: "15",
    title: "AI Integration in Existing Business Software: Compatibiliteit met Uw Huidige Systemen",
    date: "2024-11-25",
    excerpt: "Hoe AI agents naadloos integreren met populaire bedrijfssoftware zoals SAP, Exact, Microsoft, Salesforce en branchespecifieke oplossingen. Technische vereisten en best practices.",
    image: "/images/blog/ai-software-integration.png",
    slug: "ai-integration-existing-business-software-compatibiliteit",
    category: "Systeem Integratie",
    readingTime: "11 min"
  },
  {
    id: "14",
    title: "AI Agents voor Klantservice: Verhoog Klanttevredenheid en Verlaag Kosten",
    date: "2024-11-15",
    excerpt: "Hoe AI agents de klantervaring transformeren terwijl ze operationele kosten verlagen. Met voorbeelden van succesvolle implementaties in verschillende klantenservice-omgevingen.",
    image: "/images/blog/ai-customer-service.png",
    slug: "ai-agents-klantservice-verhoog-tevredenheid-verlaag-kosten",
    category: "Klantervaring",
    readingTime: "8 min"
  },
  {
    id: "13",
    title: "Training van Medewerkers voor Samenwerking met AI Agents: Praktische Tips",
    date: "2024-11-05",
    excerpt: "Effectieve strategieën om uw team voor te bereiden op samenwerking met AI agents. Van weerstand overwinnen tot het maximaliseren van productiviteit in een hybride mens-AI werkomgeving.",
    image: "/images/blog/ai-employee-training.png",
    slug: "training-medewerkers-samenwerking-ai-agents-tips",
    category: "Personeelsontwikkeling",
    readingTime: "6 min"
  },
  {
    id: "12",
    title: "AI Agents voor Procesautomatisering: Van Handmatig naar Autonoom",
    date: "2024-10-20",
    excerpt: "Een grondige analyse van hoe bedrijven hun bedrijfsprocessen transformeren van handmatige uitvoering naar autonome afhandeling met AI agents. Casestudy's uit verschillende sectoren.",
    image: "/images/blog/ai-process-automation.png",
    slug: "ai-agents-procesautomatisering-van-handmatig-naar-autonoom",
    category: "Procesoptimalisatie",
    readingTime: "9 min"
  },
  {
    id: "11",
    title: "Beveiliging en Privacy bij AI Agent Implementatie: Voldoen aan Wet- en Regelgeving",
    date: "2024-10-10",
    excerpt: "Essentiële beveiligingsmaatregelen en privacyoverwegingen bij het implementeren van AI agents in uw organisatie. AVG-compliance, databeveiliging en risicobeheer in één overzicht.",
    image: "/images/blog/ai-security-privacy.png",
    slug: "beveiliging-privacy-ai-agent-implementatie-wetgeving",
    category: "Compliance & Beveiliging",
    readingTime: "10 min"
  },
  {
    id: "10",
    title: "AI Agents voor Verkoop en Marketing: Boost Uw Conversie en Lead-Generatie",
    date: "2024-10-01",
    excerpt: "Praktische toepassingen van AI agents in verkoop- en marketingprocessen. Van geautomatiseerde lead-kwalificatie tot gepersonaliseerde klantcommunicatie en verkoopvoorspellingen.",
    image: "/images/blog/ai-sales-marketing.png",
    slug: "ai-agents-verkoop-marketing-boost-conversie-leads",
    category: "Verkoop & Marketing",
    readingTime: "7 min"
  },
  {
    id: "9",
    title: "AI Agent Huren: Praktijkgids voor Bedrijven in Nederland",
    date: "2024-09-25",
    excerpt: "Alles wat u moet weten over het huren van AI agents voor uw organisatie. Van kosten en implementatie tot praktische toepassingen en ROI voor Nederlandse bedrijven.",
    image: "/images/blog/ai-agent-huren.jpg",
    slug: "ai-agent-huren-praktijkgids-bedrijven-nederland",
    category: "AI Implementatie",
    readingTime: "7 min"
  },
  {
    id: "8",
    title: "AI voor Recruitment: Revolutionaire Technologie voor Moderne Recruiters",
    date: "2024-09-15",
    excerpt: "Ontdek hoe AI het recruitmentproces transformeert, van kandidaatselectie tot onboarding. Een essentiële gids voor recruiters en uitzendbureau's die voorop willen blijven lopen in de talentwerving.",
    image: "/images/blog/ai-recruitment.jpg",
    slug: "ai-voor-recruitment-technologie-moderne-recruiters",
    category: "Recruitment & AI",
    readingTime: "9 min"
  },
  {
    id: "7",
    title: "AI voor HR, Finance en Productie: De belangrijkste bedrijfstakken transformeren",
    date: "2024-08-20",
    excerpt: "Ontdek hoe verschillende bedrijfstakken zoals HR, Finance en Productie revolutionaire veranderingen ondergaan door de integratie van AI-technologie. Een uitgebreide gids voor besluitvormers.",
    image: "/images/blog/ai-business-departments.jpg",
    slug: "ai-voor-hr-finance-productie-bedrijfstakken-transformeren",
    category: "Bedrijfstakken & AI",
    readingTime: "10 min"
  },
  {
    id: "0",
    title: "AI Agents vs Digitale Medewerkers: De Evolutie van Intelligente Assistenten",
    date: "2024-08-15",
    excerpt: "Een diepgaande vergelijking tussen traditionele AI Agents en volwaardige Digitale Medewerkers. Ontdek hoe deze technologieën fundamenteel verschillen en welke het beste past bij jouw organisatie.",
    image: "/images/blog/ai-digital-employee.jpg",
    slug: "ai-agents-vs-digitale-medewerkers-evolutie",
    category: "AI Technologie",
    readingTime: "8 min"
  },
  {
    id: "1",
    title: "Kunstmatige Intelligentie: De Toekomst van Bedrijfsautomatisering",
    date: "2024-07-12",
    excerpt: "Hoe AI-gestuurde automatisering de efficiëntie van moderne bedrijven drastisch verbetert en wat dit betekent voor de toekomst van werk.",
    image: "/images/blog/ai-automation.jpg",
    slug: "kunstmatige-intelligentie-toekomst-bedrijfsautomatisering",
    category: "Automatisering",
    readingTime: "5 min"
  },
  {
    id: "2",
    title: "Data-analyse als Concurrentievoordeel: Praktische Toepassingen",
    date: "2024-07-28",
    excerpt: "Ontdek hoe bedrijven data-analyse gebruiken om strategische beslissingen te nemen en een voorsprong te krijgen op de concurrentie.",
    image: "/images/blog/data-analytics.jpg",
    slug: "data-analyse-concurrentievoordeel-praktische-toepassingen",
    category: "Data Analyse",
    readingTime: "7 min"
  },
  {
    id: "3",
    title: "Moderne Werkplekken: Mens en AI Samenwerking",
    date: "2024-07-15",
    excerpt: "De toekomst van werkplekken ligt in de synergie tussen menselijke creativiteit en AI-ondersteuning. Leer hoe deze samenwerking vorm krijgt.",
    image: "/images/blog/future-work.jpg",
    slug: "moderne-werkplekken-mens-ai-samenwerking",
    category: "Werkplek Innovatie",
    readingTime: "6 min"
  },
  {
    id: "4",
    title: "Ethische AI: Verantwoord Innoveren in het Digitale Tijdperk",
    date: "2024-07-20",
    excerpt: "Bij de snelle ontwikkeling van AI-technologie is het cruciaal om ethische richtlijnen te hanteren. Dit artikel bespreekt de belangrijkste overwegingen.",
    image: "/images/blog/ethical-ai.jpg",
    slug: "ethische-ai-verantwoord-innoveren-digitale-tijdperk",
    category: "AI Ethiek",
    readingTime: "8 min"
  },
  {
    id: "5",
    title: "Natuurlijke Taalverwerking: Revolutie in Klantenservice",
    date: "2024-07-10",
    excerpt: "Hoe NLP-technologie de klantenservice transformeert met intelligente chatbots en geautomatiseerde ondersteuningssystemen.",
    image: "/images/blog/nlp-customer-service.jpg",
    slug: "natuurlijke-taalverwerking-revolutie-klantenservice",
    category: "Klantenservice",
    readingTime: "5 min"
  },
  {
    id: "6",
    title: "De Opkomst van Agile AI-implementaties",
    date: "2024-07-05",
    excerpt: "Hoe bedrijven Agile-methodologieën toepassen bij AI-implementaties om sneller resultaten te boeken en flexibel te blijven.",
    image: "/images/blog/agile-ai.jpg",
    slug: "opkomst-agile-ai-implementaties",
    category: "Implementatie",
    readingTime: "6 min"
  }
]; 