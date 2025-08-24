# 🏥 Healthcare Records on Blockchain

A decentralized healthcare records management system built during a **24-hour hackathon**.  
The theme of the hackathon was to **solve an issue affecting women in South Africa using blockchain technology**.

Our solution: a secure, anonymous, and user-controlled way to store and access medical records using Ethereum smart contracts and a React-based DApp frontend.

---

## 🚀 Problem Statement

In South Africa, women often face challenges around:

- **Access to reliable healthcare**
- **Privacy and trust** in sensitive medical data
- **Mobility of records** across providers and clinics
- **Data ownership** — patients frequently lack control over their own medical information

We asked: **How can blockchain give women more control, privacy, and security over their health records?**

---

## 💡 Our Solution

We built a **DApp (Decentralized Application)** that allows:

- Patients to **securely store their medical records** on the blockchain.
- Records are stored **anonymously** — no personally identifiable data is exposed.
- Patients can **view their records at will** through the app.
- The contract owner can **authorize healthcare providers** to add records.
- Providers can add **diagnosis and treatment notes** directly into the blockchain.

All interactions happen through **Ethereum smart contracts** (Solidity), connected to a **React frontend** with `ethers.js`.

---

## 🔐 Features

- ✅ **Anonymous records storage**: only patient IDs, no sensitive identifiers on-chain.
- ✅ **Patient ownership**: users access their records with their Ethereum wallet.
- ✅ **Provider authorization**: only approved healthcare providers can add new records.
- ✅ **Tamper-proof history**: once stored, records are immutable and traceable.
- ✅ **Transparency**: patients can see who added records and when.

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) / React + [ethers.js](https://docs.ethers.org/)
- **Smart Contracts:** Solidity, deployed via [Remix IDE](https://remix.ethereum.org/)
- **Blockchain:** Ethereum testnet (e.g. Sepolia/Goerli)
- **Wallet Integration:** MetaMask

---

## 📦 Smart Contract

### Contract: `HealthcareRecords.sol`

Key functions:

- `addRecord(uint256 patientID, string patientName, string diagnosis, string treatment)`
- `getPatientRecords(uint256 patientID)`
- `authorizeProvider(address provider)`
- `getOwner()`

Deployed contract address (testnet):
