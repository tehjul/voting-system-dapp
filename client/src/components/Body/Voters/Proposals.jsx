import { useEffect } from "react";
import "./Proposals.css";

function Proposals({ proposals, fetchProposals }) {

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  return (
    <div>
      <h2>All proposals</h2>
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
                if (index > 0) {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{proposal[0]}</td>
                      <td>{proposal[1]}</td>
                    </tr>
                  )
                }
                return "";
              })}
            </tbody>
          </table>

        )}
    </div>

  );
}

export default Proposals;
