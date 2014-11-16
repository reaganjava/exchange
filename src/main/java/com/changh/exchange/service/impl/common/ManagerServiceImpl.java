package com.changh.exchange.service.impl.common;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.changh.exchange.dao.common.IManagerDao;
import com.changh.exchange.entity.common.Manager;
import com.changh.exchange.service.common.IManagerService;
import com.changh.exchange.util.PKUtil;
import com.reagan.core.exception.MapperException;
import com.reagan.util.MD5;
import com.reagan.util.PageBean;


@Service("managerService")
public class ManagerServiceImpl implements IManagerService {
	
	@Autowired
	private IManagerDao managerDao;

	@Override
	public void create(Manager manager) throws Exception {
		try {
			MD5 md5 = new MD5();
			manager.setMId(PKUtil.getPrimarykey());
			System.out.println(manager.getMPassword());
			manager.setMPassword(md5.getMD5ofStr(manager.getMPassword()));
			managerDao.save(manager);
		} catch (DuplicateKeyException e) {
			throw new Exception("主键重复");
		} catch (SQLException e) {
			throw new Exception("插入语法不正确");
		} catch (MapperException e) {
			throw new Exception("映射错误");
		}
	}

	@Override
	public void disable(long id) {
		Manager manager = getDetail(id);
		manager.setMStatus(0);
		managerDao.update(manager);
	}

	@Override
	public Manager verification(String username, String password) {
		MD5 md5 = new MD5();
		Manager manager = new Manager();
		manager.setMUsername(username);
		manager.setMPassword(md5.getMD5ofStr(password));
		manager.setMStatus(1);
		return managerDao.query(manager);
	}

	@Override
	public boolean modifiPassword(long id, String oldPassword, String password) {
		MD5 md5 = new MD5();
		Manager manager = new Manager();
		manager.setMId(id);
		manager.setMPassword(md5.getMD5ofStr(oldPassword));
		manager = managerDao.query(manager);
		if(manager != null) {
			manager.setMPassword(md5.getMD5ofStr(password));
			if(managerDao.update(manager) != 0) {
				return true;
			}
		}
		return false;
	}

	@Override
	public boolean editDetail(Manager manager) {
		int row = managerDao.update(manager);
		if(row != 0) {
			return true;
		}
		return false;
	}

	@Override
	public Manager getDetail(long id) {
		Manager manager = new Manager();
		manager.setMId(id);
		return managerDao.query(manager);
	}

	@Override
	public List<Manager> getList(Manager manager) {
		return managerDao.queryForList(manager);
	}

	@Override
	public PageBean<Manager> queryPage(Manager manager, int pageNO, int pageRows) {
		return managerDao.queryForPage(manager, pageNO, pageRows);
	}

}
