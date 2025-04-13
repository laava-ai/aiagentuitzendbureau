import { Metadata } from "next";
import { Shell } from "@/components/shells/shell";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface PrivacyPolicyPageProps {
  params: Promise<{}>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacybeleid | Laava",
    description: "Ons privacybeleid beschrijft hoe wij omgaan met uw persoonlijke gegevens.",
  };
}

export default async function PrivacyPolicy({ params }: PrivacyPolicyPageProps) {
  // Define breadcrumb items
  const breadcrumbItems = [
    { title: "Home", link: "/" },
    { title: "Privacybeleid" }
  ];

  return (
    <Shell>
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacybeleid</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
          </p>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Inleiding</h2>
            <p className="mb-4">
              Bij Laava ("wij", "ons", of "onze") hechten wij grote waarde aan de privacy van onze bezoekers en klanten. Dit privacybeleid beschrijft welke informatie wij verzamelen, hoe wij deze informatie gebruiken en beschermen, en welke rechten u heeft met betrekking tot uw persoonsgegevens. Dit beleid is van toepassing op onze website, gerelateerde diensten en alle interacties die u met ons heeft.
            </p>
            <p className="mb-4">
              Door onze website te bezoeken en/of gebruik te maken van onze diensten, gaat u akkoord met dit privacybeleid en de praktijken die hierin worden beschreven.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Welke informatie verzamelen wij?</h2>
            <p className="mb-4">
              Wij kunnen de volgende soorten informatie verzamelen:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.1 Persoonsgegevens</h3>
            <p className="mb-4">
              Dit zijn gegevens die u direct of indirect kunnen identificeren, zoals:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Contactgegevens (zoals naam, e-mailadres, telefoonnummer)</li>
              <li>Bedrijfsgegevens (zoals bedrijfsnaam, functie)</li>
              <li>Accountgegevens (zoals gebruikersnaam, wachtwoord)</li>
              <li>Betalingsinformatie (zoals factuuradres, bankrekeningdetails)</li>
              <li>Inhoud van communicatie met ons</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Gebruiksgegevens</h3>
            <p className="mb-4">
              Wij verzamelen automatisch bepaalde informatie over uw bezoek aan onze website, waaronder:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP-adres</li>
              <li>Browsertype en -versie</li>
              <li>Besturingssysteem</li>
              <li>Datum en tijd van bezoek</li>
              <li>Pagina's die u bezoekt</li>
              <li>Klikpatronen</li>
              <li>Verwijzende websites</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.3 Cookies en vergelijkbare technologieën</h3>
            <p className="mb-4">
              Wij gebruiken cookies en vergelijkbare technologieën om informatie te verzamelen over uw activiteiten op onze website. Meer informatie hierover vindt u in ons <a href="/cookie-policy" className="text-blue-600 hover:text-blue-800">Cookiebeleid</a>.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Hoe gebruiken wij uw informatie?</h2>
            <p className="mb-4">
              Wij gebruiken de verzamelde informatie voor de volgende doeleinden:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Het leveren en verbeteren van onze diensten</li>
              <li>Het verwerken van bestellingen en betalingen</li>
              <li>Het communiceren met u over onze diensten, updates en promoties</li>
              <li>Het personaliseren van uw ervaring op onze website</li>
              <li>Het analyseren en monitoren van websitegebruik om onze diensten te verbeteren</li>
              <li>Het oplossen van geschillen en problemen</li>
              <li>Het voorkomen van frauduleuze activiteiten en het verbeteren van de beveiliging</li>
              <li>Het voldoen aan wettelijke verplichtingen</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Rechtsgronden voor verwerking</h2>
            <p className="mb-4">
              Wij verwerken uw persoonsgegevens op basis van de volgende rechtsgronden:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Toestemming:</strong> In bepaalde gevallen vragen wij uw toestemming om uw gegevens te verwerken, bijvoorbeeld voor marketingdoeleinden.</li>
              <li><strong>Uitvoering van een overeenkomst:</strong> Wanneer het noodzakelijk is om een overeenkomst met u uit te voeren of om stappen te ondernemen op uw verzoek voordat een overeenkomst wordt aangegaan.</li>
              <li><strong>Wettelijke verplichting:</strong> Wanneer we verplicht zijn om uw gegevens te verwerken om te voldoen aan een wettelijke verplichting.</li>
              <li><strong>Gerechtvaardigd belang:</strong> Wanneer de verwerking noodzakelijk is voor onze gerechtvaardigde belangen of die van een derde partij, tenzij uw belangen of fundamentele rechten en vrijheden zwaarder wegen.</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Delen van informatie</h2>
            <p className="mb-4">
              Wij delen uw persoonsgegevens niet met derden, behalve in de volgende omstandigheden:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Met dienstverleners die namens ons diensten uitvoeren (zoals betalingsverwerkers, hosting providers)</li>
              <li>Met zakelijke partners wanneer u zich heeft aangemeld voor een gezamenlijke dienst of promotie</li>
              <li>Wanneer dit wettelijk vereist is of noodzakelijk is om te voldoen aan een gerechtelijk bevel of procedure</li>
              <li>Bij een fusie, verkoop van bedrijfsactiva, financiering of overname van ons bedrijf</li>
              <li>Met uw toestemming of op uw aanwijzing</li>
            </ul>
            <p className="mb-4">
              Wij eisen van derden aan wie wij uw gegevens verstrekken dat zij passende beveiligingsmaatregelen nemen en uw gegevens alleen gebruiken voor de doeleinden waarvoor ze zijn verstrekt.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Internationale overdracht van gegevens</h2>
            <p className="mb-4">
              Uw informatie kan worden overgedragen naar — en onderhouden op — computers die zich buiten uw provincie, land of andere overheidsinstantie bevinden waar de privacywetgeving kan verschillen van die in uw rechtsgebied. Wanneer wij uw persoonsgegevens overdragen naar landen buiten de Europese Economische Ruimte (EER), zorgen wij voor passende waarborgen in overeenstemming met de geldende wetgeving.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Beveiliging van uw informatie</h2>
            <p className="mb-4">
              Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen ongeautoriseerde toegang, verlies, vernietiging of wijziging. Deze maatregelen worden regelmatig geëvalueerd en indien nodig bijgewerkt.
            </p>
            <p className="mb-4">
              Hoewel wij ons best doen om uw informatie te beschermen, kan geen enkele methode van verzending via het internet of elektronische opslag 100% veilig zijn. Daarom kunnen wij geen absolute veiligheid garanderen.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Bewaren van gegevens</h2>
            <p className="mb-4">
              Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk is voor de doeleinden waarvoor ze zijn verzameld, tenzij een langere bewaartermijn wettelijk vereist of toegestaan is. De criteria die worden gebruikt om de bewaartermijn te bepalen, omvatten:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>De periode gedurende welke wij een lopende relatie met u hebben</li>
              <li>Of er een wettelijke verplichting is waaraan wij moeten voldoen</li>
              <li>Of bewaring wenselijk is in het licht van onze juridische positie (zoals met betrekking tot verjaringstermijnen, geschillen of regelgevende onderzoeken)</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Uw rechten</h2>
            <p className="mb-4">
              Afhankelijk van uw locatie en de toepasselijke wetgeving, kunt u de volgende rechten hebben met betrekking tot uw persoonsgegevens:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Recht op informatie:</strong> Het recht om te weten welke persoonsgegevens wij over u hebben en hoe wij deze verwerken.</li>
              <li><strong>Recht op inzage:</strong> Het recht om een kopie te krijgen van de persoonsgegevens die wij over u hebben.</li>
              <li><strong>Recht op rectificatie:</strong> Het recht om onjuiste of onvolledige persoonsgegevens te laten corrigeren.</li>
              <li><strong>Recht op verwijdering:</strong> Het recht om uw persoonsgegevens te laten verwijderen in bepaalde omstandigheden.</li>
              <li><strong>Recht op beperking van de verwerking:</strong> Het recht om de verwerking van uw persoonsgegevens tijdelijk of permanent te beperken.</li>
              <li><strong>Recht op gegevensoverdraagbaarheid:</strong> Het recht om uw persoonsgegevens in een gestructureerd, gangbaar en machineleesbaar formaat te ontvangen en deze aan een andere verwerkingsverantwoordelijke over te dragen.</li>
              <li><strong>Recht van bezwaar:</strong> Het recht om bezwaar te maken tegen de verwerking van uw persoonsgegevens in bepaalde omstandigheden.</li>
              <li><strong>Recht om niet onderworpen te worden aan geautomatiseerde besluitvorming:</strong> Het recht om niet onderworpen te worden aan een besluit dat uitsluitend is gebaseerd op geautomatiseerde verwerking, waaronder profilering, dat rechtsgevolgen voor u heeft of u anderszins aanzienlijk treft.</li>
            </ul>
            <p className="mb-4">
              Om gebruik te maken van deze rechten of als u vragen heeft over onze privacypraktijken, neem dan contact met ons op via de contactgegevens aan het einde van dit beleid.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Privacy van kinderen</h2>
            <p className="mb-4">
              Onze website en diensten zijn niet bedoeld voor personen jonger dan 16 jaar. Wij verzamelen niet bewust persoonsgegevens van personen jonger dan 16 jaar. Als u een ouder of voogd bent en u denkt dat uw kind ons persoonsgegevens heeft verstrekt, neem dan contact met ons op zodat wij de nodige maatregelen kunnen nemen.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Links naar andere websites</h2>
            <p className="mb-4">
              Onze website kan links bevatten naar andere websites die niet door ons worden beheerd. Als u op een link van een derde klikt, wordt u naar de site van die derde geleid. Wij hebben geen controle over en aanvaarden geen verantwoordelijkheid voor de inhoud, het privacybeleid of de praktijken van websites of diensten van derden. Wij raden u aan het privacybeleid van elke site die u bezoekt te lezen.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Wijzigingen in dit privacybeleid</h2>
            <p className="mb-4">
              Wij kunnen dit privacybeleid van tijd tot tijd bijwerken. De datum van de laatste herziening staat bovenaan deze pagina. Als er materiële wijzigingen zijn in dit privacybeleid, zullen wij u hiervan op de hoogte stellen door een kennisgeving op onze website te plaatsen of door u rechtstreeks een bericht te sturen. Wij raden u aan dit privacybeleid regelmatig te controleren op eventuele wijzigingen.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact</h2>
            <p className="mb-4">
              Als u vragen, opmerkingen of verzoeken heeft met betrekking tot dit privacybeleid of onze privacypraktijken, neem dan contact met ons op via:
            </p>
            <p className="mb-4">
              E-mail: privacy@laava.ai<br />
              Adres: Laava Hoofdkantoor, Amsterdam, Nederland<br />
              Telefoon: +31 20 123 4567
            </p>
            <p className="mb-4">
              Als u niet tevreden bent met hoe wij uw klacht hebben behandeld, heeft u het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens, de Nederlandse toezichthoudende autoriteit voor gegevensbescherming.
            </p>
          </section>
        </div>
      </div>
    </Shell>
  );
} 