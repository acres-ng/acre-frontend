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

// Your secret key for encryption (keep this secure)
//   const secretKey = 'your-secret-key';

//   // Data you want to send
//   const dataToSend = { username: 'user123', email: 'user@example.com' };

//   // Encrypt the data
//   const encryptedData = encryptData(dataToSend, secretKey);

//   // Include the encrypted data in your URL
//   const url = `https://example.com/some-page?data=${encryptedData}`;

//   // On the receiving end, you can decrypt the data
//   const encryptedQueryParam = new URLSearchParams(window.location.search).get('data');
//   if (encryptedQueryParam) {
//     const decryptedData = decryptData(encryptedQueryParam, secretKey);
//     console.log(decryptedData);
//   }
