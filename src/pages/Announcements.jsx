import { useEffect, useState } from "react";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/announcements`)
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <p className="loading-text">Loading announcements...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Announcements</h1>
        <p>Stay updated with the latest college news and notices.</p>
      </div>

      {announcements.length === 0 ? (
        <div className="empty-card">
          <p>No announcements available.</p>
        </div>
      ) : (
        <div className="announcement-grid">
          {announcements.map((announcement) => (
            <div className="announcement-card" key={announcement.id}>
              <div className="announcement-icon">📢</div>

              <h2>{announcement.title}</h2>

              <p className="announcement-description">
                {announcement.description}
              </p>

              <div className="announcement-footer">
                <span className="category-badge">
                  {announcement.category}
                </span>

                <small>
                  {new Date(announcement.created_at).toLocaleDateString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Announcements;