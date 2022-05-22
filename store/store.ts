import { makeAutoObservable } from "mobx";
import { getAuth, signOut, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from '../common/firebaseApp';

const auth = getAuth(firebaseApp);

type userType = string | null

export default class myStore {
  
  count=0;
  user:userType=null
  constructor() {
    // Don't need decorators now, just this call
    makeAutoObservable(this);
  }
  
  addCount=()=>{
    this.count = this.count +1;
    console.log(this.count)    
  }

  async setNewUser(email:string, password:string){
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { 
          this.user=userCredential.user.toString(); 
          console.log('Создан новый пользователь')
        })
      .catch((error) => { 
        console.log(error.message); 
        this.user = '' });
  }  
  
  async setUserIn(email:string, password:string){     
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { 
          console.log('Пользователь вошел')
          console.log(email , password)
          this.user = userCredential.user.email;
        })
      .catch((error) => { console.log(error.message); this.user = '' });
  }  

  setUserOut(){
    signOut(auth)
    .then(() => { 
      this.user=''; console.log('Пользователь вышел') 
    })
    .catch((error) => { console.log(error) });  
  }
}