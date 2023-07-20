import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Heading from "./Heading";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  return (
    <div className="app">
     <Heading/>
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
      />
      <Transfer setBalance={setBalance} address={address} privAddr={privateKey}/>
    </div>
  );
}

export default App;
