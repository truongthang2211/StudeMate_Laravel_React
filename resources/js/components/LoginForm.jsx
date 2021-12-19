import Swal from 'sweetalert2';
import { React, useRef, useEffect, useState } from 'react';
function LoginForm({ handleShowForm, setUser }) {
    const loginRef = useRef()
    const closeForm = (e) => {
        if (loginRef.current === e.target) {
            handleShowForm();
        }
    }

    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    console.log('render login-form')
    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Checking...",
            text: "Please wait",
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false
        })
        axios.post('/api/sign-in', state)
            .then(function (response) {
                if (response.data.status == 200) {
                    window.location.reload();
                }else{
                    Swal.fire({
                        text: response.data.message,
                        icon: 'error',
                        confirmButtonText: 'Hay'
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    useEffect(() => {
        document.getElementById('username_login').focus()
    }, [])
    return ((
        <div ref={loginRef} onClick={closeForm}>
            <div className="wrap-form-head-register">
                <div className="form-head-register">
                    <div className="forms-container">
                        <form onSubmit={handleSubmit} id="signin-form">
                            <div className="close-icon">
                                <i onClick={handleShowForm} className="fas fa-times"></i>
                            </div>
                            <h2 className="title">Sign In</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input autoFocus type="text" id="username_login" name="username" placeholder="Username" onChange={handleInput} value={state.username} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" id="password_login" name="password" placeholder="Password" onChange={handleInput} value={state.password} />
                            </div>
                            <button type="submit" className="button solid">Sign In</button>
                            <p className="socil-text">Or Sign In with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon social-icon__facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="/google/redirect" className="social-icon social-icon__google">
                                    <i className="fab fa-google"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>));
}

export default LoginForm;