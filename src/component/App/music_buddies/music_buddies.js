import React , {useState} from "react";

import AppNavigation from "../app_header";

import {  useLocation } from "react-router-dom";
import axios from "axios";


import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Input,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Box,
    Flex,
    Text,
    Checkbox,
  } from '@chakra-ui/react'


  import ServiceCard from "./service_card";

 
export default function MusicBuddies(){


    const [checkedServices , setCheckedServices] = useState([true,true,true,true,true,true,true,true,true,true,true]);
    const [fistRenderServicesObject ,setFistRenderServicesObject] = useState("");

    const [searchWord ,setSearchWord] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure()


   


    const btnRef = React.useRef()

    // const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     message: "",
    //   });
    //   const [errors, setErrors] = useState({
    //     name: "",
    //     email: "",
    //     message: "",
    //   });



      



      const [rows, setRowData] = useState([]);
      const location = useLocation();
      React.useEffect(() => {

       
        const searchParams = new URLSearchParams(location.search);
        const filterd = searchParams.get('filterd');
    
        if(filterd){
            onOpen();
        }


        //console.log("rendering....");
      
        let serviceProviderFromData = {
          spFunction: "getAllSpRows",
        };
      
        const formData = new FormData();
        formData.append('data', JSON.stringify(serviceProviderFromData));
      
        axios.post('https://www.songcosmos.com/PHP/servicesProvider.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {

            //console.log(response.data);
            const sortOrder = ["Mpla","Mgold","Msil","Mbro","MclaD", "MclaP" ];

            const sortedArray = response.data.sort((a, b) => {
            return sortOrder.indexOf(a.mId) - sortOrder.indexOf(b.mId);
            });

            setFistRenderServicesObject(sortedArray);
            setRowData(sortedArray);
            
          })
          .catch(error => {
           // console.log(error);
          });

      
      }, []);

      
      

      function filterServices(){
        //setRowData(true)
        setRowData(fistRenderServicesObject);
       


        const serviceNameArray=["Singer","Lyrists","Composers","Mixing Engineers","Mastering Engineers","Producers","Publishers","Music Distributors","Session artists","Foley artists","Tutor"]
        
        let newObjectArr = [];

        checkedServices.map((item,index)=>{
            if(item){
                fistRenderServicesObject.map((item2)=>{
                    if(item2["serviceName"] === serviceNameArray[index]){
                        newObjectArr.push(item2);
                    }
                })
            }
        })

       
        setRowData(newObjectArr);
      }






      function searchServices(e){
        e.preventDefault();

        setRowData(fistRenderServicesObject);
        //console.log(searchWord)
        let newObjectArr2 = [];

       // console.log(searchWord)

        if(searchWord !== ""){
           // console.log(searchWord)
            fistRenderServicesObject.map((item)=>{

                if((item["serviceName"].toLowerCase()).indexOf(`${searchWord}`) !== -1 || (item["userName"].toLowerCase()).indexOf(`${searchWord}`) !== -1 || (item["spDesc"].toLowerCase()).indexOf(`${searchWord}`) !== -1 ){
                    newObjectArr2.push(item);
                }
            })

            const sortOrder = ["Mpla","Mgold","Msil","Mbro","MclaD", "MclaP" ];

            const sortedArray = newObjectArr2.sort((a, b) => {
            return sortOrder.indexOf(a.mId) - sortOrder.indexOf(b.mId);
            });

            setRowData(sortedArray);

        }
        
      }





    return(
        <section className="music-buddies">
           
            <AppNavigation/>

            <div className="container">
                <h1 className="title">Music <span>Buddies</span></h1>
                <p className="sub-title">Find and Collaborate with musicians on your next innovative music projects</p>


                <div className="search-menu">
                    <div></div>

                    <Menu >
                        <MenuButton display="none" width="200px" bg="#EB5C27" color="#FCFCFC" as={Button} _hover="none" _active="none" rightIcon={<i className="fa-solid fa-chevron-down"></i>}>
                            Sort
                        </MenuButton>
                        <MenuList bg="#454569" >
                            <MenuItem bg="#454569" color="#FCFCFC">Descending</MenuItem>
                            <MenuItem bg="#454569" color="#FCFCFC">Ascendant</MenuItem>
                        </MenuList>
                    </Menu>



                    <form style={{ display: "flex", alignItems: "center" }}>
                        <Input
                            variant="unstyled"
                            placeholder="Search by service or provider name"
                            bg="transparent"
                            color="#FCFCFC"
                            border="1px #454569 solid"
                            className="search-input"
                            type="search"
                            borderRadius="10px 0px 0px 10px"
                            onChange={(event)=>setSearchWord((event.target.value).toLowerCase())}
                        />
                        <Button
                            type="submit"
                            bg="#EB5C27"
                            color="#FCFCFC"
                            className="search-button"
                            height="60px"
                            borderRadius="0px 10px 10px 0px"
                            _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}}
                            onClick={searchServices}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </form>

                    <Button className="filterBtn" bg="#EB5C27" color="white" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} ref={btnRef} colorScheme='teal' onClick={onOpen} >Filter</Button>

                </div>



                    <Flex flexDir={{ base: 'column', md: 'row' }} width="100%" marginTop="100px" className="row" flexWrap="wrap">

                            {rows.length <= 0 ? (
                                <Text color="#FCFCFC">Not found services</Text>
                                ) : (
                                rows.map((item) => {
                                    return (
                                    <ServiceCard
                                        spName={item.userName}
                                        serviceName={item.serviceName}
                                        spPrice={item.spPrice}
                                        userId={item.userId}
                                        keyServices = {item.spId}
                                        spCoverImg ={item.spCoverImg}
                                        memType={item.mId}
                                        userAvatar={item.userAvatar}
                                    />
                                    );
                                })
                            )}
                    
                    </Flex>
            </div>

                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent bg="#454569f1">
                    <DrawerCloseButton color="#FCFCFC" />
                    <DrawerHeader color="#FCFCFC">Filter</DrawerHeader>

                    <DrawerBody>


                    {/* <Accordion color="#FCFCFC">
                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    Type:
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} display="flex" flexDirection="column"> */}
                            <Box display="flex" flexDirection="column" color="#FCFCFC">
                                <Checkbox colorScheme="orange" defaultChecked  onChange={(event)=>setCheckedServices([event.target.checked, ...checkedServices.slice(1)])} >Singer</Checkbox> 
                                <Checkbox colorScheme="orange" defaultChecked  onChange={(event)=>setCheckedServices([...checkedServices.slice(0, 1), event.target.checked, ...checkedServices.slice(2)])} >Lyrists</Checkbox>
                                <Checkbox colorScheme="orange" defaultChecked  onChange={(event)=>setCheckedServices([...checkedServices.slice(0, 2), event.target.checked, ...checkedServices.slice(3)])} >Composers</Checkbox>
                                <Checkbox colorScheme="orange" defaultChecked  onChange={(event)=>setCheckedServices([...checkedServices.slice(0, 3), event.target.checked, ...checkedServices.slice(4)])} >Mixing Engineers</Checkbox>
                                <Checkbox colorScheme="orange" defaultChecked  onChange={(event)=>setCheckedServices([...checkedServices.slice(0, 4), event.target.checked, ...checkedServices.slice(5)])} >Mastering Engineers</Checkbox>
                                <Checkbox colorScheme="orange" defaultChecked  onChange={(event)=>setCheckedServices([...checkedServices.slice(0, 5), event.target.checked, ...checkedServices.slice(6)])} >Producers</Checkbox>
                                <Checkbox colorScheme="orange" defaultChecked  onChange={(event)=>setCheckedServices([...checkedServices.slice(0, 6), event.target.checked, ...checkedServices.slice(7)])} >Publishers</Checkbox>
                                <Checkbox colorScheme="orange" defaultChecked  onChange={(event)=>setCheckedServices([...checkedServices.slice(0, 7), event.target.checked, ...checkedServices.slice(9)])} >Music Distributors</Checkbox>
                                <Checkbox colorScheme="orange" defaultChecked  onChange={(event)=>setCheckedServices([...checkedServices.slice(0, 8), event.target.checked, ...checkedServices.slice(9)])} >Session artists</Checkbox>
                                <Checkbox colorScheme="orange" defaultChecked  onChange={(event)=>setCheckedServices([...checkedServices.slice(0, 9), event.target.checked, ...checkedServices.slice(10)])} >Foley artists</Checkbox>
                                <Checkbox colorScheme="orange" defaultChecked  onChange={(event)=>setCheckedServices([...checkedServices.slice(0, 10), event.target.checked])} >Tutor</Checkbox>
                            </Box>
                            {/* </AccordionPanel>
                        </AccordionItem>
                        </Accordion> */}


                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} color="#FCFCFC" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='#EB5C27' bg="#EB5C27" onClick={filterServices}>Filter</Button>
                    </DrawerFooter>
                    </DrawerContent>
                </Drawer>


        </section>
    );
}