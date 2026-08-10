import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacyvoorwaarden | Kennisbank Edam-Volendam",
  description:
    "Privacyvoorwaarden voor de Kennisbank van De Toegang Edam-Volendam en WSP.",
}

export default function PrivacyvoorwaardenPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 sm:p-10 space-y-6 max-h-[75vh] overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            Privacyvoorwaarden
          </h1>

          <p className="text-sm text-gray-500">
            Laatst bijgewerkt: augustus 2026
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              1. Inleiding
            </h2>
            <p className="text-gray-700 leading-relaxed">
              De Toegang Edam-Volendam en WSP hechten grote waarde aan de bescherming van jouw privacy. In deze privacyvoorwaarden leggen we uit welke persoonsgegevens we verzamelen, waarom we dat doen, en hoe we ermee omgaan binnen de Kennisbank.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              2. Welke gegevens we verzamelen
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Voor het gebruik van de Kennisbank verwerken wij de volgende persoonsgegevens:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Voor- en achternaam</li>
              <li>Zakelijk e-mailadres</li>
              <li>Inloggegevens (beheerd via onze authenticatiepartner Clerk)</li>
              <li>
                Berichten die je invoert in de A.I.-assistent (verwerkt via
                Voiceflow)
              </li>
              <li>
                Gebruiksgegevens (zoals welke documenten je raadpleegt en
                bezoekstatistieken, voor kwaliteitsverbetering)
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              3. Doel van de verwerking
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wij gebruiken jouw gegevens uitsluitend voor de volgende doelen:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Het aanmaken en beveiligen van je persoonlijke account.</li>
              <li>Het verlenen van toegang tot de afgeschermde omgeving van de Kennisbank.</li>
              <li>Het laten functioneren van de A.I.-assistent.</li>
              <li>Het monitoren en verbeteren van de applicatie.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              4. Verwerkers en doorgifte
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wij verkopen jouw persoonsgegevens niet. Voor de werking van de
              Kennisbank schakelen wij wel verwerkers in. Met deze partijen zijn
              verwerkersovereenkomsten (DPA&apos;s) en, waar nodig,
              standaardcontractbepalingen voor doorgifte (zoals SCC&apos;s)
              afgesloten of van toepassing:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>
                <strong>Clerk</strong> — authenticatie en accountbeheer
                (inloggegevens).
              </li>
              <li>
                <strong>Vercel</strong> — hosting van de applicatie en
                bezoekstatistieken (Analytics).
              </li>
              <li>
                <strong>Voiceflow</strong> — verwerking van berichten in de
                A.I.-assistent.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Sommige verwerkers kunnen gegevens (tijdelijk) verwerken buiten de
              Europese Economische Ruimte. Wij beperken dit waar mogelijk en
              leggen passende waarborgen vast in de verwerkersovereenkomsten.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              5. Geen persoonsgegevens in de A.I.-assistent
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Het is <strong>strikt verboden</strong> om persoonsgegevens van
              cliënten (zoals namen, adressen of BSN-nummers) in te voeren in de
              A.I.-assistent. De A.I. mag uitsluitend worden gebruikt met
              geanonimiseerde of fictieve casuïstiek.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              6. Bewaartermijn
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Accountgegevens bij Clerk blijven bewaard zolang je account actief
              is. Chatgesprekken bij Voiceflow vallen onder het bewaarbeleid van
              Voiceflow. Log- en gebruiksgegevens bij Vercel worden beperkt
              bewaard conform de afspraken met Vercel.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              7. Cookies en vergelijkbare technieken
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Een <strong>cookie</strong> is een klein bestandje dat je browser
              opslaat wanneer je een website bezoekt. Daarmee kan de site je
              herkennen bij een volgend bezoek, bijvoorbeeld om je ingelogd te
              houden. De Kennisbank gebruikt cookies en vergelijkbare opslag
              beperkt en alleen waar dat nodig is voor de werking van de applicatie.
            </p>

            <h3 className="text-base font-semibold text-gray-900 pt-2">
              7.1 Strikt noodzakelijke cookies (inloggen)
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Voor het inloggen gebruiken wij <strong>Clerk</strong>. Clerk plaatst
              sessiecookies zodat je niet bij elke pagina opnieuw hoeft in te
              loggen. Deze cookies zijn noodzakelijk om de afgeschermde
              Kennisbank te kunnen gebruiken. Zonder deze cookies werkt de
              applicatie niet.
            </p>

            <h3 className="text-base font-semibold text-gray-900 pt-2">
              7.2 Analytische cookies (bezoekstatistieken)
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Wij gebruiken <strong>Vercel Analytics</strong> om inzicht te
              krijgen in het gebruik van de website (bijvoorbeeld hoe vaak de
              site wordt bezocht). Deze dienst is privacyvriendelijk ingericht en
              gebruikt geen klassieke trackingcookies voor advertenties. De
              gegevens worden gebruikt om de applicatie te verbeteren, niet om je
              te volgen op andere websites.
            </p>

            <h3 className="text-base font-semibold text-gray-900 pt-2">
              7.3 Wat wij niet in cookies opslaan
            </h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>
                Inhoud van A.I.-gesprekken in je browser.
              </li>
              <li>Wachtwoorden of inlogcodes in leesbare vorm.</li>
            </ul>

            <p className="text-gray-700 leading-relaxed pt-2">
              Op dit moment tonen wij geen aparte cookiebanner. De cookies die
              wél worden geplaatst, zijn nodig voor inloggen of voor
              geanonimiseerde statistieken zoals hierboven beschreven. Heb je
              vragen over cookies of wil je je voorkeuren aanpassen, neem dan
              contact op met het projectteam.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              8. Jouw rechten
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Neem hiervoor contact op met het projectteam. Als je je account laat verwijderen, heb je geen toegang meer tot de Kennisbank.
            </p>
          </section>

          <hr className="border-gray-200" />

          <div className="pt-2 flex justify-between items-center">
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              &larr; Terug naar de Kennisbank
            </Link>
            <Link
              href="/gebruiksvoorwaarden"
              className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Lees de gebruiksvoorwaarden
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
