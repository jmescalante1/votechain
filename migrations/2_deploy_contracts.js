var Votechain = artifacts.require("Votechain");

let deployerAddress = "0xF71204136A3155a5665Cc05B4119e1c279F65A5f"

module.exports = function(deployer) {
  deployer.deploy(Votechain, {from: deployerAddress});
};
