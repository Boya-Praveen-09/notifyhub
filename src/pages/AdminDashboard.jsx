import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage NotifyHub content and student queries.</p>
        </div>

        <button onClick={handleLogout} className="admin-logout">
          Logout
        </button>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <div className="admin-card-icon">📢</div>
          <h2>Announcements</h2>
          <p>
            Create and manage college announcements and important notices.
          </p>
          <button
            onClick={() => navigate("/admin/announcements")}
            className="admin-card-btn"
          >
            Manage Announcements
          </button>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon">📅</div>
          <h2>Events</h2>
          <p>
            Add and manage upcoming college events and activities.
          </p>
          <button
            onClick={() => navigate("/admin/events")}
            className="admin-card-btn"
          >
            Manage Events
          </button>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon">💬</div>
          <h2>Student Queries</h2>
          <p>
            Review student questions and update their query status.
          </p>
          <button
            onClick={() => navigate("/admin/queries")}
            className="admin-card-btn"
          >
            Manage Queries
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;