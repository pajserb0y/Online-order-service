package model;

import java.util.UUID;

import model.Enums.RoleEnum;

public class Manager extends User{
	protected UUID restaurantId;

	public Manager() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Manager(String username, String password, String firstName, String lastName, Gender gender,
			String dateOfBirth, RoleEnum role, UUID restaurantId) {
		super(username, password, firstName, lastName, gender, dateOfBirth, role);
		this.restaurantId = restaurantId;
		// TODO Auto-generated constructor stub
	}

	public UUID getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(UUID restaurantId) {
		this.restaurantId = restaurantId;
	}

	@Override
	public String toString() {
		return "Manager [restaurantId=" + restaurantId + "]";
	}
	
}
