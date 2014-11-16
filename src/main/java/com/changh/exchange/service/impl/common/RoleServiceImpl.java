package com.changh.exchange.service.impl.common;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.changh.exchange.dao.common.IRoleDao;
import com.changh.exchange.entity.common.Role;
import com.changh.exchange.service.common.IRoleService;
import com.reagan.core.exception.MapperException;
import com.reagan.util.PageBean;

@Service("roleService")
public class RoleServiceImpl implements IRoleService {
	
	@Autowired
	private IRoleDao roleDao;

	@Override
	public void create(Role role) throws Exception {
		try {
			roleDao.save(role);
		} catch (DuplicateKeyException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (MapperException e) {
			e.printStackTrace();
		}
	}

	@Override
	public boolean destroy(long id) {
		Role role = new Role();
		role.setRId(id);
		int row = roleDao.delete(role);
		if(row != 0) {
			return true;
		}
		return false;
	}

	@Override
	public boolean editDetail(Role role) {
		int row = roleDao.update(role);
		if(row != 0) {
			return true;
		}
		return false;
	}

	@Override
	public Role getDetail(long id) {
		Role role = new Role();
		role.setRId(id);
		return roleDao.query(role);
	}

	@Override
	public List<Role> getList(Role role) {
		return roleDao.queryForList(role);
	}

	@Override
	public PageBean<Role> queryPage(Role role, int pageNO, int pageRows) {
		return roleDao.queryForPage(role, pageNO, pageRows);
	}

	@Override
	public Map<String, String> getMenu(long id) {
		Role role = getDetail(id);
		Map<String, String> menuMap = new HashMap<String, String>();
		switch(role.getRAuthority()) {
		case 0: {
			menuMap.put("管理员管理", "/manager/list/all/1/10.html");
			menuMap.put("角色管理", "/role/list/all/1/10.html");
			menuMap.put("查看景区数据", "/manager/list/all/1/10.html");
			menuMap.put("验证凭证", "/voucher/verify.html");
		}
		case 1: {
			menuMap.put("查看景区数据", "/manager/list/all/1/10.html");
		}
		case 2: {
			menuMap.put("验证凭证", "/voucher/verify.html");
		}
		}
		return menuMap;
	}

}
