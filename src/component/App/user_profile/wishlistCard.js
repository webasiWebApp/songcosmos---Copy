
import React from "react";
import { Box,Button, useToast } from '@chakra-ui/react';

import axios from "axios";

export default function WishlistCard(prop){
    const toastATC = useToast()

    
    const [tigger , setTigger] = React.useState();
    React.useEffect(() => {}, [tigger]);
    function deleteCartItem(id) {

        let serviceProviderFromData = {
            cartItemId:id,
            ATCFunction: "deleteATCRows",
          };
        
          const formData = new FormData();
          formData.append('data', JSON.stringify(serviceProviderFromData));
        
          axios.post('https://www.songcosmos.com/PHP/addToCart.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
    
                setTigger(response.data)

                if(response.data !== "success"){
                    toastATC({
                        title: `Something went wrong!`,
                        description: "Try again or contact us",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      })
                }
              
            })
            .catch(error => {
             // console.log(error);
            });
    }


    return(

        <Box w={{ base: '100%', md: '50%' }} className="col-6">

        <div className="wishlist-item">
            <img src={prop.atcImg} alt="license" />

            <div className="details">
                <h4 className="title"> {prop.title} </h4>
                <span className="date" >{prop.date}</span>
                <span style={{"marginLeft":"30px"}}>Ctg: <span>{prop.searviceType}</span> </span>

                <div className="button">
                    <Button bg="#EB5C27" size="sm" color="#FCFCFC" style={{"marginTop":"10px","marginRight":"30px"}} onClick={prop.purchBtnAction} > Purchese </Button>
                    <Button bg="red" size="sm" color="#FCFCFC" style={{"marginTop":"10px"}} onClick={()=>{deleteCartItem(prop.keyATC)}} > <i className="fa-regular fa-trash-can"></i> </Button>
                </div>
            </div>

            <div className="price">
                <h4 style={{textAlign:"Center",paddingRight:"30px"}}>LKR {prop.price}</h4>
            </div>
        </div>

    </Box>


    );
}