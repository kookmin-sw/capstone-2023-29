import React, { useState } from 'react';
import { postRegister } from '../api';
import { useNavigate } from 'react-router-dom';
import './login.css';

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
            width: '100%', height: '100vh', backgroundColor: '#E2615B'
            }}>
            <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', height: '100%', justifyContent: 'space-between'}}
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
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'
                }}>
                    <input className='user_id_input' placeholder='EMAIL' type='email' value={email} onChange={onEmailHandler}/>
                    <input className='user_id_input' placeholder='ID' value={username} onChange={onNameHandler}/>
                    <input className='user_id_input' placeholder='PASSWORD' type='password' value={password} onChange={onPasswordHandler}/>
                    <input className='user_id_input' placeholder='CONFIRM PASSWORD' type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                    <button className='login_button' onClick={(handlePostRegister)} style={{marginTop: '40px'}}>
                        회원가입
                    </button>
                </div>

                <div style={{
                    width: '90%', marginBottom: '40px'
                }}>
                    <button 
                    className='buttom_button'
                    onClick={(navigateToLogin)} >BACK</button>
                </div>


                {access_token && <div>{JSON.stringify(access_token)}</div>}
            </form>
        </div>
    )
}


export default SignUp;