package com.changh.exchange.dao.impl.core;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.changh.exchange.dao.core.IVoucherVerifyDao;
import com.changh.exchange.entity.core.VoucherVerify;
import com.reagan.core.data.dao.impl.MapperDaoImpl;
import com.reagan.core.exception.MapperException;
import com.reagan.core.util.ObjectMapperParams;

@Repository
public class VoucherVerifyDaoImpl extends MapperDaoImpl<VoucherVerify>
		implements IVoucherVerifyDao {

	class VoucherVerifyMapper implements RowMapper<VoucherVerify> {

		private ObjectMapperParams<VoucherVerify> objectMapperParams = null;

		public VoucherVerifyMapper(ObjectMapperParams<VoucherVerify> objectMapperParams) {
			this.objectMapperParams = objectMapperParams;
		}

		@Override
		public VoucherVerify mapRow(ResultSet rs, int row) throws SQLException {
			VoucherVerify object = new VoucherVerify();
			try {
				return objectMapperParams.resultObjectFactory(object, rs);
			} catch (MapperException e) {
				e.printStackTrace();
				return null;
			}
		}

	}
	@Override
	public RowMapper<VoucherVerify> getRowMapper(
			ObjectMapperParams<VoucherVerify> objectMapperParams) {
		// TODO Auto-generated method stub
		return new VoucherVerifyMapper(objectMapperParams);
	}

}
