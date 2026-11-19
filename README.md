# EvarTheme Shifter

Custom Manifest V3 Chrome extension. A proper dark mode for your
college portal and LMS, built because they did not do it.
For the sake of my eyes, I had to. I am sorry, do not sue me.

This is not an official college product. It is not affiliated with,
endorsed by, or connected to the college. It runs only in your own
browser and changes only what you see.

## Why this is different
Version 1 used a global invert filter. That works on a plain white
page, but the portal login is a split screen: the left panel is
already dark navy with white text, the right form panel is white.
Inverting the whole page would flip the dark panel light.

This version darkens only light surfaces, element by element:
- body, text, links, inputs, tables, cards
- runtime fix in content.js for inline white backgrounds, because
  the portal is an Angular single page app and its class names are
  not stable
- photos, logos, videos, PDFs and the already-dark left panel are
  left untouched

## Works on
- Your college portal, all pages on its main domain
- Your college LMS (Moodle, separate site), all pages on its domain
- The portal and the LMS are separate sites, both are covered.

## What it does
- Turns the white portal / LMS pages dark, without inverting photos, videos, PDFs or embedded content.
- Popup (click the extension icon): on/off toggle, theme Dark / OLED black / Dim, brightness slider 70-110%.
- Settings save in Chrome sync, so they follow your Chrome profile.

## Install (free, unpacked, 2 minutes)
1. If an old version is installed, remove it first at `chrome://extensions`.
2. Open Chrome, go to `chrome://extensions`
3. Turn on Developer mode (top right)
4. Click Load unpacked, select the unzipped extension folder
5. Open the portal or LMS, click the EvarTheme Shifter icon to change theme or brightness

To share with friends, send the zip `evar-theme-shifter-v3.zip` and they do the same steps. No fee, no publishing needed for personal use.

## Do not use during an online proctored exam or quiz
Study only. An exam proctor can flag injected extensions.

## Files
- `manifest.json` - Manifest V3, matches the portal and LMS domains
- `content.js` - applies theme, fixes white backgrounds at runtime, watches route changes
- `dark.css` - proper per-element dark theme, media untouched
- `popup.html` / `popup.js` - toggle, theme, brightness
