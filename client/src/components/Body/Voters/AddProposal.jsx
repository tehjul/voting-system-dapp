import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function AddProposal({ setProposals }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [eventValue, setEventValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const addProposal = async () => {
    if (inputValue === "") {
      alert("Please enter a description.");
      return;
    }
    setEventValue("");
    await contract.methods.addProposal(inputValue).send({ from: accounts[0] }).catch(revert => {
      alert(revert.message)
    });
    try {
      const _proposals = await contract.methods.getProposals().call({ from: accounts[0] });
      setProposals(_proposals);
    } catch (err) {
      console.log(err);
    };
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
    <>
      <input
        type="text"
        placeholder="description"
        value={inputValue}
        onChange={handleInputChange}
      ></input>
      <button onClick={addProposal}>Add proposal</button>
      {eventValue && <code>Successfully added proposal "{inputValue}" with id {eventValue}</code>}
    </>
  );
}

export default AddProposal;