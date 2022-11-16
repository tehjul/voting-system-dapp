import WinningProposalId from "./WinningProposalId";
import GetVoter from "./GetVoter";
import GetOneProposal from "./GetOneProposal";
import AddProposal from "./AddProposal";
import SetVote from "./SetVote";

function Voter({ fetchProposals }) {

  return (
    <>
      <h4>Informations</h4>
      <div>
        <WinningProposalId />
      </div>
      <div>
        <GetVoter />
      </div>
      <div>
        <GetOneProposal />
      </div>
      <hr />
      <h4>Proposal</h4>
      <div>
        <AddProposal
          fetchProposals={fetchProposals}
        />
      </div>
      <hr />
      <h4>Vote</h4>
      <SetVote
        fetchProposals={fetchProposals}
      />
    </>
  );
}

export default Voter;