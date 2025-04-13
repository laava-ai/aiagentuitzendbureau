"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
  category: string;
  readingTime: string;
}

// Blog posts data for SEO - would typically come from a CMS
export const blogPosts: BlogPost[] = [
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

export function BlogList() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">Nieuwste Artikelen</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Ontdek de nieuwste trends, inzichten en best practices in de wereld van AI-gestuurde oplossingen en digitale transformatie.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              className="group relative flex flex-col space-y-2"
              variants={item}
            >
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-muted">
                <div className="absolute inset-0 z-10 bg-black/10 transition-colors group-hover:bg-black/20" />
                <motion.div
                  className="h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AspectRatio>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="px-1">·</span>
                  <span>{post.readingTime} min read</span>
                </div>
                <h3 className="font-heading text-xl font-bold leading-tight lg:text-2xl">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </div>
              <div className="mt-auto pt-4">
                <Link href={`/blog/${post.slug}`} passHref>
                  <Button variant="outline" size="sm">Read more</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-12">
          <Link href="/blog" passHref>
            <Button variant="outline" className="group border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
              Bekijk Alle Artikelen
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.5,
                  repeatDelay: 1
                }}
              >
                →
              </motion.span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 