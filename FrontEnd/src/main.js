import { createApp } from 'vue'
import App from './App.vue'
import router from './Routes/index.routes'
import store from './Store/index.store'


createApp(App).use(router).use(store).mount('#app')
