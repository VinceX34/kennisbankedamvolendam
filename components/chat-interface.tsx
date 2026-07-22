"use client"

import { useRef, useEffect, useState, useCallback, useImperativeHandle, forwardRef } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import TextareaAutosize from "react-textarea-autosize"
import {
  Send,
  Mic,
  MicOff,
  AlertCircle,
  RefreshCw,
  X,
} from "lucide-react"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string
  role: "user" | "assistant"
  content?: string
  buttons?: string[]
}

export interface ChatInterfaceHandle {
  sendMessage: (text: string) => void
}

const getAnonymousUserId = () =>
  `user-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`

const AGENT_TITLE = "A.I.-assistent Edam-Volendam"

const WELKOM_INTRO =
  "Ik ben de A.I.-assistent van gemeente Edam-Volendam. Stel me een vraag en ik denk met je mee over de netwerkpartners en waar je terecht kunt."

const WELKOM_BULLETS = [
  "Vraag bijvoorbeeld naar hulp bij geldzaken, opvoeding, wonen of ouderenzorg.",
  "Ik verwijs je naar de juiste netwerkpartner of organisatie.",
  "Deel hier geen namen, adressen of andere persoonsgegevens.",
  "Antwoorden worden gegenereerd door A.I. en kunnen fouten bevatten.",
]

