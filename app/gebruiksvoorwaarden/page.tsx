import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gebruiksvoorwaarden | Kennisbank Edam-Volendam",
  description:
    "Gebruiksvoorwaarden voor de Kennisbank van De Toegang Edam-Volendam en WSP.",
}

export default function GebruiksvoorwaardenPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 sm:p-10 space-y-6 max-h-[75vh] overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            Gebruiksvoorwaarden
          </h1>

          <p className="text-sm text-gray-500">
            Laatst bijgewerkt: augustus 2026
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              1. Over deze applicatie
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Deze applicatie (&quot;Kennisbank&quot;) is ontwikkeld voor{" "}
              <strong>De Toegang Edam-Volendam</strong> in samenwerking met{" "}
              <strong>WSP</strong>. De Kennisbank biedt medewerkers toegang tot
              informatie over netwerkpartners en een A.I.-assistent die meedenkt
              over casuïstiek. Voor de verwerking van persoonsgegevens gelden
              de{" "}
              <Link
                href="/privacyvoorwaarden"
                className="text-primary hover:text-primary/80 underline"
              >
                privacyvoorwaarden
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              2. Pilot-karakter
            </h2>
            <p className="text-gray-700 leading-relaxed">
              De Kennisbank wordt actief doorontwikkeld. Functionaliteiten kunnen
              wijzigen of tijdelijk niet beschikbaar zijn. De inhoud en
              antwoorden van de A.I.-assistent zijn ondersteunend en vervangen
              geen professioneel oordeel of juridisch advies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              3. A.I.-assistent en de EU AI Act
            </h2>
            <p className="text-gray-700 leading-relaxed">
              De A.I.-functionaliteit in deze applicatie wordt ingezet conform
              de richtlijnen van de{" "}
              <strong>Europese verordening inzake artificiële intelligentie (EU
              AI Act)</strong>. De A.I. is bedoeld als ondersteunend hulpmiddel.
              <strong> Let op: Antwoorden gegenereerd door kunstmatige intelligentie kunnen onjuist, onvolledig of verouderd zijn.</strong> Je blijft als professional zelf verantwoordelijk voor de adviezen en beslissingen die je neemt. Controleer en verifieer antwoorden daarom altijd zelfstandig via de originele bronnen.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              4. Geen persoonsgegevens in de A.I.-assistent
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Het is <strong>niet toegestaan</strong> om persoonsgegevens van
              inwoners of cliënten te delen met de A.I.-assistent. Dit omvat
              onder andere namen, adressen, BSN-nummers, telefoonnummers en
              overige herleidbare informatie. Gebruik de A.I.-assistent
              uitsluitend met geanonimiseerde of fictieve gegevens. De A.I.
              wordt technisch aangedreven door Voiceflow; gesprekken kunnen daar
              worden gelogd.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              5. Account en authenticatie
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Voor toegang tot de Kennisbank is een persoonlijk account vereist.
              Authenticatie wordt verzorgd door Clerk. Door een account aan te
              maken geef je toestemming voor de verwerking van je naam en
              e-mailadres ten behoeve van toegangsbeheer. Deel je
              inloggegevens niet met derden.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              6. Dienstverleners
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Voor hosting, inloggen en A.I.-functionaliteit maken wij gebruik
              van externe dienstverleners (onder andere Clerk, Vercel en
              Voiceflow). Zij verwerken gegevens uitsluitend in opdracht van De
              Toegang Edam-Volendam. Meer informatie staat in de
              privacyvoorwaarden.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              7. Aansprakelijkheid
            </h2>
            <p className="text-gray-700 leading-relaxed">
              De Toegang Edam-Volendam en WSP zijn niet aansprakelijk voor
              beslissingen die worden genomen op basis van informatie uit de
              Kennisbank of antwoorden van de A.I.-assistent. Gebruik van de
              applicatie is op eigen verantwoordelijkheid.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              8. Contact
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Voor vragen over deze voorwaarden of de applicatie kun je contact
              opnemen met je leidinggevende of het projectteam van de Kennisbank.
            </p>
          </section>

          <hr className="border-gray-200" />

          <p className="text-sm text-gray-500">
            Door een account aan te maken ga je akkoord met bovenstaande
            gebruiksvoorwaarden.
          </p>

          <div className="pt-2 flex justify-between items-center">
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              &larr; Terug naar de Kennisbank
            </Link>
            <Link
              href="/privacyvoorwaarden"
              className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Privacyvoorwaarden
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
