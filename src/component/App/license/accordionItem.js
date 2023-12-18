import React from "react";

import {
    Box,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    CheckboxGroup,
    Checkbox,
    Stack
  
  } from '@chakra-ui/react'

export default function CategoriesLicense(prop){

    

     

    return(

        <AccordionItem >
        <h3>
        <AccordionButton >
            <Box as="span" flex='1' textAlign='left' fontSize={"14px"}  >
                {prop.ctgName}
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h3>
        <AccordionPanel pb={4} color="#EB5C27">
            <CheckboxGroup colorScheme='orange'  >
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    <Checkbox value={`${prop.price1}|${prop.ctgName}|MECH`} onChange={(event)=>{prop.dataCollectFunc(event.target.value,event.target.checked)}}>MECH</Checkbox>
                    <Checkbox value={`${prop.price2}|${prop.ctgName}|SYN`} onChange={(event)=>{prop.dataCollectFunc(event.target.value,event.target.checked)}}>SYN</Checkbox>
                    <Checkbox value={`${prop.price3}|${prop.ctgName}|DML`} onChange={(event)=>{prop.dataCollectFunc(event.target.value,event.target.checked)}}>DML</Checkbox>
                    <Checkbox value={`${prop.price4}|${prop.ctgName}|ONL`} onChange={(event)=>{prop.dataCollectFunc(event.target.value,event.target.checked)}}>ONL</Checkbox>
                </Stack>
            </CheckboxGroup>
        </AccordionPanel>
    </AccordionItem>

    )
}