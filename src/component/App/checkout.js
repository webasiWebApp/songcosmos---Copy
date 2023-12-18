import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import axios from "axios";
import { Box,Input,UnorderedList,ListItem,Flex ,Image,Button ,Text,useToast,RadioGroup,Stack,Radio,useDisclosure, Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton} from '@chakra-ui/react';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';


import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";
  
// strip payment
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "../../css/stripPay.css";



import sampathLogo from "../../image/Sampath.jpg";
import CheckoutItemCard from './checkoutItemCard';
import { sendEmail } from './sendEmail';

import {PayPalButtons } from "@paypal/react-paypal-js";

let file_cover_img =null;




export default function CheckoutWrap(){

    const stripePromise = loadStripe(process.env.REACT_APP_STRIP_PAY_API_KEY);
    const [clientSecret, setClientSecret] = React.useState("");
    const location = useLocation();
    const [memberShipDisc, setMemberShipDisc] = React.useState(0);
    const [totalPriceWithoutdisc, seTotalPriceWithoutdisc] = React.useState(0);
    const [serviceChange, setServiceChange] = React.useState(0);
    const [finalPrice, setFinalPrice] = React.useState(0);
    


    const appearance = {
        theme: 'stripe',
    };
     const options = {
        clientSecret,
        appearance,
    };


    React.useEffect(()=>{

        const searchParams = new URLSearchParams(location.search);
        
        const itemType = searchParams.get('type');
        const key = process.env.REACT_APP_LICENSE_ID;
        const itemMemType = searchParams.get('mem');
        const itemIsCart = searchParams.get('isCart');
        let itemId = searchParams.get('id');

        let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)



        let totalPrice = 0;




        if(itemType === "license"){

            axios.get('https://api.exchangerate-api.com/v4/latest/LKR').then(response => {

                let rate =response.data.rates["USD"];
                let itemLType = searchParams.get('lType');
                itemLType = JSON.parse(CryptoJS.AES.decrypt(itemLType.replace(/ /g, '+'), key).toString(CryptoJS.enc.Utf8));

                if(itemIsCart === "yes"){
        
                    //console.log(itemId);
                    //setitemLType(itemLType);

                    itemLType.map((item)=>{
                        item.map((item2)=>{
                            item2["prices"].map((itemP)=>{
                                totalPrice+=itemP
                            })
                        })
                    })

                 
                    seTotalPriceWithoutdisc(totalPrice);

                    let discount=0;

                    let whatMember = isMember;
                    if(whatMember === "MclaD"){
                        discount=(totalPrice*10)/100
                    } else if(whatMember === "MclaP"){
                        discount=(totalPrice*10)/100
                    }else if(whatMember === "Mbro"){
                        discount=(totalPrice*20)/100
                    }else if(whatMember === "Msil"){
                        discount=(totalPrice*30)/100
                    }else if(whatMember === "Mgold"){
                        discount=(totalPrice*40)/100
                    }else if(whatMember === "Mpla"){
                        discount=(totalPrice*50)/100
                    }
        
                        totalPrice = totalPrice + ((totalPrice*10)/100);
                        totalPrice = totalPrice -discount;
                        createPaymentIndent(totalPrice*rate);
        
                }else{


                    let discount=0;

                    itemLType.map((item)=>{
                        item["prices"].map((itemP)=>{
                            totalPrice+=itemP
                        })
                    })

                    let whatMember = isMember;
                    if(whatMember === "MclaD"){
                        discount=(totalPrice*10)/100
                    } else if(whatMember === "MclaP"){
                        discount=(totalPrice*10)/100
                    }else if(whatMember === "Mbro"){
                        discount=(totalPrice*20)/100
                    }else if(whatMember === "Msil"){
                        discount=(totalPrice*30)/100
                    }else if(whatMember === "Mgold"){
                        discount=(totalPrice*40)/100
                    }else if(whatMember === "Mpla"){
                        discount=(totalPrice*50)/100;
        
                    }

                    
                        totalPrice =totalPrice + totalPrice*(10/100);
                        totalPrice = totalPrice -discount;

                        createPaymentIndent(totalPrice*rate);
                }
           
            })


        }else if(itemType === "membership"){

            if(itemMemType === "MclaD"){
                totalPrice = 30;
            } else if(itemMemType === "MclaP"){
                totalPrice = 30;
            }else if(itemMemType === "Mbro"){
                totalPrice = 30;
            }else if(itemMemType === "Msil"){
                totalPrice = 30;
            }else if(itemMemType === "Mgold"){
                totalPrice = 50;
            }else if(itemMemType === "Mpla"){
                totalPrice = 100;
            }   


            createPaymentIndent(totalPrice)
            
        }


    },[1])

    function createPaymentIndent(totalPrice){

        // Create PaymentIntent as soon as the page loads
        fetch("https://www.songcosmos.com/PHP/stripPay/createPaymentIntent.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prc:Math.round(totalPrice)}),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }


    return (
        <div className="App">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <Checkout/>
            </Elements>
          )}
        </div>
      );


}




