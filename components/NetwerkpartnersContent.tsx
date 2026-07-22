"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { levensgebieden, netwerkpartners } from "@/lib/netwerkpartners-data"

interface NetwerkpartnersContentProps {
  onLevensgebiedSelect: (levensgebied: string) => void
}

export default function NetwerkpartnersContent({
  onLevensgebiedSelect,
}: NetwerkpartnersContentProps) {
  const getAantalPerLevensgebied = (levensgebied: string) => {
    return netwerkpartners.filter((p) => p.levensgebieden.includes(levensgebied))
      .length
  }

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Netwerkpartners</h2>
          <p className="text-xl mb-8 text-purple-100">
            Vind ondersteuning bij dagelijkse vragen en problemen in gemeente
            Edam-Volendam
          </p>
        </div>
      </section>

      {/* Levensgebieden */}
      <section className="py-16 bg-purple-100">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Zoek per levensgebied
          </h3>
          <p className="text-center text-gray-600 mb-12">
            Bekijk alle netwerkpartners per levensgebied
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {levensgebieden.map((gebied) => {
              const IconComponent = gebied.icon
              const aantal = getAantalPerLevensgebied(gebied.name)
              return (
                <Card
                  key={gebied.name}
                  onClick={() => onLevensgebiedSelect(gebied.name)}
                  className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-200"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full ${gebied.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h4 className="font-semibold text-base md:text-lg text-gray-900">
                      {gebied.name}
                    </h4>
                    <Badge
                      variant="outline"
                      className="mt-2 text-purple-600 border-purple-200"
                    >
                      {aantal} {aantal === 1 ? "partner" : "partners"}
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
