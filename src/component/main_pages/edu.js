
import React from "react";
import "../../css/main_pages.css";

import { Link} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

import {Button } from '@chakra-ui/react';
//import { Grid,Box , Image} from "@chakra-ui/react";






export default function Education(){
    return(
        <section className="education-page">
            <Navbar/>

            <div className="education-page-land">
                <h1>In Tune with  <span>EDU DE MUSIC</span> <br/> Music for Lifelong Learning </h1>

                <p> Unlock your potential as an educator by offering courses to students and music professionals worldwide. Stand out with our promotional tools and receive the support you need to thrive. </p>

              <Link to="https://songcosmos.pearlbayinstitute.com/" target="_blank" ><Button className="button" bg="#EB5C27" size="lg" color="#FCFCFC" style={{"marginTop":"30px",'width':"150px"}} > Learn Now <i className="fa-solid fa-arrow-up-right-from-square"></i> </Button></Link>
            </div>

            
            <Footer/>
        </section>
    );
}