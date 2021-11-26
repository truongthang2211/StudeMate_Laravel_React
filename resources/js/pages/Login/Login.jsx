import React, { useEffect, memo } from 'react';
import SignUpForm from '../../components/SignUpForm';

import './Login.css'
function Login() {
 
    const revealAnimations = () => {
        const sr = window.sr = ScrollReveal()
        sr.reveal('.feature', {
            duration: 600,
            distance: '20px',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            origin: 'right',
            viewFactor: 0.2
        })
    }
    const LoginLoad = () => {
        const body = document.getElementById('root2')
        if (!body.classList.contains('is-loaded')) {
            body.classList.add('is-loaded')
            revealAnimations()

        }
    }
    const FocusSignUp = () => {
        document.getElementsByName('username')[0].focus()

    }
    useEffect(() => {
        LoginLoad();
    })
    console.log('render login-page')
    return (
        <>
            <div className="is-boxed has-animations" id="root2">
                <div className="body-wrap boxed-container">
                    <header className="site-header">
                        <div className="container">
                            <div className="site-header-inner">
                                <div className="brand header-brand">
                                    <h1 className="m-0">
                                        <a href="#">
                                            <img className="header-logo-image asset-light" src="img/login/logo-light.svg"
                                                alt="Logo" />

                                        </a>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main>
                        <section className="hero">
                            <div className="container">
                                <div className="hero-inner">
                                    <SignUpForm/>
                                    <div className="hero-media">
                                        <div className="header-illustration">
                                            <img className="header-illustration-image asset-light"
                                                src="img/login/header-illustration-light.svg" alt="Header illustration" />
                                        </div>
                                        <div className="hero-media-illustration">
                                            <img className="hero-media-illustration-image asset-light"
                                                src="img/login/hero-media-illustration-light.svg"
                                                alt="Hero media illustration" />
                                        </div>
                                        <div className="hero-media-container">
                                            <img className="hero-media-image asset-light" src="https://ih1.redbubble.net/image.1744015318.0248/st,small,507x507-pad,600x600,f8f8f8.jpg"
                                                alt="Hero media" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="features section">
                            <div className="container">
                                <div className="features-inner section-inner has-bottom-divider">
                                    <div className="features-header text-center">
                                        <div className="container-sm">
                                            <h2 className="section-title mt-0">The Product</h2>
                                            <p className="section-paragraph">Lorem ipsum is common placeholder text used to
                                                demonstrate the graphic elements of a document or visual presentation.</p>
                                            <div className="features-image">


                                                <img className="features-illustration asset-light"
                                                    src="img/login/features-illustration-light.svg"
                                                    alt="Feature illustration" />
                                                <img className="features-box asset-light" src="img/login/features-box-light.svg"
                                                    alt="Feature box" />
                                                <img className="features-illustration asset-light"
                                                    src="img/login/features-illustration-top-light.svg"
                                                    alt="Feature illustration top" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="features-wrap">
                                        <div className="feature is-revealing">
                                            <div className="feature-inner">
                                                <div className="feature-icon">
                                                    <img className="asset-light" src="img/login/feature-01-light.svg"
                                                        alt="Feature 01" />

                                                </div>
                                                <div className="feature-content">
                                                    <h3 className="feature-title mt-0">Cộng đồng lớn</h3>
                                                    <p className="text-sm mb-0">Các khóa học StudyMate dựa trên sự đóng góp của mỗi cá nhân.
                                                        Bất kỳ ai cũng có thể chia sẻ những kiến thức bổ ích của mình đến với mọi người.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="feature is-revealing">
                                            <div className="feature-inner">
                                                <div className="feature-icon">
                                                    <img className="asset-light" src="img/login/feature-02-light.svg"
                                                        alt="Feature 02" />

                                                </div>
                                                <div className="feature-content">
                                                    <h3 className="feature-title mt-0">Bài giảng chất lượng</h3>
                                                    <p className="text-sm mb-0">Mỗi khóa học đều được phê duyệt chặt chẽ, đảm báo chất lượng trước khi được đăng tải.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="feature is-revealing">
                                            <div className="feature-inner">
                                                <div className="feature-icon">
                                                    <img className="asset-light" src="img/login/feature-03-light.svg"
                                                        alt="Feature 03" />

                                                </div>
                                                <div className="feature-content">
                                                    <h3 className="feature-title mt-0">Trực tuyến</h3>
                                                    <p className="text-sm mb-0">Học mọi lúc, mọi nơi. Miễn là bạn có kết nối mạng.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="cta section">
                            <div className="container-sm">
                                <div className="cta-inner section-inner">
                                    <div className="cta-header text-center">
                                        <h2 className="section-title mt-0">Đăng ký ngay</h2>
                                        <p className="section-paragraph">Nếu ta không gieo trồng tri thức khi còn trẻ, nó sẽ không cho ta bóng râm khi ta về già.</p>
                                        <div className="cta-cta">

                                            <a className="button button-primary" onClick={FocusSignUp}>Đăng ký</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>

                    <footer className="site-footer has-top-divider">
                        <div className="container">
                            <div className="site-footer-inner">
                                <div className="brand footer-brand">
                                    <a href="#">
                                        <img className="asset-light" src="img/login/logo-light.svg" alt="Logo" />
                                    </a>
                                </div>
                                <ul className="footer-links list-reset">
                                    <li>
                                        <a href="#">Contact</a>
                                    </li>
                                    <li>
                                        <a href="#">About us</a>
                                    </li>
                                    <li>
                                        <a href="#">FAQ's</a>
                                    </li>
                                    <li>
                                        <a href="#">Support</a>
                                    </li>
                                </ul>
                                <ul className="footer-social-links list-reset">
                                    <li>
                                        <a href="#">
                                            <span className="screen-reader-text">Facebook</span>
                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z"
                                                    fill="#FFF" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="screen-reader-text">Twitter</span>
                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z"
                                                    fill="#FFF" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="screen-reader-text">Google</span>
                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z"
                                                    fill="#FFF" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                                <div className="footer-copyright">&copy; 2018 Switch, all rights reserved</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

        </>
    );
}

export default memo(Login);