# PROPOSAL EcdsaKoblitzSignature2019

[![Build Status](https://travis-ci.org/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019.svg?branch=master)](https://travis-ci.org/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019) [![codecov](https://codecov.io/gh/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019/branch/master/graph/badge.svg)](https://codecov.io/gh/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019) [![Coverage Status](https://coveralls.io/repos/github/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019/badge.svg?branch=master)](https://coveralls.io/github/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019?branch=master) [![Coverage Status](https://coveralls.io/repos/github/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019/badge.svg?branch=master)](https://coveralls.io/github/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019?branch=master) [![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019/blob/master/LICENSE) [![GitHub forks](https://img.shields.io/github/forks/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019.svg?style=social&label=Fork&maxAge=2592000?style=flat-square)](https://github.com/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019#fork-destination-box) [![GitHub stars](https://img.shields.io/github/stars/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019.svg?style=social&label=Star&maxAge=2592000?style=flat-square)](https://github.com/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019/stargazers)

## Motivation

Standards for JSON-LD Signatures provide clear guidance on required attributes for cryptographic suites, yet support for raw EC cryptography is poor, and many implementations are overly coupled to bitcoin or ethereum libraries. 

We set out to provide a reference implementation in JavaScript.

#### [canonicalization algorithm: URDNA2015](https://github.com/digitalbazaar/jsonld.js/#canonize-normalize)

#### [message digest algorithm: sha256](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options)

#### [signature algorithm: secp256k1 ecdsa](https://github.com/indutny/elliptic#ecdsa)

`signatureValue` is base64urlencoded concatonation of hex encoded r, s, recoveryParam.

`createVerifyData` transforms a javascript objects similar to the approach used in `RsaSignature2017`, [used by mastodon](https://github.com/tootsuite/mastodon/blob/cabdbb7f9c1df8007749d07a2e186bb3ad35f62b/app/lib/activitypub/linked_data_signature.rb#L19). 

createVerifyData is described [here](https://w3c-dvcg.github.io/ld-signatures/#create-verify-hash-algorithm)

`signatureAttribute` can be used to select an alternative property name, such as `proof` required by the [DID spec](https://w3c-ccg.github.io/did-spec/#proof-optional).


## W3C Links

#### [Linked Data Cryptographic Suite Registry](https://w3c-ccg.github.io/ld-cryptosuite-registry)

#### [Linked Data Signatures](https://w3c-dvcg.github.io/ld-signatures)

#### [Decentralized Identifiers](https://w3c-ccg.github.io/did-spec/)