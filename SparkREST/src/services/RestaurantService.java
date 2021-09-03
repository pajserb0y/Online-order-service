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

	private static void save() {
		try {
		    Gson gson = new Gson();

		    Writer writer = Files.newBufferedWriter(Paths.get("data"+File.separator+"restaurants.json"));

		    gson.toJson(restaurantList, writer);

		    writer.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}

	public static void load() {
		try {
		    Gson gson = new Gson();

		    Reader reader = Files.newBufferedReader(Paths.get("data"+File.separator+"restaurants.json"));

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

	public static Restaurant getById(UUID id){ 
		for (Restaurant restaurant: restaurantList) 
			if (!restaurant.isDeleted() && restaurant.getId().equals(id)) 
				return restaurant;
		return null;
	}

	public static void addRestaurant(Restaurant restaurant) {
		restaurant.setDeleted(false);
		restaurant.setMenu(new ArrayList<MenuItem>());
		restaurant.setLogoPath("restaurantPictures"+File.separator+ "RES" + restaurant.getId().toString() + ".png");
		restaurant.setStatus(RestaurantStatusEnum.OPEN);
		restaurant.setRaiting(0);

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

}
