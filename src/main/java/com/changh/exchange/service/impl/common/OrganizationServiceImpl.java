package com.changh.exchange.service.impl.common;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.changh.exchange.dao.common.IOrganizationDao;
import com.changh.exchange.entity.common.Organization;
import com.changh.exchange.service.common.IOrganizationService;
import com.reagan.core.exception.MapperException;
import com.reagan.util.PageBean;

@Service("organizationService")
public class OrganizationServiceImpl implements IOrganizationService {
	
	@Autowired
	private IOrganizationDao organizationDao;

	@Override
	public void create(Organization organization) {
		try {
			organizationDao.save(organization);
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
		Organization organization = new Organization();
		organization.setOId(id);
		int row = organizationDao.delete(organization);
		if(row != 0) {
			return true;
		}
		return false;
	}

	@Override
	public boolean editDetail(Organization organization) {
		int row = organizationDao.update(organization);
		if(row != 0) {
			return true;
		}
		return false;
	}

	@Override
	public Organization getDetail(long id) {
		Organization organization = new Organization();
		organization.setOId(id);
		return organizationDao.query(organization);
	}

	@Override
	public List<Organization> getList(Organization organization) {
		return organizationDao.queryForList(organization);
	}

	@Override
	public PageBean<Organization> queryPage(Organization organization,
			int pageNO, int pageRows) {
		return organizationDao.queryForPage(organization, pageNO, pageRows);
	}

}
