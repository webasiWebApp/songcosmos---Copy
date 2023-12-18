import React from "react";
import { Card,Stack  , Text , Divider ,Button , ButtonGroup, CardBody, CardFooter,Box ,AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,useDisclosure,useToast} from '@chakra-ui/react'

    import axios from "axios";

export default function UserCard(prop){

    const toastdelete = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const [count, setCount] = React.useState(0);
    const [displayRoles, setdisplayRoles] = React.useState("");


    React.useEffect(()=>{
        setdisplayRoles(getRolesString(JSON.parse(prop.data.role)));
    },[]);

    function getRolesString(rolesObj){

        if(rolesObj){
            const rolesArray = Object.keys(rolesObj).filter((role) => rolesObj[role]);
            return rolesArray.join("/");
        }else{
            return "";
        }
        
    };

    function deleteUser(id){

        let adminData = {
            adminFunction: "deleteUser",
            userId:id
          };
        
          const formData = new FormData();
          formData.append('data', JSON.stringify(adminData));
        
          axios.post('https://www.songcosmos.com/PHP/admin.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
           //   console.log(response.data);
            
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
                <CardBody bg={"#373655"} color={"#FCFCFC"}>
                <Stack mt='6' spacing='3'>
                    <Text>Name : {prop.data.userName} </Text>
                    <Text>Email : {prop.data.userEmail} </Text>
                    <Text>Phone : {prop.data.userPhone} </Text>
                    <Text>Address : {prop.data.userAdd} </Text>
                    <Text>Membership : {prop.data.mId} </Text>
                    <Text>Bank Name : {prop.data.bankName} </Text>
                    <Text>Bank User : {prop.data.bankUserName} </Text>
                    <Text>Acoount no : {prop.data.bankAccName} </Text>
                    <Text>Bank Branch : {prop.data.bankBranchName} </Text>
                    <Text>Role : {displayRoles} </Text>
                    
                </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='red' onClick={onOpen} >
                        DELETE USER
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
                Delete Customer
                </AlertDialogHeader>

                <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} colorScheme="green" onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme='red' onClick={ ()=>{deleteUser(prop.data.userId);onClose()}}  ml={3}>
                    Delete
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
            </AlertDialog>

            </>
    )
}