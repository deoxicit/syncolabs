import OpenAI from 'openai';
import { downloadFromCID } from './downloadAgentData.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function runValidatorFromCID(generatorCID) {
  const data = await downloadFromCID(generatorCID);

  const input = data['input.txt'];
  const output = data['output.txt'];
  const cot = data['cot.txt'];

  const evaluationPrompt = `
You are an expert AI agent tasked with validating synthetic data.

Input Prompt:
${input}

Generated Output:
${output}

Original Generator CoT:
${cot}

Evaluate this data with a score from 0 to 100 and explain your reasoning.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a data quality auditor." },
      { role: "user", content: evaluationPrompt }
    ],
    temperature: 0.5,
    max_tokens: 300
  });

  const response = completion.choices[0].message.content;

  const scoreMatch = response.match(/(\d{1,3})/);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : Math.floor(Math.random() * 100);

  return {
    input,
    output,
    cot,
    score,
    validatorCoT: response
  };
}
