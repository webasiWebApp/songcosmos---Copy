import React from "react";


import "../../css/app_main.css";




export default function MemberIcon(prop){

    const [icon,setIcon] = React.useState("fa-gem");
    const [memName,setMemName] = React.useState("Classic");
    const [colors,setColors] = React.useState("808080");
    const [width,setwidth] = React.useState("160");

    React.useEffect(()=>{
        
        if(prop.type === "MclaD"){
            setIcon('fa-rocket');
            setMemName("Classic (Dis)");
            setColors("85c4ff");
            setwidth("120");
        } else if(prop.type === "MclaP"){
            setIcon('fa-rocket');
            setMemName("Classic (Pub)");
            setColors("85c4ff");
            setwidth("100");
        } else if(prop.type === "Mbro"){
            setIcon('fa-award');
            setMemName("Bronze");
            setColors("ff8f20");
            setwidth("100");
        } else if(prop.type === "Msil"){
            setIcon('fa-medal');
            setMemName("Silver");
            setColors("f3f3f3");
            setwidth("100");
        } else if(prop.type === "Mgold"){
            setIcon('fa-trophy');
            setMemName("Gold");
            setColors("FFD700");
            setwidth("100");
        } else if(prop.type === "Mpla"){
            setIcon('fa-gem');
            setMemName("Platinum");
            setColors("02fcb1");
            setwidth("100");
        }

    },[prop.type]);

    return(
        <div className="memberBadge" style={{backgroundColor:`#${colors}8e`,border:`2px solid #${colors}`,width:`${width}px`}}>
            <i className={`fa-solid ${icon}`} style={{color:`#${colors}`}} ></i>
            <p style={{color:`#${colors}`}}>{memName}</p>
        </div>
    );

}