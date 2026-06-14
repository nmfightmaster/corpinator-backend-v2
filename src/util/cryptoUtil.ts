import crypto from "crypto";
import config from "../config/index.js";

export function encrypt(plaintext: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    Buffer.from(config.crypto.encryptionKey, "hex"),
    iv,
  );
  const plaintextHex = cipher.update(plaintext, "utf-8", "hex");
  const finalHex = cipher.final("hex");
  const combinedHex = plaintextHex + finalHex;
  const authTag = cipher.getAuthTag();

  return (
    iv.toString("hex") + ":" + authTag.toString("hex") + ":" + combinedHex
  );
}

export function decrypt(ciphertext: string): string {
  const [ivHex, authTagHex, combinedHex] = ciphertext.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    Buffer.from(config.crypto.encryptionKey, "hex"),
    Buffer.from(ivHex, "hex"),
  );
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));
  const combinedText = decipher.update(combinedHex, "hex", "utf-8");
  const finalText = decipher.final("utf-8");
  return combinedText + finalText;
}
