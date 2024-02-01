
import React from "react";
import "../../css/main_pages.css";


import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

import {Button } from '@chakra-ui/react';
import { Grid,Box , Image} from "@chakra-ui/react";

import singer from "../../image/singer.webp";
import lyrist from "../../image/lyrist.webp";
import producer from "../../image/producer.webp";
import composer from "../../image/composer.webp";
import foley from "../../image/foley.webp";
import distribution from "../../image/distribution.webp";
import Mixing from "../../image/Mixing-Engineer.webp";
import Mastering from "../../image/Mastering-Engineer.webp";
import publishing from "../../image/publishing.webp";
import session from "../../image/session-artist.webp";
import tutor from "../../image/tutor.png";


import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function Collaboration(){

    function redirectMusicBuddies(){
        window.location.href=`/app/music-buddies?filterd=true`;
    }

    function redirectProfile(){
        window.location.href=`/app/profile`;
    }


    return(
        <section className="collaboration-page">
            <Navbar/>

            <div className="collaboration-page-land">
                <h1>Unleashing creativity through <span>musical</span> partnerships</h1>

                <p> At our all-in-one music platform, we offer a unique opportunity to find or become a music buddy and collaborate on creating music, while also providing services to the world around you. Our platform is designed to help musicians, producers, songwriters, and other music professionals find their next project partners and grow their careers in the industry. </p>

                <Button className="collaboration-page-land-btn" bg="#EB5C27" size="lg" color="#FCFCFC" onClick={redirectMusicBuddies} style={{"marginTop":"30px"}} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}> Find your Music buddies Now </Button>
                <Button className="collaboration-page-land-btn" bg="#EB5C27" size="lg" color="#FCFCFC" onClick={redirectProfile} style={{"marginTop":"30px" }} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} > Join as services provider </Button>
            </div>

            <div className="collaboration-item">
                <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={{ base: 4, md: 6 }} className="row">

                    <Box colSpan={{ base: "auto", md: 1 }} className="col">
                        <div className="card">
                        <LazyLoadImage src={singer} alt="singer" className="img" />
                            <p>Singer</p>

                            <Button className="collaboration-item-btn" bg="#EB5C27" onClick={redirectMusicBuddies} size="lg" w="230px" color="#FCFCFC" style={{"marginTop":"30px" }} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} > Find Singer </Button>
                        </div>
                    </Box>

                    <Box colSpan={{ base: "auto", md: 1 }} className="col">
                        <div className="card">
                            <LazyLoadImage src={lyrist} alt="singer" className="img" />
                            <p>Lyrists</p>

                            <Button className="collaboration-item-btn" bg="#EB5C27" onClick={redirectMusicBuddies} size="lg" w="230px" color="#FCFCFC" style={{"marginTop":"30px" }} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} > Find Lyrists </Button>
                        </div>
                    </Box>

                    <Box colSpan={{ base: "auto", md: 1 }} className="col">
                        <div className="card">
                            <LazyLoadImage src={composer} alt="singer" className="img" />
                            <p>Composers</p>

                            <Button className="collaboration-item-btn" bg="#EB5C27" onClick={redirectMusicBuddies} size="lg" w="230px" color="#FCFCFC" style={{"marginTop":"30px" }} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} > Find Composers  </Button>
                        </div>
                    </Box>

                    <Box colSpan={{ base: "auto", md: 1 }} className="col">
                        <div className="card">
                            <LazyLoadImage src={Mixing} alt="singer" className="img" />
                            <p>Mixing Engineers</p>

                            <Button className="collaboration-item-btn" bg="#EB5C27" onClick={redirectMusicBuddies} size="lg" w="230px" color="#FCFCFC" style={{"marginTop":"30px" }} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} > Find Mixing Engineers  </Button>
                        </div>
                    </Box>

                    <Box colSpan={{ base: "auto", md: 1 }} className="col">
                        <div className="card">
                            <LazyLoadImage src={Mastering} alt="singer" className="img" />
                            <p>Mastering Engineers</p>

                            <Button className="collaboration-item-btn" bg="#EB5C27" onClick={redirectMusicBuddies} size="lg" w="230px" color="#FCFCFC" style={{"marginTop":"30px" }} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} > Find Mastering Engineers  </Button>
                        </div>
                    </Box>

                    <Box colSpan={{ base: "auto", md: 1 }} className="col">
                        <div className="card">
                            <LazyLoadImage src={producer} alt="singer" className="img" />
                            <p>Producers</p>

                            <Button className="collaboration-item-btn" bg="#EB5C27" onClick={redirectMusicBuddies} size="lg" w="230px" color="#FCFCFC" style={{"marginTop":"30px" }} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} > Find Producers  </Button>
                        </div>
                    </Box>

                    <Box colSpan={{ base: "auto", md: 1 }} className="col">
                        <div className="card">
                            <LazyLoadImage src={publishing} alt="singer" className="img" />
                            <p>Publishers </p>

                            <Button className="collaboration-item-btn" bg="#EB5C27" onClick={redirectMusicBuddies} size="lg" w="230px" color="#FCFCFC" style={{"marginTop":"30px" }} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} > Find Publishers  </Button>
                        </div>
                    </Box>

                    <Box colSpan={{ base: "auto", md: 1 }} className="col">
                        <div className="card">
                            <LazyLoadImage src={distribution} alt="singer" className="img" />
                            <p>Music Distributors </p>

                            <Button className="collaboration-item-btn" bg="#EB5C27" onClick={redirectMusicBuddies} size="lg" w="230px" color="#FCFCFC" style={{"marginTop":"30px" }} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} > Find Music Distributors  </Button>
                        </div>
                    </Box>

                    <Box colSpan={{ base: "auto", md: 1 }} className="col">
                        <div className="card">
                            <LazyLoadImage src={session} alt="singer" className="img" />
                            <p>Session artists</p>

                            <Button className="collaboration-item-btn" bg="#EB5C27" onClick={redirectMusicBuddies} size="lg" w="230px" color="#FCFCFC" style={{"marginTop":"30px" }} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} > Find Session artists  </Button>
                        </div>
                    </Box>

                    <Box colSpan={{ base: "auto", md: 1 }} className="col">
                        <div className="card">
                            <LazyLoadImage src={foley} alt="singer" className="img" />
                            <p>Foley artists</p>

                            <Button className="collaboration-item-btn" bg="#EB5C27" onClick={redirectMusicBuddies} size="lg" w="230px" color="#FCFCFC" style={{"marginTop":"30px" }} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} > Find Foley artists  </Button>
                        </div>
                    </Box>

                    <Box colSpan={{ base: "auto", md: 1 }} className="col">
                        <div className="card">
                            <LazyLoadImage src={tutor} alt="singer" className="img" />
                            <p>Tutor</p>

                            <Button className="collaboration-item-btn" bg="#EB5C27" onClick={redirectMusicBuddies} size="lg" w="230px" color="#FCFCFC" style={{"marginTop":"30px" }} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} > Find Tutor  </Button>
                        </div>
                    </Box>
                    
                    
                </Grid>

            </div>

            <section className="service-provider">
                    <h2>Join SONGCOSMOS to make your music life successful and find more clients</h2>

                    <Button bg="#EB5C27" onClick={redirectProfile} size="lg" color="#FCFCFC" style={{"marginTop":"30px" , 'width':"300px"}} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}> Join as services provider </Button>

                    <p>Join our all-in-one music platform today and become a music buddy. Collaborate with other members, provide services to the world around you, and find your next project partners in the industry. We're committed to helping independent artists and music professionals succeed, and our platform is designed to do just that.</p>

                    <h4>BENEFITS</h4>
                    <ul>
                        <li>Find new clients</li>
                        <li>Earn more money every month </li>
                        <li>Make new connections with other artists</li>
                        <li>Create amazing music</li>
                        <li>Distribute your music knowledge with earn money</li>
                    </ul>
            </section>

            <Footer/>
        </section>
    );
}