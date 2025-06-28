import React, { useEffect, useState } from 'react';

export default function Popup() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    chrome.storage.local.get(["contextItems"]).then((res) => {
      setCount(res.contextItems?.length || 0);
    });
  }, []);

  const openSidebar = () => {
    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs[0]) chrome.sidePanel.open({ tabId: tabs[0].id });
    });
  };

  return (
    <div style={{ padding: 10 }}>
      <h3>Gemini Context Chat</h3>
      <p>{count} context item(s) added.</p>
      <button onClick={openSidebar}>Open Sidebar</button>
      <button onClick={() => chrome.runtime.openOptionsPage()}>Settings</button>
    </div>
  );
}