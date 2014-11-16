package com.changh.exchange.controller.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.changh.exchange.entity.common.Role;
import com.changh.exchange.service.common.IRoleService;
import com.reagan.util.components.Component;
import com.reagan.views.dto.ResultObject;
import com.reagan.views.dto.Tip;

@Controller
@RequestMapping(value = "/role")
public class RoleController extends Component {
	
	@Autowired
	private IRoleService roleService;
	
	@RequestMapping(value = "add.html", method = RequestMethod.GET)
	public ModelAndView add(ModelAndView mav) {
		mav.setViewName("role/add");
		return mav;
	}
	
	@RequestMapping(value = "add.html", method = RequestMethod.POST)
	public ModelAndView add(ModelAndView mav, Role role) {
		ResultObject<Object> result = new ResultObject<Object>();
		try {
			roleService.create(role);
			result = Tip.addSuccess();
		} catch (Exception e) {
			e.printStackTrace();
			result = Tip.addFailure();
		}
		mav.addObject(JSONDATA, result);
		return mav;
	}
}
