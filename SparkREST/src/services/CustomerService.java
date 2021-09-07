package services;

import java.io.File;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.UUID;

import com.google.gson.Gson;
import com.google.gson.JsonElement;

import model.Customer;
import model.MenuItem;
import model.ShoppingCart;
import model.User;
import model.Enums.CustomerTypeEnum;
import model.Enums.RoleEnum;



public class CustomerService {
	
	public static ArrayList<Customer> customerList = new ArrayList<Customer>();
//	private static CustomerType normal = new CustomerType("NORMAL",0,0);
//	private static CustomerType bronze = new CustomerType("BRONZE",1,1000);
//	private static CustomerType silver = new CustomerType("SILVER",2,3000);
//	private static CustomerType gold = new CustomerType("GOLD",5,20000);
	
	public static void load() {
		try {
		    Gson gson = new Gson();
		    Reader reader = Files.newBufferedReader(Paths.get("storage"+File.separator+"customers.json"));
		    Customer[] customers = gson.fromJson(reader, Customer[].class);
		    Collections.addAll(customerList, customers);
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	private static void save() {
		try {
		    Gson gson = new Gson();
		    Writer writer = Files.newBufferedWriter(Paths.get("storage"+File.separator+"customers.json"));
		    gson.toJson(customerList, writer);
		    writer.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public static void add(Customer customer) {
		
		customer.setRole(RoleEnum.CUSTOMER);
		//customer.setEntityID(generateID());
		customer.setOrders(new ArrayList<UUID>());
		customer.setShoppingCart(new ShoppingCart(customer.getId()));
		customer.setDeleted(false);
		customer.setCustomerType(CustomerTypeEnum.BRONZE);
		customerList.add(customer);
		save();
	}
	
	public Customer edit(User user) {
		for (Customer customer: getAll()) {
			if(customer.getId().equals(user.getId())) {
				customer.setFirstName(user.getFirstName());
				customer.setLastName(user.getLastName());
				customer.setGender(user.getGender());
				customer.setPassword(user.getPassword());
				customer.setUsername(user.getUsername());
				customer.setDateOfBirth(user.getDateOfBirth());
				
				save();
				System.out.println(customer.getUsername() + "  id: " + customer.getId() + " ---- " + user.getId());
				return customer;
			}
		}
		return null;
	}
	
	public static void delete(UUID customerID) {
		for (Customer customer : customerList) {
			if (customer.getId().equals(customerID)) {
				customer.setDeleted(true);
				break;
			}
		}
		
		save();	
	}
	
	public static boolean login(String username, String password) {
		for (Customer customer : customerList) {
			if (customer.getUsername().equals(username) && customer.getPassword().equals(password) && !customer.isDeleted()) {
				return true;
			}
		}
		return false;
	}
	
	public static Customer getCustomerByUsername(String username) {
		for (Customer customer : customerList) {
			if (customer.getUsername().equals(username) && !customer.isDeleted()) {
				return customer;
			}
		}			
		return null;
	}
	
	public static ArrayList<Customer> getAll() {
		ArrayList<Customer> customers = new ArrayList<Customer>();
		for (Customer customer: customerList) {
			if (!customer.isDeleted()) {
				customers.add(customer);
			}
		}			
		return customers;
	}

	public boolean checkUsernameAvailability(String username) {
		// TODO Auto-generated method stub
		for (Customer customer : customerList) {
			if (customer.getUsername().equals(username) && !customer.isDeleted()) {
				return false;
			}
		}			
		return true;
	}
	
	public boolean checkUsernameAvailability(String username, UUID id) {
		// TODO Auto-generated method stub
		for (Customer customer : customerList) {
			if (customer.getUsername().equals(username) && !customer.isDeleted() && !customer.getId().equals(id)) {
				return false;
			}
		}			
		return true;
	}

	public static Customer getCustomerByID(UUID id) {
		// TODO Auto-generated method stub
		for (Customer customer : customerList) {
			if (customer.getId().equals(id) && !customer.isDeleted()) {
				//System.out.print(customer.toString());
				return customer;
			}
		}			
		return null;
	}
	
	public static void addItemsToShoppingCart(ShoppingCart shoppingCartDTO) 	//objekat shopingCart sluzi kao DTO za dodavanje pojedinacnog istog meniItema, koji moze biti u vecem broju,
																				//u shoppingCart trenutnog korisnika 
	{
		Customer currCustomer = getCustomerByID(shoppingCartDTO.getCustomerId());
		
		ArrayList<MenuItem> oldMenuItems = currCustomer.getShoppingCart().getMenuItems();
		MenuItem newItem = shoppingCartDTO.getMenuItems().get(0);
		
		double price = currCustomer.getShoppingCart().getPrice();
		boolean found = false;
		for (MenuItem oneOldItem : oldMenuItems)
		{
			if (oneOldItem.getId().equals(newItem.getId()))
			{
				oneOldItem.setCount(oneOldItem.getCount() + newItem.getCount());
				price += newItem.getPrice() * newItem.getCount();
				found = true;
				break;
			}			
		}
		if (!found)
		{
			oldMenuItems.add(newItem);
			price += newItem.getPrice() * newItem.getCount();
		}

		
		shoppingCartDTO.setMenuItems(oldMenuItems);
		shoppingCartDTO.setPrice(price);
		currCustomer.setShoppingCart(shoppingCartDTO);
		
		save();
	}
	
	public ShoppingCart getCart(UUID customerId) {
			return getCustomerByID(customerId).getShoppingCart();
	}
	
	public void changeCart(ShoppingCart cart) {
		Customer customer = getCustomerByID(cart.getCustomerId());
		customer.setShoppingCart(cart);
		double price = 0;
		for (MenuItem menuItem : customer.getShoppingCart().getMenuItems()) 
			price += menuItem.getPrice()*menuItem.getCount();
		//price = price - (price * customer.getCustomerType().getDiscount()/100);
				
		customer.getShoppingCart().setPrice(price);
		save();
	}
}
