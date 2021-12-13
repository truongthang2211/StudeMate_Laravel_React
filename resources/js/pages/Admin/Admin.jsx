import React, { useState, useRef, useEffect, memo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AnalysisBox, { AnalysisItemInfo } from '../../components/AnalysisBox/AnalysisBox';
import DataTable from 'react-data-table-component';
import Sidebar from '../../components/Sidebar/Sidebar';
import Swal from 'sweetalert2'
import './Admin.css'
import MyInfo from '../MyInfo/MyInfo';
import CreateCourse from '../CreateCourse/CreateCourse';
import Learn from '../Learn/Learn';
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
    const { feature, action, id } = useParams();
    if (id) {
        return <Feature action={action} feature={feature} id={id} />;
    }
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
    const[data, setData] = useState();
    const updateOverview = async ()=>{
        const res = await axios.get('/api/get-overview');
        console.log(res);
        setData(res.data.message);
    }
    useEffect(()=>{
        updateOverview();
    },[])
    return (
        <div className="admin-manage-overview">

            <div className="overview-top-info">
                <div className="overview-info-left">
                    <div className="overview-info-left-top">
                        <div className="card-body p-3 text-center border-shadow-box">
                            <p className="text text-center" style={{ color: "green" }} >+6%</p>
                            <div className="h1 m-0">{!data?"Loading...":data.RevenueToDay}</div>
                            <p className="text  mb-4" color="gray">Doanh thu hôm nay</p>
                        </div>
                        <div className="card-body p-3 text-center border-shadow-box">
                            <p className="text text-center" style={{ color: "green" }} >+6%</p>
                            <div className="h1 m-0">{!data?"Loading...":data.UserToDay}</div>
                            <p className="text  mb-4" color="gray">Người dùng hôm nay</p>
                        </div>
                        <div className="card-body p-3 text-center border-shadow-box">
                            <p className="text text-center" style={{ color: "green" }} >+6%</p>
                            <div className="h1 m-0">{!data?"Loading...":data.RevenueToDay}</div>
                            <p className="text  mb-4" color="gray">Khóa học hôm nay</p>
                        </div>
                    </div>
                    <div className="overview-info-left-bottom">
                        <div className="card-body p-3 text-center border-shadow-box">
                            <p className="text text-center" style={{ color: "green" }} >+6%</p>
                            <div className="h1 m-0">{!data?"Loading...":data.TotalRevenue}</div>
                            <p className="text  mb-4" color="gray">Tổng doanh thu</p>
                        </div>
                    </div>
                </div>
                <div className="overview-info-right">
                    <AnalysisBox />
                </div>
            </div>
            <div className="overview-bottom-info">
                <div className="border-shadow-box overview-info-left">
                    <DataTable
                        columns={topUserColumn}
                        customStyles={customStyles}
                        highlightOnHover
                    />
                </div>
                <div className="border-shadow-box overview-info-right">
                    <DataTable
                        columns={topUserColumn}
                        customStyles={customStyles}
                        highlightOnHover
                    />
                </div>

            </div>
            {/*
            <div className="anal-infos">
                <AnalysisItemInfo title="Doanh thu của bạn" content="18,000,000 VNĐ" time="Hôm nay" className="anal-item-custom" />
                <AnalysisItemInfo title="Số người đăng ký" content="221" time="Hôm nay" className="anal-item-custom" />
                <AnalysisItemInfo title="Bài học đã học" content="135" time="Hôm nay" className="anal-item-custom" />
            </div> */}
        </div>
    );
}


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
        selector: row => row.EMAIL,
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
        selector: row => <UpdateAction view="/profile" edit={"edit/" + row.USER_ID} />,
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

