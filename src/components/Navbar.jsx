import { useState } from "react";

function SubmitQuery() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      email,
      question,
    });

    alert("Query submitted successfully!");

    setName("");
    setEmail("");
    setQuestion("");
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
    </div>
  );
}

export default SubmitQuery;