// src/utils/contractService.js
import { ethers } from "ethers";
import { init } from "next/dist/compiled/webpack/webpack";

let provider = null;
let signer = null;
let contract = null;
let account = null;

const contractAddress = "0x8b51426bA378109Ab5D19Ea18F6238fe9f66B12c";
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "patientID",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "patientName",
        type: "string",
      },
      {
        internalType: "string",
        name: "diagnosis",
        type: "string",
      },
      {
        internalType: "string",
        name: "treatment",
        type: "string",
      },
    ],
    name: "addRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "provider",
        type: "address",
      },
    ],
    name: "authorizeProvider",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "patientID",
        type: "uint256",
      },
    ],
    name: "getPatientRecords",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "recordID",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "patientName",
            type: "string",
          },
          {
            internalType: "string",
            name: "diagnosis",
            type: "string",
          },
          {
            internalType: "string",
            name: "treatment",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct HealthcareRecords.Record[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

function getUserSession() {}

export async function restoreSession() {
  console.log("Initing contract");
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  console.log("getting the provider");
  provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log("provider: ", provider);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  account = await signer.getAddress();
  console.log("accoung", account);

  contract = new ethers.Contract(contractAddress, contractABI, signer);

  return { account, contract };
}

export async function initContract() {
  return restoreSession();
}

export function getAccount() {
  return account;
}

export async function getOwner() {
  await restoreSession();
  return contract.getOwner();
}

export async function addRecord(patientID, diagnosis, treatment) {
  await restoreSession();

  try {
    const tx = await contract.addRecord(
      patientID,
      "Alice",
      diagnosis,
      treatment,
    );
    console.log(tx);
    return tx;
  } catch (err) {
    throw "Add record failed";
  }
}

export async function getPatientRecords(patientID) {
  await restoreSession();
  return contract.getPatientRecords(patientID);
}

export async function authorizeProvider(providerAddress) {
  const tx = await contract.authorizeProvider(providerAddress);
  await tx.wait();
  return tx;
}
