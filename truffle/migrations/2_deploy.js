const Scs = artifacts.require("SCS");
const CompanyContract = artifacts.require("CompanyContract");

module.exports = async function (deployer) {
  //   await deployer.deploy(CompanyContract);
  await deployer.deploy(Scs);
};
