import React ,{ useState ,useEffect } from 'react';
import { Input,FormLabel,FormErrorMessage,FormControl,Button,Box, Flex ,Text,useDisclosure, Modal,ModalOverlay,ModalContent, ModalHeader, ModalBody,useToast} from '@chakra-ui/react';

import "../../css/profile.css";
import "../../css/admin.css"

import axios from "axios";

import Overview from './overview';
import User from './users';
import LicenseAdmin from './Alllicense';
import AddLicense from './addLicense';
import PendingPayment from './paymentPending';

export default function Dashbord() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAuth, setIsAuth] = useState(false);

  const [userData, setUserData] = useState();
  const [spData, setspData] = useState();
  const [licenseData, setlicenseData] = useState();
  const [PendingPaymentData, setPendingPaymentData] = useState();


  const [loading, setLoading] = useState(true);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };




  // authntication
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setuserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");



  const toastLogin = useToast();

  function adminLogin(){
    
      // Validate userName and password
   if (!userName) {
    setuserNameError("userName is required");
  } else {
    setuserNameError("");
  }
  if (!password) {
    setPasswordError("Password is required");
  } else {
    setPasswordError("");
  }

  if (userName && password) {

    let licenseData = {
      userName:userName,
      password:password,
      adminFunction:"adminLogin"
    };
  
    const formData = new FormData();
    formData.append('data', JSON.stringify(licenseData));
  
      axios.post('https://www.songcosmos.com/PHP/admin.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(result => {

        
          if(result.data.includes("Login Success")){
          
            setIsAuth(true)
            onClose();
          }else{
            toastLogin({
              title: '1Login unsuccessful',
              description: "Recheck your email or password then Try again!",
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          }
      })
   
    }
  }


  useEffect(()=>{


    if(isAuth){
      onClose();
      setLoading(true);


      // Get all songcosmos data



        // ---------- userData
      let userData = {
        adminFunction: "getuserData",
        
      };
    
      const formData = new FormData();
      formData.append('data', JSON.stringify(userData));
    
      axios.post('https://www.songcosmos.com/PHP/admin.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response1 => {
         // console.log(response.data);
            setUserData(response1.data)
          


            // -------- services provider data
            let spData = {
                adminFunction: "getspData",
                
              };
            
              const formData = new FormData();
              formData.append('data', JSON.stringify(spData));
            
              axios.post('https://www.songcosmos.com/PHP/admin.php', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then(response2 => {
                 // console.log(response.data);
                    setspData(response2.data)
                  

                    // -------- License data

                    let licenseData = {
                        adminFunction: "getlicenseData",
                        
                      };
                    
                      const formData = new FormData();
                      formData.append('data', JSON.stringify(licenseData));
                    
                      axios.post('https://www.songcosmos.com/PHP/admin.php', formData, {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }
                      }).then(response3 => {
                         // console.log(response.data);
                            setlicenseData(response3.data)
                            setLoading(false);


                             // -------- Payment data

                              let licenseData = {
                                adminFunction: "getPendingPaymentData",
                                
                              };
                            
                              const formData = new FormData();
                              formData.append('data', JSON.stringify(licenseData));
                            
                              axios.post('https://www.songcosmos.com/PHP/admin.php', formData, {
                                headers: {
                                  'Content-Type': 'multipart/form-data'
                                }
                              }).then(response4 => {
                                // console.log(response.data);
                                    setPendingPaymentData(response4.data)
                                    setLoading(false);
                                  // console.log(response4.data);
                                })
                                .catch(error => {
                                  //console.log(error);
                                });

                        })
                        .catch(error => {
                        //  console.log(error);
                        });
                
                })
                .catch(error => {
                 // console.log(error);
                });
        })
        .catch(error => {
         // console.log(error);
        });
       
    




      
    }else{
      onOpen();
      
    }


  },[isAuth, onClose, onOpen]);
 



  


  if (loading) {
    return(

        <section className='profile-sec'>

        <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }} style={{"width":"100%"}}>
          <Box w={{ base: '100%', md: '20%' }} p={4} className="tabs">
            <Text marginBottom={"30px"} textAlign={"center"} fontSize={"26px"} fontWeight="900" color={"#EB5C27"} >SONGCOSMOS</Text>
            <ul className='tabs-item'>
              <li className={activeTab === 0 ? 'active' : ''} onClick={() => handleTabClick(0)}> <i className="fa-solid fa-icons"></i> <span> Overview </span> </li>
              <li className={activeTab === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}> <i className="fa-solid fa-user"></i> <span> Users </span> </li>
              <li className={activeTab === 2 ? 'active' : ''} onClick={() => handleTabClick(2)}> <i className="fa-solid fa-key"></i> <span> License </span> </li>
              <li className={activeTab === 3 ? 'active' : ''} onClick={() => handleTabClick(6)}> <i className="fa-solid fa-file-circle-plus"></i> <span> Add License </span> </li>
            </ul>
          </Box>
        </Flex>


        
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay bg="#1E1E2D" />
          <ModalContent bg="#363649">
            <ModalHeader textAlign={"center"} color={"#FCFCFC"} >LOGIN</ModalHeader>
            <ModalBody pb={6}>
              

                <form onSubmit={(e)=>{adminLogin(); e.preventDefault();}}>
                    <FormControl id="userName" isInvalid={!!userNameError} mb={4}>
                      <FormLabel color="#EB5C27">userName</FormLabel>
                        <Input
                            type="text"
                            value={userName}
                            onChange={(e)=>{setuserName(e.target.value)}}
                            color="#EB5C27"
                            bg="gray.700"
                            borderColor="#EB5C27"
                            _hover={{ borderColor: "#EB5C27" }}
                            _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                        />
                      <FormErrorMessage>{userNameError}</FormErrorMessage>
                      </FormControl>
                      <FormControl id="password" isInvalid={!!passwordError} mb={4}>
                      <FormLabel color="#EB5C27">Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            color="#EB5C27"
                            bg="gray.700"
                            borderColor="#EB5C27"
                            _hover={{ borderColor: "#EB5C27" }}
                            _focus={{ borderColor: "#EB5C27", boxShadow: "none" }}
                        />
                      <FormErrorMessage>{passwordError}</FormErrorMessage>
                      </FormControl>
                      <Button type="submit" style={{"width":"100%"}} colorScheme="orange" bg="#EB5C27" _hover={{ bg: "#c44e1c" }}>
                      Login
                      </Button>
                  </form>

            </ModalBody>
          </ModalContent>
        </Modal>


        </section>

    )
  }


  return (
    <section className='profile-sec'>

      <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }} style={{"width":"100%"}}>
        <Box w={{ base: '100%', md: '20%' }} p={4} className="tabs">
          <Text marginBottom={"30px"} textAlign={"center"} fontSize={"26px"} fontWeight="900" color={"#EB5C27"} >SONGCOSMOS</Text>
          <ul className='tabs-item'>
            <li className={activeTab === 0 ? 'active' : ''} onClick={() => handleTabClick(0)}> <i className="fa-solid fa-icons"></i> <span> Overview </span> </li>
            <li className={activeTab === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}> <i className="fa-solid fa-user"></i> <span> Users </span> </li>
            <li className={activeTab === 2 ? 'active' : ''} onClick={() => handleTabClick(2)}> <i className="fa-solid fa-key"></i> <span> License </span> </li>
            <li className={activeTab === 3 ? 'active' : ''} onClick={() => handleTabClick(3)}> <i className="fa-solid fa-file-circle-plus"></i> <span> Add License </span> </li>
            <li className={activeTab === 4 ? 'active' : ''} onClick={() => handleTabClick(4)}> <i className="fa-solid fa-file-invoice-dollar"></i> <span> Pending Payment </span> </li>
          </ul>
        </Box>
        <Box w={{ base: '100%', md: '80%' }} p={4} className="tab-panel">
          {activeTab === 0 && <Overview userData={userData} spData={spData} licnData={licenseData} />}
          {activeTab === 1 && <User userData={userData}/>}
          {activeTab === 2 && <LicenseAdmin licnData={licenseData}/>}
          {activeTab === 3 && <AddLicense/>}
          {activeTab === 4 && <PendingPayment PendingPaymentData={PendingPaymentData} userData={userData} />}
        </Box>
      </Flex>






    </section>
  );
}


