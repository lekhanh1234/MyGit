import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";

import Chats from "./components/Char";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Header />} /> 
          <Route path="/Home" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
