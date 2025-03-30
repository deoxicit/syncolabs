import { runGenerator } from '@/scripts/agentGenerator';

export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: 'Prompt required' });

  const synthetic = await runGenerator(prompt);

  res.status(200).json({ synthetic });
}
