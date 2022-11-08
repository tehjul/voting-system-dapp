import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function WinningProposalId() {
  const { state: { contract } } = useEth();
  const [winningProposalId, setWinningProposalId] = useState("There's no winner at the moment")
  const getWinningProposal = async () => {
    const value = await contract.methods.winningProposalID().call();
    if (parseInt(value) !== 0) setWinningProposalId(value);
  };

  return (
    <>
      <button onClick={getWinningProposal}>Winning proposal ID</button>
      <code>{winningProposalId}</code>
    </>
  );
}

export default WinningProposalId;