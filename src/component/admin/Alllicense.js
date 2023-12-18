import React ,{ useState ,useEffect } from 'react';
import { Box, Flex ,Text ,Input , Button} from '@chakra-ui/react';

import "../../css/profile.css";
import "../../css/admin.css"



import AdminLicenseCard from './adminLicenCard';


export default function LicenseAdmin(prop){


    const [rows , setRows] = useState([])
    const [searchKeyword, setSearchKeyword] = useState();
    const [beforeFilter, setBeforeFilter] = useState(prop.licnData);

    useEffect(()=>{
        console.log(rows.length)
        setRows(prop.licnData);
        if (!prop.licnData.length) {
            setRows([]);
        } 
    },[1])



    function searchSong(e){
        e.preventDefault();
        setRows(beforeFilter);
        let newArr = [];
        if(searchKeyword !== ""){
            
            beforeFilter.map((item)=>{
               

                if((item["userName"].toLowerCase()).indexOf(`${searchKeyword}`) !== -1 || (item["userEmail"].toLowerCase()).indexOf(`${searchKeyword}`) !== -1  ){
                    newArr.push(item);
                }
            })
            setRows(newArr);
        }
    }


    return(

        <section className='dash-user-sec'>

                <Text fontSize={"40px"} fontWeight="900" color="#c23b0a" >All Licenses</Text>

               <Box  display="flex"  flexDirection="column" justifyContent="center" alignItems="center" width={"100%"} height="auto" marginTop="50px">
                <form style={{ display: "flex", alignItems: "center",width:"70%" }}>
                        <Input
                            variant="unstyled"
                            placeholder="Search by user name,email address,phone number"
                            bg="transparent"
                            color="#FCFCFC"
                            border="1px #454569 solid"
                            className="search-input"
                            type="search"
                            borderRadius="10px 0px 0px 10px"
                            height="60px"
                            padding="5px 20px 5px 20px"
                            onChange={(event)=>{setSearchKeyword(event.target.value)}}
                        />
                        <Button
                            type="submit"
                            bg="#EB5C27"
                            color="#FCFCFC"
                            className="search-button"
                            height="60px"
                            borderRadius="0px 10px 10px 0px"
                            onClick={searchSong}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                </form>
            </Box>



                <Flex flexDir={{ base: 'column', md: 'row' }} width="100%" marginTop="100px" className="row" flexWrap="wrap"> 
                        {rows.length <= 0 ? (
                                    <Text color="#FCFCFC">Not found services</Text>
                                    ) : (
                                    rows.map((item) => {
                                        return (
                                            <AdminLicenseCard data={item} />
                                        );
                                    })
                                )}
                </Flex>
        </section>

    );
}