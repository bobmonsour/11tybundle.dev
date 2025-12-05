document.addEventListener('DOMContentLoaded', () => {
  const yearSkipNav = document.getElementById('skip-links-years');
  if (!yearSkipNav) return;

  const skipLinks  = yearSkipNav.querySelectorAll('a[href^="#"]');
  const allDetails = document.querySelectorAll('details.directory__layout');

  skipLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetId = href.slice(1);
      if (!targetId) return;

      const targetHeading = document.getElementById(targetId);
      if (!targetHeading) return;

      const details = targetHeading.closest('details.directory__layout');
      if (!details) return;

      allDetails.forEach(d => {
        if (d !== details) d.open = false;
      });
      details.open = true;

    });
  });
});