import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Course.css'
import Swal from 'sweetalert2'
import CourseGain from '../../components/CourseGain';
import CourseRequire from '../../components/CourseRequire';
import CourseChapter from '../../components/CourseChapter';
import CourseLesson from '../../components/CourseLesson';
import Collapsible from '../../components/Collapsible/Collapsible';

function InputReviewBlock(props) {
    const [reviewContent, setReviewContent] = useState();
    const [voteUp, setVoteUp] = useState(false);
    const [voteDown, setVoteDown] = useState(false);
    const reviewRef = useRef();
    const handleVoteUp = () => {
        setVoteUp(up => !up)
        if (voteDown) {
            handleVoteDown()
        }
    }
    const handleVoteDown = () => {
        setVoteDown(down => !down)
        if (voteUp) {
            handleVoteUp()
        }
    }
    // TextArea
    const handleOnPaste = (e) => {
        e.preventDefault();
        var text = (e.originalEvent || e).clipboardData.getData('text/plain');
        document.execCommand("insertHTML", false, text);
    }
    const handleOnChange = (e) => {
        setReviewContent(e.target.value);
    }

    const handleSubmit = async () => {
        if (props.checkCommented) {
            if (!voteUp && !voteDown) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Vui lòng vote cho khóa học!',
                })
            }
            else {
                const data = {
                    course_id: props.courseId,
                    content: reviewContent,
                    state: voteUp ? 1 : 0,
                };
                setReviewContent('');
                setVoteUp(false);
                setVoteDown(false);
                const res = await axios.post('/api/add-review', data);
                console.log(res)
                if (res.data.status === 200) {
                    props.showReviews();
                }
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Bạn đã đánh giá cho khóa học này rồi!',
            })
        }
    }

    return (
        <div className="input-review-block">
            <div className="user-avatar">
                <img src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.6435-9/123519836_2709233069342309_404418965952590855_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=i1SBPX81GKUAX_deJFe&_nc_ht=scontent.fsgn5-11.fna&oh=d685f02a12ebb0131217f4705e5c5795&oe=61C416A0" />
            </div>
            <div className="input-review-content">
                <textarea className="review-input"
                    ref={reviewRef}
                    autoFocus
                    placeholder="Viết gì gì đó đi..."
                    tabIndex="0"
                    dir="ltr"
                    spellCheck="false"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onPaste={handleOnPaste}
                    value={reviewContent}
                    onChange={handleOnChange}
                >
                </textarea>
                <div className="review-option">
                    <ul>
                        <li onClick={handleVoteUp}>
                            <i className={voteUp ? "far fa-thumbs-up like active" : "far fa-thumbs-up like"}></i>
                        </li>
                        <li onClick={handleVoteDown}>
                            <i className={voteDown ? "far fa-thumbs-down dislike active" : "far fa-thumbs-down dislike"}></i>
                        </li>
                        <li>
                            <button onClick={handleSubmit} className="btn btn-review">Đánh giá</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

function Review(props) {
    return (
        <div className="wrap-review">
            <div className="user-avatar">
                <img src={props.img} />
            </div>
            <div className="review-content">
                <div className="review-body">
                    <div className="review-user">
                        <a href="#"><strong>{props.username}</strong></a>
                    </div>
                    <div className="review-text">{props.content}</div>
                </div>
                <div className="review-footer">
                    <i className={props.state === 1 ? "far fa-thumbs-up like-color" : "far fa-thumbs-down dislike-color"}></i>
                </div>
            </div>
        </div>
    )
}

export default function Course({ User, handleShowForm }) {

    const cookieObj = new URLSearchParams(document.cookie.replaceAll("; ", "&"))
    const user_id = cookieObj.get("StudyMate")

    const msecToTime = ms => {
        const seconds = Math.floor((ms / 1000) % 60)
        const minutes = Math.floor((ms / (60 * 1000)) % 60)
        const hours = Math.floor((ms / (3600 * 1000)) % 3600)
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds
            }`
    }
    const handleRegister = (e) => {
        if (User.loading) {
            e.preventDefault();
            handleShowForm();
        }
    }

    const { courseId } = useParams();
    const [course, setCourse] = useState();
    const [reviews, setReviews] = useState([]);
    const [checkEnrolled, setCheckEnrolled] = useState(0);

    useEffect(async () => {
        try {
            const resCourse = await axios.post('/api/get-course-detail', { courseId });
            setCourse(resCourse.data);
            console.log(resCourse);
        } catch (error) {
            console.log(error);
        }
    }, [courseId]);

    useEffect(async () => {
        try {
            const resCheck = await axios.post('/api/check-enrolled',{courseId});
            if (resCheck && resCheck.data.message.USER_ID === user_id && resCheck.data.message.COURSE_ID === courseId) {
                setCheckEnrolled(1);
            }
            console.log(resCheck);
        } catch (error) {
            console.log(error);
        }
    }, [courseId]);


    const showReviews = async () => {
        try {
            const res = await axios.post(`/api/get-reviews`, { course_id: courseId });
            console.log(res)
            setReviews(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        showReviews();
        // console.log('testest')
    }, [courseId])

    return (
        <>
            <div id="main">
                <div className="grid">
                    <div className="grid__row">
                        <div className="grid__column-8">
                            <div className="course-content">
                                <div className="course-info">
                                    <div className="course-summary">
                                        <h1 className="course-summary-title">{course && course.course_general[0].course_name}</h1>
                                        <p className="course-summary-intro">
                                            {course && course.course_general[0].course_desc}
                                        </p>
                                    </div>
                                    <div className="course-gain">
                                        <h4 className="course-gain-title">Bạn sẽ học được gì</h4>
                                        <div className="course-gain-list">
                                            <ul className="fa-ul">
                                                {course && course.course_gains.map((gain, index) =>
                                                    <CourseGain key={index} gain={gain.content} />
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="course-detail">
                                    <h3 className="course-detail-title">Nội dung khóa học</h3>
                                    <ul className="course-detail-summary">
                                        <li>{course && course.total_chapter[0].numOfChapter + " phần"}</li>
                                        <li className="divider">.</li>
                                        <li>{course && course.total_lesson[0].numOfLesson + " bài học"}</li>
                                        <li className="divider">.</li>
                                        <li>{course && "Thời lượng " + msecToTime(course.total_duration[0].totalDuration)}</li>
                                    </ul>
                                    <div className="course-detail-list">
                                        {course && course.list_learn.map((chapter, index) => {
                                            return (
                                                <Collapsible key={index} className="list">
                                                    <CourseChapter chapterTitle={chapter.chapterTitle} numOfChapters={chapter.numOfChapterLess[0].numOfChapterLess} />
                                                    <div className="list-collapse">
                                                        {chapter.lessons.map((lesson, index) => {
                                                            return (
                                                                <CourseLesson key={index} lessonName={lesson.LESSON_NAME} />
                                                            )
                                                        })}
                                                    </div>
                                                </Collapsible>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="course-require">
                                    <h3 className="require-title">Yêu cầu</h3>
                                    <ul className="fa-ul">
                                        {course && course.course_requires.map((require, index) =>
                                            <CourseRequire key={index} require={require.content} />
                                        )}
                                    </ul>
                                </div>
                                <div className="course-reviews">
                                    <h3 className="review-title">Đánh giá khóa học</h3>
                                    {checkEnrolled === 0 ? <InputReviewBlock
                                        checkCommented={reviews && reviews.filter(e => e.user.USER_ID == user_id).length == 0 ? true : false}
                                        showReviews={showReviews}
                                        courseId={courseId}
                                        response={reviews} /> : <div></div>
                                    }
                                    <div className="list-review-block">
                                        {reviews.map((review, index) => {
                                            return (
                                                <Review key={index} img={review.user.AVATAR_IMG} username={review.user.FULLNAME} content={review.review_content} state={review.review_state} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid__column-4">
                            <div className="course-purchase">
                                <div className="course-thumb">
                                    <img src={course && "/" + course.course_general[0].img} alt="course-thumb" className="center" />
                                    <i className="fas fa-play-circle"></i>
                                    <p>Xem giới thiệu khóa học</p>
                                </div>
                                <h5 className="course-fee">Miễn phí</h5>
                                <Link to="/learn" onClick={handleRegister} className="course-btn">
                                    {checkEnrolled === 1 ? "ĐĂNG KÝ HỌC" : "VÀO HỌC"}
                                </Link>
                                <ul>
                                    <li>
                                        <i className="fas fa-seedling"></i>
                                        <span>Trình độ cơ bản</span>
                                    </li>
                                    <li>
                                        <i className="fas fa-film"></i>
                                        <span>
                                            Tổng số <strong>{course && course.total_lesson[0].numOfLesson}</strong> bài học
                                        </span>
                                    </li>
                                    <li>
                                        <i className="fas fa-clock"></i>
                                        <span>
                                            Thời lượng <strong>{course && msecToTime(course.total_duration[0].totalDuration)}</strong>
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