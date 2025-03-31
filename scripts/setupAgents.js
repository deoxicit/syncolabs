import { create } from '@web3-storage/w3up-client';
import agentSpaces from '../agentSpaces.json' assert { type: 'json' };

let client;
async function getClient() {
  if (!client) client = await create();
  return client;
}

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
