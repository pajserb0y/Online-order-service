package model;

import java.util.UUID;

public class Entity {
	
	protected UUID id;
	protected boolean deleted;
	
	public Entity()
	{
		id = UUID.randomUUID(); 
		deleted = false;
	}
	
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public boolean isDeleted() {
		return deleted;
	}
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
}
