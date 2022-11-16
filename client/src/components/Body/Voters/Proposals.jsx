import { useEffect } from "react";

function Proposals({ proposals, fetchProposals }) {

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  return (
    <div>
      <h4>All proposals</h4>
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
