import React from 'react';
import Avatar from '../Avatar';
import './Sidebar.css'
function Sidebar(props) {
    return (
        <>
            <div id="sidebar">
                <div className="sidebar__userinfo">
                    <Avatar User={props.User} Width="112px" Height="112px" />
                    <h5>{props.User.name}</h5>
                </div>
                <div className="sidebar__listfeature">
                        <a className="sidebar__feature-item">
                            <i className="fas fa-home"></i>
                            <span>Tổng quan</span>
                        </a>
                        <a className="sidebar__feature-item">
                            <i className="fas fa-list-alt"></i>
                            <span>Khóa học đã đăng ký</span>
                        </a>
                        <a className="sidebar__feature-item">
                            <i className="fas fa-th-list"></i>
                            <span>Khóa học của bạn</span>
                        </a>
                        <a className="sidebar__feature-item">
                            <i className="fas fa-comments"></i>
                            <span>Bình luận</span>
                        </a>
                        <a className="sidebar__feature-item">
                            <i className="fas fa-star"></i>
                            <span>Đánh giá</span>
                        </a>
                </div>
            </div>
        </>
    );
}

export default Sidebar;