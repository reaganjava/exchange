package com.changh.exchange.test;

import java.util.Random;
import java.util.UUID;
import java.util.zip.CRC32;

public class Test {

	public static void main(String[] args) {
		CRC32 crc = new CRC32();
		crc.update(UUID.randomUUID().toString().getBytes());
		System.out.println(crc.getValue());
	}

}
