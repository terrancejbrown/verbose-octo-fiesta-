package com.FDM.terrancebrown.CarApp.controllers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.servlets.DefaultServlet;
import org.apache.log4j.Logger;

import com.FDM.terrancebrown.CarApp.delegates.*;

public class FrontController extends DefaultServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1988286498764243874L;
	private Logger log = Logger.getLogger(FrontController.class);
	private RequestMapper rm = new RequestMapper();
	
	private void process(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
		String uri = req.getRequestURI();
		log.trace(uri);
		log.trace(req.getContextPath());
		uri = uri.substring(req.getContextPath().length()+1);
		log.trace(uri);
		if(uri.startsWith("static")) {
			super.doGet(req, resp);
			return;
		}
		log.trace("Handling dynamic content.");
		FrontControllerDelegate d = rm.dispatch(req, resp);
		if(d!=null) {
			d.process(req, resp);
		} else {
			resp.sendError(HttpServletResponse.SC_NOT_FOUND);
		}
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		process(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		process(req, resp);
	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		process(req, resp);
	}

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		process(req, resp);
	}

	@Override
	protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		process(req, resp);
	}
	
	
}
