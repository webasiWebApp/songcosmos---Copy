import React from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../css/app_main.css';

import {
  Text,
  Button,
  Box,
  Flex,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Avatar,
  Spinner,
  useToast
} from '@chakra-ui/react';

export default function Tab7() {
  const [loading, setLoading] = React.useState(true);
  const [rows, setRowData] = React.useState([]);
  const [deleteStatus, setdeleteStatus] = React.useState("");

  React.useEffect(() => {
    let profileData = {
      PFunction: 'getServices',
      userID:CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8)
      
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(profileData));

    axios
      .post('https://www.songcosmos.com/PHP/profile.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
      //  console.log(response.data);
        if (Array.isArray(response.data)) {
          setRowData(response.data);
        } else {
          setRowData([]);
        }
        setLoading(false);
      })
      .catch((error) => {
      //  console.log(error);
      });
  }, [deleteStatus]);

  const toastSeivices = useToast()

    function deleteServices(serviceId){
      

      let profileData = {
        PFunction: 'deleteServices',
        spId:serviceId
      };
  
      const formData = new FormData();
      formData.append('data', JSON.stringify(profileData));
  
      axios
        .post('https://www.songcosmos.com/PHP/profile.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
         // console.log(response.data);
       
            if(response.data.includes("success")){
              setdeleteStatus(response.data);
              toastSeivices({
                title: 'Service delete successful',
                description: "",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            }else{
              toastSeivices({
                title: 'Something went wrong',
                description: "",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            }
          
        })
        .catch((error) => {
          toastSeivices({
            title: 'Something went wrong',
            description: "",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        });
    }






  if (loading) {
    return (
      <div>
        <Spinner color='red.500' />
      </div>
    );
  }

  return (
    <div>
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        width='100%'
        marginTop='100px'
        className='row'
        flexWrap='wrap'
      >
        {rows.length <= 0 ? (
          <Text color='#FCFCFC'>Not found services</Text>
        ) : (
          rows.map((item) => {
            return (
              <Box w={{ base: '100%', md: '25%' }} className='col-6' padding='15px' key={item.userId}>
                <Card maxW='sm' bg='#2c2c44' color='#FCFCFC'>
                  <CardBody>
                    <Image
                      src={`https://www.songcosmos.com/PHP/image/sp/${item.spCoverImg}`}
                      alt='Green double couch with wooden legs'
                      borderRadius='lg'
                      h={"250px"}
                      w={"100%"}
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md' fontWeight='800' display='flex' justifyContent='flex-start' alignContent='center'>
                        <Avatar marginRight='15px' size='sm' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                        {item.spName}
                      </Heading>

                      <Text fontSize={'18px'} fontWeight='600'>
                        I am your {item.serviceName}
                      </Text>
                      <Text color='#EB5C27' fontSize='2xl' fontWeight='800'>
                        <span style={{ marginRight: '10px' }}>LKR</span>
                        {item.spPrice}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                                            <CardFooter>
                                                <ButtonGroup spacing='2'>
                                                    <Button variant='solid' onClick={()=>{deleteServices(item.spId)}}  bg="red" color="#FCFCFC">
                                                       DELETE
                                                    </Button>
                                                    <Link to={`/app/user?id=${item.userId}`}>
                                                        <Button variant='outline' colorScheme="orange" >
                                                        View info
                                                        </Button>
                                                    </Link>
                                                </ButtonGroup>
                                            </CardFooter>
                                        </Card>
                                    </Box>
                            
                                    );
                                })
                        )}

            </Flex>

    </div>
  );



}
