var Votechain = artifacts.require("Votechain");

const adminAccount = "0x536675fE7f52686B6f85a6DeF57B48C1A08218F1";
const adminName = "JM";

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

