const linkedData = require("./LinkedDataExample.json");
const signedLinkedData = require("./SignedLinkedDataExample.json");

const keypair = {
  publicKey:
    "045b767b4fcf8664e3e4c32dd41d5b4c3b88680c10946e063e4100d3c7484a563b99576ba1de98cb77366ecafd47730ed5830a6c3e7faed48010b49532d0b01585",
  privateKey: "43541f3508552e5b55e4cc259d571665925dd2a8525c4efe28190879e70dcf33"
};

const creator = "http://example.com:1337/user/did:example:123#main-key";

module.exports = {
  linkedData,
  signedLinkedData,
  keypair,
  creator
};
