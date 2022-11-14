import Welcome from "./Welcome";
import Desc from "./Desc";
import MenuButtons from "./MenuButtons";
import { useEth } from "../../contexts/EthContext";
import { useState, useEffect } from "react";

function Header({ setCurrentPage, currentWorkflowStatus, setcurrentWorkflowStatus, statusesName }) {
  const { state: { accounts, contract, currentStatus } } = useEth();
  const [owner, setOwner] = useState("");

  useEffect(() => {
    async function fetchOwner() {
      try {
        const currentOwner = await contract.methods.owner().call();
        setOwner(currentOwner);
      } catch (err) {
        setOwner("");
      }
    }
    async function fetchStatus() {
      try {
        setcurrentWorkflowStatus(statusesName[currentStatus]);
      } catch (err) {
        setcurrentWorkflowStatus("");
      }
    }
    fetchOwner();
    fetchStatus()
  }, [owner, contract, statusesName, currentStatus, setcurrentWorkflowStatus]);

  function isOwner() {
    if (owner && accounts) return owner === accounts[0];
    return false;
  }

  return (
    <>
      <Welcome />
      <Desc owner={owner} accounts={accounts} currentWorkflowStatus={currentWorkflowStatus} />
      <MenuButtons setCurrentPage={setCurrentPage} isOwner={isOwner()} />
    </>
  );
}

export default Header;
