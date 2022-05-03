import type { ObjectDirective } from 'vue';

/**
 * Directive to select all text content on focus.
 */
export const selectOnFocus: ObjectDirective<HTMLElement> = {
  beforeMount: (el) => {
    el.addEventListener('focusin', clickHandler);
  },
  beforeUnmount: (el) => {
    el.removeEventListener('focusin', clickHandler);
  },
};

function clickHandler(event: Event) {
  const el = event.target as HTMLInputElement;
  if (el) {
    el.focus();
    el.select();
  }
}
