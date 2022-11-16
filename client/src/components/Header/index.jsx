import Title from "./Title";
import ContractInformations from "./ContractInformations";
import MenuButtons from "./MenuButtons";
import { useEth } from "../../contexts/EthContext";
import { useEffect } from "react";

function Header({ setCurrentPage, currentWorkflowStatus, fetchStatus, fetchOwner, owner }) {
  const { state: { accounts } } = useEth();

  useEffect(() => {
    fetchStatus();
    fetchOwner();
  }, [fetchStatus, fetchOwner]);

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
    </>
  );
}

export default Header;
