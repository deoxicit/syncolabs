import { File } from 'web3.storage'
import { getClient } from '../scripts/client.js';

export async function storeToStoracha(result) {
  try {
    const json = JSON.stringify(result, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const file = new File([blob], `syncolab-${Date.now()}.json`);
    const client = await getClient();

    const cid = await client.uploadFile(file);
    return cid;
  } catch (err) {
    console.error("❌ Storacha upload failed:", err);
    throw err;
  }
}
