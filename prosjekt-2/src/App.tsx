import './App.css';
import { Routes, Route, HashRouter } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import ViewInfo from "./pages/viewInfo";

function App() {
  return (
    <div className="App">
      {/* <HashRouter> */}
      <Routes>
          <Route path="/project2" element={<LoginScreen/>}></Route>
          <Route path="/" element={<LoginScreen/>}></Route>
          <Route path="/viewInfo" element={<ViewInfo/>}></Route>
      </Routes>
      {/* </HashRouter> */}
    </div>
  );
}

export default App;
