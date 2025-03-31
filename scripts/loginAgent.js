import { create } from '@web3-storage/w3up-client';

async function main() {
  const client = await create();

  const email = process.env.STORCHA_EMAIL;
  if (!email) {
    throw new Error('Missing STORCHA_EMAIL in env');
  }

  console.log(`📧 Sending login email to ${email}...`);
  const account = await client.login(email);

  console.log('✅ Email verified. Waiting for plan setup...');
  await account.plan.wait();

  console.log('✅ Logged in successfully.');

  await client.export('./.w3up/agent.json'); // Export agent context
  console.log('✅ Agent context saved to .w3up/agent.json');
}

main().catch((err) => {
  console.error('❌ Login failed:', err);
});
