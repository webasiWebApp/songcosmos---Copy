import React from "react";
import "../../css/home.css"

import { Link } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import HomeAnime from "../home_anime/Home_anime";
import Footer from "../footer/Footer";

import { Grid, GridItem } from "@chakra-ui/react";
import { Card, CardBody,Select } from '@chakra-ui/react'
import { Box, Button , Flex} from '@chakra-ui/react';
import {Modal,ModalOverlay,ModalContent,useDisclosure,ModalFooter,ModalBody,ModalCloseButton,} from '@chakra-ui/react'

import about_img from "../../image/about-us-img.jpg";
import destribution from "../../image/distribution.webp";
import publishing from "../../image/publishing.webp";
import teamwork from "../../image/teamwork.webp";
import license from "../../image/license.webp";
import blog_img from "../../image/blog-img.jpg";
import songcosmos from "../../image/songcosmos.jpg"
import partner1 from "../../image/partner-1.jpeg";
import partner2 from "../../image/partner-2.jpeg";
import partner3 from "../../image/partner-3.jpeg";
import partner4 from "../../image/partner-4.png";
import partner5 from "../../image/partner-5.jpg";
import edu_img from "../../image/edu-img.jpg";
import discount from "../../image/discount.png";
import profit from "../../image/profitShare.png"


import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import { color } from "framer-motion";

import { LazyLoadImage } from 'react-lazy-load-image-component';


//import { motion } from "framer-motion";

