package model;

public class Admin extends User {
	
	public Admin(String username, String password, String firstName, String lastName, Gender gender, String dateOfBirth,
			Role role) {
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
