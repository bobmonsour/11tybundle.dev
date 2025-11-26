document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toggle').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.target);
      if (!target) return;

      target.classList.toggle('hidden');
      target.classList.toggle('visible');

      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
    });
  });
});