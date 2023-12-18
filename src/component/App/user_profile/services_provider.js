import React,{useState} from "react";
import { Box, Flex ,Button,Text,Input,Stack,useToast,Progress ,Radio, RadioGroup} from '@chakra-ui/react';

import "../../../css/profile.css";
import axios from "axios";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MemberRedirect from "../../privatePageRedirect/memberRedirect";

import { sendEmail } from "../sendEmail";

let file_cover_img =undefined;
export default function Tab6(){
    const [uploadProgress, setUploadProgress] = useState(0);
    const [btnProcess, setBtnProcess] = useState(false);
    const [wordCount, setwordCount] = useState(0);
    const toastServicesProvider = useToast()

    const [value, setValue] = useState('');
    function handleChange(newValue) {
        setwordCount(newValue.length);
        setValue(newValue);
        setServiceProviderFromData({...serviceProviderFromData,spDesc : value})
      }


      function uploadCover(){
        document.getElementById("cover-image-input").click();

      }

     

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
           // console.log(file_cover_img);
            reader.readAsDataURL(file_cover_img);

        }else{
            toastServicesProvider({
                title: 'Something went wrong!',
                description: "You can upload PNG or JPG an image only",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }

      }

      let [serviceProviderFromData , setServiceProviderFromData] = useState({
        Singer:false,
        Lyrists:false,
        Composers:false,
        MixingEngineers:false,
        MasteringEngineers:false,
        Producers:false,
        Publishers:false,
        MusicDistributors:false,
        SessionArtists:false,
        FoleyArtists:false,
        Tutor:false,
        SingerPrice:0,
        LyristsPrice:0,
        ComposersPrice:0,
        MixingEngineersPrice:0,
        MasteringEngineersPrice:0,
        ProducersPrice:0,
        PublishersPrice:0,
        MusicDistributorsPrice:0,
        SessionArtistsPrice:0,
        FoleyArtistsPrice:0,
        TutorPrice:0,
        spDesc:"",
        spFunction:"insert",
        userId:CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8)
      })

      function formSubmit(e) {
        e.preventDefault();
        setBtnProcess(true);
        
        if((serviceProviderFromData.Singer || serviceProviderFromData.Lyrists || serviceProviderFromData.Composers || serviceProviderFromData.MixingEngineers || serviceProviderFromData.MasteringEngineers || serviceProviderFromData.Producers || serviceProviderFromData.Publishers || serviceProviderFromData.MusicDistributors || serviceProviderFromData.SessionArtists || serviceProviderFromData.FoleyArtists) && (serviceProviderFromData.SingerPrice === 0 ^ serviceProviderFromData.LyristsPrice === 0 ^ serviceProviderFromData.ComposersPrice === 0 ^ serviceProviderFromData.MixingEngineersPrice === 0 ^ serviceProviderFromData.MasteringEngineersPrice === 0 ^ serviceProviderFromData.ProducersPrice === 0 ^ serviceProviderFromData.PublishersPrice === 0 ^ serviceProviderFromData.MusicDistributorsPrice === 0 ^ serviceProviderFromData.SessionArtistsPrice === 0 ^ serviceProviderFromData.FoleyArtistsPrice === 0)){

            if(serviceProviderFromData.spDesc.length >= 100 && serviceProviderFromData.spDesc.length <= 1400){

                console.log(file_cover_img)

                if(!(typeof(file_cover_img) === "undefined")){

              

                   // console.log("service provider info submiting....")

                   // console.log(file_cover_img);

                    const formData = new FormData();
                    formData.append('image', file_cover_img);
                    formData.append('data', JSON.stringify(serviceProviderFromData));

                    axios.post('https://www.songcosmos.com/PHP/servicesProvider.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                    }).then(response => {
                        setBtnProcess(false);
                        if(response.data === "success"){
                            toastServicesProvider({
                                title: 'Good Job !',
                                description: "Your gigs added as the services provider",
                                status: 'success',
                                duration: 9000,
                                isClosable: true,
                              })

                              sendEmail("you joined as the Service provider" , "You have successfully entered songcosmos as a service provider, you will now meet new customers. Customers will contact you via email.");

                              window.location.reload();

                        }else{
                            toastServicesProvider({
                                title: 'Something went wrong!',
                                description: "Please try again or Contact us",
                                status: 'error',
                                duration: 9000,
                                isClosable: true,
                              })
                        }

                    }).catch(error => {
                        setBtnProcess(false);
                        toastServicesProvider({
                            title: 'Something went wrong!',
                            description: "Please try again or Contact us",
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                          })

                    });

                }else{
                    setBtnProcess(false);
                    toastServicesProvider({
                        title: 'Something went wrong!',
                        description: "Please upload cover image.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      })

                }



            }else{
                setBtnProcess(false);
                toastServicesProvider({
                    title: 'Something went wrong!',
                    description: "About skill should be more than 100 words and less than 1400 words.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            }

            

        }else{
            setBtnProcess(false);
            toastServicesProvider({
                title: 'Something went wrong!',
                description: "Fill all fields, if not you can't become a service provider.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }

      };

    return(
        <section className="services-provider">

            <MemberRedirect/>
             <h1 className="title"> Become <span>Services</span>  Provider </h1>

        <form style={{"width":"100%"}} onSubmit={formSubmit}>


             <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }} style={{"width":"100%","marginTop":"20px"}}>

                    
                <Box w={{ base: '100%', md: '50%' }} p={4} className="form-info">
                    <Text fontWeight="600" textAlign="left" marginBottom="15px" color="#EB5C27">Cover Image*</Text>
                    <div className="profile-image">
                        <img id="cover-img" src="https://images.unsplash.com/photo-1572220555770-bd2feb5b7a30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80" alt="profile"/>
                        <Input type="file" display="none" id="cover-image-input" onChange={previewImage} />

                        <i className="fa-solid fa-camera input-image-icon" id="input-image-icon" onClick={uploadCover} ></i>
                        <Progress value={uploadProgress} size='xs' colorScheme='orange' width={"100%"} />
                    </div>
                    
                </Box>

                <Box w={{ base: '100%', md: '50%' }} p={4} className="form-info">
                    <Text fontWeight="600" textAlign="left" marginBottom="15px" color="#EB5C27">Service Category*</Text>

                    <div className="ctg">
                        <RadioGroup defaultValue='1'>
                            <Stack>
                                <Radio name="serviceRole" value="1" colorScheme="orange"  onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,Singer : event.target.checked ,Lyrists : false,Composers:false,MixingEngineers:false,MasteringEngineers:false,Producers:false,Publishers:false,MusicDistributors:false,SessionArtists:false,FoleyArtists:false,Tutor:false})} >Singer</Radio> 
                                <Radio name="serviceRole" value="2" colorScheme="orange"  onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,Lyrists : event.target.checked ,Singer : false,Composers:false,MixingEngineers:false,MasteringEngineers:false,Producers:false,Publishers:false,MusicDistributors:false,SessionArtists:false,FoleyArtists:false,Tutor:false})} >Lyrists</Radio>
                                <Radio name="serviceRole" value="3" colorScheme="orange"  onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,Composers : event.target.checked ,Lyrists : false,Singer:false,MixingEngineers:false,MasteringEngineers:false,Producers:false,Publishers:false,MusicDistributors:false,SessionArtists:false,FoleyArtists:false,Tutor:false})} >Composers</Radio>
                                <Radio name="serviceRole" value="4" colorScheme="orange"  onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,MixingEngineers : event.target.checked ,Lyrists : false,Composers:false,Singer:false,MasteringEngineers:false,Producers:false,Publishers:false,MusicDistributors:false,SessionArtists:false,FoleyArtists:false,Tutor:false})} >Mixing Engineers</Radio>
                                <Radio name="serviceRole" value="5" colorScheme="orange"  onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,MasteringEngineers : event.target.checked ,Lyrists : false,Composers:false,MixingEngineers:false,Singer:false,Producers:false,Publishers:false,MusicDistributors:false,SessionArtists:false,FoleyArtists:false,Tutor:false})} >Mastering Engineers</Radio>
                                <Radio name="serviceRole" value="6" colorScheme="orange"  onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,Producers : event.target.checked ,Lyrists : false,Composers:false,MixingEngineers:false,MasteringEngineers:false,Singer:false,Publishers:false,MusicDistributors:false,SessionArtists:false,FoleyArtists:false,Tutor:false})} >Producers</Radio>
                                <Radio name="serviceRole" value="7" colorScheme="orange"  onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,Publishers : event.target.checked ,Lyrists : false,Composers:false,MixingEngineers:false,MasteringEngineers:false,Producers:false,Singer:false,MusicDistributors:false,SessionArtists:false,FoleyArtists:false,Tutor:false})} >Publishers</Radio>
                                <Radio name="serviceRole" value="8" colorScheme="orange"  onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,MusicDistributors : event.target.checked ,Lyrists : false,Composers:false,MixingEngineers:false,MasteringEngineers:false,Producers:false,Publishers:false,Singer:false,SessionArtists:false,FoleyArtists:false,Tutor:false})} >Music Distributors</Radio>
                                <Radio name="serviceRole" value="9" colorScheme="orange"  onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,SessionArtists : event.target.checked ,Lyrists : false,Composers:false,MixingEngineers:false,MasteringEngineers:false,Producers:false,Publishers:false,MusicDistributors:false,Singer:false,FoleyArtists:false,Tutor:false})} >Session Artists</Radio>
                                <Radio name="serviceRole" value="10" colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,FoleyArtists : event.target.checked ,Lyrists : false,Composers:false,MixingEngineers:false,MasteringEngineers:false,Producers:false,Publishers:false,MusicDistributors:false,SessionArtists:false,Singer:false,Tutor:false})} >Foley Artists</Radio>
                                <Radio name="serviceRole" value="11" colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,Tutor : event.target.checked ,Lyrists : false,Composers:false,MixingEngineers:false,MasteringEngineers:false,Producers:false,Publishers:false,MusicDistributors:false,SessionArtists:false,FoleyArtists:false,Singer:false})} >Tutor</Radio>
                            
                            </Stack>
                        </RadioGroup>
                    </div>
                </Box>


                

             </Flex>  

             <Text fontWeight="600" textAlign="left" marginTop="50px" color="#EB5C27">Your Services prices (LKR)*</Text>
             <Text fontWeight="500" textAlign="left" marginTop="5px" color="#FCFCFC" fontSize="14px">Enter the amount charged per project for each skill here</Text>
             <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }} style={{"width":"100%","marginTop":"10px"}}>

                <Box w={{ base: '100%', md: '50%' }} p={4} className="form-info">
                    
                    <Stack spacing={3}>
                        <Input disabled={!serviceProviderFromData.Singer} colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,SingerPrice : event.target.value})} placeholder="Singer Price Here" size="md" />
                        <Input disabled={!serviceProviderFromData.Lyrists} colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,LyristsPrice : event.target.value})} placeholder="Lyrists Price Here" size="md" />
                        <Input disabled={!serviceProviderFromData.Composers} colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,ComposersPrice : event.target.value})} placeholder="Composers Price Here" size="md" />
                        <Input disabled={!serviceProviderFromData.MixingEngineers} colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,MixingEngineersPrice : event.target.value})} placeholder="Mixing Engineers Price Here" size="md" />
                        <Input disabled={!serviceProviderFromData.MasteringEngineers} colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,MasteringEngineersPrice : event.target.value})} placeholder="Mastering Engineers Price Here" size="md" />
                            
                    </Stack>
                </Box>

                <Box w={{ base: '100%', md: '50%' }} p={4} className="form-info">
                    <Stack spacing={3}>
                        <Input disabled={!serviceProviderFromData.Producers} colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,ProducersPrice : event.target.value})} placeholder="Producers Price Here" size="md" />
                        <Input disabled={!serviceProviderFromData.Publishers} colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,PublishersPrice : event.target.value})} placeholder="Publishers Price Here" size="md" />
                        <Input disabled={!serviceProviderFromData.MusicDistributors} colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,MusicDistributorsPrice : event.target.value})} placeholder="Music Distributors Price Here" size="md" />
                        <Input disabled={!serviceProviderFromData.SessionArtists} colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,SessionArtistsPrice : event.target.value})} placeholder="Session artists Price Here" size="md" />
                        <Input disabled={!serviceProviderFromData.FoleyArtists} colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,FoleyArtistsPrice : event.target.value})} placeholder="Foley artists Price Here" size="md" />
                        <Input disabled={!serviceProviderFromData.Tutor} colorScheme="orange" onChange={(event)=>setServiceProviderFromData({...serviceProviderFromData,TutorPrice : event.target.value})} placeholder="Tutor artists Price Here" size="md" />
                    </Stack>
                </Box>

             </Flex>

      

             <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }} style={{"width":"100%","marginTop":"50px"}}>

                    
                    <Box w={{ base: '100%', md: '100%' }} p={4} className="form-info">
                        <Text fontWeight="600" textAlign="left" marginBottom="15px" color="#EB5C27">About Your Skill* <span style={{color:"#FCFCFC",fontSize:"14px"}}>(services/expirinces/why special you....)</span> </Text>
                        <Text fontWeight="400" textAlign="left" marginBottom="13px" color="#EB5C27">Words: {wordCount}</Text>
                         <ReactQuill
                            value={value}
                            onChange={handleChange}
                            style={{"width":"100%"}}
                        />
                        
                    </Box>
                </Flex>    

                <div className="submit">
                    <Button isLoading={btnProcess} bg="#EB5C27" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} width="300px" type="submit" >Save & Submit</Button>
                </div>
        </form>   
        </section>
    )
}

