import React, { useEffect, memo } from 'react';
import SignUpForm from '../../components/SignUpForm';
import Footer from '../../components/Footer';

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
                                    <SignUpForm />
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
                                            <img className="hero-media-image asset-light" src="\img\courses\register.PNG"
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
                                            <h2 className="section-title mt-0">Studymate - Tương lai tốt hơn bắt đầu từ đây</h2>
                                            <p className="section-paragraph">Studymate phát triển một môi trường học trực tuyến cung cấp các khóa học ở nhiều lĩnh vực khác nhau.
                                                Kết nối những người có cùng chung niềm đam mê để cùng nhau xây dựng một cộng đồng lớn mạnh.</p>
                                            <div className="features-image">


                                                <img className="features-illustration asset-light"
                                                    src="img/login/features-illustration-light.svg"
                                                    alt="Feature illustration" />
                                                {/* <img className="features-box asset-light" src="img/login/features-box-light.svg"
                                                    alt="Feature box" /> */}
                                                <img className="features-box asset-light" src="https://thumbs.dreamstime.com/b/join-us-hand-drawn-illustration-cartoon-style-holding-sign-red-white-join-us-hand-drawn-illustration-cartoon-style-holding-153300538.jpg"
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

                    
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default memo(Login);