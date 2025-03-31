import { getClient } from '@/scripts/client';
import fs from 'fs/promises';

const agentSpaces = JSON.parse(await fs.readFile(new URL('../agentSpaces.json', import.meta.url)));

async function main() {
  const client = await getClient();

  const email = process.env.STORCHA_EMAIL;
  if (!email) throw new Error('Missing STORCHA_EMAIL');

  const account = await client.login(email);
  await account.plan.wait();

  // Set generator space
  const generatorDid = agentSpaces.generator;
  if (!generatorDid) throw new Error('Missing generator DID in agentSpaces.json');

  await client.setCurrentSpace(generatorDid);
  console.log(`✅ Set current space to generator: ${generatorDid}`);

  // Optionally switch to validator space after
  const validatorDid = agentSpaces.validator;
  if (!validatorDid) throw new Error('Missing validator DID in agentSpaces.json');

  await client.setCurrentSpace(validatorDid);
  console.log(`✅ Set current space to validator: ${validatorDid}`);
}

main().catch(console.error);
