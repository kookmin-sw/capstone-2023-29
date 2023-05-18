import React, { useState } from 'react';
import { postLogin } from '../api';
import { useNavigate} from 'react-router-dom'
import './login.css';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [access_token, setAccess_token] = useState(null)

    const navigate = useNavigate();

    const navigateToLogin=()=>{
        navigate("/")
    }
    const navigateToSignup=()=>{
        navigate("/signup")
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
          console.log(data.access_token);
          setAccess_token(JSON.stringify(data.access_token));
          console.log("pass");
          console.log(access_token);

          if(data){
            localStorage.setItem('token',data.access_token)
            navigateToLogin();
          }

        } catch (error) {
          console.error('Error fetching bus stop data:', error.message);
        }
    }

    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh', backgroundColor: '#E2615B'
            }}>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%'}}
                onSubmit={onSubmitHandler}
            >
                <div style={{
                    justifyItems: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '140px'
                    }}>

                    <img src='/logo1.svg' alt='logo' style={{
                        width: '105px', height: '55px', justifyContent: 'center', alignItems:'center'
                    }}/>

                </div>
                
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '100px'
                }}>
                    <input className='user_id_input' placeholder='ID' value={username} onChange={onUsernameHandler}/>
                    
                    <input className='user_id_input' placeholder='PASSWORD' type='password' value={password} onChange={onPasswordHandler}/>
                    <br />
                    <button className='login_button' onClick={(handlePostLogin)}>
                        LOGIN
                    </button>
                </div>


                <div style={{
                    display: 'flex', justifyContent: 'space-between', paddingBottom: '40px', width: '80%'
                }}>
                    <button 
                    className='buttom_button'
                    onClick={(navigateToLogin)}>
                        START
                    </button>
                    <button className='buttom_button' onClick={(navigateToSignup)}>
                        SIGN UP
                    </button>

                </div>  
                
            </form>
        </div>
    )
}

export default Login;