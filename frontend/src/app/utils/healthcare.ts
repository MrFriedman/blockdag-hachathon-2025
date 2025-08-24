// src/utils/contractService.js
import { ethers } from "ethers";

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

export async function initContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  account = await signer.getAddress();

  contract = new ethers.Contract(contractAddress, contractABI, signer);

  return { account, contract };
}

export function getAccount() {
  return account;
}

export async function getOwner() {
  return contract.getOwner();
}

export async function addRecord(patientID, diagnosis, treatment) {
  const tx = await contract.addRecord(patientID, "Alice", diagnosis, treatment);
  await tx.wait();
  return tx;
}

export async function getPatientRecords(patientID) {
  return contract.getPatientRecords(patientID);
}

export async function authorizeProvider(providerAddress) {
  const tx = await contract.authorizeProvider(providerAddress);
  await tx.wait();
  return tx;
}
