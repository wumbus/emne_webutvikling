import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import ViewInfo from "./pages/viewInfo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginScreen/>}></Route>
        <Route path="/" element= {<LoginScreen/>}></Route>
        <Route path="/viewInfo" element={<ViewInfo/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
