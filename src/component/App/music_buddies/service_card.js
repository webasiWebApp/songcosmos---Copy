import React from "react";
import CryptoJS from 'crypto-js';
import "../../../css/app_main.css"
import { Link } from "react-router-dom";
import {useNavigate } from 'react-router-dom';
import MemberIcon from "../memberIcon";

import {

    Button,
    Box,
    Card,
    CardBody,
    CardFooter,
    Image,
    Stack,
    Heading,
    Text ,
    Divider,
    ButtonGroup,
    Avatar,
    useToast

  } from '@chakra-ui/react';




 


export default function ServiceCard(prop){
    
    const toastConnect = useToast();
    const [btnProcess, setBtnProcess] = React.useState(false);
    const [btnDisable, setBtnDisable] = React.useState(false);
    const [sendPrice , setSendPrice] = React.useState(0);
    const [avatar , setavatar] = React.useState();

    const navigate = useNavigate();

    React.useEffect(()=>{
        const key = process.env.REACT_APP_LICENSE_ID;
        const encrypted = CryptoJS.AES.encrypt(prop.spPrice, key).toString();
        setSendPrice(encrypted);



        if(prop.userAvatar && prop.userAvatar !=="null" && prop.userAvatar!==""){


            if(prop.userAvatar.includes("https://")){
                
                setavatar(prop.userAvatar)
            }else{
                setavatar(`https://songcosmos.com/PHP/image/avatar/$${prop.userAvatar}`)
               // console.log(avatar);
            }
        }else{
            setavatar(`https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg`)
        }


        

    },[avatar])


    function handleConnect(){
        // setBtnProcess(true);

        // let profileData = {
        //     PFunction: "getProfileData",
        //     userId: CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8)
        //   };
        
        //   const formData = new FormData();
        //   formData.append('data', JSON.stringify(profileData));
        
        //   axios.post('https://songcosmos.com/PHP/profile.php', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   }).then(response => {
        //      // console.log(response.data);
             
        //             let subject ="A client is waiting for you";
        //             let message =`
        //                 <h3>${response.data[0]["userName"]} waiting for you , Please check your inbox! <h3>
        //                 <p>Client Name : ${response.data[0]["userName"]} </p>
        //                 <p>Client Email : <a href="mailto:${response.data[0]["userEmail"]}">${response.data[0]["userEmail"]}</a> </p>
        //                 <p>Client Phone number : ${ response.data[0]["userPhone"] ? response.data[0]["userPhone"] :"Not added"} </p>
        //             `;
            
        //             let emailData = {
        //                 userId:prop.userId,
        //                 subject:subject,
        //                 message:message,
        //             };
                    
        //             const formData2 = new FormData();
        //             formData2.append('data', JSON.stringify(emailData));
                
                
        //             axios.post('https://songcosmos.com/PHP/sendEmail.php', formData2, {
        //                 headers: {
        //                 'Content-Type': 'multipart/form-data'
        //                 }
        //             }).then(response => {
        //                   //  console.log(response.data);
            
        //                     setBtnProcess(false);
        //                     setBtnDisable(true)
        //                         toastConnect({
        //                             title: 'Wait for connect !',
        //                             description: `${prop.spName} will contact you via inbox, Please check inbox.`,
        //                             status: 'info',
        //                             duration: 9000,
        //                             isClosable: true,
        //                             })

                            setTimeout(() => {
                                navigate(`/app/inbox?Id=${prop.userId}`, { replace: true });
                            }, 1000);
                            
            
            //             })
            //             .catch(error => {
                            
            //                 })
             
            // })
            // .catch(error => {
            //   //console.log(error);
            // });


    }

    return(


        <Box w={{ base: '100%', md: '25%' }} className="col-6" padding="15px">
            <Card maxW='sm' bg="#2c2c44" color="#FCFCFC">
                <CardBody>
                    <Image
                        src={`https://www.songcosmos.com/PHP/image/sp/${prop.spCoverImg}`}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                        height={"150px"}
                        width={"100%"}
                    />
                    <Stack mt='6' spacing='3'>
                            <Heading size='md' fontWeight="800" display="flex" justifyContent="flex-start" alignContent="center">
                                <Avatar marginRight="15px" size='sm' name={prop.spName} src={avatar} />
                                {prop.spName}
                            </Heading>
                            <MemberIcon type={prop.memType} />
                        <Text fontSize={"18px"} fontWeight="600" >
                           I am your {prop.serviceName}   
                        </Text>
                        <Text color='#EB5C27' fontSize='2xl' fontWeight="800">
                           <span style={{marginRight:"10px"}}>USD</span>{prop.spPrice}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                        <Button isDisabled={btnDisable} isLoading={btnProcess} variant='solid' onClick={handleConnect} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}  bg="#EB5C27" color="#FCFCFC">
                           Connect Now
                        </Button>
                        <Link to={`/app/user?id=${prop.userId}`}>
                            <Button variant='outline' colorScheme="orange" >
                            View info
                            </Button>
                        </Link>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </Box>

    );
}


// <Link className="join-us-btn" to={`/app/checkout?id=${prop.keyServices}&type=sProvider&isCart=no&lType=none&mem=no&userName=${prop.spName}&sName=${prop.serviceName}&sPkey=${sendPrice}`} target="_blank"  >
//                         <Button variant='solid'  bg="#EB5C27" color="#FCFCFC">
//                             Hire now
//                         </Button>
//                     </Link>
//                         <AddToCardBtn 
//                             itemType={"service"} 
//                             itemId={prop.keyServices}
//                             title={`I am your ${prop.serviceName}`}
//                             price={prop.spPrice}
//                             licenseType=""
//                             serviceType={prop.serviceName}
//                         />
//                     </ButtonGroup>