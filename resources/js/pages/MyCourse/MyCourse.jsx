import React from 'react';
function MyCourse() {
    return (
        <div id="main">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__column-8">
                        <div className="course-content">
                            <div className="course-info">
                                <div className="course-summary">
                                    <h1 className="course-summary-title">Node & ExpressJS</h1>
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
                        </div>
                    </div>
                    <div className="grid__column-4">
                        <div className="course-purchase">
                            <div className="course-thumb">
                                <img src="img/courses/6.png" alt="course-thumb" className="center" />
                                <i className="fas fa-play-circle"></i>
                            </div>
                            <ul>
                                <li>
                                    <i className="fas fa-seedling"></i>
                                    <span>Hoa hồng <strong>80%</strong></span>
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
                                    <i className="fas fa-users"></i>
                                    <span><strong>36</strong> người đã đăng ký khóa học</span>
                                </li>
                                <li>
                                    <i className="fas fa-money-bill-wave"></i>
                                    <span><strong>18,000,000 VND</strong> đã kiếm được</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyCourse;