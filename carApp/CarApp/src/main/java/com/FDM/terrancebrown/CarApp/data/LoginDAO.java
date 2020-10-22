package com.FDM.terrancebrown.CarApp.data;


import com.FDM.terrancebrown.CarApp.beans.*;;

public interface LoginDAO {
	/**
	 * Returns the id of a user object inserted into the database.
	 * 
	 * @param user the user object to be inserted
	 * @return the id of the user object inserted
	 */
	public int addUser(Login login);
	
	/**
	 * returns a login object from the database
	 * 
	 * @param username the username of the user
	 * @param password the password of the user
	 * @return the user from the database that matches the username and password
	 */	
	public Login getUser(String username, String password);
	/**
	 * returns a login object from the database
	 * 
	 * @param u previously created user object for updating with user information
	 * @return the user from the database that matches the username and password
	 */

	public Login getUserById(Login l);
	/**
	 * deletes a User from the database
	 * 
	 * @param user the User to be deleted
	 */
	public void deleteUser(Login login);
	
	/**
	 * updates a User in the database
	 * 
	 * @param user the User to be updated
	 */
	public void updateUser(Login login);
}
