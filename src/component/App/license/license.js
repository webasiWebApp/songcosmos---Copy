import React , {useState} from "react";
import AppNavigation from "../app_header";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../css/app_main.css";
import InfiniteScroll from 'react-infinite-scroll-component';



import {
    Button,
    Input,
    Box,
    Flex,
    Text,
    Spinner,

  } from '@chakra-ui/react'

import LicenseCard from "./license_card";



export default function License(){

   

    const [rows , setRows] = useState()
    const [loading, setLoading] = useState(true);
    const [beforeFilter, setBeforeFilter] = useState();
    const [searchKeyword, setSearchKeyword] = useState();

    const [items, setItems] = useState([]); // show the first 20 items

    

    React.useEffect(() => {

      
        let licenseData = {
          LFunction: "getAllLRows",
        };
      
        const formData = new FormData();
        formData.append('data', JSON.stringify(licenseData));
      
        axios.post('https://www.songcosmos.com/PHP/lisence.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {



            if (Array.isArray(response.data)) {
                setRows(response.data);
                // console.log(response.data);
                setBeforeFilter(response.data);
                setLoading(false);
                setItems(response.data.slice(0, 20))
              } else {
                setItems([]);
                setRows([]);
              }
        
            
          })
          .catch(error => {
          //  console.log(error);
          });
      
      
      }, []);


      function searchSong(e){
        e.preventDefault();
       // console.log("hello");
        setRows(beforeFilter);
        let newArr = [];
        if(searchKeyword !== ""){
           // console.log(searchKeyword)
            beforeFilter.map((item)=>{
                if((item["lTitle"].toLowerCase()).indexOf(`${searchKeyword}`) !== -1 || (item["lAuthor"].toLowerCase()).indexOf(`${searchKeyword}`) !== -1 || (item["lComposer"].toLowerCase()).indexOf(`${searchKeyword}`) !== -1 ){
                    newArr.push(item);
                }
            })
            setRows(newArr);
            setItems(newArr);
        }else{
            setRows(beforeFilter);
            setItems(beforeFilter.slice(0, 20));
        }
      }



      const fetchMoreData = () => {
        // simulate loading the next set of items
        setTimeout(() => {
          const nextItems = rows.slice(items.length, items.length + 20);
          setItems([...items, ...nextItems]);
        }, 1500);
      };


      if (loading) {
        return <div>
                    <AppNavigation/>
                    <section className="license-sec">
                        <Box display="flex"  flexDirection="column" justifyContent="center" alignItems="center" width={"100"} height="auto">
                            <Text color="#FCFCFC" fontSize={"70px"} fontWeight="900" textAlign="center" > <span style={{"color":"#EB5C27"}} >License</span> From Songcosmos</Text>
                            <Text width="50%" fontWeight="bold" color="#FCFCFC" fontSize="14px" textAlign="center">Streamline your music journey with our copyright licensing service for Sri Lankan Song catalogue, simplifying life for creators in Sri Lanka.</Text>

                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='#EB5C27'
                                size='xl'
                                marginTop="100px"
                                />
                        </Box>

                    </section>
                     
            </div>;
      }




    return(

        <>
         

        <AppNavigation/>
        <section className="license-sec">
            <Box display="flex"  flexDirection="column" justifyContent="center" alignItems="center" width={"100"} height="auto">
                <Text className="title" color="#FCFCFC"  textAlign="center" > <span style={{"color":"#EB5C27"}} >License</span> From Songcosmos</Text>
                <Text className="sub-title" width="50%" fontWeight="bold" color="#FCFCFC" fontSize="14px" textAlign="center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
            </Box>


            <Box  display="flex"  flexDirection="column" justifyContent="center" alignItems="center" width={"100"} height="auto" marginTop="50px">
                <form className="search-wrapper" style={{ display: "flex", alignItems: "center" }}>
                        <Input
                            variant="unstyled"
                            placeholder="Search by song title,author name and composer name"
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
                            _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}
                            onClick={searchSong}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                </form>

                <Link to="https://www.songcosmos.com/PHP/pdf/rateCard.pdf" target="_blank"><Button style={{"backgroundColor":"#EB5C27","color":"#FCFCFC","marginTop":"15px"}}>Download Songcosmos Tariff</Button> </Link>
            </Box>
            <InfiniteScroll
                            dataLength={items.length}
                            next={fetchMoreData}
                            hasMore={items.length < rows.length}
                            loader={ <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='#EB5C27'
                                size='sm'
                                marginTop="100px"
                                />}
                            endMessage={<p>No more items to load</p>}
                            style={{ width: '100%' }}
                            >

            <Box width="100%" height="auto">
                <Flex flexDir={{ base: 'column', md: 'row' }} width="100%" marginTop="100px" className="row" flexWrap="wrap">

                    
                    {/* {rows.length <= 0 ? (
                                <Text color="#FCFCFC">Not found services</Text>
                                ) : (
                                rows.map((item) => {
                                    return (
                                        <LicenseCard
                                            lTitle={item.lTitle}
                                            lAuthor={item.lAuthor}
                                            lComposer={item.lComposer}
                                            keyLI={item.lId}
                                        />
                                    );
                                })
                            )} */}

                      
                            {items.length <= 0 ? (
                                <p>Not found services</p>
                            ) : (
                                items.map((item) => (
                                <LicenseCard
                                    key={item.lId}
                                    keyLd={item.lId}
                                    lTitle={item.lTitle}
                                    lAuthor={item.lAuthor}
                                    lComposer={item.lComposer}
                                />
                                ))
                            )}
                           

                </Flex>
            </Box>

            </InfiniteScroll>





        </section>

        </>
    );
}

