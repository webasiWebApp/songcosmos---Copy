import React from "react";

import membership from "../../image/songcosmos.jpg";
import sprivider from "../../image/partner.jpg";

import {

    Box,
    Card,
    CardBody,
    Image,Stack,
    Heading,
    Text ,
    Avatar

  } from '@chakra-ui/react'




export default function CheckoutItemCard(prop){

React.useEffect(()=>{

    

    if(prop.itemType === "license"){
        let lData= prop.licenseData;
     //   console.log(lData);

        let ctgHtml ="";
        lData.map((item)=>{
            ctgHtml+=`<p>${item.ctgName}(`;
            item["lType"].map((item2,index2)=>{
                let ctgTypeArr = ["MECH","SYN","DML","ONL"]
                
                if(item2){
                    ctgHtml+=`${ctgTypeArr[index2]}/ `
                }
                
            })
            ctgHtml+=")</p>"
        })

        setTimeout(()=>{
            document.getElementById(`licenseSelectedTypes${prop.Idkey}`).innerHTML = ctgHtml;
        },1000)


    }

    
    
},[])
    
console.log(prop.itemData , "LLLLLLL")

    return(


        <Box w={{ base: '100%', md: '80%' }} className="col-6" padding="15px">

            <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            bg="#161622"
            color="#FCFCFC">
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={prop.itemType === "membership" ? membership :prop.itemType === "sProvider" ? sprivider :"https://copyright.laws.com/wp-content/uploads/sites/33/2019/12/4e404b828591e.jpg"}
                alt='checkout '
            />

            <Stack>
                <CardBody paddingBottom="0" key={prop.keyLI} padding="20px">
                    <Heading size='md' fontSize={"35px"}>{prop.itemType === "license"? prop.itemData["lTitle"] : prop.itemType === "membership" ? `${prop.memName} membership of songcosmos`: prop.itemType === "sProvider"? `I will be your ${prop.spName }` : "" }</Heading>

                    {
                        prop.itemType === "license"? <Text py='2' display="flex" flexDirection="column">
                            <span style={{color:"#EB5C27"}}>Author: <span style={{color:"#FCFCFC"}}>{prop.itemData["lAuthor"]}</span> </span>
                            <span style={{color:"#EB5C27"}} >Composer: <span style={{color:"#FCFCFC"}} >{prop.itemData["lComposer"]}</span> </span>
                        </Text> : ""
                    }



                    {
                        prop.itemType === "license"?  <Text display="flex" justifyContent="flex-start" alignItems="flex-end" fontSize="20px" fontWeight="bolder"      color="#EB5C27" marginBottom="20px">
                        <span></span> <Text  fontSize="13px" fontWeight="500" color="#949292" marginLeft="10px" >License duration: 2 years</Text>
                     </Text> : ""
                    }

                    {
                        prop.itemType === "membership" ?  <Text  fontSize="16px" fontWeight="400" color="#EB5C27" marginBottom="20px" marginTop="20px">{prop.memDiscrip}...</Text>: ""
                    }

            
                    {
                        prop.itemType === "sProvider" ? <Heading size='md' marginTop={"30px"} fontWeight="800" display="flex" justifyContent="flex-start" alignContent="center">
                         <Avatar marginRight="15px" size='sm' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                         {prop.userName}
                     </Heading> : ""
                    }

                    <div className="license-selected-types" id={`licenseSelectedTypes${prop.Idkey}`} ></div>

                </CardBody>
            </Stack>
            </Card>

            </Box>

    );
}