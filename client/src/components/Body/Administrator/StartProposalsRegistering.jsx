import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function StartProposalsRegistering() {
  const { state: { contract, accounts } } = useEth();
  const [eventValue, setEventValue] = useState("");

  const startProposalsRegistering = async () => {
    await contract.methods.startProposalsRegistering().send({ from: accounts[0] })
      .catch(revert => {
        alert(revert.message)
      })
  };

  useEffect(() => {
    (async function () {
      console.log("dans useeffect")
      await contract.events.WorkflowStatusChange({ fromBlock: "earliest" })
        .on('data', event => {
          setEventValue({
            oldStatus: event.returnValues.previousStatus,
            newStatus: event.returnValues.newStatus
          });
        })
        .on('error', err => console.log(err))
    })();
  }, [contract]);

  return (
    <>
      <button onClick={startProposalsRegistering}>Start proposals registering phase</button>
      {eventValue && <code>Successfully switched from status {eventValue.oldStatus} to {eventValue.newStatus}</code>}
    </>
  );
}

export default StartProposalsRegistering;