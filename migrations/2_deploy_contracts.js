var Votechain = artifacts.require("Votechain");

let adminAccount = "0x281a1316FC1e113C8Dc8542D4E281412a28490be";
let adminName = "JM";

module.exports = function(deployer) {
  deployer.deploy(Votechain, adminAccount, adminName, {from: adminAccount});

};

// var SetValue = artifacts.require("SetValue");
// var Test = artifacts.require("Test");
// module.exports = function(deployer) {
//   deployer.deploy(SetValue).then(function () {
//     return deployer.deploy(Test, SetValue.address);
//   });
// };

