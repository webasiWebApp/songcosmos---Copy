import React from "react";
import { Box, Flex , } from '@chakra-ui/react';

import "../../../css/profile.css";


export default function Tab5(){


    return(
        <section className="notifi">
             <h1 className="title"> Notification </h1>

             
            <Flex flexDir={{ base: 'column', md: 'row' }} marginTop="50px" className="row">
                <Box w={{ base: '100%', md: '100%' }} className="col-6">

                    <div className="notifi-box">
                        <div className="msg">
                            <i className="fa-solid fa-bell" ></i>
                            <p>Your bank details are updated now, If any problem please contact customer service</p>
                        </div>
                        <p className="time-date">2023-05-08 <span>17.30PM</span> </p>
                    </div>

                    <div className="notifi-box">
                        <div className="msg">
                            <i className="fa-solid fa-bell" ></i>
                            <p>Your bank details are updated now, If any problem please contact customer service</p>
                        </div>
                        <p className="time-date">2023-05-08 <span>17.30PM</span> </p>
                    </div>


                    <div className="notifi-box">
                        <div className="msg">
                            <i className="fa-solid fa-bell" ></i>
                            <p>Your bank details are updated now, If any problem please contact customer service</p>
                        </div>
                        <p className="time-date">2023-05-08 <span>17.30PM</span> </p>
                    </div>

                </Box>
                
            </Flex>
        </section>
    )
}

