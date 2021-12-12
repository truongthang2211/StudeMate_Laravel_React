import React, { useEffect, useState } from 'react';
import HomeCourseItem from '../../components/HomeCourseItem';
import axios from 'axios';
import './Home.css'
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    useEffect(async () => {
        const resData = await axios.get('/api/get-courses');
        setData(resData.data.message);
        console.log(resData);
    }, []);

    const [courses, setCourses] = useState({});
    useEffect(async () => {
        const resCourses = await axios.get('/api/get-courses-homepage');
        setCourses(resCourses.data.message);
        console.log(resCourses);
    }, [])

    const courseTypes = ['Các khóa nổi bật', 'Tin học văn phòng', 'Công nghệ thông tin'];

    return (
        <>
            <div id="header" style={{ backgroundImage: "url('img/courses/header-img.png')" }}>
                <div className="container" >
                    <h2>Learning online. Let's start your knowledge journey!</h2>
                    <div id="search">
                        <div className="input-group">
                            <form action="" id="form-search">
                                <input name="name" id="search-course" className="form-control" type="text" placeholder="Search..." />
                                <span className="input-group-btn">
                                    <i className="fas fa-search"></i>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slider container">
                <div className="row">
                    <div className="col-lg-3 menu-left-new">
                        <ul className="menu">
                            <li>
                                <Link to="/list-course/1111/null"><i className="fa fa-language"></i>Ngoại ngữ</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1111">Tiếng Anh</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1113">Tiếng Hàn</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1112">Tiếng Trung</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1114">Tiếng Nhật</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/list-course/1112/null"><i className="fa fa-line-chart"></i>Marketing</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1116">Marketing Online</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1117">Google Ads</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1118">SEO</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1119">Branding</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1120">Content Marketing</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1121">Video marketing</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/list-course/1113/null"><i className="fa fa-desktop"></i>Tin học văn phòng</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1123">Excel</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1124">Word</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1125">PowerPoint</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/list-course/1114/null"><i className="fa fa-paint-brush"></i>Thiết kế</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1127">Thiết kế quảng cáo</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1128">Phần mềm thiết kế</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1129">Thiết kế Web</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1130">Kiến Trúc, Nội Thất</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/list-course/1115/null"><i className="fa fa-rocket"></i>Kinh doanh - Khởi nghiệp</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1132">Bất động sản</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1133">Crypto</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1134">Kinh doanh Online</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1135">Startup</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1136">Kinh doanh Cafe</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1137">Kiếm tiền Online</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1138">Quản trị doanh nghiệp</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1139">Chứng khoán</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1140">Dropshipping</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1141">Kế Toán</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1142">Đầu tư forex</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/list-course/1116/null"><i className="far fa-lightbulb"></i>Phát triển cá nhân</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1144">Thương hiệu cá nhân</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1145">Tài chính cá nhân</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1146">Đàm phán</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1147">Kỹ năng lãnh đạo</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1148">Quản trị nhân sự</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1149">MC</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1150">Rèn luyện trí nhớ</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1151">Kỹ năng mềm</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1152">Giao tiếp</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1153">Kỹ năng quản lý</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1154">Thuyết trình</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/list-course/1117/null"><i className="fa fa-shopping-cart"></i>Sales, bán hàng</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1156">Bán hàng Online</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1157">Telesales</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1158">Bán hàng livestream</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1159">Chăm sóc khách hàng</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1160">Chiến lược bán hàng</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/list-course/1118/null"><i className="fa fa-code"></i>Công nghệ thông tin</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1162">Lập trình</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1163">Ngôn ngữ lập trình</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1164">Lập Trình Web</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1165">Lập trình Android</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/list-course/1119/null"><i className="fa fa-heartbeat"></i>Sức khỏe - Giới tính</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1167">Giảm cân</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1168">Thiền</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1169">Phòng the</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1170">Giảm stress</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1171">Fitness - Gym</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1172">Tình yêu</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1173">Yoga</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1174">Massage</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/list-course/1120/null"><i className="fa fa-cutlery"></i>Phong cách sống</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1176">Pha chế</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1177">Làm bánh</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1178">Làm đẹp</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1179">Handmade</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1180">Tử vi</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1181">Ảo thuật</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1182">Nhạc cụ</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1183">Ẩm thực - Nấu ăn</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1184">Nhảy</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1185">Phong thuỷ</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1186">Luyện giọng</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/list-course/1121/null"><i className="fa fa-child"></i>Nuôi dạy con</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1187">Mang Thai</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1188">Dạy con thông minh</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1189">Chăm sóc bé yêu</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/list-course/1122/null"><i className="fa fa-group"></i>Hôn nhân &amp; Gia đình</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1191">Hạnh phúc gia đình</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1192">Đời sống vợ chồng</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/list-course/1123/null"><i className="fa fa-camera"></i>Nhiếp ảnh, dựng phim</Link>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <Link to="/list-course/null/1194">Dựng phim</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1195">Chụp ảnh</Link>
                                            </li>
                                            <li>
                                                <Link to="/list-course/null/1196">Kỹ xảo</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-9 banner-right-new">
                        <img src="https://i.ytimg.com/vi/8xLEec2NiV8/maxresdefault.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div id="content" className="container">
                <div className="content-section">
                    <h2 className="section-heading">{courseTypes[0]}</h2>
                    <div className="section-courses">
                        {data.map((course, index) =>
                            <HomeCourseItem
                                key={index}
                                desc={course.course_desc}
                                title={course.course_name}
                                author={course.fullname}
                                img={course.img}
                                fee={course.fee}
                                courseId={course.course_id}
                            />
                        )}
                    </div>
                </div>
                <div className="content-section">
                    <h2 className="section-heading">{courseTypes[1]}</h2>
                    <div className="section-courses">
                        {courses.TinHocVanPhong && courses.TinHocVanPhong.map((course, index) =>
                            <HomeCourseItem
                                key={index}
                                desc={course.course_desc}
                                title={course.course_name}
                                author={course.fullname}
                                img={course.img}
                                fee={course.fee}
                                courseId={course.course_id}
                            />
                        )}
                    </div>
                </div>
                <div className="content-section">
                    <h2 className="section-heading">{courseTypes[2]}</h2>
                    <div className="section-courses">
                        {courses.CNTT && courses.CNTT.map((course, index) =>
                            <HomeCourseItem
                                key={index}
                                desc={course.course_desc}
                                title={course.course_name}
                                author={course.fullname}
                                img={course.img}
                                fee={course.fee}
                                courseId={course.course_id}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;