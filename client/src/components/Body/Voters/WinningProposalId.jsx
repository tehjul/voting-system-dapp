import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function WinningProposalId({ currentWorkflowStatusId }) {
  const { state: { contract } } = useEth();
  const [winningProposalId, setWinningProposalId] = useState("");
  const LAST_PHASE_STATUS = 5;

  const getWinningProposal = async () => {
    setWinningProposalId("");
    const value = await contract.methods.winningProposalID().call();
    if (parseInt(value) !== 0) {
      if (currentWorkflowStatusId === LAST_PHASE_STATUS) {
        setWinningProposalId("Final winner is proposal #" + value + " !");
      } else {
        setWinningProposalId("Temporary winner is proposal #" + value);
      }
    } else {
      setWinningProposalId("There's no winner at the moment");
    }
  };

  return currentWorkflowStatusId >= 3 ?
    (<div className="winning-proposal">
      <button className="interact-btn" onClick={getWinningProposal}>Winning proposal ID</button>
      {winningProposalId && <code>{winningProposalId}</code>}
    </div>)
    :
    (<></>);
}

export default WinningProposalId;