package services;

import java.io.File;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.UUID;
import java.util.stream.Collectors;

import com.google.gson.Gson;

import model.MenuItem;
import model.Restaurant;
import model.Enums.RestaurantStatusEnum;

public class RestaurantService {

	public static ArrayList<Restaurant> restaurantList = new ArrayList<Restaurant>();
	public static Restaurant selectedRestaurant;

	

	private static void save() {
		try {
		    Gson gson = new Gson();

		    Writer writer = Files.newBufferedWriter(Paths.get("storage"+File.separator+"restaurants.json"));

		    gson.toJson(restaurantList, writer);

		    writer.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}

	public static void load() {
		try {
		    Gson gson = new Gson();

		    Reader reader = Files.newBufferedReader(Paths.get("storage"+File.separator+"restaurants.json"));

		    Restaurant[] restaurants = gson.fromJson(reader, Restaurant[].class);
		    Collections.addAll(restaurantList, restaurants);

		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}

	public static ArrayList<Restaurant> getAll() {
		ArrayList<Restaurant> restaurants = new ArrayList<Restaurant>();
		for (Restaurant restaurant: restaurantList) {
			if (!restaurant.isDeleted()) {
				restaurants.add(restaurant);
				
			}
		}
		restaurants = (ArrayList<Restaurant>) restaurants.stream()
				  .sorted(Comparator.comparing(Restaurant::getStatus))
				  .collect(Collectors.toList());

		return restaurants;
	}

	public Restaurant getById(UUID id){ 
		for (Restaurant restaurant: restaurantList) 
			if (!restaurant.isDeleted() && restaurant.getId().equals(id)) 
				return restaurant;
		return null;
	}

	public static void addRestaurant(Restaurant restaurant) {
		restaurant.setDeleted(false);
		restaurant.setMenu(new ArrayList<UUID>());
		restaurant.setLogoPath("restaurantLogo"+File.separator+ "RES" + restaurant.getId().toString() + ".png");
		restaurant.setStatus(RestaurantStatusEnum.OPEN);
		restaurant.setRating(0);

		restaurantList.add(restaurant);
		save();

	}

	public static void delete(UUID id) {
		for (Restaurant restaurant : restaurantList) {
			if (restaurant.getId().equals(id)) {
				restaurant.setDeleted(true);
				break;
			}
		}
		save();
	}
	
	public static void setMenuItemForRestaurant(MenuItem menuItem) {
		for (Restaurant restaurant : restaurantList) {
			if (restaurant.getId().equals(menuItem.getRestorantId())) {
				ArrayList<UUID> menu = restaurant.getMenu();
				menu.add(menuItem.getId());
				restaurant.setMenu(menu);
				break;
			}
		}
		save();
	}

	public void setSelectedRestaurant(Restaurant restaurant) {
		// TODO Auto-generated method stub
		this.selectedRestaurant = restaurant;
	}
	
	public static Restaurant getSelectedRestaurant() {
		return selectedRestaurant;
	}

}
