package com.changh.exchange.dao.impl.sms;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.changh.exchange.dao.sms.ISMSDao;
import com.changh.exchange.entity.sms.SMS;
import com.reagan.core.data.dao.impl.MapperDaoImpl;
import com.reagan.core.exception.MapperException;
import com.reagan.core.util.ObjectMapperParams;

@Repository
public class SMSDaoImpl extends MapperDaoImpl<SMS> implements ISMSDao {

	class SMSMapper implements RowMapper<SMS> {

		private ObjectMapperParams<SMS> objectMapperParams = null;

		public SMSMapper(ObjectMapperParams<SMS> objectMapperParams) {
			this.objectMapperParams = objectMapperParams;
		}

		@Override
		public SMS mapRow(ResultSet rs, int row) throws SQLException {
			SMS object = new SMS();
			try {
				return objectMapperParams.resultObjectFactory(object, rs);
			} catch (MapperException e) {
				e.printStackTrace();
				return null;
			}
		}

	}
	@Override
	public RowMapper<SMS> getRowMapper(
			ObjectMapperParams<SMS> objectMapperParams) {
		// TODO Auto-generated method stub
		return new SMSMapper(objectMapperParams);
	}

}
