import React from 'react';
import { Link } from 'react-router-dom';
import './Course.css'
export default function Course({ User }) {
    return (
        <>
            <div id="main">
                <div className="grid">
                    <div className="grid__row">
                        <div className="grid__column-8">
                            <div className="course-content">
                                <div className="course-info">
                                    <div className="course-summary">
                                        <h1 className="course-summary-title">Node & ExpressJS</h1>
                                        <p className="course-summary-intro">
                                            Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end và xây dựng RESTful API cho trang web.
                                        </p>
                                    </div>
                                    <div className="course-gain">
                                        <h4 className="course-gain-title">Bạn sẽ học được gì</h4>
                                        <div className="course-gain-list">
                                            <ul className="fa-ul">
                                                <li><i className="fa-li fa fa-check"></i>Nắm chắc lý thuyết chung trong việc xây dựng web</li>
                                                <li><i className="fa-li fa fa-check"></i>Xây dựng web với Express bằng kiến thức thực tế</li>
                                                <li><i className="fa-li fa fa-check"></i>Nắm chắc lý thuyết về API và RESTful API</li>
                                                <li><i className="fa-li fa fa-check"></i>Nắm chắc khái niệm về giao thức HTTP</li>
                                                <li><i className="fa-li fa fa-check"></i>Học được cách tổ chức code trong thực tế</li>
                                                <li><i className="fa-li fa fa-check"></i>Biết cách làm việc với Mongoose, MongoDB trong NodeJS</li>
                                                <li><i className="fa-li fa fa-check"></i>Biết cách xây dựng API theo chuẩn RESTful API</li>
                                                <li><i className="fa-li fa fa-check"></i>Được chia sẻ lại kinh nghiệm làm việc thực tế</li>
                                                <li><i className="fa-li fa fa-check"></i>Hiểu rõ tư tưởng và cách hoạt động của mô hình MVC</li>
                                                <li><i className="fa-li fa fa-check"></i>Biết cách deploy (triển khai) website lên internet</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="course-detail">
                                    <h3 className="course-detail-title">Nội dung khóa học</h3>
                                    <ul className="course-detail-summary">
                                        <li>3 phần</li>
                                        <li className="divider">.</li>
                                        <li>36 bài học</li>
                                        <li className="divider">.</li>
                                        <li>Thời lượng 12 giờ 08 phút</li>
                                    </ul>
                                    <div className="course-detail-list">
                                        <div className="list">
                                            <div className="list-title">
                                                <span className="main-title">1. Bắt đầu</span>
                                                <span className="video-count">8 bài học</span>
                                            </div>
                                            <div className="list-collapse">
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>1. Lời khuyên trước khóa học</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>2. HTTP protocol</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>3. SSR & CSR</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>4. Install Node</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>5. Install ExpressJS</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>6. Install Nodemon & inspector</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>7. Add git repo</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>8. Install Morgan</div>
                                            </div>
                                        </div>
                                        <div className="list">
                                            <div className="list-title">
                                                <span className="main-title">2. Kiến thức cốt lõi</span>
                                                <span className="video-count">8 bài học</span>
                                            </div>
                                            <div className="list-collapse">
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>9. Template engine (handlebars)</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>10. Static file & SCSS</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>11. Use Bootstrap</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>12. Basic routing</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>13. GET method</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>14. Query parameters</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>15. Form default behavior</div>
                                                <div className="collapse-item"><i className="fas fa-play-circle"></i>16. POST method</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="course-require">
                                    <h3 className="require-title">Yêu cầu</h3>
                                    <ul className="fa-ul">
                                        <li><i className="fa-li fa fa-check"></i>Có kiến thức cơ bản về HTML, CSS và Javascript</li>
                                        <li><i className="fa-li fa fa-check"></i>Nắm chắc các tính năng trong Javascript ES6</li>
                                        <li><i className="fa-li fa fa-check"></i>Có hiểu biết về lập trình bất đồng bộ trong Javascript</li>
                                        <li><i className="fa-li fa fa-check"></i>Sở hữu máy tính kết nối internet HDH Windows, Ubuntu hoặc MacOS</li>
                                        <li><i className="fa-li fa fa-check"></i>Ý thức cao, trách nhiệm cao trong việc tự học. Thực hành lại sau mỗi bài học</li>
                                        <li><i className="fa-li fa fa-check"></i>Khi học nếu có khúc mắc hãy tham gia hỏi/đáp tại group FB: Học lập trình web (fullstack.edu.vn)</li>
                                        <li><i className="fa-li fa fa-check"></i>Bạn không cần biết gì hơn nữa, trong khóa học tôi sẽ chỉ cho bạn những gì bạn cần phải biết</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="grid__column-4">
                            <div className="course-purchase">
                                <div className="course-thumb">
                                    <img src="img/courses/6.png" alt="course-thumb" className="center" />
                                    <i className="fas fa-play-circle"></i>
                                    <p>Xem giới thiệu khóa học</p>
                                </div>
                                <h5 className="course-fee">Miễn phí</h5>
                                <Link to="/learn" className="course-btn">ĐĂNG KÝ HỌC</Link>
                                <ul>
                                    <li>
                                        <i className="fas fa-seedling"></i>
                                        <span>Trình độ cơ bản</span>
                                    </li>
                                    <li>
                                        <i className="fas fa-film"></i>
                                        <span>
                                            Tổng số <strong>36</strong> bài học
                                        </span>
                                    </li>
                                    <li>
                                        <i className="fas fa-clock"></i>
                                        <span>
                                            Thời lượng <strong>12 giờ 08 phút</strong>
                                        </span>
                                    </li>
                                    <li>
                                        <i className="fas fa-battery-full"></i>
                                        <span>Học mọi lúc mọi nơi</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}