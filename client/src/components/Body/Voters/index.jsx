import Proposals from "./Proposals";
import WinningProposalId from "./WinningProposalId";
import GetVoter from "./GetVoter";
import GetOneProposal from "./GetOneProposal";
import AddProposal from "./AddProposal";
import SetVote from "./SetVote";

function Voter({ fetchProposals, proposals, currentWorkflowStatusId }) {

  return (
    <>
      <Proposals
        proposals={proposals}
        fetchProposals={fetchProposals}
      />

      <hr />

      <WinningProposalId
        currentWorkflowStatusId={currentWorkflowStatusId}
      />
      <GetVoter />
      <GetOneProposal
        currentWorkflowStatusId={currentWorkflowStatusId}
      />

      <hr />

      <AddProposal
        fetchProposals={fetchProposals}
      />

      <hr />

      <SetVote
        fetchProposals={fetchProposals}
      />
    </>
  );
}

export default Voter;