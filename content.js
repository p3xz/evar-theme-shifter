// KJU Dark v2 - proper dark theme for KJUsys and KJLMS
// No global invert. KJUsys login is a split screen: left panel is
// already dark navy, right panel is white. Inverting the whole page
// would flip the dark panel light. So v2 does two things:
//  1. dark.css handles known elements (body, text, links, inputs, tables)
//  2. this script fixes inline / computed white backgrounds at runtime,
//     which is needed because KJUsys is an Angular SPA and its class
//     names are not stable or inspectable from outside.

const THEMES = {
  dark: 'kju-dark',
  oled: 'kju-dark-oled',
  dim: 'kju-dark-dim'
};

const THEME_BG = {
  dark: '#171a1f',
  oled: '#000000',
  dim: '#222222'
};

let currentSettings = { enabled: true, theme: 'dark', brightness: 100 };
let scheduled = false;

function parseRgb(color) {
  const m = color && color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function isNearWhite(rgb) {
  return rgb && rgb[0] > 235 && rgb[1] > 235 && rgb[2] > 235;
}

function isNearBlack(rgb) {
  return rgb && rgb[0] < 70 && rgb[1] < 70 && rgb[2] < 70;
}

function fixColors() {
  if (currentSettings.enabled === false) return;
  const bg = THEME_BG[currentSettings.theme] || THEME_BG.dark;
  const skip = new Set(['IMG', 'VIDEO', 'PICTURE', 'IFRAME', 'EMBED', 'OBJECT', 'CANVAS', 'SVG', 'PATH']);
  const els = document.querySelectorAll('body *');
  for (const el of els) {
    if (skip.has(el.tagName)) continue;
    if (el.closest('img, video, picture, iframe, svg, canvas')) continue;
    try {
      const cs = getComputedStyle(el);
      const bgRgb = parseRgb(cs.backgroundColor);
      if (bgRgb && isNearWhite(bgRgb)) {
        el.style.backgroundColor = bg;
      }
      const textRgb = parseRgb(cs.color);
      if (textRgb && isNearBlack(textRgb)) {
        el.style.color = '#e8e4dc';
      }
      const borderRgb = parseRgb(cs.borderColor);
      if (borderRgb && isNearWhite(borderRgb)) {
        el.style.borderColor = '#2c313a';
      }
    } catch (e) {
      // Ignore elements that cannot be read, keep going
    }
  }
}

function scheduleFix() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    fixColors();
  });
}

function applySettings(settings) {
  currentSettings = settings;
  const root = document.documentElement;
  if (!root) return;
  Object.values(THEMES).forEach((c) => root.classList.remove(c));
  if (settings.enabled === false) return;
  const theme = THEMES[settings.theme] || THEMES.dark;
  root.classList.add(theme);
  const brightness = (settings.brightness ?? 100) / 100;
  root.style.setProperty('--kju-brightness', String(brightness));
  // Brightness is applied via the theme class filter only in invert
  // fallback mode, not in proper mode, so the page never washes out.
  scheduleFix();
}

function load() {
  chrome.storage.sync.get(
    { enabled: true, theme: 'dark', brightness: 100 },
    applySettings
  );
}

load();

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') load();
});

// KJUsys is an Angular SPA: routes and content change without a reload.
const observer = new MutationObserver(() => {
  scheduleFix();
});

if (document.documentElement) {
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: false
  });
}

// Re-check after lazy content loads
setTimeout(scheduleFix, 500);
setTimeout(scheduleFix, 1500);
