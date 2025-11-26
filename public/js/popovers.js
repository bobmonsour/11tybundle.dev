document.addEventListener('DOMContentLoaded', () => {

  if (CSS.supports('bottom: anchor(bottom)')) return;

  const triggers = document.querySelectorAll('[popovertarget]');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      const id = trigger.getAttribute('popovertarget');
      const popover = document.getElementById(id);
      if (!popover) return;

      event.preventDefault();

      if (popover.matches(':popover-open')) {
        popover.hidePopover();
        return;
      }

      const rect = trigger.getBoundingClientRect();
      const top = rect.bottom + window.scrollY;
      const left = rect.left + rect.width / 2 + window.scrollX;

      popover.style.position = 'absolute';
      popover.style.top = `${top}px`;
      popover.style.left = `${left}px`;
      popover.style.transform = 'translateX(-50%)';

      popover.showPopover();
    });
  });
});