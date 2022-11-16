import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function TransferOwnership({ fetchOwner }) {
  const { state: { contract, web3, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [eventValue, setEventValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const transferOwnership = async () => {
    if (inputValue === "") {
      alert("Please enter a new owner address.");
      return;
    }
    if (web3.utils.isAddress(inputValue)) {
      setEventValue("");
      await contract.methods.transferOwnership(inputValue).send({ from: accounts[0] }).catch(revert => {
        alert(revert.message)
      });
      fetchOwner();
    } else {
      alert("Invalid address");
    }
  };

  useEffect(() => {
    (async function () {
      await contract.events.OwnershipTransferred({ fromBlock: "earliest" })
        .on('data', event => {
          let _previousOwner = event.returnValues.previousOwner;
          let _newOwner = event.returnValues.newOwner
          setEventValue({
            previousOwner: _previousOwner,
            newOwner: _newOwner
          });
        })
        .on('error', err => console.log(err))
    })();
  }, [contract])

  return (
    <div>
      <h4>Contract managment</h4>
      <input
        type="text"
        placeholder="new owner address"
        value={inputValue}
        onChange={handleInputChange}
      ></input>
      <button onClick={transferOwnership}>Transfer ownership</button>
      {eventValue && <code>Successfully transfered ownership from {eventValue.previousOwner} to address {eventValue.newOwner}</code>}
    </div>
  );
}

export default TransferOwnership;