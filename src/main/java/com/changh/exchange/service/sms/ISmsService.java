package com.changh.exchange.service.sms;

import java.util.List;

import cn.emay.sdk.client.api.StatusReport;

import com.changh.exchange.entity.sms.ContentTemplet;
import com.changh.exchange.entity.sms.SMS;
import com.reagan.util.PageBean;

public interface ISmsService {

	public void create(ContentTemplet contentTemplet);
	
	public boolean destroy(long id);
	
	public ContentTemplet getDetail(long id);
	
	public List<ContentTemplet> getList(ContentTemplet contentTemplet);
	
	public PageBean<ContentTemplet> queryPage(ContentTemplet contentTemplet, int pageNO, int pageRows);
	
	public void storage(SMS sms);
	
	public void send(String voucher, String mobileNumber, long activitiesId);
	
	public boolean report(StatusReport report);
}
