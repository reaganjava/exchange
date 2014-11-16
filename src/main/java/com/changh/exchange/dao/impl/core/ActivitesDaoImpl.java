package com.changh.exchange.dao.impl.core;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.changh.exchange.dao.core.IActivitiesDao;
import com.changh.exchange.entity.core.Activities;
import com.reagan.core.data.dao.impl.MapperDaoImpl;
import com.reagan.core.exception.MapperException;
import com.reagan.core.util.ObjectMapperParams;

@Repository
public class ActivitesDaoImpl extends MapperDaoImpl<Activities> implements
		IActivitiesDao {

	class ActivitesMapper implements RowMapper<Activities> {

		private ObjectMapperParams<Activities> objectMapperParams = null;

		public ActivitesMapper(ObjectMapperParams<Activities> objectMapperParams) {
			this.objectMapperParams = objectMapperParams;
		}

		@Override
		public Activities mapRow(ResultSet rs, int row) throws SQLException {
			Activities object = new Activities();
			try {
				return objectMapperParams.resultObjectFactory(object, rs);
			} catch (MapperException e) {
				e.printStackTrace();
				return null;
			}
		}

	}
	@Override
	public RowMapper<Activities> getRowMapper(
			ObjectMapperParams<Activities> objectMapperParams) {
		return new ActivitesMapper(objectMapperParams);
	}

}
