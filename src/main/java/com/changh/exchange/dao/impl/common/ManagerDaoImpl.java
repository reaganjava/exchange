package com.changh.exchange.dao.impl.common;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.changh.exchange.dao.common.IManagerDao;
import com.changh.exchange.entity.common.Manager;
import com.reagan.core.data.dao.impl.MapperDaoImpl;
import com.reagan.core.exception.MapperException;
import com.reagan.core.util.ObjectMapperParams;

@Repository
public class ManagerDaoImpl extends MapperDaoImpl<Manager> implements
		IManagerDao {

	class ManagerMapper implements RowMapper<Manager> {

		private ObjectMapperParams<Manager> objectMapperParams = null;

		public ManagerMapper(ObjectMapperParams<Manager> objectMapperParams) {
			this.objectMapperParams = objectMapperParams;
		}

		@Override
		public Manager mapRow(ResultSet rs, int row) throws SQLException {
			Manager object = new Manager();
			try {
				return objectMapperParams.resultObjectFactory(object, rs);
			} catch (MapperException e) {
				e.printStackTrace();
				return null;
			}
		}

	}

	@Override
	public RowMapper<Manager> getRowMapper(
			ObjectMapperParams<Manager> objectMapperParams) {
		return new ManagerMapper(objectMapperParams);
	}

}
