import React from 'react';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

import {
    Box,
    Text,
  } from '@chakra-ui/react'



export default function Msg(prop){


    const [userId , setuserId] = React.useState(CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8));

    const [fromName , setfromName] = React.useState("");

    React.useEffect(()=>{
        prop.pasitipation.map((pasitiArr)=>{
            if(prop.from === pasitiArr.id){
                setfromName(pasitiArr.name)
            }
        })
    },[prop.pasitipation])
    

    return(

        <div>

        {prop.from !== userId ? <Box  width={"100%"} minHeight={"40px"}  display={"flex"} justifyContent={"flex-start"} alignItems={"center"} padding={"10px 0px 0px 30px"}>
        <Text bg={"#EB5C27"} padding={"8px"} borderRadius={"10px 10px 10px 0px"} color={"#FCFCFC"} fontSize={"16px"} fontWeight={"400"}>{prop.msg}  <Text  marginTop={"10px"} color={"#FCFCFC"} fontSize={"10px"} fontStyle={"oblique"} fontWeight={"400"}>{fromName}</Text>   </Text>
        </Box> : <Box  width={"100%"} minHeight={"40px"}  display={"flex"} justifyContent={"flex-end"} alignItems={"center"} padding={"10px 30px 0px 0px"}>
        <Text bg={"#EB5C27"} padding={"8px"} borderRadius={"10px 10px 0px 10px"} color={"#FCFCFC"} fontSize={"16px"} fontWeight={"400"}>{prop.msg}</Text>
        </Box>}

        </div>
        
    )

}
// 