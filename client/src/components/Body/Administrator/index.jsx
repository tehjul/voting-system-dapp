import AddVoter from "./AddVoter";
import NextPhase from "./NextPhase";

function Administrator({ setcurrentWorkflowStatus, statusesName }) {
  return (
    <>
      <div>
        <NextPhase
          setcurrentWorkflowStatus={setcurrentWorkflowStatus}
          statusesName={statusesName}
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