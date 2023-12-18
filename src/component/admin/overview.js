import React ,{ useState ,useEffect } from 'react';
import { Box, Flex ,Text ,Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from '@chakra-ui/react';

import "../../css/profile.css";
import "../../css/admin.css"




export default function Overview(prop){

    const [userCount,setUserCount] = useState(0);
    const [memberCount,setmemberCount] = useState(0);
    const [spCount,setspCount] = useState(0);
    const [licenseCount,setlicenseCount] = useState(0);

    const [member1SepCount,setmember1SepCount] = useState(0);
    const [member2SepCount,setmember2SepCount] = useState(0);
    const [member3SepCount,setmember3SepCount] = useState(0);
    const [member4SepCount,setmember4SepCount] = useState(0);
    const [member5SepCount,setmember5SepCount] = useState(0);
    const [member6SepCount,setmember6SepCount] = useState(0);

    useEffect(()=>{
        setUserCount(formatNumber(prop.userData.length));
        setspCount(formatNumber(prop.spData.length));
        setlicenseCount(formatNumber(prop.licnData.length));

        // count members
        if(prop.userData.length > 0){

            let c=0;
            let mem1=0;
            let mem2=0;
            let mem3=0;
            let mem4=0;
            let mem5=0;
            let mem6=0;


            prop.userData.map((item)=>{
                if(item["mId"]){
                    c++
                } 
                
                if(item["mId"] === "MclaD"){
                   mem1++
                } else if(item["mId"] === "MclaP"){
                    mem2++
                }else if(item["mId"] === "Mbro"){
                    mem3++
                }else if(item["mId"] === "Msil"){
                    mem4++
                }else if(item["mId"] === "Mgold"){
                    mem5++
                }else if(item["mId"] === "Mpla"){
                    mem6++
                }

            });


            setmember1SepCount(mem1);
            setmember2SepCount(mem2);
            setmember3SepCount(mem3);
            setmember4SepCount(mem4);
            setmember5SepCount(mem5);
            setmember6SepCount(mem6);

            setmemberCount(formatNumber(c));

            

        }

    },[]);


    function formatNumber(number) {
        // Add a leading zero if the number is less than 10
        // Add a leading zero if the number is less than 10

        if(number){
            if (number < 10) {
                number = "0" + number;
            }

            // Convert the number to a string and split it into groups of three digits
            var numberString = number.toString();
            var groups = numberString.match(/(\d{1,3})(?=(\d{3})+(?!\d))/g);

            // Check if groups is null before joining
            if (groups) {
                // Join the groups with commas and return the result
                return groups.join(",");
            } else {
                // Return the original number if it couldn't be formatted
                return numberString;
            }
        }else{
            return "00";
        }
           
    }
        
    return(
        <section className='overview-sec'>
            <h1>OVERVIEW</h1>


            <Flex flexDir={{ base: 'column', md: 'row' }} width="100%" marginTop="30px" className="top-row" flexWrap="wrap">
                <Box w={{ base: '100%', md: '22%' }} className="col-3" padding="15px">
                    <Text fontWeight={"900"} color={"#FCFCFC"} fontSize={"20px"} >Total Users</Text>
                    <Text fontWeight={"900"} color={"#FCFCFC"} fontSize={"35px"} >{userCount}</Text>
                </Box>
                <Box w={{ base: '100%', md: '22%' }} className="col-3" padding="15px">
                    <Text fontWeight={"900"} color={"#FCFCFC"} fontSize={"20px"} >Total Members</Text>
                    <Text fontWeight={"900"} color={"#FCFCFC"} fontSize={"35px"} >{memberCount}</Text>
                </Box>
                <Box w={{ base: '100%', md: '22%' }} className="col-3" padding="15px">
                    <Text fontWeight={"900"} color={"#FCFCFC"} fontSize={"20px"} >Service Providers</Text>
                    <Text fontWeight={"900"} color={"#FCFCFC"} fontSize={"35px"} >{spCount}</Text>
                </Box>
                <Box w={{ base: '100%', md: '22%' }} className="col-3" padding="15px">
                    <Text fontWeight={"900"} color={"#FCFCFC"} fontSize={"20px"} >Total Licenses</Text>
                    <Text fontWeight={"900"} color={"#FCFCFC"} fontSize={"35px"} >{licenseCount}</Text>
                </Box>
            </Flex>

            <Text fontWeight={"900"} color={"#EB5C27"} fontSize={"40px"} marginTop="50px" >Members Count</Text>

            <Flex flexDir={{ base: 'column', md: 'row' }} width="100%" marginTop="20px" className="Second-row" flexWrap="wrap">
                <Box w={{ base: '100%', md: '18%' }} borderRight="1px #59596b solid" className="col-2" padding="15px">
                    <Stat color={"#FCFCFC"}>
                        <StatLabel>CLASSIC (Distribute) </StatLabel>
                        <StatNumber>{member1SepCount}</StatNumber>
                        <StatHelpText>Total Members</StatHelpText>
                    </Stat>
                </Box>
                <Box w={{ base: '100%', md: '16%' }} borderRight="1px #59596b solid" className="col-2" padding="15px">
                    <Stat>
                        <StatLabel>CLASSIC (Publish)</StatLabel>
                        <StatNumber>{member2SepCount}</StatNumber>
                        <StatHelpText>Total Members</StatHelpText>
                    </Stat>
                </Box>
                <Box w={{ base: '100%', md: '16%' }} borderRight="1px #59596b solid" className="col-2" padding="15px">
                    <Stat>
                        <StatLabel>BRONZE</StatLabel>
                        <StatNumber>{member3SepCount}</StatNumber>
                        <StatHelpText>Total Members</StatHelpText>
                    </Stat>
                </Box>
                <Box w={{ base: '100%', md: '16%' }} borderRight="1px #59596b solid" className="col-2" padding="15px">
                    <Stat>
                        <StatLabel>SILVER</StatLabel>
                        <StatNumber>{member4SepCount}</StatNumber>
                        <StatHelpText>Total Members</StatHelpText>
                    </Stat>
                </Box>
                <Box w={{ base: '100%', md: '16%' }} borderRight="1px #59596b solid" className="col-2" padding="15px">
                    <Stat>
                        <StatLabel>GOLD</StatLabel>
                        <StatNumber>{member5SepCount}</StatNumber>
                        <StatHelpText>Total Members</StatHelpText>
                    </Stat>
                </Box>
                <Box w={{ base: '100%', md: '16%' }} borderLeft="1px #59596b solid" className="col-2" padding="15px">
                    <Stat>
                        <StatLabel>PLATINUM</StatLabel>
                        <StatNumber>{member6SepCount}</StatNumber>
                        <StatHelpText>Total Members</StatHelpText>
                    </Stat>
                </Box>
            </Flex>
        </section>
    );
}