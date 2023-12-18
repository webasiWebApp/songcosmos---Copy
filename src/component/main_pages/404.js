import React from "react";

import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

import { Image} from '@chakra-ui/react'

import notFoundImg from "../../image/404.png";

export default function NotFound(){


    return(
        <section className="not-found-page">
            <Navbar/>

                <div className="container">

                    <h1>Page not found <br/> <span>Error 404</span></h1>

                    <Image src={notFoundImg} alt="not found image" className="not-found-img"/>
                </div>

            <Footer/>
        </section>
    )
}