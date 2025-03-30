import { create } from '@web3-storage/w3up-client'

async function main() {
  const client = await create();
  const email = process.env.STORCHA_EMAIL;  
  const account = await client.login(email);
  await account.plan.wait();
  const space = await client.createSpace('syncolab', { account });
  await client.setCurrentSpace(space.did());
}

main().catch((err) => {
  console.error("❌ Error provisioning space:", err);
});
