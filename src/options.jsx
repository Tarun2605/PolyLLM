import React, { useEffect, useState } from 'react';

export default function Options() {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    chrome.storage.local.get(["apiKey"]).then((res) => {
      setApiKey(res.apiKey || "");
    });
  }, []);

  const saveKey = () => {
    chrome.storage.local.set({ apiKey }).then(() => {
      alert("API Key saved.");
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Google Gemini API Key</h2>
      <input
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter your API Key"
        style={{ width: '100%', padding: 8 }}
      />
      <button onClick={saveKey} style={{ marginTop: 10 }}>Save</button>
    </div>
  );
}