package com.changh.exchange.util;

import java.util.LinkedList;
import java.util.Queue;

import com.changh.exchange.entity.sms.SMS;

public class SMSQueue {
	
	private int maxSize = 100;
	
	private volatile static SMSQueue singleton;  

	private static Queue<SMS> queue = new LinkedList<SMS>();
	
	private SMSQueue() {
	}
	
	public static SMSQueue getQueue() {
		if(singleton == null) {
			synchronized (SMSQueue.class) {  
		        if (singleton == null) {  
		            singleton = new SMSQueue();  
		        }  
			}
		}
		return singleton;
	}
	
	public void write(SMS sms) {
		if(queue.size() <= maxSize) { 
			queue.offer(sms);
		}
	}
	
	public SMS read() {
		return queue.poll();
	}
	
	public int size() {
		return queue.size();
	}
}
