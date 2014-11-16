package com.changh.exchange.service.common;

import java.util.List;

import com.changh.exchange.entity.common.Organization;
import com.reagan.util.PageBean;

public interface IOrganizationService {

	public void create(Organization organization);
	
	public boolean destroy(long id);
	
	public boolean editDetail(Organization organization);
	
	public Organization getDetail(long id);
	
	public List<Organization> getList(Organization organization);
	
	public PageBean<Organization> queryPage(Organization organization, int pageNO, int pageRows);
}
