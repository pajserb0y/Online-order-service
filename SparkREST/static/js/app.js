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
const ViewRestaurants = { template: '<view-restaurant></view-restaurant>' }
const MyRestaurant = { template: '<all-restaurants></all-restaurants>' }
const AddMenuItems = { template: '<add-menuItems></add-menuItems>' }
const MyRestaurantInformation = { template: '<my-restaurant-information></my-restaurant-information>' }
const MyMenu = { template: '<my-menu></my-menu>' }
const MyCart = { template: '<my-cart></my-cart>' }
const Orders = { template: '<orders></orders>' }

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
		{ path: '/view-restaurant', component: ViewRestaurants},
		{ path: '/my-restaurant', component: MyRestaurant},
		{ path: '/add-menuItems', component: AddMenuItems},
		{ path: '/my-restaurant-information', component: MyRestaurantInformation},
		{ path: '/my-menu', component: MyMenu},
		{ path: '/my-cart', component: MyCart},
		{ path: '/orders', component: Orders},
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});