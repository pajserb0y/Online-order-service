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









import javax.lang.model.element.TypeElement;
import javax.servlet.MultipartConfigElement;
import javax.servlet.http.Part;









import model.Admin;
import model.Courier;
import model.Customer;
import model.Manager;
import model.MenuItem;
import model.Restaurant;
import model.ShoppingCart;
import model.User;
import model.Enums.RestaurantTypeEnum;
import model.Enums.RoleEnum;
import model.Order;
import model.OrderDTO;









import com.google.gson.Gson;









import services.AdminService;
import services.CourierService;
import services.CustomerService;
import services.ManagerService;
import services.MenuItemService;
import services.OrderService;
import services.RestaurantService;

public class SparkAppMain {

	private static Gson g = new Gson();
	private static CustomerService customerService = new CustomerService();
	private static ManagerService managerService = new ManagerService();
	private static CourierService courierService = new CourierService();
	private static AdminService adminService = new AdminService();
	private static RestaurantService restaurantService = new RestaurantService();
	private static MenuItemService menuItemService = new MenuItemService();
	private static OrderService orderService = new OrderService();
	
	public static void main(String[] args) throws Exception {
		port(8080);
		
		customerService.load();
		managerService.load();
		courierService.load();
		adminService.load();
		restaurantService.load();  //radi i bez ovoga
		menuItemService.load();
		orderService.load();

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
            logoPath.value = "restaurantLogo"+File.separator+"RES"+ UUID.randomUUID() +".png";
            Path out = Paths.get("static"+File.separator+logoPath.value);
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
		
		post("/deleteRestaurant", (req, res) -> {
			res.type("application/json");			
			Restaurant restaurant = g.fromJson(req.body(), Restaurant.class);
			restaurantService.delete(restaurant.getId());
			//menuItemService.deleteForRestaurant(restaurant.getId());
			managerService.deleteRestaurant(restaurant.getId());
			
			res.status(200);
			return g.toJson(restaurantService.getAll());
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
		

		post("/rememberRestaurant", (req, res) -> {
			res.type("application/json");
			Restaurant restaurant = g.fromJson(req.body(), Restaurant.class);
			restaurantService.setSelectedRestaurant(restaurant);
			res.status(200);
			return g.toJson(restaurant);
		});
		
		get("/getRestaurant", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return g.toJson(restaurantService.getSelectedRestaurant());
		});
		

		class PicturePath {
			public String value;			
		}
		PicturePath picturePath = new PicturePath();
		
		post("/uploadMenuPicture", "multipart/form-data", (req, res) -> {
			
			String location = "static"+File.separator+"menuItemPictures";          // the directory location where files will be stored
			long maxFileSize = 100000000;       // the maximum size allowed for uploaded files
			long maxRequestSize = 100000000;    // the maximum size allowed for multipart/form-data requests
			int fileSizeThreshold = 1024;       // the size threshold after which files will be written to disk
			MultipartConfigElement multipartConfigElement = new MultipartConfigElement(
				     location, maxFileSize, maxRequestSize, fileSizeThreshold);
			req.raw().setAttribute("org.eclipse.jetty.multipartConfig",multipartConfigElement);
				
            Part uploadedFile = req.raw().getPart("file");
            picturePath.value = "menuItemPictures"+File.separator+"MENU"+ UUID.randomUUID() +".png";
            Path out = Paths.get("static"+File.separator+picturePath.value);
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
			if (menuItemService.checkNameAvailability(item)) { 		//zasto nismo pozvali gore i napravili novu instancu MenuitemService-a kao i za ostale servise
				menuItemService.add(item);
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
			Manager manager = g.fromJson(req.body(), Manager.class); //dobija kao parametar id od trenutnog usera odnosno menagera
			manager = managerService.getManagerByID(manager.getId());
			Restaurant restaurant = restaurantService.getById(manager.getRestaurantId());
			res.status(200);
			return g.toJson(restaurant);
		});
		
		
		post("/getMenuItems",(req, res) -> {
			res.type("application/json");
			Restaurant restaurant = g.fromJson(req.body(), Restaurant.class);
			res.status(200);
			return g.toJson(menuItemService.getMenuForRestaurant(restaurant.getId()));
		});
		
		post("/deleteMenuItem",(req, res) -> {
			res.type("application/json");
			MenuItem menuItem = g.fromJson(req.body(), MenuItem.class);
			menuItemService.delete(menuItem.getId());
			Restaurant restaurant = restaurantService.getById(menuItem.getRestorantId());
			ArrayList<UUID> Menu = restaurant.getMenu();
			Menu.remove(menuItem);
			restaurant.setMenu(Menu);
			res.status(200);
			return "OK";
		});
		
		post("/addToCart", (req, res) -> {
			res.type("application/json");
			ShoppingCart shoppingCartDTO = g.fromJson(req.body(), ShoppingCart.class);	//DTO je zato sto se prosledjuje isti item(tacno jedan), koji moze biti vise puta tj count > 1
			
			customerService.addItemsToShoppingCart(shoppingCartDTO);
			
			res.status(200);
			return "OK";
					
		});
		
		post("/getCart", (req, res) -> {
			res.type("application/json");
			User user = g.fromJson(req.body(), User.class);
			res.status(200);
			return g.toJson(customerService.getCart(user.getId()));
					
		});
		
		post("/changeCart", (req, res) -> {
			res.type("application/json");
			ShoppingCart cart = g.fromJson(req.body(), ShoppingCart.class);
			customerService.changeCart(cart);
			
			res.status(200);
			return "OK";					
		});
		
		post("/checkout", (req, res) -> {
			res.type("application/json");
			ShoppingCart cart = g.fromJson(req.body(), ShoppingCart.class);
			if(!cart.getMenuItems().isEmpty()) {
				customerService.emptyCart(cart);
				
				ArrayList<Order> newOrders = orderService.createOrders(cart);		
				customerService.addOrders(newOrders);
			}
			res.status(200);
			return g.toJson("");
		});

		post("/getOrders", (req, res) -> {
			res.type("application/json");
			User user = g.fromJson(req.body(), User.class);
			ArrayList<Order> orders  = new ArrayList<Order>();
			
			if(user.getRole() == RoleEnum.CUSTOMER)
				orders = orderService.getForCustomer(user.getId());
			else if(user.getRole() == RoleEnum.COURIER) 
				orders = orderService.getForCourier(user.getId(),user.getUsername());
			else if(user.getRole() == RoleEnum.MANAGER) 		//ustvari trazim za restoran jer je to isto
				orders = orderService.getForManager(managerService.getManagerByID(user.getId()).getRestaurantId());
			
			ArrayList<OrderDTO> dtos = new ArrayList<OrderDTO>();
			for (Order o : orders)
			{
				OrderDTO dto = new OrderDTO(o, restaurantService.getById(o.getRestaurantId()).getName(), restaurantService.getById(o.getRestaurantId()).getRestaurantType());
				dtos.add(dto);
			}
			
			res.status(200);
			return g.toJson(dtos);
		});
		
		post("/findRestaurant",(req, res) -> {
			res.type("application/json");
			Order order = g.fromJson(req.body(), Order.class);
			res.status(200);
			return g.toJson(restaurantService.getById(order.getRestaurantId()));
		});
	}
}
