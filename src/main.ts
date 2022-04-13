import { createApp } from 'vue';
import { focus } from '@/directives/focus';
import { noDrag } from '@/directives/no-drag';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';

const app = createApp(App);
app.use(router);
app.use(store);

app.directive('focus', focus);
app.directive('no-drag', noDrag);

router.isReady().then(() => app.mount('#app'));