const topUserColumn = [
    {
        name: 'UserID',
        selector: row => row.user_id,
        sortable: true,
    },
    {
        name: 'Họ tên',
        selector: row => row.fullname,
        sortable: true,
    },
    {
        name: 'Số vote up',
        selector: row => row.voted,
        sortable: true,
    },
]
function Approval() {

    const [data, setData] = useState();
    const [pending, setPending] = useState(true);
    useEffect(() => {
        updateapp()
    }, [])
    const updateapp = async () => {
        const res = await axios.get('/api/get-list-createapp')
        console.log(res)
        setPending(false);
        setData(res.data.message.filter(e => e.CourseState == 'Chờ duyệt bài'))
    }
    const approvalColumn = [
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
            name: 'Thực hiện',
            selector: row => row.ActionType,
            minWidth: '200px',
        },
        {
            name: 'Hành động',

            selector: row => <Link to={"learn/" + row._id.$oid} target="_blank" rel="noopener" className="btn my-custom-button-default"><i className="far fa-eye"></i></Link>,
            minWidth: '200px',
        },
        {
            name: 'Hành động',
            selector: row => <ApprovalAction callback={updateapp} _id={row._id} />,
            minWidth: '200px',
        },
    ]
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
    const updateData = async () => {
        const res = await axios.get('/api/get-list-course')
        console.log(res)
        setData(res.data.message)
    }
    useEffect(async () => {
        updateData()
    }, [])
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
            name: 'Hoa hồng',
            selector: row => row.Commission,
            sortable: true,
        },
        {
            name: 'Tình trạng',
            selector: row => row.CourseState,
            sortable: true,
        },
        {
            name: 'Hành động',
            selector: row => <UpdateAction view={"learn/" + row.CourseID} callback={updateData}
            edit={"edit/" + row.CourseID} state={row.CourseState} course_id={row.CourseID}/>,
            minWidth: '200px',
        },
    ];
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
function ApprovalAction(props) {
    const handleRefuse = () => {
        Swal.fire({
            title: 'Lý do từ chối khóa học này',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            showLoaderOnConfirm: true,
            preConfirm: async (reason) => {
                const res = await axios.post('/api/action-course', { _id: props._id, accept: false, reason: reason })
                console.log(res)
                props.callback();
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }
    const handleAccept = async () => {
        const res = await axios.post('/api/action-course', { _id: props._id, accept: true })
        console.log(res)
        props.callback();
    }
    return (
        <>
            <a onClick={handleAccept} className="btn my-custom-button-default">Đồng ý</a>
            <a onClick={handleRefuse} className="btn my-custom-button-default">Từ chối</a>
        </>
    )
}
function UpdateAction(props) {
    const lock_Classname= props.state == "Công khai"?"fas fa-lock": props.state =="Bị khóa"?"fas fa-lock-open":"";
    const handleLock = () => {
        if (props.state=="Công khai"){
            Swal.fire({
                title: 'Lý do khóa khóa học này',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                showLoaderOnConfirm: true,
                preConfirm: async (reason) => {
                    const res = await axios.post('/api/lock-course-action', {course_id: props.course_id,reason:reason})
                    console.log(res)
                    props.callback();
                },
                allowOutsideClick: () => !Swal.isLoading()
            })
        }else{
            Swal.fire({
                title: 'Bạn có chắc mở khóa khóa học này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xác nhận'
              }).then( async(result) => {
                if (result.isConfirmed) {
                    const res = await axios.post('/api/lock-course-action', {course_id: props.course_id})
                    console.log(res)
                    props.callback();
                }
              })
        }
    }
    return (
        <>
            <Link to={props.view} target="_blank" rel="noopener" className="btn my-custom-button-default"><i className="far fa-eye"></i></Link>
            <Link to={props.edit} target="_blank" className="btn my-custom-button-default"><i className="far fa-edit"></i></Link>
            <a onClick={handleLock} className={lock_Classname?"btn my-custom-button-default":"d-none"}><i className={lock_Classname}></i></a>
        </>
    )
}
function Feature({ feature, action, id }) {
    const [data, setData] = useState();
    useEffect(async () => {
        let url;
        let post_obj;
        if (action == 'edit') {
            if (feature == 'user-manage') {
                url = '/api/get-user';
                post_obj = { user_id: id }
            } else if (feature == 'course-manage') {
                url = '/api/get-course';
                post_obj = { course_id: id }
            }
        } else {
            if (feature == 'approval') {
                url = '/api/get-learn-app';
                post_obj = { course_id: id }

            } 
        }
        if (url && post_obj){
            const res = await axios.post(url, post_obj)
            console.log(res);
            setData(res.data.message);
        }
        
    }, [])
    if (action == 'edit') {
        switch (feature) {
            case 'user-manage':
                return <MyInfo User={data} />
            case 'course-manage':
                return <CreateCourse CourseData={data} Admin />
            case 'approval':
                return <Learn LearnData={data} Admin />
            default:
                break;
        }
    } else {
        switch (feature) {

            case 'course-manage':
                return <Learn Admin />
            default:
                break;
        }
    }

}