

//Firebase
import { doc, getDoc ,setDoc, updateDoc} from "firebase/firestore";
import {db} from "./firebase"

export async function createUserOrUpdateUser(userId,name,email,imageUrl){
  //console.log(userId)

    // Create user or update user
    try {
      const docSnapshot = await getDoc(doc(db, "user", userId));
      if (!docSnapshot.exists()) {
        await setDoc(doc(db, "user", userId), { 
            userId:userId,
            name:name,
            email:email,
            imageUrl:imageUrl,
            chatConn:[]
         });
      }else{
        await updateDoc(doc(db, "user", userId), { 
            userId:userId,
            name:name,
            email:email,
            imageUrl:imageUrl,
         });
      }
      
    } catch (error) {
      //console.log('Error retrieving or creating chats connection:', error);
    }

}















// export async function Createuser(email,password,name,phone){

//     createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         console.log(user);

//         UpdatePhoneAndDisplayName(name,phone);
    
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//     })

// }


// export  function SignInUser(email,password,resolve){
//     console.log("Sign in checking....");
   

//     signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         console.log(user);
//         resolve(true);
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//     });

  

// }

// export async function UpdatePhoneAndDisplayName(phoneNumber,displayName){

//     console.log("updating checking...." , phoneNumber , displayName);
    
//     updateProfile(auth.currentUser, {
//         phoneNumber:phoneNumber,
//         displayName:displayName,
//       }).then(() => {
//         // Profile updated!
//         // ...
//       }).catch((error) => {
//         // An error occurred
//         // ...
//       });
// }


//123456789Gg#