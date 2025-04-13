import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Twitter, Github, Facebook, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const pageLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Bedrijf", href: "/company" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];
  
  const companyLinks = [
    { name: "Over ons", href: "/about" },
    { name: "Succesverhalen", href: "/company/success-stories" },
    { name: "Referenties", href: "/company/testimonials" },
    { name: "Team", href: "/company/team" },
    { name: "Vacatures", href: "/company/careers" },
  ];
  
  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Algemene voorwaarden", href: "/terms-of-service" },
    { name: "Cookie beleid", href: "/cookie-policy" },
  ];
  
  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/laava-ai" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/laava_ai" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/laava.ai" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/laava.ai" },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and social links */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Laava
              </span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Wij helpen bedrijven met het implementeren van AI-oplossingen om hun efficiëntie te verhogen en concurrentievoordeel te behalen.
            </p>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Pages */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Pagina&apos;s</h3>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Bedrijf</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Nieuwsbrief</h3>
            <p className="text-gray-600 mb-4">
              Ontvang de laatste AI nieuws en tips
            </p>
            <form className="flex flex-col gap-2">
              <div className="flex">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="email"
                    placeholder="E-mailadres"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0">
                Aanmelden
              </Button>
            </form>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm order-2 md:order-1 mt-4 md:mt-0">
            © {currentYear} Laava. Alle rechten voorbehouden.
          </p>
          <div className="flex space-x-6 order-1 md:order-2">
            {legalLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-gray-600 hover:text-indigo-600 text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 