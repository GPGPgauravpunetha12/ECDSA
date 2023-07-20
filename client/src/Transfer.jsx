import { useState } from 'react'
import server from './server'
import { secp256k1 } from 'ethereum-cryptography/secp256k1'
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils'
import { keccak256 } from 'ethereum-cryptography/keccak'

function Transfer({ address, setBalance, privAddr }) {
  const [sendAmount, setSendAmount] = useState('')
  const [recipient, setRecipient] = useState('')

  const setValue = (setter) => (evt) => setter(evt.target.value)

  async function transfer(evt) {
    evt.preventDefault()

    if (!privAddr) {
      alert('Missing wallet!')
      return
    }

    if (confirm('Sign message')) {
      const body = { sender: address, recipient, amount: parseInt(sendAmount) }
      const msgHash = hashMessage(body)
      const signature = secp256k1.sign(msgHash, privAddr)
      const pubAddr = signature.recoverPublicKey(msgHash).toHex()
      try {
        const {
          data: { balance },
        } = await server.post(`send`, {
          ...body,
          signature: JSON.parse(
            JSON.stringify(signature, (key, value) =>
              typeof value === 'bigint' ? value.toString() : value,
            ),
          ),
          msgHash,
          pubAddr,
        })
        setBalance(balance)
      } catch (ex) {
        alert(ex.error)
      }
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  )
}

export default Transfer
function hashMessage(msg) {
  const hash = keccak256(utf8ToBytes(JSON.stringify(msg)))
  return toHex(hash)
}
