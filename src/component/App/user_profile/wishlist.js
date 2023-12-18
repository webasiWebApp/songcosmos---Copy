import React from "react";
import { Box, Flex ,Button , Text ,Spinner } from '@chakra-ui/react';
import axios from "axios";
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import "../../../css/profile.css";

import WishlistCard from "./wishlistCard";

import license from "../../../image/license.webp";

import serviceIMG1 from "../../../image/singer.webp";
import serviceIMG3 from "../../../image/lyrist.webp";
import serviceIMG2 from "../../../image/composer.webp";
import serviceIMG4 from "../../../image/Mixing-Engineer.webp";
import serviceIMG5 from "../../../image/Mastering-Engineer.webp";
import serviceIMG6 from "../../../image/producer.webp";
import serviceIMG7 from "../../../image/publishing.webp";
import serviceIMG8 from "../../../image/distribution.webp";
import serviceIMG9 from "../../../image/session-artist.webp";
import serviceIMG10 from "../../../image/foley.webp";








export default function Tab2(){

    const [rows, setRowData] = React.useState([]);
    const [price, setPrice] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {


    
    
      let serviceProviderFromData = {
        userId:CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8),
        ATCFunction: "getAllATCRows",
      };
    
      const formData = new FormData();
      formData.append('data', JSON.stringify(serviceProviderFromData));
    
      axios.post('https://www.songcosmos.com/PHP/addToCart.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {

        //  console.log(response.data);
          
          if(response.data.message !== "No rows found"){
            //console.log(response.data);
            setRowData(response.data);
          }

          setLoading(false);
          let totalPrice=0
          rows.map((item)=>{
            totalPrice +=parseInt(item.price);
          })

          setPrice(totalPrice)
          
        })
        .catch(error => {
         // console.log(error);
        });

    
    }, []);

    if (loading) {
      return (
        <div>
          <Spinner color='red.500' />
        </div>
      );
    }


    function sendDataToBuy(ctgLicnObjArr,keyLI){
      //<Link style={{marginLeft:"15px"}} to={`/app/checkout?id=${prop.keyLI}&type=license&isCart=no&lType=${JSON.stringify(ctgLicnObjArr)}&mem=none`} target="_blank" >  

      const key = process.env.REACT_APP_LICENSE_ID;
      const encrypted = CryptoJS.AES.encrypt(ctgLicnObjArr, key).toString();

     // if(showPrice > 0){
          window.open(`/app/checkout?id=${keyLI}&type=license&isCart=no&lType=${encrypted}&mem=none`, '_blank');
      //}else{
         // alert("Please select License type")
      //}
    }

    function buyAllItem(){

      let allBuyArrObj = [];
      let licenseIdBuyArrObj = [];

      rows.map((item)=>{
        allBuyArrObj.push(JSON.parse(item.licenseType));
        licenseIdBuyArrObj.push(item.itemId);
      })

    // console.log(allBuyArrObj);

      const key = process.env.REACT_APP_LICENSE_ID;
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(allBuyArrObj), key).toString();
      const encryptedLicenseBuy = CryptoJS.AES.encrypt(JSON.stringify(licenseIdBuyArrObj), key).toString();
      window.open(`/app/checkout?id=${encryptedLicenseBuy}&type=license&isCart=yes&lType=${encrypted}&mem=none`, '_blank');

      
    }

    return(

        <div>
        <section className="wishlist">
             <h1 className="title"> Wishlist </h1>

             
            <Flex flexDir={{ base: 'column', md: 'row' }} marginTop="50px" className="row" flexWrap="wrap">


                {rows.length <= 0 ? (
                                <Text color="#FCFCFC">Cart Empty</Text>
                                ) : (
                                rows.map((item) => {
                                    return (
                                    <WishlistCard
                                        atcImg={item.itemType === "service" ? item.serviceType === "Singer" ? serviceIMG1:  item.serviceType === "Lyrists" ? serviceIMG2: item.serviceType === "Composers" ? serviceIMG3 :item.serviceType === "Mixing Engineers" ? serviceIMG4:item.serviceType === "Mastering Engineers" ? serviceIMG5:item.serviceType === "Producers" ? serviceIMG6:item.serviceType === "Publishers" ?serviceIMG7:item.serviceType === "Music Distributors" ?serviceIMG8: item.serviceType === "Session artists" ? serviceIMG9 :item.serviceType === "Foley artists" ? serviceIMG10:license:license}

                                        title={item.title}
                                        date={item.date}
                                        searviceType={item.itemType}
                                        itemType={item.itemId}
                                        price={item.price}
                                        keyATC = {item.cartItemId}
                                        purchBtnAction={()=>{sendDataToBuy(item.licenseType,item.itemId)}}
                                    />
                                    );
                                })
                            )}
            
                <Box w={{ base: '100%', md: '50%' }} className="col-6">

                </Box>
            </Flex>

            
            <div className="total-price">
                <h3>Order Summery</h3> 
                <h4>Total Price: <span>{price}</span></h4>

                <Button className="btn" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} onClick={buyAllItem} bg="#EB5C27" color="#FCFCFC" style={{"marginTop":"10px","marginRight":"30px"}} > Purchese All Now {`(${rows.length})`} </Button>
            </div>
            
        </section>

            
        </div>
    )
}

