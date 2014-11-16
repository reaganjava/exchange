package com.changh.exchange.util;

import java.util.UUID;
import java.util.zip.CRC32;

public class PKUtil {
	public static long getPrimarykey() {
		CRC32 crc = new CRC32();
		crc.update(UUID.randomUUID().toString().getBytes());
		return crc.getValue();
	}
}
