const Product = { template: '<edit-product></edit-product>' }
const Products = { template: '<products></products>' }
const Registration = { template: '<registration></registration>' }
const HomePage = { template: '<home-page></home-page>' }
const Login = { template: '<login></login>' }
const MyAccount = { template: '<my-account></my-account>' }
const EmployeeRegistration = { template: '<registrate-employee></registrate-employee>' }
const AllUsers = { template: '<all-users></all-users>' }
const AddRestaurant = { template: '<add-restaurant></add-restaurant>' }
const AllRestaurants = { template: '<all-restaurants></all-restaurants>' }


const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: HomePage},
	    { path: '/products/:id', component: Product},
		{ path: '/registration', component: Registration},
		{ path: '/login', component: Login},
		{ path: '/my-account', component: MyAccount},
		{ path: '/registrate-employee', component: EmployeeRegistration},
		{ path: '/all-users', component: AllUsers},
		{ path: '/add-restaurant', component: AddRestaurant},
		{ path: '/all-restaurants', component: AllRestaurants},
		
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});