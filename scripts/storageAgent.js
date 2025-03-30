import { File } from 'web3.storage';
import { create } from '@web3-storage/w3up-client';
import agentSpaces from '../agentSpaces.json' assert { type: 'json' };

const client = await create();

export async function uploadAgentData(agent, dataMap) {
  const spaceDid = agentSpaces[agent];
  if (!spaceDid) throw new Error(`No space DID found for agent: ${agent}`);

  await client.setCurrentSpace(spaceDid);

  const files = Object.entries(dataMap).map(([label, content]) => {
    const blob = new Blob([content], { type: 'text/plain' });
    return new File([blob], `${label}.txt`);
  });

  const cid = await client.uploadDirectory(files);
  console.log(`✅ ${agent} uploaded to Storacha with CID:`, cid);
  return cid;
}
