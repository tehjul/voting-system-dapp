import { useMemo } from "react";
import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function NextPhase({ setcurrentWorkflowStatus }) {
  const { state: { contract, accounts, currentStatus } } = useEth();
  const [eventValue, setEventValue] = useState("");
  
  const statusesName = useMemo(() =>
    [
      "Registering voters",
      "Proposals registration started",
      "Proposals registration ended",
      "Voting session started",
      "Voting session ended",
      "Votes tallied"
    ], []);

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

  const startVotingSession = async () => {
    await contract.methods.startVotingSession().send({ from: accounts[0] })
      .catch(revert => {
        alert(revert.message)
      })
  };

  const endVotingSession = async () => {
    await contract.methods.endVotingSession().send({ from: accounts[0] })
      .catch(revert => {
        alert(revert.message)
      })
  };

  const tallyVotes = async () => {
    await contract.methods.tallyVotes().send({ from: accounts[0] })
      .catch(revert => {
        alert(revert.message)
      })
  };

  const finalPhase = () => {
    alert("This is already the final phase..")
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
    setcurrentWorkflowStatus(statusesName[currentStatus]);
  }, [contract, currentStatus, statusesName, setcurrentWorkflowStatus]);

  const functions = [
    startProposalsRegistering,
    endProposalsRegistering,
    startVotingSession,
    endVotingSession,
    tallyVotes,
    finalPhase
  ]

  return (
    <>
      <button onClick={functions[currentStatus]}>Start next phase</button>
      {eventValue && <code>Successfully switched from status {eventValue.oldStatus} to {eventValue.newStatus}</code>}
    </>
  );
}

export default NextPhase;