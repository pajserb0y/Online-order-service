package model;

import java.awt.Menu;
import java.sql.Date;
import java.util.ArrayList;
import java.util.UUID;

import model.Enums.OrderStatusEnum;
import model.Enums.RestaurantTypeEnum;

public class Order extends Entity{
	protected UUID restaurantId;
	protected UUID customerId;
	protected UUID currierId;
	protected ArrayList<MenuItem> menuItems;
	protected String timeOfOrder;
	protected double price;
	protected OrderStatusEnum orderStatus;
	protected ArrayList<String> requests;	//zahtevi kurira da preuzme paket koji cekaju da menadzer odabere kurira
//	protected RestaurantTypeEnum restaurantType;
//	protected String restaurantName;
//	public String getRestaurantName() {
//		return restaurantName;
//	}
//
//	public void setRestaurantName(String restaurantName) {
//		this.restaurantName = restaurantName;
//	}

	
	
	public Order()
	{
		super();
		menuItems = new ArrayList<MenuItem>();
		requests = new ArrayList<String>();
	}
	
	public Order(UUID restaturanId, UUID customerId, UUID currierId, ArrayList<MenuItem> menuItems, String timeOfOrder,
			double price, OrderStatusEnum orderStatus,  ArrayList<String> requests) {
		super();
		this.restaurantId = restaturanId;
		this.customerId = customerId;
		this.currierId = currierId;
		this.menuItems = menuItems;
		this.timeOfOrder = timeOfOrder;
		this.price = price;
		this.orderStatus = orderStatus;
//		this.restaurantType = restaurantType;
		this.requests = requests;
	}

	public UUID getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(UUID restaturanId) {
		this.restaurantId = restaturanId;
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

	public String getTimeOfOrder() {
		return timeOfOrder;
	}

	public void setTimeOfOrder(String timeOfOrder) {
		this.timeOfOrder = timeOfOrder;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public OrderStatusEnum getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatusEnum orderStatus) {
		this.orderStatus = orderStatus;
	}

//	public RestaurantTypeEnum getRestaurantType() {
//		return restaurantType;
//	}
//
//	public void setRestaurantType(RestaurantTypeEnum restaurantType) {
//		this.restaurantType = restaurantType;
//	}

	public ArrayList<String> getRequests() {
		return requests;
	}

	public void setRequests(ArrayList<String> requests) {
		this.requests = requests;
	}
	
}
