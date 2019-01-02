const jsonld = require("jsonld");
const crypto = require("crypto");

const canonize = async data => {
  return jsonld.canonize(data, { algorithm: "URDNA2015" });
};

const sha256 = data => {
  const h = crypto.createHash("sha256");
  h.update(data);
  return h.digest("hex");
};

const prepareForSigning = async (linkedData, options, signatureAttribute) => {
  if (typeof linkedData === "string") {
    throw new Error("Strings are not supported.");
  }
  const tranformedOptions = {
    ...options,
    "@context": "https://w3id.org/identity/v1"
  };

  delete tranformedOptions["type"];
  delete tranformedOptions["id"];
  delete tranformedOptions["signatureValue"];

  const cannonicalOptons = await canonize(tranformedOptions);
  const linkedDataWithoutSignature = {
    ...linkedData
  };
  delete linkedDataWithoutSignature[signatureAttribute];

  const cannonicalLinkedData = await canonize(linkedDataWithoutSignature);

  const optionsHash = sha256(cannonicalOptons);
  const documentHash = sha256(cannonicalLinkedData);

  return `${optionsHash}${documentHash}`;
};

module.exports = {
  sha256,
  canonize,
  prepareForSigning
};
