import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { initializeApp } from '@firebase/app'

import 'firebase/auth'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyBEK5K9yAwPoxS5U34UylCHDRwqaK5-RBg",
  authDomain: "feb-scream.firebaseapp.com",
  projectId: "feb-scream",
  storageBucket: "feb-scream.appspot.com",
  messagingSenderId: "346597782841",
  appId: "1:346597782841:web:2874f6e9705dbea2b5e4e8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
