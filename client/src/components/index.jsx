import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer/Footer";
import Wallet from "./Wallet";
import { useState, useMemo } from "react";
import { useEth } from "../contexts/EthContext";

import "./index.css";

function Main() {
  const { state: { accounts, contract, currentStatus } } = useEth();
  const [currentPage, setCurrentPage] = useState("Voter");
  const [currentWorkflowStatus, setcurrentWorkflowStatus] = useState("");
  const [proposals, setProposals] = useState("");
  const [owner, setOwner] = useState("");

  const statusesName = useMemo(() =>
    [
      "Registering voters",
      "Proposals registration started",
      "Proposals registration ended",
      "Voting session started",
      "Voting session ended",
      "Votes tallied"
    ], []);

  const fetchStatus = async () => {
    try {
      const _currentStatus = await contract.methods.workflowStatus().call();
      setcurrentWorkflowStatus(statusesName[_currentStatus]);
    } catch (err) {
      setcurrentWorkflowStatus("");
    }
  };

  const fetchProposals = async () => {
    if (currentStatus > 0) {
      try {
        const proposals = await contract.methods.getProposals().call({ from: accounts[0] });
        setProposals(proposals);
      } catch (err) {
        setProposals("");
      }
    }
  };

  const fetchOwner = async () => {
    try {
      const currentOwner = await contract.methods.owner().call();
      setOwner(currentOwner);
    } catch (err) {
      setOwner("");
    }
  };

  return (
    <>
      <div className="container">
        <Wallet />
        <Header
          setCurrentPage={setCurrentPage}
          currentWorkflowStatus={currentWorkflowStatus}
          proposals={proposals}
          fetchStatus={fetchStatus}
          fetchProposals={fetchProposals}
          fetchOwner={fetchOwner}
          owner={owner}
        />
        <hr />
        <Body
          currentPage={currentPage}
          setcurrentWorkflowStatus={setcurrentWorkflowStatus}
          statusesName={statusesName}
          fetchProposals={fetchProposals}
          fetchStatus={fetchStatus}
          proposals={proposals}
          fetchOwner={fetchOwner}
        />
        <hr />
        <Footer />
      </div>
    </>

  );
}

export default Main;
