import React from "react";
import { useState } from 'react';
import {Link } from "react-router-dom";
import {useNavigate } from 'react-router-dom';
import axios from "axios";

import "../../css/sign.css";

import GooogleSignIn from "./googleSignIn";

import sign_up_img from "../../image/sign_up_img.jpg";

import { Grid, GridItem ,useToast} from "@chakra-ui/react";
import {FormControl,FormLabel,FormErrorMessage,Input,Button,Box,useColorModeValue} from '@chakra-ui/react';




export default function SignUp(){


    // Our system Login
    // if success popup
    const toastRegister = useToast()

    const [btnProcess, setBtnProcess] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const primaryColor = '#EB5C27';
    const bg = useColorModeValue('#161622');
  
    const handleRegister = (e) => {

      setBtnProcess(true);
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
     
      e.preventDefault();
      if (!name || !email || !password || !confirmPassword ) {
        setError('Please fill in all fields');
        setBtnProcess(false);
      } else if (password !== confirmPassword) {
        setBtnProcess(false);
        setError('Passwords do not match');
        toastRegister({
          title: 'Error !',
          description: "Passwords do not match",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })

        setPassword("");
        setConfirmPassword("");
      }else if(!regex.test(password)){
        setBtnProcess(false);
       
        setError('Password must contain 8 characters, uppercase, lowercase and special characters');
        toastRegister({
          title: 'Error !',
          description: "Password must contain 8 characters, uppercase, lowercase and special characters",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else {

      //  console.log("Processing sign up")

          let licenseData = {
          email:email,
          password:password,
          name:name
        };
      
        const formData = new FormData();
        formData.append('data', JSON.stringify(licenseData));
      
        axios.post('https://www.songcosmos.com/PHP/sign_up.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then( result => {

              setBtnProcess(false);


                if(result.data.split(",")[0].includes("New user created successfully")){
                    toastRegister({
                        title: 'Please check your email inbox to activate account',
                        description: "Then you can sign in to songcosmos",
                        status: 'success',
                        duration: 14000,
                        isClosable: true,
                      })

                      try{

                      setTimeout(() => {
                        navigate('/sign-in', { replace: true });
                      }, 1000);


                      }catch(err){
                       // console.log(err);
                      }
                      
                }else{
                    toastRegister({
                        title: 'Account not created.',
                        description: "Data error - The email already exists or something else",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      })

                      setEmail("");
                      setPassword("");
                }
            //   this.setState({
            //     sent: result.data.sent
            //   })
            })
            .catch(error =>{ 
              setBtnProcess(false);
                this.setState({ error: error.message });
                toastRegister({
                    title: 'Account not created.',
                    description: "Your registration unsuccess. Try again !",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })

                  setEmail("");
                  setPassword("");
            });
      
    }

        
    };


    return(
        <section className="sign-up">
            <Grid className="row" templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }} gap={4}>
                <GridItem className="col-8" colSpan={{ base: 2, lg: 8 }}>
                    <img src={sign_up_img} alt="sign up" className="sign_up_img"/>
                </GridItem>
                <GridItem className="col-4" colSpan={{ base: 2, lg: 4 }}>

                    <h2>SIGN UP</h2>

                    <Box bg={bg} p="4" borderRadius="md" className="form-box">
                        <form onSubmit={handleRegister}>
                            <FormControl isRequired mb="4" isInvalid={error && !name}>
                            <FormLabel color={primaryColor}>Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <FormErrorMessage>{error}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired mb="4" isInvalid={error && !email}>
                            <FormLabel color={primaryColor}>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormErrorMessage>{error}</FormErrorMessage>
                            </FormControl>

                            

                            <FormControl isRequired mb="4" isInvalid={error && !password}>
                            <FormLabel color={primaryColor}>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormErrorMessage>{error}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired mb="4" isInvalid={error && !confirmPassword}>
                            <FormLabel color={primaryColor}>Confirm Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <FormErrorMessage>{error}</FormErrorMessage>
                            </FormControl>

                            <Button isLoading={btnProcess} type="submit" colorScheme="orange" style={{"width":"100%"}} bg={primaryColor}>
                            Register
                            </Button>

                            
                            <GooogleSignIn/>

                            <br/>

                            <Link className="goto-sign-in" to="/sign-in">I have an account | SIGN IN</Link>
                        </form>
                    </Box>

                    
                    {/* <Link className="back-home" to="/"><i className="fa-solid fa-arrow-left"></i> Go to Home</Link> */}
                </GridItem>
            </Grid>
        </section>

    );


}

