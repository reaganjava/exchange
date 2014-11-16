package com.changh.exchange.service.common;

import java.util.List;
import java.util.Map;

import com.changh.exchange.entity.common.Role;
import com.reagan.util.PageBean;

public interface IRoleService {

	public void create(Role role) throws Exception;
	
	public boolean destroy(long id);
	
	public boolean editDetail(Role role);
	
	public Role getDetail(long id);
	
	public Map<String, String> getMenu(long id);
	
	public List<Role> getList(Role role);
	
	public PageBean<Role> queryPage(Role role, int pageNO, int pageRows);
}
