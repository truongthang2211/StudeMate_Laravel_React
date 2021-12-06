import React, { useState, useRef, useEffect, memo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AnalysisBox, { AnalysisItemInfo } from '../../components/AnalysisBox/AnalysisBox';
import DataTable from 'react-data-table-component';
import Sidebar from '../../components/Sidebar/Sidebar';
import Swal from 'sweetalert2'
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
                    <span>Duyệt khóa học</span>
                </Link>
                <Link to="/admin/course-manage" className="sidebar__feature-item">
                    <i className="fas fa-th-list"></i>
                    <span>Quản lý khóa học</span>
                </Link>
                <Link to="/admin/mycourse" className="sidebar__feature-item">
                    <i className="fas fa-th-list"></i>
                    <span>Quản lý khóa học</span>
                </Link>

            </Sidebar>
            <div className="course-manage-content">
                {(feature == 'overview' || !feature) && <Overview />}
                {(feature == 'approval' || !feature) && <Approval />}
                {feature == 'course-manage' && <CourseManage />}
                {feature == 'mycourse' && <ApprovalAction />}
            </div>
        </div>
    )
}
function Overview() {
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
const coursemanageColumn = [

    {
        name: 'Tên khóa học',
        selector: row => row.CourseTitle,
    },
    {
        name: 'Danh mục',
        selector: row => row.CourseType,
    },
    {
        name: 'Tác giả',
        selector: row => row.Author.FullName,
    },
    {
        name: 'Ngày đăng ký',
        selector: row => row.CourseCreate,
    },
    {
        name: 'Giá',
        selector: row => row.Fee,
    },
    {
        name: 'Tình trạng',
        selector: row => row.CourseState,
    },
];
const approvalColumn = [
    ...coursemanageColumn,
    
    {
        name: 'Hành động',
        selector: row => <ApprovalAction/>,
    },
]
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
    useEffect(async () => {
        const res = await axios.get('/api/get-list-course')
        console.log(res)
        setData(res.data.message.filter(e=>e.CourseState == 'Chờ duyệt bài'))
    }, [])
    return (
        <DataTable
            columns={approvalColumn}
            data={data}
            customStyles={customStyles}
            highlightOnHover
        />
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
        <DataTable
            columns={coursemanageColumn}
            data={data}
            customStyles={customStyles}
            highlightOnHover
        />
    )
}
function UserManage() {

}
function ApprovalAction() {
    const handleRefuse = ()=>{
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
            <a  class="btn my-custom-button-default">Đồng ý</a>
            <a onClick={handleRefuse} class="btn my-custom-button-default">Từ chối</a>
        </>
    )
}
