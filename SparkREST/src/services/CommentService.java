package services;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.rmi.server.UID;
import java.util.ArrayList;
import java.util.Collections;
import java.util.UUID;

import com.google.gson.Gson;

import model.Comment;
import model.Enums.CommentStatusEnum;



public class CommentService {
public static ArrayList<Comment> commentList = new ArrayList<Comment>();
	
	public static void load() 
	{
		Gson gson = new Gson();
		
		Reader reader;
		try {			
			reader = Files.newBufferedReader(Paths.get("storage" + File.separator + "comments.json"));			
			Comment[] comments = gson.fromJson(reader, Comment[].class);
			Collections.addAll(commentList, comments);
			
			reader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void save()
	{
		Gson gson = new Gson();
		
		Writer writer;
		
		try {
			writer = Files.newBufferedWriter(Paths.get("storage"+File.separator+"comments.json"));
			gson.toJson(commentList,writer);
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static ArrayList<Comment> getAll() {
		ArrayList<Comment> comments = new ArrayList<Comment>();
		for (Comment comment: commentList) {
			if (!comment.isDeleted()) {
				comments.add(comment);	
			}
		}		
		return comments;
	}
	
	public static ArrayList<Comment> getApproved() {
		ArrayList<Comment> comments = new ArrayList<Comment>();
		for (Comment comment: commentList) {
			if (!comment.isDeleted() && comment.getApproved() == CommentStatusEnum.APPROVED) {
				comments.add(comment);
			}
		}		
		return comments;
	}
	
	public static ArrayList<Comment> getAllForRestaurant(UUID restauratId) {
		ArrayList<Comment> comments = new ArrayList<Comment>();
		System.out.println("comment service " + commentList);
		for (Comment comment: commentList) {
			if (!comment.isDeleted() && restauratId.equals(comment.getRestaurant())) {
				comments.add(comment);
			}
		}		
		return comments;
	}
	
	public static ArrayList<Comment> getApprovedForRestaurant(UUID restaurantId) {
		ArrayList<Comment> comments = new ArrayList<Comment>();
		for (Comment comment: commentList) {
			if (!comment.isDeleted() && restaurantId.equals(comment.getRestaurant()) && comment.getApproved() == CommentStatusEnum.APPROVED) {
				comments.add(comment);
			}
		}		
		return comments;
	}
	

	public static void delete(UUID id) {
		for (Comment comment : commentList) {
			if (comment.getId().equals(id)) {
				comment.setDeleted(true);
				break;
			}
		}
		save();
		
	}

	public static void denyComment(UUID id) {
		for (Comment comment : commentList) {
			if (comment.getId().equals(id)) {
				comment.setApproved(CommentStatusEnum.DENIED);
				break;
			}
		}
		save();
	}
	
	public static void approveComment(UUID id) {
		for (Comment comment : commentList) {
			if (comment.getId().equals(id)) {
				comment.setApproved(CommentStatusEnum.APPROVED);
				break;
			}
		}
		save();
		
	}
	
	public static int calculateRestaurantRating(UUID id) {
		double average = 0;
		double count = 0;
		double sum = 0;
		
		for (Comment comment : commentList) {
			if (id.equals(comment.getRestaurant())) {
				count++;
				sum = sum + comment.getRating();
			}
		}
		
		if (count == 0) {
			return 0;
		}
		else {
			average = sum/count;
			int adjustedAverage = (int) Math.round(average);	
			return adjustedAverage;
		}
		
	}
	
	public static boolean checkCommentable(int delivered, UUID customerId,UUID restaurantId) {
		int comments = 0;
		for (Comment comment : getAll()) {
			if(customerId.equals(comment.getCustomer()) && restaurantId.equals(comment.getRestaurant())) {
				comments++;
			}
		}
		
		if(comments < delivered) {
			return true;
		}
		else {
			return false;
		}

	}

	public static void addComment(Comment comment) {
		comment.setApproved(CommentStatusEnum.ONCHECK);
		comment.setDeleted(false);
		commentList.add(comment);
		save();
	}
}
