import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function runValidator(syntheticData) {
  const system = "You are a quality evaluator for synthetic data. Give a score from 0 to 100 and explain why.";
  const user = `Evaluate this data:\n\n${syntheticData}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.5,
    max_tokens: 300,
  });

  const response = completion.choices[0].message.content;

  const scoreMatch = response.match(/(\d{1,3})/);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : Math.floor(Math.random() * 100);

  return {
    score,
    cot: response,
    validatedAt: Date.now(),
  };
}
