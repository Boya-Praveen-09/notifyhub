import { useEffect, useState } from "react";

function AdminQueries() {
  const [queries, setQueries] = useState([]);
  const [message, setMessage] = useState("");

  const fetchQueries = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/queries`
      );

      const data = await response.json();
      setQueries(data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/queries/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      setMessage("Query status updated successfully!");
      fetchQueries();
    } catch (error) {
      console.error("Error updating query:", error);
      setMessage("Failed to update query status.");
    }
  };

  return (
    <div className="admin-content-page">

      <div className="admin-content-header">
        <h1>Manage Student Queries</h1>
        <p>Review and respond to questions submitted by students.</p>
      </div>

      {message && (
        <p className="admin-success">
          {message}
        </p>
      )}

      {queries.length === 0 ? (
        <div className="empty-card">
          <div className="admin-item-icon">💬</div>
          <h3>No Student Queries</h3>
          <p>There are currently no queries to review.</p>
        </div>
      ) : (
        <div className="query-grid">

          {queries.map((query) => (
            <div className="query-card" key={query.id}>

              <div className="query-header">
                <div>
                  <span className="query-number">
                    Query #{query.id}
                  </span>
                  <h2>{query.student_name}</h2>
                </div>

                <span
                  className={
                    query.status === "Resolved"
                      ? "status-badge resolved"
                      : "status-badge pending"
                  }
                >
                  {query.status}
                </span>
              </div>

              <div className="query-details">

                <p>
                  <strong>📧 Email:</strong>{" "}
                  {query.email}
                </p>

                <div className="question-box">
                  <strong>💬 Question</strong>
                  <p>{query.question}</p>
                </div>

                <small>
                  Submitted:{" "}
                  {new Date(
                    query.created_at
                  ).toLocaleDateString()}
                </small>

              </div>

              {query.status !== "Resolved" && (
                <button
                  onClick={() =>
                    updateStatus(query.id, "Resolved")
                  }
                  className="resolve-btn"
                >
                  ✓ Mark as Resolved
                </button>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AdminQueries;