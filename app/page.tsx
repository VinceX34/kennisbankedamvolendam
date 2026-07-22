"use client"

import { useState, useEffect, useRef } from "react"
import ChatInterface, { ChatInterfaceHandle } from "@/components/chat-interface"
import NetwerkpartnersContent from "@/components/NetwerkpartnersContent"
import LevensgebiedDetail from "@/components/LevensgebiedDetail"
import { Button } from "@/components/ui/button"
import { PanelLeft, PanelRight, Rows3 } from "lucide-react"

export default function Home() {
  const [viewMode, setViewMode] = useState<"split" | "docsOnly" | "chatOnly">(
    "split"
  )

  const [selectedLevensgebied, setSelectedLevensgebied] = useState<string | null>(
    null
  )

  const chatRef = useRef<ChatInterfaceHandle>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 350)
    return () => clearTimeout(t)
  }, [viewMode])

  const toggleViewMode = () => {
    if (viewMode === "split") {
      setViewMode("docsOnly")
    } else if (viewMode === "docsOnly") {
      setViewMode("chatOnly")
    } else {
      setViewMode("split")
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground">
      <main className="relative flex flex-1 w-full overflow-hidden">
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1 right-3 z-20 bg-background/80 hover:bg-background"
          onClick={toggleViewMode}
          title="Wissel weergave"
        >
          {viewMode === "split" && <PanelRight className="h-5 w-5" />}
          {viewMode === "docsOnly" && <PanelLeft className="h-5 w-5" />}
          {viewMode === "chatOnly" && <Rows3 className="h-5 w-5" />}
        </Button>

        {/* Links: netwerkpartners */}
        <div
          className={`border-r border-border bg-card flex flex-col min-h-0 pb-6 transition-all duration-300 ease-in-out overflow-y-auto ${
            viewMode === "split"
              ? "w-1/2"
              : viewMode === "docsOnly"
              ? "w-full"
              : "w-0"
          }`}
          style={{ scrollbarGutter: "stable both-edges" }}
        >
          {selectedLevensgebied ? (
            <LevensgebiedDetail
              levensgebied={selectedLevensgebied}
              onBack={() => setSelectedLevensgebied(null)}
            />
          ) : (
            <NetwerkpartnersContent
              onLevensgebiedSelect={setSelectedLevensgebied}
            />
          )}
        </div>

        {/* Rechts: A.I.-agent */}
        <div
          className={`flex flex-col min-h-0 transition-all duration-300 ease-in-out ${
            viewMode === "split"
              ? "w-1/2"
              : viewMode === "chatOnly"
              ? "w-full"
              : "w-0"
          }`}
        >
          <div className="flex flex-col min-h-0 flex-1 overflow-hidden">
            <ChatInterface ref={chatRef} />
          </div>
        </div>
      </main>
    </div>
  )
}
