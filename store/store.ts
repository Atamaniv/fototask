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
  email:string=''
  showNewTask=false // !!!  
  
  setShowNewTask = () =>{
    this.showNewTask=!this.showNewTask;
  }
  
  constructor() {
    // Don't need decorators now, just this call    
    makeAutoObservable(this);
    let x=new Date
    console.log(new Date);
    x=(new Date('2022-02-24T13:30:00'))
    console.log(x);
   }
  
  isAuthorised = () =>{
    if (this.email==='')
     return true
    else
     return false
  }

  setUser=(user:any)=>{
    this.user=user;
    if (user !== null) {
      this.email = user.email;
    } else
    {
      this.email = '';
    }
  }
  
  async setNewUser(email:string, password:string){
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { 
        this.setUser(userCredential.user);          
        })
      .catch((error) => { 
        this.user = '' });
  }  
  
  async setUserIn(email:string, password:string){     
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { 
        this.setUser(userCredential.user);        
        })
      .catch((e) => { console.error(e.message); this.user = '' });
  }  

  async setUserOut(){ 
    signOut(auth)
    .then(() => { 
      this.setUser(null);      
    })
    .catch((e) => { console.error(e) });  
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