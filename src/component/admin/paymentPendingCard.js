import React from "react";
import {Link} from 'react-router-dom';
import { Box,Card,CardBody,Image,Stack,Divider,Text ,CardFooter,ButtonGroup,Button,useToast} from '@chakra-ui/react'

import { sendEmail } from "../App/sendEmail";
import axios from "axios";

export default function PaymentPendingCard(prop){

    const toastpayment = useToast();
    const [userInfo , setuserInfo] = React.useState({});
    const [licenseInfo , setlicenseInfo] = React.useState({});
    const [ctgTypeHtml , setctgTypeHtml] = React.useState("");
    const [removeBox , setremoveBox] = React.useState("block");

    React.useEffect(()=>{
        
        prop.userData.map((item)=>{
            if(item.userId === prop.data.userId){
                setuserInfo(item);
            }
        });
        
        //console.log(prop.data)
        

        if(prop.data.type === "license"){
            let licenseDataObj = JSON.parse(prop.data.detail);

            setlicenseInfo(licenseDataObj.licenseDetails[0]);
            

            let lData= licenseDataObj.licenseTypes;
            
            
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

            setctgTypeHtml(ctgHtml)
    
            setTimeout(()=>{
                document.getElementById(`licenseSelectedTypes${prop.data.payId}`).innerHTML = ctgHtml;
            },1000)
        }

    },[]);


    function approvePayment(){

        if(prop.data.type === "license"){

            let licenseData = {
                adminFunction: "updatePaymentL",
                payId:prop.data.payId,
                Type:"license"
                
              };
            
             // console.log(prop.data.payId)
              const formData = new FormData();
              formData.append('data', JSON.stringify(licenseData));
            
              axios.post('https://www.songcosmos.com/PHP/admin.php', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then(response4 => {

                    if(response4.data.includes("success")){
                        toastpayment({
                            title: 'Approved',
                            description: "",
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                          })

                          sendEmail("Payment Approved" , `
                          <h3>Thank you for waiting, Payment is successful 🎉🎊</h3> 
                              <br/><br/>
                              <p>Payment Id - ${prop.data.payId}</p>
                              <p>Price (LKR) - ${prop.data.price}</p>
                              <p>Date - ${prop.data.Date}</p>
                              <p>Item Type - ${prop.data.type}</p> 
                              <p>Item  - ${licenseInfo.lTitle}</p> 
                              ${ctgTypeHtml}    
                              <br/><br/>
                              <p>We will send you the license soon. We appreciate your patience.</p>  
                      `);

                      setremoveBox("none");
                
                    }else{
                        toastpayment({
                            title: 'Something went wrong',
                            description: "",
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                          })
                    }
                })
                .catch(error => {
               //   console.log(error);
                });


          
        } else if(prop.data.type === "membership"){


            let licenseData = {
                adminFunction: "updatePaymentM",
                payId:prop.data.payId,
                userId:userInfo.userId,
                memId:JSON.parse(prop.data.detail).memberType,
                Type:"membership"
                
              };
            
              const formData = new FormData();
              formData.append('data', JSON.stringify(licenseData));
            
              axios.post('https://www.songcosmos.com/PHP/admin.php', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then(response4 => {

                    if(response4.data.includes("success")){
                        toastpayment({
                            title: 'Approved',
                            description: "",
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                          })

                          sendEmail("Payment Approved" , `
                          <h3>Thank you for waiting, Payment is successful 🎉🎊</h3> 
                              <br/><br/>
                              <p>Payment Id - ${prop.data.payId}</p>
                              <p>Price (LKR) - ${prop.data.price}</p>
                              <p>Date - ${prop.data.date}</p>
                              <p>Item Type - ${prop.data.type}</p> 
                              
                              <p>You are now Songcosmos member. We appreciate your patience.</p>  
                          `);

                          setremoveBox("none");
                
                    }else{
                        toastpayment({
                            title: 'Something went wrong',
                            description: "",
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                          })
                    }
                })
                .catch(error => {
                  //console.log(error);
                });
        }
    }


    function declinePayment(){
        let licenseData = {
            adminFunction: "deletePayment",
            payId:prop.data.payId
          };
        
          const formData = new FormData();
          formData.append('data', JSON.stringify(licenseData));
        
          axios.post('https://www.songcosmos.com/PHP/admin.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response4 => {

                if(response4.data.includes("success")){
                    toastpayment({
                        title: 'Row Deleted',
                        description: "",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                      })

                      sendEmail("Payment Declined" , `
                      <h3>Something went wrong, Payment is unsuccessful 😥</h3> 
                          <br/><br/>
                          <p>Payment Id - ${prop.data.payId}</p>
                          <p>Price (LKR) - ${prop.data.price}</p>
                          <p>Date - ${prop.data.Date}</p>
                          <p>Item Type - ${prop.data.type}</p> 
                          <br/><br/>
                          <p>Send us a clear photo of the payment receipt you are sending. Also, check our account details and try again</p>  
                  `);

                  setremoveBox("none");
            
                }else{
                    toastpayment({
                        title: 'Something went wrong',
                        description: "",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      })
                }
            })
            .catch(error => {
           //   console.log(error);
            });
    }


    return(


        <Box w={{ base: '100%', md: '33%' }} className="col-6" padding="15px" display={removeBox}>

            <Card maxW='sm' key={prop.data.userId} bg={"#373655"} color={"#FCFCFC"} >
                <CardBody bg={"#373655"} color={"#FCFCFC"} >
                <Text fontSize={"16px"} fontWeight={"bold"} marginBottom={"15px"}>Click To Enlarge the Image </Text>   

                <Link to={`https://www.songcosmos.com/PHP/image/payment/${prop.data.paymentReceipt}`} target="_blank" > 
                    <Image src={`https://www.songcosmos.com/PHP/image/payment/${prop.data.paymentReceipt}`} height={"150px"} alt='payment Receipt' />
                </Link>

                <Stack mt='6' spacing='3'>
                    <Text fontSize={"18px"} fontWeight={"bold"} marginBottom={"15px"}>USER INFO </Text>

                    <Text>User Id : {userInfo.userId} </Text>
                    <Text>User Name : {userInfo.userName} </Text>
                    <Text>User Email : {userInfo.userEmail} </Text>
                    <Text>User Phone : {userInfo.userPhone} </Text>
                    <Text>User Address : {userInfo.userAdd} </Text>
                    <Text>Membership : {userInfo.mId} </Text>
                    <br/>
                    <Text fontSize={"18px"} fontWeight={"bold"} marginBottom={"15px"}>PAYMENT INFO </Text>

                    <Text>Payment Id : {prop.data.payId} </Text>
                    <Text>Payment Method : {prop.data.method} </Text>
                    <Text>Item : {prop.data.type} </Text>
                    {prop.data.type === "membership" ? <Text>Member type: {JSON.parse(prop.data.detail).memberType} </Text>:""}
                    <Text>Price (LKR): {prop.data.price} </Text>
                    <Text>Date : {prop.data.date} </Text>

                    
                    {prop.data.type === "license" ? (<>
                        <Text fontSize={"18px"} fontWeight={"bold"} marginBottom={"15px"} marginTop={"25px"} >SONG INFO </Text>
                        <Text>Song Title : {licenseInfo.lTitle} </Text>
                        <Text>Author: {licenseInfo.lAuthor} </Text>
                        <Text>Composer : {licenseInfo.lComposer} </Text>
                        </>) : ""}

                    <div className="license-selected-types" id={`licenseSelectedTypes${prop.data.payId}`}></div>
                    
                </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                <ButtonGroup spacing='2'>
                <Button variant='outline' colorScheme='red' onClick={declinePayment} >
                    Decline
                </Button>
                <Button variant='solid' colorScheme='orange' onClick={approvePayment} >
                    Approve
                 </Button>
                </ButtonGroup>
                </CardFooter>
            </Card>

        </Box>

    );
}