export  function Checkout() {

    const toastCheckout = useToast()
    const [loading, setLoading] = React.useState(true);
    const [totalPriceWithoutdisc, seTotalPriceWithoutdisc] = React.useState(0);
    const [memberShipDisc, setMemberShipDisc] = React.useState(0);
    const [serviceChange, setServiceChange] = React.useState(0);
    const [finalPrice, setFinalPrice] = React.useState(0);
    const [refreshPrices, setrefreshPrices] = React.useState(0);
    const [membershipName , setmembershipName] = React.useState("");
    const [membershipDiscrip , setmembershipDiscrip] = React.useState("");
    const [spServiceName , setspServiceName] = React.useState("");
    const [spUserName , setspUserName] = React.useState("");
    const [memberType , setmemberType] = React.useState("");

    const [FromCartRow , setFromCartRow] = React.useState([]);
    const [notFromCartRow , setNotFromCartRow] = React.useState([]);
    const [itemType , setitemType] = React.useState([]);
    const [itemLType , setitemLType] = React.useState([]);
    const [isFromcart , setisFromcart] = React.useState("no");
    const location = useLocation();
    

    const [btnProcess, setBtnProcess] = React.useState(false);
    const [btnDisable, setBtnDisable] = React.useState(true);
    const [exchangeRate, setexchangeRate] = React.useState(0.00);
    const [orderDetails, setorderDetails] = React.useState("");
    const [paymentMethod,SetPaymentMethod] = React.useState("bankDepo");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
    const toastProfile = useToast()


    // Strip payment gateway code
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);



    React.useEffect(() => {
        if (!stripe) {
          return;
        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
          "payment_intent_client_secret"
        );
    
        if (!clientSecret) {
          return;
        }
    

      }, [stripe]);


      const handleSubmitStripPay = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js hasn't yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        setIsLoading(true);
    
        const { error ,paymentIntent} = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            receipt_email: "sniper2002praveen@gmail.com",
          },
          redirect: 'if_required' 
        });

        //console.log(paymentIntent)

        if(paymentIntent){
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    stripDataSubmit(paymentIntent);

                    toastCheckout({
                        title: 'Payment succeeded!',
                        description: "This tab will close after 10 seconds",
                        status: 'success',
                        duration: 14000,
                        isClosable: true,
                    })

                  setTimeout(()=>{
                    window.close();
                  },10000)

                break;
                case "processing":
                    setMessage("Your payment is processing.");

                    toastCheckout({
                        title: 'Your payment is processing.',
                        status: 'info',
                        duration: 14000,
                        isClosable: true,
                    })

                break;

                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    toastCheckout({
                        title: 'Your payment was not successful, please try again.',
                        status: 'error',
                        duration: 14000,
                        isClosable: true,
                    })
                    break;

                default:
                    setMessage("Something went wrong.");
                    toastCheckout({
                        title: 'Something went wrong.',
                        status: 'error',
                        duration: 14000,
                        isClosable: true,
                    })
                break;

            }
              
        }
    
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        
        if (error !== undefined && error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
    
        setIsLoading(false);
      };
    
      const paymentElementOptions = {
        layout: "tabs"
      }



