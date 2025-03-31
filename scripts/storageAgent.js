import { File } from 'web3.storage';
import agentSpaces from '../agentSpaces.json' assert { type: 'json' };
import { getClient } from '@/utils/client';

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
