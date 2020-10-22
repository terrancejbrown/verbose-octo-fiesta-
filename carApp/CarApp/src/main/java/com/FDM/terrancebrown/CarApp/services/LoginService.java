package com.FDM.terrancebrown.CarApp.services;

import java.util.Set;

import com.FDM.terrancebrown.CarApp.beans.*;



public interface LoginService {
	public Login getUser(String username, String password);
	public Login getUserById(int i);
	public Set<Login> getUsers();
	public void deleteEmployee(Login emp);
	public void updateEmployee(Login emp);
	public void addEmployee(Login emp);
}
