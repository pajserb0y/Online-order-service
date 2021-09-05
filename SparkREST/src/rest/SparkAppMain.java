package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.Console;
import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.UUID;

import javax.servlet.MultipartConfigElement;
import javax.servlet.http.Part;

import model.Admin;
import model.Courier;
import model.Customer;
import model.Manager;
import model.MenuItem;
import model.Restaurant;
import model.User;
import model.Enums.RoleEnum;

import com.google.gson.Gson;

import services.AdminService;
import services.CourierService;
import services.CustomerService;
import services.ManagerService;
import services.MenuItemService;
import services.RestaurantService;

public class SparkAppMain {

	private static Gson g = new Gson();
	private static CustomerService customerService = new CustomerService();
	private static ManagerService managerService = new ManagerService();
	private static CourierService courierService = new CourierService();
	private static AdminService adminService = new AdminService();
	private static RestaurantService restaurantService = new RestaurantService();
	
	public static void main(String[] args) throws Exception {
		port(8080);
		
		customerService.load();
		managerService.load();
		courierService.load();
		adminService.load();

		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
			
		
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
				Manager manager= managerService.getManagerByUsername(user.getUsername());
				res.status(200);
				return g.toJson(manager);
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
		
		get("/getAllUsers", (req,res) ->{
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
		
		post("/registrateEmployee", (req, res) -> {
			res.type("application/json");
			User user = g.fromJson(req.body(), User.class);
			if(!customerService.checkUsernameAvailability(user.getUsername())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else if(!managerService.checkUsernameAvailability(user.getUsername())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else if(!courierService.checkUsernameAvailability(user.getUsername())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else if(!adminService.checkUsernameAvailability(user.getUsername())) {
				res.status(404);
				return "ALREADY EXISTS";
			}
			else {
				if(user.getRole() == RoleEnum.COURIER) {
					Courier courier = g.fromJson(req.body(), Courier.class);
					courierService.add(courier);
					res.status(200);
					return "SUCCESS";
				}
				else if(user.getRole() == RoleEnum.MANAGER) {
					Manager manager = g.fromJson(req.body(), Manager.class);
					managerService.add(manager);
					res.status(200);
					return "SUCCESS";
				}
				else {
					res.status(404);
					return "ALREADY EXISTS";
				}
			}
		});
		
		post("/deleteUser", (req, res) -> {
			res.type("application/json");
			
			User user = g.fromJson(req.body(), User.class);
			if(user.getRole() == RoleEnum.MANAGER) {
				managerService.delete(user.getId());
				//restaurantService.deleteMenager(user.getUsername());
			}
			else if(user.getRole() == RoleEnum.CUSTOMER) {
				customerService.delete(user.getId());
			}
			else if(user.getRole() == RoleEnum.COURIER) {
				courierService.delete(user.getId());
			}
			
			res.status(200);
			return g.toJson(user);
		});
		
		//Restaurant currRes = new Restaurant();
		class LogoPath {
			public String value;			
		}
		LogoPath logoPath = new LogoPath();
		post("/uploadRestaurantPicture", "multipart/form-data", (req, res) -> {

			String location = "static"+File.separator+"restaurantLogo";          // the directory location where files will be stored
			long maxFileSize = 100000000;       // the maximum size allowed for uploaded files
			long maxRequestSize = 100000000;    // the maximum size allowed for multipart/form-data requests
			int fileSizeThreshold = 1024;       // the size threshold after which files will be written to disk
			MultipartConfigElement multipartConfigElement = new MultipartConfigElement(
				     location, maxFileSize, maxRequestSize, fileSizeThreshold);
			req.raw().setAttribute("org.eclipse.jetty.multipartConfig",multipartConfigElement);

            Part uploadedFile = req.raw().getPart("file");
           // currRes.setLogoPath("static"+File.separator+"restaurantLogo"+File.separator+"RES"+ UUID.randomUUID() +".png");
            logoPath.value = "static"+File.separator+"restaurantLogo"+File.separator+"RES"+ UUID.randomUUID() +".png";
            Path out = Paths.get(logoPath.value);
            try (final InputStream in = uploadedFile.getInputStream()) {
               Files.copy(in, out, StandardCopyOption.REPLACE_EXISTING);
               uploadedFile.delete();
            }

            multipartConfigElement = null;
            uploadedFile = null;
            return "OK";
        });
		
		post("/addRestaurant", (req,res) ->{
			res.type("applicaton/json");
			Restaurant restaurant = g.fromJson(req.body(),Restaurant.class);
			//restaurant.setLogoPath(currRes.getLogoPath());
			restaurant.setLogoPath(logoPath.value);
			
			restaurantService.addRestaurant(restaurant);
			managerService.addRestaurantToManager(restaurant.getManager(), restaurant.getId());
			
			res.status(200);
			return g.toJson("");
		});

		get("/availableManagers", (req,res) ->{
			res.type("application/json");
			ArrayList<Manager> managers = managerService.getAvailableManagers();
			res.status(200);
			return g.toJson(managers);	
		});
		
		get("/allRestaurants", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return g.toJson(restaurantService.getAll());
		});
		
		class PicturePath {
			public String value;			
		}
		PicturePath picturePath = new PicturePath();
		
		post("/uploadMenuPicture", "multipart/form-data", (req, res) -> {
			
			String location = "static"+File.separator+"menuPictures";          // the directory location where files will be stored
			long maxFileSize = 100000000;       // the maximum size allowed for uploaded files
			long maxRequestSize = 100000000;    // the maximum size allowed for multipart/form-data requests
			int fileSizeThreshold = 1024;       // the size threshold after which files will be written to disk
			MultipartConfigElement multipartConfigElement = new MultipartConfigElement(
				     location, maxFileSize, maxRequestSize, fileSizeThreshold);
			req.raw().setAttribute("org.eclipse.jetty.multipartConfig",multipartConfigElement);
				
            Part uploadedFile = req.raw().getPart("file");
            picturePath.value = "static"+File.separator+"menuPictures"+File.separator+"MENU"+ UUID.randomUUID() +".png";
            Path out = Paths.get(picturePath.value);
            try (final InputStream in = uploadedFile.getInputStream()) {
               Files.copy(in, out, StandardCopyOption.REPLACE_EXISTING);
               uploadedFile.delete();
            }
            
            multipartConfigElement = null;
            uploadedFile = null;
            
            
            return "OK";
        });
		
		post("/addItem", (req, res) -> {
			res.type("application/json");
			MenuItem item = g.fromJson(req.body(), MenuItem.class);
			item.setPicturePath(picturePath.value);
			item.setCount(0);
//			int restaurantID = menagerService.getRestaurantID(item.getRestaurant());			
//			item.setRestaurant(restaurantID);	
			if (MenuItemService.checkNameAvailability(item)) {
				MenuItemService.add(item);
				res.status(200);
				return "DONE";
			}
			else {
				res.status(404);
				return "ALREADY EXISTS";
			}			
		});	
		
		post("/getCurrentRestaurant",(req, res) -> {
			res.type("application/json");
			Manager manager = g.fromJson(req.body(), Manager.class);
			manager = managerService.getManagerByID(manager.getId());
			res.status(200);
			return g.toJson(manager.getRestaurantId());
		});
	}
}
