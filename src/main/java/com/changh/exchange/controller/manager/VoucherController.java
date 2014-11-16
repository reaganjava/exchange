package com.changh.exchange.controller.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.changh.exchange.service.core.IVoucherService;
import com.reagan.util.components.Component;
import com.reagan.views.dto.ResultObject;
import com.reagan.views.dto.Tip;

@Controller
@RequestMapping(value = "/voucher")
public class VoucherController extends Component {

	
	@Autowired
	private IVoucherService voucherService;
	
	@RequestMapping(value = "verify.html", method = RequestMethod.GET)
	public ModelAndView verify(ModelAndView mav) {
		mav.setViewName("voucher/verify");
		return mav;
	}
	
	@RequestMapping(value = "verify.json", method = RequestMethod.POST)
	public ModelAndView verify(ModelAndView mav, String voucherCode) {
		ResultObject<Object> result = new ResultObject<Object>();
		if(voucherService.verify(voucherCode)) {
			result = Tip.addSuccess();
		} else {
			result = Tip.addSuccess();
		}
		mav.addObject(JSONDATA, result);
		return mav;
	}
	
	@RequestMapping(value = "list/{organizationId}/{activitieId}/{pageNO}/{pageRows}.html", method = RequestMethod.GET)
	public ModelAndView list(ModelAndView mav, 
			@PathVariable(value="organizationId") long organizationId, @PathVariable(value="activitieId") long activitieId,
			@PathVariable(value="pageNO") int pageNO, @PathVariable(value="pageRows") int pageRows) {
		
		return mav;
	}
}
