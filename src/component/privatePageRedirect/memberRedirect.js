import * as React from 'react'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import {useNavigate } from 'react-router-dom';


export default function MemberRedirect(){


   
  
    const navigate = useNavigate();

    React.useEffect(()=>{
       

        if(!(typeof Cookies.get('mToken') === "undefined")){
            
            let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)
           
          //  alert(Cookies.get('mToken'))

            if(!((isMember === "MclaD") || (isMember === "MclaP") || (isMember === "Mbro") ||(isMember === "Msil") ||(isMember === "Mgold") ||(isMember === "Mpla")) ){
                //window.location.href='/sign-up'
                
                navigate('/membership', { replace: true });
            }
        }else{
            navigate('/membership', { replace: true });
        }
    },[navigate])

        


}