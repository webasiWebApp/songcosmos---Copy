import React,{useState,useEffect} from "react";

import googleIco from "../../image/google.png";

import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {Button,Text ,useToast} from '@chakra-ui/react';
import axios from "axios";
import CryptoJS from 'crypto-js';






export default function GooogleSignIn(){
    const toastGoole = useToast()

    // google sign up
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                       // console.log(res.data)

                       


                        let googleSignData = {
                            gFunction: "insertData",
                            googleId:`G-${res.data.id}`,
                            googleName:res.data.name,
                            googleImg:res.data.picture,
                            googleEmail:res.data.email,
                          };
                        
                          const formData = new FormData();
                          formData.append('data', JSON.stringify(googleSignData));
                        
                          axios.post('https://www.songcosmos.com/PHP/googleSign.php', formData, {
                            headers: {
                              'Content-Type': 'multipart/form-data'
                            }
                          }).then(response => {
                              console.log(response.data.split(',')[1]);

                              if(response.data.includes("success")){


                                    let date = new Date();
                                    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
                                    let expires = "expires="+ date.toUTCString();
                                    document.cookie = `isLogged=${CryptoJS.AES.encrypt("yes", process.env.REACT_APP_LOGIN_ID).toString()};`  + expires;
                                    document.cookie = `Id=${CryptoJS.AES.encrypt(`${response.data.split(',')[1]}`, process.env.REACT_APP_LOGIN_ID).toString()}; ` + expires;
                                    document.cookie = `avatar=${res.data.picture}; ` + expires;
                                    toastGoole({
                                        title: 'Succuess',
                                        description: "You will redirect",
                                        status: 'success',
                                        duration: 9000,
                                        isClosable: true,
                                      })


                                    setTimeout(() => {
                                      window.location.href='/app/profile'
                                    }, 1000);
                
                              }else{
                                toastGoole({
                                    title: 'Something went wrong!',
                                    description: "Try again or contact us",
                                    status: 'error',
                                    duration: 9000,
                                    isClosable: true,
                                  })
                              }
                             
                            })
                            .catch(error => {
                            //  console.log(error);
                            });
                           
                        
                       


                    })
                    .catch((err) =>
                     console.log(err)
                     );
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
       // console.log("logout...")
        googleLogout();
        setProfile(null);
    };

    return(


        <div>
            <Button marginTop={"20px"} w={"95%"} onClick={() => login()}> <img src={googleIco} alt="google" /> <Text marginLeft={"20px"}>Sign in with Google</Text>  </Button>
        </div>

    )
}