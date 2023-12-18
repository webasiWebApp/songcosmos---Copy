import React , {useState} from "react";
import { Box, Image,Flex ,Input ,Select,useToast, Textarea , Button ,FormControl,FormLabel,FormErrorMessage, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,useDisclosure, Stack, Checkbox,Text, List, ListItem, ListIcon} from '@chakra-ui/react';

import { InfoIcon,CheckCircleIcon} from '@chakra-ui/icons'

import {useNavigate } from 'react-router-dom';
import "../../../css/profile.css";

import ProfileImg from "../../../image/partner.jpg";

import 'react-quill/dist/quill.snow.css';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import axios from "axios";

import countryList from 'react-select-country-list';
import MemberIcon from "../memberIcon";

import {db} from "../inbox/firebase"
import { doc, updateDoc } from "firebase/firestore";

let file_cover_img =null;
export default function Tab1(prop){

 //   const { countries } = require('countries');

    const toastProfile = useToast()
    const [btnProcess, setBtnProcess] = useState(false);
    const [btn2Process, setBtn2Process] = useState(false);
    const navigate = useNavigate();
    const options = countryList().getData();
    //console.log(options)
    const [countryOptions, setcountryOptions] = useState(options);
    const [roles, setRoles] = useState({
        singer:false,
        lyrists:false,
        composers:false,
        mixingEngineers:false,
        masteringEngineers:false,
        producers:false,
        publishers:false,
        musicDistributors:false,
        sessionArtists:false,
        foleyArtists:false,
        tutor:false,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();



    
    React.useEffect(()=>{
        let date = new Date();
        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
        let expires = "expires="+ date.toUTCString();
        document.cookie = `avatar=${prop.userAvatar};` + expires;
        

        updateDoc(doc(db, "user", CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8)), { 
            imageUrl:prop.userAvatar ? prop.userAvatar.includes("https://") ?prop.userAvatar: `https://www.songcosmos.com/PHP/image/avatar/${prop.userAvatar }` : ProfileImg 
        });

     //   console.log(prop.userAvatar)
    },[prop])


    React.useEffect(()=>{

        

        if(!prop.role){
            console.log(prop.role)
            onOpen()
        }
        
    },[])


    function sendPopUpInfo(){
        setBtn2Process(false);

        const hasTrueValue = Object.values(roles).some(value => value === true);

        if(hasTrueValue){

            let profileData = {
                PFunction: "sendPopUpData",
                userId: CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8),
                rolesObj:JSON.stringify(roles)
              };
          
              const formData2 = new FormData();
              formData2.append('data', JSON.stringify(profileData));
            
              axios.post('https://www.songcosmos.com/PHP/profile.php', formData2, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then(async  response => {
                setBtn2Process(false);

                    if(response.data.includes("success")){
                        toastProfile({
                            title: 'Saved!',
                            description: "",
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })

                        onClose();
                        window.location.reload();
                    }

                })
                .catch(error => {
                    setBtn2Process(false);
                    toastProfile({
                        title: 'Something went wrong!',
                        description: "Try again or Contact us",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                });
        }
    }
    

    const [value, setValue] = useState('');

    function handleChange(newValue) {
        setValue(newValue);
      }

    const [formData, setFormData] = useState({
        name: prop.userName,
        email: prop.userEmail,
        phone: prop.userPhone,
        address:prop.userAdd,
        country:prop.country

      });
      const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: "",
      });


      function previewImage() {
        const fileInput = document.getElementById('cover-image-input');
        const previewImageElement = document.getElementById('cover-img');
         file_cover_img = fileInput.files[0];

        if(file_cover_img["type"] === "image/png" || file_cover_img["type"] === "image/jpeg"){
            const reader = new FileReader();
            reader.onload = function(event) {
            previewImageElement.src = event.target.result;
            previewImageElement.style.display = 'block';
            };
         //   console.log(file_cover_img);
            reader.readAsDataURL(file_cover_img);

        }else{
            toastProfile({
                title: 'Something went wrong!',
                description: "You can upload PNG or JPG an image only",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }

      }
      
      function uploadCover(){
        document.getElementById("cover-image-input").click();

      }

      function submitAndSave(e){
            e.preventDefault();
           
            setBtnProcess(true);
            let profileData = {
                PFunction: "insertPersonalData",
                userId: CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8),
                userName:formData.name,
                userEmail:formData.email,
                userPhone:formData.phone,
                userAdd:formData.address,
                country:formData.country
              };
             // console.log(profileData);
          
              const formData2 = new FormData();
              formData2.append('image', file_cover_img);
              formData2.append('data', JSON.stringify(profileData));
            
              axios.post('https://www.songcosmos.com/PHP/profile.php', formData2, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then(async  response => {
                setBtnProcess(false);

                  if(response.data.includes("success")){

                    await updateDoc(doc(db, "user", CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8)), { 
                        email:formData.email,
                        name:formData.name
                    });


                    toastProfile({
                        title: 'Personal infomations saved',
                        description: "",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                      })
                  }

                  
                })
                .catch(error => {
                    setBtnProcess(false);
                 // console.log(error);
                  toastProfile({
                    title: 'Something went wrong!',
                    description: "Try again or Contact us",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                });
      }


      function sendToMembership(){
        navigate('/membership', { replace: true });
      }


    return(
        <section className="user-info">

            <h1 className="title"> Personal <span> Info </span></h1>

            <form onSubmit={submitAndSave}>
                <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }} style={{"width":"100%"}}>
                    <Box w={{ base: '100%', md: '30%' }} p={4} width="100%" className="display-info">

                        <div className="profile-image">
                            <img src={prop.userAvatar ? prop.userAvatar.includes("https://") ? prop.userAvatar: `https://www.songcosmos.com/PHP/image/avatar/${prop.userAvatar }` : ProfileImg} alt="profile" id="cover-img" />
                            <Input type="file" display="none" id="cover-image-input" onChange={previewImage}  />
                            <div className="profile-image">
                                <i className="fa-solid fa-camera input-image-icon" id="input-image-icon" onClick={uploadCover} ></i>
                            </div>
                        </div>
                    </Box>
                
                    <Box w={{ base: '100%', md: '50%' }} p={4} className="display-info-text">
                        <h3 style={{textTransform:"capitalize"}}>{prop.userName}</h3>
                        <p> {prop.mId ? <MemberIcon type={prop.mId} /> : <Button onClick={sendToMembership} style={{"backgroundColor":"#EB5C27"}} width="150px" marginTop={"20px"}  >Get Membership</Button>} </p>
                    
                    </Box>

                    <Box w={{ base: '100%', md: '20%' }} p={4} className="display-info-text">
                        <Image src={`https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=${CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8)}&chld=L|1`} />
                    </Box>
                </Flex>

                    <div className="h-line"></div>

                <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }} style={{"width":"100%","marginTop":"20px"}}>
                    <Box w={{ base: '100%', md: '50%' }} p={4} className="form-info">

                        <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                            <FormLabel style={{"color":"#EB5C27"}} >Name</FormLabel>
                            <Input
                                type="text"
                                name="tel"
                                value={formData.name}
                                onChange={(e)=>{setFormData({...formData,name:e.target.value})}}
                                placeholder="Enter your name" 
                                className="input"
                            />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                            <FormLabel style={{"color":"#EB5C27"}} >Contact number</FormLabel>
                            <Input
                                type="number"
                                name="name"
                                value={formData.phone}
                                onChange={(e)=>{setFormData({...formData,phone:e.target.value})}}
                                placeholder="Enter your contact number" 
                                className="input"
                            />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>


                        <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                            <FormLabel style={{"color":"#EB5C27"}} >Country</FormLabel>
                            <Select
                                
                                name="name"
                                value={formData.country}
                                onChange={(e)=>{setFormData({...formData,country:e.target.value})}}
                                placeholder="Select your country" 
                                className="input"

                                bg='tomato'
                                color={"#FCFCFC"}
                            >

                                {countryOptions.map((item) => (  
                                    <option style={{backgroundColor:"#FF6347"}} key={item.label} value={item.label}>{item.label}</option>
                                ))}

                            </Select>
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>

                        {/* <Input type="text" placeholder="Enter your name" className="input" />
                        <Input type="tel" placeholder="Enter your contact number" className="input"/> */}
                    </Box>

                    <Box w={{ base: '100%', md: '50%' }} p={4} className="form-info">

                        <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >E mail</FormLabel>
                                <Input
                                    type="text"
                                    name="tel"
                                    value={formData.email}
                                    onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
                                    placeholder="Enter your email" 
                                    className="input"
                                />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                            </FormControl>

                            <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Address</FormLabel>
                                <Textarea
                                    type="tel"
                                    name="name"
                                    value={formData.address}
                                    onChange={(e)=>{setFormData({...formData,address:e.target.value})}}
                                    placeholder="[House/Building Number] [Street Name]
                                    [City/Town], [State/Province/Region] [Postal Code]" 
                                    rows="3" 
                                    className="textarea"
                                >
                                </Textarea>
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                            </FormControl>
                        {/* <Input type="email" placeholder="Enter your email address"  className="input"/>
                        <Textarea placeholder="Enter your address" rows="3" className="textarea" ></Textarea> */}
                    </Box>


                    
                </Flex>

                

                <div className="submit">
                    <Button isLoading={btnProcess} className="submit-btn" bg="#EB5C27" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} type="submit" >Save & Submit</Button>
                </div>

              
            </form>


            <Modal isOpen={isOpen} onClose={onClose} size={"xl"} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent bg="#363649" >
                <ModalHeader color={"#FCFCFC"} textAlign="center">How would you describe your role?</ModalHeader>

                        <Text textAlign="center" color="orange" fontSize="15px">Please select at least one role</Text>

                    <ModalBody>

                        <Box >

                            <form>
                                <Stack spacing={[1, 5]} direction={['column', 'row']} wrap="wrap" display="flex" justifyContent="center" alignItems="center">
                                    <Checkbox  size='md' margin="7px"  colorScheme='orange'  color="#dfdfdf"  onChange={(e) => setRoles({ ...roles, singer: e.target.checked })} >
                                        Singer
                                    </Checkbox>
                                    <Checkbox  size='md' margin="7px"  colorScheme='orange'  color="#dfdfdf"   onChange={(e) => setRoles({ ...roles, lyrists: e.target.checked })}>
                                        Lyrists
                                    </Checkbox>
                                    <Checkbox  size='md' margin="7px"  colorScheme='orange'  color="#dfdfdf"   onChange={(e) => setRoles({ ...roles, composers: e.target.checked })}>
                                        Composers
                                    </Checkbox>
                                   
                                </Stack>

                                <Stack spacing={[1, 5]} direction={['column', 'row']} wrap="wrap" display="flex" justifyContent="center" alignItems="center">
                                    <Checkbox  size='md' margin="7px"  colorScheme='orange' color="#dfdfdf"   onChange={(e) => setRoles({ ...roles, masteringEngineers: e.target.checked })}>
                                        Mastering Engineers
                                    </Checkbox>
                                    <Checkbox  size='md' margin="7px"  colorScheme='orange'  color="#dfdfdf"   onChange={(e) => setRoles({ ...roles, producers: e.target.checked })}>
                                        Producers
                                    </Checkbox>
                                    <Checkbox  size='md' margin="7px"  colorScheme='orange'  color="#dfdfdf"  onChange={(e) => setRoles({ ...roles, publishers: e.target.checked })}>
                                        Publishers
                                    </Checkbox>
                                    
                                </Stack>
                                <Stack spacing={[1, 5]} direction={['column', 'row']} wrap="wrap" display="flex" justifyContent="center" alignItems="center">
                                        <Checkbox  size='md' margin="7px"  colorScheme='orange' color="#dfdfdf"   onChange={(e) => setRoles({ ...roles, sessionArtists: e.target.checked })}>
                                            Session artists
                                        </Checkbox>
                                        <Checkbox  size='md' margin="7px"  colorScheme='orange'  color="#dfdfdf"  onChange={(e) => setRoles({ ...roles, foleyArtists: e.target.checked })}>
                                            Foley artists
                                        </Checkbox>
                                        <Checkbox  size='md' margin="7px"  colorScheme='orange'  color="#dfdfdf"   onChange={(e) => setRoles({ ...roles, tutor: e.target.checked })}>
                                            Tutor
                                        </Checkbox>
                                    
                                </Stack>
                                <Stack spacing={[1, 5]} direction={['column', 'row']} wrap="wrap" display="flex" justifyContent="center" alignItems="center">
                                    <Checkbox  size='md' margin="7px"  colorScheme='orange'  color="#dfdfdf"   onChange={(e) => setRoles({ ...roles, musicDistributors: e.target.checked })}>
                                            Music Distributors
                                    </Checkbox>
                                    <Checkbox  size='md' margin="7px"  colorScheme='orange'  color="#dfdfdf"   onChange={(e) => setRoles({ ...roles, mixingEngineers: e.target.checked })}>
                                        Mixing Engineers
                                    </Checkbox>
                                </Stack>



                                <Box margin={"50px 0px 5px 0px"} color={"#dfdfdf"} fontSize={"15px"}>

                                    <ModalHeader color={"#FCFCFC"} textAlign="center">Unlock Your Music Potential!</ModalHeader>

                                    <List spacing={3} marginLeft={"30px"}>
                                        <ListItem>
                                            <ListIcon as={CheckCircleIcon} color='green.500' />
                                            Sign up today and take your music career to new heights.
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={InfoIcon} color='green.500' />
                                            Don't forget to provide us with your essential contact details (email, phone number, address, country) and bank information.
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={InfoIcon} color='green.500' />
                                            These details enable us to assist you with music publishing, distribution, and licensing through songcosmos.com.
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={InfoIcon} color='green.500' />
                                            Remember, incomplete information may lead to inconvenience, so let's make sure we're fully connected!
                                        </ListItem>

                                    </List>
                                </Box>


                                <Box w="100%" display="flex" justifyContent="center" alignItems="center">

                                    <Button w={"150px"} h={"40px"} backgroundColor={"#EB5C27"} color="white" margin={"30px"} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} onClick={sendPopUpInfo} isLoading={btn2Process} >SUBMIT</Button>
                                </Box>

                            </form>
                            
                        </Box>



                    </ModalBody>
                </ModalContent>
            </Modal>
        </section>
    )
}