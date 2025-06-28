import { Button, Card, CardContent, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

export default function SidePanel() {
  const [contextItems, setContextItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const promptRef = useRef(null);

  useEffect(() => {
    chrome.storage.local.get(["contextItems"]).then((res) => {
      setContextItems(res.contextItems || []);
    });
  }, []);

  const handleGenerate = async () => {
    const prompt = promptRef.current.value.trim();
    if (!prompt) return;
    setLoading(true);

    const contextText = contextItems.join("\n");
    const fullPrompt = `Context:\n${contextText}\n\nQuestion: ${prompt}`;

    try {
      const { apiKey } = await chrome.storage.local.get(["apiKey"]);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: { text: fullPrompt } }),
        }
      );
      const data = await response.json();
      const answer = data.candidates?.[0]?.output || "No response";
      setMessages((prev) => [...prev, { role: "user", text: prompt }, { role: "assistant", text: answer }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", text: `Error: ${e.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 10, width: 300 }}>
      <h4>Context</h4>
      {contextItems.map((text, idx) => (
        <Card variant="outlined" key={idx} style={{ marginBottom: 8 }}>
          <CardContent style={{ fontSize: '0.9em' }}>{text}</CardContent>
        </Card>
      ))}

      <TextField
        inputRef={promptRef}
        label="Ask something..."
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        style={{ marginTop: 10 }}
      />
      <Button variant="contained" color="primary" onClick={handleGenerate} disabled={loading} fullWidth>
        {loading ? <CircularProgress size={24} /> : "Generate"}
      </Button>

      <div style={{ marginTop: 15 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 10 }}>
            <strong>{msg.role === "user" ? "You:" : "Gemini:"}</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}