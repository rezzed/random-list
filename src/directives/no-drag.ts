/**
 * This should prevent the accidental dragging of links that
 * look like buttons (and any other element) in chrome and firefox.
 */
export const noDrag = {
  beforeMount: (el: HTMLElement) => {
    el.draggable = false;
    el.addEventListener('dragstart', dragstartHandler);
  },
  beforeUnmount: (el: HTMLElement) => {
    el.removeEventListener('dragstart', dragstartHandler);
  },
};

function dragstartHandler(event: Event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  return false;
}
