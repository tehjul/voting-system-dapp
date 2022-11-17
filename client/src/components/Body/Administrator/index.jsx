import AddVoter from "./AddVoter";
import NextPhase from "./NextPhase";
import TransferOwnership from "./TransferOwnership";

function Administrator({ statusesName, currentWorkflowStatusId, fetchStatus, fetchOwner }) {
  return (
    <>
      <NextPhase
        statusesName={statusesName}
        currentWorkflowStatusId={currentWorkflowStatusId}
        fetchStatus={fetchStatus}
      />

      <hr />

      {currentWorkflowStatusId === 0 &&
        <>
          <AddVoter />
          <hr />
        </>
      }

      <TransferOwnership
        fetchOwner={fetchOwner}
      />
    </>
  );
}

export default Administrator;