/**
 * Focus the current element when mounted.
 */
export const focus = {
  mounted: (el: HTMLElement) => {
    el.focus();
  },
};
