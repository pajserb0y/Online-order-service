package services;

import java.io.File;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

import com.google.gson.Gson;

import model.Adress;
import model.Courier;
import model.Location;
import model.MenuItem;
import model.Order;
import model.Restaurant;
import model.ShoppingCart;
import model.Enums.OrderStatusEnum;


public class OrderService {
	
	public static ArrayList<Order> orderList = new ArrayList<Order>();
	
	private static void save() {
		try {
		    Gson gson = new Gson();

		    Writer writer = Files.newBufferedWriter(Paths.get("storage"+File.separator+"orders.json"));

		    gson.toJson(orderList, writer);

		    writer.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public static void load() {
		
		try {
		    Gson gson = new Gson();

		    Reader reader = Files.newBufferedReader(Paths.get("storage"+File.separator+"orders.json"));

		    Order[] orders = gson.fromJson(reader, Order[].class);
		    Collections.addAll(orderList, orders);
		    
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public static Order getOrderByID(UUID id) {
		for (Order order: orderList) {
			if (order.getId().equals(id) && !order.isDeleted())
				return order;
		}
		return null;
	}
	
	
	public static ArrayList<Order> getAll() {
		ArrayList<Order> orders = new ArrayList<Order>();
		for (Order order: orderList) {
			if (!order.isDeleted()) {
				orders.add(order);
			}
		}	
		return orders;
	}
	
	public ArrayList<Order> createOrders(ShoppingCart cart) {
		
		ArrayList<Order> orders = new ArrayList<Order>();
		
		for (MenuItem restaurantItem : cart.getMenuItems())
		{
			boolean found = false;
			for (Order o : orders)
			{
				if (restaurantItem.getRestorantId().equals(o.getRestaurantId()))
				{
					ArrayList<MenuItem> oldMenuItems = o.getMenuItems();
					oldMenuItems.add(restaurantItem);	
					o.setMenuItems(oldMenuItems);
					double price = o.getPrice();
					price += restaurantItem.getPrice() * restaurantItem.getCount();
					o.setPrice(price);
					found = true;
					break;
				}
			}
			
			if(!found)
			{
				Order order = new Order();
				order.setCustomerId(cart.getCustomerId());
				order.setDeleted(false);
				order.setRestaurantId(restaurantItem.getRestorantId());
				order.setOrderStatus(OrderStatusEnum.PROCESSING);
				order.setPrice(restaurantItem.getPrice() * restaurantItem.getCount());
				
				order.getMenuItems().add(restaurantItem);			
				
				DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");  
				LocalDateTime now = LocalDateTime.now(); 
				order.setTimeOfOrder(dtf.format(now));
				
				orders.add(order);
			}
		}		
		
		orderList.addAll(orders);
		save();
		
		return orders;
	}
	
	public static void delete(UUID id) {
		for (Order order : orderList) {
			if (order.getId().equals(id)) {
				order.setDeleted(true);
				break;
			}
		}
		save();
	}
	
	public static ArrayList<Order> getForCustomer(UUID customerId) {
		ArrayList<Order> orders = new ArrayList<Order>();
		for (Order order: getAll()) 
			if (order.getCustomerId().equals(customerId) && order.getOrderStatus() != OrderStatusEnum.DELIVERED && order.getOrderStatus() != OrderStatusEnum.CANCELED) 
				orders.add(order);
		
		return orders;
	}
	
	public static ArrayList<Order> getForCourier(UUID courrierId, String username) {
		ArrayList<Order> orders = new ArrayList<Order>();
		for (Order order: getAll()) 
		{
			if (courrierId.equals(order.getCurrierId()) && order.getOrderStatus() != OrderStatusEnum.DELIVERED && order.getOrderStatus() != OrderStatusEnum.CANCELED)
				orders.add(order);
			if(order.getOrderStatus() == OrderStatusEnum.WAITING && !order.getRequests().contains(CourierService.getCourierByUsername(username))) {
				orders.add(order);
			}
		}	
		return orders;
	}
	
	public static ArrayList<Order> getForManager(UUID restaurantId) {		//ustvari trazim za restoran jer je to isto
		ArrayList<Order> orders = new ArrayList<Order>();
		for (Order order: getAll()) 
			if (order.getRestaurantId().equals(restaurantId)) 
				orders.add(order);
		
		return orders;
	}
	
	public static void cancelOrder(UUID orderId) {
		for (Order order : getAll()) {
			if(order.getId().equals(orderId)){
				order.setOrderStatus(OrderStatusEnum.CANCELED);;
				break;
			}
		}
		save();
		
	}

	
	public static void prepareOrder(UUID orderId) {
		System.out.println("poslati ID  "+ orderId);
		
		for (Order order : orderList) {
//			System.out.println(order.getOrderStatus());
//			System.out.println(order.getId());
			if(order.getId().equals(orderId)){
//				System.out.println("prvi if prosao");
				if(order.getOrderStatus() == OrderStatusEnum.PROCESSING){
					order.setOrderStatus(OrderStatusEnum.INPREPARATION);
//					System.out.println(order.getOrderStatus());
					break;
			}
		}
	}		
	save();
	}
	
	public static void finishOrder(UUID orderId) {
		for (Order order : orderList) {
			if(order.getId().equals(orderId)  && order.getOrderStatus() == OrderStatusEnum.INPREPARATION){
				order.setOrderStatus(OrderStatusEnum.WAITING);
				break;
			}
		}
		save();
	}
	
	public static void addRequest(UUID orderId, UUID courierId) {
		for (Order order : orderList) {
			if(order.getId().equals(orderId) && order.getOrderStatus().equals(OrderStatusEnum.WAITING)){
				ArrayList<Courier> couriers = order.getRequests();
				couriers.add(CourierService.getCourierByID(courierId));
				order.setRequests(couriers);
				break;
			}
		}
		save();
		
	}
	
	public static void deliverOrder(UUID orderId) {
		for (Order order : orderList) {
			if(order.getId().equals(orderId) && order.getOrderStatus().equals(OrderStatusEnum.TRANSPORT)){
				order.setOrderStatus(OrderStatusEnum.DELIVERED);
				break;
			}
		}
		save();
		
	}
	
	public static void approveTransportFor(UUID orderId, UUID courierId) {
		for (Order order : orderList) {
			if(order.getId().equals(orderId)){
				order.setCurrierId(courierId);
				order.getRequests().clear();
				order.setOrderStatus(OrderStatusEnum.TRANSPORT);
				break;
			}
		}
		save();
	}
	
	public static void denyTransportFor(UUID orderId, UUID courierId) {
		ArrayList<Courier> requests = new ArrayList<Courier>();
		for (Order order : orderList) {
			if(order.getId().equals(orderId)){
				for(Courier c : order.getRequests())
					if(!c.getId().equals(courierId))
						requests.add(c);

				order.setRequests(requests);
				break;
			}
		}
		save();
	}
	
	public static ArrayList<UUID> getCustomers(UUID restaurantID) {
		ArrayList<UUID> returnIDs = new ArrayList<UUID>();
		for (Order order : getAll()) {
			if(order.getRestaurantId().equals(restaurantID) && !returnIDs.contains(order.getCustomerId())){
				returnIDs.add(order.getCustomerId());
			}
		}
		return returnIDs;
	}
}
