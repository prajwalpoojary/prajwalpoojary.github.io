(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);
  updateBtnLabels(initial);

  function updateBtnLabels(theme) {
    const isDark = theme === 'dark';
    const desktopBtn = document.getElementById('themeBtn');
    const mobileBtn  = document.getElementById('mobileThemeBtn');
    if (desktopBtn) desktopBtn.textContent = isDark ? '☀ Light' : '☾ Dark';
    if (mobileBtn)  mobileBtn.textContent  = 'Switch to ' + (isDark ? 'Light' : 'Dark');
  }

  window.toggleTheme = function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateBtnLabels(next);
    // update theme-color meta on the fly
    document.querySelector('meta[name="theme-color"][media*="dark"]')
      .setAttribute('content', next === 'dark' ? '#191f1d' : '#f5f0e8');
  };

  let menuOpen = false;

  window.toggleMobile = function () {
    menuOpen = !menuOpen;
    const menu = document.getElementById('mobileMenu');
    const btn  = document.getElementById('hamburger');
    menu.setAttribute('aria-hidden', String(!menuOpen));
    btn.setAttribute('aria-expanded', String(menuOpen));
    btn.setAttribute('aria-label', menuOpen ? 'Close navigation menu' : 'Open navigation menu');
    btn.classList.toggle('open', menuOpen);
    // trap focus inside drawer when open
    if (menuOpen) menu.querySelector('a').focus();
  };

  window.closeMobile = function () {
    menuOpen = false;
    const menu = document.getElementById('mobileMenu');
    const btn  = document.getElementById('hamburger');
    menu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
    btn.classList.remove('open');
  };

  // close mobile menu on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) closeMobile();
  });
})();