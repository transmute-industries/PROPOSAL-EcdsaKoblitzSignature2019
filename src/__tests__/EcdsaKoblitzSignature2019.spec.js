const EC = require("elliptic").ec;
const secp256k1 = new EC("secp256k1");

const {
  linkedData,
  signedLinkedData,
  keypair,
  creator
} = require("./__fixtures__");

const { sign, verify } = require("../index");

describe("EcdsaKoblitzSignature2019", () => {
  it("should support sign and verify of linked data", async () => {
    expect.assertions(1);
    const newSignedLinkedData = await sign({
      data: linkedData,
      creator,
      privateKey: keypair.privateKey
    });
    const verified = await verify({
      data: newSignedLinkedData,
      publicKey: keypair.publicKey
    });
    expect(verified).toBe(true);
  });

  it("should throw an error when attempting to sign a string", async () => {
    expect.assertions(1);
    try {
      await sign({
        data: "linkedData",
        creator,
        privateKey: keypair.privateKey
      });
    } catch (e) {
      expect(e.message).toBe("Strings are not supported.");
    }
  });

  it("should verify signed linked data", async () => {
    expect.assertions(1);
    const verified = await verify({
      data: signedLinkedData,
      publicKey: keypair.publicKey
    });
    expect(verified).toBe(true);
  });

  it("should support sign and verify with a generated key", async () => {
    const newKey = secp256k1.genKeyPair();
    const newKeypairHex = {
      publicKey: newKey.getPublic("hex"),
      privateKey: newKey.getPrivate("hex")
    };

    const newSignedLinkedData = await sign({
      data: linkedData,
      creator,
      privateKey: newKeypairHex.privateKey
    });
    const verified = await verify({
      data: newSignedLinkedData,
      publicKey: newKeypairHex.publicKey
    });
    expect(verified).toBe(true);
  });

  it("should error when signature is not correct length", async () => {
    expect.assertions(1);
    signedLinkedData.signature.signatureValue = "broken";
    try {
      await verify({
        data: signedLinkedData,
        publicKey: keypair.publicKey
      });
    } catch (e) {
      expect(e.message).toBe("Signature length is not correct.");
    }
  });
});
