import React from 'react';
import { useState } from 'react';
import {createUserWithEmailAndPassword,signInWithPhoneNumber,RecaptchaVerifier} from 'firebase/auth'
import { Link,useNavigate } from 'react-router-dom';
import {auth, fireStore} from '../firebaseConfig'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {collection,addDoc} from 'firebase/firestore'
function SignUp(props) {
     const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [repeatPassword,setReapetPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [confirmPasswords,setConfirmPasswords] = useState("")
    const [showInput ,setShowInput] = useState(false)
    function Register(){
       if(password===repeatPassword){
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
            
            },
            'expired-callback': () => {
           
            }
          }, auth);

          signInWithPhoneNumber(auth,phone,window.recaptchaVerifier).then((confirmationResult)=>{
            window.confirmationResult = confirmationResult;
            setShowInput(true)
          })

       }else{
        toast.error("password error")
       }
          


    }
    function Konfirm(){
   window.confirmationResult.confirm(confirmPasswords).then((res)=>{
    const ref = collection(fireStore,"users")
    let uid = res.user.uid

    addDoc(ref,{
        email,
        password,
        phone,
        uid
    }).then((res)=>{
        navigate("/login")
    })
   })
    }
    return (
        <div>
          
          <div className='card w-50 offset-4'>
                <div className='card-header '>
                    Register
                    
                </div>
                <div className='card-body '>
                    {showInput  ?  <div>
                              <input value={confirmPasswords} onChange={(e)=>setConfirmPasswords(e.target.value)} type={"text"} placeholder="password phone number" className='form-control my-2'/>
                              <button onClick={Konfirm}>kirish</button>
                        </div>
                        :  
                        
                        <div>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type={"text"} placeholder="email" className='form-control my-2'/>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type={"password"} placeholder="password" className='form-control my-2'/>
                    <input value={repeatPassword} onChange={(e)=>setReapetPassword(e.target.value)} type={"password"} placeholder="repeat password" className='form-control my-2'/>
                    <input value={phone} onChange={(e)=>setPhone(e.target.value)} type={"text"} placeholder="phone number" className='form-control my-2'/>
                        </div>
                      
                        
                      
                        
                        }
                   
                   
                    <Link to={"/login"}>login</Link>
                </div>
                <div className='card-footer'>
                      <button onClick={Register} className='btn btn-info'>Register</button>
                </div>
            </div>
            <div id='recaptcha-container'>

            </div>
            <ToastContainer/>
        </div>
    );
}

export default SignUp;