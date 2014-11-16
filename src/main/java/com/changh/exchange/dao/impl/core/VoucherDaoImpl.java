package com.changh.exchange.dao.impl.core;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.changh.exchange.dao.core.IVoucherDao;
import com.changh.exchange.entity.core.Voucher;
import com.reagan.core.data.dao.impl.MapperDaoImpl;
import com.reagan.core.exception.MapperException;
import com.reagan.core.util.ObjectMapperParams;

@Repository
public class VoucherDaoImpl extends MapperDaoImpl<Voucher> implements
		IVoucherDao {
	class VoucherMapper implements RowMapper<Voucher> {

		private ObjectMapperParams<Voucher> objectMapperParams = null;

		public VoucherMapper(ObjectMapperParams<Voucher> objectMapperParams) {
			this.objectMapperParams = objectMapperParams;
		}

		@Override
		public Voucher mapRow(ResultSet rs, int row) throws SQLException {
			Voucher object = new Voucher();
			try {
				return objectMapperParams.resultObjectFactory(object, rs);
			} catch (MapperException e) {
				e.printStackTrace();
				return null;
			}
		}

	}
	@Override
	public RowMapper<Voucher> getRowMapper(
			ObjectMapperParams<Voucher> objectMapperParams) {
		// TODO Auto-generated method stub
		return new VoucherMapper(objectMapperParams);
	}
	

}
