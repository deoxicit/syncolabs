import { create } from '@web3-storage/w3up-client'
import fs from 'fs/promises';

const configFile = './agentSpaces.json';

async function main() {
  let client;
  async function getClient() {
    if (!client) client = await create();
    return client;
  }
  

  const email = process.env.STORCHA_EMAIL;  
  const account = await client.login(email);
  await account.plan.wait();

  const agentSpaces = {};

  // Create space for Generator Agent
  const spaceA = await client.createSpace('agent-generator', { account });
  agentSpaces.generator = spaceA.did();

  // Create space for Validator Agent
  const spaceB = await client.createSpace('agent-validator', { account });
  agentSpaces.validator = spaceB.did();

  // Save both DIDs for later use
  await fs.writeFile(configFile, JSON.stringify(agentSpaces, null, 2));
  console.log('✅ Spaces created and saved:', agentSpaces);
}

main().catch(console.error);
