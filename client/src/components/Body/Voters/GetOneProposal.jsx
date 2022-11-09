import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function GetOneProposal() {
  const { state: { contract, accounts } } = useEth();
  const [proposal, setProposal] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const getProposal = async () => {
    if (inputValue === "") {
      alert("Please enter a proposal id.");
      return;
    }
    setProposal("");
    await contract.methods.getOneProposal(inputValue).call({from: accounts[0]}).then(
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
    <>
      <input
        type="text"
        placeholder="proposal id"
        value={inputValue}
        onChange={handleInputChange}
      ></input>
      <button onClick={getProposal}>Get a proposal informations</button>
      {proposal && <code>Description : {proposal.description}</code>}
    </>
  );
}

export default GetOneProposal;