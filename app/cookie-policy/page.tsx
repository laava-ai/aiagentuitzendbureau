import { Metadata } from "next";
import { Shell } from "@/components/shells/shell";

interface CookiePolicyPageProps {
  params: Promise<{}>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cookiebeleid | Laava",
    description: "Ons cookiebeleid beschrijft hoe wij cookies gebruiken op onze website.",
  };
}

export default async function CookiePolicy({ params }: CookiePolicyPageProps) {
  return (
    <Shell darkHeader>
      <div className="container mx-auto px-4 py-12 mt-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookiebeleid</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
          </p>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Inleiding</h2>
            <p className="mb-4">
              Deze website, beheerd door Laava (&ldquo;wij&rdquo;, &ldquo;ons&rdquo;, of &ldquo;onze&rdquo;), maakt gebruik van cookies en vergelijkbare technologieën om uw ervaring te verbeteren, uw gebruik van de website te analyseren en marketingdoeleinden te ondersteunen. Dit cookiebeleid legt uit wat cookies zijn, hoe wij ze gebruiken, welke soorten cookies wij gebruiken, en hoe u uw cookievoorkeuren kunt beheren.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Wat zijn cookies?</h2>
            <p className="mb-4">
              Cookies zijn kleine tekstbestanden die op uw apparaat (computer, tablet of mobiel) worden geplaatst wanneer u onze website bezoekt. Ze worden veel gebruikt om websites efficiënter te laten werken en om informatie aan de eigenaren van de website te verstrekken. Cookies kunnen noodzakelijk zijn voor de werking van de website, helpen bij het onthouden van uw voorkeuren, en geven ons inzicht in hoe bezoekers onze website gebruiken zodat we deze kunnen verbeteren.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Hoe gebruiken wij cookies?</h2>
            <p className="mb-4">
              Onze website gebruikt cookies voor verschillende doeleinden, waaronder:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Het verzekeren dat de website correct functioneert;</li>
              <li>Het opslaan van uw voorkeuren, zoals taal- of locatie-instellingen;</li>
              <li>Het verzamelen van anonieme statistische informatie over hoe bezoekers onze website gebruiken;</li>
              <li>Het helpen bij onze marketinginspanningen om relevante content te leveren;</li>
              <li>Het bieden van gepersonaliseerde inhoud op basis van uw interacties met onze website.</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Soorten cookies die wij gebruiken</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.1 Noodzakelijke cookies</h3>
            <p className="mb-4">
              Deze cookies zijn essentieel voor het functioneren van onze website. Ze stellen u in staat om door de website te navigeren en gebruik te maken van de functies. Zonder deze cookies zouden bepaalde diensten niet beschikbaar zijn.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.2 Voorkeurscookies</h3>
            <p className="mb-4">
              Deze cookies onthouden uw voorkeuren en instellingen om uw ervaring te verbeteren. Ze kunnen bijvoorbeeld uw taalvoorkeur of regio onthouden, zodat deze informatie niet opnieuw hoeft te worden ingevoerd bij elk bezoek.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.3 Analytische cookies</h3>
            <p className="mb-4">
              Wij gebruiken analytische cookies, zoals die van Google Analytics, om te begrijpen hoe bezoekers met onze website omgaan. Deze cookies helpen ons bij het verzamelen van informatie over het aantal bezoekers, welke pagina&apos;s het meest worden bezocht, en hoe bezoekers door de site navigeren. Dit stelt ons in staat om onze website en diensten voortdurend te verbeteren.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.4 Marketing cookies</h3>
            <p className="mb-4">
              Deze cookies worden gebruikt om bezoekers op websites te volgen. De bedoeling is om advertenties te tonen die relevant en aantrekkelijk zijn voor de individuele gebruiker en daardoor waardevoller voor uitgevers en externe adverteerders.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookies van derden</h2>
            <p className="mb-4">
              Naast onze eigen cookies, kunnen er ook cookies van derden op onze website worden geplaatst. Dit zijn cookies van diensten zoals Google Analytics, sociale media platforms, of advertentienetwerken. Deze diensten kunnen cookies gebruiken om informatie te verzamelen over uw activiteiten op onze en andere websites om u gerichte advertenties te tonen of om het succes van marketingcampagnes te meten.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Uw cookievoorkeuren beheren</h2>
            <p className="mb-4">
              U kunt uw cookievoorkeuren op verschillende manieren beheren:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Via onze cookiebanner: Wanneer u onze website voor het eerst bezoekt, ziet u een cookiebanner waar u uw voorkeuren kunt instellen.</li>
              <li>Via uw browser: De meeste webbrowsers bieden mogelijkheden om cookies te beheren. U kunt uw browser zo instellen dat deze cookies weigert of u waarschuwt wanneer cookies worden verzonden.</li>
              <li>Via specifieke opt-out tools: Voor bepaalde diensten van derden, zoals Google Analytics, bestaan er specifieke opt-out mechanismen.</li>
            </ul>
            <p className="mb-4">
              Let op: het uitschakelen van cookies kan de functionaliteit van onze website beïnvloeden en kan uw gebruikerservaring beperken.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Wijzigingen in ons cookiebeleid</h2>
            <p className="mb-4">
              Wij kunnen dit cookiebeleid van tijd tot tijd bijwerken om veranderingen in onze praktijken of om andere operationele, juridische of regelgevende redenen weer te geven. We raden u aan dit beleid regelmatig te controleren op eventuele wijzigingen. De datum van de laatste update staat bovenaan deze pagina.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact</h2>
            <p className="mb-4">
              Als u vragen heeft over ons gebruik van cookies of over ons cookiebeleid, neem dan contact met ons op via:
            </p>
            <p className="mb-4">
              E-mail: info@laava.nl<br />
              Adres: Laava Hoofdkantoor, Utrecht, Nederland
            </p>
          </section>
        </div>
      </div>
    </Shell>
  );
} 