import React from "react";
import axios from "axios";
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { Avatar , ButtonGroup , Button,useToast} from '@chakra-ui/react'
import {useNavigate } from 'react-router-dom';
import AppNavigation from "./app_header";
import { useLocation } from "react-router-dom";


let skillArray = [];
export default function ProfileView(){

  const [btnProcess, setBtnProcess] = React.useState(false);
    const [rows, setRowData] = React.useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

   

    React.useEffect(() => {

    
      let serviceProviderFromData = {
        spFunction: "getUserSpInfo",
        userId:id
      };
    
      const formData = new FormData();
      formData.append('data', JSON.stringify(serviceProviderFromData));
    
      axios.post('https://www.songcosmos.com/PHP/servicesProvider.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {

        document.getElementById("user-skill").innerHTM="";
      

        setRowData(response.data);
          
          document.getElementById("sPuserName").innerHTML = response.data[response.data.length-1]["userName"];
          document.getElementById("innerdesc").innerHTML = response.data[response.data.length-1]["spDesc"];
          document.getElementById("profile-view").style.backgroundImage = `linear-gradient(180deg, #16162269, #161622f3), url("${true? `https://www.songcosmos.com/PHP/image/sp/${response.data[response.data.length-1]["spCoverImg"]}` : "https://images.unsplash.com/photo-1572220555770-bd2feb5b7a30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"}")`;

          document.getElementById("userAvatar").setAttribute("src", `${rows[0]["userAvatar"] ? `https://www.songcosmos.com/PHP/image/avatar/${rows[0]["userAvatar"]}` :"https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg"}`);

          response.data.map((item)=>{
            // document.getElementById("user-skill").innerHTML += `<span>${item["serviceName"]}</span>`;

            if (!skillArray.includes(item["serviceName"])) {
              skillArray.push(item["serviceName"]);
              document.getElementById("user-skill").innerHTML += `<span>${item["serviceName"]}</span>`;
            } 
          })

          

        })
        .catch(error => {
          //console.log(error);
        });


      
    }, []);

    const toastConnect = useToast()
    const navigate = useNavigate();

    function handleConnect(){
      setBtnProcess(true);
      // let profileData = {
      //     PFunction: "getProfileData",
      //     userId: CryptoJS.AES.decrypt(Cookies.get('Id') , process.env.REACT_APP_LOGIN_ID).toString(CryptoJS.enc.Utf8)
      //   };
      
      //   const formData = new FormData();
      //   formData.append('data', JSON.stringify(profileData));
      
      //   axios.post('https://www.songcosmos.com/PHP/profile.php', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   }).then(response => {
      //      // console.log(response.data);
           
      //             let subject ="A client is waiting for you";
      //             let message =`
      //                 <h3>${response.data[0]["userName"]} waiting for you , Hurry up! <h3>
      //                 <p>Client Name : ${response.data[0]["userName"]} </p>
      //                 <p>Client Email : <a href="mailto:${response.data[0]["userEmail"]}">${response.data[0]["userEmail"]}</a> </p>
      //                 <p>Client Phone number : ${ response.data[0]["userPhone"] ? response.data[0]["userPhone"] :"Not added"} </p>
      //             `;
          
      //             let emailData = {
      //                 userId:id,
      //                 subject:subject,
      //                 message:message,
      //             };
                  
      //             const formData2 = new FormData();
      //             formData2.append('data', JSON.stringify(emailData));
              
              
      //             axios.post('https://www.songcosmos.com/PHP/sendEmail.php', formData2, {
      //                 headers: {
      //                 'Content-Type': 'multipart/form-data'
      //                 }
      //             }).then(response => {
      //                     setBtnProcess(false);
          
                   
      //                         toastConnect({
      //                             title: 'Wait for connect !',
      //                             description: `${rows[0]["userName"]} will contact you via email shortly.`,
      //                             status: 'info',
      //                             duration: 9000,
      //                             isClosable: true,
      //                             })
                          
          
      //                 })
      //                 .catch(error => {
                          
      //                     })
           
      //     })
      //     .catch(error => {
      //      // console.log(error);
      //     });

      setTimeout(() => {
        navigate(`/app/inbox?Id=${id}`, { replace: true });
    }, 1000);
  }





    return(

        <div style={{"width":"100%"}}>
            <AppNavigation/>

        <section className="profile-view" id="profile-view">
            <div className="main-details">
                <Avatar size='2xl' name='Segun Adebayo' id="userAvatar" src={"https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg"} />
                <h3 className="name" id="sPuserName"> </h3>
                <p id="user-skill">  </p>
            </div>

            <div className="buy-now">
                <ButtonGroup spacing='2'>
                    <Button isLoading={btnProcess} variant='solid' width={"150px"} onClick={handleConnect}   bg="#EB5C27" color="#FCFCFC">
                        Connect now
                    </Button>
                    
                </ButtonGroup>
            </div>

            <div className="description">
                <p id="innerdesc">
                    Lorem ipsum dolor sit amet, eam liberavisse consectetuer no. Docendi platonem cu sed, debet legere verterem duo cu. Agam fierent elaboraret est ut, ex sea integre gloriatur, ex solum aperiri molestie vix. Sea no hinc nostro, cum cu minim iriure postulant, usu scripta repudiare an. Ei quo quando doming, mundi iracundia repudiandae an has. <br/>

                    Commune disputando eos eu, errem tibique per eu. Vix melius adolescens eu. Vix te idque propriae, cu vix sumo diam vero. At pri meis consequuntur, eos an augue equidem. Duo probo veniam decore te, eam te justo malis complectitur. Cetero tibique vel et, ne justo nemore senserit eam.<br/>

                    Agam veri ex pro. An eos homero consectetuer. Est an malis insolens explicari, salutandi splendide et pro. Ut vis etiam labitur, iusto integre recusabo sit ei, eu unum populo veritus eos. Ancillae persecuti consequuntur ad duo, ius cu rebum virtute accusamus, delicata definiebas ei quo.<br/>

                    Omnium tibique assentior ea vel, an sed maiorum volutpat scripserit, quo eu fuisset legendos. Veritus expetendis definiebas cum no, alia porro tollit id vix, vel dicunt iudicabit te. In sit eripuit phaedrum, et discere mandamus vis. Ponderum inimicus definiebas usu in, ius an dicunt noluisse insolens.
                    <br/>
                    Mea populo verear ponderum an. Nam ad debitis feugait, vim dicant omnesque principes eu, vel omnium appareat ex. Commune eloquentiam sed ne, ea dicant iudicabit adolescens has. Vocent reformidans id vel. Quaeque suscipiantur mea te, est partem adversarium cu. In sea etiam vivendum incorrupte, in mel mundi facilisis similique.
                </p>
            </div>
        </section>

    </div>
    );
}