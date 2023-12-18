import React from 'react';
import AppNavigation from "../app_header";
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { useLocation } from "react-router-dom";

import {
    Button,
    Input,
    Box,
    Flex,
    Text,
    AvatarGroup,
    Avatar,
    InputGroup,
    InputRightElement,
    useToast
  } from '@chakra-ui/react'

  import "../../../css/app_main.css"

import Chats from './chats';
import Msg from './msg';
import Participant from './participant';



//Firebase
import { arrayUnion, collection, doc, getDoc ,onSnapshot,query,setDoc, updateDoc, where} from "firebase/firestore";
import {db} from "./firebase"


// get uiuq ID
import { v4 as uuidv4 } from 'uuid';


export default function Inbox(){

    const userId = CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const musicBuddieId = searchParams.get("Id");

    const [copied , setcopied] = React.useState("fa-copy");
    const [btnLoad , setbtnLoad] = React.useState(false);
    const [participantIdToAdd , setparticipantIdToAdd] = React.useState("");

    const [chatConns , setChatConns] = React.useState([]);
    const [messagesArr , setMessageArr] = React.useState([]);
    const [connName , setconnName] = React.useState("");
    const [connImage , setconnImage] = React.useState("");
    const [connid , setconnid] = React.useState(null);
    const [message , setmessage] = React.useState("");
    const [pasitipation , setpasitipation] = React.useState([]);

    const toastinbox = useToast();
   
    React.useEffect(()=>{

        if(window.innerWidth < 900){
            toastinbox({
                title: 'Turn to the landscape for the best experience',
                status: 'info',
                duration: 100000,
                isClosable: true,
            })
        }

        if(musicBuddieId){
            createChatsConn();
        }

    },[1]);

    
    React.useEffect(()=>{
        getChatsConns();
    },[1]);


  


    async function createChatsConn() {
        
        // Create chats connections
        const connectionId = `${userId}-${musicBuddieId}`;
      
        try {

            
          const docSnapshot = await getDoc(doc(db, "chatsConn", connectionId));
          const musicBuddie = await getDoc(doc(db, "user", musicBuddieId));
          const user = await getDoc(doc(db, "user", userId));
          if (!docSnapshot.exists()) {
 
            await setDoc(doc(db, "chatsConn", connectionId), { 
                Participants: [{name:musicBuddie.data().name , id:musicBuddieId} , {name:user.data().name , id:userId}],
                lastMsg:"",
                message:[{
                    id:uuidv4(),
                    from:userId,
                    msg:"HI , I am waiting for you!",
                    time:Date.now()
                }],
                chatName:[{name:musicBuddie.data().name , id:musicBuddieId} , {name:user.data().name , id:userId}],
                chatImage:musicBuddie.data().imageUrl,
                id:connectionId
             });

            //  update last message
             await updateDoc(doc(db, "chatsConn", connectionId), { 
                userId:userId,
                lastMsg:{
                    msg:"HI , I am waiting for you!",
                    time:Date.now()
                        }
             });

            // Update user already exited chats connections 
            await updateDoc(doc(db, "user", userId), { 
                chatConn:arrayUnion(connectionId)
            });

            await updateDoc(doc(db, "user", musicBuddieId), { 
                chatConn:arrayUnion(connectionId)
            });

          }else{
           // console.log(docSnapshot.data())
          }
          
        } catch (error) {
          //console.log('Error retrieving or creating chats connection:', error);
        }
      
        // ... rest of the code
      }




     

      async function getChatsConns(){
        onSnapshot(doc(db, "user", userId),async (doc) => {
            
            let chatsConnArray = [];
            let connIdArray = doc.data().chatConn.map((conn)=>{return conn});
         
            try{

                if(connIdArray.length){
                    const q = query(collection(db, "chatsConn"), where('id', 'in', connIdArray));
                    onSnapshot(q,(docsSnap)=>{
                        
                        if(docsSnap.size){
                            chatsConnArray = []
                            docsSnap.forEach((doc) => {
                                chatsConnArray.push(doc.data());
                            });

                            let connTempArr = chatsConnArray.sort((a, b) => a.lastMsg.time - b.lastMsg.time)
                            setChatConns(connTempArr.reverse());

                        }else{
                            setChatConns([])
                        }
                    });

                }

            }catch(err){
               // console.log(err);
            }

        });

      }

    // make chatbox  when click chat conn 
    async function getChatMsgs(chatId){

        onSnapshot(doc(db, "chatsConn", chatId),async (doc) => {
            setconnName(checkConnName(doc.data().chatName));
            setconnImage(doc.data().chatImage);
            setMessageArr(doc.data().message);
            setconnid(chatId);
            setpasitipation(doc.data().Participants);
        });
    }
      
    // Send messages
    async function sendMessages(){
 
        if(connid){
            if(message.length !== 0){
                await updateDoc(doc(db, "chatsConn", connid), { 
                    message:arrayUnion({
                        id:uuidv4(),
                        from:userId,
                        msg:message,
                        time:Date.now()
                    })

                });

                await updateDoc(doc(db, "chatsConn", connid), { 
                    lastMsg:{
                        msg:message,
                        time:Date.now()
                            }
                 });

                 setmessage("");
            }
        }else{
            toastinbox({
                title: 'Please Select chat',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }

    }


    function checkConnName(chatName){
        let name =""
        // chatName.map((nameArr)=>{
        //     if(nameArr.id !== userId){
        //         name= nameArr.name;
        //     }
        // })

        return chatName[0].name;
    }


    const handleCopyToClipboard = () => {
        setcopied("fa-circle-check");
        navigator.clipboard.writeText(userId);

        setTimeout(()=>{
            setcopied("fa-copy");
        },3000)
      };


    async function addParticipants(){

        setbtnLoad(true);
        
        if(participantIdToAdd.length && participantIdToAdd !== userId){

            let isExitsPid = false;
            pasitipation.map((pId)=>{
                if(participantIdToAdd === pId){
                    isExitsPid = true;
                }
            })

            if(!isExitsPid){
                await updateDoc(doc(db, "user", participantIdToAdd), { 
                    chatConn:arrayUnion(connid)
                });

                const participantInfo = await getDoc(doc(db, "user", participantIdToAdd));

                await updateDoc(doc(db, "chatsConn", connid), { 
                    Participants:arrayUnion({
                        name:participantInfo.data().name,
                        id:participantIdToAdd
                    })
                });

                setbtnLoad(false);
                setparticipantIdToAdd("")
            }else{
                toastinbox({
                    title: 'The ID already exists',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                setbtnLoad(false);
            }
            
        }else{
            toastinbox({
                title: 'Please enter correct id',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            setbtnLoad(false);
        }
    }

    return(
        <div>
            <AppNavigation/>
            <section className="inbox-sec">
                <Text display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop={"50px"} color={"#FCFCFC"} fontSize={"40px"} fontWeight={"bold"} textAlign={"center"} textTransform={"uppercase"}>Chat with <Text color={"#EB5C27"} marginLeft={"15px"} >Music buddies</Text></Text>


                <Box display="flex" justifyContent="center" alignItems="center">
                    <InputGroup  size='sm' width={"250px"} >
                        <Input
                            type="text"
                            isDisabled
                            value={userId}
                            borderRadius={"10px"}
                            bg="orange"
                            fontSize={"13px"}
                            fontWeight={"bold"}
                            color={"white"}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button bg="orange" h='1.2rem' size='sm' _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} onClick={handleCopyToClipboard}>
                                <i className={`fa-solid ${copied}`}></i>
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>


                <Box width="100%" height="auto" color={"#fcfcfc"}>
                    <Flex flexDir={{ base: 'column', md: 'row' }} width="100%" marginTop="0px" className="row" flexWrap="wrap" padding="15px">

                        <Box  w={{ base: '100%', md: '25%' }} backgroundColor={"#161622"} className="col-6" border={"1px #EB5C27 solid"} borderRadius={"10px 0px 0px 10px"} height={"90vh"}>
                            <Box width={"100%"} height={"70px"} border={"1px #EB5C27 solid"} borderRadius={"10px 0px 0px 10px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <Text color={"#FCFCFC"} fontSize={"18px"} fontWeight={"bold"}>All conversation</Text>
                            </Box>

                            {/* Available coversations */}
                            <Box overflowY={"scroll"} w={"100%"} height={"90%"} css={{
                                '&::-webkit-scrollbar': {
                                width: '4px',
                                },
                                '&::-webkit-scrollbar-track': {
                                width: '6px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                background: "#FCFCFC",
                                borderRadius: '24px',
                                },
                            }}>
                               
                                {chatConns.length ? chatConns.map((chats)=>{return(<Chats chatFunc={getChatMsgs} chatId={chats.id} key={chats.id} name={checkConnName(chats.chatName)}  lastMsg={chats.lastMsg.msg} imageUrl={chats.chatImag} />) }) :"No chats"}
                                
                            </Box>
                            
                        </Box>

                        <Box w={{ base: '100%', md: '55%' }} className="col-6"  border={"1px #EB5C27 solid"} height={"90vh"}>

                            <Box width={"100%"} height={"70px"} border={"1px #EB5C27 solid"} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>

                                <AvatarGroup size='sm' max={2} marginLeft={"30px"}>
                                    <Avatar name='Ryan Florence' src={connImage} />
                                </AvatarGroup>

                                    <Text color={"#FCFCFC"} fontSize={"22px"} fontWeight={"600"} marginLeft={"30px"} >{connName}</Text>
                            </Box>


                            <Box h={"80%"} overflowY={"scroll"} w={"100%"} id='chatField' css={{
                                '&::-webkit-scrollbar': {
                                width: '4px',
                                },
                                '&::-webkit-scrollbar-track': {
                                width: '6px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                background: "#FCFCFC",
                                borderRadius: '24px',
                                },
                            }}>

                                
                            {messagesArr.length ? messagesArr.map((chats)=>{return(<Msg name={chats.from} from={chats.from} msg={chats.msg} pasitipation={pasitipation}/>) }) :""}
                               

                            </Box>

                            <Box padding={"15px"}>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        type={"text"}
                                        placeholder='Type Message...'
                                        onChange={(e)=>{setmessage(e.target.value)}}
                                        value={message}
                                        onKeyDown={(event)=>{if (event.key === 'Enter') {sendMessages()}}}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' color={"#FCFCFC"} backgroundColor={"#EB5C27"} _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} onClick={sendMessages}>
                                        SEND
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Box>

                        </Box>

                        <Box w={{ base: '100%', md: '20%' }} backgroundColor={"#161622"} className="col-6"  border={"1px #EB5C27 solid"} borderRadius={"0px 10px 10px 0px"} height={"90vh"} >
                            <Box width={"100%"} height={"70px"} border={"1px #EB5C27 solid"} borderRadius={"0px 10px 10px 0px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <Text color={"#FCFCFC"} fontSize={"18px"} fontWeight={"bold"}>{pasitipation.length} Participants</Text>
                            </Box>

                                <Box padding={"15px"}>
                                    <Input
                                        pr='4.5rem'
                                        type="text"
                                        placeholder="Type Participant's id"
                                        onChange={(e)=>{setparticipantIdToAdd(e.target.value)}}
                                        value={participantIdToAdd}
                                    />

                                    <Button _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} isLoading={btnLoad} w={"100%"} marginTop={"10px"} size='md' color={"#FCFCFC"} backgroundColor={"#EB5C27"} onClick={addParticipants}>
                                        Add Participant
                                    </Button>

                                </Box>

                                <Box w={"100%"} marginTop={"20px"}>
                                    {pasitipation.length ? pasitipation.map((partici)=>{return(<Participant name={partici.name} id={partici.id}/>) }) :""}
                                </Box>
                                

                        </Box>

                    </Flex>
                </Box>
                
            </section>
        </div>
    )
}