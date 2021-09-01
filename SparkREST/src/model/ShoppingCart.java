package model;

import java.util.ArrayList;
import java.util.UUID;

public class ShoppingCart {
	
	protected UUID customerId;
	protected ArrayList<MenuItem> menuItems;
	protected double price;
	
	public ShoppingCart(UUID customerId) {
		super();
		this.customerId = customerId;
		menuItems = new ArrayList<MenuItem>();
		price = 0;	
	}

	public UUID getCustomerId() {
		return customerId;
	}

	public void setCustomerId(UUID customerId) {
		this.customerId = customerId;
	}

	public ArrayList<MenuItem> getMenuItems() {
		return menuItems;
	}

	public void setMenuItems(ArrayList<MenuItem> menuItems) {
		this.menuItems = menuItems;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "ShoppingCart [customerId=" + customerId + ", menuItems=" + menuItems + ", price=" + price + "]";
	}
	
}
