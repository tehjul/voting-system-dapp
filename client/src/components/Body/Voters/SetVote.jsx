import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function SetVote({ fetchProposals }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [eventValue, setEventValue] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const setVote = async () => {
    if (inputValue === "") {
      alert("Please enter a description.");
      return;
    }
    setEventValue("");
    await contract.methods.setVote(inputValue).send({ from: accounts[0] }).catch(revert => {
      alert(revert.message)
    });
    await fetchProposals();
  };

  useEffect(() => {
    (async function () {
      await contract;
      if (contract) {
        await contract.events.Voted({ fromBlock: "earliest" })
          .on('data', event => {
            let _voter = event.returnValues.voter;
            let _proposalId = event.returnValues.proposalId;
            setEventValue({
              voter: _voter,
              proposalId: _proposalId,
            });
          })
          .on('error', err => console.log(err))
      }
    })();
  }, [contract])

  return (
    <>
      <input
        type="text"
        placeholder="proposal id"
        value={inputValue}
        onChange={handleInputChange}
      ></input>
      <button onClick={setVote}>Vote</button>
      {eventValue && <code>{eventValue.voter} Successfully voted for proposal id {eventValue.proposalId}</code>}
    </>
  );
}

export default SetVote;