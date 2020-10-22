package com.FDM.terrancebrown.CarApp.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.log4j.Logger;

import com.FDM.terrancebrown.CarApp.beans.*;
import com.FDM.terrancebrown.CarApp.utilities.*;



public class LoginImp implements LoginDAO{
	
	private Logger log = Logger.getLogger(LoginImp.class);
	private ConnectionSingleton cs = ConnectionSingleton.getConnectionSingleton();

	@Override
	public int addUser(Login login) {
		int key =0;
		log.trace("Adding user to database.");
		log.trace(login);
		Connection conn = cs.getConnection();
		try{
			conn.setAutoCommit(false);
			String sql = "insert into login (username, pswd, firstname, lastname) values(?,?,?,?)";
			String[] keys = {"id"};
			PreparedStatement pstm = conn.prepareStatement(sql, keys);
			pstm.setString(1,login.getUsername());
			pstm.setString(2, login.getPassword());
			pstm.setString(3, login.getFirstName());
			pstm.setString(4, login.getLastName());
			
			pstm.executeUpdate();
			ResultSet rs = pstm.getGeneratedKeys();
			
			if(rs.next())
			{
				log.trace("User created.");
				key = rs.getInt(1);
				login.setId(key);
				conn.commit();
			}
			else
			{
				log.trace("User not created.");
				conn.rollback();
			}
		}
		catch(SQLException e)
		{
			LogUtility.rollback(e,conn, LoginImp.class);
		}
		finally {
			try {
				conn.close();
			} catch (SQLException e) {
				LogUtility.logException(e, LoginImp.class);
			}
		}
		return key;
	}

	@Override
	public Login getUser(String username, String password) {
		Login l = null;
		log.trace("Retrieve user from database.");
		try(Connection conn = cs.getConnection()){
			String sql = "select id, firstname, lastname "
					+ "from login where username=? and pswd = ?";
			PreparedStatement pstm = conn.prepareStatement(sql);
			pstm.setString(1, username);
			pstm.setString(2, password);
			ResultSet rs = pstm.executeQuery();
			//username is unique, this query can only ever return a single result, so if is ok.
			if(rs.next())
			{
				log.trace("User found.");
				l = new Login();
				l.setUsername(username);
				l.setPassword(password);
				l.setFirstName(rs.getString("firstname"));
				l.setLastName(rs.getString("lastname"));
				l.setId(rs.getInt("id"));
			}
		}
		catch(Exception e)
		{
			LogUtility.logException(e, LoginImp.class);
		}
		
		return l;
	}
	
	@Override
	public Login getUserById(Login l){
		log.trace("Retrieve user from database.");
		if(l == null)
		{
			throw new RuntimeException("User l cannot be null");
		}
		try(Connection conn = cs.getConnection()){
			String sql = "select id, firstname, lastname, username "
					+ "from login where id=?";
			PreparedStatement pstm = conn.prepareStatement(sql);
			pstm.setInt(1, l.getId());
			ResultSet rs = pstm.executeQuery();
			//id is unique, this query can only ever return a single result, so if is ok.
			if(rs.next())
			{
				log.trace("User found.");
				l.setFirstName(rs.getString("firstname"));
				l.setLastName(rs.getString("lastname"));
				l.setUsername(rs.getString("username"));
				l.setId(rs.getInt("id"));
			}
		}
		catch(Exception e)
		{
			LogUtility.logException(e, LoginImp.class);
		}
		
		return l;
	}
	@Override
	public void deleteUser(Login login) {
		log.trace("Removing user from database.");
		try(Connection conn = cs.getConnection()){
			conn.setAutoCommit(false);
			String sql = "delete from login where id = ?";
			PreparedStatement pstm = conn.prepareStatement(sql);
			pstm.setInt(1, login.getId());
			int number = pstm.executeUpdate();
			if(number!=1)
			{
				log.trace("User not deleted.");
				conn.rollback();
			}
			else
			{
				log.trace("User deleted.");
				conn.commit();
			}
		}
		catch(Exception e)
		{
			LogUtility.logException(e, LoginImp.class);
		}
	}

	@Override
	public void updateUser(Login login) {
		log.trace("Updating user in database.");
		try(Connection conn = cs.getConnection()){
			conn.setAutoCommit(false);
			String sql = "update login set firstname=?, lastname=?, pswd=? where id = ?";
			PreparedStatement pstm = conn.prepareStatement(sql);
			pstm.setString(1, login.getFirstName());
			pstm.setString(2, login.getLastName());
			pstm.setString(3, login.getPassword());
			pstm.setInt(4, login.getId());
			
			int number = pstm.executeUpdate();
			if(number!=1)
			{
				log.trace("User not updated.");
				conn.rollback();
			}
			else
			{
				log.trace("User updated.");
				conn.commit();
			}
		}
		catch(Exception e)
		{
			LogUtility.logException(e, LoginImp.class);
		}
	}
}
