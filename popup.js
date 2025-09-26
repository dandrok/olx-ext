const toggleButton = document.getElementById("toggle-buttons");
toggleButton.disabled = true;
toggleButton.textContent = "Loading...";

function updateButtonState() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { action: "getState" }, (response) => {
      if (response && response.state) {
        toggleButton.textContent = response.state === "hide" ? "show" : "hide";
        toggleButton.dataset.state = response.state;
        toggleButton.disabled = false;
      } else {
        toggleButton.textContent = "Unavailable";
        toggleButton.disabled = true;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateButtonState();
});

toggleButton.addEventListener("click", () => {
  const currentState = toggleButton.dataset.state || "show";
  const nextAction = currentState === "hide" ? "show" : "hide";
  toggleButton.disabled = true;
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { action: nextAction }, () => {
      updateButtonState();
    });
  });
});
