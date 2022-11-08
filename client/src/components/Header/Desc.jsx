import { useState, useEffect } from "react";
import { useEth } from "../../contexts/EthContext";

function Desc() {
  const { state: { accounts, contract } } = useEth();
  const [owner, setOwner] = useState("");

  useEffect(() => {
    async function fetchOwner() {
      try {
        const currentOwner = await contract.methods.owner().call();
        setOwner(currentOwner);
      } catch (err) {
        setOwner("");
      }
    }
    fetchOwner();
  }, [owner, contract]);

  return (
    <>
    <h3>Current administrator is : {owner}</h3>
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
