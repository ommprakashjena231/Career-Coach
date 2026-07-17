/**
 * aiService.js
 * A single abstraction layer over OpenAI / Gemini so controllers
 * never need to know which provider is active.
 *
 * Set AI_PROVIDER=openai or AI_PROVIDER=gemini in .env
 */
const OpenAI = require("openai");

const provider = process.env.AI_PROVIDER || "openai";

let openaiClient = null;
if (provider === "openai") {
  openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

/**
 * Calls Gemini's generateContent REST endpoint using fetch (Node 18+).
 */
async function callGemini(prompt) {
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned no content: " + JSON.stringify(data));
  return text;
}

async function callOpenAI(prompt, { json = false } = {}) {
  const completion = await openaiClient.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
    ...(json ? { response_format: { type: "json_object" } } : {}),
  });
  return completion.choices[0].message.content;
}

/**
 * generateText - main entry point used by all controllers.
 * @param {string} prompt
 * @param {object} opts - { json: boolean } request strict JSON output (OpenAI only; for Gemini we ask via prompt)
 */
async function generateText(prompt, opts = {}) {
  if (provider === "gemini") {
    const finalPrompt = opts.json
      ? prompt + "\n\nRespond ONLY with valid JSON. No markdown, no commentary."
      : prompt;
    return callGemini(finalPrompt);
  }
  return callOpenAI(prompt, opts);
}

module.exports = { generateText };
