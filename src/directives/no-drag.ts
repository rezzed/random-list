import type { ObjectDirective } from 'vue';

/**
 * Directive to prevent the accidental dragging of links that
 * look like buttons (and any other element) in chrome and firefox.
 */
export const noDrag: ObjectDirective<HTMLElement> = {
  beforeMount: (el) => {
    el.draggable = false;
    el.addEventListener('dragstart', dragstartHandler);
  },
  beforeUnmount: (el) => {
    el.removeEventListener('dragstart', dragstartHandler);
  },
};

function dragstartHandler(event: Event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  return false;
}
