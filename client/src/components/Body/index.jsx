import Administrator from "./Administrator";
import Voter from "./Voters";

function Body({ currentPage, setcurrentWorkflowStatus }) {
  return (
    <>
      {currentPage === "Administrator" ? <Administrator setcurrentWorkflowStatus={setcurrentWorkflowStatus} /> : <Voter />}
    </>
  );
}

export default Body;