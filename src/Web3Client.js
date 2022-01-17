import Web3 from "web3";

import SCSContractBuild from "contracts/SCS.json";
import CompanyContractBuild from "contracts/CompanyContract.json";

let selectedAccount;
let SCSContract;
let CompanyContract;
let contractInitialized = false;
let web3;
let provider;

export const init = async () => {
  provider = window.ethereum;

  if (typeof provider !== "undefined") {
    // Metamask is installed

    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected account: ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    window.ethereum.on("accountsChanged", function (accounts) {
      selectedAccount = accounts[0];
      console.log(`Selected account: ${selectedAccount}`);
    });
  }

  web3 = new Web3(provider);
  const networkID = await web3.eth.net.getId();

  SCSContract = new web3.eth.Contract(
    SCSContractBuild.abi,
    SCSContractBuild.networks[networkID].address
  );

  contractInitialized = true;
};

export const getNewSCSContractInstance = async () => {
  web3 = new Web3(provider);
  const networkID = await web3.eth.net.getId();

  SCSContract = new web3.eth.Contract(
    SCSContractBuild.abi,
    SCSContractBuild.networks[networkID].address
  );

  return SCSContract;
};

export const retrieveCompanies = async () => {
  if (!contractInitialized) {
    await init();
  }
  return SCSContract.methods.getCompanies().call({ from: selectedAccount });
};

export const retrieveCompanyShares = async (contractAddress) => {
  if (!contractInitialized) {
    await init();
  }

  CompanyContract = new web3.eth.Contract(
    CompanyContractBuild.abi,
    contractAddress
  );
  return CompanyContract.methods.getNumShares().call({ from: selectedAccount });
};

export const addNewCompany = async (name, founders, init_shares) => {
  if (!contractInitialized) {
    await init();
  }
  return SCSContract.methods
    .addCompany(name, founders, init_shares)
    .send({ from: selectedAccount });
};

export const mintShares = async (contractAddress, amount) => {
  if (!contractInitialized) {
    await init();
  }

  CompanyContract = new web3.eth.Contract(
    CompanyContractBuild.abi,
    contractAddress
  );
  return CompanyContract.methods
    .mintShares(amount)
    .send({ from: selectedAccount });
};

export const burnShares = async (contractAddress, amount) => {
  if (!contractInitialized) {
    await init();
  }

  CompanyContract = new web3.eth.Contract(
    CompanyContractBuild.abi,
    contractAddress
  );
  return CompanyContract.methods
    .burnShares(amount)
    .send({ from: selectedAccount });
};

export const reissueShares = async (contractAddress, newAmount) => {
  if (!contractInitialized) {
    await init();
  }

  CompanyContract = new web3.eth.Contract(
    CompanyContractBuild.abi,
    contractAddress
  );
  return CompanyContract.methods
    .reissueShares(newAmount)
    .send({ from: selectedAccount });
};

export { web3, SCSContract };
// export { SCSContract, contractInitialized };
