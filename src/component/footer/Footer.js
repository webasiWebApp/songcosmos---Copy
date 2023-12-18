
import React from "react";
import { useEffect } from 'react';
import { Link ,useLocation  } from "react-router-dom";


import { Box, Grid, GridItem, Image, Text, Input, Button, Stack } from "@chakra-ui/react";

import logo_for_footer from "../../image/logo.png"

export default function Footer() {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [location.pathname]);

  return (

    <footer>
        <Box bg="gray.800" color="white" px={{ base: 4, lg: 20 }} py={10}>
        <Grid templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }} gap={6}>
            {/* Logo */}
            <GridItem colSpan={{ base: 1, lg: 1 }}>
            <Image src={logo_for_footer } alt="Website Logo" />
            <Text mt={4}>Empowering music creators worldwide with unlimited power to innovate, inspire, and shape the future of music!</Text>
            </GridItem>
            {/* Navigation */}
            <GridItem colSpan={{ base: 2, lg: 3 }}>
            <Grid templateColumns={{ base: "2fr", lg: "repeat(3, 1fr)" }} gap={6}>
                <GridItem>
                <Text className="footer-title" fontWeight="bold" mb={2}>Songcosmos</Text>
                <Stack spacing={2}>
                    <Text> <Link to="/about" className="footer-link">About Us</Link></Text>
                    <Text> <Link to="/contact" className="footer-link">Contact Us</Link></Text>
                    <Text><Link to="/sign-up" className="footer-link">Sign Up</Link> </Text>
                    <Text><Link to="/sign-in" className="footer-link">Sign In</Link></Text>                
                    <Text><Link to="/sign-in" className="footer-link">Join as services provider</Link></Text>
                </Stack>
                </GridItem>
                <GridItem>
                <Text  className="footer-title" fontWeight="bold" mb={2}>Resources</Text>
                <Stack spacing={2}>
                    <Text><Link to="https://blog.songcosmos.com/" target="_blank" className="footer-link">Our Blog</Link></Text>
                    <Text display={"none"}>Press</Text>
                    <Text> <Link to="/gallery" className="footer-link">Gallary</Link></Text>
                </Stack>
                </GridItem>
                <GridItem>
                <Text  className="footer-title" fontWeight="bold" mb={2}>Navigation</Text>
                <Stack spacing={2}>
                    <Text> <Link to="/distribute">Music Distribution </Link> </Text>
                    <Text><Link to="/publish" > Music Publishing </Link></Text>
                    <Text> <Link to="/music-buddies" className="footer-link" > Music buddies </Link></Text>
                    <Text><Link to="/membership" className="footer-link" > Membership </Link></Text>
                    <Text><Link to="/mix" className="footer-link"> Mix & Master </Link></Text>
                    <Text><Link to="/app/license">License</Link></Text>
                    <Text><Link to="/edu" className="footer-link"> Education </Link></Text>
                  
                </Stack>
                </GridItem>
            </Grid>
            </GridItem>
           
            <GridItem colSpan={{ base: 1, lg: 1 }}>

            <Link className="link" to="mailto:hello@songcosmos.com" style={{"marginTop":"15px" , "marginBottom":"15px"}}><i className="fa-solid fa-envelope" style={{"marginRight":"15px"}}></i> hello@songcosmos.com</Link>
            
            <br/>
            <br/>
            

            {/* <Link  className="link" to="/" style={{"marginTop":"15px"}}><i className="fa-solid fa-phone" style={{"marginRight":"15px",display:"none"}}></i> +94 415 1545 15</Link>
            <br/>
           
            
            <Link className="link" to="/" ><i className="fa-solid fa-phone" style={{"marginRight":"15px",display:"none"}}></i> +94 569 5959 12</Link> */}

            <div className="social-icon" style={{"marginTop":"15px"}}>
                <Link to={"https://www.facebook.com/SongcosmosALLinONEmusic"} target="_blank" ><i className="fa-brands fa-facebook"></i></Link>
                <Link to={"https://www.youtube.com/channel/UCOcyaFxvQgUGNPUxeXmS02w"} target="_blank" ><i className="fa-brands fa-youtube"></i></Link>
                <Link to={"https://www.linkedin.com/showcase/songcosmos%C2%AE/?viewAsMember=true"} target="_blank" ><i className="fa-brands fa-linkedin"></i> </Link>
                <Link to={"https://www.instagram.com/songcosmos.official/"} target="_blank" ><i className="fa-brands fa-instagram"></i></Link>
            </div>

             {/* Newsletter Subscription */}
            {/* <Text fontWeight="bold" mb={2}>Subscribe to our newsletter</Text>
            <Stack direction="row">
                <Input placeholder="Enter your email address" />
                <Button style={{"backgroundColor":"#EB5C27"}} >Subscribe</Button>
            </Stack> */}
            </GridItem>
        </Grid>


        </Box>
        <div className="footer-bottom">
            
            <p>SONGCOSMOS <sup><i className="fa-regular fa-registered" style={{"fontSize":"10px"}}></i></sup> 2023 All rights reserved <Link className="link" to="/privacy"  style={{"marginLeft":"25px"}}> Privacy Policy </Link> | <Link className="link" to="/term"> Terms of Service</Link> </p>
            <p>Powerd by<Link className="link" to="https://pearlbay.com/" target={"_blank"} style={{"marginLeft":"5px"}}> PEARLBAY®</Link> </p>
        </div>
    </footer>
  );
}
