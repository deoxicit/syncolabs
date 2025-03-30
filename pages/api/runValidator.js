import { runValidator } from '@/scripts/agentValidator';

export default async function handler(req, res) {
  const { syntheticData } = req.body;

  if (!syntheticData) return res.status(400).json({ error: 'Synthetic data required' });

  const result = await runValidator(syntheticData);

  res.status(200).json(result);
}
