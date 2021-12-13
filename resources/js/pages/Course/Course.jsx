import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Course.css'
import CourseGain from '../../components/CourseGain';
import CourseRequire from '../../components/CourseRequire';
import CourseChapter from '../../components/CourseChapter';
import CourseLesson from '../../components/CourseLesson';
import Collapsible from '../../components/Collapsible/Collapsible';

export default function Course({ User, handleShowForm }) {
    const handleRegister = (e) => {
        if (User.loading) {
            e.preventDefault();
            handleShowForm();
        }
    }

    const { courseId } = useParams();
    const [course, setCourse] = useState();
    useEffect(async () => {
        try {
            const resCourse = await axios.post('/api/get-course-detail', { courseId });
            setCourse(resCourse.data);
            console.log(resCourse);
        } catch (error) {
            console.log(error);
        }
    }, []);
    const msecToTime = ms => {
        const seconds = Math.floor((ms / 1000) % 60)
        const minutes = Math.floor((ms / (60 * 1000)) % 60)
        const hours = Math.floor((ms / (3600 * 1000)) % 3600)
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds
            }`
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
                                <Link to="/learn" onClick={handleRegister} className="course-btn">ĐĂNG KÝ HỌC</Link>
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