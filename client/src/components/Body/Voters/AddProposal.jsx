import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth";
import "./AddProposal.css";

function AddProposal({ fetchProposals, currentWorkflowStatusId }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [eventValue, setEventValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const addProposal = async () => {
    if (currentWorkflowStatusId !== 1) {
      alert("Proposal registering is not the current phase.");
      return;
    }
    if (inputValue === "") {
      alert("Please enter a description.");
      return;
    }
    setEventValue("");
    await contract.methods.addProposal(inputValue).send({ from: accounts[0] }).catch(revert => {
      alert(revert.message)
    });
    await fetchProposals();
  };

  useEffect(() => {
    (async function () {
      await contract;
      if (contract) {
        await contract.events.ProposalRegistered({ fromBlock: "earliest" })
          .on('data', event => {
            let lesevents = event.returnValues.proposalId;
            setEventValue(lesevents);
          })
          .on('error', err => console.log(err))
      }
    })();
  }, [contract])

  return (
    <div className="add-proposal">
      <h2>Proposal</h2>
      <textarea
        rows="4"
        cols="50"
        type="text"
        placeholder=" description..."
        value={inputValue}
        onChange={handleInputChange}
      ></textarea>
      <button className="interact-btn" onClick={addProposal}>Add proposal</button>
      {eventValue && <code>Successfully added proposal "{inputValue}" with id {eventValue}</code>}
    </div>
  );
}

export default AddProposal;