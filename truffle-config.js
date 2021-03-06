const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gas: 20000000
    },

    deployment: {
      host: "192.168.43.239",
      port: 8501,
      network_id: "*",
      gas: 20000000
    },
  },

  compilers: {
    solc: {
      version: "^0.5.0",
      
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }

};
