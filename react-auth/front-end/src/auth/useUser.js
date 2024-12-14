import { useEffect, useState } from "react";
import useToken from "./useToken";

function useUser(){
    const [token] = useToken()

    const getPayLodFromToken = token => {
        
        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload))
    }

    const [user, setUser] = useState(()=>{
        if (!token) return null;
        return getPayLodFromToken(token)
    })

    useEffect(()=>{
        if(!token){
            setUser(null)
        }else{
            setUser(getPayLodFromToken(token))
        }

    },[token])
    return user
}
export default useUser