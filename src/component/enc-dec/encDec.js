import React,{useState , useEffect} from "react";

import CryptoJS from 'crypto-js';




export default function EncDec(prop){
   
    useEffect(() => {


        const key = prop.key;
    
        if (prop.method === 'enc') {
          let encrypted = CryptoJS.AES.encrypt(prop.keyword, key).toString();
            //encrypted = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
          //console.log(encrypted);
          return(encrypted)

        } else if (prop.method === 'dec') {
          let bytes = CryptoJS.AES.decrypt(prop.keyword, key);
          let decript = bytes.toString(CryptoJS.enc.Utf8);
//console.log(decript);
          return(decript)
        }
        
      }, []);
}


     

