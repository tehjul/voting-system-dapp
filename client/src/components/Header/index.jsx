import Title from "./Title";
import ContractInformations from "./ContractInformations";
import MenuButtons from "./MenuButtons";
import { useEth } from "../../contexts/EthContext";
import { useState, useEffect } from "react";
import Proposals from "./Proposals";

function Header({ setCurrentPage, currentWorkflowStatus, setcurrentWorkflowStatus, statusesName, proposals, setProposals }) {
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
    };

    async function fetchStatus() {
      try {
        setcurrentWorkflowStatus(statusesName[currentStatus]);
      } catch (err) {
        setcurrentWorkflowStatus("");
      }
    };

    fetchOwner();
    fetchStatus();
  }, [accounts, owner, contract, statusesName, currentStatus, setcurrentWorkflowStatus]);

  function isOwner() {
    if (owner && accounts) return owner === accounts[0];
    return false;
  }

  return (
    <>
      <Title />
      <MenuButtons
        setCurrentPage={setCurrentPage}
        isOwner={isOwner()}
      />
      <ContractInformations
        owner={owner}
        accounts={accounts}
        currentWorkflowStatus={currentWorkflowStatus}
      />
      <Proposals
        proposals={proposals}
        setProposals={setProposals}
      />
    </>
  );
}

export default Header;
