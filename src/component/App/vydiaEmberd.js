import React from "react";

import "../../css/app_main.css"


import MemberRedirect from "../privatePageRedirect/memberRedirect";

import AppNavigation from "./app_header";


export default function VydyaSongcosmos(){

    // if(Cookies.get('memberId') !== "mem"){
    //     alert("You are not member in songcosmos \n For distribution you must get distribution membership or higher membership")
    //     window.location.href='/membership'
    // }

        // setTimeout(()=>{
        //     window.open('https://songcosmos.vyd.co', '_blank');
        //     window.location.href='/app/profile'
        // },2000);

    return(
        <div>
            {/* <MemberRedirect/> */}
            <AppNavigation/>
            <section className="vidyaSongcosmos-sec">
                <iframe  src="https://distribute.songcosmos.com" title="vydia"></iframe>
            </section>
        </div>
    )
}