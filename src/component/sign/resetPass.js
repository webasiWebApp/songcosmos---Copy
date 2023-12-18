import React from "react";
import { useState } from 'react';
import { Link,useLocation } from "react-router-dom";
import {useNavigate } from 'react-router-dom';
import axios from "axios";



import "../../css/sign.css";


import sign_in_img from "../../image/sign-in.jpg";

import { Grid, GridItem ,useToast } from "@chakra-ui/react";
import {FormControl,FormLabel,Input,Button,Box,} from '@chakra-ui/react';


export default function ResetPass(){

  
        const [btnProcess, setBtnProcess] = useState(false);
        const toastLogin = useToast()
    
   
        const [password, setPassword] = useState("");
       
        const navigate = useNavigate();

        const location = useLocation();
        const token = new URLSearchParams(location.search).get("token");
        const tokenId = new URLSearchParams(location.search).get("tokenId");

        const handleSubmit =()=>{

            setBtnProcess(true);

            let signData = {
                resetPassFunction:"changePass",
                password:password,
                token:token,
                tokenId:tokenId
            };
            
              const formData = new FormData();
              formData.append('data', JSON.stringify(signData));
            
              axios.post('https://www.songcosmos.com/PHP/resetPassword.php', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
                .then(result => {

                    setBtnProcess(false);
    
                    if(result.data.includes("success")){
                      toastLogin({
                        title: 'Done',
                        description: "",
                        status: 'info',
                        duration: 9000,
                        isClosable: true,
                      })

                      setTimeout(() => {
                        navigate('/sign-in', { replace: true });
                      }, 1000);
                    }else{
                      toastLogin({
                        title: 'Reset unsuccessful 33',
                        description: "Recheck your password then Try again!",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      })
                    }
                   
                  })
                  .catch(error =>{ 
                    setBtnProcess(false);
                      this.setState({ error: error.message });
                      toastLogin({
                          title: 'Reset unsuccessful 2',
                          description: "Recheck your password then Try again!",
                          status: 'error',
                          duration: 9000,
                          isClosable: true,
                        })
                  });




        }
        


    return(
        <section className="sign-up" >
            <Grid className="row" templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }} gap={4}>
                <GridItem className="col-8" colSpan={{ base: 2, lg: 8 }}>
                    <img src={sign_in_img} alt="sign up" className="sign_up_img"/>
                </GridItem>
                <GridItem className="col-4" colSpan={{ base: 2, lg: 4 }}>

                    <h2>RESET PASSWORD</h2>

                    <Box bg="#161622" p={8} borderRadius="md" className="form-box">
                        <form onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
                      
                            <FormControl id="password"  mb={4}>
                            <FormLabel color="#EB5C27">Enter New Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                                color="#EB5C27"
                                bg="gray.700"
                                borderColor="#EB5C27"
                                _hover={{ borderColor: "#EB5C27" }}
                                _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                            />
                           
                            </FormControl>
                            <Button isLoading={btnProcess} type="submit" style={{"width":"100%"}} colorScheme="orange" bg="#EB5C27" _hover={{ bg: "#c44e1c" }}>
                                Reset Password
                            </Button>
                        </form>
                    </Box>

                    
                    <Link className="back-home" to="/"><i className="fa-solid fa-arrow-left"></i> Go to Home</Link>
                </GridItem>
            </Grid>
        </section>

    );

}