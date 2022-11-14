import AddVoter from "./AddVoter";
import StartProposalsRegistering from "./StartProposalsRegistering";

function Administrator() {
  return (
    <>
      <div>
        <StartProposalsRegistering />
      </div>
      <hr />
      <div>
        <AddVoter />
      </div>


    </>
  );
}

export default Administrator;