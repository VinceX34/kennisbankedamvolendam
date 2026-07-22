"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface UseSpeechRecognitionProps {
  onResult?: (transcript: string) => void
  onEnd?: () => void
  language?: string
  maxNetworkRetries?: number
}

// Define the SpeechRecognition interface
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onend: ((event: Event) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult
  length: number
  item(index: number): SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative
  length: number
  item(index: number): SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: SpeechRecognitionErrorCode
}

type SpeechRecognitionErrorCode =
  | "no-speech"
  | "aborted"
  | "audio-capture"
  | "network"
  | "not-allowed"
  | "service-not-allowed"
  | "bad-grammar"
  | "language-not-supported"

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function useSpeechRecognition({
  onResult,
  onEnd,
  language = "nl-NL",
  maxNetworkRetries = 2,
}: UseSpeechRecognitionProps = {}) {
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  // Use refs for callbacks to avoid dependency changes
  const onResultRef = useRef(onResult)
  const onEndRef = useRef(onEnd)

  // Use ref for recognition instance to avoid re-creating it
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Network retry counter
  const networkRetryCountRef = useRef(0)
  const accumulatedTranscriptRef = useRef("")
  const stopByUserRef = useRef(false)

  // Update refs when props change
  useEffect(() => {
    onResultRef.current = onResult
    onEndRef.current = onEnd
  }, [onResult, onEnd])

  // Initialize speech recognition only once
  useEffect(() => {
    if (typeof window === "undefined") return

    // Check browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setError("Spraakherkenning wordt niet ondersteund door deze browser.")
      setIsSupported(false)
      return
    }

    setIsSupported(true)

    const createRecognitionInstance = () => {
      const recognitionInstance = new SpeechRecognition() as SpeechRecognition
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = language

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("")
        accumulatedTranscriptRef.current = transcript
      }

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        // Handle network errors with retry logic
        if (event.error === "network") {
          if (networkRetryCountRef.current < maxNetworkRetries) {
            networkRetryCountRef.current++

            // Show a temporary message
            setError(
              `Netwerkprobleem bij spraakherkenning. Poging ${networkRetryCountRef.current}/${maxNetworkRetries} om opnieuw te verbinden...`,
            )

            // Try to restart after a short delay
            setTimeout(() => {
              if (recognitionRef.current) {
                try {
                  recognitionRef.current.abort()
                  recognitionRef.current.start()
                  setError(null)
                } catch (err) {
                  console.error("Error restarting speech recognition:", err)
                  setError(
                    "Kon spraakherkenning niet herstarten na netwerkfout.",
                  )
                  setIsListening(false)
                }
              }
            }, 1000)
            return
          }
        }

        // Handle other errors or network errors after max retries
        let errorMessage = "Fout bij spraakherkenning"

        switch (event.error) {
          case "network":
            errorMessage =
              "Netwerkprobleem bij spraakherkenning. Controleer je internetverbinding en probeer het opnieuw."
            break
          case "not-allowed":
          case "service-not-allowed":
            errorMessage =
              "Toegang tot microfoon is niet toegestaan. Controleer je browserinstellingen."
            break
          case "audio-capture":
            errorMessage =
              "Geen microfoon gevonden. Controleer of je microfoon is aangesloten en werkt."
            break
          case "no-speech":
            errorMessage = "Geen spraak gedetecteerd. Probeer opnieuw te spreken."
            break
          case "aborted":
            errorMessage = "Spraakherkenning is afgebroken."
            break
          case "language-not-supported":
            errorMessage = `De taal '${language}' wordt niet ondersteund voor spraakherkenning.`
            break
          default:
            errorMessage = `Fout bij spraakherkenning: ${event.error}`
        }

        setError(errorMessage)
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        if (stopByUserRef.current) {
          if (onResultRef.current) {
            onResultRef.current(accumulatedTranscriptRef.current)
          }
          stopByUserRef.current = false // reset
        }
        // Only set isListening to false if we're not in the middle of a retry
        if (
          networkRetryCountRef.current === 0 ||
          networkRetryCountRef.current >= maxNetworkRetries
        ) {
          setIsListening(false)
          // Reset retry counter
          networkRetryCountRef.current = 0

          if (onEndRef.current) {
            onEndRef.current()
          }
        }
      }

      return recognitionInstance
    }

    recognitionRef.current = createRecognitionInstance()

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [language, maxNetworkRetries]) // Only language and maxNetworkRetries should be in the dependency array

  const startListening = useCallback(() => {
    setError(null)
    // Reset retry counter when starting fresh
    networkRetryCountRef.current = 0
    accumulatedTranscriptRef.current = ""
    stopByUserRef.current = false

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (err) {
        console.error("Error starting speech recognition:", err)
        setError(
          "Kon spraakherkenning niet starten. Probeer de pagina te vernieuwen.",
        )
      }
    }
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      stopByUserRef.current = true
      recognitionRef.current.stop()
    }
  }, [isListening])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  return {
    isListening,
    error,
    clearError,
    startListening,
    stopListening,
    toggleListening,
    isSupported,
  }
}
