import React , {useState}  from "react";
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

import { Button , useToast} from '@chakra-ui/react'
import axios from "axios";

export default function AddToCardBtn(prop){

    const toastATC = useToast()
    const [btnProcess, setBtnProcess] = useState(false);
    function insertCartToDB(itemType,itemId,title,price,licenseType,serviceType){
        console.log(itemType,itemId,title,price,licenseType,serviceType);

     //  console.log(licenseType)
        // get today's date
        const today = new Date();
        // format as SQL date string
        const sqlDate = today.toISOString().slice(0, 10);

        let insertObj = {
            itemType:itemType,
            itemId:itemId,
            userId:CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8),
            title:title,
            price:price,
            licenseType:licenseType,
            serviceType:serviceType,
            date:sqlDate,
            ATCFunction: "insertCartItem"
        }

        const formData = new FormData();
        formData.append('data', JSON.stringify(insertObj));

        setBtnProcess(true);
      
        axios.post('https://www.songcosmos.com/PHP/addToCart.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {

          setBtnProcess(false);
            
            if(response.data === "success"){
                toastATC({
                    title: `"${title}" successfuly added to cart`,
                    description: "Check out your cart to purchase all added items (Profile -> My cart)",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
            }else{
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
            setBtnProcess(false);
          });
        
      

    }


    return(
        <Button isLoading={btnProcess} variant='outline'  colorScheme='orange' onClick={()=>{insertCartToDB(prop.itemType,prop.itemId,prop.title,prop.price,prop.licenseType,prop.serviceType)}}>Add to cart</Button>
    )
}