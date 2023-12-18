import React from "react";
import "../../css/main_pages.css";


import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import axios from "axios";
import mixVideo from "../../image/mix.mp4";

import {useToast,Box,RadioGroup,Stack,Radio,FormControl,FormLabel,Input,useDisclosure,Button , Text , Grid, GridItem , Image,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton} from '@chakra-ui/react';

import mixImg1 from "../../image/mix-img.png";

import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import {useNavigate } from 'react-router-dom';

export default function Mix(){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    function mixMasterBySC(){

        if(Cookies.get('mToken')){
            let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)
        
            if(!((isMember === "MclaD") || (isMember === "MclaP") || (isMember === "Mbro") ||(isMember === "Msil") ||(isMember === "Mgold") ||(isMember === "Mpla")) ){
                //window.location.href='/sign-up'
                navigate('/membership', { replace: true });
            }else{
                onOpen();
            }
    
        }else{
            navigate('/membership', { replace: true });
        }
      
    }

    const [mixMasName, setmixMasName] = React.useState("");
    const [mixMasEmail, setmixMasEmail] = React.useState("");
    const [mixMasPhone, setmixMasPhone] = React.useState("");
    const [mixMasReq, setmixMasReq] = React.useState("");





    const toastaddlicense = useToast();

    function submitTrackToMixMaster(){
        let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)

        let formData = {
            mixName:mixMasName,
            mixEmail:mixMasEmail,
            mixMasPhone:mixMasPhone,
            mixReq:mixMasReq,
            member:isMember,
            sendMixMasFunction:"sendMixMas"
        }
    
        const fileInput = document.getElementById('trackfile');
        let track = fileInput.files[0];

        //console.log(formData , track);
    
        const formData2 = new FormData();
        formData2.append('track', track);
        formData2.append('data', JSON.stringify(formData));
    
        axios.post('https://www.songcosmos.com/PHP/sendMixMas.php', formData2, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            toastaddlicense({
                title: 'Track sent !',
                description: "We will contact you soon",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            onClose();
        }).catch(error => {
            toastaddlicense({
                title: 'Something went wrong!',
                description: "Please try again or contact developer",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        });
    }





    function redirectMusicBuddies(){
        window.location.href=`/app/music-buddies?filterd=true`;
    }

    return(
        <section className="mix-page">
            <Navbar/>

            <div className="container">
                <video src={mixVideo} autoPlay muted loop></video>
                <div className="overlay">
                    <h1 className="title"><span> Mix & Master </span> <br/> your track</h1>

                    <Text color="#88909A" style={{"marginTop":"20px"}} >Expand your fanbase and increase your revenue with our music distribution solutions</Text>

                    <Button bg="#EB5C27" size="lg" color="#FCFCFC" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} onClick={redirectMusicBuddies} style={{"marginTop":"30px"}} > Find engineers Now </Button>
                    <Button bg="#EB5C27" size="lg" color="#FCFCFC" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} onClick={mixMasterBySC} display={"none"} style={{"marginTop":"30px"}} > Mixing & Mastering from Us </Button>
                </div>

                <section className="mix-container">

                    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4} className="row">
                        <GridItem className="col-6" colSpan={{ base: 2, lg: 1 }}>

                            <h2>Find your next <span> mix engineer </span></h2>
                            
                            <p>
                            At our all-in-one music platform, we believe that the human touch is essential to creating great music. That's why we offer a unique service that allows you to find a real mixing engineer to give your creation the personal touch it deserves.
                            </p>

                            <Button bg="#EB5C27" size="lg" color="#FCFCFC" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}  onClick={redirectMusicBuddies} style={{"marginTop":"30px"}} > Find Mix engineers Now </Button>
                            <Button bg="#EB5C27" size="lg" color="#FCFCFC" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} onClick={mixMasterBySC} style={{"marginTop":"30px"}} display={"none"} > Mixing from us </Button>
                        </GridItem>
                        <GridItem className="col-6 " colSpan={{ base: 2, lg: 1 }}>

                            <Image src={mixImg1} alt="mix image" className="mix-image" ></Image>
                        </GridItem>
                    </Grid>

                </section>

                <section className="mix-container">

                    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4} className="row">

                        <GridItem className="col-6 " colSpan={{ base: 2, lg: 1 }}>

                            <Image src={mixImg1} alt="mix image" className="mix-image" ></Image>
                        </GridItem>


                        <GridItem className="col-6" colSpan={{ base: 2, lg: 1 }}>

                            <h2>Find your next <span>master engineer</span> </h2>

                            <p>
                            At our all-in-one music platform, we understand the importance of finding the ideal mastering engineer for your music. That's why we offer a unique service that allows you to search for the perfect mastering engineer who suits your needs and budget, and connect with them no matter where they are in the world.
                            </p>

                            <Button bg="#EB5C27" size="lg" color="#FCFCFC" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} onClick={redirectMusicBuddies} style={{"marginTop":"30px"}} > Find Master engineers Now </Button>
                            <Button bg="#EB5C27" size="lg" color="#FCFCFC" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} display={"none"} onClick={mixMasterBySC} style={{"marginTop":"30px"}} > Mastering from us </Button>
                        </GridItem>
                        
                    </Grid>

                </section>

                <section className="both-eng">
                    <h2>If you're feeling stuck for ideas, our platform can connect you with the ideal <span>Mix and master engineer</span> to meet your specific needs and help you realize your musical vision</h2>
                </section>
            </div>


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="#363649">
                <ModalHeader color={"#FCFCFC"}>Submit Details for Mix  Mastering</ModalHeader>
                <ModalCloseButton />

                <form onSubmit={(e)=>{e.preventDefault(); submitTrackToMixMaster()}}>
                    <ModalBody>

                    <FormControl id="name" isRequired style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Your Name</FormLabel>
                                <Input
                                    type="text"
                                    name="name"
                                    onChange={(e)=>{setmixMasName(e.target.value)}}
                                    placeholder="Enter Your Name" 
                                    className="input"
                                    color={"#FCFCFC"}
                                />
                    </FormControl>

                    <FormControl id="name" isRequired style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Your Email</FormLabel>
                                <Input
                                    type="email"
                                    name="name"
                                    onChange={(e)=>{setmixMasEmail(e.target.value)}}
                                    placeholder="Enter Your Email" 
                                    className="input"
                                    color={"#FCFCFC"}
                                />
                    </FormControl>

                    <FormControl id="name" isRequired style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Your Phone</FormLabel>
                                <Input
                                    type="tel"
                                    name="name"
                                    onChange={(e)=>{setmixMasPhone(e.target.value)}}
                                    placeholder="Enter Your Phone" 
                                    className="input"
                                    color={"#FCFCFC"}
                                />
                    </FormControl>

                    <p style={{color:"#EB5C27",fontSize:"16px","marginTop":"25px"}}>Select the requirement *</p>
                    <Box margin={"15px 0px 15px 0px"}>
                        <RadioGroup defaultValue='bankDepo' color={"#FCFCFC"}>
                            <Stack spacing={5} direction='row'>
                                <Radio colorScheme='orange' value='Mixing' onChange={(e)=>{setmixMasReq(e.target.value)}}>
                                    Mixing
                                </Radio>
                                <Radio colorScheme='orange' value='Mastering' onChange={(e)=>{setmixMasReq(e.target.value)}} >
                                    Mastering
                                </Radio>
                                <Radio colorScheme='orange' value='Both' onChange={(e)=>{setmixMasReq(e.target.value)}} >
                                    Both
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>

                    <FormControl id="name" isRequired style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Upload Track</FormLabel>
                                <Input
                                    type="file" 
                                    className="input"
                                    color={"#FCFCFC"}
                                    id='trackfile' 
                                    accept="audio/mp3"
                                />
                    </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Stack direction='row' spacing={4} align='center'>
                            <Button bg="#EB5C27" size="md" color="#FCFCFC" type="submit"  style={{"marginTop":"30px"}} > SUBMIT TRACK </Button>
                            <Button bg="red" size="md" color="#FCFCFC" onClick={onClose} style={{"marginTop":"30px"}} > CLOSE </Button>
                        </Stack>
                    </ModalFooter>
                </form>
                </ModalContent>
            </Modal>
            
            <Footer/>
        </section>
    )
}