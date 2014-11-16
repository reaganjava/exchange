package com.changh.exchange.entity.core;

// Generated 2014-11-6 14:03:33 by Hibernate Tools 3.4.0.CR1

import java.util.Date;

import com.reagan.core.annotation.Mapper;

/**
 * CoreVoucher generated by hbm2java
 */
@Mapper(tableName="core_voucher")
public class Voucher implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2806466430796529997L;
	@Mapper(column="v_id", updateWhere=true)
	private Long VId;
	@Mapper(column="v_strategy_id")
	private Long voucherStrategyId;
	@Mapper(column="v_activities_id")
	private Long activitiesId;
	@Mapper(column="v_organization_id")
	private Long organizationId;
	@Mapper(column="v_code")
	private String VCode;
	@Mapper(column="v_mobile_number")
	private String VMobileNumber;
	@Mapper(column="v_create_date")
	private Date VCreateDate;
	@Mapper(column="v_deadline")
	private Date VDeadline;

	
	public Long getVId() {
		return this.VId;
	}

	public void setVId(Long VId) {
		this.VId = VId;
	}

	public Long getActivitiesId() {
		return activitiesId;
	}

	public void setActivitiesId(Long activitiesId) {
		this.activitiesId = activitiesId;
	}

	public Long getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}

	public String getVCode() {
		return this.VCode;
	}

	public void setVCode(String VCode) {
		this.VCode = VCode;
	}

	public String getVMobileNumber() {
		return this.VMobileNumber;
	}

	public void setVMobileNumber(String VMobileNumber) {
		this.VMobileNumber = VMobileNumber;
	}

	public Date getVCreateDate() {
		return this.VCreateDate;
	}

	public void setVCreateDate(Date VCreateDate) {
		this.VCreateDate = VCreateDate;
	}

	public Date getVDeadline() {
		return this.VDeadline;
	}

	public void setVDeadline(Date VDeadline) {
		this.VDeadline = VDeadline;
	}

	public Long getVoucherStrategyId() {
		return voucherStrategyId;
	}

	public void setVoucherStrategyId(Long voucherStrategyId) {
		this.voucherStrategyId = voucherStrategyId;
	}

}
