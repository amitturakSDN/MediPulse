import { AES, enc } from "crypto-js";

export function decryptSOAPData(uniqueKey, data) {
    if(uniqueKey){
      const decryptedUniqueKey = JSON.parse(AES.decrypt(uniqueKey, "_ARTEYHDB%^$#(*&)4799HTRSEG_").toString(enc.Utf8));
      if(data && decryptedUniqueKey){
        const decryptedData = AES.decrypt(data, decryptedUniqueKey).toString(enc.Utf8);
        return JSON.parse(decryptedData);
      } else{
        return ''
      }
    } else{
      return ''
    }
  }