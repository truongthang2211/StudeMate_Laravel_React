import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import HomeCourseItem from '../../components/HomeCourseItem';
import './Search.css'
export default function Search() {
    const { key } = useParams();
    const [Data, setData] = useState();
    const [selectSort, setSelectSort] = useState('MostLearn');
    useEffect(async () => {
        const res = await axios.post('/api/search-course', { search_data: key });
        console.log(res);
        setData(res.data.message);
    }, [key])
    const handleSort = (e) => {
        console.log(e.target.name)
        setSelectSort(e.target.name);
        var TempData = [...Data]
        switch (e.target.name) {
            case 'MostLearn':
                TempData.sort((a, b) => b.enrolled - a.enrolled);
                break;
            case 'HighRate':
                TempData.sort((a, b) => b.upVote - a.upVote);
                break;
            case 'Newest':
                TempData.sort((a, b) => b.CREATED_AT.localeCompare(a.CREATED_AT));
                break;
            case 'LowtoHigh':
                TempData.sort((a, b) => -1*(b.FEE - a.FEE));
                break;
            case 'HightoLow':
                TempData.sort((a, b) => b.FEE - a.FEE);
                break;
            default:
                break;
        }
        setData(TempData);
    }
    return (
        <div id="content" className="container">
            <div className="content-section" style={{ padding: '32px 0px' }}>
                <h2 className="section-heading">Kết quả tìm kiếm cho: <strong>{key}</strong> ({Data && Data.length} kết quả)</h2>
                <div className="u-hot-cate hidden-xs">
                    <span className="order-new-seo">
                        <i className="fa fa-sort" aria-hidden="true"></i>Sắp xếp</span>
                    <ul><li><a onClick={handleSort} className={selectSort == "MostLearn" ? "active" : ""} name="MostLearn" rel="nofollow">Học nhiều nhất</a>
                    </li><li><a onClick={handleSort} className={selectSort == "HighRate" ? "active" : ""} name="HighRate" rel="nofollow">Đánh giá cao</a>
                        </li><li><a onClick={handleSort} className={selectSort == "Newest" ? "active" : ""} name="Newest" rel="nofollow">Mới nhất</a></li>
                        <li><a onClick={handleSort} className={selectSort == "LowtoHigh" ? "active" : ""} name="LowtoHigh" rel="nofollow">Giá thấp đến cao</a>
                        </li><li><a onClick={handleSort} className={selectSort == "HightoLow" ? "active" : ""} name="HightoLow" rel="nofollow">Giá cao đến thấp</a></li>
                    </ul>
                </div>
                <div className="section-courses">
                    {Data && Data.map((course, index) =>
                        <HomeCourseItem
                            key={index}
                            desc={course.COURSE_DESC}
                            title={course.COURSE_NAME}
                            author={course.FULLNAME}
                            img={course.IMG}
                            fee={course.FEE}
                            courseId={course.COURSE_ID}
                            upVote={course.upVote}
                            downVote={course.downVote}
                            author_id={course.USER_ID}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
