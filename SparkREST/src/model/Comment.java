package model;

import java.util.UUID;

import model.Enums.CommentStatusEnum;

public class Comment extends Entity{
	
	protected UUID restaurant;
	protected UUID customer;
	protected Integer rating;
	protected String text;
	protected String username;
	protected CommentStatusEnum approved;
	
	public Comment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Comment(UUID restaurant, UUID customer, Integer rating, String text, String username,
			CommentStatusEnum approved) {
		super();
		this.restaurant = restaurant;
		this.customer = customer;
		this.rating = rating;
		this.text = text;
		this.username = username;
		this.approved = approved;
	}

	public UUID getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(UUID restaurant) {
		this.restaurant = restaurant;
	}

	public UUID getCustomer() {
		return customer;
	}

	public void setCustomer(UUID customer) {
		this.customer = customer;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public CommentStatusEnum getApproved() {
		return approved;
	}

	public void setApproved(CommentStatusEnum approved) {
		this.approved = approved;
	}
	
	

}
