import AddVoter from "./AddVoter";
import NextPhase from "./NextPhase";

function Administrator({setcurrentWorkflowStatus}) {
  return (
    <>
      <div>
        <NextPhase setcurrentWorkflowStatus={setcurrentWorkflowStatus} />
      </div>
      <hr />
      <div>
        <AddVoter />
      </div>


    </>
  );
}

export default Administrator;