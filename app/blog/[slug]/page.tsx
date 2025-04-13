import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Shell } from "@/components/shells/shell";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { blogPosts } from "@/components/sections/blog/blog-list";

// Define the BlogPost interface since we can't import it
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

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({
  params,
}: BlogPostPageProps): Metadata {
  const post = Array.isArray(blogPosts) 
    ? blogPosts.find((post) => post.slug === params.slug) 
    : null;

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Convert blogPosts to an array if it's not already
  const blogPostsArray = Array.isArray(blogPosts) ? blogPosts : [];
  const post = blogPostsArray.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Define breadcrumb items
  const breadcrumbItems = [
    { title: "Home", link: "/" },
    { title: "Blog", link: "/blog" },
    { title: post.title }
  ];

  return (
    <Shell>
      {/* Hero section with gradient background */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#080F26] to-[#0A0F2C]">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={breadcrumbItems} className="mb-6 text-gray-300" />
            
            <Badge 
              variant="outline" 
              className="mb-4 border-indigo-500 text-indigo-300"
            >
              {post.category}
            </Badge>
            
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-3 text-gray-300">
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full aspect-video mb-10 rounded-lg overflow-hidden shadow-2xl -mt-20 border-4 border-white">
            <Image 
              src={post.image} 
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700">
            <p className="text-xl font-medium text-gray-800 leading-relaxed mb-8">
              {post.excerpt}
            </p>
            
            {/* Blog content would go here - for this example we'll use placeholder content */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies
              lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget
              ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
            </p>
            
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mt-10 mb-6">Key Insights</h2>
            
            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
              Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur
              aliquet quam id dui posuere blandit. Curabitur non nulla sit amet nisl tempus convallis
              quis ac lectus.
            </p>
            
            <p>
              Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur
              sed, convallis at tellus. Proin eget tortor risus. Nulla porttitor accumsan tincidunt.
            </p>
            
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mt-10 mb-6">Conclusion</h2>
            
            <p>
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vivamus suscipit tortor
              eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed
              sit amet dui. Donec rutrum congue leo eget malesuada.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
} 