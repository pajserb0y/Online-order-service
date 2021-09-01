const Product = { template: '<edit-product></edit-product>' }
const Products = { template: '<products></products>' }
const Registration = { template: '<registration></registration>' }
const HomePage = { template: '<home-page></home-page>' }
const Login = { template: '<login></login>' }
const MyAccount = { template: '<my-account></my-account>' }
const EmployeeRegistration = { template: '<registrate-employee></registrate-employee>' }


const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: HomePage},
	    { path: '/products/:id', component: Product},
		{ path: '/registration', component: Registration},
		{ path: '/login', component: Login},
		{ path: '/my-account', component: MyAccount},
		{ path: '/registrate-employee', component: EmployeeRegistration}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});