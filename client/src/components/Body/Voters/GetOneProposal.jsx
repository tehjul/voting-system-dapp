import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function GetOneProposal() {
  const { state: { contract, web3 } } = useEth();
  const [voter, setVoter] = useState({});
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const getProposal = async e => {
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    console.log(inputValue.length);
    if (inputValue.length === 42  && web3.utils.checkAddressChecksum(inputValue)) {
      await contract.methods.getVoter(inputValue).call().then(
        data => {
          setVoter({
            registered: data.isRegistered ? "Yes" : "No",
            voted: data.hasVoted ? "Yes" : "No",
            votedFor: data.hasVoted ? data.votedProposalId : "",
          })
        }
      ).catch(revert => {
        alert(revert.message)
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
      <code>Registered : {voter.registered}</code>
    </>
  );
}

export default GetOneProposal;