package model;

import java.util.UUID;

import model.Enums.MenuItemTypeEnum;
import model.Enums.QuantityTypeEnum;

public class MenuItem extends  Entity {
	
	protected String name;
	protected double price;
	protected MenuItemTypeEnum type;
	protected UUID restorantId;
	protected Integer quantity;
	protected QuantityTypeEnum quantityType;
	protected String description;
	protected String picturePath;
	protected Integer count; //number of ordered items from restaurant
	
	public MenuItem(String name, double price, MenuItemTypeEnum type, UUID restorantId, Integer quantity,
			String description, String picturePath, Integer count) {
		super();
		this.name = name;
		this.price = price;
		this.type = type;
		this.restorantId = restorantId;
		this.quantity = quantity;
		this.description = description;
		this.picturePath = picturePath;
		this.count = count;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public MenuItemTypeEnum getType() {
		return type;
	}

	public void setType(MenuItemTypeEnum type) {
		this.type = type;
	}

	public UUID getRestorantId() {
		return restorantId;
	}

	public void setRestorantId(UUID restorantId) {
		this.restorantId = restorantId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPicturePath() {
		return picturePath;
	}

	public void setPicturePath(String picturePath) {
		this.picturePath = picturePath;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
	
	
}
