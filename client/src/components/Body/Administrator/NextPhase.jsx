import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function NextPhase({ statusesName, currentWorkflowStatusId, fetchStatus }) {
  const { state: { contract, accounts } } = useEth();
  const [eventValue, setEventValue] = useState("");
  const buttonNames = [
    "Start proposals registration",
    "End proposals registration",
    "Start voting session",
    "End voting session",
    "Tally votes",
    "Disabled"
  ];

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
          let _oldStatus = event.returnValues.previousStatus;
          let _newStatus = event.returnValues.newStatus
          setEventValue({
            oldStatus: _oldStatus,
            newStatus: _newStatus
          });
          fetchStatus();
        })
        .on('error', err => console.log(err))
    })();
  }, [contract, fetchStatus]);

  const functions = [
    startProposalsRegistering,
    endProposalsRegistering,
    startVotingSession,
    endVotingSession,
    tallyVotes,
    finalPhase
  ]

  const handleNextPhaseClick = async () => {
    functions[currentWorkflowStatusId]();
  }

  return (
    <div className="next-phase">
      <h2>Status managment</h2>
      <button className="interact-btn" disabled={currentWorkflowStatusId >= 5} onClick={handleNextPhaseClick}>{buttonNames[currentWorkflowStatusId]}</button>
      {eventValue && <code>Successfully switched from {statusesName[eventValue.oldStatus]} to {statusesName[eventValue.newStatus]}</code>}
    </div>
  );
}

export default NextPhase;