import { runGenerator } from '@/scripts/agentGenerator';
import { runValidatorFromCID } from '@/scripts/agentValidator';
import { uploadAgentData } from '@/scripts/storageAgent';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt required' });

  try {
    const gen = await runGenerator(prompt);

    const generatorCID = await uploadAgentData('generator', {
      input: prompt,
      output: gen.data,
      cot: gen.cot,
      metadata: `Model: GPT-3.5 | Timestamp: ${gen.timestamp}`
    });

    const validatorOutput = await runValidatorFromCID(generatorCID);

    const validatorCID = await uploadAgentData('validator', {
      input: validatorOutput.input,
      output: validatorOutput.output,
      cot: validatorOutput.cot,
      validation: validatorOutput.validatorCoT,
      score: `${validatorOutput.score}`
    });

    return res.status(200).json({
      prompt,
      syntheticData: gen.data,
      generatorCoT: gen.cot,
      validatorCoT: validatorOutput.validatorCoT,
      score: validatorOutput.score,
      generatorCID,
      validatorCID
    });
  } catch (err) {
    console.error('[runAgents] Error:', err);
    return res.status(500).json({ error: 'Internal Server Error', detail: err.message });
  }
}

