import { useEffect, useState } from "react";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [venue, setVenue] = useState("");
  const [message, setMessage] = useState("");

  const fetchEvents = async () => {
    try {
      const response = await fetch(
`${import.meta.env.VITE_API_URL}/api/events`
      );

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            event_date: eventDate,
            event_time: eventTime,
            venue,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create event"
        );
      }

      setMessage("Event added successfully!");

      setTitle("");
      setDescription("");
      setEventDate("");
      setEventTime("");
      setVenue("");

      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
      setMessage("Failed to add event.");
    }
  };

  return (
    <div className="admin-content-page">

      <div className="admin-content-header">
        <h1>Manage Events</h1>
        <p>Create and manage upcoming college events.</p>
      </div>

      <div className="admin-form-card">
        <h2>📅 Add New Event</h2>

        <form onSubmit={handleSubmit}>

          <div className="admin-form-group">
            <label>Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              rows="5"
              required
            />
          </div>

          <div className="admin-form-row">

            <div className="admin-form-group">
              <label>Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Event Time</label>
              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                required
              />
            </div>

          </div>

          <div className="admin-form-group">
            <label>Venue</label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="Example: College Auditorium"
              required
            />
          </div>

          <button type="submit" className="admin-submit-btn">
            Add Event
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
        <h2>Existing Events</h2>

        {events.length === 0 ? (
          <div className="empty-card">
            <p>No events available.</p>
          </div>
        ) : (
          <div className="admin-item-grid">

            {events.map((event) => (
              <div
                className="admin-item-card event-admin-card"
                key={event.id}
              >
                <div className="admin-item-icon">📅</div>

                <h3>{event.title}</h3>

                <p>{event.description}</p>

                <div className="admin-event-details">
                  <p>
                    <strong>📅 Date:</strong>{" "}
                    {new Date(
                      event.event_date
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>⏰ Time:</strong>{" "}
                    {event.event_time}
                  </p>

                  <p>
                    <strong>📍 Venue:</strong>{" "}
                    {event.venue}
                  </p>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}

export default AdminEvents;