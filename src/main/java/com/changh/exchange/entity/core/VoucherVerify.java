package com.changh.exchange.entity.core;

// Generated 2014-11-6 14:03:33 by Hibernate Tools 3.4.0.CR1

import java.util.Date;

import com.reagan.core.annotation.Mapper;

/**
 * CoreVoucherVerify generated by hbm2java
 */
@Mapper(tableName="core_voucher_verify")
public class VoucherVerify implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5525450798213926060L;
	@Mapper(column="v_id",  updateWhere=true)
	private Long VId;
	@Mapper(column="v_verify_count", update=true)
	private Integer VVerifyCount;
	@Mapper(column="v_verify_date", update=true)
	private Date VVerifyDate;

	public Long getVId() {
		return this.VId;
	}

	public void setVId(Long VId) {
		this.VId = VId;
	}

	public Integer getVVerifyCount() {
		return this.VVerifyCount;
	}

	public void setVVerifyCount(Integer VVerifyCount) {
		this.VVerifyCount = VVerifyCount;
	}

	public Date getVVerifyDate() {
		return this.VVerifyDate;
	}

	public void setVVerifyDate(Date VVerifyDate) {
		this.VVerifyDate = VVerifyDate;
	}
}
