import { File } from 'web3.storage';
import { create } from '@web3-storage/w3up-client';
import agentSpaces from '../agentSpaces.json' assert { type: 'json' };

let client;

async function getClient() {
  if (!client) {
    client = await create();
  }
  return client;
}

export async function uploadAgentData(agent, dataMap) {
  const client = await getClient();

  const spaceDid = agentSpaces[agent];
  if (!spaceDid) throw new Error(`No space DID found for agent: ${agent}`);

  await client.setCurrentSpace(spaceDid);

  const files = Object.entries(dataMap).map(([label, content]) => {
    const isJson = label.endsWith('.json');
    const filename = isJson ? label : `${label}.txt`;
    const mimeType = isJson ? 'application/json' : 'text/plain';
    const blob = new Blob([content], { type: mimeType });
    return new File([blob], filename);
  });

  const cid = await client.uploadDirectory(files);
  console.log(`✅ ${agent} uploaded to Storacha with CID:`, cid);
  return cid;
}
