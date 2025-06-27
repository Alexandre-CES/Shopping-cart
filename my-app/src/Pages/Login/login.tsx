import { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return(
        <main className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="inputEmail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
            </form>
        </main>
    )
}