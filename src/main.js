import Vue from "vue";
import VTooltip from 'v-tooltip';
import VueClipboard from 'vue-clipboard2';

window.axios = require('axios');
window._ = require('lodash');

import '@/assets/sass/app.scss';

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(VTooltip);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = 'http://localhost:8000/api';

// Auth test
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");