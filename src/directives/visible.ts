import type { ObjectDirective } from 'vue';

interface VVisibleElement extends HTMLElement {
  // _vov = vue original visibility
  _vov: string;
  // _vope = vue original pointer-events
  _vope: string;
}

/**
 * Directive, which is a drop-in replacement for "v-show".
 * But it will set "visibility: hidden" and "pointer-events: none" instead of "display: none".
 *
 * @example
 * <transition>
 *   <h1 v-visible="show">Hello world!</h1>
 * </transition>
 */
// see https://github.com/vuejs/core/blob/v3.2.33/packages/runtime-dom/src/directives/vShow.ts
export const visible: ObjectDirective<VVisibleElement> = {
  beforeMount(el, { value }, { transition }) {
    el._vov = el.style.visibility === 'hidden' ? '' : el.style.visibility;
    el._vope = el.style.pointerEvents === 'none' ? '' : el.style.pointerEvents;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setVisibility(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setVisibility(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setVisibility(el, false);
        });
      }
    } else {
      setVisibility(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setVisibility(el, value);
  },
};

function setVisibility(el: VVisibleElement, value: unknown) {
  el.style.visibility = value ? el._vov : 'hidden';
  el.style.pointerEvents = value ? el._vope : 'none';
}
