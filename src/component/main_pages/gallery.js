import React from "react";


import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

import placeholder from "../../image/placeholder.jpg"
import { LazyLoadImage } from 'react-lazy-load-image-component';



export default function Gallery() {

    const images = [
        { id: 1, src: 'https://source.unsplash.com/random/400x400', alt: 'Image 1' },
        { id: 2, src: 'https://source.unsplash.com/random/401x401', alt: 'Image 2' },
        { id: 3, src: 'https://source.unsplash.com/random/402x402', alt: 'Image 3' },
        { id: 4, src: 'https://source.unsplash.com/random/403x403', alt: 'Image 4' },
        { id: 5, src: 'https://source.unsplash.com/random/404x404', alt: 'Image 5' },
        { id: 6, src: 'https://source.unsplash.com/random/405x405', alt: 'Image 6' },
        { id: 7, src: 'https://source.unsplash.com/random/406x406', alt: 'Image 7' },
        { id: 8, src: 'https://source.unsplash.com/random/407x407', alt: 'Image 8' },
        { id: 9, src: 'https://source.unsplash.com/random/408x408', alt: 'Image 9' },
        { id: 10, src: 'https://source.unsplash.com/random/409x409', alt: 'Image 10' },
      ];


    return(

        <section className="gallery-page">

            <Navbar/>
                <div className="container">

                    <h1 className="title">A Visual Journey Through <br/> Our <span> Collection</span></h1>

                    <div className="gallery">
                        {images.map((image) => (
                            <LazyLoadImage key={image.id} src={image.src} alt={image.alt} placeholderSrc={placeholder} />
                        ))}
                    </div>
                </div>
            <Footer/>

        </section>

    )
}