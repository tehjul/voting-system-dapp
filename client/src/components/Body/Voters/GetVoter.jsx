import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function GetVoter() {
  const { state: { contract, web3, accounts } } = useEth();
  const [voter, setVoter] = useState();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const getVoter = async () => {
    if (inputValue === "") {
      alert("Please enter a voter address.");
      return;
    }
    if (web3.utils.isAddress(inputValue)) {
      setVoter("");
      await contract.methods.getVoter(inputValue).call({from: accounts[0]}).then(
        data => {
          setVoter({
            registered: data.isRegistered ? "Yes" : "No",
            voted: data.hasVoted ? "Yes" : "No",
            votedFor: data.hasVoted ? data.votedProposalId : "",
          })
        }
      ).catch(revert => {
        alert(revert)
      })
    } else {
      alert("Invalid address");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="voter address"
        value={inputValue}
        onChange={handleInputChange}
      ></input>
      <button onClick={getVoter}>Get a voter informations</button>
      {voter && <code>
        Registered : {voter.registered} /
        Has voted : {voter.voted} /
        Voted for proposal ID : {voter.votedFor} 
      </code>}
    </>
  );
}

export default GetVoter;