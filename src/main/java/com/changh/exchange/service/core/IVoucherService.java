package com.changh.exchange.service.core;

import java.util.List;

import com.changh.exchange.entity.core.VoucherStrategy;
import com.reagan.util.PageBean;

public interface IVoucherService {

	public void create(VoucherStrategy voucherStrategy);
	
	public boolean destroy(long id);
	
	public boolean editDetail(VoucherStrategy voucherStrategy);
	
	public VoucherStrategy getDetail(long id);
	
	public List<VoucherStrategy> getList(VoucherStrategy voucherStrategy);
	
	public PageBean<VoucherStrategy> queryPage(VoucherStrategy voucherStrategy, int pageNO, int pageRows);
	
	public String build(long organizationId, long activitesId, String mobileNumber);
	
	public boolean verify(String voucherCode);
}
