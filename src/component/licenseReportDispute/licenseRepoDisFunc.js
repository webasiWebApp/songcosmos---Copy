import React from "react";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

import {Button ,useDisclosure,Stack,FormControl,FormLabel,Input,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,useToast, Select, Textarea, Checkbox} from '@chakra-ui/react';

import axios from "axios";



export function LicenseReport({ onClosePopUp }){

    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();

    const [name, setName] = React.useState("");
    const [phone, setphone] = React.useState("");
    const [violation, setViolation] = React.useState("");
    const [description, setdescription] = React.useState("");
    const [agree, setagree] = React.useState(false);
    const [btnLoding, setbtnLoding] = React.useState(false);

    const toastaddlicense = useToast()


    React.useEffect(()=>{
        onOpen2();

    },[])


    function submitReport(){

        
        if(agree){
            let formData = {
                name:name,
                phone:phone,
                violation:violation,
                description:description,
                LFunction:"sendReport"
            }
        
            const fileInput = document.getElementById('evidence');
            let evidence = fileInput.files[0];

            //console.log(formData , evidence);
        
            const formData2 = new FormData();
            formData2.append('file', evidence);
            formData2.append('data', JSON.stringify(formData));
        
            axios.post('https://www.songcosmos.com/PHP/lisence.php', formData2, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                setbtnLoding(false);
                toastaddlicense({
                    title: 'Report sent !',
                    description: "We will contact you soon",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                onClose2();
                onClosePopUp();
            }).catch(error => {
                toastaddlicense({
                    title: 'Something went wrong!',
                    description: "Please try again or contact developer",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            });
        }else{
            toastaddlicense({
                title: 'Please agree with the terms and conditions',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }


    return(
         <Modal isOpen={isOpen2} onClose={onClose2} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent bg="#363649">
                <ModalHeader color={"#FCFCFC"}>Report</ModalHeader>
             

                <form onSubmit={(e)=>{e.preventDefault(); submitReport()}}>
                    <ModalBody>

                    <FormControl id="name"  style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Name (optional)</FormLabel>
                                <Input
                                    type="text"
                                    name="name"
                                    onChange={(e)=>{setName(e.target.value)}}
                                    placeholder="Enter Your Name" 
                                    className="input"
                                    color={"#FCFCFC"}
                                />
                    </FormControl>

                    <FormControl id="name"  style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >phone (optional)</FormLabel>
                                <Input
                                    type="tel"
                                    name="phone"
                                    onChange={(e)=>{setphone(e.target.value)}}
                                    placeholder="Enter Your Email" 
                                    className="input"
                                    color={"#FCFCFC"}
                                />
                    </FormControl>


                    <FormControl id="name" isRequired style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Select violation</FormLabel>
                                <Select placeholder='Select violation' onChange={(e)=>{setViolation(e.target.value)}} required color={"#EB5C27"} >
                                    <option value='Reproduction'>Reproduction</option>
                                    <option value='Online'>Online</option>
                                    <option value='Reality'>Reality</option>
                                    <option value='Other'>Other</option>
                                </Select>
                    </FormControl>



 
                    <FormControl id="name" isRequired style={{"marginTop":"25px"}} required>
                                <FormLabel style={{"color":"#EB5C27"}} >Upload evidence</FormLabel>
                                <Input
                                    type="file" 
                                    className="input"
                                    color={"#FCFCFC"}
                                    id='evidence' 
                                    accept="image/*"
                                />
                    </FormControl>


                    <FormControl id="name" isRequired style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Description</FormLabel>
                                <Textarea  placeholder='Description' onChange={(e)=>{setdescription(e.target.value)}} required />
                    </FormControl>

                   

                    <Checkbox color={"white"} marginTop={"30px"} colorScheme="orange" onChange={(e)=>{setagree(e.target.checked)}}>I agree with our terms and conditions</Checkbox>

                    </ModalBody>

                    <ModalFooter>
                        <Stack direction='row' spacing={4} align='center'>
                            <Button isLoading={btnLoding} bg="#EB5C27" size="md" color="#FCFCFC" type="submit" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}  style={{"marginTop":"30px"}} > SUBMIT REPORT </Button>
                            <Button bg="red" size="md" color="#FCFCFC" onClick={()=>{onClose2();onClosePopUp()}} style={{"marginTop":"30px"}} > CLOSE </Button>
                        </Stack>
                    </ModalFooter>
                </form> 
                </ModalContent>
            </Modal> 
    )
}








export function LicenseDispute({ onClosePopUp }){

    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();

    const [name, setName] = React.useState("");
    const [phone, setphone] = React.useState("");
    const [violation, setViolation] = React.useState("");
    const [description, setdescription] = React.useState("");
    const [address, setaddress] = React.useState("");
    const [title, settitle] = React.useState("");
    const [agree, setagree] = React.useState(false);
    const [btnLoding, setbtnLoding] = React.useState(false);

    const toastaddlicense = useToast()


    React.useEffect(()=>{
        onOpen2();

    },[])


    function submitReport(){

        
        if(agree){
            let formData = {
                name:name,
                phone:phone,
                violation:violation,
                description:description,
                address:address,
                title:title,
                LFunction:"sendDispute"
            }
        
            const fileInput = document.getElementById('evidence');
            let evidence = fileInput.files[0];

            //console.log(formData , evidence);
        
            const formData2 = new FormData();
            formData2.append('file', evidence);
            formData2.append('data', JSON.stringify(formData));
        
            axios.post('https://www.songcosmos.com/PHP/lisence.php', formData2, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                setbtnLoding(false);
                toastaddlicense({
                    title: 'Report sent !',
                    description: "We will contact you soon",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                onClose2();
                onClosePopUp();
            }).catch(error => {
                toastaddlicense({
                    title: 'Something went wrong!',
                    description: "Please try again or contact developer",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            });
        }else{
            toastaddlicense({
                title: 'Please agree with the terms and conditions',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }


    return(
         <Modal isOpen={isOpen2} onClose={onClose2} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent bg="#363649">
                <ModalHeader color={"#FCFCFC"}>Report</ModalHeader>
             

                <form onSubmit={(e)=>{e.preventDefault(); submitReport()}}>
                    <ModalBody>

                    <FormControl id="name"  style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Name</FormLabel>
                                <Input
                                    type="text"
                                    name="name"
                                    onChange={(e)=>{setName(e.target.value)}}
                                    placeholder="Enter Your Name" 
                                    className="input"
                                    color={"#FCFCFC"}
                                />
                    </FormControl>

                    <FormControl id="name"  style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >phone</FormLabel>
                                <Input
                                    type="tel"
                                    name="phone"
                                    onChange={(e)=>{setphone(e.target.value)}}
                                    placeholder="Enter Your Email" 
                                    className="input"
                                    color={"#FCFCFC"}
                                />
                    </FormControl>

                    <FormControl id="name" isRequired style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Address</FormLabel>
                                <Textarea  placeholder='Address' onChange={(e)=>{setaddress(e.target.value)}} required />
                    </FormControl>


                    <FormControl id="name" isRequired style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Select violation</FormLabel>
                                <Select placeholder='Select violation' onChange={(e)=>{setViolation(e.target.value)}} required color={"#EB5C27"} >
                                    <option value='Rightsholder'>Rightsholder</option>
                                    <option value='Publisher'>Publisher</option>
                                    <option value='Individual'>Individual</option>
                                    <option value='Other'>Other</option>
                                </Select>
                    </FormControl>


                    <FormControl id="name"  style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Title</FormLabel>
                                <Input
                                    type="text"
                                    name="title"
                                    onChange={(e)=>{settitle(e.target.value)}}
                                    placeholder="Enter Title" 
                                    className="input"
                                    color={"#FCFCFC"}
                                />
                    </FormControl>
 
                    <FormControl id="name" isRequired style={{"marginTop":"25px"}} required>
                                <FormLabel style={{"color":"#EB5C27"}} >Upload evidence</FormLabel>
                                <Input
                                    type="file" 
                                    className="input"
                                    color={"#FCFCFC"}
                                    id='evidence' 
                                    accept="image/*"
                                />
                    </FormControl>


                    <FormControl id="name" isRequired style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Description</FormLabel>
                                <Textarea  placeholder='Description' onChange={(e)=>{setdescription(e.target.value)}} required />
                    </FormControl>

                   

                    <Checkbox color={"white"} marginTop={"30px"} colorScheme="orange" onChange={(e)=>{setagree(e.target.checked)}}>I agree with our terms and conditions</Checkbox>

                    </ModalBody>

                    <ModalFooter>
                        <Stack direction='row' spacing={4} align='center'>
                            <Button isLoading={btnLoding} bg="#EB5C27" size="md" color="#FCFCFC" type="submit" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}  style={{"marginTop":"30px"}} > SUBMIT REPORT </Button>
                            <Button bg="red" size="md" color="#FCFCFC" onClick={()=>{onClose2();onClosePopUp()}} style={{"marginTop":"30px"}} > CLOSE </Button>
                        </Stack>
                    </ModalFooter>
                </form> 
                </ModalContent>
            </Modal> 
    )
}