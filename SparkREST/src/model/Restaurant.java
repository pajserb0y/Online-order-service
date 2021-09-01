package model;

import java.util.ArrayList;

import model.Enums.RestaurantStatusEnum;

public class Restaurant extends Entity {
	protected String name;
	protected ArrayList<MenuItem> menu;
	protected RestaurantStatusEnum status;
	protected Location location;
	protected String logoPath;
	protected double raiting;
	
	public Restaurant(String name, ArrayList<MenuItem> menu, RestaurantStatusEnum status, Location location,
			String logoPath, double raiting) {
		super();
		this.name = name;
		this.menu = menu;
		this.status = status;
		this.location = location;
		this.logoPath = logoPath;
		this.raiting = raiting;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ArrayList<MenuItem> getMenu() {
		return menu;
	}

	public void setMenu(ArrayList<MenuItem> menu) {
		this.menu = menu;
	}

	public RestaurantStatusEnum getStatus() {
		return status;
	}

	public void setStatus(RestaurantStatusEnum status) {
		this.status = status;
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

	public double getRaiting() {
		return raiting;
	}

	public void setRaiting(double raiting) {
		this.raiting = raiting;
	}
}
