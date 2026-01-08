function setInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  let effectiveTheme;
  if (savedTheme && savedTheme !== 'auto') {
    effectiveTheme = savedTheme;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    effectiveTheme = 'dark';
  } else {
    effectiveTheme = 'light';
  }
  document.documentElement.setAttribute('data-theme', effectiveTheme);
}
setInitialTheme();

function updateThemeToggleButton(theme) {
  const btn = document.querySelector(
    '.site-header__actions button[aria-controls="theme"]'
  );
  if (!btn) return;
  const use = btn.querySelector('use');
  if (!use) return;
  if (theme === 'dark') {
    use.setAttribute('xlink:href', '#icon-moon');
  } else if (theme === 'light') {
    use.setAttribute('xlink:href', '#icon-sun');
  } else {
    use.setAttribute('xlink:href', '#icon-circle-half');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  updateThemeToggleButton(savedTheme || 'auto');

  const themeForm = document.getElementById('theme');
  if (!themeForm) return;
  const themeRadios = themeForm.querySelectorAll('input[type="radio"]');

  function updateTheme(theme) {
    if (theme === 'auto') {
      localStorage.setItem('theme', 'auto');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      document.documentElement.setAttribute(
        'data-theme',
        prefersDark ? 'dark' : 'light'
      );
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
    updateThemeToggleButton(theme);
  }

  function initializeControls() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const el =
        themeForm.querySelector(`input[value="${savedTheme}"]`) ||
        themeForm.querySelector('input[value="auto"]');
      if (el) el.checked = true;
    } else {
      const el = themeForm.querySelector('input[value="auto"]');
      if (el) el.checked = true;
    }
  }

  themeRadios.forEach(radio => {
    radio.addEventListener('change', e => {
      updateTheme(e.target.value);
      const themeButton = document.querySelector(
        '.site-header__actions button[aria-controls="theme"]'
      );
      if (themeButton) {
        themeButton.click();
      }
    });
  });

  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const mqlHandler = e => {
    const isAuto = themeForm.querySelector('input[value="auto"]')?.checked;
    const saved = localStorage.getItem('theme');
    if (isAuto || saved === 'auto') {
      document.documentElement.setAttribute(
        'data-theme',
        e.matches ? 'dark' : 'light'
      );
      updateThemeToggleButton('auto');
    }
  };
  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', mqlHandler);
  } else if (typeof mql.addListener === 'function') {
    mql.addListener(mqlHandler);
  }

  initializeControls();
});