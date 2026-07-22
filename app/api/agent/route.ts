import { NextResponse } from "next/server";

export const maxDuration = 300;

const EDAM_VOICEFLOW_API_KEY = process.env.EDAM_VOICEFLOW_API_KEY || "";

const VOICEFLOW_RUNTIME_ENDPOINT = "https://general-runtime.voiceflow.com";

export async function POST(req: Request) {
  try {
    const { action, userId } = await req.json();

    if (!EDAM_VOICEFLOW_API_KEY) {
      return NextResponse.json(
        { error: "Voiceflow API key is niet geconfigureerd." },
        { status: 500 }
      );
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: EDAM_VOICEFLOW_API_KEY,
    };

    const body = {
      action,
      config: {
        tts: false,
        stripSSML: true,
        stopAll: true,
        excludeTypes: ["debug", "flow", "block", "visual"],
      },
      versionID: "production",
    };

    if (action.type === "launch") {
      fetch(`${VOICEFLOW_RUNTIME_ENDPOINT}/state/user/${userId}/reset`, {
        method: "POST",
        headers,
      })
        .then(() => console.log(`Reset conversation for user ${userId}`))
        .catch((resetError) =>
          console.error("Error resetting conversation:", resetError)
        );
    }

    const controller = new AbortController();
    const timeout = 300000;
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    const response = await fetch(
      `${VOICEFLOW_RUNTIME_ENDPOINT}/state/user/${userId}/interact`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Voiceflow API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in Edam agent API:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verwerken van je bericht." },
      { status: 500 }
    );
  }
}
