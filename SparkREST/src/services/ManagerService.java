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

import model.Manager;
import model.Role;
import model.User;

public class ManagerService {

	public static ArrayList<Manager> managerList = new ArrayList<Manager>();
	
	
	public static void load() {		
		try {
		    Gson gson = new Gson();

		    Reader reader = Files.newBufferedReader(Paths.get("data"+File.separator+"managers.json"));
		    Manager[] managers = gson.fromJson(reader, Manager[].class);
		    Collections.addAll(managerList, managers);		    
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}		
	}
	
	private static void save() {
		try {
		    Gson gson = new Gson();

		    Writer writer = Files.newBufferedWriter(Paths.get("data"+File.separator+"managers.json"));
		    gson.toJson(managerList, writer);
		    writer.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public static void add(Manager manager) {
		
		manager.setRole(Role.MANAGER);
		//manager.setRestaurantId(0);
		save();
	}
	
	public Manager edit(User user) {
		for (Manager manager: managerList) {
			if(manager.getId() == user.getId()) {
				manager.setFirstName(user.getFirstName());
				manager.setLastName(user.getLastName());
				manager.setGender(user.getGender());
				manager.setPassword(user.getPassword());
				manager.setUsername(user.getUsername());
				manager.setDateOfBirth(user.getDateOfBirth());
				
				save();
				return manager;
			}
		}
		return null;
	}

	public static void delete(UUID id) {
		for (Manager manager : getAll()) {
			if (manager.getId() == id) {
				manager.setDeleted(true);
				break;
			}
		}
		save();
	}
	
	public static boolean loginManager(String username, String password) {
		for (Manager manager : managerList) {
			if (manager.getUsername().equals(username) && manager.getPassword().equals(password) && !manager.isDeleted()) {
				return true;
			}
		}			
		return false;
	}
	
	public static Manager getManagerByUsername(String username) {
		for (Manager manager: managerList) {
			if (manager.getUsername().equals(username) && !manager.isDeleted()) {
				return manager;
			}
		}			
		return null;
	}
	
	public static ArrayList<Manager> getAll() {
		ArrayList<Manager> managers = new ArrayList<Manager>();
		for (Manager manager: managerList) {
			if (!manager.isDeleted()) {
				managers.add(manager);
			}
		}			
		return managers;
	}
	
	public static void addRestaurantToManager(String username, UUID restaurantID) {
		for (Manager manager : getAll()) {
			if(manager.getUsername().equals(username)) {
				manager.setRestaurantId(restaurantID);
				break;
			}
		}
		save();
	}

	public static void deleteRestaurant(UUID restaurantID) {
		for (Manager manager : managerList) {
			if (manager.getRestaurantId() == restaurantID) {
				//manager.setRestaurantId(0);
				break;
			}
		}
		save();		
	}
}
