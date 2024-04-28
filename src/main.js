import { createApp } from 'vue';  // Import createApp to initialize the Vue instance
import App from './App.vue';  // Root component
import router from './router.js';  // Import the router configuration

const app = createApp(App);  // Create Vue instance

app.use(router);  // Attach the router to the Vue instance
app.mount('#app');  // Mount the Vue instance to the DOM
