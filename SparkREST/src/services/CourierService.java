package services;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.UUID;

import com.google.gson.Gson;

import model.Courier;
import model.Role;
import model.User;

public class CourierService {
	public static ArrayList<Courier> courierList;
	
	private static void load() 
	{
		Gson gson = new Gson();
		
		Reader reader;
		try {			
			reader = Files.newBufferedReader(Paths.get("files"+File.separator+"couriers.json"));
			
			Courier[] couriers = gson.fromJson(reader, Courier[].class);
			Collections.addAll(courierList,couriers);
			
			reader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void save()
	{
		Gson gson = new Gson();
		
		Writer writer;
		
		try {
			writer = Files.newBufferedWriter(Paths.get("files"+File.separator+"couriers.json"));
			
			gson.toJson(courierList,writer);
			
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void add(Courier courier)
	{
		//not setting info for courier here but in the call of addCourier
		courier.setRole(Role.COURIER);
		courier.setOrders(new ArrayList<UUID>());
		courier.setDeleted(false);
		courierList.add(courier);
		save();
	}
	
	public static boolean checkUsernameAvailability(String username) 
	{
		for (Courier courier : courierList) 
		{
			if (courier.getUsername().equals(username) && !courier.isDeleted()) 
				return false;
		}
		return true;
	}
	
	public static boolean loginCourier(String username, String password) 
	{
		for (Courier courier : courierList) {
			if (courier.getUsername().equals(username) && courier.getPassword().equals(password) && !courier.isDeleted())
			{
				return true;
			}
		}	
		return false;
	}
	public static Courier getCourierByUsername(String username) {
		for (Courier courier: courierList) {
			if (courier.getUsername().equals(username) && !courier.isDeleted()) {
				return courier;
			}
		}
			
		return null;
	}
	
	public static ArrayList<Courier> getAll() {
		ArrayList<Courier> couriers = new ArrayList<Courier>();
		for (Courier courier: courierList) 
		{
			if (!courier.isDeleted()) 
				couriers.add(courier);
		}	
		return couriers;
	}
	
	public static Courier getCourierByID(UUID id) {
		for (Courier courier: courierList) {
			if (courier.getId().equals(id) && !courier.isDeleted())
				return courier;
		}
		return null;
	}
	
	public Courier edit(User user) 
	{
		for (Courier courier: courierList) {
			if(courier.getId().equals(user.getId())) 
			{
				courier.setFirstName(user.getFirstName());
				courier.setLastName(user.getLastName());
				courier.setGender(user.getGender());
				courier.setPassword(user.getPassword());
				courier.setUsername(user.getUsername());
				courier.setDateOfBirth(user.getDateOfBirth());
				
				save();
				return courier;
			}
		}
		return null;
	}
	
	public static void delete(UUID id) {
		for (Courier courier: courierList) {
			if (courier.getId().equals(id)) 
			{
				courier.setDeleted(true);
				break;
			}
		}
		save();
	}
	
	public void addOrderToCourier(UUID orderId, UUID courierId) {
		for (Courier courier: courierList) {
			if (courier.getId().equals(courierId)) 
			{
				courier.getOrders().add(orderId);
				break;
			}
		}
		save();
	}
}
