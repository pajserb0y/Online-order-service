package services;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.UUID;

import com.google.gson.Gson;

import javaxt.utils.string;
import model.Admin;
import model.User;

public class AdminService {
	
	public static ArrayList<Admin> adminList = new ArrayList<Admin>();
	
	private static void load() 
	{
		Gson gson = new Gson();
		
		Reader reader;
		try {			
			reader = Files.newBufferedReader(Paths.get("files"+File.separator+"admins.json"));
			
			Admin[] admins = gson.fromJson(reader, Admin[].class);
			Collections.addAll(adminList,admins);
			
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
			writer = Files.newBufferedWriter(Paths.get("files"+File.separator+"admins.json"));
			
			gson.toJson(adminList,writer);
			
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static Admin getAdminById(UUID id)
	{
		for(Admin admin : adminList)
		{
			if(admin.getId().equals(id) && !admin.isDeleted())
				return admin;
		}
		return null;
	}
	
	public static Admin getAdminByUsername(String username)
	{
		for(Admin admin : adminList)
		{
			if(admin.getUsername().equals(username) && !admin.isDeleted())
				return admin;
		}
		return null;
	}
	
	public static ArrayList<Admin> getAll()
	{
		ArrayList<Admin> admins = new ArrayList<Admin>(adminList);
		return admins;
	}
	
	public static boolean checkUsernameAvailability(String username)
	{
		for (Admin admin : adminList)
		{
			if(admin.getUsername().equals(username) && !admin.isDeleted())
				return false;
		}
		return true;
	}
	
	public static boolean login(String username,String password)
	{
		for(Admin admin : adminList)
		{
			if(admin.getUsername().equals(username) && admin.getPassword().equals(password) && !admin.isDeleted())
				return true;
		}
		return false;
	}
	
	public static Admin edit(User user)
	{
		for(Admin admin : adminList)
		{
			if(admin.getId().equals(user.getId()))
			{
				admin.setFirstName(user.getFirstName());
				admin.setLastName(user.getLastName());
				admin.setGender(user.getGender());
				admin.setPassword(user.getPassword());
				admin.setUsername(user.getUsername());
				admin.setDateOfBirth(user.getDateOfBirth());
				
				save();
				return admin;
			}
		}
		return null;
	}
}
