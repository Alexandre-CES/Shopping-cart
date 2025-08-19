import { JSX, useEffect, useState } from 'react';
import { PrivateProps } from '../models/PrivateProps';
import { auth } from '../services/firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

/*
    if user is logged, return the children(Page to be loaded), else navigate to login page
*/
export default function Private({children}:PrivateProps): JSX.Element | null{
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(()=>{

        //auth
        const unsub = onAuthStateChanged(auth,(user)=>{
            if(user){
                const userData = {  
                    uid: user.uid,
                    email: user.email
                };

                localStorage.setItem('@detailUser',JSON.stringify(userData));
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