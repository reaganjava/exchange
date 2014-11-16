package com.changh.exchange.controller.manager;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.changh.exchange.entity.common.Manager;
import com.changh.exchange.entity.common.Organization;
import com.changh.exchange.entity.common.Role;
import com.changh.exchange.service.common.IManagerService;
import com.changh.exchange.service.common.IOrganizationService;
import com.changh.exchange.service.common.IRoleService;
import com.reagan.util.PageBean;
import com.reagan.util.components.Component;
import com.reagan.views.dto.ResultObject;
import com.reagan.views.dto.Tip;

@Controller
@RequestMapping(value = "/manager")
public class ManagerController extends Component {
	
	@Autowired
	private IManagerService managerService;
	
	@Autowired
	private IRoleService roleService;
	
	@Autowired
	private IOrganizationService organizationService;
	
	@RequestMapping(value = "add.html", method = RequestMethod.GET)
	public ModelAndView add(ModelAndView mav) {
		mav.setViewName("admin/add");
		List<Role> roles = roleService.getList(new Role());
		List<Organization> organizations = organizationService.getList(new Organization());
		mav.addObject("ROLE_LIST", roles);
		mav.addObject("ORGANIZATION_LIST", organizations);
		return mav;
	}
	
	@RequestMapping(value = "add.json", method = RequestMethod.POST)
	public ModelAndView add(ModelAndView mav, Manager manager) {
		ResultObject<Object> result = new ResultObject<Object>();
		try {
			managerService.create(manager);
			result = Tip.addSuccess();
		} catch (Exception e) {
			e.printStackTrace();
			result = Tip.addFailure();
		}
		mav.addObject(JSONDATA, result);
		return mav;
	}
	
	@RequestMapping(value = "editPwd/{id}.html", method = RequestMethod.GET)
	public ModelAndView editPwd(ModelAndView mav, @PathVariable(value="id") long id) {
		Manager manager = managerService.getDetail(id);
		mav.addObject("MANAGER_DETAIL", manager);
		return mav;
	}
	
	@RequestMapping(value = "editPwd.json", method = RequestMethod.POST)
	public ModelAndView editPwd(ModelAndView mav, long id, String oldPassword, String newPassword) {
		ResultObject<Object> result = new ResultObject<Object>();
		if(managerService.modifiPassword(id, oldPassword, newPassword)) {
			result = Tip.addSuccess();
		} else {
			result = Tip.addFailure();
		}
		mav.addObject(JSONDATA, result);
		return mav;
	}
	
	@RequestMapping(value = "detail/{id}.html", method = RequestMethod.GET)
	public ModelAndView detail(ModelAndView mav, @PathVariable(value="id") long id) {
		Manager manager = managerService.getDetail(id);
		mav.addObject("MANAGER_DETAIL", manager);
		return mav;
	}
	
	@RequestMapping(value = "list/{username}/{pageNO}/{pageRows}.html", method = RequestMethod.GET)
	public ModelAndView list(ModelAndView mav, @PathVariable(value="username") String username, @PathVariable(value="pageNO") int pageNO, @PathVariable(value="pageRows") int pageRows) {
		Manager manager = new Manager();
		if(username.equals("all")) {
			username = "";
		}
		manager.setMUsername(username);
		PageBean<Manager> pageBean = managerService.queryPage(manager, pageNO, pageRows);
		mav.addObject("PAGE_BEAN", pageBean);
		mav.setViewName("admin/list");
		return mav;
	}

}
