document.getElementById("saveKey").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKeyInput").value;
  chrome.storage.local.set({ geminiApiKey: apiKey });
  alert("API Key saved");
});


// inject_iframe.js
(function () {
  if (document.getElementById("gemini-extension-iframe")) return;

  const iframe = document.createElement("iframe");
  iframe.src = chrome.runtime.getURL("iframe.html");
  iframe.id = "gemini-extension-iframe";
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.right = "0";
  iframe.style.width = "400px";
  iframe.style.height = "100%";
  iframe.style.zIndex = "999999";
  iframe.style.border = "none";
  document.body.appendChild(iframe);
})();