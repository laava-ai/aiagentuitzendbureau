"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { blogPosts, type BlogPost } from "@/lib/blog-data";

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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">AI Agents & Digitale Collega's Blog</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Ontdek hoe AI-agents en computer collega's de werkplek transformeren. Lees over de nieuwste ontwikkelingen, praktijkvoorbeelden en implementatiestrategieën voor intelligente AI-assistenten in uw organisatie.
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