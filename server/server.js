const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access token required",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid or expired token",
      });
    }

    req.user = user;
    next();
  });
}

require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test database connection
pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    console.error("Database connection failed:", error.message);
  } else {
    console.log("Database connected successfully!");
    console.log("Database time:", result.rows[0].now);
  }
});

// Backend test route
app.get("/", (req, res) => {
  res.json({
    message: "NotifyHub backend is running!",
  });
});

// Get all announcements
app.get("/api/announcements", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM announcements ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching announcements:", error);

    res.status(500).json({
      message: "Failed to fetch announcements",
    });
  }
});

// Create a new announcement
app.post(
  "/api/announcements",
  authenticateToken,
  async (req, res) => {
      try {
    const { title, description, category } = req.body;

    const result = await pool.query(
      `INSERT INTO announcements (title, description, category)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, description, category]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating announcement:", error);

    res.status(500).json({
      message: "Failed to create announcement",
    });
  }
});

// Get all events
// Get all events
app.get("/api/events", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY event_date ASC, event_time ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching events:", error);

    res.status(500).json({
      message: "Failed to fetch events",
    });
  }
});

// Create a new event
app.post(
  "/api/events",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        title,
        description,
        event_date,
        event_time,
        venue,
      } = req.body;

      const result = await pool.query(
        `INSERT INTO events
         (title, description, event_date, event_time, venue)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
          title,
          description,
          event_date,
          event_time,
          venue,
        ]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error creating event:", error);

      res.status(500).json({
        message: "Failed to create event",
      });
    }
  }
);

// Get all queries
app.get("/api/queries", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM queries ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching queries:", error);

    res.status(500).json({
      message: "Failed to fetch queries",
    });
  }
});

// Submit a new query
app.post("/api/queries", async (req, res) => {
  try {
    const { student_name, email, question } = req.body;

    const result = await pool.query(
      `INSERT INTO queries
       (student_name, email, question)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [student_name, email, question]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error submitting query:", error);

    res.status(500).json({
      message: "Failed to submit query",
    });
  }
});

app.put(
  "/api/queries/:id",
  authenticateToken,
  async (req, res) => {
      try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE queries
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Query not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating query:", error);

    res.status(500).json({
      message: "Failed to update query",
    });
  }
});
// Admin login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM admins WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const admin = result.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});

// Start server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(
      `NotifyHub server running on http://localhost:${PORT}`
    );
  });
}

module.exports = app;