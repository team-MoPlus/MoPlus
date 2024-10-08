import CryptoJS from 'crypto-js';

// 암호화 함수
export const encryptText = (text: string, secretKey: string) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

// 복호화 함수
export const decryptText = (cipherText: string, secretKey: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// // 예제 실행
// const secretKey = 'my-secret-key-123'; // 강력한 키 사용 권장
// const originalText = 'Hello, World!';

// // 암호화
// const encryptedText = encryptText(originalText, secretKey);
// console.log('Encrypted Text:', encryptedText); // 암호화된 텍스트 출력

// // 복호화
// const decryptedText = decryptText(encryptedText, secretKey);
// console.log('Decrypted Text:', decryptedText); // 복호화된 원본 텍스트 출력
