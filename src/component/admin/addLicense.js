import React ,{ useState  } from 'react';
import { Divider,Box, FormErrorMessage ,Text ,Input , Button,useToast,Progress, FormControl,FormLabel} from '@chakra-ui/react';

import "../../css/profile.css";
import "../../css/admin.css"
import axios from "axios";



let file_cover_img =null;

export default function AddLicense(prop){

    const toastaddlicense = useToast();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [exelBtnUpload, setexelBtnUpload] = useState(false);

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
            
            reader.readAsDataURL(file_cover_img);

        }else{
            toastaddlicense({
                title: 'Something went wrong!',
                description: "You can upload PNG or JPG an image only",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }

      }


      const [formData, setFormData] = useState({
        title: "",
        author: "",
        composer: "",
        adminFunction:"inserLicense"
      });
    
      const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: ""
      });


      function insertLicense(){

        if(formData.title.trim().length === 0 || formData.author.trim().length === 0 || formData.composer.trim().length === 0 || file_cover_img === null){
            toastaddlicense({
                title: 'Fill all field',
                description: "",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }else{

            

                    const formData2 = new FormData();
                    formData2.append('image', file_cover_img);
                    formData2.append('data', JSON.stringify(formData));

                    axios.post('https://www.songcosmos.com/PHP/admin.php', formData2, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                    }).then(response => {

                            toastaddlicense({
                                title: 'Good Job !',
                                description: "License added successfuly",
                                status: 'success',
                                duration: 9000,
                                isClosable: true,
                              })


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

      }

      function insertLicenseviaexelFile(){

        setexelBtnUpload(true);
        const fileInput = document.getElementById('exelFile');
        let file_exel = fileInput.files[0];


        
        const formData2 = new FormData();
        formData2.append('exelFile', file_exel);
        formData2.append('data', JSON.stringify(formData));

        axios.post('https://www.songcosmos.com/PHP/readXcelFile.php', formData2, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        }).then(response => {

                toastaddlicense({
                    title: 'Good Job !',
                    description: "License added successfuly",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
                  setexelBtnUpload(false);


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


    return(

        <section className='dash-user-sec'>

                <Text fontSize={"40px"} fontWeight="900" color="#c23b0a" >Add Licenses</Text>

                <form style={{display:"flex",justifyContent:"Center",alignItems:"center",flexDirection:"column",padding:"50px"}} onSubmit={(e)=> {e.preventDefault(); insertLicense()}}>
                    <Box w={{ base: '100%', md: '40%' }} p={4} className="form-info" >
                        <Text fontWeight="600" textAlign="left" marginBottom="15px" color="#EB5C27">Cover Image*</Text>
                        <div className="profile-image" >
                            <img  id="cover-img" src="https://images.unsplash.com/photo-1572220555770-bd2feb5b7a30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80" alt="profile"/>
                            <Input type="file" display="none" id="cover-image-input" onChange={previewImage} />

                            <i className="fa-solid fa-camera input-image-icon" id="input-image-icon" onClick={uploadCover} ></i>
                            <Progress value={uploadProgress} size='xs' colorScheme='orange' width={"100%"} />
                        </div>
                    </Box>

                    <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Song Title</FormLabel>
                                <Input
                                    type="text"
                                    name="tel"
                                    value={formData.title}
                                    onChange={(e)=>{setFormData({...formData,title:e.target.value})}}
                                    placeholder="Enter Song Title" 
                                    className="input"
                                />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Song Author</FormLabel>
                                <Input
                                    type="text"
                                    name="tel"
                                    value={formData.author}
                                    onChange={(e)=>{setFormData({...formData,author:e.target.value})}}
                                    placeholder="Enter Song Author" 
                                    className="input"
                                />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Song Composer</FormLabel>
                                <Input
                                    type="text"
                                    name="tel"
                                    value={formData.composer}
                                    onChange={(e)=>{setFormData({...formData,composer:e.target.value})}}
                                    placeholder="Enter composer" 
                                    className="input"
                                />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <Button style={{"backgroundColor":"#EB5C27",marginTop:"30px"}} width="30%" type="submit"  >Add Song</Button>
                </form>

                <Divider/>



                <form style={{display:"flex",justifyContent:"Center",alignItems:"center",flexDirection:"column",padding:"50px"}} onSubmit={(e)=> {e.preventDefault(); insertLicenseviaexelFile()}}>

                    <FormControl id="name" isRequired isInvalid={errors.name} style={{"marginTop":"25px"}}>
                                <FormLabel style={{"color":"#EB5C27"}} >Upload Excel file here (Make use upload .xlsx file format) </FormLabel>
                                <Input
                                    type="file"
                                    id='exelFile' 
                                    
                                />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <Button isLoading={exelBtnUpload} style={{"backgroundColor":"#EB5C27",marginTop:"30px"}} width="30%" type="submit"  >Upload song file</Button>

                </form>

        </section>

    );
}