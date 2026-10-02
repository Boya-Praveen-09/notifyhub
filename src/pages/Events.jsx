import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events`)
    .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <p className="loading-text">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Upcoming Events</h1>
        <p>Discover what's happening around the college.</p>
      </div>

      {events.length === 0 ? (
        <div className="empty-card">
          <p>No events available.</p>
        </div>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-icon">📅</div>

              <h2>{event.title}</h2>

              <p className="event-description">
                {event.description}
              </p>

              <div className="event-details">
                <p>
                  <strong>📅 Date:</strong>{" "}
                  {new Date(event.event_date).toLocaleDateString()}
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
  );
}

export default Events;