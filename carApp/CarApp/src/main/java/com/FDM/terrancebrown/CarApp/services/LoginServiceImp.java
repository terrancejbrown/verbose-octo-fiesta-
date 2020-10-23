package com.FDM.terrancebrown.CarApp.services;

import java.util.Set;

import org.apache.log4j.Logger;

import com.FDM.terrancebrown.CarApp.beans.*;
import com.FDM.terrancebrown.CarApp.data.*;

public class LoginServiceImp implements LoginService {
	private Logger log = Logger.getLogger(LoginServiceImp.class);

	
	private LoginDAO ld = new LoginImp();
	
	@Override
	public Login getUser(String username, String password) {
		Login login = new Login (username, password);
//		login = ld.getUser(login);
		Login emp = ld.getUser(login);
		emp = ld.getUser(emp);
		
		if(emp.getId()==0)
		{
			log.trace("No user found");
			return null;
		}
		if(emp.getSup()!=null)
		{
			log.trace("Retrieving supervisor");
			emp.setSup(getEmployeeById(emp.getSup().getId()));
		}
		return emp;
	}

	@Override
	public Employee getEmployeeById(int i) {
		log.trace("retrieving employee by id: "+i);
		Employee emp = new Employee(i);
		emp = (Employee) ld.getUserById(emp);
		emp = ld.getEmployee(emp);
		if(emp.getId()==0)
		{
			log.trace("No employee found");
			return null;
		}
		if(emp.getSup()!=null)
		{
			log.trace("Retrieving supervisor");
			emp.setSup(getEmployeeById(emp.getSup().getId()));
		}
		return emp;
	}

	@Override
	public Set<Employee> getEmployees() {
		Set<Employee> empList = ld.getEmployees();
		for(Employee e : empList)
		{
			ld.getUserById(e);
			e.setSup(getEmployeeById(e.getSup().getId()));
		}
		return empList;
	}

	@Override
	public void deleteEmployee(Employee emp) {
		ld.deleteEmployee(emp);

	}

	@Override
	public void updateEmployee(Employee emp) {
		ld.updateUser(emp);
		if(emp.getSup().getFirstName()!=null)
			ld.updateEmployee(emp.getSup());
		ld.updateEmployee(emp);

	}

	@Override
	public void addEmployee(Employee emp) {
		Login l = ld.getUser(ld.getUser(emp.getUsername(), emp.getPassword()));
		if(l==null)
		{
			ld.addUser(emp);
		}
		Employee supervisor = ld.getEmployee(emp.getSup());
		if(supervisor!=null)
		{
			emp.setSup(supervisor);
		}
	}



}
