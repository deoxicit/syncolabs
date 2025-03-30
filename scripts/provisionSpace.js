import { create } from '@web3-storage/w3up-client'

async function main() {
  const client = await create();

  const email = process.env.STORCHA_EMAIL;  

  console.log(`Logging in with ${email}...`);
  const account = await client.login(email);

  console.log("Waiting for plan selection...");
  await account.plan.wait();

  console.log("Creating a new space...");
  const space = await client.createSpace('syncolab', { account });

  console.log("Setting current space...");
  await client.setCurrentSpace(space.did());

  console.log("✅ Space provisioned!");
  console.log("Space DID:", space.did());
}

main().catch((err) => {
  console.error("❌ Error provisioning space:", err);
});
