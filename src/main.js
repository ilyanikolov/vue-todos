import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

const router = new VueRouter({
	routes: [
		{
			path: '/:filter', name: 'filter', component: App
		}, {
			path: '/', redirect: '/all' 
		}

	],
	linkActiveClass: 'active'
});

Vue.use(VueRouter);


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
