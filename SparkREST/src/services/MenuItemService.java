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

import model.MenuItem;

public class MenuItemService {
	
	public static ArrayList<MenuItem> menuItemList = new ArrayList<MenuItem>();

	private static void save() {
		try {
		    Gson gson = new Gson();

		    Writer writer = Files.newBufferedWriter(Paths.get("storage"+File.separator+"menuItems.json"));

		    gson.toJson(menuItemList, writer);

		    writer.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}

	public static void load() {
		try {
		    Gson gson = new Gson();

		    Reader reader = Files.newBufferedReader(Paths.get("storage"+File.separator+"menuItems.json"));

		    MenuItem[] menuItems = gson.fromJson(reader, MenuItem[].class);
		    Collections.addAll(menuItemList, menuItems);

		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public static ArrayList<MenuItem> getMenuForRestaurant(UUID RestaurantId)
	{
		ArrayList<MenuItem> menuItems = new ArrayList<MenuItem>();
		for(MenuItem mi : menuItemList)
		{
			if(mi.getRestorantId().equals(RestaurantId) && !mi.isDeleted())
			{
				menuItems.add(mi);
			}
		}
		return menuItems;
	}
	
	
	public static void delete(UUID MenuItemId) {
		for (MenuItem menuItem : menuItemList) {
			if (menuItem.getId().equals(MenuItemId)) {
				menuItem.setDeleted(true);
				break;
			}
		}
		save();
	}
	
	public static boolean checkNameAvailability(MenuItem item) {
		for (MenuItem menuItem : menuItemList) {
			if (menuItem.getRestorantId().equals(item.getRestorantId()) && menuItem.getName().equals(item.getName()) && !item.getId().equals(menuItem.getId())){
				return false;
			}
		}
		return true;
	}
	
	public static void add(MenuItem item) {
		item.setDeleted(false);
		item.setCount(0);
		menuItemList.add(item);
		RestaurantService.setMenuItemForRestaurant(item);
		
		save();
		
	}
	public static void change(MenuItem item) {
		for (MenuItem menuItem : menuItemList) {
			if (menuItem.getId().equals(item.getId())){
				menuItem.setDescription(item.getDescription());
				menuItem.setName(item.getName());
				menuItem.setPrice(item.getPrice());
				menuItem.setQuantity(item.getQuantity());
				menuItem.setType(item.getType());
				break;
			}
		}
	}

	public static void deleteAllItemsForRestaurant(UUID RestaurantID) {
		for (MenuItem menuItem : menuItemList) {
			if(menuItem.getRestorantId().equals(RestaurantID)) {
				menuItem.setDeleted(true);
			}
		}
		save();
	}
	
}
