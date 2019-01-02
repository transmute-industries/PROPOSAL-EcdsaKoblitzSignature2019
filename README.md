# PROPOSAL EcdsaKoblitzSignature2019

[![Build Status](https://travis-ci.org/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019.svg?branch=master)](https://travis-ci.org/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019) [![codecov](https://codecov.io/gh/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019/branch/master/graph/badge.svg)](https://codecov.io/gh/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019)

## Motivation

Standards for JSON-LD Signatures provide clear guidance on required attributes for cryptographic suites, yet support for raw EC cryptography is poor, and many implementations are overly coupled to bitcoin or ethereum libraries. 

We set out to provide a reference implementation in javascript.

#### [canonicalization algorithm: URDNA2015](https://github.com/digitalbazaar/jsonld.js/#canonize-normalize)

#### [message digest algorithm: sha256](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options)

#### [signature algorithm: secp256k1 ecdsa](https://github.com/indutny/elliptic#ecdsa)

`signatureValue` is base64urlencoded concatonation of hex encoded r, s, recoveryParam.

`prepareForSigning` transforms a javascript objects similar to the approach used in `RsaSignature2017`, [used by mastodon](https://github.com/tootsuite/mastodon/blob/cabdbb7f9c1df8007749d07a2e186bb3ad35f62b/app/lib/activitypub/linked_data_signature.rb#L19). 

_This transformation should be formalized, as it relies on both the `message digest algorithm` and `canonicalization algorithm`._

`signatureAttribute` can be used to select an alternative property name, such as `proof` required by the [DID spec](https://w3c-ccg.github.io/did-spec/#proof-optional).


## Related W3C Works

#### [Linked Data Cryptographic Suite Registry](https://w3c-ccg.github.io/ld-cryptosuite-registry/)

#### [Linked Data Signatures](https://w3c-dvcg.github.io/ld-signatures/#introduction)
