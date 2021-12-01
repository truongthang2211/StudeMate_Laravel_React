import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import './Sidebar.css'

function Sidebar(props) {
    console.log('render sidebar')
    return (
        <>
            <div id="sidebar">
                <div className="sidebar__userinfo">
                    <Avatar User={props.User} Width="112px" Height="112px" />
                    <h5>{props.User.FULLNAME}</h5>
                </div>
                <div className="sidebar__listfeature">
                        <Link to="/course-manage/overview" className="sidebar__feature-item">
                            <i className="fas fa-home"></i>
                            <span>Tổng quan</span>
                        </Link >
                        <Link to="/course-manage/registeredcourse" className="sidebar__feature-item">
                            <i className="fas fa-list-alt"></i>
                            <span>Khóa học đã đăng ký</span>
                        </Link>
                        <Link to="/course-manage/mycourse" className="sidebar__feature-item">
                            <i className="fas fa-th-list"></i>
                            <span>Khóa học của bạn</span>
                        </Link>
                      
                </div>
            </div>
        </>
    );
}

export default (Sidebar);