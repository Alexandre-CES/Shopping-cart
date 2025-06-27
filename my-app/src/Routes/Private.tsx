import { JSX, useEffect, useState } from 'react';
import { PrivateProps } from '../Types/PrivateProps';
import { auth } from '../firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

export default function Private({children}:PrivateProps): JSX.Element | null{
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            if(user){
                const userData = {  
                    uid: user.uid,
                    email: user.email
                };

                localStorage.setItem('@detail',JSON.stringify(userData));
                setLoading(false);
                setSigned(true);
            }else{
                setLoading(false);
                setSigned(false);
            }
        })

        return () => unsub();
        
    },[]);

    if (loading) return <div></div>

    if(!signed) return <Navigate to={'/login'}/>

    return <>{children}</>;
} 