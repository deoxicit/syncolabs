import { create } from '@web3-storage/w3up-client';

let clientInstance;

export async function getClient() {
  if (!clientInstance) {
    const client = await create();

    const email = process.env.STORCHA_EMAIL;
    if (!email) throw new Error('Missing STORCHA_EMAIL');

    const account = await client.login(email);
    await account.plan.wait();

    clientInstance = client;
  }

  return clientInstance;
}
