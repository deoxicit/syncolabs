import { File } from 'web3.storage'
import { create } from '@web3-storage/w3up-client'

const client = await create();

export async function storeToStoracha(result) {
  try {
    const json = JSON.stringify(result, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const file = new File([blob], `syncolab-${Date.now()}.json`);

    const cid = await client.uploadFile(file);
    return cid;
  } catch (err) {
    console.error("❌ Storacha upload failed:", err);
    throw err;
  }
}
