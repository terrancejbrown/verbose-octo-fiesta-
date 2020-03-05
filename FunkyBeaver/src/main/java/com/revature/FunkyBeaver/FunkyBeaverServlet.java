package com.revature.FunkyBeaver;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FunkyBeaverServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2320938814852603607L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	
		resp.getWriter().write("FUNKY BEAVER");
		
	}
 
	


}
