import { runGenerator } from '@/scripts/agentGenerator';
import { runValidator } from '@/scripts/agentValidator';
import { storeToStoracha } from '@/scripts/storageHelper';

export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  const generated = await runGenerator(prompt);
  const validated = await runValidator(generated.data);

  const result = {
    prompt,
    syntheticData: generated.data,
    generatorCoT: generated.cot,
    score: validated.score,
    validatorCoT: validated.cot,
    timestamp: generated.timestamp,
    validatedAt: validated.validatedAt,
  };

  const cid = await storeToStoracha(result); // <<— Upload to Storacha!

  res.status(200).json({ ...result, cid });
}
