import { useEffect } from "react";
import { useEth } from "../../contexts/EthContext";

function Proposals({ proposals, setProposals }) {
  const { state: { accounts, contract, currentStatus } } = useEth();

  useEffect(() => {
    async function fetchProposals() {
      if (currentStatus > 0) {
        try {
          const proposals = await contract.methods.getProposals().call({ from: accounts[0] });
          setProposals(proposals);
        } catch (err) {
          setProposals("");
        }
      }
    };
    fetchProposals();
  }, [accounts, contract, currentStatus, setProposals]);

  return (
    <div>
      <h4>Proposals</h4>
      {proposals &&
        (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Vote Count</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{proposal[0]}</td>
                    <td>{proposal[1]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

        )}
    </div>

  );
}

export default Proposals;
