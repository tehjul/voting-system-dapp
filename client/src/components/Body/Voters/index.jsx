import Proposals from "./Proposals";
import WinningProposalId from "./WinningProposalId";
import GetVoter from "./GetVoter";
import GetOneProposal from "./GetOneProposal";
import AddProposal from "./AddProposal";
import SetVote from "./SetVote";

function Voter({ fetchProposals, proposals }) {

  return (
    <>
      <Proposals
        proposals={proposals}
        fetchProposals={fetchProposals}
      />

      <hr />

      <WinningProposalId />
      <GetVoter />
      <GetOneProposal />

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