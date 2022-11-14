import WinningProposalId from "./WinningProposalId";
import GetVoter from "./GetVoter";
import GetOneProposal from "./GetOneProposal";
import AddProposal from "./AddProposal";

function Voter() {

  return (
    <>
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
      <div>
        <AddProposal />
      </div>

    </>
  );
}

export default Voter;