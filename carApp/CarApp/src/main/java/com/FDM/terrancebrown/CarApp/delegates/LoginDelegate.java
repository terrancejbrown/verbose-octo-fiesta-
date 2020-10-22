package com.FDM.terrancebrown.CarApp.delegates;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.FDM.terrancebrown.CarApp.beans.*;
import com.FDM.terrancebrown.CarApp.services.*;


public class LoginDelegate implements FrontControllerDelegate {
	private Logger log = Logger.getLogger(LoginDelegate.class);

	private LoginService ls = new LoginServiceImp();
	private ObjectMapper om = new ObjectMapper();

	@Override
	public void process(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
		log.trace(req.getMethod() + " received by login delegate");
		HttpSession session = req.getSession();
		switch (req.getMethod()) {
		case "GET":
			checkLogin(req, resp);
			break;
		case "POST":
			// logging in
			Login user = (Login) session.getAttribute("loggedEmployee");
			
			if (user != null ) {
				respondWithUser(resp, user);
			} else {
				checkLogin(req, resp);
			}
			break;
		case "DELETE":
			// logging out
			session.invalidate();
			// disassociates an id with a session and response says to delete cookie
			log.trace("User logged out");
			resp.setStatus(HttpServletResponse.SC_NO_CONTENT);
			break;
		default:
			break;
		}
	}

	private void checkLogin(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		log.trace("Logging in!");
		HttpSession session = req.getSession();
		Login u = (Login) session.getAttribute("loggedEmployee");
		if (u != null) {
			respondWithUser(resp, u);
		} else {

			// Need to see if we are an employee. Then we need to see if we are a customer.
			// Then we need to store that information in the session object.
			String username = req.getParameter("user");
			String password = req.getParameter("pass");
			log.trace((username + " " + password));
		
			u = ls.getUser(username, password);

			if (u != null) {
				log.trace("employee being added to session");
				session.setAttribute("loggedEmployee", u);
			}
			if (u == null) {
				resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No user found with those credentials");
			} else {
				respondWithUser(resp, u);
			}
		}
	}

	private void respondWithUser(HttpServletResponse resp, Login user) throws IOException {
		resp.setStatus(HttpServletResponse.SC_OK);
		String e = om.writeValueAsString(user);
		StringBuilder sb = new StringBuilder("{\"employee\":");
		sb.append(e);
		sb.append("}");
		resp.getWriter().write(sb.toString());
	}

}
