
import React from "react";
import { Box, Flex ,Button , Text ,Spinner } from '@chakra-ui/react';





export default function OrderHistoryCard(prop){


    return(<Box w={{ base: '100%', md: '50%' }} className="col-6">

    <div className="wishlist-item">
        <img src={prop.atcImg} alt="license" />

        <div className="details">
            <h4 className="title"> {prop.title} </h4>
            <span className="date" >{prop.date}</span>
            <span style={{"marginLeft":"30px"}}>Ctg: <span>{prop.searviceType}</span> </span>

        </div>

        <div className="price">
            <h4 style={{textAlign:"Center",paddingRight:"30px"}}>LKR {prop.price}</h4>
        </div>
    </div>

</Box>)
}

