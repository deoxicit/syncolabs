import { create } from '@web3-storage/w3up-client';

/**
 * Downloads files from a CID using the IPFS HTTP gateway
 * @param {string} cid - IPFS directory CID
 * @returns {Promise<Object>} - Map of filename → content
 */
export async function downloadFromCID(cid) {
    const filenames = ['input.txt', 'output.txt', 'cot.txt']; // Required for validation
    const fileMap = {};
  
    for (const name of filenames) {
      const url = `https://${cid}.ipfs.w3s.link/${name}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${name} from ${url}`);
      }
      const text = await res.text();
      fileMap[name] = text;
    }
  
    return fileMap;
  }
  