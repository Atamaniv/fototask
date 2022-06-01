import { makeAutoObservable } from "mobx";
import { getAuth, 
  signOut, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
 } from "firebase/auth";
import { collection, addDoc, setDoc, doc, query, getDocs, getDoc, updateDoc, orderBy, where } from 'firebase/firestore';
import firebaseApp from '../common/firebaseApp';
import { db } from '../common/firebaseApp'

const auth = getAuth(firebaseApp);

export default class myStore {
  //user
  user:{}|null=null
  uid=''
  email:string=''
  displayName=''

  showNewTask=false // !!! 
  
  constructor() {
    // Don't need decorators now, just this call    
    makeAutoObservable(this);
  }
  
  setShowNewTask = () =>{
    this.showNewTask=!this.showNewTask;    
  }

  setDisplayName = (text:string) => {
    this.displayName=text;
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
      this.uid = user.uid;
      this.displayName = user.displayName; 
    } else
    {
      this.email = '';
      this.uid = '';
      this.displayName = '';
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

  setUserOut(){ 
    signOut(auth)
    .then(() => { 
      this.setUser(null);      
    })
    .catch((e) => { console.error(e) });  
  }

  async updateProfile(user:any){   
    updateProfile(user, {
      displayName: this.displayName,
      //photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!
    }).catch((error) => {
      // An error occurred
    });
  }

  async addData(about:string, taskBudget:number, dateExecute:Date ){
    try {
      const docRef = await addDoc(collection(db, "fototasks"), {
        about: (about.trim()),
        date: new Date(),
        dateExecute: dateExecute,
        userName: this.displayName,
        userEmail: this.email,
        userUid: this.uid,
        budget: taskBudget,
        status: 'новий',
        joinedUsers: 0,
        executor:'0'
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async addJoinToTask ( taskId: string, userUid: string ) {
    let alradyExist = false
    let myTask = false
    const querySnapshot = await getDocs(collection(db, "fototasks", taskId, "join" )); 

    // Проверка на наличие JOIN юзверя к таску 
    querySnapshot.forEach((doc) => {
      if (doc.data().userUid===userUid) {
        alradyExist=true;
      }      
    });
    
    if (alradyExist) {alert('Ви вже надали заявку!')}
    else 
    try {  
        setDoc(doc(collection(db, 'fototasks', taskId, "join" ), userUid ),{        
        date : new Date(),
        userName: this.displayName,
        userUid:this.uid,
      });
      alert('Заявка прийнята');
      this.setJoinCounter(taskId);
      console.log("Document written with ID: ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async setJoinCounter (taskId:string) {
    const docRefPrev = doc( db , "fototasks", taskId )
    const docSnap = await getDoc(docRefPrev);
    let value
    if (docSnap.exists()) {
      value = docSnap.data().joinedUsers      
    } else {  }    
    updateDoc(docRefPrev, {
      joinedUsers: value+1
    })
    console.log("Cached document data:", docSnap.data());
  }
}