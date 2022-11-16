import Administrator from "./Administrator";
import Voter from "./Voters";

function Body({ currentPage, setcurrentWorkflowStatus, statusesName, fetchProposals, fetchStatus }) {
  return (
    <>
      {currentPage === "Administrator" ?
        <Administrator
          setcurrentWorkflowStatus={setcurrentWorkflowStatus}
          statusesName={statusesName}
          fetchStatus={fetchStatus}
        />
        :
        <Voter
          fetchProposals={fetchProposals}
        />}
    </>
  );
}

export default Body;