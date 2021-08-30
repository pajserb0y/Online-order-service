package model;

import java.util.ArrayList;
import java.util.UUID;

public class Curier extends User{
	protected ArrayList<UUID> orders;

	public Curier(ArrayList<UUID> orders) {
		super();
		this.orders = orders;
	}

	
	public Curier() {
		super();
		this.orders = new ArrayList<UUID>();
		// TODO Auto-generated constructor stub
	}


	public Curier(String username, String password, String firstName, String lastName, Gender gender,
			String dateOfBirth, Role role) {
		super(username, password, firstName, lastName, gender, dateOfBirth, role);
		// TODO Auto-generated constructor stub
	}


	public ArrayList<UUID> getOrders() {
		return orders;
	}

	public void setOrders(ArrayList<UUID> orders) {
		this.orders = orders;
	}

	@Override
	public String toString() {
		return "Curier [orders=" + orders + ", username=" + username + ", password=" + password + ", firstName="
				+ firstName + ", lastName=" + lastName + ", gender=" + gender + ", dateOfBirth=" + dateOfBirth
				+ ", role=" + role + ", id=" + id + ", deleted=" + deleted + "]";
	}
	
}
