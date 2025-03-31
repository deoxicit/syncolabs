import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { category } = req.body;

  const prompt = `Generate 5 diverse and realistic synthetic data generation prompts in the domain of ${category}. Return them as a simple numbered list.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  });

  const rawText = response.choices[0].message.content;
  const lines = rawText.split('\n').filter((l) => l.trim()).map((l) => l.replace(/^\d+\.\s*/, ''));

  const chosenPrompt = lines[Math.floor(Math.random() * lines.length)];
  res.status(200).json({ prompt: chosenPrompt });
}
