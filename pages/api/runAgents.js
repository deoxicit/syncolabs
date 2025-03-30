import { runGenerator } from '@/scripts/agentGenerator';
import { runValidator } from '@/scripts/agentValidator';

export default async function handler(req, res) {
  const { prompt } = req.body;

  const synthetic = await runGenerator(prompt);
  const validation = await runValidator(synthetic);

  const result = {
    prompt,
    syntheticData: synthetic.data,
    generatorLog: synthetic.cot,
    score: validation.score,
    validatorLog: validation.reasoning,
    timestamp: Date.now(),
  };

  res.status(200).json({ result });
}
