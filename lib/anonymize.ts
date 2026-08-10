const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? ""

const SYSTEM_PROMPT = `Je bent een privacy-filter. Vervang alle namen, adressen, telefoonnummers, BSN's, e-mailadressen, geboortedatums en andere herleidbare persoonsgegevens in de tekst door [CENSUUR]. Verander de inhoud of context verder absoluut niet. Geef alleen de gecensureerde tekst terug, zonder extra uitleg.`

export async function anonymizeText(text: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY not set, skipping anonymization")
    return text
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-nano",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text },
        ],
        temperature: 0,
        max_completion_tokens: 16000,
        reasoning_effort: "none",
      }),
    })

    if (!res.ok) {
      console.error(`OpenAI anonymization failed: ${res.status}`)
      return text
    }

    const data = await res.json()
    const anonymized = data.choices?.[0]?.message?.content?.trim()
    return anonymized || text
  } catch (err) {
    console.error("Anonymization error:", err)
    return text
  }
}
