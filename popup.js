const toggleButton = document.getElementById("toggle-buttons");

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  chrome.tabs.sendMessage(tab.id, { action: "getState" }, (response) => {
    if (response && response.state) {
      toggleButton.textContent = response.state === "hide" ? "show" : "hide";
      toggleButton.dataset.state = response.state;
    } else {
      toggleButton.textContent = "show/hide";
    }
  });
});

toggleButton.addEventListener("click", () => {
  const currentState = toggleButton.dataset.state || "show";
  const nextAction = currentState === "hide" ? "show" : "hide";
  toggleButton.textContent = nextAction === "hide" ? "show" : "hide";
  toggleButton.dataset.state = nextAction;
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { action: nextAction }, () => {});
  });
});
