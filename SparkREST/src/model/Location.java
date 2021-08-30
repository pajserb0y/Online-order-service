package model;

public class Location {
	protected double geoLatitude;
	protected double geoLongitute;
	protected Adress adress;
	
	public Location(double geoLatitude, double geoLongitute, Adress adress) {
		super();
		this.geoLatitude = geoLatitude;
		this.geoLongitute = geoLongitute;
		this.adress = adress;
	}

	public double getGeoLatitude() {
		return geoLatitude;
	}

	public void setGeoLatitude(double geoLatitude) {
		this.geoLatitude = geoLatitude;
	}

	public double getGeoLongitute() {
		return geoLongitute;
	}

	public void setGeoLongitute(double geoLongitute) {
		this.geoLongitute = geoLongitute;
	}

	public Adress getAdress() {
		return adress;
	}

	public void setAdress(Adress adress) {
		this.adress = adress;
	}
	
	
}
