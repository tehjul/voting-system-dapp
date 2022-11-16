import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer/Footer";
import { useState, useMemo } from "react";

function Main() {
  
  const [currentPage, setCurrentPage] = useState("Voter");
  const [currentWorkflowStatus, setcurrentWorkflowStatus] = useState("");
  const [proposals, setProposals] = useState("");
  const statusesName = useMemo(() =>
    [
      "Registering voters",
      "Proposals registration started",
      "Proposals registration ended",
      "Voting session started",
      "Voting session ended",
      "Votes tallied"
    ], []);

  return (
    <div className="container">
      <Header
        setCurrentPage={setCurrentPage}
        currentWorkflowStatus={currentWorkflowStatus}
        setcurrentWorkflowStatus={setcurrentWorkflowStatus}
        statusesName={statusesName}
        proposals={proposals}
        setProposals={setProposals}
      />
      <hr />
      <Body
        currentPage={currentPage}
        setcurrentWorkflowStatus={setcurrentWorkflowStatus}
        statusesName={statusesName}
        setProposals={setProposals}
      />
      <hr />
      <Footer />
    </div>
  );
}

export default Main;
