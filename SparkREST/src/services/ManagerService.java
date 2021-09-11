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

import model.Manager;
import model.User;
import model.Enums.RoleEnum;

public class ManagerService {

	public static ArrayList<Manager> managerList = new ArrayList<Manager>();
	
	
	public static void load() {		
		try {
		    Gson gson = new Gson();

		    Reader reader = Files.newBufferedReader(Paths.get("storage"+File.separator+"managers.json"));
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

		    Writer writer = Files.newBufferedWriter(Paths.get("storage"+File.separator+"managers.json"));
		    gson.toJson(managerList, writer);
		    writer.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public static void add(Manager manager) {
		
		manager.setRole(RoleEnum.MANAGER);
		//manager.setRestaurantId(null);
		managerList.add(manager);
		save();
	}
	
	public Manager edit(User user) {
		for (Manager manager: managerList) {
			if(manager.getId().equals(user.getId())) {
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
			if (manager.getId().equals(id)) {
				manager.setDeleted(true);
				break;
			}
		}
		save();
	}
	
	public static boolean login(String username, String password) {
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
	
	public static void addRestaurantToManager(UUID managerId, UUID restaurantID) {
		for (Manager manager : getAll()) {
			if(manager.getId().equals(managerId)) {
				manager.setRestaurantId(restaurantID);
				break;
			}
		}
		save();
	}

	public static void deleteRestaurant(UUID restaurantID) {
		for (Manager manager : managerList) {
			if (restaurantID.equals(manager.getRestaurantId()) && !manager.isDeleted()) {
				addRestaurantToManager(manager.getId(), null);
				break;
			}
		}
		save();		
	}

	public boolean checkUsernameAvailability(String username) {
		// TODO Auto-generated method stub
		for (Manager menager : managerList) {
			if (menager.getUsername().equals(username) && !menager.isDeleted()) {
				return false;
			}
		}			
		return true;
	}
	
	public boolean checkUsernameAvailability(String username, UUID id) {
		// TODO Auto-generated method stub
		for (Manager manager : managerList) {
			if (manager.getUsername().equals(username) && !manager.isDeleted() && !manager.getId().equals(id)) {
				return false;
			}
		}			
		return true;
	}

	public static Manager getManagerByID(UUID id) {
		// TODO Auto-generated method stub
		for (Manager manager: managerList) {
			if (manager.getId().equals(id) && !manager.isDeleted()) {
				return manager;
			}
		}			
		return null;
	}
	
	public static ArrayList<Manager> getAvailableManagers() {
		// TODO Auto-generated method stub
		ArrayList<Manager> managers = new ArrayList<Manager>();
		for (Manager manager: managerList) {
			if (manager.getRestaurantId() == (null) && !manager.isDeleted()) {
				 managers.add(manager);
			}
		}	
		if(managers.isEmpty())
			return null;
		else
			return managers;
	}
	
	public static UUID getRestaurantIdByManagerId(UUID managerId) {
		for (Manager manager: managerList) {
			if (manager.getId().equals(managerId) && !manager.isDeleted()) {
				return manager.getRestaurantId();
			}
		}
			
		return null;
	}
}
