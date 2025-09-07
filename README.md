# OLX Hide Offers Extension

## What it does

This Chrome extension allows you to hide specific offers on **OLX.pl**.

- Adds a **“hide offer” / “show offer”** button to each OLX listing
- Clicking the button hides the offer or shows it again
- Hidden offers are remembered in **localStorage**, so they stay hidden even after page reload
- Works automatically on dynamically loaded offers using a **MutationObserver**

## How to use

1. Install the extension in Chrome (use **Load unpacked** in Developer mode)
2. Open [https://www.olx.pl](https://www.olx.pl)
3. Buttons appear automatically next to each offer
4. Click **“hide offer”** to hide an offer; click **“show offer”** to make it visible again

## Notes

- Works only on OLX.pl
- Offers added dynamically after page load are automatically handled
- Hidden offers are stored locally in your browser
