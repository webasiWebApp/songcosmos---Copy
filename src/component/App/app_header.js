import React from "react";

import { Link } from "react-router-dom";
import {useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

import { Box,DrawerBody,Text,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,Drawer,useDisclosure,Divider, Menu, MenuButton, Portal, MenuList, MenuItem, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel} from '@chakra-ui/react';

import "../../css/app_main.css";
import PrivatePageRedirect from '../privatePageRedirect/privatePageRedirect';

import { LicenseDispute,LicenseReport } from "../licenseReportDispute/licenseRepoDisFunc";


export default function AppNavigation(){


    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [isClickLicenseReport, setIsClickLicenseReport] = React.useState(false);
    const [isClickLicenseDispute, setIsClickLicenseDispute] = React.useState(false);


    function logOut(){
        Cookies.remove('isLogged');
        Cookies.remove('Id');
        Cookies.remove('avatar');
        Cookies.remove('mToken');
        window.location.href = "/";

    }


    function redirectPublisherAcc(){

        if(Cookies.get('mToken')){

            let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)
            if(!((isMember === "MclaD") || (isMember === "MclaP") || (isMember === "Mbro") ||(isMember === "Msil") ||(isMember === "Mgold") ||(isMember === "Mpla")) ){
                navigate('/membership', { replace: true });
            }else{
                window.open('', '_blank');
            }
        }else{
            navigate('/membership', { replace: true });
        }
    }


    function redirectCMOsAcc(){

        if(Cookies.get('mToken')){

            let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)
            if(!((isMember === "MclaD") || (isMember === "MclaP") || (isMember === "Mbro") ||(isMember === "Msil") ||(isMember === "Mgold") ||(isMember === "Mpla")) ){
                navigate('/membership', { replace: true });
            }else{
                window.open('https://members.imro.ie/', '_blank');
            }
        }else{
            navigate('/membership', { replace: true });
        }
    }



    function redirectDistribute(){
        if(Cookies.get('mToken')){

            let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)
            if(!((isMember === "MclaD") || (isMember === "MclaP") || (isMember === "Mbro") ||(isMember === "Msil") ||(isMember === "Mgold") ||(isMember === "Mpla")) ){
                navigate('/membership', { replace: true });
            }else{
                window.open('https://distribute.songcosmos.com', '_blank');
            }
        }else{
            navigate('/membership', { replace: true });
        }
    }

    return(<>
            <p className="special-note" style={{display:"none"}}>
                This website is currently under development!. SONGCOSMOS website will be officially released soon.
            </p>
        <header className='app-header'>
            <PrivatePageRedirect/>
            <Link to="/"> <h2>SONGCOSMOS</h2></Link>
            
            <nav>

                <Menu >
                    <MenuButton> <i className="fa-regular fa-copyright"  ></i> Publish</MenuButton>
                    <Portal>
                        <MenuList bg="#161622" color="white" >
                            <MenuItem  bg="#161622" color="white" onClick={redirectPublisherAcc} > Login to publisher account</MenuItem>
                            <MenuItem bg="#161622" color="white" onClick={redirectCMOsAcc} >Login to CMOs account</MenuItem>
                        </MenuList>
                    </Portal>
                </Menu>

                {isClickLicenseReport && <LicenseReport onClosePopUp={()=>{setIsClickLicenseReport(false)}} /> }
                {isClickLicenseDispute && <LicenseDispute onClosePopUp={()=>{setIsClickLicenseDispute(false)}} /> }

                <Text cursor="pointer" onClick={redirectDistribute}> <i className="fa-solid fa-circle-nodes"></i> Distribute</Text>
                <Menu >
                    <MenuButton color="white" fontWeight="400" > <i className="fa-solid fa-scroll"></i> License </MenuButton>
                        <Portal>
                            <MenuList bg="#161622" color="white" >
                                <MenuItem  bg="#161622" color="white" > <Link to="/app/license" title="Obtain a Licence for original publishing rights">License catalogue</Link></MenuItem>
                                <MenuItem bg="#161622" color="white" onClick={()=>{setIsClickLicenseReport(true)}} title="Report any copyrights violation confidentially" >Report</MenuItem>
                                <MenuItem bg="#161622" color="white" onClick={()=>{setIsClickLicenseDispute(true)}} title="If you claim the publishing rights of a tile listed in our catalogue, please submit it to start an investigation.  " >Dispute</MenuItem>
                            </MenuList>
                        </Portal>
                 </Menu>
                <Link to="/app/music-buddies"> <i className="fa-solid fa-people-group"></i> Music Buddies</Link>
                <Link to="/app/inbox"> <i className="fa-solid fa-message"></i> Inbox</Link>
                <Link to="/app/profile"> <i className="fa-solid fa-user"></i> Profile</Link>
                <Link to="/"> <i className="fa-solid fa-house"></i> Home</Link>
                <Link  color='red'><i onClick={logOut} className="fa-solid fa-power-off" style={{color:"red",marginLeft:"30px"}}></i></Link>
            </nav>

            <i style={{fontSize:"20px",color:"#FCFCFC"}} className="fa-solid fa-bars mobile-app-menu-icon" onClick={onOpen} ></i>
            



            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg={"#161622"} color={"#FCFCFC"} >
                <DrawerCloseButton />
                <Text textAlign={"center"} fontSize={"20px"} fontWeight={"700"} marginTop={"20px"} >App Menu</Text>
                <DrawerBody className="mobile-menu">
                    
                    <ul>
                        <Box mt={2} display="flex" flexDirection={"column"}>

                        <Accordion marginTop={"10px"} allowMultiple>
                                <AccordionItem>
                                    <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                        <i className="fa-regular fa-copyright"  ></i> Publish
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Link className='app-menu-item' onClick={redirectPublisherAcc} >  Login to publisher account</Link><br/><br/>
                                        <Link className='app-menu-item' onClick={redirectCMOsAcc}> Login to CMOs account</Link>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>

                            <Link className='app-menu-item' to="/app/imro-songcosmos"> <i className="fa-regular fa-copyright"></i> Publish</Link>
                            <Link className='app-menu-item' to="/app/distribute-vydia"> <i className="fa-solid fa-circle-nodes"></i> Distribute</Link>

                            <Accordion marginTop={"10px"} allowMultiple>
                                <AccordionItem>
                                    <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                        <i className="fa-solid fa-scroll"></i> License 
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Link to="/app/license" title="Obtain a Licence for original publishing rights"> License catalogue</Link> <br/><br/>
                                        <Link className='app-menu-item' onClick={()=>{setIsClickLicenseReport(true)}} >  License Report</Link><br/><br/>
                                        <Link className='app-menu-item' onClick={()=>{setIsClickLicenseDispute(true)}}> License Dispute</Link>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>


                            <Link className='app-menu-item' to="/app/music-buddies"> <i className="fa-solid fa-people-group"></i> Music Buddies</Link>
                            <Link to="/app/inbox"> <i className="fa-solid fa-message"></i> Inbox</Link>
                            <Link className='app-menu-item' to="/app/profile"> <i className="fa-solid fa-user"></i> Profile</Link>
                            <Link className='app-menu-item' to="/"> <i className="fa-solid fa-house"></i> Home</Link>
                            <Link  color='red'><i onClick={logOut} className="fa-solid fa-power-off" style={{color:"red",marginLeft:"30px"}}></i></Link>
                        </Box>

                        <Divider mt={"2"}/>

                        <Text  fontSize={"14px"} fontWeight={"400"} marginTop={"20px"} color={"GrayText"}>Copyright@2023 SONGCOSMOS.com</Text>
                    </ul>

                </DrawerBody>
                </DrawerContent>
            </Drawer>
      </header>
    </>
    );
}