package model;

import model.Enums.RestaurantTypeEnum;

public class OrderDTO extends 	Order
{
	
	String restaurantName;
	RestaurantTypeEnum restaurantType;
	public OrderDTO(Order order, String name, RestaurantTypeEnum type)
	{
		this.restaurantId = order.getRestaurantId();
		this.customerId = order.getCustomerId();
		this.currierId = order.getCurrierId();
		this.menuItems = order.getMenuItems();
		this.timeOfOrder = order.getTimeOfOrder();
		this.price = order.getPrice();
		this.orderStatus = order.getOrderStatus();
//		this.restaurantType = restaurantType;
		this.requests = order.getRequests();
		this.restaurantName = name;
		this.restaurantType = type;
	}
	@Override
	public String toString() {
		return "OrderDTO [restaurantName=" + restaurantName
				+ ", restaurantType=" + restaurantType
				+ ", restaurantId=" + restaurantId + ", customerId="
				+ customerId + ", currierId=" + currierId
				+ ", menuItems=" + menuItems + ", timeOfOrder="
				+ timeOfOrder + ", price=" + price + ", orderStatus="
				+ orderStatus + ", requests=" + requests + ", id=" + id
				+ ", deleted=" + deleted + "]";
	}		
}
