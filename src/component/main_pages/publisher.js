import React from "react";
import "../../css/main_pages.css";
import { Link } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";



import {Button ,Stack, Text ,Grid, GridItem , Image ,useDisclosure , AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay} from '@chakra-ui/react';

import imro from "../../image/partner-5.jpg";
import pearbay from "../../image/partner-2.jpeg";

import money from "../../image/money.png";
import copyright from "../../image/copyright.jpg";
import worldwide from "../../image/worldwide.png";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import {useNavigate } from 'react-router-dom';


export default function Publish(){


    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const cancelRef = React.useRef()

    
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    // function mixMasterBySC(){

    //     onClose2()

    //     if(Cookies.get('mToken')){
    //         let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)
        
    //         if(!((isMember === "MclaD") || (isMember === "MclaP") || (isMember === "Mbro") ||(isMember === "Msil") ||(isMember === "Mgold") ||(isMember === "Mpla")) ){
    //             //window.location.href='/sign-up'
    //             navigate('/membership', { replace: true });
    //         }else{
    //             onOpen();
    //         }
    
    //     }else{
    //         navigate('/membership', { replace: true });
    //     }
      
    // }

    // const [mixMasName, setmixMasName] = React.useState("");
    // const [mixMasEmail, setmixMasEmail] = React.useState("");
    // const [mixMasPhone, setmixMasPhone] = React.useState("");
    // const [mixMasReq, setmixMasReq] = React.useState("Local Publishing");
    // const [btnLoding, setbtnLoding] = React.useState(false);




    // const toastaddlicense = useToast();

    // function submitTrackToMixMaster(){
    //     setbtnLoding(true);
    //     let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)

    //     let formData = {
    //         mixName:mixMasName,
    //         mixEmail:mixMasEmail,
    //         mixMasPhone:mixMasPhone,
    //         mixReq:mixMasReq,
    //         member:isMember,
    //         sendMixMasFunction:"sendMixMas"
    //     }
    
    //     const fileInput = document.getElementById('trackfile');
    //     let track = fileInput.files[0];

    //     //console.log(formData , track);
    
    //     const formData2 = new FormData();
    //     formData2.append('track', track);
    //     formData2.append('data', JSON.stringify(formData));
    
    //     axios.post('https://songcosmos.com/PHP/sendMixMas.php', formData2, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     }).then(response => {
    //         setbtnLoding(false);
    //         toastaddlicense({
    //             title: 'Track sent !',
    //             description: "We will contact you soon",
    //             status: 'success',
    //             duration: 9000,
    //             isClosable: true,
    //         })
    //         onClose();
    //     }).catch(error => {
    //         toastaddlicense({
    //             title: 'Something went wrong!',
    //             description: "Please try again or contact developer",
    //             status: 'error',
    //             duration: 9000,
    //             isClosable: true,
    //         })
    //     });
    // }


    function redirectPublish(){

        if(Cookies.get('mToken')){
            let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)
                
            if(!((isMember === "MclaD") || (isMember === "MclaP") || (isMember === "Mbro") ||(isMember === "Msil") ||(isMember === "Mgold") ||(isMember === "Mpla")) ){
                //window.location.href='/sign-up'
                navigate('/membership', { replace: true });
            }else{
                onOpen2();
                
            }
            
        }else{
            navigate('/membership', { replace: true });
        }
    }


    return(
        <section className="publish-page">
            <Navbar/>

            <div className="container">
                
                <div className="overlay">
                    <h1 className="title">Don't give up your <span> royalties </span> </h1>

                    <Text color="#88909A" textAlign={"center"} style={{"marginTop":"20px","width":"60%"}} >At our all-in-one music platform, we are committed to helping our members collect their music publishing revenue worldwide while protecting their copyright and maximizing their author composer revenue.</Text>

                    <Button bg="#EB5C27" size="lg" color="#FCFCFC" style={{"marginTop":"30px"}} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} onClick={redirectPublish}> Publish Now </Button>

                    <div className="publishers" style={{display:"none"}}>
                        <img src={imro} alt="imro" />
                        <img src={pearbay} alt="imro" />
                    </div>

                </div>

                <section className="publish-container">

                    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4} className="row">
                        <GridItem className="col-6" colSpan={{ base: 2, lg: 1 }}>

                            <h2>Register unlimited songs and collect <span> more revenue </span></h2>
                            
                            <p>
                            We also prioritize copyright protection for our members, using advanced technology to monitor and detect any instances of copyright infringement. Our members can rest assured that their creative works are protected, and we take any instances of infringement very seriously.
                            </p>

                            
                        </GridItem>
                        <GridItem className="col-6 " colSpan={{ base: 2, lg: 1 }}>

                            <Image src={money} alt="publish image" className="publish-image" ></Image>
                        </GridItem>
                    </Grid>

                </section>

                <section className="publish-container">

                    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4} className="row">

                        <GridItem className="col-6 " colSpan={{ base: 2, lg: 1 }}>

                            <Image src={worldwide} alt="publish image" className="publish-image" ></Image>
                        </GridItem>


                        <GridItem className="col-6" colSpan={{ base: 2, lg: 1 }}>

                            <h2> <span>Register</span> Unlimited your own Tracks Worldwide </h2>

                            <p>
                            Join our all-in-one music platform today and let us help you collect your music publishing revenue worldwide while protecting your copyright and maximizing your revenue potential. We're committed to supporting independent artists and music professionals in every aspect of their careers.
                            </p>

                            
                        </GridItem>
                        
                    </Grid>

                </section>

                <section className="publish-container">

                    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4} className="row">


                    <GridItem className="col-6" colSpan={{ base: 2, lg: 1 }}>

                        <h2> Collect your <span> royalties </span> without sacrificing ownership </h2>

                        <p>
                        We understand that collecting publishing revenue can be a complex and time-consuming process, especially for independent artists and music professionals. That's why we offer expert guidance and support to help our members register their songs with Performing Rights Organizations (PROs) around the world and collect their royalties from streaming, downloads, and other sources.
                        </p>

                        
                    </GridItem>

                        <GridItem className="col-6 " colSpan={{ base: 2, lg: 1 }}>

                            <Image src={copyright} alt="publish image" className="publish-image" ></Image>
                        </GridItem>


                        
                        
                    </Grid>

                </section>

            </div>
            
            <Footer/>

            <AlertDialog
                isOpen={isOpen2}
                leastDestructiveRef={cancelRef}
                onClose={onClose2}
            >
                <AlertDialogOverlay>
                <AlertDialogContent bg="#161622">
                    <AlertDialogHeader fontSize='lg' fontWeight='bold' color="#FCFCFC" textAlign="center">
                    Login to your
                    </AlertDialogHeader>

                    <AlertDialogBody display="flex" justifyContent="center" alignItems="center">
                    <Stack direction='row' spacing={4}>

                        <Link to="" target="_blank">
                            <Button bg='#EB5C27' color="#FCFCFC"  _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}> 
                                Publisher Account
                            </Button>
                        </Link>
                        
                        <Link to="https://members.imro.ie/" target="_blank" ><Button bg='#EB5C27' color="#FCFCFC" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}>
                            CMOs Account
                        </Button></Link>
                    </Stack>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button colorScheme="red"  ref={cancelRef} onClick={onClose2}>
                        Cancel
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>










            {/* <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="#363649">
                <ModalHeader color={"#FCFCFC"}>Submit Details for Publishing</ModalHeader>
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

                    {/* <p style={{color:"#EB5C27",fontSize:"16px","marginTop":"25px"}}>Select the requirement *</p>
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
                    </Box> */}

                    {/* <FormControl id="name" isRequired style={{"marginTop":"25px"}}>
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
                            <Button isLoading={btnLoding} bg="#EB5C27" size="md" color="#FCFCFC" type="submit" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}  style={{"marginTop":"30px"}} > SUBMIT TRACK </Button>
                            <Button bg="red" size="md" color="#FCFCFC" onClick={onClose} style={{"marginTop":"30px"}} > CLOSE </Button>
                        </Stack>
                    </ModalFooter>
                </form> */}
                {/* </ModalContent>
            </Modal> */} 
        </section>
    )
}