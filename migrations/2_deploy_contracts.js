var Votechain = artifacts.require("Votechain");

module.exports = function(deployer) {
  deployer.deploy(Votechain, {from: "0x0C8D9A6BBB5B79289bD93739E04366c6c27A2f05"});
};
