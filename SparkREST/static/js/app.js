const Product = { template: '<edit-product></edit-product>' }
const Products = { template: '<products></products>' }
const Registration = { template: '<registration></registration>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Registration},
	    { path: '/products/:id', component: Product}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});