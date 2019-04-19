var Votechain = artifacts.require("Votechain");

let adminAccount = "0x3Ad34a4D3bc3e4443ac4659F9dF404FD38f1Ece4";
let adminName = "JM";

module.exports = function(deployer) {
  deployer.deploy(Votechain, adminAccount, adminName, {from: adminAccount})
};

// var SetValue = artifacts.require("SetValue");
// var Test = artifacts.require("Test");
// module.exports = function(deployer) {
//   deployer.deploy(SetValue).then(function () {
//     return deployer.deploy(Test, SetValue.address);
//   });
// };

