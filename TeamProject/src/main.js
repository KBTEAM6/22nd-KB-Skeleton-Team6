import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';
import './assets/styles/variables.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#root');
