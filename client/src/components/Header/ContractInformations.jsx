function ContractInformations({owner, accounts, currentWorkflowStatus}) {

  return (
    <>
    <h4>Current administrator is : {owner}</h4>
    <h4>Current phase is : {currentWorkflowStatus}</h4>
      {
        accounts ?
          <p>Connected with wallet : {accounts[0]}</p>
          :
          <p>Connect your wallet first to add new proposals or to vote.</p>
      }
    </>

  );
}

export default ContractInformations;
