import axios from "axios";
import { ethers } from "ethers";
// import fetch from "node-fetch";
import React, { useContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from "./../utils/constants";
import { useAuth } from "./Auth";

export const TransactionContext = React.createContext();

const { ethereum } = window;

export const TransactionProvider = ({ children }) => {
  const myAuth = useAuth();
  const [connectedAccount, setConnectedAccount] = useState("");
  const [balance, setBalance] = useState(-1);
  const [contract, setContract] = useState();
  const [records, setRecords] = useState([]);
  const [reloadCtr, setReloadCtr] = useState(0);

  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) {
        if (!alert("Please install Metamask!"))
          document.location = "https://metamask.io/";
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
        getBalance(accounts[0]);
      } else {
        console.log("No accounts found.");
      }
    } catch (error) {
      console.log(error);
      // throw new Error("No ethereum object.");
    }
  };

  const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    setContract(transactionContract);
  };

  const getBalance = async (account) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const provider = new ethers.providers.Web3Provider(ethereum);

      const response = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(response));
    } catch (e) {
      console.log(e);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      // throw new Error("No ethereum object.");
    }
  };

  const reload = () => {
    setReloadCtr((prev) => prev + 1);
  };

  const getEvents = async () => {
    try {
      const headers = {
        "X-Parse-Application-Id": process.env.REACT_APP_MORALIS_ID,
      };
      const eventRes = await axios.get(
        "https://hpneqrtnwhgj.usemoralis.com:2053/server/classes/CreatedRecords",
        { headers: headers }
      );

      const signRes = await axios.get(
        "https://hpneqrtnwhgj.usemoralis.com:2053/server/classes/SignedRecords",
        { headers: headers }
      );

      if (myAuth.role && myAuth.role === "insured")
        parseEventsInsured(eventRes.data.results, signRes.data.results);
      else if (myAuth.role && myAuth.role === "hospital")
        parseEventsHospital(eventRes.data.results, signRes.data.results);
      else if (myAuth.role && myAuth.role === "insurer")
        parseEventsInsurer(eventRes.data.results, signRes.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const parseEventsInsured = (eventData, signData) => {
    let records = eventData.filter((r) => r.patientAddr === connectedAccount);
    let sign = signData.filter((s) => s.patientAddr === connectedAccount);

    records.forEach((r) => {
      r.signHistory = [];
      sign.forEach((s) => {
        if (r.recordId === s.recordId) {
          r.signHistory.push(s);
        }
      });
    });
    setRecords(records);
  };

  const parseEventsHospital = (eventData, signData) => {
    let records = eventData.filter((r) => r.hospitalAddr === connectedAccount);
    let sign = signData.filter((s) => s.hospitalAddr === connectedAccount);

    records.forEach((r) => {
      r.signHistory = [];
      sign.forEach((s) => {
        if (r.patientAddr === s.patientAddr && r.recordId === s.recordId) {
          r.signHistory.push(s);
        }
      });
    });
    setRecords(records);
  };

  const parseEventsInsurer = (eventData, signData) => {
    let records = eventData;
    let sign = signData;

    records.forEach((r) => {
      r.signHistory = [];
      sign.forEach((s) => {
        if (r.patientAddr === s.patientAddr && r.recordId === s.recordId) {
          r.signHistory.push(s);
        }
      });
    });
    setRecords(records);
  };

  const value = {
    connectWallet,
    connectedAccount,
    balance,
    reload,
    contract,
    getBalance,
    records,
  };

  useEffect(() => {
    try {
      checkIfWalletConnected();
      getEthereumContract();
      getEvents();
    } catch (e) {
      console.log(e);
    }
  }, [reloadCtr]);

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export function useTransaction() {
  return useContext(TransactionContext);
}
