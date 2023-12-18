import React from "react";

import "../../css/app_main.css"


import AppNavigation from "./app_header";
import MemberRedirect from "../privatePageRedirect/memberRedirect";

export default function ImroSongcosmos(){

    // if(Cookies.get('memberId') !== "mem"){
    //     alert("You are not member in songcosmos \n For publishing you must get publishing membership or higher membership")
    //     window.location.href='/membership'
    // }

    setTimeout(()=>{
        window.open('https://members.imro.ie/', '_blank');
        window.location.href='/app/profile'
    },2000);

    return(
        <div>
            <MemberRedirect/>
            <AppNavigation/>
            <section className="vidyaSongcosmos-sec">
                <iframe src="https://members.imro.ie/" title="imro"></iframe>
            </section>
        </div>
    )
}