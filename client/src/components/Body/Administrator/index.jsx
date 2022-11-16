import AddVoter from "./AddVoter";
import NextPhase from "./NextPhase";

function Administrator({ setcurrentWorkflowStatus, statusesName, fetchStatus }) {
  return (
    <>
      <div>
        <NextPhase
          setcurrentWorkflowStatus={setcurrentWorkflowStatus}
          statusesName={statusesName}
          fetchStatus={fetchStatus}
        />
      </div>
      <hr />
      <div>
        <AddVoter />
      </div>


    </>
  );
}

export default Administrator;