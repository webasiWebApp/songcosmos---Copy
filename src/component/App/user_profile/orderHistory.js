import React from "react";
import { Box, Flex ,Button , Text ,Spinner } from '@chakra-ui/react';
import axios from "axios";
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import "../../../css/profile.css";

import OrderHistoryCard from "./orderHistoryCard";

import license from "../../../image/license.webp";










export default function Tab4(){

    const [rows, setRowData] = React.useState([]);
    const [price, setPrice] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {


    
    
      let serviceProviderFromData = {
        userId:CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8),
        PFunction: "getAllpaymentRows",
      };
    
      const formData = new FormData();
      formData.append('data', JSON.stringify(serviceProviderFromData));
    
      axios.post('https://www.songcosmos.com/PHP/profile.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {

          console.log(response.data);
          
          if(response.data.message !== "No rows found"){
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





    return(

        <div>
        <section className="wishlist">
             <h1 className="title"> Order History </h1>

             
            <Flex flexDir={{ base: 'column', md: 'row' }} marginTop="50px" className="row" flexWrap="wrap">


                {rows.length <= 0 ? (
                                <Text color="#FCFCFC">No order History</Text>
                                ) : (
                                rows.map((item) => {
                                    return (
                                    <OrderHistoryCard
                                        atcImg={license}

                                        title={JSON.parse(item.detail)["licenseDetails"][0]["lTitle"]}
                                        date={item.date}
                                        searviceType={"license"}
                                        itemType={"item.itemId"}
                                        price={item.price}
                                        keyATC = {item.payId}
                                    />
                                    );
                                })
                            )}
            
                <Box w={{ base: '100%', md: '50%' }} className="col-6">

                </Box>
            </Flex>

            

            
        </section>

            
        </div>
    )
}

// {"licenseTypes":[{"ctgName":"Live (Indoor - BMICH\/Nelum Pokuna)","lType":[false,false,true,false],"prices":[0,0,2500,0]}],"licenseDetails":[{"lId":"license6446e3ebe5c9f","lTitle":"AAJ MERA DIL","lAuthor":"SARATH DASANAYAKE","lComposer":"RAVILAL WIMALADHARMA","lCover":null}]}