import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Announcements from "./pages/Announcements";
import Events from "./pages/Events";
import SubmitQuery from "./pages/SubmitQuery";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminEvents from "./pages/AdminEvents";
import AdminQueries from "./pages/AdminQueries";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/events" element={<Events />} />
        <Route path="/query" element={<SubmitQuery />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/announcements"
          element={
            <ProtectedRoute>
              <AdminAnnouncements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute>
              <AdminEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/queries"
          element={
            <ProtectedRoute>
              <AdminQueries />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;