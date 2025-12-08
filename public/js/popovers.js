document.addEventListener('DOMContentLoaded', () => {
  if (window.CSS && CSS.supports && CSS.supports('bottom: anchor(bottom)')) return;

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
      const centerX = rect.left + rect.width / 2 + window.scrollX;
      const centerY = rect.top  + rect.height / 2 + window.scrollY;
      const styles    = getComputedStyle(popover);
      const offsetVar = styles.getPropertyValue('--popover-offset').trim();
      const verticalOffset = offsetVar ? parseFloat(offsetVar) : 0;
      const targetY = centerY - verticalOffset;
      const top  = targetY;
      const left = centerX;

      popover.style.position = 'absolute';
      popover.style.inset = 'auto';
      popover.style.top = `${Math.round(top)}px`;
      popover.style.left = `${Math.round(left)}px`;
      popover.style.transform = 'translateX(-50%) translateY(-100%)';

      popover.showPopover();
    });
  });
});