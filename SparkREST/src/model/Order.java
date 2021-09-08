package model;

import java.util.ArrayList;
import java.util.UUID;

import model.Enums.OrderStatusEnum;

public class Order extends Entity{
	protected UUID restaurantId;
	protected UUID customerId;
	protected UUID courierId;
	protected ArrayList<MenuItem> menuItems;
	protected String timeOfOrder;
	protected double price;
	protected OrderStatusEnum orderStatus;
	protected ArrayList<Courier> requests;	//zahtevi kurira da preuzme paket koji cekaju da menadzer odabere kurira
	
	
	public Order()
	{
		super();
		menuItems = new ArrayList<MenuItem>();
		requests = new ArrayList<Courier>();
	}
	
	public Order(UUID restaturanId, UUID customerId, UUID currierId, ArrayList<MenuItem> menuItems, String timeOfOrder,
			double price, OrderStatusEnum orderStatus,  ArrayList<Courier> requests) {
		super();
		this.restaurantId = restaturanId;
		this.customerId = customerId;
		this.courierId = currierId;
		this.menuItems = menuItems;
		this.timeOfOrder = timeOfOrder;
		this.price = price;
		this.orderStatus = orderStatus;
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
		return courierId;
	}

	public void setCurrierId(UUID currierId) {
		this.courierId = currierId;
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

	public ArrayList<Courier> getRequests() {
		return requests;
	}

	public void setRequests(ArrayList<Courier> requests) {
		this.requests = requests;
	}
	
}
