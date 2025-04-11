import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Pagina's",
      links: [
        { name: "Home", href: "#hero" },
        { name: "Functies", href: "#features" },
        { name: "Succesverhalen", href: "#cases" },
        { name: "Contact", href: "#cta" },
      ],
    },
    {
      title: "Bedrijf",
      links: [
        { name: "Over ons", href: "#hero" },
        { name: "Contact", href: "#cta" },
      ],
    },
    {
      title: "Juridisch",
      links: [
        { name: "Privacybeleid", href: "#" },
        { name: "Gebruiksvoorwaarden", href: "#" },
        { name: "Cookies", href: "#" },
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
              Revolutioneren van bedrijven met intelligente AI-oplossingen die transformeren hoe je werkt.
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
              Blijf op de hoogte
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Abonneer je op onze nieuwsbrief voor de laatste updates, inzichten en AI-nieuws.
            </p>
            <form className="flex gap-2 mb-2">
              <input
                type="email"
                placeholder="Voer je e-mail in"
                className="flex-1 px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
              <button
                type="submit"
                className="px-3 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transition-colors"
              >
                Abonneren
              </button>
            </form>
            <p className="text-xs text-gray-500">
              Door je te abonneren, ga je akkoord met ons Privacybeleid.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {currentYear} Laava. Alle rechten voorbehouden.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                Privacybeleid
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                Gebruiksvoorwaarden
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