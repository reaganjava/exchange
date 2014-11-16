package com.changh.exchange.controller.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.changh.exchange.entity.core.Activities;
import com.changh.exchange.service.core.IActivitiesService;
import com.changh.exchange.service.core.IVoucherService;
import com.changh.exchange.service.sms.ISmsService;
import com.reagan.util.ValidatorUtil;
import com.reagan.util.components.Component;

@Controller
@RequestMapping(value = "/index")
public class IndexController extends Component {
	
	@Autowired
	private IVoucherService voucherService;
	
	@Autowired
	private ISmsService smsService;
	
	@Autowired
	private IActivitiesService activitiesService;

	@RequestMapping(value = "main.html", method = RequestMethod.GET)
	public ModelAndView index(ModelAndView mav) {
		Activities activities = new Activities();
		List<Activities> activitiesList = activitiesService.getList(activities);
		mav.addObject("ACTIVITIES_LIST", activitiesList);
		mav.setViewName("web/index");
		return mav;
	}
	
	@RequestMapping(value = "sub/{organizationId}/{activitiesId}.html", method = RequestMethod.GET)
	public ModelAndView sub(ModelAndView mav, @PathVariable(value="organizationId") long organizationId, @PathVariable(value="activitiesId") long activitiesId) {
		mav.addObject("ORGANIZATION_ID", organizationId);
		mav.addObject("ACTIVITIES_ID", activitiesId);
		mav.setViewName("web/sub");
		return mav;
	}
	
	@RequestMapping(value = "test.html", method = RequestMethod.GET)
	public ModelAndView test(ModelAndView mav) {
		mav.setViewName("web/test");
		return mav;
	}
	@RequestMapping(value = "voucher.html", method = RequestMethod.POST)
	public ModelAndView voucher(ModelAndView mav, long organizationId, long activitiesId, String mobileNumber) {
		if(ValidatorUtil.isNotEmpty(mobileNumber) && ValidatorUtil.isMobile(mobileNumber)) {
			String voucher = voucherService.build(organizationId, activitiesId, mobileNumber);
			smsService.send(voucher, mobileNumber, activitiesId);
		}
		Activities activities = new Activities();
		List<Activities> activitiesList = activitiesService.getList(activities);
		mav.addObject("ACTIVITIES_LIST", activitiesList);
		mav.setViewName("web/index");
		return mav;
	}
}
