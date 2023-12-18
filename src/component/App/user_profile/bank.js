import React , {useState } from "react";
import { Box, Flex ,Button ,FormControl,FormLabel,FormErrorMessage , Input ,AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay, useToast} from '@chakra-ui/react';


import { useDisclosure } from "@chakra-ui/hooks";
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

import "../../../css/profile.css";
import axios from "axios";
import { sendEmail } from "../sendEmail";

export default function Tab3(prop){

    const toastProfile = useToast();
    const [btnProcess, setBtnProcess] = useState(false);
    const [value, setValue] = useState("");
  
    function handleChange(newValue) {
      setValue(newValue);
    }
  
    const [formData, setFormData] = useState({
      bankName: prop.bankName,
      bankUserName: prop.bankUserName,
      bankBranchName: prop.bankBranchName,
      bankAccName: prop.bankAccName
    });
  
    const [errors, setErrors] = useState({
      name: "",
      email: "",
      message: ""
    });
  
    const [confirm, setconfirm] = useState(false);
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
  
    function submitAndSave() {
  
      let profileData = {
        PFunction: "insertBankData",
        userId: CryptoJS.AES.decrypt(Cookies.get("Id"), process.env.REACT_APP_LOGIN_ID).toString(
          CryptoJS.enc.Utf8
        ),
        bankName: formData.bankName,
        bankUserName: formData.bankUserName,
        bankBranchName: formData.bankBranchName,
        bankAccName: formData.bankAccName
      };
      const formData2 = new FormData();
      formData2.append("data", JSON.stringify(profileData));
      setBtnProcess(true);
  
      axios
        .post("https://www.songcosmos.com/PHP/profile.php", formData2, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((response) => {
          setBtnProcess(false);
  
          if (response.data.includes("success")) {
            toastProfile({
              title: "Bank details saved",
              description: "",
              status: "success",
              duration: 9000,
              isClosable: true
            });
          }

          sendEmail("Bank info saved" , "Your bank account details have been successfully updated.");

        })
        .catch((error) => {
          setBtnProcess(false);
          toastProfile({
            title: "Something went wrong!",
            description: "Try again or Contact us",
            status: "error",
            duration: 9000,
            isClosable: true
          });
        });
    }
  
    function submitConfirm(e) {
        
      onOpen();
      if (confirm) {
        submitAndSave(e);
        onClose();
      }
    }

    return(
        <section className="bank">
             <h1 className="title"> Bank Details </h1>
            <form onSubmit={(e)=> {e.preventDefault(); submitConfirm()}}>
             
            <Flex flexDir={{ base: 'column', md: 'row' }} marginTop="50px" className="row">
                <Box w={{ base: '100%', md: '50%' }} className="col-6">

                    <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Bank Name</FormLabel>
                                <Input
                                    type="text"
                                    name="tel"
                                    value={formData.bankName}
                                    onChange={(e)=>{setFormData({...formData,bankName:e.target.value})}}
                                    placeholder="Enter your name" 
                                    className="input"
                                />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                </Box>
                <Box w={{ base: '100%', md: '50%' }} className="col-6">
                    <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                                    <FormLabel style={{"color":"#EB5C27"}} >Your Name</FormLabel>
                                    <Input
                                        type="text"
                                        name="tel"
                                        value={formData.bankUserName}
                                        onChange={(e)=>{setFormData({...formData,bankUserName:e.target.value})}}
                                        placeholder="Enter your name" 
                                        className="input"
                                    />
                                <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                </Box>
            </Flex>

            <Flex flexDir={{ base: 'column', md: 'row' }} marginTop="0px" className="row">
                <Box w={{ base: '100%', md: '50%' }} className="col-6">

                    <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Account Number</FormLabel>
                                <Input
                                    type="text"
                                    name="tel"
                                    value={formData.bankAccName}
                                    onChange={(e)=>{setFormData({...formData,bankAccName:e.target.value})}}
                                    placeholder="Enter your name" 
                                    className="input"
                                />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                </Box>
                <Box w={{ base: '100%', md: '50%' }} className="col-6">
                    <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                                    <FormLabel style={{"color":"#EB5C27"}} >Branch Name</FormLabel>
                                    <Input
                                        type="text"
                                        name="tel"
                                        value={formData.bankBranchName}
                                        onChange={(e)=>{setFormData({...formData,bankBranchName:e.target.value})}}
                                        placeholder="Enter your name" 
                                        className="input"
                                    />
                                <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                </Box>
            </Flex>

            <div className="submit">
                    <Button isLoading={btnProcess}  className="btn" bg="#EB5C27" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}  type="submit"  >Save & Submit Bank Details</Button>
                </div>



        </form>



                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                            <AlertDialogContent bg="#454569" >
                                <AlertDialogHeader fontSize='lg' fontWeight='bold' color="#FCFCFC">
                                Update bank details
                                </AlertDialogHeader>

                                <AlertDialogBody color="#FCFCFC" >
                                Are you sure? 
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' onClick={()=>{setconfirm(true);submitConfirm()}} ml={3}>
                                    Update
                                </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
        </section>
    )
}

