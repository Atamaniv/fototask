import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDoc, getFirestore } from 'firebase/firestore/';
//import { collection, query, where, getDocs, setDoc, deleteDoc } from "firebase/firestore"; 
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { doc } from "firebase/firestore"; 
//import { ref, onValue, getDatabase} from "firebase/database";
// v.9 initialaze
const firebaseApp = initializeApp(firebaseConfig);

 // Init services
//const db = getFirestore();
 
// RefOnUsers 
//  const colRef = collection(db, "users");

//SingIn by email and password
 //const auth = getAuth();
//  const email = 'atamaniv@gmail.com'
//  const password = '123456'
//  signInWithEmailAndPassword(auth, email, password)
//    .then((userCredential) => {
//      // Signed in 
//      const user = userCredential.user;
//      //console.log('SingIn!S')
//    })
//    .catch((error) => {
//      const errorCode = error.code;
//      const errorMessage = error.message;
//    });

   // Query select 
  //  const DocumentQuery = query(collection(db, "users"), where( "age" ,">", 0) );
  //  getDocs(DocumentQuery)
  //  .then( doc =>{
  //    console.group('Add new record');
  //    console.log( doc.docs.forEach(i=>console.log(i.data().name)) , 'background: #222; color: #bada55')
  //    console.groupEnd();
  //    }
  //  )

  // Insert new record
  // const userRef = doc(db, "users", "newuser");
  // setDoc(userRef, { age: 79 ,  name: "Kirire2" });

   // delete record  
   //deleteDoc(doc(db, "users", "people"))
   //  .then(_=>console.log('Successeful'))

   // select from one docs
  //  const DocumentRef = doc(db, 'users', 'people2');
  //  getDoc(DocumentRef)
  //  .then(doc=>{
  //      console.group('Edit record')
  //      console.log(doc.data(),doc.id)
  //      console.groupEnd()
  //     }
  //  )
      //  //Query select 
    //  const DocumentQuery = query(collection(db, "fototasks")); //, where( "date" ,">", "null") 
    //  getDocs(DocumentQuery)
    //  .then( doc =>{
    //     //DATA.push({id:"123",about:"123",date:"sds",userName:"123"})
    //     //DATA = doc.docs.map(obj => ({...obj}) )
    //     //return doc.docs
    //    console.log( doc.docs) //.forEach(i=>console.log(i.data().about)) 
    //    }
    //  )
  
// const db = getDatabase();
//   // Подписка 
//  const starCountRef = ref(db, 'fototasks/');
//  onValue(starCountRef, (snapshot) => {
//    const data = snapshot.val();
//    alert(data);
//    //updateStarCount(postElement, data);
//  });   
export default firebaseApp;