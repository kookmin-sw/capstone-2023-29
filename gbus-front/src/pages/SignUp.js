import React, { useState } from 'react';
import { postRegister } from '../api';
import { useNavigate } from 'react-router-dom';

function SignUp(props) {


    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [access_token, setAccess_token] = useState(null);
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const navigateToLogin=()=>{
        navigate("/login")
    }
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setUsername(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
        

    }
}

    async function handlePostRegister() {
        try {
          const data = await postRegister(username,email, password);
          console.log("pass")
          setAccess_token(data);
          console.log("resister");
          console.log(JSON.stringify(access_token))
          navigateToLogin();
        } catch (error) {
          console.error('Error fetching register:', error.message);
        }
      }


    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh'
            }}>
            <form style={{ display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <h1>자리있어?</h1>
                <label>Email</label>
                <input type='email' value={email} onChange={onEmailHandler}/>
                <label>ID</label>
                <input value={username} onChange={onNameHandler}/>
                <label>Password</label>
                <input type='password' value={password} onChange={onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <br />
                <button onClick={(handlePostRegister)}>
                    회원가입
                </button>
                {access_token && <div>{JSON.stringify(access_token)}</div>}
            </form>
        </div>
    )
}


export default SignUp;