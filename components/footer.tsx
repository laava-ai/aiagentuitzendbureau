import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Solutions", href: "#solutions" },
        { name: "Pricing", href: "#pricing" },
        { name: "Documentation", href: "#docs" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Team", href: "#team" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#blog" },
        { name: "Use Cases", href: "#cases" },
        { name: "Events", href: "#events" },
        { name: "Partners", href: "#partners" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "#privacy" },
        { name: "Terms", href: "#terms" },
        { name: "Security", href: "#security" },
        { name: "Cookies", href: "#cookies" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 py-12">
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative p-1.5 bg-indigo-50 rounded-full">
                <div className="h-6 w-6 flex items-center justify-center font-bold text-indigo-600">L</div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Laava
              </span>
            </Link>
            <p className="text-gray-600 text-sm mb-6">
              Revolutionizing businesses with intelligent AI solutions that transform how you work.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="col-span-1 md:col-span-1 lg:col-span-2">
              <h3 className="font-semibold text-sm text-gray-900 mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-indigo-600 text-sm flex items-center group"
                    >
                      {link.name}
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <h3 className="font-semibold text-sm text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter for the latest updates, insights, and AI news.
            </p>
            <form className="flex gap-2 mb-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
              <button
                type="submit"
                className="px-3 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {currentYear} Laava. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 