import { openai } from "@/openai/client";

type ChatProps = {
  message: string;
};

/**
 * User role chat with EschatoloGPT
 */
export async function chat({ message }: ChatProps) {
  // get response from openai
  const res = await openai("/v1/chat/completions", {
    body: JSON.stringify({
      ...defaultOpts,
      messages: [{ role: "user", content: message }],
    }),
    method: "POST",
  }).then((res) => res.json());

  // extract content from response
  const content = res.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    const msg = "No content found in OpenAI response";
    console.error(msg, res);
    throw new Error(msg);
  }

  // return content
  return content;
}

const defaultOpts = {
  model: "gpt-4o-mini" as const,
  temperature: 0.7,
};
