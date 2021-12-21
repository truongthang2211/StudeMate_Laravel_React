import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Course.css';
import Swal from 'sweetalert2';
import CourseGain from '../../components/CourseGain';
import CourseRequire from '../../components/CourseRequire';
import CourseChapter from '../../components/CourseChapter';
import CourseLesson from '../../components/CourseLesson';
import Collapsible from '../../components/Collapsible/Collapsible';
import { useNavigate } from 'react-router';

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
                <img src={props.userImg?`/${props.userImg}`:'https://genk.mediacdn.vn/thumb_w/600/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188.png'} />
            </div>
            <div className="input-review-content">
                <textarea className="review-input"
                    ref={reviewRef}
                    autoFocus
                    placeholder="Viết gì đó đi..."
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
                <img src={props.img && `/${props.img}` || "https://genk.mediacdn.vn/thumb_w/600/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188.png"} />
            </div>
            <div className="review-content">
                <div className="review-body">
                    <div className="review-user">
                        <Link to={`/profile/${props.userid}`}><strong>{props.username}</strong></Link>
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

export default function Course({ User, handleShowForm,callback }) {

    const cookieObj = new URLSearchParams(document.cookie.replaceAll("; ", "&"))
    const user_id = cookieObj.get("StudyMate")

    const msecToTime = ms => {
        const seconds = Math.floor((ms / 1000) % 60)
        const minutes = Math.floor((ms / (60 * 1000)) % 60)
        const hours = Math.floor((ms / (3600 * 1000)) % 3600)
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds
            }`
    }

    const modifyCourseFee = (fee) => {
        if (fee === 0) return 'Free';
        else {
            const condition = fee / 1000 >= 1000 ? true : false;
            if (condition) return `${fee / 1000000}.000.000 VND`;
            else return `${fee / 1000}.000 VND`;
        }
    }

    const { courseId } = useParams();
    const [course, setCourse] = useState();
    const [reviews, setReviews] = useState([]);
    const [checkEnrolled, setCheckEnrolled] = useState(false);
    const [enrollment, setEnrollment] = useState();
    const [checkOwner, setCheckOwner] = useState(false);

    // GET COURSE DETAIL
    useEffect(async () => {
        try {
            const resCourse = await axios.post('/api/get-course-detail', { courseId });
            if (resCourse.data.course_general[0].author_id == user_id){
                setCheckOwner(true);
            }
            setCourse(resCourse.data);
            console.log(resCourse);
            console.log(user_id);
        } catch (error) {
            console.log(error);
        }
    }, [courseId]);

    // CHECK ENROLLED
    useEffect(async () => {
        try {
            const resCheck = await axios.post('/api/check-enrolled', { courseId });
            const flag = resCheck.data.message && resCheck.data.message.USER_ID == user_id && resCheck.data.message.COURSE_ID == courseId;
            setCheckEnrolled(flag);
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
    }, [courseId])

    const checkPayment = (courseFee, userCurrentCoin) => {
        const deviant = userCurrentCoin - courseFee;
        if (deviant < 0) {
            return false;
        }
        return true;
    }

    // Define useNav for navigation
    const nav = useNavigate();
    const handleAfterEnroll = () => {
        nav("/learn/" + courseId);
    }

    let registerFlag = false;

    const handleRegister = (e) => {
        if (User.loading) {
            e.preventDefault();
            handleShowForm();
        }
        else {
            if (course) {
                const courseFee = course.course_general[0].fee;
                let userCurrentCoin = User.COIN;
                if (!checkPayment(courseFee, userCurrentCoin)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Số dư hiện tại của bạn không đủ! Vui lòng nạp thêm!'
                    })
                }
                else {
                    const adminCoin = courseFee * course.course_general[0].commission * 0.01;
                    const authorCoin = courseFee - adminCoin;
                    userCurrentCoin -= courseFee;

                    Swal.fire({
                        title: 'Xác nhận thanh toán',
                        text: "Bạn có chắc muốn mua khóa học này?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Confirm',
                        preConfirm: async () => {
                            const enrollData = {
                                user_id: user_id,
                                admin_id: 1111,
                                author_id: course.course_general[0].author_id,
                                course_id: courseId,
                                admin_coin: adminCoin,
                                author_coin: authorCoin,
                                user_current_coin: userCurrentCoin
                            };
                            try {
                                const resEnrollment = await axios.post('/api/insert-enrollment', enrollData);
                                setEnrollment(resEnrollment.data);
                                console.log(resEnrollment);
                            }
                            catch (error) {
                                console.log(error);
                            }
                            registerFlag = true;
                            callback()
                        }
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            await Swal.fire(
                                'Thành công!',
                                'Bạn đã sở hữu khóa học này.',
                                'success',
                                handleAfterEnroll()
                            )
                        }
                    })
                }
            }
        }
    }

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
                                    {checkEnrolled ? <InputReviewBlock
                                        userImg={User.AVATAR_IMG}
                                        checkCommented={reviews && reviews.filter(e => e.user.USER_ID == user_id).length == 0 ? true : false}
                                        showReviews={showReviews}
                                        courseId={courseId}
                                        response={reviews} /> : <div></div>
                                    }
                                    <div className="list-review-block">
                                        {reviews.map((review, index) => {
                                            return (
                                                <Review key={index} userid={review.user.USER_ID} img={review.user.AVATAR_IMG} username={review.user.FULLNAME} content={review.review_content} state={review.review_state} />
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
                                </div>
                                <h5 className="course-fee">{course && course.course_general[0].fee == 0 ? "Miễn phí" : course && modifyCourseFee(course.course_general[0].fee)}</h5>
                                <Link to={checkEnrolled || checkOwner ? "/learn/" + courseId : "/course/" + courseId} onClick={checkEnrolled || checkOwner ? handleAfterEnroll : handleRegister} className="course-btn">
                                    {checkEnrolled || checkOwner ? "VÀO HỌC" : "ĐĂNG KÝ HỌC"}
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
                                    <li>
                                        <i className="fas fa-user-graduate"></i>
                                        <span>
                                            Tác giả
                                            <strong>
                                                <Link to={course ? "/profile/" + course.course_general[0].author_id : ""}>
                                                    {course ? " " + course.course_general[0].fullname : ""}
                                                </Link>
                                            </strong>
                                        </span>
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