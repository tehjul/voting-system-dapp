import Title from "./Title";
import ContractInformations from "./ContractInformations";
import MenuButtons from "./MenuButtons";
import { useEth } from "../../contexts/EthContext";
import { useState, useEffect } from "react";
import Proposals from "./Proposals";

function Header({ setCurrentPage, currentWorkflowStatus, proposals, fetchStatus, fetchProposals }) {
  const { state: { accounts, contract } } = useEth();
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
    fetchStatus();
    fetchOwner();
  }, [accounts, owner, contract, fetchStatus]);

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
        fetchProposals={fetchProposals}
      />
    </>
  );
}

export default Header;
