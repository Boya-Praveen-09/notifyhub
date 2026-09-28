import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Announcements from "./pages/Announcements";
import Events from "./pages/Events";
import SubmitQuery from "./pages/SubmitQuery";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/events" element={<Events />} />
        <Route path="/query" element={<SubmitQuery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;