export default function Home (){




    const SlideSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
        ],
      };

      const { isOpen, onOpen, onClose } = useDisclosure()
      React.useEffect(() => {onOpen();}, []);
 

    return(
        <div>

        {/* Bita version message */}
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent style={{backgroundColor:"#151521"}}>
            <ModalBody padding={"5"} >
                <p style={{color:"white"}}>Thank you for visiting our website. This beta version offers just a glimpse of the exciting features we have in store. We invite you to explore and return soon for a truly remarkable experience. Our full services will be launched shortly. We appreciate your interest and look forward to welcoming you back.</p>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='orange' mr={3} onClick={onClose}>
                    Okey
                </Button>
                
            </ModalFooter>
            </ModalContent>
        </Modal>


            <section className="home-sec">
                <Navbar/>
                <HomeAnime/>

            </section>

            <section className="about-sec">
                <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4}>
                    <GridItem className="col-6" colSpan={{ base: 2, lg: 1 }}>

                        <div className="about-left-fill-box" >
                            <LazyLoadImage src={about_img} alt="about us img"  className="about-us-img"/>
                        </div>

                    </GridItem>
                    <GridItem className="col-6 about-sec-text" colSpan={{ base: 2, lg: 1 }}>

                        <h1>Our Commitment to <span> Excellence</span></h1>
                        <p>
                        Welcome to our all-in-one music platform, where excellence is our guiding principle. We believe in providing our members with the best tools and services to succeed in the music industry. Our commitment starts with music distribution, ensuring swift delivery to major streaming platforms for rapid revenue generation. Additionally, our integrated music publishing service enhances your earning potential. We constantly update our platform to meet industry standards, guaranteeing your music is in good hands. Join us today to experience excellence firsthand.
                        </p>

                    </GridItem>
                </Grid>
            </section>


            <section className="services-sec">
                <h1>Comprehensive Solutions <br/> for <span> Your Needs</span></h1>
                

                <Grid className="row" templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }} gap={4}>
                    
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <Card style={{"backgroundColor":"transparent"}}>
                            <CardBody className="services-card">
                                <LazyLoadImage src={destribution} alt="services distribute" />
                                <h5>Unlimited Music Distribute</h5>
                                <p>Embrace efficient multi-channel distribution, centralising music delivery for easy monetisation and reaching listeners seamlessly from one platform.</p>
                                
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <Card style={{"backgroundColor":"transparent"}}>
                            <CardBody className="services-card">
                                <LazyLoadImage src={publishing} alt="services distribute" />
                                <h5>Unlimited Music Publishing</h5>
                                <p>Join us for global music publishing: license, promote, protect artists' rights, earn copyright royalties worldwide. Let's thrive together!</p>
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <Card style={{"backgroundColor":"transparent"}}>
                            <CardBody className="services-card">
                                <LazyLoadImage src={teamwork} alt="services distribute" />
                                <h5>Collaboration</h5>
                                <p>Experience the magic of collaboration in creating inspiring and connecting music that's new and exciting. Join us today!</p>
                            </CardBody>
                        </Card>
                    </GridItem>

                </Grid>
                <Grid className="row" templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }} gap={4}>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <Card style={{"backgroundColor":"transparent"}}>
                            <CardBody className="services-card">
                                <LazyLoadImage src={license} alt="services distribute" />
                                <h5>License</h5>
                                <p>Streamline your music journey with our copyright licensing service for <strong style={{color:"#EB5C27"}}>Sri Lankan</strong> Song catalogue, simplifying life for creators in Sri Lanka.</p>
                            </CardBody>
                        </Card>
                    </GridItem>
           
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <Card style={{"backgroundColor":"transparent"}}>
                            <CardBody className="services-card">
                                <LazyLoadImage src={discount} alt="services distribute" />
                                <h5>Pro Audio Discount</h5>
                                <p>Join SONGCOSMOS and enjoy exclusive discounts on Pro Audio Gears, empowering your music creation journey with top-notch equipment!</p>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <Card style={{"backgroundColor":"transparent"}}>
                            <CardBody className="services-card">
                                <LazyLoadImage src={profit} alt="services distribute" />
                                <h5>Annual Profit Shares</h5>
                                <p>At SONGCOSMOS, we believe in empowering creators. Join us for annual profit shares, fostering growth and support for our members.</p>
                            </CardBody>
                        </Card>
                    </GridItem>

                </Grid>

            </section>

            <section className="edu-sec">
                <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4}>

                    <GridItem className="col-6 edu-sec-text" colSpan={{ base: 2, lg: 1 }}>

                        <h1>Learn online to improve <span> Music knowledge </span></h1>
                        <p>
                        Unlock your potential as an educator by offering courses to students and music professionals worldwide. Stand out with our promotional tools and receive the support you need to thrive.
                        </p>

                        <Button display={"none"} className="button" bg="#EB5C27" size="lg" color="#FCFCFC" style={{"marginTop":"30px",'width':"150px"}} > Learn Now <i className="fa-solid fa-arrow-up-right-from-square" style={{"marginLeft":"10px"}}></i> </Button>
                    </GridItem>


                    <GridItem className="col-6" colSpan={{ base: 2, lg: 1 }}>

                        <div className="edu-left-fill-box" >
                            <LazyLoadImage src={edu_img} alt="edu us img"  className="edu-us-img"/>
                        </div>

                    </GridItem>
                    
                </Grid>
            </section>


            <section className="songcosmos-sec">

                <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4}>
                    <GridItem className="col-6" colSpan={{ base: 2, lg: 1 }}>

                        <div className="songcosmos-left-fill-box" >
                            <LazyLoadImage src={songcosmos} alt="songcosmos us img"  className="songcosmos-us-img"/>
                        </div>

                    </GridItem>
                    <GridItem className="col-6 songcosmos-sec-text" colSpan={{ base: 2, lg: 1 }}>

                        <h2>Step into the world of <span className="highlight_1"> Music creators </span> and <span className="highlight_1"> Professionals </span> and embrace a supportive community</h2>

                    </GridItem>
                </Grid>
            </section>


            <section className="blog-sec">
                <h3>Various <span>Blog</span> for music industry</h3>


                <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={4}>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>

                        <Card style={{"backgroundColor":"#2d2d42"}}>
                            <CardBody className="blog-card">
                                <LazyLoadImage src={blog_img} alt="blog_img" />
                                <Link to="/" ><h4>Mixing in Stereo: 4 Tips for Wider Sounding Tracks</h4></Link>
                                <p>
                                Modern mixes need to sound wide and immersive in stereo. But getting a strong sense of width and depth into your tracks isn’t always easy. In fact, if you’re new to producing music you might not know where to start when it comes to mixing in stereo. In this article I’ll break down 6 helpful tips for better stereo sound
                                </p>

                                <Link to="/" > <Button bg="#EB5C27" color="#FCFCFC" style={{"width":"100%","marginTop":"15px"}} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}> Read More </Button></Link>
                            </CardBody>
                        </Card>

                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>

                        <Card style={{"backgroundColor":"#2d2d42"}}>
                            <CardBody className="blog-card">
                                <LazyLoadImage src={blog_img} alt="blog_img" />
                                <Link to="/" ><h4>Mixing in Stereo: 4 Tips for Wider Sounding Tracks</h4></Link>
                                <p>
                                Modern mixes need to sound wide and immersive in stereo. But getting a strong sense of width and depth into your tracks isn’t always easy. In fact, if you’re new to producing music you might not know where to start when it comes to mixing in stereo. In this article I’ll break down 6 helpful tips for better stereo sound
                                </p>

                                <Link to="/" > <Button  bg="#EB5C27" color="#FCFCFC" style={{"width":"100%","marginTop":"15px"}} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}> Read More </Button></Link>
                            </CardBody>
                        </Card>

                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>

                        <Card style={{"backgroundColor":"#2d2d42"}}>
                            <CardBody className="blog-card">
                                <LazyLoadImage src={blog_img} alt="blog_img" />
                                <Link to="/" ><h4>Mixing in Stereo: 4 Tips for Wider Sounding Tracks</h4></Link>
                                <p>
                                Modern mixes need to sound wide and immersive in stereo. But getting a strong sense of width and depth into your tracks isn’t always easy. In fact, if you’re new to producing music you might not know where to start when it comes to mixing in stereo. In this article I’ll break down 6 helpful tips for better stereo sound
                                </p>

                                <Link to="/" > <Button  bg="#EB5C27" color="#FCFCFC" style={{"width":"100%","marginTop":"15px"}} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}> Read More </Button></Link>
                            </CardBody>
                        </Card>

                    </GridItem>
                </Grid>
            </section>

            <section className="parner-sec" style={{display:"none"}}>
                <h2>Our <span>partners</span></h2>


                <div>
                    <Slider {...SlideSettings}>
                        <div>
                            <LazyLoadImage src={partner1} alt="partner" />
                        </div>
                        <div>
                            <LazyLoadImage src={partner2} alt="partner" />
                        </div>
                        <div>
                            <LazyLoadImage src={partner3} alt="partner" />
                        </div>
                        <div>
                            <LazyLoadImage src={partner4} alt="partner" />
                        </div>
                        <div>
                            <LazyLoadImage src={partner5} alt="partner" />
                        </div>
                    </Slider>
                </div>
            </section>


            <section className="membership-3-sec" style={{display:"none"}}>

                <h1 className="title"> <span>Membership</span> plans and pricing</h1>

                <Flex className="membership-row">
                    <Box w={{base: "100%", lg: "33.33%"}}>
                        <div className="packge-card"> 
                            <h2>CLASSIC</h2>
                            
                            <h3><sup><i className="fa-solid fa-dollar-sign" style={{"fontSize":"16px"}}></i></sup>30<span className="membership-time">/ one-time</span></h3>

                            

                            <Button type="submit"  colorScheme="orange" style={{"width":"70%","margin":"0px 0px 15px 0px"}} bg="#EB5C27" color="#FCFCFC">
                                JOIN WITH US
                            </Button>

                            <div className="benifit">
                                <p>IPI Registration</p>
                                <p>Song Registration</p>
                                <p>25% Music Distribution Commission</p>
                                <p>25% Music Publishing Commission</p>
                                <p>2.5% Pearlbay Store Discount</p>
                                <p>5% Production Discount</p>
                            </div>

                            <div className="select">
                                <Select
                                    border="1px"
                                    borderColor="#EB5C27"
                                    bg="transparent"
                                    color="#EB5C27"
                                    width="100%"
                                    
                                    >
                                    <option bg="transparent" value="MclaD">Music Distribution </option>
                                    <option bg="transparent" value="MclaP">Music Publishing</option>
                                </Select>
                            </div>
                        </div>
                    </Box>
                    <Box w={{base: "100%", lg: "33.33%"}}>
                        
                    <div className="packge-card"> 

                        <div className="recomment">RECOMMEND</div>
                            <h2>SILVER</h2>
                            
                            <h3><sup><i className="fa-solid fa-dollar-sign" style={{"fontSize":"16px"}}></i></sup>125<span className="membership-time">/ Per Annum</span></h3>

                            <Button type="submit"  colorScheme="orange" style={{"width":"70%","margin":"0px 0px 15px 0px"}} bg="#EB5C27" color="#FCFCFC">
                                JOIN WITH US
                            </Button>

                            <div className="benifit">
                                <p>IPI Registration</p>
                                <p>Song Registration</p>
                                <p>15% Music Distribution Commission</p>
                                <p>15% Music Publishing Commission</p>
                                <p>4.5% Pearlbay Store Discount</p>
                                <p>10% Production Discount</p>
                            </div>
                        </div>


                    </Box>
                    <Box w={{base: "100%", lg: "33.33%"}}>
                    <div className="packge-card"> 
                            <h2>PLATINUM</h2>
                            
                            <h3><sup><i className="fa-solid fa-dollar-sign" style={{"fontSize":"16px"}}></i></sup>500<span className="membership-time">/ Per Annum</span></h3>

                            <Button type="submit"  colorScheme="orange" style={{"width":"70%","margin":"0px 0px 15px 0px"}} bg="#EB5C27" color="#FCFCFC">
                                JOIN WITH US
                            </Button>

                            <div className="benifit">
                                <p>IPI Registration</p>
                                <p>Song Registration</p>
                                <p>5% Music Distribution Commission</p>
                                <p>10% Music Publishing Commission</p>
                                <p>8% Pearlbay Store Discount</p>
                                <p>15% Production Discount</p>
                            </div>
                        </div>
                    </Box>
                </Flex>

                <Link to="/membership" className="membership-page-link"> See all packages <i className="fa-solid fa-arrow-right" style={{"marginLeft":"5px"}}></i></Link>

            </section>

            <Footer/>
        </div>
    )

}