import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../firebaseConfig';
import {useNavigate} from 'react-router-dom'
function Login(props) {

   const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    function login(){
  signInWithEmailAndPassword(auth,email,password).then((res)=>{
    localStorage.setItem("token",res.user.uid)
    navigate("/admin")
  })
    }
    return (
        <div>
            <div className='card w-50 offset-4'>
                <div className='card-header '>
                    LOGIN
                    
                </div>
                <div className='card-body '>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type={"text"} placeholder="email" className='form-control my-2'/>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type={"password"} placeholder="password" className='form-control my-2'/>
                    <Link to={"/signUp"}>Create your new account</Link>
                </div>
                <div className='card-footer'>
                      <button onClick={login} className='btn btn-info'>login</button>
                </div>
            </div>
            
        </div>
    );
}

export default Login;