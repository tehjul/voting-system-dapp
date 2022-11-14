import { EthProvider } from "./contexts/EthContext";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import "./App.css";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("Voter");
  const [currentWorkflowStatus, setcurrentWorkflowStatus] = useState("Registering voters");

  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Header setCurrentPage={setCurrentPage} currentWorkflowStatus={currentWorkflowStatus} />
          <hr />
          <Body currentPage={currentPage} setcurrentWorkflowStatus={setcurrentWorkflowStatus} />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
