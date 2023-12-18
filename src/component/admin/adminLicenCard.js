import React from "react";
import { Card, Image ,Stack ,  Text , Divider ,Button , ButtonGroup, CardBody, CardFooter,Box ,AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,useDisclosure,useToast} from '@chakra-ui/react'

    import axios from "axios";

export default function AdminLicenseCard(prop){

    const toastdelete = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const [count, setCount] = React.useState(0);

    function deleteUser(id){

        let adminData = {
            adminFunction: "deleteSong",
            lId:id
          };
        
          const formData = new FormData();
          formData.append('data', JSON.stringify(adminData));
        
          axios.post('https://www.songcosmos.com/PHP/admin.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
           
            
                toastdelete({
                    title: 'Delete successful',
                    description: "",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
              
                  setCount(count+1);
            })
            .catch(error => {
                toastdelete({
                    title: 'Something went wrong!',
                    description: "",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            });
            
        
    }
    return(

        <>
        <Box w={{ base: '100%', md: '33%' }} className="col-6" padding="15px" >
            <Card maxW='sm' key={prop.data.userId} bg={"#373655"} color={"#FCFCFC"} >

            <Image
                src={prop.data.lCover !== "null" ? `https://www.songcosmos.com/PHP/image/license/${prop.data.lCover}` : "https://www.nakulanand.in/wp-content/uploads/2022/07/baarish.jpg"}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                />

                <CardBody bg={"#373655"} color={"#FCFCFC"}>
                <Stack mt='6' spacing='3'>
                    <Text>Song Title : {prop.data.lTitle} </Text>
                    <Text>Author : {prop.data.lAuthor} </Text>
                    <Text>Composer : {prop.data.lComposer} </Text>
                
                </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='red' onClick={onOpen} >
                        DELETE SONG
                    </Button>
                </ButtonGroup>
                </CardFooter>
            </Card>
            </Box>


            <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            >
            <AlertDialogOverlay>
            <AlertDialogContent  bg={"#373655"} color={"#FCFCFC"}>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Song
                </AlertDialogHeader>

                <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} colorScheme="green" onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme='red' onClick={ ()=>{deleteUser(prop.data.lId);onClose()}}  ml={3}>
                    Delete
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
            </AlertDialog>

            </>
    )
}