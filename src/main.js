import { createApp } from 'vue';
import { Quasar } from 'quasar';
import router from './router';
import { createPinia } from 'pinia';
import App from './App.vue';

// Import Quasar css
import 'quasar/src/css/index.sass';

const app = createApp(App);
app.use(Quasar);
app.use(router);
app.use(createPinia());

app.mount('#app');
