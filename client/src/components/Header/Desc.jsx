import { useEth } from "../../contexts/EthContext";

function Desc({owner, accounts}) {
  const { state: { currentStatus } } = useEth();
  const statuses = [
    "Registering voters",
    "Proposals registration started",
    "Proposals registration ended",
    "Voting session started",
    "Voting session ended",
    "Votes tallied"
  ]

  return (
    <>
    <h4>Current administrator is : {owner}</h4>
    <h4>Current phase is : {statuses[currentStatus]}</h4>
      {
        accounts ?
          <p>Connected with wallet : {accounts[0]}</p>
          :
          <p>Connect your wallet first to add new proposals or to vote.</p>
      }
    </>

  );
}

export default Desc;
