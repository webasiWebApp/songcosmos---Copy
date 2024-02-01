import React from "react";
import "../../css/home.css";

import { Link } from "react-router-dom";

import {Button} from '@chakra-ui/react';

import home_dec_1 from "../../image/home-dec-1.png";
import home_dec_2 from "../../image/home-dec-2.png";
import home_dec_3 from "../../image/home-dec-3.png";
import home_dec_4 from "../../image/home-dec-4.png";

import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function HomeAnime (){

    return(
        <div className="home-anime">

            <LazyLoadImage src={home_dec_1} alt="home dec 1" className="home-dec-1"/>
            <LazyLoadImage src={home_dec_2} alt="home dec 2" className="home-dec-2"/>
            <LazyLoadImage src={home_dec_3} alt="home dec 3" className="home-dec-3"/>
            <LazyLoadImage src={home_dec_3} alt="home dec 4" className="home-dec-4"/>

            <h1 id="home-text" >ALL IN ONE <br/> <span >MUSIC</span></h1>

            <p className="sub-title">Facilitating, and rewarding music creators worldwide, empowering success in the industry.</p>

            <Link to="/sign-in"  className="home-start-y-j"><Button bg="white"  color="#EB5C27"  _hover={{color: "white",bg: "#EB5C27",transition:"0.56s ease"}} size='lg'> Start your  Journey <i className="fa-solid fa-music"></i></Button> </Link> 
        </div>
    )

}