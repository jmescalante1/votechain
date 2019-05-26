var Votechain = artifacts.require("Votechain");

// const adminAccount = "0x1727a64f98296a7964c91bAd94641Cb10d2825A4";
const adminAccount = '0x614774361D22dBeeFB9ba399541646d4495166F1'
const adminName = "JM";

module.exports = function(deployer) {
  deployer.deploy(Votechain, adminAccount, adminName, {from: adminAccount, value: '0x152D02C7E14AF6800000'})
};

// var SetValue = artifacts.require("SetValue");
// var Test = artifacts.require("Test");
// module.exports = function(deployer) {
//   deployer.deploy(SetValue).then(function () {
//     return deployer.deploy(Test, SetValue.address);
//   });
// };

