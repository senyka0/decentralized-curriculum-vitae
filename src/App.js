import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navibar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { CVs } from "./pages/CVs";
import { AddCV } from "./pages/AddCV";
import { CIDs } from "./pages/CIDs";
import { User } from "./pages/User";

export const App = () => {
  return (
    <div className="App">
      <Navibar />
      <Routes>
        <Route path="/decentralized-curriculum-vitae" element={<Home />} />
        <Route path="/CVs" element={<CVs />} />
        <Route path="/AddCV" element={<AddCV />} />
        <Route path="/CVs/:address" element={<CIDs />} />
        <Route path="/CVs/:address/:cid" element={<User />} />
      </Routes>
    </div>
  );
};
