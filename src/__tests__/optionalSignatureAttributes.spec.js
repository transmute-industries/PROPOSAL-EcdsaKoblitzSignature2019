const { linkedData, keypair, creator } = require("./__fixtures__");

const { sign, verify } = require("../index");

describe("EcdsaKoblitzSignature2019", () => {
  describe("domain", () => {
    it("should support a custom domain attribute", async () => {
      expect.assertions(2);
      const domain = "example.com";
      const newSignedLinkedData = await sign({
        data: linkedData,
        creator,
        domain,
        privateKey: keypair.privateKey
      });
      const verified = await verify({
        data: newSignedLinkedData,
        publicKey: keypair.publicKey
      });
      expect(verified).toBe(true);
      expect(newSignedLinkedData.signature.domain).toBe(domain);
    });
  });

  describe("signatureAttribute", () => {
    it("should support custom signature attribute names, such as proof", async () => {
      expect.assertions(2);
      const newSignedLinkedData = await sign({
        data: linkedData,
        creator,
        signatureAttribute: "proof",
        privateKey: keypair.privateKey
      });
      expect(newSignedLinkedData.proof).toBeDefined();
      const verified = await verify({
        data: newSignedLinkedData,
        signatureAttribute: "proof",
        publicKey: keypair.publicKey
      });
      expect(verified).toBe(true);
    });
  });
});
