console.log("hello from olx-ext!");

const STORAGE_KEY = "olx-ext";
const BTN_STORAGE_KEY = "customButtons";

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === "hide") {
    console.log("Hiding elements…");
    chrome.storage.local.set({ [BTN_STORAGE_KEY]: "hide" }, () => {
      document.querySelectorAll(".custom-button").forEach((el) => {
        el.style.display = "none";
      });
    });
  }

  if (msg.action === "show") {
    console.log("Showing elements…");
    chrome.storage.local.set({ [BTN_STORAGE_KEY]: "show" }, () => {
      document.querySelectorAll(".custom-button").forEach((el) => {
        el.style.display = "block";
      });
    });
  }

  if (msg.action === "getState") {
    chrome.storage.local.get([BTN_STORAGE_KEY], (result) => {
      const state = result[BTN_STORAGE_KEY] || "show";
      sendResponse({ state });
    });
    return true;
  }
});

const applyStorageValue = () => {
  chrome.storage.local.get([BTN_STORAGE_KEY], (result) => {
    const currentValue = result[BTN_STORAGE_KEY];
    if (currentValue === "hide") {
      document
        .querySelectorAll(".custom-button")
        .forEach((el) => (el.style.display = "none"));
    } else if (currentValue === "show") {
      document
        .querySelectorAll(".custom-button")
        .forEach((el) => (el.style.display = "block"));
    }
  });
};

const showOfferBack = (element, id) => {
  const currentHidden = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  element.style.backgroundColor = "red";
  element.textContent = "hide offer";
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(currentHidden.filter((hidden) => hidden !== id))
  );
  document.getElementById(id).style.display = "block";
};

const saveHidden = (id) => {
  const el = document.getElementById(`offer-${id}`);
  const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  if (storage.includes(id)) {
    showOfferBack(el, id);
  } else {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, id]));
    document.getElementById(id).style.display = "none";
    el.style.backgroundColor = "green";
    el.textContent = "show offer";
  }
};

const addHideButtons = () => {
  const currentHidden = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const allOffers = document.querySelectorAll('[data-testid="l-card"]');

  for (const offer of allOffers) {
    if (offer.dataset.hasButton) continue;
    const style = window.getComputedStyle(offer);
    if (style.display === "none") continue; // skip hidden offers

    const button = document.createElement("button");
    button.textContent = "hide offer";
    button.style.cssText =
      "z-index:505;position: relative; padding:1em;background:red;";

    if (currentHidden.includes(offer.id)) {
      document.getElementById(offer.id).style.display = "none";
      button.style.backgroundColor = "green";
      button.textContent = "show offer";
    }

    button.setAttribute("type", "button");
    button.setAttribute("class", "custom-button");
    button.setAttribute("id", `offer-${offer.id}`);
    offer.insertAdjacentElement("afterend", button);
    button.addEventListener("click", () => saveHidden(offer.id));
    offer.dataset.hasButton = "true";
  }
};

let scheduled = false;
const observer = new MutationObserver(() => {
  if (!scheduled) {
    scheduled = true;
    setTimeout(() => {
      addHideButtons();
      applyStorageValue();
      scheduled = false;
    }, 200);
  }
});

observer.observe(document.body, { childList: true, subtree: true });
