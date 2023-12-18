import React from "react";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

import { Box, Button,Avatar, DrawerBody,Text,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,Drawer,useDisclosure,Divider, Menu, MenuButton, Portal, MenuList, MenuItem} from '@chakra-ui/react';
import CryptoJS from 'crypto-js';


import { LicenseReport,LicenseDispute } from "../licenseReportDispute/licenseRepoDisFunc";

import logo from "../../image/logo.png"

export default function Navbar (){

    const [checkLogin, setChecklogin] = React.useState("no");
    const [isClickLicenseReport, setIsClickLicenseReport] = React.useState(false);
    const [isClickLicenseDispute, setIsClickLicenseDispute] = React.useState(false);
    const [avatar, setavatar] = React.useState("https://bit.ly/broken-link");

    const { isOpen, onOpen, onClose } = useDisclosure()

    React.useEffect(()=>{
       

        if(!(typeof Cookies.get('isLogged') === "undefined")){
            let isLogged  =CryptoJS.AES.decrypt(Cookies.get('isLogged') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8)
            setChecklogin(isLogged);
        }

        if(Cookies.get('avatar')){
           
            if(Cookies.get('avatar').includes("https://")){
                setavatar(Cookies.get('avatar'));
            }else{
                setavatar(`https://www.songcosmos.com/PHP/image/avatar/${Cookies.get('avatar')}`);
            }
            
        }

    },[checkLogin])

    

    return(

        <div className="nav-wrapper">
            <p className="special-note" style={{display:"none"}}>
                This website is currently under development!. songcosmos website will be officially released soon.
            </p>

            <nav>
            <Link to="/"> <img src={logo} id="logo" alt="logo-songcosmos" /></Link>
               

                <div className="nav-item">
                    <ul>
                        <Box mt={2} display="flex">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/distribute">Distribution</Link></li>
                            <li><Link to="/publish">Publishing</Link></li>
                            <li><Link to="/music-buddies" > Music Buddies </Link></li>
                            <li><Link to="/membership">Membership</Link></li>
                            <li><Link to="/mix">Mix & Master</Link></li>

                            <li>
                                <Menu >
                                    <MenuButton color="white" fontWeight="500" >  License</MenuButton>

                                        <Portal>
                                            <MenuList bg="#161622" color="white" >
                                                <MenuItem  bg="#161622" color="white" > <Link to="/app/license" title="Obtain a Licence for original publishing rights">License catalogue</Link></MenuItem>
                                                <MenuItem bg="#161622" color="white" onClick={()=>{setIsClickLicenseReport(true)}} title="Report any copyrights violation confidentially" >Report</MenuItem>
                                                <MenuItem bg="#161622" color="white" onClick={()=>{setIsClickLicenseDispute(true)}} title="If you claim the publishing rights of a tile listed in our catalogue, please submit it to start an investigation.  " >Dispute</MenuItem>
                                            </MenuList>
                                        </Portal>
                                </Menu>
                            </li>
                            <li><Link to="/edu" > Education </Link></li>
                        </Box>

                        {isClickLicenseReport && <LicenseReport onClosePopUp={()=>{setIsClickLicenseReport(false)}} /> }
                        {isClickLicenseDispute && <LicenseDispute onClosePopUp={()=>{setIsClickLicenseDispute(false)}} /> }

                        <li className="sign-up-btn"> {checkLogin === "yes" ? <Link to="/app/profile"> <Avatar size="sm" src={avatar} /> </Link> : <Link to="/sign-up"><Button style={{"backgroundColor":"#EB5C27"}}>Sign up FREE</Button> </Link>}  </li>
                    </ul>
                </div>

                <i style={{fontSize:"20px",color:"#FCFCFC"}} className="fa-solid fa-bars mobile-menu-icon" onClick={onOpen} ></i>
            </nav>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg={"#161622"} color={"#FCFCFC"} >
                <DrawerCloseButton />
                <Text textAlign={"center"} fontSize={"20px"} fontWeight={"700"} marginTop={"20px"} >Menu</Text>
                <DrawerBody className="mobile-menu">
                    
                    <ul>
                        <Box mt={2} display="flex" flexDirection={"column"}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/distribute">Distribution</Link></li>
                            <li><Link to="/publish">Publishing</Link></li>
                            <li><Link to="/music-buddies" > Music Buddies </Link></li>
                            <li><Link to="/membership">Membership</Link></li>
                            <li><Link to="/mix">Mix & Master</Link></li>
                            <li><Link to="/app/license">License</Link></li>
                            <li><Link to="/edu" > Education </Link></li>
                            <li className="sign-up-btn"> {checkLogin === "yes" ? <Link to="/app/profile"> <Avatar size="sm" src={avatar} /> </Link> : <Link to="/sign-up"><Button style={{"backgroundColor":"#EB5C27"}}>Sign up FREE</Button> </Link>}  </li>
                        </Box>

                        <Divider mt={"2"}/>

                        <Text  fontSize={"14px"} fontWeight={"400"} marginTop={"20px"} color={"GrayText"}>Copyright@2023 songcosmos.com</Text>
                    </ul>

                </DrawerBody>
                </DrawerContent>
            </Drawer>

        </div>

        
    )
}