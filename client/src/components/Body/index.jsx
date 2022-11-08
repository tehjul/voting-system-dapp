import Administrator from "./Administrator";
import Voter from "./Voters";

function Body({ currentPage }) {
  return (
    <>
      {currentPage === "Administrator" ? <Administrator /> : <Voter />}
    </>
  );
}

export default Body;