import { useState ,useEffect } from 'react';
import { Box, Flex,DrawerBody,Text,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,Drawer,useDisclosure,} from '@chakra-ui/react';

import "../../../css/profile.css";
import axios from "axios";
import Tab1 from './user_info_tab';
import Tab2 from './wishlist';
import Tab3 from './bank';
import Tab4 from './orderHistory';

import Tab5 from './notifi';
import Tab6 from './services_provider';
import Tab7 from './serices';

import AppNavigation from '../app_header';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

import {createUserOrUpdateUser} from "../inbox/firebaseUser";


function Profile() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [activeTab, setActiveTab] = useState(0);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(()=>{
      let profileData = {
        PFunction: "getProfileData",
        userId: CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8)
      };
     // console.log(CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8));
      const formData = new FormData();
      formData.append('data', JSON.stringify(profileData));
    
      axios.post('https://www.songcosmos.com/PHP/profile.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
         // console.log(response.data);
          setUserData(response.data);
          setLoading(false);


         
            let date = new Date();
            date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
            let expires = "expires="+ date.toUTCString();
            document.cookie = `mToken=${CryptoJS.AES.encrypt(response.data[0]["mId"], "jKd#MID#5z$7&m&&i&&dNp").toString()};`  + expires;
         

         
        // Create or update firebase user
         createUserOrUpdateUser(
          CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8),
          response.data[0].userName,
          response.data[0].userEmail,
          response.data[0].userAvatar
         );


        })
        .catch(error => {
         // console.log(error);
        });
       
    
  },[]);


  if (loading) {
    return(

      <section className='profile-sec'>
      <AppNavigation/>

        <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }} style={{"width":"100%"}}>
          <Box w={{ base: '100%', md: '20%' }} p={4} className="tabs">
            <ul className='tabs-item'>
              <li className={activeTab === 0 ? 'active' : ''} onClick={() => handleTabClick(0)}> <i className="fa-regular fa-user"></i> <span> Personal Info </span> </li>
              <li className={activeTab === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}> <i className="fa-solid fa-cart-shopping"></i> <span> My Cart </span> </li>
              <li className={activeTab === 2 ? 'active' : ''} onClick={() => handleTabClick(2)}> <i className="fa-solid fa-dollar-sign"></i> <span> Bank Details </span> </li>
              <li style={{display:"none"}} className={activeTab === 3 ? 'active' : ''} onClick={() => handleTabClick(3)}> <i className="fa-solid fa-gear"></i> <span> Setting </span> </li>
              <li style={{display:"none"}} className={activeTab === 4 ? 'active' : ''} onClick={() => handleTabClick(4)}> <i className="fa-regular fa-bell"></i> <span> Notification </span> </li>
              <li className={activeTab === 5 ? 'active' : ''} onClick={() => handleTabClick(5)}> <i className="fa-solid fa-hand-holding-dollar"></i> <span> Become Services Provider </span> </li>
            </ul>
          </Box>
        </Flex>
      </section>

    )
  }


  return (
    <section className='profile-sec'>
      <AppNavigation/>

      <div className='profile-tab-menu-icon-wrapper'>
          <i style={{fontSize:"20px"}} className="fa-solid fa-align-left profile-tab-menu-icon" onClick={onOpen} ></i>
      </div>
      

      <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }} style={{"width":"100%"}}>

      

        <Box w={{ base: '100%', md: '20%' }} p={4} className="tabs on-destop">
          <ul className='tabs-item'>
            <li className={activeTab === 0 ? 'active' : ''} onClick={() => handleTabClick(0)}> <i className="fa-regular fa-user"></i> <span> Personal Info </span> </li>
            <li className={activeTab === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}> <i className="fa-solid fa-cart-shopping"></i> <span> My Cart </span> </li>
            <li className={activeTab === 2 ? 'active' : ''} onClick={() => handleTabClick(2)}> <i className="fa-solid fa-dollar-sign"></i> <span> Bank Details </span> </li>
            <li className={activeTab === 3 ? 'active' : ''} onClick={() => handleTabClick(3)}> <i className="fa-solid fa-clock-rotate-left"></i> <span> Order History </span> </li>
            <li style={{display:"none"}} className={activeTab === 4 ? 'active' : ''} onClick={() => handleTabClick(4)}> <i className="fa-regular fa-bell"></i> <span> Notification </span> </li>
            <li className={activeTab === 5 ? 'active' : ''} onClick={() => handleTabClick(5)}> <i className="fa-solid fa-hand-holding-dollar"></i> <span> Become Services Provider </span> </li>
            <li className={activeTab === 6 ? 'active' : ''} onClick={() => handleTabClick(6)}> <i className="fa-solid fa-compact-disc"></i> <span> Your Serivices </span> </li>
          </ul>
        </Box>
        <Box w={{ base: '100%', md: '80%' }} p={4} className="tab-panel">
          {activeTab === 0 && <Tab1 userId={userData[0].userId} userName={userData[0].userName} userPhone={userData[0].userPhone} userEmail={userData[0].userEmail} userAvatar={userData[0].userAvatar}  userAdd={userData[0].userAdd} mId={userData[0].mId} country={userData[0].country} role={userData[0].role} />}
          {activeTab === 1 && <Tab2/>}
          {activeTab === 2 && <Tab3 bankName={userData[0].bankName} bankUserName={userData[0].bankUserName} bankBranchName={userData[0].bankBranchName} bankAccName={userData[0].bankAccName} />}
          {activeTab === 3 && <Tab4/>}
          {activeTab === 4 && <Tab5/>}
          {activeTab === 5 && <Tab6/>}
          {activeTab === 6 && <Tab7/>}
        </Box>
      </Flex>



      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg={"#161622"} color={"#FCFCFC"} >
                <DrawerCloseButton />
                <Text textAlign={"center"} fontSize={"20px"} fontWeight={"700"} marginTop={"20px"} >Profile Tabs</Text>
                <DrawerBody className="mobile-menu">
                    
                  <Box w={{ base: '100%', md: '20%' }} p={4} className="tabs">
                    <ul className='tabs-item'>
                      <li className={activeTab === 0 ? 'active' : ''} onClick={() => handleTabClick(0)}> <i className="fa-regular fa-user"></i> <span> Personal Info </span> </li>
                      <li className={activeTab === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}> <i className="fa-solid fa-cart-shopping"></i> <span> My Cart </span> </li>
                      <li className={activeTab === 2 ? 'active' : ''} onClick={() => handleTabClick(2)}> <i className="fa-solid fa-dollar-sign"></i> <span> Bank Details </span> </li>
                      <li className={activeTab === 3 ? 'active' : ''} onClick={() => handleTabClick(3)}> <i className="fa-solid fa-clock-rotate-left"></i> <span> Order History </span> </li>
                      <li style={{display:"none"}} className={activeTab === 4 ? 'active' : ''} onClick={() => handleTabClick(4)}> <i className="fa-regular fa-bell"></i> <span> Notification </span> </li>
                      <li className={activeTab === 5 ? 'active' : ''} onClick={() => handleTabClick(5)}> <i className="fa-solid fa-hand-holding-dollar"></i> <span> Become Services Provider </span> </li>
                      <li className={activeTab === 6 ? 'active' : ''} onClick={() => handleTabClick(6)}> <i className="fa-solid fa-compact-disc"></i> <span> Your Serivices </span> </li>
                    </ul>
                  </Box>

                </DrawerBody>
                </DrawerContent>
            </Drawer>




    </section>
  );
}

export default Profile;
