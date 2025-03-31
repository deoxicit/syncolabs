import { create } from '@web3-storage/w3up-client';

async function main() {
  const client = await create();

  const email = process.env.STORCHA_EMAIL;
  if (!email) throw new Error('❌ Missing STORCHA_EMAIL env variable');

  console.log(`📨 Sending login request to ${email}...`);
  const account = await client.login(email);

  console.log('⏳ Waiting for email confirmation...');
  await account.plan.wait();

  console.log('✅ Agent successfully authorized and ready to use this space!');
}

main().catch((err) => {
  console.error('❌ Authorization failed:', err);
  process.exit(1);
});
