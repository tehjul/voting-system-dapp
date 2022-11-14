import Welcome from "./Welcome";
import Desc from "./Desc";
import MenuButtons from "./MenuButtons";
import { useEth } from "../../contexts/EthContext";
import { useState, useEffect } from "react";

function Header({ setCurrentPage, currentWorkflowStatus }) {
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
    }
    fetchOwner();
  }, [owner, contract]);

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