// ---------------------------------------------------------------





    React.useEffect(()=>{

        const searchParams = new URLSearchParams(location.search);
        let itemId = searchParams.get('id');
        const itemType = searchParams.get('type');
        const itemIsCart = searchParams.get('isCart');
        let itemLType = searchParams.get('lType');
        const itemMemType = searchParams.get('mem');
        let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)
        setitemType(itemType);
       
        setisFromcart(itemIsCart);
     

        if(itemType === "license"){


            if(itemIsCart === "yes"){

                const key = process.env.REACT_APP_LICENSE_ID;
                itemLType = JSON.parse(CryptoJS.AES.decrypt(itemLType.replace(/ /g, '+'), key).toString(CryptoJS.enc.Utf8));
                itemId = JSON.parse(CryptoJS.AES.decrypt(itemId.replace(/ /g, '+'), key).toString(CryptoJS.enc.Utf8));

                
                setitemLType(itemLType);

                let totalPrice = 0;
                itemLType.map((item)=>{

                    item.map((item2)=>{

                        item2["prices"].map((itemP)=>{
                            totalPrice+=itemP
                        })

                    })
                   
                })
                seTotalPriceWithoutdisc(totalPrice);



                let licenseData = {
                    checkFunction: "getLicenceItemAll",
                    lIds:itemId
                };
                
                const formData = new FormData();
                formData.append('data', JSON.stringify(licenseData));
    
    
                axios.post('https://www.songcosmos.com/PHP/checkout.php', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    
                       // console.log(response.data);    
                       setFromCartRow(response.data);
                       setLoading(false);
                    })
                    .catch(error => {

                    });
    
                    let isMember  =CryptoJS.AES.decrypt(Cookies.get('mToken') , "jKd#MID#5z$7&m&&i&&dNp").toString(CryptoJS.enc.Utf8)

                    let whatMember = isMember;
                    if(whatMember === "MclaD"){
                        setMemberShipDisc(((totalPriceWithoutdisc*10)/100))
                    } else if(whatMember === "MclaP"){
                        setMemberShipDisc(((totalPriceWithoutdisc*10)/100))
                    }else if(whatMember === "Mbro"){
                        setMemberShipDisc(((totalPriceWithoutdisc*20)/100))
                    }else if(whatMember === "Msil"){
                        setMemberShipDisc(((totalPriceWithoutdisc*30)/100))
                    }else if(whatMember === "Mgold"){
                        setMemberShipDisc(((totalPriceWithoutdisc*40)/100))
                    }else if(whatMember === "Mpla"){
                        setMemberShipDisc(((totalPriceWithoutdisc*50)/100))
                    }

                    setServiceChange(((totalPriceWithoutdisc)*10)/100);
                    setFinalPrice((totalPriceWithoutdisc+serviceChange)- memberShipDisc)

                    
                    setTimeout(() => {
                        setrefreshPrices(1)
                    }, 1000);


            }else{


            const key = process.env.REACT_APP_LICENSE_ID;
            itemLType = JSON.parse(CryptoJS.AES.decrypt(itemLType.replace(/ /g, '+'), key).toString(CryptoJS.enc.Utf8));
            console.log(itemLType);
            setitemLType(itemLType)
            let totalPrice = 0
            itemLType.map((item)=>{
                item["prices"].map((itemP)=>{
                    totalPrice+=itemP
                })
            })
    
            seTotalPriceWithoutdisc(totalPrice)


            let licenseData = {
                checkFunction: "getLicenceItem",
                id:itemId
            };
            
            const formData = new FormData();
            formData.append('data', JSON.stringify(licenseData));


            axios.post('https://www.songcosmos.com/PHP/checkout.php', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
    
                  //  console.log(response.data);
                    setNotFromCartRow(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    toastCheckout({
                        title: 'Something went wrong!',
                        description: "Error 404",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                });


                let whatMember = isMember
                if(whatMember === "MclaD"){
                    setMemberShipDisc(((totalPriceWithoutdisc*10)/100))
                } else if(whatMember === "MclaP"){
                    setMemberShipDisc(((totalPriceWithoutdisc*10)/100))
                }else if(whatMember === "Mbro"){
                    setMemberShipDisc(((totalPriceWithoutdisc*20)/100))
                }else if(whatMember === "Msil"){
                    setMemberShipDisc(((totalPriceWithoutdisc*30)/100))
                }else if(whatMember === "Mgold"){
                    setMemberShipDisc(((totalPriceWithoutdisc*40)/100))
                }else if(whatMember === "Mpla"){
                    setMemberShipDisc(((totalPriceWithoutdisc*50)/100))
                }

                setServiceChange(((totalPriceWithoutdisc)*10)/100);
                setFinalPrice((totalPriceWithoutdisc+serviceChange)- memberShipDisc)


                setTimeout(() => {
                    setrefreshPrices(1)
                }, 1000);

            }

        }else if(itemType === "membership"){

            setmemberType(itemMemType)

            if(itemMemType === "MclaD"){
                setmembershipName("Classic (Distribution)")
                setmembershipDiscrip(`IPI Registration/
                Song Registration/
                25% Music Distribution Commission/
                25% Music Publishing Commission/
                2.5% Pearlbay Store Discount/
                5% Production Discount/
                5% Pearlbay Studio Recording Discount/
                5% Discount on Mix and Mastering/
                10% Discount on Licencing Pearlbay Publishing Catalogue


                
                `)
                seTotalPriceWithoutdisc(6000)
                setFinalPrice(6000)
            } else if(itemMemType === "MclaP"){
                setmembershipName("Classic (Publishing)")
                seTotalPriceWithoutdisc(6000)
                setFinalPrice(6000)
                setmembershipDiscrip(`IPI Registration/
                Song Registration/
                25% Music Distribution Commission/
                25% Music Publishing Commission/
                2.5% Pearlbay Store Discount/
                5% Production Discount/
                5% Pearlbay Studio Recording Discount/
                5% Discount on Mix and Mastering/
                5% Production Discount/
                10% Discount on Licencing Pearlbay Publishing Catalogue
                
                `)
            }else if(itemMemType === "Mbro"){
                seTotalPriceWithoutdisc(12000)
                setFinalPrice(12000)
                setmembershipName("Bronze")
                setmembershipDiscrip(`IPI Registration/
                Song Registration/
                20% Music Distribution Commission/
                20% Music Publishing Commission/
                3.5% Pearlbay Store Discount/
                7.5% Production Discount/
                20% Discount on Licencing Pearlbay Publishing Catalogue

                `)
            }else if(itemMemType === "Msil"){
                seTotalPriceWithoutdisc(30)
                setFinalPrice(30)
                setmembershipName("Silver")
                setmembershipDiscrip(`IPI Registration/
                Song Registration/
                15% Music Distribution Commission/
                15% Music Publishing Commission/
                4.5% Pearlbay Store Discount/
                10% Production Discount/
                30% Discount on Licencing Pearlbay Publishing Catalogue
                
                `)
            }else if(itemMemType === "Mgold"){
                seTotalPriceWithoutdisc(50)
                setFinalPrice(50)
                setmembershipName("Gold")
                setmembershipDiscrip(`IPI Registration/
                Song Registration/
                10% Music Distribution Commission/
                10% Music Publishing Commission/
                5.5% Pearlbay Store Discount/
                12.5% Production Discount/
                40% Discount on Licencing Pearlbay Publishing Catalogue
                
                `)
            }else if(itemMemType === "Mpla"){
                seTotalPriceWithoutdisc(100)
                setFinalPrice(100)
                setmembershipName("Platinum")
                setmembershipDiscrip(`IPI Registration/
                Song Registration/
                5% Music Distribution Commission/
                10% Music Publishing Commission/
                8% Pearlbay Store Discount/
                15% Production Discount/
                50% Discount on Licencing Pearlbay Publishing Catalogue
                
                `)
            }

            setLoading(false);

            
        } else if(itemType === "sProvider"){

            const itemuserName = searchParams.get('userName');
            const itemSname = searchParams.get('sName');
            let itemsPrice = searchParams.get('sPkey');

            setspServiceName(itemSname)
            setspUserName(itemuserName)

            const key = process.env.REACT_APP_LICENSE_ID;
            itemsPrice = JSON.parse(CryptoJS.AES.decrypt(itemsPrice.replace(/ /g, '+'), key).toString(CryptoJS.enc.Utf8));
            seTotalPriceWithoutdisc(itemsPrice)
            setFinalPrice(itemsPrice)
            setLoading(false);

        }

     },[location.search, memberShipDisc, refreshPrices, serviceChange, toastCheckout, totalPriceWithoutdisc]);


     

    if (loading) {
        return (
            <section className='checkout-sec'>
            <Navbar/>

            <div className='container'>

                <h1 className='title'>Checkout</h1>


                <Flex flexDirection={{ base: 'column', md: 'row' }} marginTop="10px" >
                    <Box w={{ base: '100%', md: '70%' }}  padding={"20px"}>
                        <h2 className='sub-title'>Items</h2>

                      
                    </Box>
                    <Box w={{ base: '100%', md: '30%' }}>
                        <h2 className='sub-title'>Summary</h2>

                        <Box backgroundColor="#1A202C" width="100%" minHeight="300px" borderRadius="10px" padding={"20px"}> 
                            <Button bg="#EB5C27" color={"#FCFCFC"} w="100%" isLoading loadingText='Loading'> Proceed now </Button>
                        </Box>
                    </Box>
                </Flex>
            </div>

            <Footer/>
        </section>

        )
    }


    function Proceed(){

        if (itemType === "license"){

            if(isFromcart === "no"){
                setorderDetails(notFromCartRow[0]["lTitle"])
            }else{
                setorderDetails("Licenses from songcosmos")
            }
            
        } else if (itemType === "membership" ){
            setorderDetails(`${membershipName} membership of songcosmos`)
        }

        if(paymentMethod === "bankDepo"){
            onOpen();
        }else if(paymentMethod === "payPal"){
            

            axios.get('https://api.exchangerate-api.com/v4/latest/LKR').then(response => {

                    setexchangeRate(response.data.rates["USD"]);
                    onOpen2();
                })
                .catch(error => {
                    toastCheckout({
                        title: 'Something went wrong!',
                        description: "Error 404",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                });
        }else if(paymentMethod === "visaAndOther"){

            onOpen3();

            

        }
    }

    function bankDepoSubmit(e){
        e.preventDefault();

        if(itemType === "membership"){
            sendBankDepotoSubmit("pending","bankDepo","membership",{memberType:memberType},"We are checking your payment receipt. After a successful transaction, you will get the membership of songcosmos.");
        }

        if(itemType === "license"){

            if(isFromcart === "yes"){

                // eslint-disable-next-line no-unused-expressions
                sendBankDepotoSubmit("pending","bankDepo","license",{licenseTypes:itemLType,licenseDetails:FromCartRow},`We are checking your payment receipt. After a successful transaction, the license for the song(<b>${FromCartRow.map((item)=>{item["lTitle"]})}/</b>) will be set up and the license will be sent to you via email.`);
                
            }else{

                sendBankDepotoSubmit("pending","bankDepo","license",{licenseTypes:itemLType,licenseDetails:notFromCartRow},`We are checking your payment receipt. After a successful transaction, the license for the song(<b>${notFromCartRow[0]["lTitle"]}</b>) will be set up and the license will be sent to you via email.`);

            }

        }
        
    }


    function paypalDataSubmit(details){

        if(itemType === "membership"){
            sendDatatoSubmitPaypal("complete","paypal","membership",{memberType:memberType},`${details.purchase_units[0]["amount"]["currency_code"]} ${details.purchase_units[0]["amount"]["value"]}`,details.id);
        }
        

        if(itemType === "license"){

            if(isFromcart === "yes"){
                sendDatatoSubmitPaypal("complete","paypal","license",{licenseTypes:itemLType,licenseDetails:FromCartRow},`${details.purchase_units[0]["amount"]["currency_code"]} ${details.purchase_units[0]["amount"]["value"]}`,details.id);
            }else{
                sendDatatoSubmitPaypal("complete","paypal","license",{licenseTypes:itemLType,licenseDetails:notFromCartRow},`${details.purchase_units[0]["amount"]["currency_code"]} ${details.purchase_units[0]["amount"]["value"]}`,details.id);
            }

            
        }
    }


    function stripDataSubmit(details){

        if(itemType === "membership"){
            sendDatatoSubmitStripe("complete","stripe","membership",{memberType:memberType},` ${details.currency
            } ${details.amount}`,details.id);
        }
        

        if(itemType === "license"){

            if(isFromcart === "yes"){
                sendDatatoSubmitStripe("complete","stripe","license",{licenseTypes:itemLType,licenseDetails:FromCartRow},`${details.currency} ${details.amount}`,details.id);
            }else{
                sendDatatoSubmitStripe("complete","stripe","license",{licenseTypes:itemLType,licenseDetails:notFromCartRow},`${details.currency} ${details.amount}`,details.id);
            }

            
        }
    }


    function sendDatatoSubmitStripe(status,method,type,detail,price,stripeId){
        setBtnProcess(true);
       


        let checkOutData = {
            checkFunction: "submitPaymentStripe",
            userId:CryptoJS.AES.decrypt(Cookies.get('Id'), process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8),
            price:price,
            status:status,
            method:method,
            type:type,
            detail:detail,
            stripeId:stripeId
          };
        
          const formData = new FormData();
          formData.append('data', JSON.stringify(checkOutData));
        
          axios.post('https://www.songcosmos.com/PHP/checkout.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            alert('Payment succeeded!');
                if(response.data.includes("success")){
                    toastProfile({
                        title: 'Thank you , All done',
                        description: "For more details check your email",
                        status: 'success',
                        duration: 14000,
                        isClosable: true,
                      })

                      onClose2();

                }

            })
            .catch(error => {
                toastProfile({
                    title: 'Something went wrong!',
                    description: "",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            });
    }




    function sendDatatoSubmitPaypal(status,method,type,detail,price,paypalId){
        setBtnProcess(true);
       


        let checkOutData = {
            checkFunction: "submitPaymentPaypal",
            userId:CryptoJS.AES.decrypt(Cookies.get('Id'), process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8),
            price:price,
            status:status,
            method:method,
            type:type,
            detail:detail,
            paypalId:paypalId
          };
        
          const formData = new FormData();
          formData.append('data', JSON.stringify(checkOutData));
        
          axios.post('https://www.songcosmos.com/PHP/checkout.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {


          
                if(response.data.includes("success")){
                    toastProfile({
                        title: 'Thank you , All done',
                        description: "For more details check your email",
                        status: 'success',
                        duration: 14000,
                        isClosable: true,
                      })

                      onClose2();

                    toastCheckout({
                        title: 'Payment succeeded!',
                        description: "This tab will close after 10 seconds",
                        status: 'success',
                        duration: 14000,
                        isClosable: true,
                    })

                    setTimeout(()=>{
                        window.close();
                    },10000)
                }

            })
            .catch(error => {


                toastProfile({
                    title: 'Something went wrong!',
                    description: "",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            });
    }




    
    function sendBankDepotoSubmit(status,method,type,detail,emailMsg){
        setBtnProcess(true);
       


        let checkOutData = {
            checkFunction: "sendBankDepotoSubmit",
            userId:CryptoJS.AES.decrypt(Cookies.get('Id'), process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8),
            price:finalPrice,
            status:status,
            method:method,
            type:type,
            detail:detail
          };
        
          const formData = new FormData();
          formData.append('image', file_cover_img);
          formData.append('data', JSON.stringify(checkOutData));
        
          axios.post('https://www.songcosmos.com/PHP/checkout.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {


          
                if(response.data.includes("success")){
                    toastProfile({
                        title: 'Upload success',
                        description: "The transaction is checking , For more details check your email",
                        status: 'success',
                        duration: 14000,
                        isClosable: true,
                      })

                      sendEmail("The transaction is checking" , emailMsg);
                      onClose();
                      setBtnProcess(false)

                    toastCheckout({
                        title: 'Payment succeeded!',
                        description: "This tab will close after 10 seconds",
                        status: 'success',
                        duration: 14000,
                        isClosable: true,
                    })

                    setTimeout(()=>{
                        window.close();
                    },10000)
                }else{
                    toastProfile({
                        title: 'Something went wrong!',
                        description: "",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      })
                    setBtnProcess(false)
                }

            })
            .catch(error => {
                setBtnProcess(false)
                toastProfile({
                    title: 'Something went wrong!',
                    description: "",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            });
    }






    function previewImage() {

        

        const fileInput = document.getElementById('cover-image-input');
        const previewImageElement = document.getElementById('cover-img');
         file_cover_img = fileInput.files[0];
         //console.log(fileInput)

        if((file_cover_img["type"] === "image/png" || file_cover_img["type"] === "image/jpeg") && (file_cover_img["size"] < 1572864)){
            const reader = new FileReader();
            reader.onload = function(event) {
            previewImageElement.src = event.target.result;
            previewImageElement.style.display = 'block';
            };
          
            reader.readAsDataURL(file_cover_img);

        }else{
            toastProfile({
                title: 'Something went wrong!',
                description: "You can upload PNG or JPG image and image size less than 1 mb image  only",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }

        if(file_cover_img){
            setBtnDisable(false)
        }else{
            setBtnDisable(true);
        }

    }

    function uploadCover(){
        document.getElementById("cover-image-input").click();

    }

    return(

        <section className='checkout-sec'>
            <Navbar/>

            <div className='container'>

                <h1 className='title'>Checkout</h1>


                <Flex flexDirection={{ base: 'column', md: 'row' }} marginTop="10px" >
                    <Box w={{ base: '100%', md: '70%' }}  padding={"20px"}>
                        <h2 className='sub-title'>Items</h2>

                        {isFromcart === "no" ? <CheckoutItemCard itemType={itemType} licenseData={itemLType} itemData={notFromCartRow[0]} prices={totalPriceWithoutdisc} memName={membershipName} memDiscrip={membershipDiscrip} spName={spServiceName} userName={spUserName} /> : FromCartRow.map((item,index)=>{

                            return(
                                <CheckoutItemCard itemType={itemType} licenseData={itemLType[index]} itemData={item} prices={totalPriceWithoutdisc} memName={membershipName} memDiscrip={membershipDiscrip} spName={spServiceName} userName={spUserName} Idkey={`${item["lId"]}${index}`} />
                            );
                        })}
                        
                    </Box>
                    <Box w={{ base: '100%', md: '30%' }}>
                        <h2 className='sub-title'>Summary</h2>

                        <Box backgroundColor="#1A202C" width="100%" minHeight="300px" borderRadius="10px" padding={"20px"}> 

                        <div className='price-catolog'>
                                <p>
                                    <span>Price:</span>
                                    <span className='price'>{itemType === "license"? "LKR" : "USD"} {totalPriceWithoutdisc} </span>
                                </p>

                                <p>
                                    <span>Membership Discount:</span>
                                    <span  className='price'>{itemType === "license"? "LKR" : "USD"} {memberShipDisc} </span>
                                </p>

                                <p>
                                    <span>Service charge:</span>
                                    <span  className='price'>{itemType === "license"? "LKR" : "USD"} {serviceChange} </span>
                                </p>

                                <p>
                                    <span>Total Price:</span>
                                    <span  className='price final'>{itemType === "license"? "LKR" : "USD"} {finalPrice} </span>
                                </p>
                          </div>
                          
                            <p style={{color:"#fcfcfc",fontSize:"16px",fontWeight:"bold"}}>Payment Method</p>

                            <Box margin={"15px 0px 15px 0px"}>
                                <RadioGroup defaultValue='bankDepo' color={"#FCFCFC"}>
                                    <Stack spacing={5} direction='column'>
                                        <Radio colorScheme='orange' value='payPal' onChange={(event)=>{SetPaymentMethod(event.target.value)}}>
                                            PayPal
                                        </Radio>
                                        <Radio colorScheme='orange' value='bankDepo' onChange={(event)=>{SetPaymentMethod(event.target.value)}} >
                                            Bank Deposit
                                        </Radio>
                                        <Radio colorScheme='orange' value='visaAndOther' onChange={(event)=>{SetPaymentMethod(event.target.value)}} >
                                            Credit & Debit card
                                        </Radio>
                                    </Stack>
                                </RadioGroup>

                               
                            </Box>
                            <Button bg="#EB5C27" color={"#FCFCFC"} w="100%" marginBottom={"20px"} onClick={Proceed}> Proceed now </Button>
                            <Text style={{color:"#FCFCFC", fontSize:"14px"}}>I agree to the <Link href='/term' style={{color:"#EB5C27" ,borderBottom:"1px #EB5C27 solid"}}>Terms & Conditions</Link></Text>
                            
                        </Box>
                        
                    </Box>
                </Flex>
            </div>


    
 

            <>
        
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="#363649">
                <ModalHeader color={"#FCFCFC"}>Upload the payment receipt</ModalHeader>
                <ModalCloseButton />

                <form onSubmit={bankDepoSubmit}>
                    <ModalBody>
                        <Text color={"#EB5C27"} fontSize={"23px"} fontWeight={"bold"} >Bank Details</Text>

                        <Flex flexDir={{ base: 'column', md: 'row' }} width="100%"  className="row" flexWrap="wrap">
                            <Box w={{ base: '100%', md: '100%' }} display={"flex"} justifyContent={"center"} alignItems={"center"} className="col-6" padding="15px">
                                <Image width={"50%"} src={sampathLogo} alt='boc' />
                            </Box>
                            <Box w={{ base: '100%', md: '100%' }} className="col-6" padding="15px">
                                <UnorderedList color='#FCFCFC' listStyleType={"none"}>
                                    <ListItem> <Text color={"#EB5C27"} width={"max-content"} >Bank Name: <span style={{color:"#FCFCFC"}}> Hatton National Bank </span> </Text> </ListItem>
                                    <ListItem> <Text color={"#EB5C27"} width={"max-content"} >Bank Name: <span style={{color:"#FCFCFC"}}> M/S Songcosmos (pvt) ltd </span></Text> </ListItem>
                                    <ListItem> <Text color={"#EB5C27"} width={"max-content"} >Account No: <span style={{color:"#FCFCFC"}}> 7030 1001 1157 </span></Text>  </ListItem>
                                    <ListItem> <Text color={"#EB5C27"} width={"max-content"} >Branch: <span style={{color:"#FCFCFC"}}> World Trade Center </span></Text> </ListItem>
                                    <ListItem> <Text color={"#EB5C27"} width={"max-content"} >Branch Code: <span style={{color:"#FCFCFC"}}> 703  </span></Text> </ListItem>
                                </UnorderedList>
                            </Box>


                            <Box>
                            <Text color={"#EB5C27"} fontSize={"18px"} fontWeight={"bold"} >Upload Receipt </Text>
                            <Text color={"#FCFCFC"} fontSize={"14px"} fontWeight={"bold"} >Click to upload image <span style={{color:"red",fontSize:"14px"}} > (note: Image type:jpg/png only , Image size: 1 mb max ) </span></Text>
                            

                                <div className="profile-image" style={{padding:"20px"}}  >
                                    <img  style={{borderRadius:"10px",cursor:"pointer"}} onClick={uploadCover} src={`https://eadn-wc04-3087778.nxedge.io/wp-content/uploads/edd/2012/10/file-uploads1.png`} alt="profile" id="cover-img" />
                                    <Input type="file" display="none" id="cover-image-input" onChange={previewImage}  />
                                    <div className="profile-image">
                                       
                                    </div>
                                </div>
                            </Box>

                        </Flex>

                    </ModalBody>

                    <ModalFooter>
                        <Button variant={"outline"} colorScheme='orange' mr={3} onClick={onClose}>
                        Close
                        </Button>
                        <Button type="submit" style={{"width":"100%",textTransform:"uppercase"}} colorScheme="orange" bg="#EB5C27" _hover={{ bg: "#c44e1c" }} isDisabled={btnDisable} isLoading={btnProcess}>UPLOAD receipt</Button>
                    </ModalFooter>
                </form>
                </ModalContent>
            </Modal>





            <Modal isOpen={isOpen2} onClose={onClose2}>
                <ModalOverlay />
                <ModalContent bg="#363649">
                <ModalHeader color={"#FCFCFC"}>Pay via paypal/credit/debit</ModalHeader>
                <ModalCloseButton />

                <form >
                    <ModalBody>



                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                purchase_units: [
                                    {
                                    amount: {
                                        value: finalPrice*exchangeRate
                                    },
                                    description: orderDetails
                                    }
                                ]
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then(function(details) {
                                    
                                    toastProfile({
                                        title: "Transaction completed by " + details.payer.name.given_name,
                                        description: "",
                                        status: 'success',
                                        duration: 9000,
                                        isClosable: true,
                                      })
                                    //  console.log(details);
                                      paypalDataSubmit(details)
                                });
                            }}

                            onError={(err) => {
                                toastProfile({
                                    title: 'Something went wrong!',
                                    description: err,
                                    status: 'error',
                                    duration: 9000,
                                    isClosable: true,
                                  })
                            }}
                            onCancel={(data) => {
                                toastProfile({
                                    title: 'Something went wrong!',
                                    description: "Payment is canceled",
                                    status: 'error',
                                    duration: 9000,
                                    isClosable: true,
                                })
                            }}
                        
                        />

                    </ModalBody>
                </form>
                </ModalContent>
            </Modal>





            <Modal isOpen={isOpen3} onClose={onClose3} size={"xl"}>
                <ModalOverlay />
                <ModalContent bg="#363649" >
                <ModalHeader color={"#FCFCFC"}>Pay via credit and debit</ModalHeader>
                <ModalCloseButton />

                    <ModalBody>

                        <div id='stripPayDiv'>
                            <form id="payment-form" onSubmit={handleSubmitStripPay}>
                                <LinkAuthenticationElement
                                    id="link-authentication-element"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <PaymentElement id="payment-element" options={paymentElementOptions} />
                                <button disabled={isLoading || !stripe || !elements} id="submit">
                                    <span id="button-text">
                                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                                    </span>
                                </button>
                                {/* Show any error or success messages */}
                                {message && <div id="payment-message">{message}</div>}
                            </form>
                        </div>

                    </ModalBody>
                </ModalContent>
            </Modal>


        </>
  



            <Footer/>
        </section>
    );

}





