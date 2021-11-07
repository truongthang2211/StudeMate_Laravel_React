import React from 'react';
import './Profile.css'
function Profile({User}) {
    return (
        <>
        
        <div className="all-profile">
            <link rel="stylesheet" href="css/override-container.css" />
            <div className="profile-background">
                <video playsInline={true} autoPlay={true} muted={true} loop={true} poster="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1406990/382344e97a4587c1773728480610d76dba4eb9f3.jpg" __idm_id__="355172354">
                    <source src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1406990/a1c4a5d166c2086d43990c56bbc6a8d5bac7445e.webm" type="video/webm" />
                    <source src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1406990/ad94df4fcc8a92d50bef360c6ca0516a31a51299.mp4" type="video/mp4" />

                </video>
            </div>
            <div className="container main-profile">

                <div className="profile-header">
                    <div className="profile-avt">
                        <img src={User.avatar || "https://genk.mediacdn.vn/thumb_w/600/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188.png"} />
                    </div>
                    <div className="profile-personalinfo">
                        <div className="profile-name">
                            <span>{User.name}</span>
                        </div>
                        <div className="profile-info">
                            <ul className="profile-info-section">
                                <li>
                                    <span>
                                        <i className="far fa-envelope"></i>
                                    </span>
                                    <span>{User.email}</span>
                                </li>
                                <li>
                                    <span>
                                        <i className="fas fa-mobile-alt"></i>
                                    </span>
                                    <span>0123465789</span>
                                </li>
                                <li>
                                    <span>
                                        <i className="fas fa-map-marker-alt"></i>
                                    </span>
                                    <span>Hồ Chí Minh - Vietnam</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="profile-badgeinfo">
                        <div className="profile-level">
                            <span className="h4">Level</span>
                            <span className="level">5</span>
                        </div>
                        <div className="profile-exp">
                            <div className="current-progress">
                                <div className="standard-progress-bar" >
                                    <div className="background" style={{'width': '68.5333%'}}>
                                        <div className="background-render"></div>
                                    </div> <span className="text" >205.6/300</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-content">
                    <div className="col-md-9 col-sm-12 left-content">
                        <div className="recent-learn">
                            <h3>Hoạt động gần đây</h3>
                            <div className="course-section">
                                <div className="course-item">
                                    <div className="course-avt">
                                        <img src="https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg" alt="" />
                                    </div>
                                    <div className="course-info">
                                        <div className="course-info-title">
                                            <a href="#">
                                                <h4>Java căn bản</h4>
                                            </a>
                                        </div>
                                        <div className="course-info-author">
                                            <a href="#">
                                                <p>Nguyễn Văn Ây</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="course-item">
                                    <div className="course-avt">
                                        <img src="	https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/adbef92753d242bcb79ca8f74cd615a5.jpg" alt="" />
                                    </div>
                                    <div className="course-info">
                                        <div className="course-info-title">
                                            <a href="#">
                                                <h4>SQL căn bản</h4>
                                            </a>
                                        </div>
                                        <div className="course-info-author">
                                            <a href="#">
                                                <p>Nguyễn Văn Bi</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 white right-content">
                        <div className="course-profile-info">
                            <h3>Khóa học</h3>
                            <div className="learnt-course">
                                <a href="#">Khóa học đã học</a>
                                <span>5</span>
                            </div>
                            <div className="upped-course">
                                <a href="#">Khóa học đã đăng</a>
                                <span>2</span>
                            </div>
                        </div>
                        <div className="life-info">
                            <div className="user-achievement">
                                <h3>Thành tích</h3>
                            </div>
                            <div className="user-exp">
                                <h5>Kinh nghiệm</h5>
                            </div>
                            <div className="user-shcool">
                                <h5>Học vấn</h5>
                                <div className="section-info-content">
                                    <div className="info-number"> <span className="circle"></span>
                                        <span className="circle"></span>
                                        <p className="time">01/01/2020 - 29/07/2020</p>
                                        <b className="title" title="">Đại học Công nghệ thông tin - Đại Học Quốc Gia HCM</b>
                                        <p className="description">Hệ Thống Thông Tin</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>);
}

export default Profile;