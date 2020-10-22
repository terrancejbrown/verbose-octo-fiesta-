package com.FDM.terrancebrown.CarApp.utilities;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class ConnectionSingleton {
	// modularization and singleton access to the connection to the database
	// Singleton Connection Factory
	private static ConnectionSingleton cs = null;
	private static Properties prop;
	private ConnectionSingleton() {
		prop = new Properties();
		try {
			// Use the class loader to retrieve the properties file
			// this reduces reliance on the file system.
			InputStream dbProps = ConnectionSingleton.class.getClassLoader()
					.getResourceAsStream("database.properties");
			prop.load(dbProps);
		} catch(Exception e) {
			LogUtility.logException(e, ConnectionSingleton.class);
		}
	}
	public static synchronized ConnectionSingleton getConnectionSingleton() {
		if(cs== null)
			cs = new ConnectionSingleton();
		return cs;
	}
	public Connection getConnection() {
		Connection conn = null;
		try {
			// We have to register our driver class
			Class.forName(prop.getProperty("driver"));
			conn = DriverManager.getConnection(
					prop.getProperty("url"), // the url of the db
					prop.getProperty("usr"), // our username
					prop.getProperty("psw") // our password
					);
		} catch(Exception e) {
			LogUtility.logException(e, ConnectionSingleton.class);
		}
		return conn;
	}
}