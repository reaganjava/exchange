package com.changh.exchange.dao.impl.common;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.changh.exchange.dao.common.IRoleDao;
import com.changh.exchange.entity.common.Role;
import com.reagan.core.data.dao.impl.MapperDaoImpl;
import com.reagan.core.exception.MapperException;
import com.reagan.core.util.ObjectMapperParams;

@Repository
public class RoleDaoImpl extends MapperDaoImpl<Role> implements IRoleDao {

	
	class RoleMapper implements RowMapper<Role> {

		private ObjectMapperParams<Role> objectMapperParams = null;

		public RoleMapper(
				ObjectMapperParams<Role> objectMapperParams) {
			this.objectMapperParams = objectMapperParams;
		}

		@Override
		public Role mapRow(ResultSet rs, int row) throws SQLException {
			Role object = new Role();
			try {
				return objectMapperParams.resultObjectFactory(object, rs);
			} catch (MapperException e) {
				e.printStackTrace();
				return null;
			}
		}

	}
	
	@Override
	public RowMapper<Role> getRowMapper(
			ObjectMapperParams<Role> objectMapperParams) {
		return new RoleMapper(objectMapperParams);
	}

}
