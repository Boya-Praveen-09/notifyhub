import { useState } from "react";

function SubmitQuery() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/queries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_name: name,
          email: email,
          question: question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit query");
      }

      setMessage("Query submitted successfully!");

      setName("");
      setEmail("");
      setQuestion("");
    } catch (error) {
      console.error("Error submitting query:", error);
      setMessage("Failed to submit query.");
    }
  };

  return (
    <div>
      <h1>Submit Query</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <br />

        <div>
          <label>Question</label>
          <br />
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
            rows="5"
            required
          />
        </div>

        <br />

        <button type="submit">Submit Query</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default SubmitQuery;