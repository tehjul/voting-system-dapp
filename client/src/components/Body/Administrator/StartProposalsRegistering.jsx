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
  const func = [
    [startProposalsRegistering, "Start proposals registering"],
    [endProposalsRegistering, "End proposals registering"]
  ]

  return (
    <>
      <button onClick={func[currentStatus][0]}>{func[currentStatus][1]} phase</button>
      {eventValue && <code>Successfully switched from status {eventValue.oldStatus} to {eventValue.newStatus}</code>}
    </>
  );
}

export default StartProposalsRegistering;