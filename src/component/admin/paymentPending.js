import React ,{ useState ,useEffect } from 'react';
import {Flex ,Text} from '@chakra-ui/react';

import "../../css/profile.css";
import "../../css/admin.css"

import PaymentPendingCard from './paymentPendingCard';




export default function PendingPayment(prop){


    const [rows , setRows] = useState([]);
    const [haveData , sethaveData] = useState(true);
    
    useEffect(()=>{
        setRows(prop.PendingPaymentData);
        if (rows.message === "No rows found" ) {
            setRows([]);
            sethaveData(true);
        }else if(!(rows.length <=0)){
            sethaveData(false);
           // console.log(rows);
        } 

        
    },[rows])

    //console.log(haveData ,rows );
    return(

        <section className='dash-user-sec'>

                <Text fontSize={"40px"} fontWeight="900" color="#c23b0a" >Pending Payment</Text>

            

                <Flex flexDir={{ base: 'column', md: 'row' }} width="100%" marginTop="100px" className="row" flexWrap="wrap"> 
                        {haveData? (
                                    <Text color="#FCFCFC">Not found pending payment</Text>
                                    
                                    ) : (
                                    rows.map((item) => {
                                        return (
                                            <PaymentPendingCard data={item}  userData={prop.userData} key={item.payId}/>
                                        );
                                    })
                                )}
                </Flex>
        </section>

    );
}