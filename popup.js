const hideButton = document.getElementById("hide-buttons");
const showButton = document.getElementById("show-buttons");

hideButton.addEventListener("click", () => {
  console.log("sending hide");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "hide" });
  });
});

showButton.addEventListener("click", () => {
  console.log("sending show");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "show" });
  });
});
