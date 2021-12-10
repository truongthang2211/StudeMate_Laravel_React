import React from 'react';
import { Link } from 'react-router-dom';
function HomeCourseItem(props) {
    const modifyCourseFee = (fee) => {
        if(fee === 0) return 'Free';
        else{ 
            const condition = fee/1000 >= 1000 ? true : false;
            if(condition) return `${fee/1000000}.000.000 VND`;
            else return `${fee/1000}.000 VND`;
        }
    }
    return(<div className="wrap-course-item col-12 col-md-4 col-lg-3">
        <div className="course-item">
            <div className="course-thumb">
                <Link to="/course" title={props.title}>
                    <img src={"/"+props.img} alt={props.title} className="course-img" />
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
                    <Link to="/course" title={props.title}>
                        {props.title}
                    </Link>
                </h3>
                {/* <!-- Course's author infor --> */}
                <a href="#" title={props.author} className="course-author">
                    {props.author}
                </a>
                <p className="course-des">{props.desc}</p>
                <div className="course-footer">
                    <div className="course-footer-left">
                        <span className="free-text" data-selected="true" data-label-id="0" data-metatip="true">{modifyCourseFee(props.fee)}</span>
                    </div>
                    <div className="course-footer-right"></div>
                </div>
            </div>
        </div>
    </div>);
}

export default HomeCourseItem;