import React from "react";

import CryptoJS from 'crypto-js';



import {

    Button,
    Box,
    Card,
    CardBody,
    CardFooter,
    Image,Stack,
    Heading,
    Text ,
    ButtonGroup,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Accordion,

  } from '@chakra-ui/react'


import AddToCardBtn from "../addTocard";
import CategoriesLicense from "./accordionItem";

export default function LicenseCard(prop){


    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const [showPrice,setShowPrice] = React.useState(0);

    const [ctgLicnObjArr,setCtgLicnObjArr] = React.useState([])

    //console.log(prop.gg);

    function cthDataCollect (priceNname,isChecked){
        //console.log(price,isChecked)
       // setShowPrice(parseInt(price.split("|")[0]) + showPrice)
        const price = parseInt(priceNname.split("|")[0]);
        const ctgName = priceNname.split("|")[1];
        const lType = priceNname.split("|")[2];
        let lTypeArr=[];
        let priceArr=[];

       let dataObj = ctgLicnObjArr;
       let isnotThereHas = true;

       if(dataObj.length > 0){

            for (let i = 0; i < dataObj.length; i++){
                if(dataObj[i]["ctgName"]===ctgName){

            

                    if(isChecked){
                        if(lType === "MECH"){
                            dataObj[i]["lType"][0]=true;
                            dataObj[i]["prices"][0]=price;
                        }else if(lType === "SYN"){
                            dataObj[i]["lType"][1]=true;
                            dataObj[i]["prices"][1]=price;    
                        } else if(lType === "DML"){
                            dataObj[i]["lType"][2]=true;
                            dataObj[i]["prices"][2]=price;
                        } else if(lType === "ONL"){
                            dataObj[i]["lType"][3]=true;
                            dataObj[i]["prices"][3]=price;
                        }
                    }else{
                        if(lType === "MECH"){
                            dataObj[i]["lType"][0]=false;
                            dataObj[i]["prices"][0]=0;
                        }else if(lType === "SYN"){
                            dataObj[i]["lType"][1]=false;
                            dataObj[i]["prices"][1]=0;    
                        } else if(lType === "DML"){
                            dataObj[i]["lType"][2]=false;
                            dataObj[i]["prices"][2]=0;
                        } else if(lType === "ONL"){
                            dataObj[i]["lType"][3]=false;
                            dataObj[i]["prices"][3]=0;
                        }

                        
                        if(!(dataObj[i]["lType"][0] || dataObj[i]["lType"][1] || dataObj[i]["lType"][2] || dataObj[i]["lType"][3])){
                            
                            dataObj.splice(i, 1);
                           
                        }
                    }

                    break;
                }
            }

            if(isChecked){
                dataObj.map((item)=>{
                    if(item["ctgName"]===ctgName){
                        isnotThereHas = false;
                    }
                })
    
                if(isnotThereHas){
                    if(lType === "MECH"){
                        lTypeArr=[true,false,false,false];
                        priceArr =[price,0,0,0];
                    }else if(lType === "SYN"){
                        lTypeArr=[false,true,false,false];
                        priceArr =[0,price,0,0];
                    } else if(lType === "DML"){
                        lTypeArr=[false,false,true,false];
                        priceArr =[0,0,price,0];
                    } else if(lType === "ONL"){
                        lTypeArr=[false,false,false,true];
                        priceArr =[0,0,0,price];
                    }
        
                    dataObj.push({
                        ctgName:ctgName,
                        lType:lTypeArr,
                        prices:priceArr
                    })
                }
            }



       }else{

            if(lType === "MECH"){
                lTypeArr=[true,false,false,false];
                priceArr =[price,0,0,0];
            }else if(lType === "SYN"){
                lTypeArr=[false,true,false,false];
                priceArr =[0,price,0,0];
            } else if(lType === "DML"){
                lTypeArr=[false,false,true,false];
                priceArr =[0,0,price,0];
            } else if(lType === "ONL"){
                lTypeArr=[false,false,false,true];
                priceArr =[0,0,0,price];
            }

            dataObj.push({
                ctgName:ctgName,
                lType:lTypeArr,
                prices:priceArr
            })


       }

       setCtgLicnObjArr(dataObj);
     //  console.log(dataObj);
       

       let totalPrice = 0
       dataObj.map((item)=>{
            item["prices"].map((itemP)=>{
                totalPrice+=itemP
               // setShowPrice(totalPrice+itemP)
            })
       })

       setShowPrice(totalPrice)
    }


    function sendDataToBuy(){
        //<Link style={{marginLeft:"15px"}} to={`/app/checkout?id=${prop.keyLI}&type=license&isCart=no&lType=${JSON.stringify(ctgLicnObjArr)}&mem=none`} target="_blank" >  

        const key = process.env.REACT_APP_LICENSE_ID;
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(ctgLicnObjArr), key).toString();

        if(showPrice > 0){
            window.open(`/app/checkout?id=${prop.keyLd}&type=license&isCart=no&lType=${encrypted}&mem=none`, '_blank');
        }else{
            alert("Please select License type")
        }
    }



    
    return(


        <Box w={{ base: '100%', md: '50%' }} className="col-6" padding="15px">

            <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            bg="#161622"
            color="#FCFCFC">
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='https://copyright.laws.com/wp-content/uploads/sites/33/2019/12/4e404b828591e.jpg'
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody paddingBottom="0" key={prop.key}>
                    <Heading size='md'>{prop.lTitle}</Heading>

                    <Text py='2' display="flex" flexDirection="column">
                    <span style={{color:"#EB5C27"}}>Author: <span style={{color:"#FCFCFC"}}>{prop.lAuthor}</span> </span>

                    <span style={{color:"#EB5C27"}} >Composer: <span style={{color:"#FCFCFC"}} >{prop.lComposer}</span> </span>
                    </Text>

                    <Text display="flex" justifyContent="flex-start" alignItems="flex-end" fontSize="20px" fontWeight="bolder" color="#EB5C27" marginBottom="20px">
                       <span></span> <Text  fontSize="13px" fontWeight="500" color="#949292" marginLeft="10px" >License duration:  2 years</Text>
                    </Text>

                </CardBody>

                <CardFooter>
                    <ButtonGroup spacing='2'>

                            
                                <Button variant='solid'  bg="#EB5C27" color="#FCFCFC" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} onClick={onOpen}>
                                    Select Categories
                                </Button>

                    </ButtonGroup>
                </CardFooter>
            </Stack>
            </Card>


            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size="sm"
            >
                <DrawerOverlay />
                <DrawerContent bg={"#161622"} color="#FCFCFC">
                <DrawerCloseButton />
                <DrawerHeader>Select Categories & License Type</DrawerHeader>

                <DrawerBody>
                    <Accordion allowToggle bg={"#161622"} >
                            <Text display={"flex"} justifyContent="center" alignItems={"center"} textAlign={"center"} color={"#EB5C27"} fontSize="16px" fontWeight={"800"} marginBottom="20px"> <Text color={"#FCFCFC"}>Total: LKR </Text> <Text marginLeft={"10px"}>{showPrice}</Text> </Text>

                        <CategoriesLicense  price1="5000" price2="2000" price3="2500" price4="15000"  dataCollectFunc={cthDataCollect} ctgName="Live (Indoor)"/>
                        <CategoriesLicense  price1="5000" price2="2000" price3="2500" price4="25000"  dataCollectFunc={cthDataCollect} ctgName="Live (Indoor - BMICH/Nelum Pokuna)"/>
                        <CategoriesLicense  price1="5000" price2="15000" price3="10000" price4="10000"  dataCollectFunc={cthDataCollect} ctgName="Live (Outdoor)"/>
                        <CategoriesLicense  price1="150000" price2="50000" price3="25000" price4="15000"  dataCollectFunc={cthDataCollect} ctgName="Commercial Advertisements (With/Lyric 30Sec - TV/Radio)"/>
                        <CategoriesLicense  price1="100000" price2="50000" price3="25000" price4="15000"  dataCollectFunc={cthDataCollect} ctgName="Commercial Advertisements (Without Lyrics 30Sec- TV/RAD)"/>
                        <CategoriesLicense  price1="50000" price2="0" price3="0" price4="0"  dataCollectFunc={cthDataCollect} ctgName="Commercial Advertisements (Additional 10Sec - TV/Radio)"/>
                        <CategoriesLicense  price1="0" price2="50000" price3="25000" price4="15000"  dataCollectFunc={cthDataCollect} ctgName="Commercial Advertisements (Background/30 Sec TV/Radio)"/>

                        <CategoriesLicense  price1="25000" price2="25000" price3="25000" price4="25000"  dataCollectFunc={cthDataCollect} ctgName="Games"/>
                        <CategoriesLicense  price1="100000" price2="0" price3="0" price4="0"  dataCollectFunc={cthDataCollect} ctgName="Merchandise (Per Tune - Amount x Unit Quan)"/>
                        <CategoriesLicense  price1="0" price2="0" price3="0" price4="0"  dataCollectFunc={cthDataCollect} ctgName="Online (Case By Case)"/>
                        <CategoriesLicense  price1="5000" price2="0" price3="1000" price4="1000"  dataCollectFunc={cthDataCollect} ctgName="Radio (Inhouse Com)"/>
                        <CategoriesLicense  price1="2000" price2="0" price3="1000" price4="1000"  dataCollectFunc={cthDataCollect} ctgName="Radio (Trailer)"/>
                        <CategoriesLicense  price1="500" price2="0" price3="500" price4="0"  dataCollectFunc={cthDataCollect} ctgName="Radio (Band Show / Per Song)"/>
                        <CategoriesLicense  price1="3000" price2="0" price3="1000" price4="0"  dataCollectFunc={cthDataCollect} ctgName="Radio (Radio Drama - 30Sec)"/>

                        <CategoriesLicense  price1="4000" price2="1000" price3="1000" price4="1000"  dataCollectFunc={cthDataCollect} ctgName="TV (Trailer - 30 Sec)"/>
                        <CategoriesLicense  price1="5000" price2="1000" price3="1000" price4="1000"  dataCollectFunc={cthDataCollect} ctgName="TV (Talkshow/Morning/MAG)"/>
                        <CategoriesLicense  price1="10000" price2="2500" price3="1000" price4="0"  dataCollectFunc={cthDataCollect} ctgName="TV (Music Programs)"/>
                        <CategoriesLicense  price1="15000" price2="5000" price3="10000" price4="10000"  dataCollectFunc={cthDataCollect} ctgName="TV (Reality - Musical)"/>
                        <CategoriesLicense  price1="0" price2="0" price3="10000" price4="25000"  dataCollectFunc={cthDataCollect} ctgName="TV (Promotions - Per Song)"/>
                        <CategoriesLicense  price1="15000" price2="10000" price3="10000" price4="20000"  dataCollectFunc={cthDataCollect} ctgName="Instrumental (Per Song)"/>

                        <CategoriesLicense  price1="20000" price2="5000" price3="5000" price4="5000"  dataCollectFunc={cthDataCollect} ctgName="Cover/Mashup (Per Song)"/>
                        <CategoriesLicense  price1="0" price2="0" price3="0" price4="0"  dataCollectFunc={cthDataCollect} ctgName="Other (Tribute - U/R)"/>
                        <CategoriesLicense  price1="0" price2="0" price3="0" price4="0"  dataCollectFunc={cthDataCollect} ctgName="Other (Donations - U/R)"/>
                        <CategoriesLicense  price1="20000" price2="0" price3="10000" price4="10000"  dataCollectFunc={cthDataCollect} ctgName="CD/VINYL (Per Right / Per Song)"/>
                        <CategoriesLicense  price1="0" price2="15000" price3="10000" price4="10000"  dataCollectFunc={cthDataCollect} ctgName="DVD/Blue Ray (Per Right / Per Song)"/>
                        
                  
                    </Accordion>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' colorScheme={"red"} mr={3} onClick={onClose}>
                    Cancel
                    </Button>

                    <AddToCardBtn 
                                itemType={"license"} 
                                itemId={prop.keyLd}
                                title={prop.lTitle}
                                price={showPrice}
                                licenseType={ctgLicnObjArr}
                                serviceType={""}
                                
                        />
                    
                        <Button variant='solid'  bg="#EB5C27" color="#FCFCFC" marginLeft={"15px"} onClick={sendDataToBuy}>Purchese Now </Button>
               
                </DrawerFooter>
                </DrawerContent>
            </Drawer>

            </Box>


    );
}