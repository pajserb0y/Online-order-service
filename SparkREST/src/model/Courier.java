package model;

import java.util.ArrayList;
import java.util.UUID;

import model.Enums.RoleEnum;

public class Courier extends User{
	protected ArrayList<UUID> orders;

	public Courier(ArrayList<UUID> orders) {
		super();
		this.orders = orders;
	}

	
	public Courier() {
		super();
		this.orders = new ArrayList<UUID>();
		// TODO Auto-generated constructor stub
	}

	

	public Courier(String username, String password, String firstName, String lastName, Gender gender,
			String dateOfBirth, RoleEnum role, ArrayList<UUID> orders) {
		super(username, password, firstName, lastName, gender, dateOfBirth, role);
		this.orders = orders;
	}

	public ArrayList<UUID> getOrders() {
		return orders;
	}

	public void setOrders(ArrayList<UUID> orders) {
		this.orders = orders;
	}


	@Override
	public String toString() {
		return "Courier [orders=" + orders + ", username=" + username + ", password=" + password + ", firstName="
				+ firstName + ", lastName=" + lastName + ", gender=" + gender + ", dateOfBirth=" + dateOfBirth
				+ ", role=" + role + ", id=" + id + ", deleted=" + deleted + "]";
	}

	
}
