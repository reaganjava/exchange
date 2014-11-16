package com.changh.exchange.dao.impl.common;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.changh.exchange.dao.common.IOrganizationDao;
import com.changh.exchange.entity.common.Organization;
import com.reagan.core.data.dao.impl.MapperDaoImpl;
import com.reagan.core.exception.MapperException;
import com.reagan.core.util.ObjectMapperParams;

@Repository
public class OrganizationDaoImpl extends MapperDaoImpl<Organization> implements
		IOrganizationDao {

	class OrganizationMapper implements RowMapper<Organization> {

		private ObjectMapperParams<Organization> objectMapperParams = null;

		public OrganizationMapper(
				ObjectMapperParams<Organization> objectMapperParams) {
			this.objectMapperParams = objectMapperParams;
		}

		@Override
		public Organization mapRow(ResultSet rs, int row) throws SQLException {
			Organization object = new Organization();
			try {
				return objectMapperParams.resultObjectFactory(object, rs);
			} catch (MapperException e) {
				e.printStackTrace();
				return null;
			}
		}

	}

	@Override
	public RowMapper<Organization> getRowMapper(
			ObjectMapperParams<Organization> objectMapperParams) {
		return new OrganizationMapper(objectMapperParams);
	}

}
