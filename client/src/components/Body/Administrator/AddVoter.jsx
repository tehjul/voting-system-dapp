import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth";
import "./AddVoter.css";

function AddVoter() {
  const { state: { contract, web3, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [eventValue, setEventValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const addVoter = async () => {
    if (inputValue === "") {
      alert("Please enter a voter address.");
      return;
    }
    if (web3.utils.isAddress(inputValue)) {
      setEventValue("");
      await contract.methods.addVoter(inputValue).send({ from: accounts[0] }).catch(revert => {
        alert(revert.message)
      })
    } else {
      alert("Invalid address");
    }
  };

  useEffect(() => {
    (async function () {
      await contract.events.VoterRegistered({ fromBlock: "earliest" })
        .on('data', event => {
          let lesevents = event.returnValues.voterAddress;
          setEventValue(lesevents);
        })
        .on('error', err => console.log(err))
    })();
  }, [contract])

  return (
    <div className="voter-managment">
      <h2>Voters managment</h2>
      <div className="voter">
        <input
          className="address"
          type="text"
          placeholder="voter address"
          value={inputValue}
          onChange={handleInputChange}
        ></input>
        <button onClick={addVoter}>Register a voter</button>
        {eventValue && <code>Successfully added address {eventValue}</code>}
      </div>

    </div>
  );
}

export default AddVoter;