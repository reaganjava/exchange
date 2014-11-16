package com.changh.exchange.service.impl.core;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.changh.exchange.dao.core.IActivitiesDao;
import com.changh.exchange.entity.core.Activities;
import com.changh.exchange.service.core.IActivitiesService;

@Service("activitiesService")
public class ActivitiesServiceImpl implements IActivitiesService {
	
	@Autowired
	private IActivitiesDao activitiesDao;

	@Override
	public Activities getDetail(Activities activities) {
		return activitiesDao.query(activities);
	}
	
	public List<Activities> getList(Activities activities) {
		return activitiesDao.queryForList(activities);
	}

}
