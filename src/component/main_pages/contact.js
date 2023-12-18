import React from "react";
import { useState } from "react";
import "../../css/main_pages.css";

//import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

import {FormControl,FormLabel,FormErrorMessage,Input,Textarea,Button,useToast,} from "@chakra-ui/react";


import {Box,Grid, GridItem ,Container, Heading, Text} from "@chakra-ui/react";


export default function Contact (){


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
      const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: "",
      });
      const toast = useToast();
    
      const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // validate form data
        let validationErrors = {};
        if (!formData.name.trim()) {
          validationErrors.name = "Name is required";
        }
        if (!formData.email.trim()) {
          validationErrors.email = "Email is required";
        } else if (
          !/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/.test(
            formData.email.trim()
          )
        ) {
          validationErrors.email = "Invalid email format";
        }
        if (!formData.message.trim()) {
          validationErrors.message = "Message is required";
        }
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
          // submit form data
          // replace this with your own implementation
         // console.log(formData);
          toast({
            title: "Message sent",
            description: "Your message has been sent successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        }
      };
    

    return(
        <section className="contact-page">
            <Navbar/>

            <div className="container">
                <h1 className="title">How to <span> connect </span> with us</h1>

                <p className="subtitle-text">Tell us about your thoughts on Pearlbay or just say hello. Your email address will not be published. The required fields are marked.</p>

                <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4} className="contact-row">
                    <GridItem className="col-6" colSpan={{ base: 2, lg: 1 }}>




                    <Box bg="#161622" color="white" py={10} className="contact-info">
                        <Container maxW="container.xl">
                    
                            <Box d="flex" justifyContent="space-between">
                            <Box maxW="md" mr={16}>
                                <Heading as="h2" size="md" mb={5} color="#EB5C27">
                                Sri Lanka
                                </Heading>
                                <Text fontSize="md" mb={2}>
                                181, High Level Road, Maharagama, Sri Lanka.
                                </Text>
                                <Text fontSize="md" mb={2}>
                                Email: hello@songcosmos.com
                                </Text>
                            </Box>
                            <Box maxW="md">
                                <Heading as="h2" size="md" mt={5} mb={4} color="#EB5C27">
                                United Kingdom
                                </Heading>
                                <Text fontSize="md" mb={2}>
                                128 city road,
                                </Text>
                                <Text fontSize="md" mb={2}>
                                London,
                                </Text>
                                <Text fontSize="md" mb={2}>
                                United Kindom, EC1V 2NX.
                                </Text>
                                <Text fontSize="md" mb={2}>
                                Email: hello.uk@songcosmos.com
                                </Text>
                            </Box>
                            </Box>
                        </Container>
                    </Box>





                 

                    </GridItem>
                    <GridItem className="col-6 contact-form" colSpan={{ base: 2, lg: 1 }}>

                        <h2 className="contact-form-title">SEND  MESSAGE</h2>

                    <form onSubmit={handleSubmit} className="form">
                        <FormControl id="name" isRequired isInvalid={errors.name}>
                        <FormLabel style={{"color":"#EB5C27"}} >Name</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl id="email" isRequired isInvalid={errors.email}>
                        <FormLabel style={{"color":"#EB5C27"}}>Email address</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl id="message" isRequired isInvalid={errors.message}>
                        <FormLabel style={{"color":"#EB5C27"}}>Message</FormLabel>
                        <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>{errors.message}</FormErrorMessage>
                        </FormControl>
                        <Button style={{"backgroundColor":"#EB5C27","width":"100%" , "marginTop":"15px","color":"#FCFCFC"}} type="submit">
                        Send Message
                        </Button>
                    </form>

                    </GridItem>

                </Grid>

                <Box
                        as="iframe"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3961.33255517095!2d79.921318!3d6.850681!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2515d4bf79343%3A0xdf0d62fb36595bfc!2sPearlbay%20Institute!5e0!3m2!1sen!2sus!4v1678783676445!5m2!1sen!2sus"
                        width="600"
                        height="450"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        border="0"

                        className="google-map"
                    />
            </div>

            <Footer/>
        </section>
    );



}