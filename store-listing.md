# Chrome Web Store listing - EvarTheme Shifter

## Name
EvarTheme Shifter

## Short description (132 characters max)
Dark mode for your college portal and LMS. Proper dark theme, not invert. Images, videos and PDFs stay normal.

## Detailed description
EvarTheme Shifter adds a proper dark mode to your college portal and LMS.

Because they did not do it, so I did. For the sake of my eyes, I had to.

This is not an official college product. It is not affiliated with, endorsed by, or connected to the college. It runs only in your own browser and changes only what you see.

What it does:
- Turns the white portal and LMS pages dark, element by element, not with a global invert filter
- Works on the college portal and the LMS (Moodle), which are separate sites
- Photos, logos, videos and PDFs stay normal
- On/off toggle, Dark / OLED black / Dim themes, brightness slider 70 to 110 percent
- Settings save in Chrome sync

How to use:
Install, open the portal or LMS, click the EvarTheme Shifter icon, choose a theme.

Do not use during an online proctored exam or quiz. Study only.

## Category
Accessibility

## Language
English

## Privacy
Single purpose: dark mode for the college portal and LMS.
No data is collected, stored, sent, sold, or shared. No accounts, no tracking, no analytics. The extension only reads and changes the appearance of the portal and LMS pages in your own browser. Settings are stored only in Chrome sync storage on your own account.
Full policy: see PRIVACY.md in this repo.

## Permissions justification
- storage: save your on/off, theme and brightness settings
- host permissions for the portal and LMS domains only: apply the dark theme on those pages, nowhere else

## Package to upload
evar-theme-shifter-v3.zip, built from this folder. manifest.json at the root of the zip, version 1.3.0, Manifest V3.

## Assets still needed before submitting (owner only)
- 128x128 icon: already in icons/icon128.png
- Screenshots, 1280x800 or 640x400, at least 1, up to 5: take them after installing the extension, on the portal login and dashboard, and on the LMS login. Do not include any personal data, username, marks, or other student details in screenshots.
- Small promo tile 440x280 (optional) and large tile 1400x560 (optional)
- Developer account: Google account, 2-step verification on, one-time $5 registration fee, paid by the owner. No one else can pay or publish for you.
- Review time: usually a few days for a new publisher, plan 7 to 14 days.

## After Chrome
Firefox Add-ons (free) and Microsoft Edge Add-ons (free) use the same Manifest V3 zip, with small manifest tweaks. Do those after Chrome is live.

## Firefox and Edge (after Chrome)
- Firefox: use manifest-firefox.json instead of manifest.json. It adds browser_specific_settings.gecko.id evar-theme-shifter@p3xz.dev, strict_min_version 142.0, and data_collection_permissions required none. Do not change the gecko id after the first submission, or updates break. Code is unchanged. Package: evar-theme-shifter-firefox.zip. Publish on addons.mozilla.org, free, no registration fee.
- Edge: same package as Chrome, no changes. Package: evar-theme-shifter-edge.zip. Publish on Microsoft Edge Add-ons via Partner Center, free, no registration fee.
