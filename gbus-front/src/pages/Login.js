import React, { useState } from 'react';
import { postLogin } from '../api';
import { useNavigate} from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [access_token, setAccess_token] = useState(null)
    
    const navigate = useNavigate();

    const navigateToLogin=()=>{
        navigate("/")
    }
    

    const onUsernameHandler = (event) => {
        setUsername(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        // 버튼만 누르면 리로드 되는것을 막아줌
        event.preventDefault();

        console.log('username', username);
        console.log('Password', password);

    }

    async function handlePostLogin() {
        try {
          const data = await postLogin(username, password);
          setAccess_token(data);
          console.log("pass");
          console.log(access_token);
          navigateToLogin();

        } catch (error) {
          console.error('Error fetching bus stop data:', error.message);
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
                <label>ID</label>
                <input  value={username} onChange={onUsernameHandler}/>
                <label>Password</label>
                <input type='password' value={password} onChange={onPasswordHandler}/>
                <br />
                <button onClick={(handlePostLogin)}>
                    Login
                </button>
                
                
            </form>
        </div>
    )
}

export default Login;