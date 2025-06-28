import { Button, Card, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  const [context, setContext] = useState([]);
  const [prompt, setPrompt] = useState("Make it professional");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["context"], (res) => {
      setContext(res.context || []);
    });
  }, []);

  const generate = async () => {
    setLoading(true);
    chrome.storage.local.get(["geminiApiKey"], async ({ geminiApiKey }) => {
      const messages = [
        { role: "system", content: `Context: ${context.join(" | ")}` },
        { role: "user", content: prompt }
      ];
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + geminiApiKey, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: messages })
      });
      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
      setResponse(text);
      setLoading(false);
      setContext([]);
      chrome.storage.local.set({ context: [] });
    });
  };

  return (
    <div style={{ padding: 10, fontFamily: "sans-serif" }}>
      <Typography variant="h6">AI Assistant</Typography>
      {context.map((ctx, i) => (
        <Card key={i} style={{ margin: "8px 0", padding: 8 }}>{ctx}</Card>
      ))}
      <TextField
        fullWidth
        label="Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ margin: "12px 0" }}
      />
      <Button
        variant="contained"
        onClick={generate}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "Generate"}
      </Button>
      {response && (
        <Card style={{ marginTop: 12, padding: 8 }}>
          <Typography variant="body1">{response}</Typography>
        </Card>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);