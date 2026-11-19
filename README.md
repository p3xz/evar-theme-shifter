# KJU Dark v2 - KJUsys and KJLMS

Custom Manifest V3 Chrome extension, built for Kristu Jayanti.
Version 1.1.0 is a proper rebuild, not an invert filter.

## Why v2 is different
v1 used a global invert filter. That works on a plain white page,
but KJUsys login is a split screen: the left panel is ALREADY dark
navy with white text, the right form panel is white. Inverting the
whole page would flip the dark panel light.

v2 darkens only light surfaces, element by element:
- body, text, links, inputs, tables, cards
- runtime fix in content.js for inline white backgrounds, because
  KJUsys is an Angular SPA and its class names are not stable
- photos, logos, videos, PDFs and the already-dark left panel are
  left untouched

Works on:
- KJUsys: https://kjusys.kristujayanti.edu.in, all `*.kristujayanti.edu.in`
- KJLMS (Moodle, separate site): https://www.kristujayantiexamlms.com/login/index.php, all `*.kristujayantiexamlms.com`
- kjusys-apps.kristujayanti.edu.in

KJUsys and LMS are separate sites. LMS is Moodle, theme_klass:
pale blue-grey page, centred white login card, KJU banner on top,
blue Log in button, Google sign-in. v1.2.0 adds the LMS domain and
Moodle-specific card, button, input and navbar rules.

## What it does
- Turns the white LMS / KJUsys pages dark, without inverting photos, videos, PDFs or embedded content.
- Popup (click the extension icon): on/off toggle, theme Dark / OLED black / Dim, brightness slider 70-110%.
- Settings save in Chrome sync, so they follow your Chrome profile.

## Install (free, unpacked, 2 minutes)
1. If v1 is installed, remove it first at `chrome://extensions`, or
   Load unpacked will load a second copy.
2. Open Chrome, go to `chrome://extensions`
3. Turn on Developer mode (top right)
4. Click Load unpacked, select this `kju-dark-mode-extension` folder
5. Open KJUsys / KJLMS, click the KJU Dark icon to change theme or brightness

To share with friends, send the zip `kju-dark-v2.zip` and they do the same steps. No $5 fee, no publishing needed for personal use.

To publish on the Chrome Web Store for everyone, a one-time $5 developer registration is needed. Unlisted publishing is possible, link-only install.

## Do not use during an online proctored exam or quiz
Study only. An exam proctor can flag injected extensions.

## Files
- `manifest.json` - Manifest V3, matches `*.kristujayanti.edu.in`
- `content.js` - applies theme, fixes white backgrounds at runtime, watches Angular route changes
- `dark.css` - proper per-element dark theme, media untouched
- `popup.html` / `popup.js` - toggle, theme, brightness
