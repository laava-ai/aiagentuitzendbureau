"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isBlogPostPage = pathname.startsWith("/blog/") && pathname !== "/blog";
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "ROI Calculator", href: "/roi-calculator" },
    { name: "Bedrijf", href: "/company" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isBlogPostPage
          ? "bg-white/80 backdrop-blur-lg shadow-md py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full blur-md opacity-70" />
          </motion.div>
          <span className={`text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent`}>
            Laava
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className={`${
                    (!scrolled && !isHomePage && !isBlogPostPage) 
                      ? "text-white hover:text-white/80" 
                      : "text-gray-700 hover:text-indigo-600"
                  } px-1 py-2 text-sm font-medium relative group`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                </Link>
              </li>
            ))}
          </ul>
          
          <Button 
            size="sm" 
            asChild 
            className={`${
              (!scrolled && !isHomePage && !isBlogPostPage) 
                ? "bg-white text-indigo-600 hover:bg-white/90" 
                : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
            } border-0`}
          >
            <Link href="/contact">Aan de slag</Link>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-md ${
              (!scrolled && !isHomePage && !isBlogPostPage) ? "text-white" : "text-gray-700"
            }`}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="container px-4 mx-auto py-4">
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-700 hover:text-indigo-600 block py-2 text-base font-medium"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0"
                  asChild
                >
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Aan de slag</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 