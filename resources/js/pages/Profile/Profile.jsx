import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import './Profile.css'

function Profile(props) {
    const { user_id } = useParams();
    const [User, setUser] = useState(props.User)
    const [courseItem, setCourseItem] = useState([]);
    // const [courseInfo, setCourseInfo] = useState([]);
    const [learntCourses, setLearntCourses] = useState([]);
    const [uppedCourses, setUppedCourses] = useState([]);
    useEffect(async () => {
        const res = await axios.post('/api/get-user', { user_id: user_id })
        setUser(res.data.message)
    }, [user_id])
    useEffect(() => {

        axios.post('/api/get-course-item',{ user_id: user_id}).then(res => {
            console.log(res);
            if (res.data.status === 200) {
                setCourseItem(res.data.courses);
                setLearntCourses(res.data.learntCourses);
                setUppedCourses(res.data.uppedCourses);
            }
        });

    }, [user_id]);


    // const showCourseInfo = async () => {
    //     try {
    //         const res = await axios.post('/api/get-course-info', User);
    //         //console.log(res);
    //         if (res.data.status === 200) {
    //             setCourseInfo({
    //                 learntCourse: res.data.learntCourse,
    //                 uppedCourse: res.data.uppedCourse,
    //             });
    //             console.log({
    //                 learntCourse: res.data.learntCourse,
    //                 uppedCourse: res.data.uppedCourse,
    //             }
    //             )
    //         }

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <>

            <div className="all-profile">
                <link rel="stylesheet" href="/css/override-container.css" />
                <div className="profile-background">
                    <img src={User.BACKGROUND_IMG && `/${User.BACKGROUND_IMG}` || "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.15752-9/265477733_1261787384297990_7861327918471454977_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=ae9488&_nc_ohc=TKEOtuPOWaEAX-_NLwH&tn=XQUZnIFZbTB2qDYS&_nc_ht=scontent.fsgn5-6.fna&oh=03_AVKv7IDaMciyI5YV2gu_5w3YZDkUXV98-fgz0iQ5MdWkFQ&oe=61E6E335"} alt="" />
                    <div className="profile-background-shadow"></div>
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
                                </div>
                            </div>
                            <div className="recent-learn" id="learnt-course">
                                <h3>Khóa học đã học</h3>
                                <div className="course-section">
                                    {learntCourses.map(course => (
                                        <ProfileCourseItem
                                            key={course.COURSE_ID}
                                            courseItem={course}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="recent-learn" id="created-course">
                                <h3>Khóa học đã đăng</h3>
                                <div className="course-section">
                                    {uppedCourses.map(course => (
                                        <ProfileCourseItem
                                            key={course.COURSE_ID}
                                            courseItem={course}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12 white right-content">
                            <div className="course-profile-info">
                                <h3>Khóa học</h3>
                                <div className="learnt-course">
                                    <a href="#learnt-course">Khóa học đã học</a>
                                    <span>{learntCourses.length || 0}</span>
                                </div>
                                <div className="upped-course">
                                    <a href="#created-course">Khóa học đã đăng</a>
                                    <span>{uppedCourses.length || 0}</span>
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

    const [city, setCity] = useState({
        CITY_ID: User.CITY_ID,
        CITY_NAME: '',
    });

    useEffect(() => {
        axios.get('/api/get-city').then(res => {
            //console.log(res);
            if (res.data.status === 200) {
                setCity({
                    CITY_NAME: res.data.city[0].CITY_NAME
                });
            }
        });
    }, [User]);

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
                            <span>{city.CITY_NAME || "Hồ Chí Minh - Vietnam"}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="profile-badgeinfo">
                <div className="profile-level">
                    <p className="time"><i>{User.BIO || "Rồi ai cũng khát"}</i> </p>
                </div>
                <div className="profile-social">
                    <a href={User.FACEBOOK || ""} target="_blank"><i className="fab fa-facebook-square"></i></a>
                    <a href={User.LINKEDIN || ""} target="_blank"><i className="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div >
    );
}
export function ProfileCourseItem({ Option, className, courseItem}) {

    // const [author, setAuthor] = useState({
    //     AUTHOR_ID: courseItem.AUTHOR_ID,
    //     AUTHOR_NAME: '',
    // });

    // useEffect(() => {
    //     axios.post('/api/get-author', courseItem).then(res => {
    //         //console.log(res);
    //         if (res.data.status === 200) {
    //             setAuthor({
    //                 AUTHOR_NAME: res.data.author[0].FULLNAME,
    //             });
    //         }
    //     });
    // }, [courseItem]);

    return (
        <div className={className ? "course-item " + className : "course-item"}>
            <div className="course-avt">
                <img src={`/${courseItem.IMG}` || "https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg"} alt="" />
            </div>
            <div className="course-info">
                <div className="course-info-title">
                    <Link to={`/course/${courseItem.COURSE_ID}`}>
                        <h4>{courseItem.COURSE_NAME}</h4>
                    </Link>
                </div>
                <div className="course-info-author">
                    <Link to={`/profile/${courseItem.USER_ID}`}>
                        <p>{courseItem.FULLNAME}</p>
                    </Link>
                </div>
            </div>
            {Option && <div className="course-manage-options">
                <Link to="/mycourse"><i className="fas fa-chart-bar"></i></Link>
                <i className="fas fa-edit"></i>

            </div>}

        </div>
    );
}