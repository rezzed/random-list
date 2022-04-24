import { createApp } from 'vue';

import directives from '@/directives';
import router from '@/router';
import store from '@/store';

import App from '@/App.vue';

const app = createApp(App);
app.use(directives);
app.use(router);
app.use(store);

router.isReady().then(() => app.mount('#app'));
