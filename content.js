// EvarTheme Shifter v1.4 - proper dark theme
// Root-cause fix: no global text colour override. Every element is
// fixed by its OWN background, measured at runtime:
//  - large light surface (page, card, panel, strip) -> dark background, light text
//  - small light surface (pill, badge, button, chip) -> keep light background, dark text
//  - dark surface -> light text
// That fixes light-on-light pills like the date picker, Slot Close
// badge, DSC pill, Active pill, and dark-on-dark icons and logos.

const THEMES = {
  dark: 'evar-dark',
  oled: 'evar-dark-oled',
  dim: 'evar-dark-dim'
};

const THEME_BG = {
  dark: '#171a1f',
  oled: '#000000',
  dim: '#222222'
};

let currentSettings = { enabled: true, theme: 'dark', brightness: 100 };
let scheduled = false;

function parseRgb(color) {
  const m = color && color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
  if (!m) return null;
  if (m[4] !== undefined && Number(m[4]) === 0) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function luminance(rgb) {
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function effectiveBg(el) {
  let node = el;
  while (node && node !== document.documentElement) {
    try {
      const rgb = parseRgb(getComputedStyle(node).backgroundColor);
      if (rgb) return rgb;
    } catch (e) { /* ignore */ }
    node = node.parentElement;
  }
  return [16, 18, 22];
}

function isSmall(el) {
  const tag = el.tagName;
  const cls = (el.className && typeof el.className === 'string') ? el.className.toLowerCase() : '';
  // v1.4.2 fix: a menu / popover / dropdown container is NOT a small
  // pill, even if it is an <a> or <span>. The LMS "My courses" menu
  // was kept white because its links were treated as small elements.
  // Menus must darken like a large surface, and their links then get
  // light text from the dark effective background.
  if (cls.includes('menu') || cls.includes('popover') || cls.includes('dropdown') || cls.includes('list')) return false;
  if (tag === 'BUTTON' || tag === 'A' || tag === 'SPAN' || tag === 'SMALL' || tag === 'LABEL') return true;
  return cls.includes('pill') || cls.includes('badge') || cls.includes('chip') ||
    cls.includes('status') || cls.includes('tag') || cls.includes('btn');
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
      // Do not cover background images, course card images stay original
      if (cs.backgroundImage && cs.backgroundImage !== 'none') continue;
      const bgRgb = parseRgb(cs.backgroundColor);
      const effRgb = bgRgb || effectiveBg(el);
      const lum = luminance(effRgb);
      const textRgb = parseRgb(cs.color);
      if (bgRgb && lum > 190) {
        if (isSmall(el)) {
          // Light pill / badge / button: keep the light background, dark text
          el.style.color = '#111111';
        } else {
          // Large light surface: darken it, light text
          el.style.backgroundColor = bg;
          el.style.color = '#e8e4dc';
        }
      } else if (lum < 90) {
        // Dark surface: light text. v1.4.1 fix: threshold was 70, so
        // dark blue / dark grey links like "My Fees" and
        // "Payment History" (luminance 70-150) were missed and stayed
        // dark-on-dark. Anything under 150 on a dark surface is unreadable.
        if (textRgb && luminance(textRgb) < 150) {
          el.style.color = '#e8e4dc';
        }
      } else if (lum >= 90 && lum <= 190) {
        // Mid-tone strip, e.g. pale blue LMS strip: darken large surfaces
        if (!isSmall(el)) {
          el.style.backgroundColor = bg;
          el.style.color = '#e8e4dc';
        }
      }
      const borderRgb = parseRgb(cs.borderColor);
      if (borderRgb && luminance(borderRgb) > 200) {
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

// Portal and LMS are single page apps: routes and content change
// without a reload, so watch for changes and re-fix.
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

setTimeout(scheduleFix, 500);
setTimeout(scheduleFix, 1500);
