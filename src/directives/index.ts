import type { Plugin } from 'vue';
import { noDrag } from './no-drag';
import { selectOnFocus } from './select-on-focus';
import { visible } from './visible';

const directives: Plugin = {
  install: (app) => {
    app.directive('no-drag', noDrag);
    app.directive('select-on-focus', selectOnFocus);
    app.directive('visible', visible);
  },
};

export default directives;
