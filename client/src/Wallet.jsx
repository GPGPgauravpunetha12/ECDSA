

import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import {toHex, utf8ToBytes} from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    validatePrivateKey(privateKey);
    setPrivateKey(privateKey);
    const address = toHex(secp256k1.getPublicKey(privateKey)); 

    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  const validatePrivateKey = (privateKey) => {
    // Custom validation logic for the private key format and length
    if (typeof privateKey !== "string" ) {
      throw new Error("Invalid private key format. Expected a 64-character hex string.");
    }
  };

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
      Private Key
        <input placeholder="Type in a Private key" value={privateKey} onChange={onChange}></input>
      </label>
      <div>Address: 0x{address}....</div> 
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}



export default Wallet;