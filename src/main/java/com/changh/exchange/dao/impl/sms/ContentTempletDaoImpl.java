package com.changh.exchange.dao.impl.sms;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.changh.exchange.dao.sms.IContentTempletDao;
import com.changh.exchange.entity.sms.ContentTemplet;
import com.reagan.core.data.dao.impl.MapperDaoImpl;
import com.reagan.core.exception.MapperException;
import com.reagan.core.util.ObjectMapperParams;

@Repository
public class ContentTempletDaoImpl extends MapperDaoImpl<ContentTemplet>
		implements IContentTempletDao {

	class ContentTempletMapper implements RowMapper<ContentTemplet> {

		private ObjectMapperParams<ContentTemplet> objectMapperParams = null;

		public ContentTempletMapper(ObjectMapperParams<ContentTemplet> objectMapperParams) {
			this.objectMapperParams = objectMapperParams;
		}

		@Override
		public ContentTemplet mapRow(ResultSet rs, int row) throws SQLException {
			ContentTemplet object = new ContentTemplet();
			try {
				return objectMapperParams.resultObjectFactory(object, rs);
			} catch (MapperException e) {
				e.printStackTrace();
				return null;
			}
		}

	}
	@Override
	public RowMapper<ContentTemplet> getRowMapper(
			ObjectMapperParams<ContentTemplet> objectMapperParams) {
		// TODO Auto-generated method stub
		return new ContentTempletMapper(objectMapperParams)  ;
	}

}
