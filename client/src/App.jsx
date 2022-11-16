import { EthProvider } from "./contexts/EthContext";
import Main from "./components";

import "./App.css";

function App() {

  return (
    <EthProvider>
      <div id="App" >
        <Main />
      </div>
    </EthProvider>
  );
}

export default App;
