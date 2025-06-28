const ctxDiv = document.getElementById("context-list");
const promptInput = document.getElementById("prompt");
const generateBtn = document.getElementById("generate");
const responseDiv = document.getElementById("response");
const loadingDiv = document.getElementById("loading");

let context = [];

chrome.storage.local.get(["context", "geminiApiKey"], async ({ context: ctx, geminiApiKey }) => {
  context = ctx || [];
  ctx.forEach((txt) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = txt;
    ctxDiv.appendChild(card);
  });

  generateBtn.addEventListener("click", async () => {
    generateBtn.disabled = true;
    loadingDiv.style.display = "block";

    const messages = [
      { role: "system", content: `Context: ${context.join(" | ")}` },
      { role: "user", content: promptInput.value }
    ];

    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + geminiApiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: messages })
    });

    const json = await res.json();
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    responseDiv.textContent = text;

    chrome.storage.local.set({ context: [] });
    ctxDiv.innerHTML = "";
    loadingDiv.style.display = "none";
    generateBtn.disabled = false;
  });
});