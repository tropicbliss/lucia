import { expect, test } from "vitest";
import scrypt from "./index.js";
import crypto from "node:crypto";
import { generateRandomString } from "../index.js";

test("scrypt() output matches crypto", async () => {
	const password = generateRandomString(16);
	const salt = generateRandomString(16);
	const scryptHash = await scrypt(
		new TextEncoder().encode(password),
		new TextEncoder().encode(salt),
		{
			N: 16384,
			r: 16,
			p: 1,
			dkLen: 64
		}
	);
	const cryptoHash = new Uint8Array(
		crypto.scryptSync(password, salt, 64, {
			N: 16384,
			p: 1,
			r: 16,
			maxmem: 128 * 16384 * 16 * 2
		}).buffer
	);
	expect(cryptoHash).toStrictEqual(scryptHash);
});
