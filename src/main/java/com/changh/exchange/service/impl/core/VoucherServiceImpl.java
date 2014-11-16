package com.changh.exchange.service.impl.core;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.changh.exchange.dao.core.IVoucherDao;
import com.changh.exchange.dao.core.IVoucherStrategyDao;
import com.changh.exchange.dao.core.IVoucherVerifyDao;
import com.changh.exchange.dao.util.ISequenceDao;
import com.changh.exchange.entity.core.Activities;
import com.changh.exchange.entity.core.Voucher;
import com.changh.exchange.entity.core.VoucherStrategy;
import com.changh.exchange.entity.core.VoucherVerify;
import com.changh.exchange.entity.util.Sequence;
import com.changh.exchange.service.core.IActivitiesService;
import com.changh.exchange.service.core.IVoucherService;
import com.changh.exchange.util.PKUtil;
import com.reagan.core.exception.MapperException;
import com.reagan.util.PageBean;

@Service("voucherService")
public class VoucherServiceImpl implements IVoucherService {
	
	@Autowired
	private IVoucherDao voucherDao;
	
	@Autowired
	private IVoucherStrategyDao voucherStrategyDao;
	
	@Autowired
	private IVoucherVerifyDao voucherVerifyDao;
	
	@Autowired
	private ISequenceDao sequenceDao;
	
	@Autowired
	private IActivitiesService activitiesService;

	@Override
	public void create(VoucherStrategy voucherStrategy) {
		try {
			voucherStrategy.setSId(PKUtil.getPrimarykey());
			voucherStrategyDao.save(voucherStrategy);
		} catch (DuplicateKeyException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (MapperException e) {
			e.printStackTrace();
		}
	}

	@Override
	public boolean destroy(long id) {
		VoucherStrategy voucherStrategy = new VoucherStrategy();
		voucherStrategy.setSId(id);
		int row = voucherStrategyDao.delete(voucherStrategy);
		if(row != 0) {
			return true;
		}
		return false;
	}

	@Override
	public boolean editDetail(VoucherStrategy voucherStrategy) {
		int row = voucherStrategyDao.update(voucherStrategy);
		if(row != 0) {
			return true;
		}
		return false;
	}

	@Override
	public VoucherStrategy getDetail(long id) {
		VoucherStrategy voucherStrategy = new VoucherStrategy();
		return voucherStrategyDao.query(voucherStrategy);
	}

	@Override
	public List<VoucherStrategy> getList(VoucherStrategy voucherStrategy) {
		return voucherStrategyDao.queryForList(voucherStrategy);
	}

	@Override
	public PageBean<VoucherStrategy> queryPage(VoucherStrategy voucherStrategy,
			int pageNO, int pageRows) {
		return voucherStrategyDao.queryForPage(voucherStrategy, pageNO, pageRows);
	}

	@Override
	public String build(long organizationId, long activitiesId, String mobileNumber) {
		byte[] chars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ".getBytes();
		byte[] vcode = new byte[6];
		Random random = new Random();
		boolean isSuccess = true;
		String voucherCode = null;
		Activities activities = new Activities();
		activities.setAId(activitiesId);
		activities.setOrganizationId(organizationId);
		activities = activitiesService.getDetail(activities);
		String acode = activities.getACode();
		do {
			for(int i = 0; i < vcode.length; i++) {
				vcode[i] = chars[random.nextInt(chars.length)];
			}
			voucherCode = acode + new String(vcode);
			Sequence sequence = new Sequence();
			sequence.setSValue(voucherCode);
			try {
				sequenceDao.save(sequence);
				isSuccess = false;
			} catch (DuplicateKeyException e) {
			} catch (SQLException e) {
				e.printStackTrace();
			} catch (MapperException e) {
				e.printStackTrace();
			}
		} while(isSuccess);
		Voucher voucher = new Voucher();
		try {
			long id = PKUtil.getPrimarykey();
			voucher.setVId(id);
			voucher.setVCode(voucherCode);
			voucher.setVCreateDate(new Date());
			voucher.setVDeadline(activities.getAEndDate());
			voucher.setVMobileNumber(mobileNumber);
			voucher.setVoucherStrategyId(activities.getStrategyId());
			voucher.setOrganizationId(organizationId);
			voucher.setActivitiesId(activitiesId);
			voucherDao.save(voucher);
			VoucherVerify voucherVerify = new VoucherVerify();
			voucherVerify.setVId(id);
			voucherVerify.setVVerifyCount(0);
			voucherVerify.setVVerifyDate(new Date());
			voucherVerifyDao.save(voucherVerify);
		} catch (DuplicateKeyException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (MapperException e) {
			e.printStackTrace();
		}
		return voucherCode;
	}

	@Override
	public boolean verify(String voucherCode) {
		Voucher voucher = new Voucher();
		voucher.setVCode(voucherCode);
		voucher = voucherDao.query(voucher);
		if(voucher != null) {
			VoucherVerify voucherVerify = new VoucherVerify();
			voucherVerify.setVId(voucher.getVId());
			voucherVerify = voucherVerifyDao.query(voucherVerify);
			voucherVerify.setVVerifyCount(voucherVerify.getVVerifyCount() + 1);
			voucherVerify.setVVerifyDate(new Date());
			int row = voucherVerifyDao.update(voucherVerify);
			if(row != 0) {
				return true;
			}
		} 
		return false;
	}

}
