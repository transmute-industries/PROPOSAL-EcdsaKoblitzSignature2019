const moment = require("moment");
const crypto = require("crypto");

const base64url = require("base64url");
const EC = require("elliptic").ec;

const secp256k1 = new EC("secp256k1");

const { sha256, prepareForSigning } = require("./helpers");

const leftpad = data => {
  return "0".repeat(64 - data.length) + data;
};

const now = () => {
  return moment.utc().toISOString();
};

const nonce = () => {
  return crypto.randomBytes(16).toString("hex");
};

const signatureObjectToBase64URLEncodedString = ({ r, s, recoveryParam }) => {
  const signatureToken = Buffer.alloc(65);
  Buffer.from(r, "hex").copy(signatureToken, 0);
  Buffer.from(s, "hex").copy(signatureToken, 32);
  signatureToken[64] = recoveryParam;
  return base64url.encode(signatureToken);
};

const signatureTokenToObject = signature => {
  const signatureBuffer = base64url.toBuffer(signature);
  if (signatureBuffer.length !== 65)
    throw new Error("Signature length is not correct.");
  const r = signatureBuffer.slice(0, 32).toString("hex");
  const s = signatureBuffer.slice(32, 64).toString("hex");
  const signatureObject = { r, s };
  signatureObject.recoveryParam = signatureBuffer[64];
  return signatureObject;
};

const sign = async ({
  data,
  creator,
  domain,
  privateKey,
  signatureAttribute
}) => {
  if (!creator) {
    throw new Error("creator is required.");
  }
  if (!signatureAttribute) {
    signatureAttribute = "signature";
  }
  const options = {
    type: "EcdsaKoblitzSignature2019",
    creator,
    domain,
    nonce: nonce(),
    created: now()
  };

  if (!domain) {
    delete options["domain"];
  }

  const toBeSigned = Buffer.from(
    sha256(await prepareForSigning(data, options, signatureAttribute)),
    "hex"
  );

  const signature = secp256k1.sign(
    toBeSigned,
    secp256k1.keyFromPrivate(privateKey)
  );

  const signatureValues = {
    r: leftpad(signature.r.toString("hex")),
    s: leftpad(signature.s.toString("hex")),
    recoveryParam: signature.recoveryParam
  };

  return {
    ...data,
    [signatureAttribute]: {
      ...options,
      signatureValue: signatureObjectToBase64URLEncodedString(signatureValues)
    }
  };
};

const verify = async ({ data, publicKey, signatureAttribute }) => {
  if (!signatureAttribute) {
    signatureAttribute = "signature";
  }
  const signatureObject = signatureTokenToObject(
    data[signatureAttribute].signatureValue
  );
  const hash = Buffer.from(
    sha256(
      await prepareForSigning(
        data,
        data[signatureAttribute],
        signatureAttribute
      )
    ),
    "hex"
  );
  const recoveredKey = secp256k1.recoverPubKey(
    hash,
    signatureObject,
    signatureObject.recoveryParam
  );
  return recoveredKey.encode("hex") === `${publicKey}`;
};
module.exports = {
  sign,
  verify
};
