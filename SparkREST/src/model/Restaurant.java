package model;

import java.util.ArrayList;
import java.util.UUID;

import model.Enums.RestaurantStatusEnum;
import model.Enums.RestaurantTypeEnum;

public class Restaurant extends Entity {
	protected String name;
	protected UUID manager;
	protected ArrayList<UUID> menu;
	protected RestaurantStatusEnum status;
	protected RestaurantTypeEnum type;
	protected Location location;
	protected String logoPath;
	protected double rating;


	public Restaurant() {
		super();
	}

	public Restaurant(String name, UUID manager, ArrayList<UUID> menu, RestaurantStatusEnum status,
			RestaurantTypeEnum restaturantType, Location location, String logoPath, double raiting) {
		super();
		this.name = name;
		this.manager = manager;
		this.menu = menu;
		this.status = status;
		this.type = restaturantType;
		this.location = location;
		this.logoPath = logoPath;
		this.rating = raiting;
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public UUID getManager() {
		return manager;
	}

	public void setManager(UUID manager) {
		this.manager = manager;
	}

	public ArrayList<UUID> getMenu() {
		return menu;
	}

	public void setMenu(ArrayList<UUID> menu) {
		this.menu = menu;
	}

	public RestaurantStatusEnum getStatus() {
		return status;
	}

	public void setStatus(RestaurantStatusEnum status) {
		this.status = status;
	}

	public RestaurantTypeEnum getRestaturantType() {
		return type;
	}

	public void setRestaturantType(RestaurantTypeEnum restaturantType) {
		this.type = restaturantType;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getLogoPath() {
		return logoPath;
	}

	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double raiting) {
		this.rating = raiting;
	}

	@Override
	public String toString() {
		return "Restaurant [name=" + name + ", manager=" + manager + ", menu=" + menu + ", status=" + status
				+ ", restaturantType=" + type + ", location=" + location + ", logoPath=" + logoPath
				+ ", raiting=" + rating + ", id=" + id + ", deleted=" + deleted + "]";
	}
}