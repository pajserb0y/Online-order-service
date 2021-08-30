package model;

public class Adress {
	protected String street;
	protected String town;
	protected String postalCode;
	protected String country;
	
	public Adress(String street, String town, String postalCode, String country) {
		super();
		this.street = street;
		this.town = town;
		this.postalCode = postalCode;
		this.country = country;
	}
	
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getTown() {
		return town;
	}
	public void setTown(String town) {
		this.town = town;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	
	
}
