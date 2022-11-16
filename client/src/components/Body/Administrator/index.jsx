import AddVoter from "./AddVoter";
import NextPhase from "./NextPhase";
import TransferOwnership from "./TransferOwnership";

function Administrator({ setcurrentWorkflowStatus, statusesName, fetchStatus, fetchOwner }) {
  return (
    <>
      <NextPhase
        setcurrentWorkflowStatus={setcurrentWorkflowStatus}
        statusesName={statusesName}
        fetchStatus={fetchStatus}
      />

      <hr />

      <AddVoter />

      <hr />

      <TransferOwnership
        fetchOwner={fetchOwner}
      />
    </>
  );
}

export default Administrator;