import Administrator from "./Administrator";
import Voter from "./Voters";

function Body({ currentPage, setcurrentWorkflowStatus, statusesName, fetchProposals }) {
  return (
    <>
      {currentPage === "Administrator" ?
        <Administrator
          setcurrentWorkflowStatus={setcurrentWorkflowStatus}
          statusesName={statusesName}
        />
        :
        <Voter
          fetchProposals={fetchProposals}
        />}
    </>
  );
}

export default Body;