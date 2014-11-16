package com.changh.exchange.dao.impl.util;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.changh.exchange.dao.util.ISequenceDao;
import com.changh.exchange.entity.util.Sequence;
import com.reagan.core.data.dao.impl.MapperDaoImpl;
import com.reagan.core.exception.MapperException;
import com.reagan.core.util.ObjectMapperParams;

@Repository
public class SequenceDaoImpl extends MapperDaoImpl<Sequence> implements
		ISequenceDao {

	class SequenceMapper implements RowMapper<Sequence> {

		private ObjectMapperParams<Sequence> objectMapperParams = null;

		public SequenceMapper(ObjectMapperParams<Sequence> objectMapperParams) {
			this.objectMapperParams = objectMapperParams;
		}

		@Override
		public Sequence mapRow(ResultSet rs, int row) throws SQLException {
			Sequence object = new Sequence();
			try {
				return objectMapperParams.resultObjectFactory(object, rs);
			} catch (MapperException e) {
				e.printStackTrace();
				return null;
			}
		}

	}
	@Override
	public RowMapper<Sequence> getRowMapper(
			ObjectMapperParams<Sequence> objectMapperParams) {
		return new SequenceMapper(objectMapperParams);
	}

}
