import React from 'react';

import {
    Avatar,
    Box,
    Text,
  } from '@chakra-ui/react'



export default function Chats(prop){
   // console.log(prop.name);
    return(
        <Box onClick={()=>{prop.chatFunc(prop.chatId)}} bg={"#EB4424"} borderTopColor={"#161622"} borderTopWidth={"3px"} width={"100%"} height={"70px"} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
            <Avatar name='Segun Adebayo' src={prop.imageUrl} marginLeft={"20px"}/>

            <Box marginLeft={"20px"}>
                <Text color={"#FCFCFC"} fontSize={"18px"} fontWeight={"bold"}>{prop.name}</Text>
                <Text color={"#FCFCFC"} fontSize={"14px"} fontWeight={"400"}>{` ${prop.lastMsg}`}</Text>
            </Box>
            
        </Box>
    )

}