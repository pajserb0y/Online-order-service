package model;

import java.util.ArrayList;
import java.util.UUID;

enum CustomerType{
	GOLD,SILVER,BRONZE
}
public class Customer extends User {
	
	protected ArrayList<UUID> orders;
	protected ShoppingCart shoppingCart;
	protected double points;
	protected CustomerType customerType;
	
	public Customer() {
		super();
		orders = new ArrayList<UUID>();
	}

	public Customer(String username, String password, String firstName, String lastName, Gender gender,
			String dateOfBirth, Role role, ArrayList<UUID> orders, ShoppingCart shoppingCart, double points,
			CustomerType customerType) {
		super(username, password, firstName, lastName, gender, dateOfBirth, role);
		this.orders = orders;
		this.shoppingCart = shoppingCart;
		this.points = points;
		this.customerType = customerType;
	}

	public ArrayList<UUID> getOrders() {
		return orders;
	}

	public void setOrders(ArrayList<UUID> orders) {
		this.orders = orders;
	}

	public ShoppingCart getShoppingCart() {
		return shoppingCart;
	}

	public void setShoppingCart(ShoppingCart shoppingCart) {
		this.shoppingCart = shoppingCart;
	}

	public double getPoints() {
		return points;
	}

	public void setPoints(double points) {
		this.points = points;
	}

	public CustomerType getCustomerType() {
		return customerType;
	}

	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}
	
}
