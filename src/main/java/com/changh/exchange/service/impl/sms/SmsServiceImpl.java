package com.changh.exchange.service.impl.sms;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import cn.emay.sdk.client.api.Client;
import cn.emay.sdk.client.api.StatusReport;

import com.changh.exchange.dao.sms.IContentTempletDao;
import com.changh.exchange.dao.sms.ISMSDao;
import com.changh.exchange.entity.sms.ContentTemplet;
import com.changh.exchange.entity.sms.SMS;
import com.changh.exchange.service.sms.ISmsService;
import com.changh.exchange.util.PKUtil;
import com.changh.exchange.util.SingletonClient;
import com.reagan.core.exception.MapperException;
import com.reagan.util.PageBean;
import com.reagan.util.init.IBeanInitialization;

@Service("smsService")
public class SmsServiceImpl implements ISmsService, IBeanInitialization {
	
	@Autowired
	private IContentTempletDao contentTempletDao;
	
	@Autowired
	private ISMSDao smsDao;
	
	private Client client = null;

	@Override
	public void create(ContentTemplet contentTemplet) {
		try {
			contentTempletDao.save(contentTemplet);
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
		ContentTemplet contentTemplet = new ContentTemplet();
		contentTemplet.setTId(id);
		int row = contentTempletDao.delete(contentTemplet);
		if(row != 0) {
			return true;
		}
		return false;
	}

	@Override
	public ContentTemplet getDetail(long id) {
		ContentTemplet contentTemplet = new ContentTemplet();
		contentTemplet.setTId(id);
		return contentTempletDao.query(contentTemplet);
	}

	@Override
	public List<ContentTemplet> getList(ContentTemplet contentTemplet) {
		return contentTempletDao.queryForList(contentTemplet);
	}

	@Override
	public PageBean<ContentTemplet> queryPage(ContentTemplet contentTemplet,
			int pageNO, int pageRows) {
		return contentTempletDao.queryForPage(contentTemplet, pageNO, pageRows);
	}

	@Override
	public void storage(SMS sms) {
		try {
			smsDao.save(sms);
		} catch (DuplicateKeyException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (MapperException e) {
			e.printStackTrace();
		}
	}
	
	public void send(String voucher, String mobileNumber, long activitiesId) {
		ContentTemplet contentTemplet = new ContentTemplet();
		contentTemplet.setActivitieId(activitiesId);
		contentTemplet = contentTempletDao.query(contentTemplet);
		SMS sms = new SMS();
		sms.setSId(PKUtil.getPrimarykey());
		long seqID = PKUtil.getPrimarykey();
		sms.setSSeqId(seqID);
		sms.setSMobileNumber(mobileNumber);
		String content = "【非去不可·重庆】" + contentTemplet.getTContent();
		content = content.replace("${code}", voucher);
		sms.setSContentId(contentTemplet.getTId());
		System.out.println("sms send content:" + content);
		int statusCode = client.sendSMSEx(new String[] {sms.getSMobileNumber()}, content, "", "GBK", 3, seqID);//带扩展
		System.out.println("sms send status:" + statusCode);
		if(statusCode == 0) {
			storage(sms);
		}
	}

	@Override
	public boolean report(StatusReport report) {
		SMS sms = new SMS();
		sms.setSMobileNumber(report.getMobile());
		sms.setSSeqId(report.getSeqID());
		sms.setSReportStatus(report.getReportStatus());
		sms.setSSendDate(report.getSubmitDate());
		sms.setSReviceDate(report.getReceiveDate());
		if(report.getReportStatus() != 0) {
			sms.setSErrorCode(report.getErrorCode());
		}
		int row = smsDao.update(sms);
		if(row != 0) {
			return true;
		}
		return false;
	}

	@Override
	public void initializer() throws Exception {
		client = SingletonClient.getClient("9SDK-EMY-0229-JDUQK", "df311175c5040abf3f6d79d5203afeda");
		int statusCode = client.registEx("446979");
		if(statusCode == 0) {
			new Thread() {
				public void run() {
					while(true) {
						 List<StatusReport> reports;
						try {
							reports = client.getReport();
							 if(reports != null){
								for(StatusReport report : reports){
									report(report);
									System.out.println("手机号码:"+report.getMobile()+"\t状态:"+report.getReportStatus()+"\t信息ID："+report.getSeqID()+ "\t接收时间："+report.getReceiveDate());
								}
							 }else{
								 System.out.println("no have data");
							 }
							 Thread.sleep(3000);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}.start();
		}
	}

}
