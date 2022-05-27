import { makeAutoObservable } from "mobx";
import { getAuth, 
  signOut, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
 } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import firebaseApp from '../common/firebaseApp';
import { db } from '../common/firebaseApp'

const auth = getAuth(firebaseApp);

export default class myStore {
  user:{}|null=null
  displayName:string=''
  email:string=''
  photoURL:string=''
  emailVerified:string=''
  uid:string='' 
  showNewTask=false

  setShowNewTask = () =>{
    this.showNewTask=!this.showNewTask;
  }
  
  constructor() {
    // Don't need decorators now, just this call    
    makeAutoObservable(this);
  }

  setUser=(user:any)=>{
    this.user=user;
    if (user !== null) {
      this.displayName = user.displayName;
      this.email = user.email;
      this.photoURL = user.photoURL;
      this.emailVerified = user.emailVerified;      
    } else
    {
      this.displayName ='';
      this.email = '';
      this.photoURL = '';
      this.emailVerified = '';
    }
  }
  
  getCurrentUser=()=>{
    console.log(auth.currentUser)
  }

  async setNewUser(email:string, password:string){
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { 
          this.setUser(userCredential.user);          
        })
      .catch((error) => { 
        console.log(error.message);  
        this.user = '' });
  }  
  
  async setUserIn(email:string, password:string){     
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { 
        this.setUser(userCredential.user);        
        })
      .catch((error) => { console.log(error.message); this.user = '' });
  }  

  async setUserOut(){ 
    signOut(auth)
    .then(() => { 
      this.setUser(null);      
    })
    .catch((error) => { console.log(error) });  
  }

  async addData(about:string){
    try {
      const docRef = await addDoc(collection(db, "fototasks"), {
        about: (about.trim()),
        date: new Date,
        userName: "Atamaniv Vlad"
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}