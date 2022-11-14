import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function StartProposalsRegistering() {
  const { state: { contract, accounts, currentStatus } } = useEth();
  const [eventValue, setEventValue] = useState("");

  const startProposalsRegistering = async () => {
    await contract.methods.startProposalsRegistering().send({ from: accounts[0] })
      .catch(revert => {
        alert(revert.message)
      })
  };

  const endProposalsRegistering = async () => {
    await contract.methods.endProposalsRegistering().send({ from: accounts[0] })
      .catch(revert => {
        alert(revert.message)
      })
  };

  useEffect(() => {
    (async function () {
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

  // TODO: to refactor
  // const a = new Map([['1 Item', 'abc'], ['2 Item', 'def']]);
  // let indexVal =   [...a][1];
  // console.log(indexVal);
  const functions = [
    startProposalsRegistering,
    endProposalsRegistering,
  ]

  return (
    <>
      <button onClick={functions[currentStatus]}>Start next phase</button>
      {eventValue && <code>Successfully switched from status {eventValue.oldStatus} to {eventValue.newStatus}</code>}
    </>
  );
}

export default StartProposalsRegistering;