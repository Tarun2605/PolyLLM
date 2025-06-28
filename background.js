chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addContext",
    title: "Add to Gemini Context",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "generateResponse",
    title: "Generate with Gemini",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addContext") {
    chrome.storage.local.get({ context: [] }, (res) => {
      const updated = [...res.context, info.selectionText];
      chrome.storage.local.set({ context: updated });
    });
  } else if (info.menuItemId === "generateResponse") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["inject_iframe.js"]
    });
  }
});