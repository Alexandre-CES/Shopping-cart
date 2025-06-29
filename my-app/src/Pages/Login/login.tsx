import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConnection';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function login(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(email != '' && password != ''){
            await signInWithEmailAndPassword(auth,email,password)
            .then(()=>{
                navigate('/',{replace:true});
            }).catch((err)=>{
                console.log('error: '+err);
            });
        }else{
            alert('fill the fields');
        }
    }
    
    return(
        <main className="container">
            <form onSubmit={login}>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="inputEmail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit">Login</button>
                <Link to={'/register'}>Register</Link>
            </form>
        </main>
    )
}