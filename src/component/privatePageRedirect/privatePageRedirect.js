import * as React from 'react'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import {useNavigate } from 'react-router-dom';


export default function PrivatePageRedirect(){

  
   

    const navigate = useNavigate();
    
    React.useEffect(()=>{
     
        // alert(Cookies.get('isLogged'));
        if(!(typeof Cookies.get('isLogged') === "undefined")){

           
            
            let isLogged  =CryptoJS.AES.decrypt(Cookies.get('isLogged') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8)

            if(isLogged !== "yes"){
                //window.location.href='/sign-up'
                navigate('/sign-up', { replace: true });
            }
        }else{
            navigate('/sign-up', { replace: true });
        }
    },[navigate])



}