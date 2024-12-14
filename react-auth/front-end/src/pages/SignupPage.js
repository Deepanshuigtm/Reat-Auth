import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useToken from "../auth/useToken";

function SignupPage(){
    const [token, setToken] = useToken();
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const history = useHistory();

    const onSignClicked = async() => {
        const res = await axios.post('api/signup',{
            email:email,
            password:password
        })
        const { token } = res.data
        setToken(token)
        history.push('/')
    }

    return(
        <div className="content-container">
            <h1>Signup</h1>
            {!errorMessage && <div className="fail">{errorMessage}</div>}
            <input placeholder="someone@hmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
            <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <input placeholder="password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            <hr/>
            <button disabled={!email || !password || password !== confirmPassword} onClick={onSignClicked}>Signup</button>
            <button onClick={() => history.push('/forgot-password')}>Forgot Password</button>
            <button onClick={() => history.push('/login')}>Sign In</button>
        </div>
    )
}
export default SignupPage;