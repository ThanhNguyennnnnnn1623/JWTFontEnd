import React, { useEffect, useState } from 'react';
import './Login.scss'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom'
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userservice';
import { UserContext } from '../../context/userContext';


const Login = (props) => {
    const { user, loginContext } = React.useContext(UserContext)

    let history = useHistory();

    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput)

    const handleCreateNewAccount = () => {
        history.push('/register')
    }

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput)
        if (!valueLogin) {
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false })
            toast.error('Please enter your email address or phone number');
            return;
        }
        if (!password) {
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false })
            toast.error('Please enter your password');
            return;
        }
        let response = await loginUser(valueLogin, password);
        if (response && +response.EC === 0) {
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token
            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username }
            }
            localStorage.setItem('jwt', token)
            loginContext(data)
            history.push('/users')
        }
        if (response && +response.EC !== 0) {
            toast.error(response.EM)
        }
        console.log('check response: ', response.data);
    }

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleLogin();
        }
    }
    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/')
        }
    }, [])

    return (
        <div className="login-container">
            <div>
                <div className="container">
                    <div className="row px-3 px-sm-0">
                        <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                            <div className='brand'>
                                <Link to='/'>Thanh Nguyen JWT</Link>
                            </div>
                            <div className='detail'>
                                Thanh Nguyen JWT helps you connect and share with the people in your life
                            </div>
                        </div>
                        <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
                            <div className='brand d-sm-none'>
                                Thanh Nguyen JWT
                            </div>
                            <input
                                type='text'
                                className={objValidInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Email address or phone number'
                                value={valueLogin}
                                onChange={(event) => setValueLogin(event.target.value)}
                            />
                            <input
                                type='password'
                                className={objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onKeyPress={(event) => handlePressEnter(event)}
                            />
                            <button className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
                            <span className='text-center'>
                                <a href='#' className='forgot-password'>Forgot your password?</a>
                            </span>
                            <hr />
                            <div className='text-center'>
                                <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                                    Create new account
                                </button>
                                <div className='mt-3 return'>
                                    <Link to='/'>
                                        <i className='fa fa-arrow-circle-left'></i>
                                        <span title='Return to HomePage'>Return to HomePage</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login