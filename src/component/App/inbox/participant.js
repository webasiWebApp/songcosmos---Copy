import React from 'react';

import {
    Avatar,
    Box,
    Text,
  } from '@chakra-ui/react'



export default function Participant(prop){

    return(
        <Box bg={"#EB5C27"} width={"100%"} height={"40px"} border={"1px #EB5C27 solid"} marginTop={"5px"}  display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>

            <Box marginLeft={"20px"}>
                <Text color={"#FCFCFC"} fontSize={"14px"} fontWeight={"500"}>{prop.name}</Text>
                <Text color={"#FCFCFC"} fontSize={"10px"} fontWeight={"500"}>{prop.id}</Text>
            </Box>
            
        </Box>
    )

}