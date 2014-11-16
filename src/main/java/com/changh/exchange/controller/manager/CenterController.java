package com.changh.exchange.controller.manager;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.changh.exchange.entity.common.Manager;
import com.changh.exchange.service.common.IManagerService;
import com.changh.exchange.service.common.IRoleService;
import com.reagan.util.components.Component;

@Controller
@RequestMapping(value = "/manager")
public class CenterController extends Component {
	
	@Autowired
	private IManagerService managerService;
	
	@Autowired
	private IRoleService roleService;
	
	@RequestMapping(value = "index.html", method = RequestMethod.GET)
	public ModelAndView index(ModelAndView mav ,HttpServletRequest request,HttpServletResponse response){
		return center(mav,request,response);
	}
	
	public ModelAndView center(ModelAndView mav,HttpServletRequest request,HttpServletResponse response){
		HttpSession session = request.getSession();
		Long managerId = (Long) session.getAttribute(Component.SESSION_ADMIN_ID);
		if(managerId == null){
			mav.setViewName("index");
		}else{
			mav.setViewName("center");
		}
		return mav;
	}
	
	@RequestMapping(value = "center.html", method = RequestMethod.POST)
	public ModelAndView login(ModelAndView mav, String username, String password, HttpServletRequest request, HttpServletResponse response) {
		Manager manager = managerService.verification(username, password);
		System.out.println(manager);
		if(manager != null) {
			Map<String, String> menuList = roleService.getMenu(manager.getRoleId());
			request.getSession().setAttribute(Component.SESSION_ADMIN_ID, manager.getMId());
			request.getSession().setAttribute(Component.SESSION_ADMIN_NAME, manager.getMUsername());
			request.getSession().setAttribute(Component.SESSION_ADMIN_MENU_ITEM_LIST, menuList);
		}
		return center(mav,request,response);
	}
	
	@RequestMapping(value = "loginOut.html", method = RequestMethod.GET)
	public ModelAndView loginOut(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {
		request.getSession().removeAttribute(Component.SESSION_ADMIN_ID);
		request.getSession().removeAttribute(Component.SESSION_ADMIN_NAME);
		request.getSession().removeAttribute(Component.SESSION_ADMIN_MENU_ITEM_LIST);
		return center(mav,request, response);
	}

}
