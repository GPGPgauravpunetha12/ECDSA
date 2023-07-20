const express = require("express");

const cors = require("cors");

const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { toHex, hexToBytes } = require('ethereum-cryptography/utils');

const { keccak256 } = require("ethereum-cryptography/keccak");
const {toHex, utf8ToBytes} = require("ethereum-cryptography/utils")

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03a8a13431933ea5e165a431a771890ed7b97d6c2b0f2b54c334f738fcda490863": 100,
  "035a69f84a1bf84723e4455954801782dbb8f121deb7f68e00792e890c2a8cc756": 50,
  "0375cb6d3559666ed6afe9301f62d1ad47285e7b1ef874efa8ff3d7ccd31b3ab23": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender,recipient, amount, signature, msgHash, pubAddr } = req.body;
	

  try {
    signature.r = BigInt(signature.r);
    signature.s = BigInt(signature.s);
    if (!secp256k1.verify(signature, msgHash, pubAddr)) return res.status(400).send({ message: "Invalid transaction" });
    const ra = toHex(secp256k1.getPublicKey(recipient)); 
    setInitialBalance(sender);
    setInitialBalance(ra);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[ra] += amount;
      res.send({ balance: balances[sender] });
    }
  } catch (error) {
    console.log(error.message)
  }
  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
