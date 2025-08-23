import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const Healthcare = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(null);
  const [patientID, setPatientID] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [patientRecords, setPatientRecords] = useState([]);

  const [providerAddress, setProviderAddress] = useState("");
  // const contractAddress = "0x6348995a1972d426b6a7c053fd17a86b243c9d2b";
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

  useEffect(() => {
    const connectWallet = async () => {
      try {
        //handle meta mask
        console.log("starting connect");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        console.log("got past the provider");

        //test that the contract does exist
        // const code = await provider.getCode(contractAddress);
        // console.log("does the code exist? ", code);

        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        console.log("got past the signer");

        //get the wallet address of the user
        const accountAddress = await signer.getAddress();
        setAccount(accountAddress);

        console.log(accountAddress);

        //get the contract, hardcoded and based on the user
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer,
        );
        setContract(contract);

        //get the owner adress
        const ownerAddress = await contract.getOwner();

        setIsOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());
      } catch (error) {
        console.error("Error connecting to wallet: ", error);
      }
    };

    //connect to the wallet
    connectWallet();
  }, []);

  //get the patient records
  const fetchPatientRecords = async () => {
    try {
      console.log("This is the patient ID ", patientID);
      const records = await contract.getPatientRecords(patientID);
      console.log(records);
      setPatientRecords(records);
    } catch (error) {
      console.error("Error fetching patient records", error);
    }
  };

  //add a record
  const addRecord = async () => {
    try {
      console.log(
        "patient Id ",
        patientID,
        "--  diagnosis ",
        diagnosis,
        "-- treatment ",
        treatment,
      );
      const tx = await contract.addRecord(
        patientID,
        "Alice",
        diagnosis,
        treatment,
      );
      await tx.wait();
      fetchPatientRecords();
      await tx.wait();
      alert(`Provider ${providerAddress} authorized successfully`);
    } catch (error) {
      console.error("Error adding records", error);
    }
  };

  // const authorizeProvider = async () => {
  //   if (isOwner) {
  //     try {
  //       const tx = await contract.authorizeProvider(providerAddress);
  //       await tx.wait();
  //       alert(`Provider ${providerAddress} authorized successfully`);
  //     } catch (error) {
  //       console.error("Only contract owner can authorize different providers");
  //     }
  //   } else {
  //     alert("Only contract owner can call this function");
  //   }
  // };
};

export default Healthcare;
