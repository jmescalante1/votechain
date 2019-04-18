var Votechain = artifacts.require("Votechain");

let adminAccount = "0x2504A6681F1EB33E96c643c6B66c4dDD3399Ce45";
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

