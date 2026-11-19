const enabledEl = document.getElementById('enabled');
const brightnessEl = document.getElementById('brightness');
const brightnessVal = document.getElementById('brightnessVal');
const swatches = Array.from(document.querySelectorAll('.swatch'));
let theme = 'dark';

function save() {
  chrome.storage.sync.set({
    enabled: enabledEl.checked,
    theme,
    brightness: Number(brightnessEl.value)
  });
}

function paint() {
  brightnessVal.textContent = brightnessEl.value + '%';
  swatches.forEach((s) => s.classList.toggle('active', s.dataset.theme === theme));
}

chrome.storage.sync.get(
  { enabled: true, theme: 'dark', brightness: 100 },
  (settings) => {
    enabledEl.checked = settings.enabled;
    theme = settings.theme || 'dark';
    brightnessEl.value = settings.brightness;
    paint();
  }
);

enabledEl.addEventListener('change', save);
brightnessEl.addEventListener('input', () => { paint(); save(); });
swatches.forEach((s) => s.addEventListener('click', () => { theme = s.dataset.theme; paint(); save(); }));
