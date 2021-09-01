const Product = { template: '<edit-product></edit-product>' }
const Products = { template: '<products></products>' }
const Registration = { template: '<registration></registration>' }
const HomePage = { template: '<home-page></home-page>' }
const Login = { template: '<login></login>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: HomePage},
	    { path: '/products/:id', component: Product},
		{ path: '/registration', component: Registration},
		{ path: '/login', component: Login}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});