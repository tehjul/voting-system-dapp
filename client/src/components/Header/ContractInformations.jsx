import "./ContractInformations.css";

function ContractInformations({ owner, currentWorkflowStatus }) {

  return (
    <div className="contract-info">
      <h4>Current administrator is : {owner}</h4>
      <h4>Current phase is : {currentWorkflowStatus}</h4>
    </div>

  );
}

export default ContractInformations;
