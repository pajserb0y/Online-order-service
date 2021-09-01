package model;

import model.Enums.RoleEnum;

public class Admin extends User {
	
	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Admin(String username, String password, String firstName, String lastName, Gender gender, String dateOfBirth,
			RoleEnum role) {
		super(username, password, firstName, lastName, gender, dateOfBirth, role);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Admin [username=" + username + ", password=" + password + ", firstName=" + firstName + ", lastName="
				+ lastName + ", gender=" + gender + ", dateOfBirth=" + dateOfBirth + ", role=" + role + ", id=" + id
				+ ", deleted=" + deleted + "]";
	}
	
}
