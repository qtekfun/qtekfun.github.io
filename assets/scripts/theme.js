(function () {
  var PREFS = ['auto', 'light', 'dark'];

  var ICONS = {
    auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
  };

  var LABELS = { auto: 'Auto', light: 'Light', dark: 'Dark' };

  function getPref() {
    return localStorage.getItem('theme') || 'auto';
  }

  function applyTheme(pref) {
    var dark = pref === 'dark' ||
      (pref === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }

  function updateButton(btn, pref) {
    btn.innerHTML = ICONS[pref];
    btn.title = 'Theme: ' + LABELS[pref];
    btn.setAttribute('aria-label', 'Theme: ' + LABELS[pref] + ' — click to change');
  }

  function injectButton() {
    var nav = document.querySelector('.navbar-nav');
    if (!nav) return;

    var li = document.createElement('li');
    li.className = 'nav-item';

    var btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.className = 'nav-link theme-toggle-btn';
    updateButton(btn, getPref());

    btn.addEventListener('click', function () {
      var current = getPref();
      var next = PREFS[(PREFS.indexOf(current) + 1) % PREFS.length];
      localStorage.setItem('theme', next);
      applyTheme(next);
      updateButton(btn, next);
    });

    li.appendChild(btn);
    nav.appendChild(li);
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectButton();

    // Re-evaluate when system preference changes (only matters in auto mode)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (getPref() === 'auto') applyTheme('auto');
    });
  });
})();
