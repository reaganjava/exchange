package com.changh.exchange.service.common;

import java.util.List;

import com.changh.exchange.entity.common.Manager;
import com.reagan.util.PageBean;

public interface IManagerService {

	public void create(Manager manager) throws Exception;
	
	public void disable(long id);
	
	public Manager verification(String username, String password);
	
	public boolean modifiPassword(long id, String oldPassword, String password);
	
	public boolean editDetail(Manager manager);
	
	public Manager getDetail(long id);
	
	public List<Manager> getList(Manager manager);
	
	public PageBean<Manager> queryPage(Manager manager, int pageNO, int pageRows);
	
}
