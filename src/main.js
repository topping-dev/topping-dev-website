import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import i18n from './i18n';
import VueHighlightJS from './vuehighlight'
import { EventBus } from './event-bus';
import 'highlight.js/styles/darcula.css';

Vue.use(VueHighlightJS);

Vue.config.productionTip = false

var app = new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

global.app = app;
Vue.prototype.appPointer = app;

EventBus.$on('setLocale', locale => {
  global.app.$i18n.locale = locale;
});
