import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Catalog from "./components/Catalog";
import Home from "./components/Home";
import Profile from "./components/profile";

function App() {
  return (
    <Router>
      <Header />
      <div className="App"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
