package model;

import java.util.ArrayList;
import java.util.UUID;

import model.Enums.RestaurantStatusEnum;
import model.Enums.RestaurantTypeEnum;

public class Restaurant extends Entity {
	protected String name;
	protected UUID manager;
	protected ArrayList<MenuItem> menu;
	protected RestaurantStatusEnum status;
	protected RestaurantTypeEnum restaturantType;
	protected Location location;
	protected String logoPath;
	protected double raiting;


	public Restaurant() {
		super();
	}

	public Restaurant(String name, UUID manager, ArrayList<MenuItem> menu, RestaurantStatusEnum status,
			RestaurantTypeEnum restaturantType, Location location, String logoPath, double raiting) {
		super();
		this.name = name;
		this.manager = manager;
		this.menu = menu;
		this.status = status;
		this.restaturantType = restaturantType;
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

	public UUID getManager() {
		return manager;
	}

	public void setManager(UUID manager) {
		this.manager = manager;
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

	public RestaurantTypeEnum getRestaturantType() {
		return restaturantType;
	}

	public void setRestaturantType(RestaurantTypeEnum restaturantType) {
		this.restaturantType = restaturantType;
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

	@Override
	public String toString() {
		return "Restaurant [name=" + name + ", manager=" + manager + ", menu=" + menu + ", status=" + status
				+ ", restaturantType=" + restaturantType + ", location=" + location + ", logoPath=" + logoPath
				+ ", raiting=" + raiting + ", id=" + id + ", deleted=" + deleted + "]";
	}
}