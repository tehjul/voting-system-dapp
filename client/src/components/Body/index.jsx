import Administrator from "./Administrator";
import Voter from "./Voters";

function Body({ currentPage, statusesName, currentWorkflowStatusId, fetchProposals, fetchStatus, proposals, fetchOwner }) {
  return (
    <>
      {currentPage === "Administrator" ?
        <Administrator
          statusesName={statusesName}
          currentWorkflowStatusId={currentWorkflowStatusId}
          fetchStatus={fetchStatus}
          fetchOwner={fetchOwner}
        />
        :
        <Voter
          fetchProposals={fetchProposals}
          proposals={proposals}
          currentWorkflowStatusId={currentWorkflowStatusId}
        />}
    </>
  );
}

export default Body;