chrome.action.onClicked.addListener((tab) => {
  if (tab.id && tab.url && tab.url.startsWith("https://www.olx.pl")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
  }
});
