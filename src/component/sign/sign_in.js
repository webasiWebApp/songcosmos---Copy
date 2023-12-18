import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import {useNavigate } from 'react-router-dom';
import axios from "axios";

import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

import "../../css/sign.css";
import GooogleSignIn from "./googleSignIn";

import sign_in_img from "../../image/sign-in.jpg";

import { Grid, GridItem ,useToast } from "@chakra-ui/react";
import {FormControl,FormLabel,FormErrorMessage,Input,Button,Box, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,useDisclosure} from '@chakra-ui/react';





export default function SignIn(){

  
        const [btnProcess, setBtnProcess] = useState(false);
        const toastLogin = useToast();

        const { isOpen, onOpen, onClose } = useDisclosure();
        const cancelRef = React.useRef();
    
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [emailError, setEmailError] = useState("");
        const [passwordError, setPasswordError] = useState("");
        const navigate = useNavigate();


        React.useEffect(()=>{
     
          if(!(typeof Cookies.get('isLogged') === "undefined")){

              let isLogged  =CryptoJS.AES.decrypt(Cookies.get('isLogged') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8)
  
              if(isLogged === "yes"){
                  navigate('/app/profile', { replace: true });
              }
          }
      },[navigate])


        const handleSubmit = (event) => {

          setBtnProcess(true);

          event.preventDefault();
          // Validate email and password
          if (!email) {
            setEmailError("Email is required");
          } else {
            setEmailError("");
          }
          if (!password) {
            setPasswordError("Password is required");
          } else {
            setPasswordError("");
          }
          // If no errors, submit form
          if (email && password) {
           
     

       
        let signData = {
          email:email,
          password:password
        };
      
        const formData = new FormData();
        formData.append('data', JSON.stringify(signData));
      
        axios.post('https://www.songcosmos.com/PHP/sign_in.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then(async result => {
             
              setBtnProcess(false);

                if(result.data.split(",")[0] === "Login Success"){
                    toastLogin({
                        title: 'Login successful',
                        description: "You will redirect",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                      })

                      let date = new Date();
                        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
                        let expires = "expires="+ date.toUTCString();
                        document.cookie = `isLogged=${CryptoJS.AES.encrypt("yes", process.env.REACT_APP_LOGIN_ID).toString()};`  + expires;
                        document.cookie = `Id=${CryptoJS.AES.encrypt(result.data.split(",")[1], process.env.REACT_APP_LOGIN_ID).toString()}; ` + expires;
                       // document.cookie = `memid=${"mem"}; ` + expires;

                      
                         



                        setTimeout(() => {
                        navigate('/app/profile', { replace: true });
                      }, 1000);


                      
                    
                }else{

                  setBtnProcess(false);
                    toastLogin({
                        title: 'Login unsuccessful',
                        description: "Recheck your email or password then Try again!",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      })
                }
            //   this.setState({
            //     sent: result.data.sent
            //   })
            })
            .catch(error =>{ 
                this.setState({ error: error.message });
                toastLogin({
                    title: 'Login unsuccessful',
                    description: "Recheck your email or password then Try again!",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            });


          }
        };
      
        const handleEmailChange = (event) => {
          setEmail(event.target.value);
        };
      
        const handlePasswordChange = (event) => {
          setPassword(event.target.value);
        };



        // //////////////////////////////////


        const handleResetPassword = ()=>{
          onClose()

          let signData = {
            resetPassFunction:"sendResetlink",
            email:email
          };
        
          const formData = new FormData();
          formData.append('data', JSON.stringify(signData));
        
          axios.post('https://www.songcosmos.com/PHP/resetPassword.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
              .then(result => {

                if(result.data.includes("sentsuccessful")){
                  toastLogin({
                    title: 'Check email inbox',
                    description: "Please check your email and click the confirmation link",
                    status: 'info',
                    duration: 9000,
                    isClosable: true,
                  })
                }else{
                  toastLogin({
                    title: 'Login unsuccessful',
                    description: "Recheck your email or password then Try again!",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                }
               
              })
              .catch(error =>{ 
                  this.setState({ error: error.message });
                  toastLogin({
                      title: 'Login unsuccessful',
                      description: "Recheck your email or password then Try again!",
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

                    <h2>SIGN IN</h2>

                    <Box bg="#161622" p={8} borderRadius="md" className="form-box">
                        <form onSubmit={handleSubmit}>
                            <FormControl id="email" isInvalid={!!emailError} mb={4}>
                            <FormLabel color="#EB5C27">Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                color="#EB5C27"
                                bg="gray.700"
                                borderColor="#EB5C27"
                                _hover={{ borderColor: "#EB5C27" }}
                                _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                            />
                            <FormErrorMessage>{emailError}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="password" isInvalid={!!passwordError} mb={4}>
                            <FormLabel color="#EB5C27">Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                color="#EB5C27"
                                bg="gray.700"
                                borderColor="#EB5C27"
                                _hover={{ borderColor: "#EB5C27" }}
                                _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                            />
                            <FormErrorMessage>{passwordError}</FormErrorMessage>
                            </FormControl>
                            <Button isLoading={btnProcess} type="submit" style={{"width":"100%"}} colorScheme="orange" bg="#EB5C27" _hover={{ bg: "#c44e1c" }}>
                            Login
                            </Button>
                        </form>

                        <GooogleSignIn/>

                        <Link className="goto-sign-in" to="/sign-up">I am not sign up yet |</Link>
                        <Link style={{marginLeft:"15px"}} className="goto-sign-in" onClick={onOpen}>Forgot password</Link>
                    </Box>

                    
                    {/* <Link className="back-home" to="/"><i className="fa-solid fa-arrow-left"></i> Go to Home</Link> */}
                </GridItem>
            </Grid>



            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <form onSubmit={(e)=>{e.preventDefault();handleResetPassword()}}>
              <AlertDialogOverlay>
                <AlertDialogContent bg="#454569">
                  
                  <AlertDialogBody>
                          
                          <FormControl id="email" isInvalid={!!emailError} mb={4}>
                            <FormLabel color="#EB5C27">Enter your login email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                color="#FCFCFC"
                                bg="gray.700"
                                borderColor="#EB5C27"
                                _hover={{ borderColor: "#EB5C27" }}
                                _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                          />
                          <FormErrorMessage>{emailError}</FormErrorMessage>
                          </FormControl>
                          
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme='orange' type="submit" ml={3}>
                      Check
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
              </form>
            </AlertDialog>

        </section>

    );

}