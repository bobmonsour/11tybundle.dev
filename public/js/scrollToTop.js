document.addEventListener('DOMContentLoaded', () => {
  const scrollToTopButton = document.querySelector('.scroll-to-top');
  if (!scrollToTopButton) return;

  const toggleScrollToTopButton = () => {
    const showAfter = window.innerHeight / 2;
    const scrolled = window.scrollY || window.pageYOffset;

    if (scrolled > showAfter) {
      scrollToTopButton.classList.add('is-visible');
    } else {
      scrollToTopButton.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', toggleScrollToTopButton, { passive: true });
  toggleScrollToTopButton();
});