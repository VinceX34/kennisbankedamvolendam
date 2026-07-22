"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import PartnerCard from "./PartnerCard"
import { levensgebieden, netwerkpartners } from "@/lib/netwerkpartners-data"

interface LevensgebiedDetailProps {
  levensgebied: string
  onBack: () => void
}

export default function LevensgebiedDetail({
  levensgebied,
  onBack,
}: LevensgebiedDetailProps) {
  const geselecteerdLevensgebied = levensgebieden.find(
    (l) => l.name === levensgebied
  )
  const partnersVoorLevensgebied = netwerkpartners.filter((item) =>
    item.levensgebieden.includes(levensgebied)
  )

  if (!geselecteerdLevensgebied) {
    return (
      <div className="p-6">
        <p>Levensgebied niet gevonden.</p>
        <Button onClick={onBack}>Terug</Button>
      </div>
    )
  }

  const IconComponent = geselecteerdLevensgebied.icon

  return (
    <div className="min-h-full">
      <header className="bg-white shadow-sm border-b p-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Terug naar overzicht</span>
          </Button>
        </div>
      </header>

      <section className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-4">
            <div
              className={`w-16 h-16 rounded-full ${geselecteerdLevensgebied.color} flex items-center justify-center mr-6`}
            >
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                {geselecteerdLevensgebied.name}
              </h1>
              <p className="text-xl mt-2">
                Alle netwerkpartners voor {levensgebied.toLowerCase()} in
                Edam-Volendam
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {levensgebied}
            </h2>
            <p className="text-gray-600">
              {partnersVoorLevensgebied.length}{" "}
              {partnersVoorLevensgebied.length === 1 ? "partner" : "partners"}{" "}
              gevonden
            </p>
          </div>

          {partnersVoorLevensgebied.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnersVoorLevensgebied.map((item) => (
                <PartnerCard
                  key={item.id}
                  item={item}
                  badgeColorClass="text-purple-600 border-purple-200"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nog geen netwerkpartners beschikbaar
              </h3>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
