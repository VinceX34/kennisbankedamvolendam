"use client"

import { useState } from "react"
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Netwerkpartner } from "@/lib/netwerkpartners-data"

interface PartnerCardProps {
  item: Netwerkpartner
  badgeColorClass: string
}

const normalizeUrl = (url: string) =>
  url.startsWith("http") ? url : `https://${url}`

export default function PartnerCard({ item, badgeColorClass }: PartnerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const contactpersonen =
    item.contactpersonen && item.contactpersonen.length > 0
      ? item.contactpersonen
      : item.contactpersoon
      ? [{ naam: item.contactpersoon }]
      : []

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h5 className="font-semibold text-lg text-gray-900">{item.naam}</h5>
        </div>
        <p className="text-gray-600 mb-4">{item.beschrijving}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.levensgebieden.map((gebied) => (
            <Badge key={gebied} variant="outline" className={badgeColorClass}>
              {gebied}
            </Badge>
          ))}
        </div>

        {isExpanded && (
          <div className="mt-2 p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="grid grid-cols-1 gap-2 text-sm">
              {item.adres && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="min-w-0 break-words">{item.adres}</span>
                </div>
              )}
              {item.telefoon && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <a
                    href={`tel:${item.telefoon.replace(/\s+/g, "")}`}
                    className="min-w-0 break-words text-blue-600 hover:underline"
                  >
                    {item.telefoon}
                  </a>
                </div>
              )}
              {item.whatsapp && (
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="min-w-0 break-words">
                    WhatsApp: {item.whatsapp}
                  </span>
                </div>
              )}
              {item.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <a
                    href={`mailto:${item.email}`}
                    className="min-w-0 break-words text-blue-600 hover:underline"
                  >
                    {item.email}
                  </a>
                </div>
              )}
              {item.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <a
                    href={normalizeUrl(item.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 break-words text-blue-600 hover:underline"
                  >
                    {item.website}
                  </a>
                </div>
              )}
              {item.websites &&
                item.websites.map((site) => (
                  <div key={site} className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <a
                      href={normalizeUrl(site)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-0 break-words text-blue-600 hover:underline"
                    >
                      {site}
                    </a>
                  </div>
                ))}
              {contactpersonen.map((cp, index) => (
                <div key={index} className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="min-w-0 break-words">
                    {cp.naam}
                    {cp.telefoon ? ` — ${cp.telefoon}` : ""}
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

        <div className="mt-auto">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-4"
          >
            {isExpanded ? (
              <>
                Minder informatie <ChevronUp className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Meer informatie <ChevronDown className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
