import React,{useEffect, useState} from 'react';
import HomeCourseItem from '../../components/HomeCourseItem';
import axios from 'axios';
import './Home.css'

function Home() {
    const [data,setData] = useState([]);
    useEffect(async() => {
        const res = await axios.get('/api/get-courses')
        setData(res.data.message)
        console.log(res);
    },[])

    const fieldsData = [{
        linhvuc: 'CNTT'
    },
    {
        linhvuc: 'Kinh Doanh'
    }];
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
                                <a href="/course/ngoai-ngu?boxcode=slide-menu-home"><i className="fa fa-language"></i>Ngoại ngữ</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/ngoai-ngu?boxcode=slide-menu-home" rel="nofollow">Tất cả Ngoại ngữ</a>
                                            </li>
                                            <li>
                                                <a href="/tag/tieng-han?boxcode=slide-menu-home">Tiếng Hàn</a>
                                            </li>
                                            <li>
                                                <a href="/tag/tieng-anh?boxcode=slide-menu-home">Tiếng Anh</a>
                                            </li>
                                            <li>
                                                <a href="/tag/tieng-trung?boxcode=slide-menu-home">Tiếng Trung</a>
                                            </li>
                                            <li>
                                                <a href="/tag/tieng-nhat?boxcode=slide-menu-home">Tiếng Nhật</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/course/marketing?boxcode=slide-menu-home"><i className="fa fa-line-chart"></i>Marketing</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/marketing?boxcode=slide-menu-home" rel="nofollow">Tất cả Marketing</a>
                                            </li>
                                            <li>
                                                <a href="/tag/marketing-online?boxcode=slide-menu-home">Marketing Online</a>
                                            </li>
                                            <li>
                                                <a href="/tag/google-ads?boxcode=slide-menu-home">Google Ads</a>
                                            </li>
                                            <li>
                                                <a href="/tag/seo?boxcode=slide-menu-home">Seo</a>
                                            </li>
                                            <li>
                                                <a href="/tag/branding?boxcode=slide-menu-home">Branding</a>
                                            </li>
                                            <li>
                                                <a href="/tag/content-marketing?boxcode=slide-menu-home">Content Marketing</a>
                                            </li>
                                            <li>
                                                <a href="/tag/video-marketing?boxcode=slide-menu-home">Video marketing</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/course/tin-hoc-van-phong?boxcode=slide-menu-home"><i className="fa fa-desktop"></i>Tin học văn phòng</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/tin-hoc-van-phong?boxcode=slide-menu-home" rel="nofollow">Tất cả Tin học văn phòng</a>
                                            </li>
                                            <li>
                                                <a href="/tag/excel?boxcode=slide-menu-home">Excel</a>
                                            </li>
                                            <li>
                                                <a href="/tag/word?boxcode=slide-menu-home">Word</a>
                                            </li>
                                            <li>
                                                <a href="/tag/powerpoint?boxcode=slide-menu-home">PowerPoint</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/course/thiet-ke?boxcode=slide-menu-home"><i className="fa fa-paint-brush"></i>Thiết kế</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/thiet-ke?boxcode=slide-menu-home" rel="nofollow">Tất cả Thiết kế</a>
                                            </li>
                                            <li>
                                                <a href="/tag/thiet-ke-quang-cao?boxcode=slide-menu-home">Thiết kế quảng cáo</a>
                                            </li>
                                            <li>
                                                <a href="/tag/phan-mem-thiet-ke?boxcode=slide-menu-home">Phần mềm thiết kế</a>
                                            </li>
                                            <li>
                                                <a href="/tag/thiet-ke-web?boxcode=slide-menu-home">Thiết kế Web</a>
                                            </li>
                                            <li>
                                                <a href="/tag/kien-truc-noi-that?boxcode=slide-menu-home">Kiến Trúc, Nội Thất</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/course/kinh-doanh-khoi-nghiep?boxcode=slide-menu-home"><i className="fa fa-rocket"></i>Kinh doanh - Khởi nghiệp</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/kinh-doanh-khoi-nghiep?boxcode=slide-menu-home" rel="nofollow">Tất cả Kinh doanh - Khởi nghiệp</a>
                                            </li>
                                            <li>
                                                <a href="/tag/bat-dong-san?boxcode=slide-menu-home">Bất động sản</a>
                                            </li>
                                            <li>
                                                <a href="/tag/crypto?boxcode=slide-menu-home">Crypto</a>
                                            </li>
                                            <li>
                                                <a href="/tag/kinh-doanh-online?boxcode=slide-menu-home">Kinh doanh Online</a>
                                            </li>
                                            <li>
                                                <a href="/tag/startup?boxcode=slide-menu-home">Startup</a>
                                            </li>
                                            <li>
                                                <a href="/tag/kinh-doanh-cafe?boxcode=slide-menu-home">Kinh doanh Cafe</a>
                                            </li>
                                            <li>
                                                <a href="/tag/kiem-tien-online?boxcode=slide-menu-home">Kiếm tiền Online</a>
                                            </li>
                                            <li>
                                                <a href="/tag/quan-tri-doanh-nghiep?boxcode=slide-menu-home">Quản trị doanh nghiệp</a>
                                            </li>
                                            <li>
                                                <a href="/tag/chung-khoan?boxcode=slide-menu-home">Chứng khoán</a>
                                            </li>
                                            <li>
                                                <a href="/tag/dropshipping?boxcode=slide-menu-home">Dropshipping</a>
                                            </li>
                                            <li>
                                                <a href="/tag/ke-toan?boxcode=slide-menu-home">Kế Toán</a>
                                            </li>
                                            <li>
                                                <a href="/tag/dau-tu-forex?boxcode=slide-menu-home">Đầu tư forex</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/course/phat-trien-ca-nhan?boxcode=slide-menu-home"><i className="far fa-lightbulb"></i>Phát triển cá nhân</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/phat-trien-ca-nhan?boxcode=slide-menu-home" rel="nofollow">Tất cả Phát triển cá nhân</a>
                                            </li>
                                            <li>
                                                <a href="/tag/thuong-hieu-ca-nhan?boxcode=slide-menu-home">Thương hiệu cá nhân</a>
                                            </li>
                                            <li>
                                                <a href="/tag/tai-chinh-ca-nhan?boxcode=slide-menu-home">Tài chính cá nhân</a>
                                            </li>
                                            <li>
                                                <a href="/tag/dam-phan?boxcode=slide-menu-home">Đàm phán</a>
                                            </li>
                                            <li>
                                                <a href="/tag/ky-nang-lanh-dao?boxcode=slide-menu-home">Kỹ năng lãnh đạo</a>
                                            </li>
                                            <li>
                                                <a href="/tag/quan-tri-nhan-su?boxcode=slide-menu-home">Quản trị nhân sự</a>
                                            </li>
                                            <li>
                                                <a href="/tag/mc?boxcode=slide-menu-home">MC</a>
                                            </li>
                                            <li>
                                                <a href="/tag/ren-luyen-tri-nho?boxcode=slide-menu-home">Rèn luyện trí nhớ</a>
                                            </li>
                                            <li>
                                                <a href="/tag/ky-nang-mem?boxcode=slide-menu-home">Kỹ năng mềm</a>
                                            </li>
                                            <li>
                                                <a href="/tag/giao-tiep?boxcode=slide-menu-home">Giao tiếp</a>
                                            </li>
                                            <li>
                                                <a href="/tag/ky-nang-quan-ly?boxcode=slide-menu-home">Kỹ năng quản lý</a>
                                            </li>
                                            <li>
                                                <a href="/tag/thuyet-trinh?boxcode=slide-menu-home">Thuyết trình</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/course/sales-ban-hang?boxcode=slide-menu-home"><i className="fa fa-shopping-cart"></i>Sales, bán hàng</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/sales-ban-hang?boxcode=slide-menu-home" rel="nofollow">Tất cả Sales, bán hàng</a>
                                            </li>
                                            <li>
                                                <a href="/tag/ban-hang-online?boxcode=slide-menu-home">Bán hàng Online</a>
                                            </li>
                                            <li>
                                                <a href="/tag/telesales?boxcode=slide-menu-home">Telesales</a>
                                            </li>
                                            <li>
                                                <a href="/tag/ban-hang-livestream?boxcode=slide-menu-home">Bán hàng livestream</a>
                                            </li>
                                            <li>
                                                <a href="/tag/cham-soc-khach-hang?boxcode=slide-menu-home">Chăm sóc khách hàng</a>
                                            </li>
                                            <li>
                                                <a href="/tag/chien-luoc-ban-hang?boxcode=slide-menu-home">Chiến lược bán hàng</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/course/cong-nghe-thong-tin?boxcode=slide-menu-home"><i className="fa fa-code"></i>Công nghệ thông tin</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/cong-nghe-thong-tin?boxcode=slide-menu-home" rel="nofollow">Tất cả Công nghệ thông tin</a>
                                            </li>
                                            <li>
                                                <a href="/tag/lap-trinh?boxcode=slide-menu-home">Lập trình</a>
                                            </li>
                                            <li>
                                                <a href="/tag/ngon-ngu-lap-trinh?boxcode=slide-menu-home">Ngôn ngữ lập trình</a>
                                            </li>
                                            <li>
                                                <a href="/tag/lap-trinh-web?boxcode=slide-menu-home">Lập Trình Web</a>
                                            </li>
                                            <li>
                                                <a href="/tag/lap-trinh-android?boxcode=slide-menu-home">Lập trình Android</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/course/suc-khoe-gioi-tinh?boxcode=slide-menu-home"><i className="fa fa-heartbeat"></i>Sức khỏe - Giới tính</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/suc-khoe-gioi-tinh?boxcode=slide-menu-home" rel="nofollow">Tất cả Sức khỏe - Giới tính</a>
                                            </li>
                                            <li>
                                                <a href="/tag/giam-can?boxcode=slide-menu-home">Giảm cân</a>
                                            </li>
                                            <li>
                                                <a href="/tag/thien?boxcode=slide-menu-home">Thiền</a>
                                            </li>
                                            <li>
                                                <a href="/tag/phong-the?boxcode=slide-menu-home">Phòng the</a>
                                            </li>
                                            <li>
                                                <a href="/tag/giam-stress?boxcode=slide-menu-home">Giảm stress</a>
                                            </li>
                                            <li>
                                                <a href="/tag/fitness-gym?boxcode=slide-menu-home">Fitness - Gym</a>
                                            </li>
                                            <li>
                                                <a href="/tag/tinh-yeu?boxcode=slide-menu-home">Tình yêu</a>
                                            </li>
                                            <li>
                                                <a href="/tag/yoga?boxcode=slide-menu-home">Yoga</a>
                                            </li>
                                            <li>
                                                <a href="/tag/massage?boxcode=slide-menu-home">Massage</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/course/phong-cach-song?boxcode=slide-menu-home"><i className="fa fa-cutlery"></i>Phong cách sống</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/phong-cach-song?boxcode=slide-menu-home" rel="nofollow">Tất cả Phong cách sống</a>
                                            </li>
                                            <li>
                                                <a href="/tag/pha-che?boxcode=slide-menu-home">Pha chế</a>
                                            </li>
                                            <li>
                                                <a href="/tag/lam-banh?boxcode=slide-menu-home">Làm bánh</a>
                                            </li>
                                            <li>
                                                <a href="/tag/lam-dep?boxcode=slide-menu-home">Làm đẹp</a>
                                            </li>
                                            <li>
                                                <a href="/tag/handmade?boxcode=slide-menu-home">Handmade</a>
                                            </li>
                                            <li>
                                                <a href="/tag/tu-vi?boxcode=slide-menu-home">Tử vi</a>
                                            </li>
                                            <li>
                                                <a href="/tag/ao-thuat?boxcode=slide-menu-home">Ảo thuật</a>
                                            </li>
                                            <li>
                                                <a href="/tag/nhac-cu?boxcode=slide-menu-home">Nhạc cụ</a>
                                            </li>
                                            <li>
                                                <a href="/tag/am-thuc-nau-an?boxcode=slide-menu-home">Ẩm thực - Nấu ăn</a>
                                            </li>
                                            <li>
                                                <a href="/tag/nhay?boxcode=slide-menu-home">Nhảy</a>
                                            </li>
                                            <li>
                                                <a href="/tag/phong-thuy?boxcode=slide-menu-home">Phong thuỷ</a>
                                            </li>
                                            <li>
                                                <a href="/tag/luyen-giong?boxcode=slide-menu-home">Luyện giọng</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/course/nuoi-day-con?boxcode=slide-menu-home"><i className="fa fa-child"></i>Nuôi dạy con</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/nuoi-day-con?boxcode=slide-menu-home" rel="nofollow">Tất cả Nuôi dạy con </a>
                                            </li>
                                            <li>
                                                <a href="/tag/mang-thai?boxcode=slide-menu-home">Mang Thai</a>
                                            </li>
                                            <li>
                                                <a href="/tag/day-con-thong-minh?boxcode=slide-menu-home">Dạy con thông minh</a>
                                            </li>
                                            <li>
                                                <a href="/tag/cham-soc-be-yeu?boxcode=slide-menu-home">Chăm sóc bé yêu</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/course/hon-nhan-gia-dinh?boxcode=slide-menu-home"><i className="fa fa-group"></i>Hôn nhân &amp; Gia đình</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/hon-nhan-gia-dinh?boxcode=slide-menu-home" rel="nofollow">Tất cả Hôn nhân &amp; Gia đình</a>
                                            </li>
                                            <li>
                                                <a href="/tag/hanh-phuc-gia-dinh?boxcode=slide-menu-home">Hạnh phúc gia đình</a>
                                            </li>
                                            <li>
                                                <a href="/tag/doi-song-vo-chong?boxcode=slide-menu-home">Đời sống vợ chồng</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/course/nhiep-anh-dung-phim?boxcode=slide-menu-home"><i className="fa fa-camera"></i>Nhiếp ảnh, dựng phim</a>
                                <div className="megadrop">
                                    <div className="col">
                                        <ul>
                                            <li>
                                                <a href="/course/nhiep-anh-dung-phim?boxcode=slide-menu-home" rel="nofollow">Tất cả Nhiếp ảnh, dựng phim</a>
                                            </li>
                                            <li>
                                                <a href="/tag/dung-phim?boxcode=slide-menu-home">Dựng phim</a>
                                            </li>
                                            <li>
                                                <a href="/tag/chup-anh?boxcode=slide-menu-home">Chụp ảnh</a>
                                            </li>
                                            <li>
                                                <a href="/tag/ky-xao?boxcode=slide-menu-home">Kỹ xảo</a>
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
                {data.map(c => <div key={c.COURSE_NAME} className="content-section">
                    <h2 className="section-heading">{c.COURSE_NAME}</h2>
                    <div className="section-courses">
                        <HomeCourseItem title={c.COURSE_NAME} desc={c.COURSE_DESC} author={c.AUTHOR_ID} img={c.IMG} fee={c.FEE}/>
                        <HomeCourseItem author="ThangDeptrai" />
                        <HomeCourseItem author="ThangDeptrai" />
                        <HomeCourseItem author="ThangDeptrai" />
                    </div>
                </div>)}
            </div>
        </>
    );
}

export default Home;
