import type { ObjectDirective } from 'vue';

/**
 * Directive to focus the current element when mounted.
 */
export const focus: ObjectDirective<HTMLElement> = {
  mounted: (el) => {
    el.focus();
  },
};
