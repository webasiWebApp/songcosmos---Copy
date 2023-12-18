import React,{useState} from "react";
import "../../css/main_pages.css";

import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

import {useNavigate } from 'react-router-dom';


import {Button , Text , Grid, GridItem , Image ,Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,Box,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react';

import platform from "../../image/platform.png";
import music_player from "../../image/music-player.jpg";
import music_app from "../../image/music-app.png";

import vydia from "../../image/partner-4.png";



export default function Distribute(){


    const { isOpen, onOpen, onClose } = useDisclosure();

    const [trackName, setTrackName] = useState("");
    const [producerName, setProducerName] = useState("");
    const [singerName, setSingerName] = useState("");
    const [lyricistName, setLyricistName] = useState("");
    const [musicBy, setMusicBy] = useState("");

    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
    }


    function redirectDistribute(){
        if(Cookies.get('mToken')){

            let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)
            if(!((isMember === "MclaD") || (isMember === "MclaP") || (isMember === "Mbro") ||(isMember === "Msil") ||(isMember === "Mgold") ||(isMember === "Mpla")) ){
                navigate('/membership', { replace: true });
            }else{
                window.open('https://distribute.songcosmos.com', '_blank');
            }
        }else{
            navigate('/membership', { replace: true });
        }
    }

    return(
        <section className="distribute-page">
            <Navbar/>

            <div className="container">
                
                <div className="overlay">
                    <h1 className="title"><span> Distribute </span> your track now around the world</h1>

                    <Text className="distribute-subtitle" color="#88909A" style={{"marginTop":"20px"}} textAlign="center">Our goal is to maximize your chances of getting heard by as many listeners as possible.Join our all-in-one music platform today and take advantage of our low commission rate and global distribution network.</Text>

                    <Button onClick={redirectDistribute} bg="#EB5C27" size="lg" color="#FCFCFC" style={{"marginTop":"30px"}} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}> Distribute Now </Button>

                    {/* <div className="distributer">
                        <img src={vydia} alt="vydia" />
                        
                    </div> */}
                </div>

                <section className="distribute-container">

                    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4} className="row">
                        <GridItem className="col-6" colSpan={{ base: 2, lg: 1 }}>

                            <h2>Distribute your tracks to famous <span> Music platforms </span></h2>
                            
                            <p>
                                At our all-in-one music platform, we not only offer a low commission rate of as little as 5% on all revenue generated through our distribution service, but we also distribute your music to over 200 global platforms. Our goal is to maximize your chances of getting heard by as many listeners as possible.
                            </p>

                            
                        </GridItem>
                        <GridItem className="col-6 " colSpan={{ base: 2, lg: 1 }}>

                            <Image src={platform} alt="distribute image" className="distribute-image" ></Image>
                        </GridItem>
                    </Grid>

                </section>

                <section className="distribute-container">

                    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4} className="row">

                        <GridItem className="col-6 " colSpan={{ base: 2, lg: 1 }}>

                            <Image src={music_app} alt="distribute image" className="distribute-image" ></Image>
                        </GridItem>


                        <GridItem className="col-6" colSpan={{ base: 2, lg: 1 }}>

                            <h2>Get huge reach and Build <span> fan base </span> </h2>

                            <p>
                            By distributing your music to over 200 global platforms, we increase your exposure to potential listeners around the world. Whether you're a musician, a producer, a songwriter, or a label, we provide the technical expertise and infrastructure needed to get your music in front of as many people as possible.
                            </p>

                            
                        </GridItem>
                        
                    </Grid>

                </section>

                <section className="distribute-container">

                    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4} className="row">


                    <GridItem className="col-6" colSpan={{ base: 2, lg: 1 }}>

                        <h2> Develop and Manage your <span> Music career</span> </h2>

                        <p>
                        We understand that it can be difficult for independent artists and music professionals to get their music heard in a crowded and competitive industry. That's why we've built a distribution service that not only offers affordable and accessible pricing but also delivers your music to all the major streaming platforms, as well as many regional and niche platforms.
                        </p>

                        
                    </GridItem>

                        <GridItem className="col-6 " colSpan={{ base: 2, lg: 1 }}>

                            <Image src={music_player} alt="distribute image" className="distribute-image" ></Image>
                        </GridItem>


                        
                        
                    </Grid>

                </section>

            </div>
            
            <Footer/>



            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="#161622">
                <ModalHeader> <Text textAlign="center" color="#FCFCFC" fontSize="18px" fontWeight="700" >How is the distribution process?</Text> </ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding="30px" >

                    <img src={vydia} alt="vydia logo" width="50px" height="50px" />

                    <Text color="#FCFCFC" fontSize="15px" textAlign="center" marginTop="30px" >Our music distribution partner is vydia and we ensure that your track is distributed by vydia on various popular platforms worldwide.We can manage the distribution process of vydia well according to your requirements. For that, all you have to do is get our <strong>distributor membership</strong> once in your <strong>lifetime</strong> .</Text>





                    <Box bg="transparent" p={3} width="100%" borderRadius="md" className="form-box">
                        <form onSubmit={handleSubmit} style={{"width":"100%"}}>
                            <FormControl mb={4}>
                            <FormLabel color="#EB5C27">Track Name</FormLabel>
                            <Input
                                type="text"
                                value={trackName}
                                onChange={(event) => setTrackName(event.target.value)}
                                color="#FCFCFC"
                                bg="transparent"
                                borderColor="#EB5C27"
                                _hover={{ borderColor: "#EB5C27" }}
                                _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                            />
                            </FormControl>
                            <FormControl mb={4}>
                            <FormLabel color="#EB5C27">Producer Name</FormLabel>
                            <Input
                                type="text"
                                value={producerName}
                                onChange={(event) => setProducerName(event.target.value)}
                                color="#FCFCFC"
                                bg="transparent"
                                borderColor="#EB5C27"
                                _hover={{ borderColor: "#EB5C27" }}
                                _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                            />
                            </FormControl>
                            <FormControl mb={4}>
                            <FormLabel color="#EB5C27">Singer Name</FormLabel>
                            <Input
                                type="text"
                                value={singerName}
                                onChange={(event) => setSingerName(event.target.value)}
                                color="#FCFCFC"
                                bg="transparent"
                                borderColor="#EB5C27"
                                _hover={{ borderColor: "#EB5C27" }}
                                _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                            />
                            </FormControl>
                            <FormControl mb={4}>
                            <FormLabel color="#EB5C27">Lyricist Name</FormLabel>
                            <Input
                                type="text"
                                value={lyricistName}
                                onChange={(event) => setLyricistName(event.target.value)}
                                color="#FCFCFC"
                                bg="transparent"
                                borderColor="#EB5C27"
                                _hover={{ borderColor: "#EB5C27" }}
                                _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                            />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel color="#EB5C27">Music By</FormLabel>
                                <Input
                                    type="text"
                                    value={musicBy}
                                    onChange={(event) => setMusicBy(event.target.value)}
                                    color="#FCFCFC"
                                    bg="transparent"
                                    borderColor="#EB5C27"
                                    _hover={{ borderColor: "#EB5C27" }}
                                    _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel color="#EB5C27">Upload Track</FormLabel>
                                <Input
                                    type="file"
                                    value={musicBy}
                                    onChange={(event) => setMusicBy(event.target.value)}
                                    color="#FCFCFC"
                                    bg="transparent"
                                    borderColor="#EB5C27"
                                    _hover={{ borderColor: "#EB5C27" }}
                                    _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel color="#EB5C27">Schedule Date & Time</FormLabel>
                                <Input
                                    placeholder="Select Date and Time"
                                    size="md"
                                    type="datetime-local"
                                    color="#FCFCFC"
                                    bg="#eb5b2769"
                                    _hover={{ borderColor: "#EB5C27" }}
                                    _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                                    />
                            </FormControl>
                            <Button type="submit" w="100%" bg="#EB5C27" colorScheme="orange">Distribute</Button>
                        </form>
                    </Box>
                    
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='orange'>Go to vydia</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

        </section>
    )
}