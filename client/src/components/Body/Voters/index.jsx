import Proposals from "./Proposals";
import WinningProposalId from "./WinningProposalId";
import GetVoter from "./GetVoter";
import GetOneProposal from "./GetOneProposal";
import AddProposal from "./AddProposal";
import SetVote from "./SetVote";

function Voter({ fetchProposals, proposals, currentWorkflowStatusId }) {

  return (
    <>
      {currentWorkflowStatusId > 0 &&
        <>
          <Proposals
            proposals={proposals}
            fetchProposals={fetchProposals}
          />
          <hr />
        </>}


      <h2>Informations</h2>
      <WinningProposalId
        currentWorkflowStatusId={currentWorkflowStatusId}
      />
      <GetVoter />
      <GetOneProposal
        currentWorkflowStatusId={currentWorkflowStatusId}
      />



      {currentWorkflowStatusId === 1 &&
        <>
          <hr />
          <AddProposal
            fetchProposals={fetchProposals}
            currentWorkflowStatusId={currentWorkflowStatusId}
          />
        </>}
      {currentWorkflowStatusId === 3 &&
        <>
          <hr />
          <SetVote
            fetchProposals={fetchProposals}
          />
        </>}
    </>
  );
}

export default Voter;