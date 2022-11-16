import { useEth } from "../contexts/EthContext";
import "./Wallet.css";

function Wallet() {
  const { state: { accounts } } = useEth();

  return (
    <div className="wallet">
      {accounts ?
        <p>Connected with wallet : {accounts[0]}</p>
        :
        <p>Connect your wallet first to add new proposals or to vote.</p>
      }
    </div>
  )
}

export default Wallet;