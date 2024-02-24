import CryptoJS from "crypto-js";

const key = process.env.ENCRYPTION_KEY;
// Encryption function
export const encryptData = (data: string) => {
  if (key) {
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      key
    ).toString();
    return encodeURIComponent(ciphertext);
  }
};

// Decryption function
export const decryptData = (encryptedData: string) => {
  if (key) {
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedData), key);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
};


