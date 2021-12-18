import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated, styled } from 'react-spring'
import './Navbar.css'
import LoginForm from '../../components/LoginForm';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+\b)/g, ",")
}
moment.locale('vi');
function Navbar({ ShowForm, handleShowForm, User }) {
  const nav = useNavigate();
  const animation = useSpring({
    config: {
      duration: 200
    },
    opacity: ShowForm ? 1 : 0

  })
  const handleLogout = () => {
    axios.get('/api/sign-out').then(() => {
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
  const [noti, setNoti] = useState()
  const updateNoti = async () => {
    const res = await axios.get('/api/get-noti');
    console.log(res)
    setNoti(res.data.message);
  }
  const ReadNoti = async () => {
    if (noti.filter(e => e.READ_STATE == 0).length > 0) {
      const res = await axios.get('/api/read-noti');
      console.log(res)
      if (res.data.status == 200) {
        updateNoti();
      }
    }

  }
  useEffect(() => {
    updateNoti();
  }, [])
  const [searchData,setSearchData] = useState('');
  const handleSearch = async (e) => {
    e.preventDefault();
    nav(`/search/${searchData}`)
  }
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
            <div id="search">
              <div className="input-group">
                <form action="" id="form-search" onSubmit={handleSearch}>
                  <input value={searchData} name="search" id="search-course" className="form-control" 
                  type="text" placeholder="Tìm kiếm khóa học ..." onChange={e=> setSearchData(e.target.value)}/>
                  <span className="input-group-btn">
                    <i className="fas fa-search"></i>
                  </span>
                </form>
              </div>
            </div>
          </div>

          <div className="navbar__user">
            {User.loading && <>
              <a onClick={handleShowForm} className="btn btn__user btn__user--login">Đăng nhập</a>
              <Link to="/login" className="btn btn__user btn__user--signup">Đăng ký</Link>
            </>
            }
            {!User.loading && <>
              <div onClick={ReadNoti} className="navbar__user_notifi">
                <i className="far fa-bell"></i>
                <span className="noti-number">{noti && noti.filter(e => e.READ_STATE == 0).length}</span>
                <div className="notifi-form dropdown-form">
                  <div className="notifi-header">
                    <h4>Thông báo</h4>
                  </div>
                  <div className="notifi-content">
                    <div className="notification">
                      {noti && noti.map(e => <NotiItem key={e.NOTI_ID} Time={e.CREATED_AT} Content={e.CONTENT} Read={e.READ_STATE} />)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="navbar__user__info">
                <div className="navbar__user_avt">
                  <img src={User.avatar || "https://genk.mediacdn.vn/thumb_w/600/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188.png"} alt="" />
                </div>
                <div className="navbar__user_info">
                  <div className="user_info-name">{User.loading == true ? "loading..." : User.FULLNAME}</div>
                  <div className="user_info-money">{User.loading == true ? "loading..." : User.COIN ? formatNumber(User.COIN) : "0"} VND</div>
                </div>
                <ul className="dropdown-form dropdown-menu-user">
                  <li><Link to="/myinfo">Thông tin của tôi</Link></li>
                  <li><Link to={"/profile/" + User.USER_ID}>Hồ sơ của tôi</Link></li>
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
function NotiItem(props) {
  return (
    <div className={`notification__info ${props.Read == 1 ? "read" : ""}`}>
      <div className="info">
        <p style={{ 'fontSize': '18px' }}>{props.Content || ''}</p>
        <p className="time">{props.Time && moment(props.Time, "YYYY-MM-DD HH:mm:ss").fromNow()}</p>
      </div>
    </div>
  )
}