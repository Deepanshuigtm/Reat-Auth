import { useState } from "react";

function useToken(){

    const [token, setTokenInternal] = useState( () =>{
        return localStorage.getItem('token')
    })
    const setToken = newToken =>{
        localStorage.setItem('token', newToken)
        setTokenInternal(newToken)

    }
    return [token, setToken]
}

export default useToken;
