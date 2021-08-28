package model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.UUID;

enum OrderStatus{
	PROCESSING,
	INPREP,
	WAITING,
	TRANSPORT,
	DELIVERED,
	CANCELED
}
public class Order extends Entity{
	protected UUID restaturanId;
	protected UUID customerId;
	protected UUID currierId;
	protected ArrayList<MenuItem> menuItems;
	protected Date timeOfOrder;
	protected double price;
	protected OrderStatus orderStatus;
	protected RestaurantType restaurantType;
	protected ArrayList<String> requests;
	
	public Order(UUID restaturanId, UUID customerId, UUID currierId, ArrayList<MenuItem> menuItems, Date timeOfOrder,
			double price, OrderStatus orderStatus, RestaurantType restaurantType, ArrayList<String> requests) {
		super();
		this.restaturanId = restaturanId;
		this.customerId = customerId;
		this.currierId = currierId;
		this.menuItems = menuItems;
		this.timeOfOrder = timeOfOrder;
		this.price = price;
		this.orderStatus = orderStatus;
		this.restaurantType = restaurantType;
		this.requests = requests;
	}

	public UUID getRestaturanId() {
		return restaturanId;
	}

	public void setRestaturanId(UUID restaturanId) {
		this.restaturanId = restaturanId;
	}

	public UUID getCustomerId() {
		return customerId;
	}

	public void setCustomerId(UUID customerId) {
		this.customerId = customerId;
	}

	public UUID getCurrierId() {
		return currierId;
	}

	public void setCurrierId(UUID currierId) {
		this.currierId = currierId;
	}

	public ArrayList<MenuItem> getMenuItems() {
		return menuItems;
	}

	public void setMenuItems(ArrayList<MenuItem> menuItems) {
		this.menuItems = menuItems;
	}

	public Date getTimeOfOrder() {
		return timeOfOrder;
	}

	public void setTimeOfOrder(Date timeOfOrder) {
		this.timeOfOrder = timeOfOrder;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

	public RestaurantType getRestaurantType() {
		return restaurantType;
	}

	public void setRestaurantType(RestaurantType restaurantType) {
		this.restaurantType = restaurantType;
	}

	public ArrayList<String> getRequests() {
		return requests;
	}

	public void setRequests(ArrayList<String> requests) {
		this.requests = requests;
	}
	
}
