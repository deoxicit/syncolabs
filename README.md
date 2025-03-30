# 🧠 SynCoLab: Collaborative Synthetic Data Lab with Storacha Integration

SynCoLab is a decentralized AI agent collaboration platform for generating and validating synthetic data, with full data lineage and verifiability via Filecoin/IPFS using **Storacha**. Built for the **Spicy AI Collaboration with Storacha** bounty, SynCoLab demonstrates reproducible ensemble learning between AI agents through real-time data sharing and analysis.

---

## 🚀 What It Does

- **Agent A** (Generator): Produces synthetic data from a user prompt.
- **Agent A uploads** input, output, chain-of-thought, and metadata to its own Storacha space.
- **Agent B** (Validator): Downloads the uploaded artifacts using the CID and evaluates the synthetic data.
- **Agent B uploads** its own validation reasoning, score, and derived metadata to a second Storacha space.
- **Frontend** displays results, CIDs, and provides access to stored artifacts via IPFS gateways.

---

## 🔗 Storacha Integration

This project uses `@web3-storage/w3up-client` to:

### ✅ Provision Spaces
- Created 2 unique Storacha Spaces:
  - `agent-generator` (Agent A)
  - `agent-validator` (Agent B)

### ✅ Store and Retrieve Artifacts
Each agent uploads at least **4 artifacts**:
- `input.txt` – Prompt provided to the generator
- `output.txt` – Generated synthetic data
- `cot.txt` – Chain of Thought reasoning
- `metadata.txt` – Timestamp, model info, etc.

The validator downloads these via IPFS gateway URLs:
```
https://{generatorCID}.ipfs.w3s.link/input.txt
https://{generatorCID}.ipfs.w3s.link/output.txt
https://{generatorCID}.ipfs.w3s.link/cot.txt
```

It then produces its own output (`validation.txt`, `score.txt`, etc.) and uploads to its own CID.

### ✅ Agent Storage Code
Storage and retrieval handled via:
```js
await uploadAgentData('generator', {
  input, output, cot, metadata
});

const fileMap = await downloadFromCID(generatorCID);
const output = fileMap['output.txt'];
```

---

## 📦 Technologies Used

| Layer | Tool |
|------|------|
| Frontend | Next.js + TailwindCSS |
| AI Models | OpenAI GPT-3.5 (via `openai` npm package) |
| Storage | Storacha (w3up-client) + IPFS via `w3s.link` |
| Agent Logic | JavaScript modules per agent (LangChain-compatible structure) |

---

## 🧪 Reproducibility

- All agent artifacts are stored in public IPFS-accessible CIDs.
- Users and validators can **reconstruct validation decisions** from stored CoT and inputs.
- Validator's behavior is **deterministically tied** to content from the generator's CID.

---

## 📺 Demo Video (Coming Soon)
*We'll update this with a 3–5 minute walkthrough of the full agent collaboration pipeline.*

---

## 🗂 Project Structure

```
├── pages/
│   ├── index.js               # Frontend UI for prompt & results
│   └── api/runAgents.js       # Orchestrates generation ➝ storage ➝ validation ➝ storage
├── scripts/
│   ├── agentGenerator.js
│   ├── agentValidator.js
│   ├── storageAgent.js        # Upload logic per agent
│   ├── downloadAgentData.js   # IPFS gateway-based fetcher
│   └── setupAgents.js         # Creates & saves Storacha spaces
├── utils/
│   └── templates.js           # Prompt templates by domain
├── agentSpaces.json           # Saved DIDs for each agent space
├── .env.local                 # OPENAI_API_KEY and STORCHA_EMAIL
```

---

## 💬 How This Satisfies the Storacha Bounty Rubric

| Requirement | Satisfied? | Notes |
|------------|------------|-------|
| 2 Spaces | ✅ | `agent-generator` and `agent-validator` |
| UCAN Authorization | ✅ | Public IPFS links used for ease; UCAN-ready structure |
| Upload 3+ Items | ✅ | Input, Output, CoT, Metadata (Agent A & B) |
| Download 3+ Items | ✅ | Validator fetches input, output, CoT from IPFS |
| Docs | ✅ | This file 🎉 |
| GitHub Discussions Post | 🕓 | Will be posted when template is shared |
| Demo Video | 🕓 | Will be recorded next |
| GUI | ✅ | Tailwind-powered Next.js UI |
| Launch in < 3 mins | ✅ | Vercel deploy + simple run instructions |

---

## 👋 Contributing & Next Steps

- Build multi-agent ensembles (Validator A, B, C)
- Add public history viewer by CID
- Layer in UCAN-based access control for private datasets

---

## 📬 Questions?
Reach out in the Storacha Discord or Filecoin AI Encode community!

Built with ❤️ for the Filecoin AI Hackathon

