const Registration = { template: '<registration></registration>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Registration},
	    { path: '/registration', name: 'registration', component: Registration}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});