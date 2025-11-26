document.addEventListener('DOMContentLoaded', () => {
  const skipLinks = document.querySelectorAll('.skip-links a');

  skipLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href').slice(1);
      const targetHeading = document.getElementById(targetId);
      if (!targetHeading) return;

      const details = targetHeading.closest('details');
      if (!details) return;

      details.open = true;
    });
  });
});


