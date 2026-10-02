function Home() {
  return (
    <div className="home-page">

      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to NotifyHub</h1>

          <p>
            Your one-stop platform for college announcements,
            events, and student queries.
          </p>

          <div className="hero-buttons">
            <a href="/announcements" className="hero-btn primary">
              View Announcements
            </a>

            <a href="/events" className="hero-btn secondary">
              Explore Events
            </a>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>What NotifyHub Offers</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">📢</div>
            <h3>Announcements</h3>
            <p>
              Stay updated with the latest college announcements
              and important notices.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Events</h3>
            <p>
              Discover upcoming college events, workshops,
              festivals, and activities.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Student Queries</h3>
            <p>
              Submit your questions and get them reviewed
              by the administration.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;