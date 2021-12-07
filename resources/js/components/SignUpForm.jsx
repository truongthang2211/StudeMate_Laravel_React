import React, { useEffect, useState, memo, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default memo(function SignUpForm() {
    const signupref = useRef();
    const FocusSignUp = () => {
        document.getElementsByName('username')[0].focus()
    }
    let SignUpButton ;
    useEffect(() => {

        SignUpButton = document.getElementsByClassName('btn__user--signup')[0]
        SignUpButton.addEventListener('click', FocusSignUp)
        return () => {
            SignUpButton.removeEventListener('click', FocusSignUp)
        }
    }, [])
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        signupref.current.disabled = true;
        axios.post('/api/sign-up', state)
            .then(async (response) => {
                if (response.data.status == 200) {
                    await Swal.fire({
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'Hay'
                    })
                    window.location.reload()
                } else {
                    console.log(response)
                    Swal.fire({
                        text: response.data.message,
                        icon: 'error',
                        confirmButtonText: 'Hay'
                    })
                }
                signupref.current.disabled = false;

            })
            .catch(function (error) {
                Swal.fire({
                    text: error,
                    icon: 'error',
                    confirmButtonText: 'Hay'
                })
                signupref.current.disabled = false;

            })
    }
    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="wrap-form-head-register">
            <div className="form-head-register">
                <div className="forms-container">
                    <form action="#" id="signup-form" onSubmit={handleSubmit}>
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input autoFocus type="text" required onChange={handleInput} value={state.username} name="username" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" required onChange={handleInput} value={state.email} name="email" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" required onChange={handleInput} value={state.password} name="password" placeholder="Password" />
                        </div>
                        <button ref={signupref} type="submit" className="button solid">Sign Up</button>
                        <p className="socil-text">Or Sign Up with social platforms</p>
                        <div className="social-media">
                            <a href="#" className="social-icon social-icon__facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-icon social-icon__google">
                                <i className="fab fa-google"></i>
                            </a>

                        </div>
                    </form>
                </div>
            </div>
        </div>);
})

