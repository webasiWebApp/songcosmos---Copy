import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import axios from "axios";



export const sendEmail = (subject,message) => {


        let emailData = {
            userId:CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8),
            subject:subject,
            message:message
        };
        
        const formData2 = new FormData();
        formData2.append('data', JSON.stringify(emailData));
    
    
        axios.post('https://www.songcosmos.com/PHP/sendEmail.php', formData2, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
               // console.log(response.data);
            })
            .catch(error => {
             
                })

       
  };