import Administrator from "./Administrator";
import Voter from "./Voters";

function Body({ currentPage, setcurrentWorkflowStatus, statusesName, setProposals }) {
  return (
    <>
      {currentPage === "Administrator" ?
        <Administrator
          setcurrentWorkflowStatus={setcurrentWorkflowStatus}
          statusesName={statusesName}
        />
        :
        <Voter
          setProposals={setProposals}
        />}
    </>
  );
}

export default Body;