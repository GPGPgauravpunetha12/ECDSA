// // this is used for generating the users
// const {secp256k1}=require("ethereum-cryptography/secp256k1");//used for generqating random prvate keys
// const {toHex} =require("ethereum-cryptography/utils");//hexadecimal format '
// const { keccak256 }  =require("ethereum-cryptography/keccak");
// const privateKey=secp256k1.utils.randomPrivateKey();
// console.log(typeof(privateKey)) 
// console.log('private key:',toHex(privateKey));
// const publicKey=secp256k1.getPublicKey(privateKey);
// console.log('public key:',toHex(sha256(utf8ToBytes(publicKey))));
// const Ethaddress = '0x'+toHex(keccak256(publicKey.slice(1)).slice(-20));
// console.log('Etherum address: ', Ethaddress);

const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")

const privatekey = secp.utils.randomPrivateKey()

console.log("privateKey", toHex(privatekey))

const publicKey = secp.getPublicKey(privatekey)

console.log("publicKey", toHex(publicKey))