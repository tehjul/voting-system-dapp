import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function GetOneProposal({currentWorkflowStatusId}) {
  const { state: { contract, accounts } } = useEth();
  const [proposal, setProposal] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const getProposal = async () => {
    setProposal("");
    if (inputValue === "") {
      alert("Please enter a proposal id.");
      return;
    }
    if (currentWorkflowStatusId === 0) {
      alert("There's no proposals yet");
      return;
    }
    if (parseInt(inputValue) === 0) {
      alert("The genesis proposal contains the private key of a wallet with 1 BTC... ;-)");
      return;
    }
    await contract.methods.getOneProposal(inputValue).call({ from: accounts[0] }).then(
      data => {
        setProposal({
          description: data.description,
          voteCount: data.voteCount
        })
      }
    ).catch(revert => {
      alert(revert.message)
    })
  };

  return (
    <div>
      <input
        type="text"
        placeholder="proposal id"
        value={inputValue}
        onChange={handleInputChange}
      ></input>
      <button onClick={getProposal}>Get a proposal informations</button>
      {proposal && (
        <>
          <code>Description : {proposal.description}</code>
          <code>Vote Count : {proposal.voteCount}</code>
        </>
      )}
    </div>
  );
}

export default GetOneProposal;