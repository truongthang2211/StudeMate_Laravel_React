import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import './Profile.css'

function Profile({ User }) {

    const [courseItem, setCourseItem] = useState([]);
    const [courseInfo, setCourseInfo] = useState([]);

    useEffect(() => {
        showCourseInfo();
        setCourseItem([
            {
                COURSE_ID: 1,
                COURSE_NAME: 'một chấm',
            },
            {
                COURSE_ID: 2,
                COURSE_NAME: 'hai chấm ',
            },

        ])
    }, []);

    // useEffect(() => {
    //     axios.get('/api/get-course-item', User).then(res => {
    //         console.log(res);
    //         if (res.data.status === 200) {
    //             setCourseItem(res.data.courses);
    //         }
    //     });
    // }, []);

    const showCourseInfo = async () => {
        try {
            const res = await axios.get(`/api/get-course-info`, User);
            console.log(res);
            setCourseInfo([
                learntCourse = res.data.learntCourse,
                uppedCourse = res.data.uppedCourse,
            ]);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <div className="all-profile">
                <link rel="stylesheet" href="css/override-container.css" />
                <div className="profile-background">
                    <img src={User.BACKGROUND_IMG || "https://c.wallhere.com/photos/78/3f/FeelsBadMan_Pepe_meme_memes-43635.png!d"} alt="" />
                </div>
                <div className="container main-profile">
                    <ProfileHeader User={User} />
                    <div className="profile-content">
                        <div className="col-md-9 col-sm-12 left-content">
                            <div className="recent-learn">
                                <h3>Hoạt động gần đây</h3>
                                <div className="course-section">
                                    {courseItem.map(course => (
                                        <ProfileCourseItem
                                            key={course.COURSE_ID}
                                            courseItem={course}
                                        />
                                    ))}


                                    {/* <div className="course-item">
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
                                    </div> */}
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
                                    <span>{courseInfo.uppedCourse}</span>
                                </div>
                            </div>
                            <div className="life-info">
                                <div className="user-achievement">
                                    <h3>Thành tích</h3>
                                </div>
                                {/* <div className="user-exp">
                                <h5>Kinh nghiệm</h5>
                            </div> */}
                                <div className="user-shcool">
                                    <h5>Học vấn</h5>
                                    <div className="section-info-content">
                                        <div className="info-number"> <span className="circle"></span>
                                            <span className="circle"></span>
                                            <b className="title" title="">{User.SCHOOL || ""}</b>
                                            <p className="description"></p>
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
export function ProfileHeader({ User }) {
    let city_name = '';

    useEffect(() => {
        axios.get('/api/get-city', User).then(res => {
            console.log(res);
            if (res.data.status === 200) {
                city_name = res.data.city.CITY_NAME;
                console.log(res.data.city.CITY_NAME);
            }
        });

    }, []);
    return (
        <div className="profile-header">
            <Avatar User={User} Width="200px" Height="200px" />
            <div className="profile-personalinfo">
                <div className="profile-name">
                    <span>{User.FULLNAME}</span>
                </div>
                <div className="profile-info">
                    <ul className="profile-info-section">
                        <li>
                            <span>
                                <i className="far fa-envelope"></i>
                            </span>
                            <span>{User.EMAIL}</span>
                        </li>
                        <li>
                            <span>
                                <i className="fas fa-mobile-alt"></i>
                            </span>
                            <span>{User.PHONE || ""}</span>
                        </li>
                        <li>
                            <span>
                                <i className="fas fa-map-marker-alt"></i>
                            </span>
                            <span>{city_name || "Hồ Chí Minh - Vietnam"}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="profile-badgeinfo">
                <div className="profile-level">
                    <p className="time"><i>{User.BIO || "Rồi ai cũng khát"}</i> </p>
                </div>
                <div className="profile-social">
                    <a href={User.FACEBOOK || ""}><i className="fab fa-facebook-square"></i></a>
                    <a href={User.LINKEDIN || ""}><i className="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div >
    );
}
export function ProfileCourseItem({ Option, className, courseItem }) {
    return (
        <div className={className ? "course-item " + className : "course-item"}>
            <div className="course-avt">
                <img src={courseItem.IMG || "https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg"} alt="" />
            </div>
            <div className="course-info">
                <div className="course-info-title">
                    <a href="#">
                        <h4>{courseItem.COURSE_NAME}</h4>
                    </a>
                </div>
                <div className="course-info-author">
                    <a href="#">
                        <p>Nguyễn Văn Ây</p>
                    </a>
                </div>
            </div>
            {Option && <div className="course-manage-options">
                <Link to="/mycourse"><i className="fas fa-chart-bar"></i></Link>
                <i className="fas fa-edit"></i>

            </div>}

        </div>
    );
}