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
    id: "8",
    title: "AI voor Recruitment: Revolutionaire Technologie voor Moderne Recruiters",
    date: "2023-08-15",
    excerpt: "Ontdek hoe AI het recruitmentproces transformeert, van kandidaatselectie tot onboarding. Een essentiële gids voor recruiters en uitzendbureau's die voorop willen blijven lopen in de talentwerving.",
    image: "/images/blog/ai-recruitment.jpg",
    slug: "ai-voor-recruitment-technologie-moderne-recruiters",
    category: "Recruitment & AI",
    readingTime: "9 min"
  },
  {
    id: "7",
    title: "AI voor HR, Finance en Productie: De belangrijkste bedrijfstakken transformeren",
    date: "2023-07-20",
    excerpt: "Ontdek hoe verschillende bedrijfstakken zoals HR, Finance en Productie revolutionaire veranderingen ondergaan door de integratie van AI-technologie. Een uitgebreide gids voor besluitvormers.",
    image: "/images/blog/ai-business-departments.jpg",
    slug: "ai-voor-hr-finance-productie-bedrijfstakken-transformeren",
    category: "Bedrijfstakken & AI",
    readingTime: "10 min"
  },
  {
    id: "0",
    title: "AI Agents vs Digitale Medewerkers: De Evolutie van Intelligente Assistenten",
    date: "2023-06-15",
    excerpt: "Een diepgaande vergelijking tussen traditionele AI Agents en volwaardige Digitale Medewerkers. Ontdek hoe deze technologieën fundamenteel verschillen en welke het beste past bij jouw organisatie.",
    image: "/images/blog/ai-digital-employee.jpg",
    slug: "ai-agents-vs-digitale-medewerkers-evolutie",
    category: "AI Technologie",
    readingTime: "8 min"
  },
  {
    id: "1",
    title: "Kunstmatige Intelligentie: De Toekomst van Bedrijfsautomatisering",
    date: "2023-04-12",
    excerpt: "Hoe AI-gestuurde automatisering de efficiëntie van moderne bedrijven drastisch verbetert en wat dit betekent voor de toekomst van werk.",
    image: "/images/blog/ai-automation.jpg",
    slug: "kunstmatige-intelligentie-toekomst-bedrijfsautomatisering",
    category: "Automatisering",
    readingTime: "5 min"
  },
  {
    id: "2",
    title: "Data-analyse als Concurrentievoordeel: Praktische Toepassingen",
    date: "2023-03-28",
    excerpt: "Ontdek hoe bedrijven data-analyse gebruiken om strategische beslissingen te nemen en een voorsprong te krijgen op de concurrentie.",
    image: "/images/blog/data-analytics.jpg",
    slug: "data-analyse-concurrentievoordeel-praktische-toepassingen",
    category: "Data Analyse",
    readingTime: "7 min"
  },
  {
    id: "3",
    title: "Moderne Werkplekken: Mens en AI Samenwerking",
    date: "2023-02-15",
    excerpt: "De toekomst van werkplekken ligt in de synergie tussen menselijke creativiteit en AI-ondersteuning. Leer hoe deze samenwerking vorm krijgt.",
    image: "/images/blog/future-work.jpg",
    slug: "moderne-werkplekken-mens-ai-samenwerking",
    category: "Werkplek Innovatie",
    readingTime: "6 min"
  },
  {
    id: "4",
    title: "Ethische AI: Verantwoord Innoveren in het Digitale Tijdperk",
    date: "2023-01-20",
    excerpt: "Bij de snelle ontwikkeling van AI-technologie is het cruciaal om ethische richtlijnen te hanteren. Dit artikel bespreekt de belangrijkste overwegingen.",
    image: "/images/blog/ethical-ai.jpg",
    slug: "ethische-ai-verantwoord-innoveren-digitale-tijdperk",
    category: "AI Ethiek",
    readingTime: "8 min"
  },
  {
    id: "5",
    title: "Natuurlijke Taalverwerking: Revolutie in Klantenservice",
    date: "2022-12-10",
    excerpt: "Hoe NLP-technologie de klantenservice transformeert met intelligente chatbots en geautomatiseerde ondersteuningssystemen.",
    image: "/images/blog/nlp-customer-service.jpg",
    slug: "natuurlijke-taalverwerking-revolutie-klantenservice",
    category: "Klantenservice",
    readingTime: "5 min"
  },
  {
    id: "6",
    title: "De Opkomst van Agile AI-implementaties",
    date: "2022-11-05",
    excerpt: "Hoe bedrijven Agile-methodologieën toepassen bij AI-implementaties om sneller resultaten te boeken en flexibel te blijven.",
    image: "/images/blog/agile-ai.jpg",
    slug: "opkomst-agile-ai-implementaties",
    category: "Implementatie",
    readingTime: "6 min"
  }
]; 