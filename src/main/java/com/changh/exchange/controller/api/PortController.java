package com.changh.exchange.controller.api;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.changh.exchange.service.uitl.IWXPortService;
import com.changh.exchange.util.SignUtil;
import com.reagan.util.LoggerUtil;
import com.reagan.util.components.Component;
;

@Controller
@RequestMapping(value = "/port")
public class PortController extends Component {
	
	private LoggerUtil logger = new LoggerUtil(this.getClass());
	
	@Autowired
	private IWXPortService portService = null;

	@RequestMapping(method = RequestMethod.GET)
	public void verification(@RequestParam("signature") String signature,
							 @RequestParam("timestamp") String timestamp,
							 @RequestParam("nonce") String nonce,
							 @RequestParam("echostr") String echostr,
							 HttpServletResponse response) {
		logger.info("验证微信接口");
		PrintWriter out = null;
		try {
			out = response.getWriter();
			// 请求校验，若校验成功则原样返回echostr，表示接入成功，否则接入失败
			if (SignUtil.checkSignature(signature, timestamp, nonce)) {
				out.print(echostr);
			} else {
				out.print("Verifi Failure...");
				logger.info("微信接口验证失败");
			}
			out.flush();
		} catch (IOException e) {
			logger.info("验证微信接口出现异常:" + e.getMessage());
		} finally {
			out.close();
			out = null;
		}
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public void route(@RequestParam("signature") String signature,
			 @RequestParam("timestamp") String timestamp,
			 @RequestParam("nonce") String nonce,
			 HttpServletRequest request,
			 HttpServletResponse response) {
		PrintWriter out = null;
		try {
			out = response.getWriter();
			// 请求校验，若校验成功则原样返回echostr，表示接入成功，否则接入失败
			if (SignUtil.checkSignature(signature, timestamp, nonce)) {
				// 调用核心服务类接收处理请求
				String respXml = portService.processRequest(request);
				out.print(respXml);
			}
			out.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			out.close();
			out = null;
		}
	}
	
}
