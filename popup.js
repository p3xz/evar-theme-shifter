const enabledEl = document.getElementById('enabled');
const themeEl = document.getElementById('theme');
const brightnessEl = document.getElementById('brightness');
const brightnessVal = document.getElementById('brightnessVal');

function save() {
  brightnessVal.textContent = brightnessEl.value + '%';
  chrome.storage.sync.set({
    enabled: enabledEl.checked,
    theme: themeEl.value,
    brightness: Number(brightnessEl.value)
  });
}

chrome.storage.sync.get(
  { enabled: true, theme: 'dark', brightness: 100 },
  (s) => {
    enabledEl.checked = s.enabled !== false;
    themeEl.value = s.theme || 'dark';
    brightnessEl.value = s.brightness ?? 100;
    brightnessVal.textContent = brightnessEl.value + '%';
  }
);

enabledEl.addEventListener('change', save);
themeEl.addEventListener('change', save);
brightnessEl.addEventListener('input', save);
