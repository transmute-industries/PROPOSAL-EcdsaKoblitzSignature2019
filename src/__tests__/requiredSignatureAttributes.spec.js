const { linkedData, keypair, creator } = require("./__fixtures__");
const { sign } = require("../index");

describe("EcdsaKoblitzSignature2019", () => {
  describe("type", () => {
    it("should be in signature", async () => {
      expect.assertions(1);
      const signedLinkedData = await sign({
        data: linkedData,
        creator,
        privateKey: keypair.privateKey
      });
      expect(signedLinkedData.signature.type).toBe("EcdsaKoblitzSignature2019");
    });
  });
  describe("creator", () => {
    it("should be in signature", async () => {
      expect.assertions(1);
      const signedLinkedData = await sign({
        data: linkedData,
        creator,
        privateKey: keypair.privateKey
      });
      expect(signedLinkedData.signature.creator).toBe(creator);
    });

    it("should throw an error when no creator is provided", async () => {
      expect.assertions(1);
      try {
        await sign({
          data: linkedData,
          privateKey: keypair.privateKey
        });
      } catch (e) {
        expect(e.message).toBe("creator is required.");
      }
    });
  });
});
