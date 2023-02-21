import React from 'react';
import {Route,Routes,useLocation, useNavigate} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import { useEffect } from 'react';
import { collection,getDocs,query,where } from 'firebase/firestore';
import { auth, fireStore } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
function App(props) {
   let openPages = ["/","/login","/signUp"]
   const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{
       let token = localStorage.getItem("token")    
       const ref = collection(fireStore,"users")   
let a = query(ref,where("uid","==",token))

getDocs(a).then((res)=>{
    const user= res.docs[0]._document.data.value.mapValue.fields
    signInWithEmailAndPassword(auth,user.email,user.password).then((res)=>{

    }).catch((err)=>{
         if(!openPages.includes(location.pathname)){
            navigate("/")
         }
    })
})
    },[location.pathname])
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/admin' element={<Admin/>}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/signUp' element={<SignUp/>}/>
              
            </Routes>
        </div>
    );
}

export default App;