const ChatInterface = forwardRef<ChatInterfaceHandle, {}>(function ChatInterface(_props, ref) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(() => getAnonymousUserId())
  const [apiError, setApiError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  /* ---------------- lifecycle ---------------- */

  useEffect(() => setMounted(true), [])

  /** scroll alleen als de container zelf kan scrollen */
  useEffect(() => {
    const panel = messagesEndRef.current?.parentElement
    if (panel && panel.scrollHeight > panel.clientHeight) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  /* ---------------- helpers ------------------ */

  const processResponse = useCallback((data: any[]): Message[] => {
    const out: Message[] = []

    data.forEach((item: any) => {
      if (item.type === "text" && item.payload) {
        let content = ""
        if (item.payload.slate?.content) {
          content = item.payload.slate.content
            .map((block: any) =>
              block.children
                .map((child: any) =>
                  child.fontWeight === "700" && child.text.trim() !== ""
                    ? `**${child.text.trim()}**`
                    : child.text
                )
                .join("")
            )
            .join("\n")
        } else if (item.payload.message) {
          content = item.payload.message
        }
        if (content) {
          out.push({
            id: `assistant-${Date.now()}-${Math.random()}`,
            role: "assistant",
            content,
          })
        }
      }

      if (item.type === "choice" && item.payload?.buttons) {
        out.push({
          id: `assistant-${Date.now()}-${Math.random()}`,
          role: "assistant",
          buttons: item.payload.buttons.map(
            (btn: any) => btn.name || btn.text || "Button"
          ),
        })
      }
    })

    return out
  }, [])

  const addMessagesWithDelay = useCallback(
    (msgs: Message[], onDone?: () => void) => {
      msgs.forEach((msg, i) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, msg])
          if (i === msgs.length - 1 && onDone) onDone()
        }, i * 1000)
      })
    },
    []
  )

  const interactWithVoiceflow = useCallback(
    async (action: any, retries = 2): Promise<any> => {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      })
      if (!res.ok) {
        if (res.status === 404 && retries > 0) {
          await new Promise((r) => setTimeout(r, 1000))
          return interactWithVoiceflow(action, retries - 1)
        }
        throw new Error(`HTTP ${res.status}: ${await res.text()}`)
      }
      return res.json()
    },
    [userId]
  )

  const handleMessageSend = useCallback(
    async (text: string) => {
      if (!text.trim()) return
      setMessages((p) => [
        ...p,
        { id: `user-${Date.now()}`, role: "user", content: text.trim() },
      ])
      setInput("")

      try {
        setLoading(true)
        const data = await interactWithVoiceflow({
          type: "text",
          payload: text.trim(),
        })
        const resp = processResponse(data)
        if (resp.length) addMessagesWithDelay(resp, () => setLoading(false))
        else setLoading(false)
      } catch (e: any) {
        setApiError(e.message)
        setLoading(false)
      } finally {
        setTimeout(() => inputRef.current?.focus(), 0)
      }
    },
    [interactWithVoiceflow, processResponse, addMessagesWithDelay]
  )

  // Expose sendMessage via ref
  useImperativeHandle(ref, () => ({
    sendMessage: handleMessageSend
  }), [handleMessageSend])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleMessageSend(input)
    }
  }

  const resetChat = () => {
    setUserId(getAnonymousUserId())
    setMessages([])
    setApiError(null)
  }

  /* speech hook */
  const speech = useSpeechRecognition({
    onResult: (t: string) => setInput(t),
    maxNetworkRetries: 0,
  })

  /* ---------------- render ------------------ */

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* header sticky */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="px-4 py-2 flex items-center justify-between">
          <h3 className="font-medium h-5 flex items-center text-xs text-muted-foreground">
            <span
              className="animate-fade-in-out"
              style={{ animationDelay: `0s` }}
            >
              A.I denkt met je mee!
            </span>
            <span className="px-1">-</span>
            <span
              className="animate-fade-in-out"
              style={{ animationDelay: `1s` }}
            >
              Kan fouten bevatten.
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={resetChat}
              title="Herstart gesprek"
              className="h-8 w-8"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* alerts onder de header, niet-sticky */}
      <div className="bg-background">
        {speech.error && (
          <Alert
            variant="destructive"
            className="py-2 w-full flex items-center justify-between"
          >
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs ml-2">
                {speech.error}
              </AlertDescription>
            </div>
            <button
              onClick={speech.clearError}
              className="p-1 rounded-md hover:bg-destructive/20"
              aria-label="Sluit melding"
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        )}

        {apiError && (
          <Alert
            variant="destructive"
            className="py-2 w-full flex items-center justify-between"
          >
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs ml-2">
                API Error: {apiError}
              </AlertDescription>
            </div>
            <button
              onClick={() => setApiError(null)}
              className="p-1 rounded-md hover:bg-destructive/20"
              aria-label="Sluit melding"
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        )}
      </div>

      {/* berichtenlijst */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
        style={{ scrollbarGutter: "stable" }}
      >
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <div className="max-w-md space-y-4">
              <h2 className="text-2xl font-semibold text-foreground animate-fade-in-out" style={{ animationDelay: `0s` }}>
                {AGENT_TITLE}
              </h2>
              <p className="text-muted-foreground animate-fade-in-out" style={{ animationDelay: `1s` }}>
                {WELKOM_INTRO}
              </p>
              <div className="text-sm text-muted-foreground text-left pt-4">
                <ul className="list-disc list-inside space-y-1">
                  {WELKOM_BULLETS.map((bullet, i) => (
                    <li
                      key={bullet}
                      className={`animate-fade-in-out ${i === 2 ? "font-semibold" : ""}`}
                      style={{ animationDelay: `${2 + i * 0.5}s` }}
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.role === "user" ? "items-end" : "items-start"
            }`}
          >
            {m.content && (
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            )}

            {m.buttons && (
              <div className="mt-2 flex flex-wrap gap-2">
                {m.buttons.map((t, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => handleMessageSend(t)}
                    className="text-sm"
                  >
                    {t}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted text-muted-foreground">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                <div
                  className="w-2 h-2 rounded-full bg-current animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-current animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* input */}
      <div className="p-4 border-t border-border">
        <form className="flex items-start space-x-2">
          <div className="relative flex-1">
            <TextareaAutosize
              ref={inputRef as any}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck="false"
              placeholder={
                speech.isListening ? "Spreek nu..." : "Stel een vraag..."
              }
              minRows={1}
              maxRows={5}
              className={`flex-1 resize-none pr-10 min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                speech.isListening ? "border-primary" : ""
              }`}
            />
            {speech.isListening && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                </span>
              </div>
            )}
          </div>

          {speech.isSupported && mounted && (
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={speech.toggleListening}
              disabled={loading}
              className={`rounded-full ${
                speech.isListening
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              title={
                speech.isListening
                  ? "Stop spraakherkenning"
                  : "Start spraakherkenning"
              }
            >
              {speech.isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          )}

          <Button
            type="button"
            size="icon"
            disabled={loading || !input.trim()}
            onClick={() => handleMessageSend(input)}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
})

ChatInterface.displayName = "ChatInterface"

export default ChatInterface
