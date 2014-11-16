package com.changh.exchange.dao.impl.core;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.changh.exchange.dao.core.IVoucherStrategyDao;
import com.changh.exchange.entity.core.VoucherStrategy;
import com.reagan.core.data.dao.impl.MapperDaoImpl;
import com.reagan.core.exception.MapperException;
import com.reagan.core.util.ObjectMapperParams;

@Repository
public class VoucherStrategyDaoImpl extends MapperDaoImpl<VoucherStrategy>
		implements IVoucherStrategyDao {

	class VoucherStrategyMapper implements RowMapper<VoucherStrategy> {

		private ObjectMapperParams<VoucherStrategy> objectMapperParams = null;

		public VoucherStrategyMapper(ObjectMapperParams<VoucherStrategy> objectMapperParams) {
			this.objectMapperParams = objectMapperParams;
		}

		@Override
		public VoucherStrategy mapRow(ResultSet rs, int row) throws SQLException {
			VoucherStrategy object = new VoucherStrategy();
			try {
				return objectMapperParams.resultObjectFactory(object, rs);
			} catch (MapperException e) {
				e.printStackTrace();
				return null;
			}
		}

	}
	@Override
	public RowMapper<VoucherStrategy> getRowMapper(
			ObjectMapperParams<VoucherStrategy> objectMapperParams) {
		// TODO Auto-generated method stub
		return new VoucherStrategyMapper(objectMapperParams);
	}


}
