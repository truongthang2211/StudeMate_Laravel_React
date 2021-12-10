import React, { useState, useRef, useEffect, memo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AnalysisBox, { AnalysisItemInfo } from '../../components/AnalysisBox/AnalysisBox';
import DataTable from 'react-data-table-component';
import Sidebar from '../../components/Sidebar/Sidebar';
import Swal from 'sweetalert2'
import './Admin.css'
export default function Admin({ User }) {
    const [login, setLogin] = useState(true);
    return (
        <>
            {(!login && <AdminLogin />) || <AdminPage User={User} />}
        </>
    );
}
function AdminLogin() {
    return (
        <div style={{ height: '100vh', position: 'relative' }}>
            <div className="wrap-form-head-register" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <div className="form-head-register">
                    <div className="forms-container">
                        <form id="signin-form">
                            <h2 className="title">Sign In</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input autoFocus type="text" id="username_login" name="username" placeholder="Username" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" id="password_login" name="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="button solid">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
function AdminPage({ User }) {
    const { feature } = useParams();
    return (
        <div style={{ backgroundColor: '#fefefe' }}>
            <Sidebar User={User}>
                <Link to="/admin/overview" className="sidebar__feature-item">
                    <i className="fas fa-home"></i>
                    <span>Tổng quan</span>
                </Link >
                <Link to="/admin/approval" className="sidebar__feature-item">
                    <i className="fas fa-list-alt"></i>
                    <span>Phê duyệt khóa học</span>
                </Link>
                <Link to="/admin/course-manage" className="sidebar__feature-item">
                    <i className="fas fa-th-list"></i>
                    <span>Quản lý khóa học</span>
                </Link>
                <Link to="/admin/user-manage" className="sidebar__feature-item">
                    <i className="fas fa-th-list"></i>
                    <span>Quản lý người dùng</span>
                </Link>

            </Sidebar>
            <div className="course-manage-content">
                {(feature == 'overview' || !feature) && <Overview />}
                {feature == 'approval' && <Approval />}
                {feature == 'course-manage' && <CourseManage />}
                {feature == 'user-manage' && <UserManage />}
                {feature == 'mycourse' && <ApprovalAction />}
            </div>
        </div>
    )
}
function Overview() {
    return (
        <div className="course-manage-overview">

            <div className="overview-top-info">
                
            </div>
            {/* <AnalysisBox />
            <div className="anal-infos">
                <AnalysisItemInfo title="Doanh thu của bạn" content="18,000,000 VNĐ" time="Hôm nay" className="anal-item-custom" />
                <AnalysisItemInfo title="Số người đăng ký" content="221" time="Hôm nay" className="anal-item-custom" />
                <AnalysisItemInfo title="Bài học đã học" content="135" time="Hôm nay" className="anal-item-custom" />
            </div> */}
        </div>
    );
}
const coursemanageColumn = [

    {
        name: 'Tên khóa học',
        selector: row => row.CourseTitle,
        sortable: true,
    },
    {
        name: 'Danh mục',
        selector: row => row.CourseType,
        sortable: true,
    },
    {
        name: 'Tác giả',
        selector: row => row.Author.FullName,
        sortable: true,
    },
    {
        name: 'Ngày đăng ký',
        selector: row => row.CourseCreate,
        sortable: true,
    },
    {
        name: 'Giá',
        selector: row => row.Fee,
        sortable: true,
    },
    {
        name: 'Tình trạng',
        selector: row => row.CourseState,
        sortable: true,
    },
    {
        name: 'Hành động',
        selector: row => <UpdateAction view="/profile"/> ,
        minWidth: '200px',
    },
];
const approvalColumn = [
    ...coursemanageColumn.filter(e=>e.name != 'Hành động'),

    {
        name: 'Hành động',
        selector: row => <ApprovalAction />,
        minWidth: '200px',
    },
]
const usermanageColumn = [

    {
        name: 'UserID',
        selector: row => row.USER_ID,
        sortable: true,
    },
    {
        name: 'Họ tên',
        selector: row => row.FULLNAME,
        sortable: true,
    },
    {
        name: 'Ngày sinh',
        selector: row => row.DATE_OF_BIRTH,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.EMAIL ,
        sortable: true,
    },
    {
        name: 'Coin',
        selector: row => row.COIN,
        sortable: true,
    },
    {
        name: 'SĐT',
        selector: row => row.PHONE,
        sortable: true,
    },
    {
        name: 'Trường học',
        selector: row => row.SCHOOL,
        sortable: true,
    },
    {
        name: 'Facebook',
        selector: row => row.FACEBOOK,
        sortable: true,
    },
    {
        name: 'Linkedln',
        selector: row => row.LINKEDLN,
        sortable: true,
    },
    {
        name: 'Bio',
        selector: row => row.BIO,
        sortable: true,
    },
    {
        name: 'Hành động',
        selector: row => <UpdateAction view="/profile"/> ,
        minWidth: '200px',
    },
];
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
function Approval() {
    const [data, setData] = useState();
    const [pending, setPending] = useState(true);
    useEffect(async () => {
        const res = await axios.get('/api/get-list-course')
        setPending(false);
        setData(res.data.message.filter(e => e.CourseState == 'Chờ duyệt bài'))
    }, [])
    return (
        <div className="course-manage-page">
            <h4 className="admin-page-title">Duyệt khóa học</h4>
            <div className="admin-search-box">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input type="text" />
                </div>
            </div>
            <DataTable
                columns={approvalColumn}
                data={data}
                customStyles={customStyles}
                highlightOnHover
                progressPending={pending}
            />
        </div>

    )
}
function CourseManage() {
    const [data, setData] = useState();
    useEffect(async () => {
        const res = await axios.get('/api/get-list-course')
        console.log(res)
        setData(res.data.message)
    }, [])
    return (
        <div className="course-manage-page">
            <h4 className="admin-page-title">Khóa học</h4>
            <div className="admin-search-box">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input type="text" />
                </div>
            </div>
            <DataTable
                columns={coursemanageColumn}
                data={data}
                customStyles={customStyles}
                highlightOnHover
            />
        </div>

    )
}
function UserManage() {
    const [data, setData] = useState();
    useEffect(async () => {
        const res = await axios.get('/api/get-list-user')
        console.log(res)
        setData(res.data.message)
    }, [])
    return (
        <div className="course-manage-page">
            <h4 className="admin-page-title">User</h4>
            <div className="admin-search-box">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input type="text" />
                </div>
            </div>
            <DataTable
                columns={usermanageColumn}
                data={data}
                customStyles={customStyles}
                highlightOnHover
            />
        </div>

    )
}
function ApprovalAction() {
    const handleRefuse = () => {
        Swal.fire({
            title: 'Lý do từ chối khóa học này',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {

            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }
    return (
        <>
            <a className="btn my-custom-button-default">Đồng ý</a>
            <a onClick={handleRefuse} className="btn my-custom-button-default">Từ chối</a>
        </>
    )
}
function UpdateAction(props){

    return (
        <>
            <Link to={props.view} target="_blank" rel="noopener"className="btn my-custom-button-default"><i className="far fa-eye"></i></Link>
            <a className="btn my-custom-button-default"><i className="far fa-edit"></i></a>
            <a className="btn my-custom-button-default"><i className="far fa-trash-alt"></i></a>
        </>
    )
}