import { useEffect, useState } from "react";

function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/announcements`
      );

      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/announcements`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            category,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create announcement"
        );
      }

      setMessage("Announcement added successfully!");

      setTitle("");
      setDescription("");
      setCategory("");

      fetchAnnouncements();
    } catch (error) {
      console.error("Error creating announcement:", error);
      setMessage("Failed to add announcement.");
    }
  };

  return (
    <div className="admin-content-page">

      <div className="admin-content-header">
        <h1>Manage Announcements</h1>
        <p>Create and manage college announcements.</p>
      </div>

      <div className="admin-form-card">
        <h2>📢 Add New Announcement</h2>

        <form onSubmit={handleSubmit}>

          <div className="admin-form-group">
            <label>Announcement Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter announcement description"
              rows="5"
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Example: General, Exam, Placement"
              required
            />
          </div>

          <button type="submit" className="admin-submit-btn">
            Add Announcement
          </button>

        </form>

        {message && (
          <p
            className={
              message.includes("successfully")
                ? "admin-success"
                : "admin-error"
            }
          >
            {message}
          </p>
        )}
      </div>

      <div className="existing-content">
        <h2>Existing Announcements</h2>

        {announcements.length === 0 ? (
          <div className="empty-card">
            <p>No announcements available.</p>
          </div>
        ) : (
          <div className="admin-item-grid">

            {announcements.map((announcement) => (
              <div
                className="admin-item-card"
                key={announcement.id}
              >
                <div className="admin-item-icon">📢</div>

                <h3>{announcement.title}</h3>

                <p>{announcement.description}</p>

                <div className="admin-item-footer">
                  <span className="category-badge">
                    {announcement.category}
                  </span>

                  <small>
                    {new Date(
                      announcement.created_at
                    ).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}

export default AdminAnnouncements;