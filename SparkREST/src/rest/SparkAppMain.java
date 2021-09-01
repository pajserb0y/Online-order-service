package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.Console;
import java.io.File;
import java.util.ArrayList;

import model.Admin;
import model.Courier;
import model.Customer;
import model.Manager;
import model.Product;
import model.User;
import model.Enums.RoleEnum;

import com.google.gson.Gson;
import services.AdminService;
import services.CourierService;
import services.CustomerService;
import services.ManagerService;
import services.ProductService;

public class SparkAppMain {

	private static Gson g = new Gson();
	private static ProductService productService = new ProductService();
	private static CustomerService customerService = new CustomerService();
	private static ManagerService managerService = new ManagerService();
	private static CourierService courierService = new CourierService();
	private static AdminService adminService = new AdminService();
	
	public static void main(String[] args) throws Exception {
		port(8080);
		
		customerService.load();
		managerService.load();
		courierService.load();
		adminService.load();

		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		
		
		get("rest/products/", (req, res) -> {
			res.type("application/json");
			return g.toJson(productService.getProducts());
		});
		
		post("rest/products/add", (req, res) -> {
			res.type("application/json");
			Product pd = g.fromJson(req.body(), Product.class);
			productService.addProduct(pd);
			return "SUCCESS";
		});
		
		
		post("/addAdmin", (req, res) -> {
			res.type("application/json");
			Admin admin = g.fromJson(req.body(), Admin.class);
			if(!customerService.checkUsernameAvailability(admin.getUsername())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else if(!managerService.checkUsernameAvailability(admin.getUsername())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else if(!courierService.checkUsernameAvailability(admin.getUsername())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else if(!adminService.checkUsernameAvailability(admin.getUsername())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else {
				admin.setRole(RoleEnum.ADMIN);
				adminService.add(admin);
				res.status(200);
				return "SUCCESS";
			}
		});
		
		post("/registerCustomer", (req, res) -> {
			res.type("application/json");
			Customer customer = g.fromJson(req.body(), Customer.class);
			//System.out.println(customer.toString());
			if(!customerService.checkUsernameAvailability(customer.getUsername())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else if(!managerService.checkUsernameAvailability(customer.getUsername())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else if(!courierService.checkUsernameAvailability(customer.getUsername())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else if(!adminService.checkUsernameAvailability(customer.getUsername())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else {
				customer.setRole(RoleEnum.CUSTOMER);
				customerService.add(customer);
				res.status(200);
				return "SUCCESS";
			}
		});
		
		post("/login", (req, res) -> {
			res.type("application/json");
			User user = g.fromJson(req.body(), User.class);
			if(customerService.login(user.getUsername(),user.getPassword())) {
				Customer customer = customerService.getCustomerByUsername(user.getUsername());
				res.status(200);
				return g.toJson(customer);
			}
			else if(managerService.login(user.getUsername(),user.getPassword())) {
				Manager menager= managerService.getManagerByUsername(user.getUsername());
				res.status(200);
				return g.toJson(menager);
			}
			else if(courierService.login(user.getUsername(),user.getPassword())) {
				Courier courier = courierService.getCourierByUsername(user.getUsername());
				res.status(200);
				return g.toJson(courier);
			}
			else if(adminService.login(user.getUsername(), user.getPassword())) {
				Admin admin = adminService.getAdminByUsername(user.getUsername());
				res.status(200);
				res.body(g.toJson(admin));
				return g.toJson(admin);
			}
			else {
				res.status(404);
				return "FAILED LOGIN";
			}
		});
		
		post("/getUser", (req, res) -> {
			res.type("application/json");
			User user = g.fromJson(req.body(), User.class);
			if(user.getRole() == RoleEnum.ADMIN) {
				res.status(200);
				return g.toJson(adminService.getAdminByID(user.getId()));
			}
			else if (user.getRole() == RoleEnum.MANAGER) {
				res.status(200); 
				return g.toJson(managerService.getManagerByID(user.getId()));
			}
			else if (user.getRole() == RoleEnum.COURIER) {
				res.status(200);
				return g.toJson(courierService.getCourierByID(user.getId()));
			}
			else if (user.getRole() == RoleEnum.CUSTOMER) {
				res.status(200);
				return g.toJson(customerService.getCustomerByID(user.getId()));
			}
			else {
				res.status(404);
				return "NOT FOUND";
			}

		});
		
		get("/allUsers", (req,res) ->{
			res.type("application/json");
			ArrayList<User> users = new ArrayList<User>();
			users.addAll(customerService.getAll());
			users.addAll(courierService.getAll());
			users.addAll(managerService.getAll());
			users.addAll(adminService.getAll());
			res.status(200);
			return g.toJson(users);
		});
		
		post("/editUser", (req, res) -> {
			res.type("application/json");
			User user = g.fromJson(req.body(), User.class);
			if(!customerService.checkUsernameAvailability(user.getUsername(), user.getId())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else if(!managerService.checkUsernameAvailability(user.getUsername(), user.getId())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else if(!courierService.checkUsernameAvailability(user.getUsername(), user.getId())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else if(!adminService.checkUsernameAvailability(user.getUsername(), user.getId())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			
			if(user.getRole() == RoleEnum.ADMIN) {
				res.status(200);				
				return g.toJson(adminService.edit(user));
			}
			else if (user.getRole() == RoleEnum.MANAGER) {
				res.status(200);
				return g.toJson(managerService.edit(user));
			}
			else if (user.getRole() == RoleEnum.COURIER) {
				res.status(200);
				return g.toJson(courierService.edit(user));
			}
			else if (user.getRole() == RoleEnum.CUSTOMER) {
				res.status(200);
				return g.toJson(customerService.edit(user));
			}
			
			res.status(404);
			return "NOTHING";
		});
	}
}
