import type { Plugin } from 'vue';
import { focus } from './focus';
import { noDrag } from './no-drag';
import { visible } from './visible';

const directives: Plugin = {
  install: (app) => {
    app.directive('focus', focus);
    app.directive('no-drag', noDrag);
    app.directive('visible', visible);
  },
};

export default directives;
