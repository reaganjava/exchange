package com.changh.exchange.service.core;

import java.util.List;

import com.changh.exchange.entity.core.Activities;

public interface IActivitiesService {

	public Activities getDetail(Activities activities);
	
	public List<Activities> getList(Activities activities);
}
