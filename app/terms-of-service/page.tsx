import { Metadata } from "next";
import { Shell } from "@/components/shells/shell";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface TermsPageProps {
  params: Promise<{}>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Algemene Voorwaarden | Laava",
    description: "Onze algemene voorwaarden voor het gebruik van onze diensten.",
  };
}

export default async function TermsOfService({ params }: TermsPageProps) {
  // Define breadcrumb items
  const breadcrumbItems = [
    { title: "Home", link: "/" },
    { title: "Algemene Voorwaarden" }
  ];

  return (
    <Shell>
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Algemene Voorwaarden</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
          </p>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptatie van Voorwaarden</h2>
            <p className="mb-4">
              Door toegang te krijgen tot en gebruik te maken van de diensten van Laava (&ldquo;wij&rdquo;, &ldquo;ons&rdquo;, &ldquo;onze&rdquo;), gaat u akkoord met de naleving van deze Algemene Voorwaarden, alle toepasselijke wetten en voorschriften, en gaat u ermee akkoord dat u verantwoordelijk bent voor de naleving van alle toepasselijke lokale wetten.
            </p>
            <p className="mb-4">
              Als u niet akkoord gaat met deze voorwaarden, is het u verboden om deze site te gebruiken of te openen. De materialen op deze site zijn beschermd door toepasselijke auteurs- en merkrechten.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Gebruik Licentie</h2>
            <p className="mb-4">
              Er wordt toestemming verleend om tijdelijk één kopie van de materialen (informatie of software) op de website van Laava te downloaden voor persoonlijk, niet-commercieel tijdelijk gebruik. Dit is de verlening van een licentie, geen overdracht van eigendom, en onder deze licentie mag u niet:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>De materialen wijzigen of kopiëren;</li>
              <li>De materialen gebruiken voor commerciële doeleinden of voor openbare weergave (commercieel of niet-commercieel);</li>
              <li>Proberen om software die op de website van Laava staat te decompileren of reverse-engineeren;</li>
              <li>Auteursrecht of andere eigendomsvermeldingen uit de materialen verwijderen; of</li>
              <li>De materialen overdragen aan een andere persoon of de materialen &apos;spiegelen&apos; op een andere server.</li>
            </ul>
            <p className="mb-4">
              Deze licentie wordt automatisch beëindigd als u een van deze beperkingen overtreedt en kan op elk moment door Laava worden beëindigd. Bij beëindiging van het bekijken van deze materialen of bij beëindiging van deze licentie, moet u alle gedownloade materialen in uw bezit vernietigen, hetzij in elektronische of gedrukte vorm.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Disclaimer</h2>
            <p className="mb-4">
              De materialen op de website van Laava worden geleverd op een &apos;as is&apos; basis. Laava geeft geen garanties, expliciet of impliciet, en wijst hierbij alle garanties af, inclusief, maar niet beperkt tot, impliciete garanties of voorwaarden van verkoopbaarheid, geschiktheid voor een bepaald doel, of niet-inbreuk op intellectuele eigendom of andere schending van rechten.
            </p>
            <p className="mb-4">
              Verder geeft Laava geen garanties of verklaringen met betrekking tot de nauwkeurigheid, waarschijnlijke resultaten of betrouwbaarheid van het gebruik van de materialen op haar website of anderszins met betrekking tot dergelijke materialen of op sites die aan deze site zijn gekoppeld.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Beperkingen</h2>
            <p className="mb-4">
              In geen geval zijn Laava of haar leveranciers aansprakelijk voor enige schade (inclusief, zonder beperking, schade voor verlies van gegevens of winst, of als gevolg van bedrijfsonderbreking) die voortvloeit uit het gebruik of het onvermogen om gebruik te maken van de materialen op de website van Laava, zelfs als Laava of een door Laava gemachtigde vertegenwoordiger mondeling of schriftelijk op de hoogte is gesteld van de mogelijkheid van dergelijke schade.
            </p>
            <p className="mb-4">
              Omdat sommige jurisdicties geen beperkingen toestaan op impliciete garanties, of beperkingen van aansprakelijkheid voor gevolgschade of incidentele schade, zijn deze beperkingen mogelijk niet op u van toepassing.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Nauwkeurigheid van materialen</h2>
            <p className="mb-4">
              De materialen die op de website van Laava verschijnen, kunnen technische, typografische of fotografische fouten bevatten. Laava garandeert niet dat de materialen op haar website nauwkeurig, volledig of actueel zijn. Laava kan op elk moment en zonder voorafgaande kennisgeving wijzigingen aanbrengen in de materialen op haar website. Laava verbindt zich er echter niet toe om de materialen bij te werken.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Links</h2>
            <p className="mb-4">
              Laava heeft niet alle sites die aan haar website zijn gekoppeld beoordeeld en is niet verantwoordelijk voor de inhoud van dergelijke gekoppelde sites. De opname van een link impliceert geen goedkeuring door Laava van de site. Gebruik van dergelijke gekoppelde websites is op eigen risico van de gebruiker.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Wijzigingen</h2>
            <p className="mb-4">
              Laava kan deze gebruiksvoorwaarden voor haar website op elk moment en zonder voorafgaande kennisgeving herzien. Door deze website te gebruiken, stemt u ermee in gebonden te zijn aan de dan geldende versie van deze Algemene Voorwaarden.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Toepasselijk recht</h2>
            <p className="mb-4">
              Deze voorwaarden worden beheerst door en geïnterpreteerd in overeenstemming met de wetten van Nederland, en u onderwerpt zich onherroepelijk aan de exclusieve jurisdictie van de rechtbanken in die staat of locatie.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Intellectueel eigendom</h2>
            <p className="mb-4">
              Alle intellectuele eigendomsrechten met betrekking tot de website, inclusief maar niet beperkt tot auteursrechten, handelsmerken, handelsnamen, domeinnamen, merkrechten, ontwerpen, databases en alle vertrouwelijke informatie (inclusief know-how en bedrijfsgeheimen) zijn uitsluitend eigendom van Laava en/of haar licentiegevers.
            </p>
            <p className="mb-4">
              Het is u niet toegestaan om zonder voorafgaande schriftelijke toestemming van Laava enig materiaal van de website of enige software te kopiëren, aan te passen, te wijzigen, te reproduceren, te republiseren, te downloaden, te posten, uit te zenden, over te dragen, te verkopen, te distribueren of te exploiteren op enigerlei wijze voor enig doel, behalve zoals uitdrukkelijk toegestaan ​​in deze Algemene Voorwaarden.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact</h2>
            <p className="mb-4">
              Als u vragen heeft over deze Algemene Voorwaarden, neem dan contact met ons op via:
            </p>
            <p className="mb-4">
              E-mail: info@laava.ai<br />
              Adres: Laava Hoofdkantoor, Amsterdam, Nederland
            </p>
          </section>
        </div>
      </div>
    </Shell>
  );
} 