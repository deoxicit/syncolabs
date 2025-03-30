import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function runGenerator(prompt) {
  const system = "You are a synthetic data generator. Based on the prompt, generate realistic but fake data.";
  const user = `Prompt: ${prompt}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.7,
    max_tokens: 400,
  });

  const syntheticData = completion.choices[0].message.content;

  return {
    data: syntheticData,
    cot: `Generated using OpenAI (gpt-3.5-turbo)`,
    timestamp: Date.now(),
  };
}
