import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState(""); // User input
  const [sentiment, setSentiment] = useState(""); // Sentiment result
  const [loading, setLoading] = useState(false); // Loading state

  // Function to handle form submission
  const analyzeSentiment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSentiment("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/sentiment", {
        text: text,
      });
      setSentiment(response.data.sentiment); // Set the sentiment result
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      setSentiment("Type something to analyze");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Moodify</h1>
        <form onSubmit={analyzeSentiment}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter movie name or text..."
            rows="4"
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Sentiment"}
          </button>
        </form>

        {sentiment && <h2>Sentiment: {sentiment}</h2>}
      </header>
    </div>
  );
}

export default App;
