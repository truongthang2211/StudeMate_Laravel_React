import React from 'react';
import './CourseManage.css';
import { useParams } from 'react-router-dom';
import { ProfileHeader, ProfileCourseItem } from '../Profile/Profile.jsx'
import Sidebar from '../../components/Sidebar/Sidebar';
import AnalysisBox, { AnalysisItemInfo } from '../../components/AnalysisBox/AnalysisBox';
import DataTable from 'react-data-table-component';
import RatingBox from '../../components/RatingBox/RatingBox';
const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            fontSize: '16px'
        },
    },
    cells: {
        style: {
            fontSize: '14px'
        },
    },
};
const columns = [
    {
        selector: row => <img src={row.image} width="184px" height="130px" style={{ margin: "16px 0", borderRadius: "5px" }} />,
        width: '216px',
    },
    {
        name: 'Tên khóa học',
        selector: row => row.course_name,
    },
    {
        name: 'Tác giả',
        selector: row => row.author,
    },
    {
        name: 'Ngày đăng ký',
        selector: row => row.enroll_date,
    },
    {
        name: 'Giá',
        selector: row => row.cost,
    },
    {
        name: 'Tiến độ',
        selector: row => row.process,
    },
];

const data = [
    {
        id: 1,
        image: 'https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg',
        course_name: 'Java căn bản',
        author: 'Ngô Bá Khá',
        enroll_date: '22/11/2021',
        cost: '0 VNĐ',
        process: '69%',
    },
    {
        id: 2,
        image: 'https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg',
        course_name: 'Java căn bản',
        author: 'Ngô Bá Khá',
        enroll_date: '22/11/2021',
        cost: '0 VNĐ',
        process: '69%',
    },
    {
        id: 3,
        image: 'https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg',
        course_name: 'Java căn bản',
        author: 'Ngô Bá Khá',
        enroll_date: '22/11/2021',
        cost: '0 VNĐ',
        process: '69%',
    },
    {
        id: 4,
        image: 'https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg',
        course_name: 'Java căn bản',
        author: 'Ngô Bá Khá',
        enroll_date: '22/11/2021',
        cost: '0 VNĐ',
        process: '69%',
    },
    {
        id: 5,
        image: 'https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg',
        course_name: 'Java căn bản',
        author: 'Ngô Bá Khá',
        enroll_date: '22/11/2021',
        cost: '0 VNĐ',
        process: '69%',
    },
    {
        id: 6,
        image: 'https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg',
        course_name: 'Java căn bản',
        author: 'Ngô Bá Khá',
        enroll_date: '22/11/2021',
        cost: '0 VNĐ',
        process: '69%',
    },

]
const columns2 = [
    {
        selector: row => <img src={row.image} width="184px" height="130px" style={{ margin: "16px 0", borderRadius: "5px" }} />,
        width: '216px',
        compact:true
    },
    {
        name: 'Tên khóa học',
        selector: row => row.course_name,
    },
    {
        name: 'Ngày đăng ký',
        selector: row => row.create_date,
        compact:true
    },
    {
        name: 'Giá',
        selector: row => row.cost,
    },
    
    {
        name: 'Hoa hồng',
        selector: row => row.commission,
    },
    {
        name: 'Tình trạng',
        selector: row => row.status,
    },
    {
        name: 'Đánh giá',
        selector: row => <RatingBox up={row.rate.up} down={row.rate.down} />,
        width: '160px',
        compact:true
    },
    {
        name: 'Tiền kiếm được',
        selector: row => row.earn,
    },
    {
        name: 'Số người đăng ký',
        selector: row => row.registered,
    },
    {
        name: 'Hành động',
        selector: row =>  <i className="fas fa-edit"></i>,
    },
];

const data2 = [
    {
        id: 1,
        image: 'https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg',
        course_name: 'Java căn bản',
        create_date: '22/11/2021',
        include: '2 Chương, 6 Bài Học',
        cost: '0 VNĐ',
        commission: '70%',
        status: 'Công khai',
        rate: { up: 96, down: 69 },
        comment: 69,
        earn: '5.000.000 VNĐ',
        registered: '88',
    },
    {
        id: 2,
        image: 'https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg',
        course_name: 'Java căn bản',
        create_date: '22/11/2021',
        include: '2 Chương, 6 Bài Học',
        cost: '0 VNĐ',
        commission: '70%',
        status: 'Công khai',
        rate: { up: 96, down: 69 },
        comment: 69,
        earn: '5.000.000 VNĐ',
        registered: '88',
    },
    {
        id: 3,
        image: 'https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg',
        course_name: 'Java căn bản',
        create_date: '22/11/2021',
        include: '2 Chương, 6 Bài Học',
        cost: '0 VNĐ',
        commission: '70%',
        status: 'Công khai',
        rate: { up: 96, down: 69 },
        comment: 69,
        earn: '5.000.000 VNĐ',
        registered: '88',
    },

]
function CourseManage(props) {
    const { feature } = useParams();
    console.log(feature);

    return (
        <>
            <div id="course-manage">
                <Sidebar User={props.User} />
                <div className="course-manage-content">
                    {(feature == 'overview' || !feature) && <Overview />}
                    {feature == 'registeredcourse' && <RegisteredCourse />}
                    {feature == 'mycourse' && <MyCourse />}
                </div>

            </div>

        </>
    );
}

export default CourseManage;
function Overview(courseItem) {
    return (
        <div className="course-manage-overview">
            <AnalysisBox />
            <div className="anal-infos">
                <AnalysisItemInfo title="Doanh thu của bạn" content="18,000,000 VNĐ" time="Hôm nay" className="anal-item-custom" />
                <AnalysisItemInfo title="Số người đăng ký" content="221" time="Hôm nay" className="anal-item-custom" />
                <AnalysisItemInfo title="Bài học đã học" content="135" time="Hôm nay" className="anal-item-custom" />
            </div>
        </div>
    );
}
function RegisteredCourse(courseItem) {
    return (
        <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            highlightOnHover
        />
    );
}
function MyCourse() {
    return (
        <DataTable
            columns={columns2}
            data={data2}
            customStyles={customStyles}
            highlightOnHover
            responsive="false"
        />
    );
}