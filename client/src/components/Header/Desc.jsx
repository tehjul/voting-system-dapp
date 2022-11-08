import { useEth } from "../../contexts/EthContext";

function Desc() {
  const { state: { accounts } } = useEth();
  return (
    <>
      {
        accounts ?
          <p>Connected with wallet {accounts[0]}</p>
          :
          <p>Connect your wallet first to add new proposals or to vote.</p>
      }
    </>

  );
}

export default Desc;
