import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated, styled } from 'react-spring'
import './Navbar.css'
import LoginForm from '../../components/LoginForm';
import axios from 'axios';
function Navbar({ ShowForm, handleShowForm, User }) {
 
  const animation = useSpring({
    config: {
      duration: 200
    },
    opacity: ShowForm ? 1 : 0

  })
  const handleLogout = () =>{
    axios.get('/api/sign-out').then(()=>{
      window.location.reload();
    })
  }
  useEffect(() => {
    const Menu_bar = document.getElementById('Menu-btn');
    const Menu_box = document.getElementById('navbarNav');
    const Mask = document.getElementById('mask')
    Menu_bar.onClick = function () {
      var isClose = Menu_box.style.left === '-350px' || Menu_box.style.left === '';
      if (isClose) {
        Menu_box.style.left = '0';
        Mask.style.visibility = 'visible';
        Mask.style.zIndex = '98';
        Mask.style.opacity = '.6';

      }
    }
    Mask.onClick = () => {
      Menu_box.style.left = '-350px'
      Mask.style.zIndex = '-1';
      Mask.style.opacity = '0';
      Mask.style.visibility = 'hidden';
    }
  }, [])

  return (
    <>
      {ShowForm &&
        <animated.div style={animation} className="login-form">
          <LoginForm handleShowForm={handleShowForm} />
        </animated.div>
      }
      <header className="navbar navbar-expand-lg navbar-light sticky-top">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <span>StudyMate</span>
          </Link>
          <div id="mask"></div>

          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#" className="nav-link">Khóa học</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Xếp hạng</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">FAQS</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Tài trợ</a>
              </li>
            </ul>
          </div>

          <div className="navbar__user">
            {User.loading && <>
              <a onClick={handleShowForm} className="btn btn__user btn__user--login">Đăng nhập</a>
              <Link to="/login" className="btn btn__user btn__user--signup">Đăng ký</Link>
            </>
            }
            {!User.loading && <>
              <div className="navbar__user_notifi">
                <i className="far fa-bell"></i>
                <span className="noti-number">0</span>
                <div className="notifi-form dropdown-form">
                  <div className="notifi-header">
                    <h4>Thông báo</h4>
                  </div>
                  <div className="norifi-content">
                    <div className="notification">
                      <div className="notification__info">
                        <a className="info_avatar">
                          <img src="https://genk.mediacdn.vn/thumb_w/600/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188.png" alt="" />
                        </a>
                        <div className="info">
                          <p style={{ 'fontSize': '14px' }}>
                            <a href="/user/profile/2" target="_blank">SW (Bá)</a> đã phản hồi bình luận của bạn trên
                            <a href="/thread/request-update-don-t-starve-together-1195?commentId=11365#div-comment" target="_blank">[Request Update] Don't Starve Together</a></p>
                          <p className="time">9 tháng trước</p>
                        </div>
                      </div></div>
                  </div>
                </div>
              </div>
              <div className="navbar__user__info">
                <div className="navbar__user_avt">
                  <img src={User.avatar || "https://genk.mediacdn.vn/thumb_w/600/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188.png"} alt="" />
                </div>
                <div className="navbar__user_info">
                  <div className="user_info-name">{User.loading==true?"loading...":User.FULLNAME}</div>
                  <div className="user_info-money">1.500 VND</div>
                </div>
                <ul className="dropdown-form dropdown-menu-user">
                  <li><Link to="/myinfo">Thông tin của tôi</Link></li>
                  <li><Link to="/profile">Hồ sơ của tôi</Link></li>
                  <li><Link to="/course-manage/overview">Quản lý khóa học</Link></li>
                  <li><Link to="/create-course">Tạo khóa học</Link></li>
                  <li><a id="cick-logoff" onClick={handleLogout} href="#">Thoát</a></li>
                </ul>
              </div>
            </>
            }
          </div>
          <button
            type="button" id="Menu-btn"
            className="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <script src="<?php echo URL_ROOT?>/public/assets/js/Menu.js"></script>
      </header>
    </>
  );
}

export default Navbar;