// import logo from './logo.svg';
import "./App.css";
import { ExchangeTable } from "./Components/ExchangeTable";
import {ExchangeToolBar} from "./Components/ExchangeToolBar";

function App() {
  
  return (
    <div className="container p-3">
      <ExchangeToolBar />
      <ExchangeTable />
    </div>
  );
}

export default App;
//