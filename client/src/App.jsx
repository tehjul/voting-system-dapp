import { EthProvider } from "./contexts/EthContext";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import "./App.css";
import { useState, useMemo } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("Voter");
  const [currentWorkflowStatus, setcurrentWorkflowStatus] = useState("");
  const statusesName = useMemo(() =>
    [
      "Registering voters",
      "Proposals registration started",
      "Proposals registration ended",
      "Voting session started",
      "Voting session ended",
      "Votes tallied"
    ], []);

  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Header
            setCurrentPage={setCurrentPage}
            currentWorkflowStatus={currentWorkflowStatus}
            setcurrentWorkflowStatus={setcurrentWorkflowStatus}
            statusesName={statusesName}
          />
          <hr />
          <Body
            currentPage={currentPage}
            setcurrentWorkflowStatus={setcurrentWorkflowStatus}
            statusesName={statusesName}
          />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
