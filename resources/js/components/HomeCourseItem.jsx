import React from 'react';
import { Link } from 'react-router-dom';
function HomeCourseItem(props) {
    return(<div className="wrap-course-item col-12 col-md-4 col-lg-3">
        <div className="course-item">
            <div className="course-thumb">
                <Link to="/course" title="Object Oriendted Programming in C++">
                    <img src="img/courses/oop-course-thumb.jpeg" alt="Object Oriendted Programming in C++" className="course-img" />
                </Link>
            </div>
            <div className="course-content">
                <div className="course-rating">
                    <ul>
                        <li>
                            <i className="fas fa-star"></i>
                        </li>
                        <li>
                            <i className="fas fa-star"></i>
                        </li>
                        <li>
                            <i className="fas fa-star"></i>
                        </li>
                        <li>
                            <i className="fas fa-star"></i>
                        </li>
                        <li>
                            <i className="fas fa-star"></i>
                        </li>
                    </ul>
                    <div className="course-type">Online</div>
                </div>
                <h3 className="course-title">
                    <Link to="/course" title="Object Oriented-Programming in C++">
                        Object Oriented-Programming in C++
                    </Link>
                </h3>
                {/* <!-- Course's author infor --> */}
                <a href="#" title="ThuHuynh07" className="course-author">
                    {props.author}
                </a>
                <p className="course-des">
                    Object-Oriented-Programming (Object-Oriented-Programming) is an object-based programming method to find out the nature of the problem. This course helps programmers learn programming techniques that all logic and practical requirements are built around objects. Understanding how OOP works in C++ will simplify maintenance and scalability in software development.
                </p>
                <div className="course-footer">
                    <div className="course-footer-left">
                        <span className="free-text" data-selected="true" data-label-id="0" data-metatip="true">Free</span>
                    </div>
                    <div className="course-footer-right"></div>
                </div>
            </div>
        </div>
    </div>);
}

export default HomeCourseItem;