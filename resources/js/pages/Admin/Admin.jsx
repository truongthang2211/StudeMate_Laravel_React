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
import moment from 'moment';
import CreateCourse from '../CreateCourse/CreateCourse';
import Learn from '../Learn/Learn';
export default function Admin() {
    const [User, setUser] = useState()
    const [Admin, setAdmin] = useState(() => {
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("; ", "&"))
        return cookieObj.get("StudyMateAdmin")
    });
    useEffect(() => {
        LoadUser();

    }, [])
    const LoadUser = async () => {
        const res = await axios.get('/api/get-user-admin')
        console.log(res);
        if (res.data.user) {
            setUser({ ...res.data.user });
        }
    }
    return (
        <>
            {(!Admin && <AdminLogin />) || <AdminPage User={User} />}
        </>
    );
}
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+\b)/g, ",")
}
function AdminLogin() {
    const [state, setState] = useState({
        username: '',
        password: '',
    });
    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const handleSignIn = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/login', state)
        console.log(res)
        if (res.data.status == 200) {
            window.location.reload();
        } else {
            Swal.fire({
                text: res.data.message,
                icon: 'error',
                confirmButtonText: 'Hay'
            })
        }
    }
    return (
        <div style={{ height: '100vh', position: 'relative' }}>
            <div className="wrap-form-head-register" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <div className="form-head-register">
                    <div className="forms-container">
                        <form id="signin-form">
                            <h2 className="title">Sign In</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input autoFocus type="text" id="username_login" name="username" onChange={handleInput} placeholder="Username" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" id="password_login" name="password" onChange={handleInput} placeholder="Password" />
                            </div>
                            <button onClick={handleSignIn} className="button solid">Sign In</button>
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
    
    const handleLogout = () => {
        document.cookie = 'StudyMateAdmin' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.reload();
    }
    const handleSearch = (data, value) => {
        if (data && data[0]) {
            const props = Object.keys(data[0]);
            return data.filter(e => {
                for (var p of props) {
                    if (e[p] && JSON.stringify(e[p]).includes(value)) {
                        return true;
                    }
                }
                return false;
            })
        } else {
            return [];
        }

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
                <Link to="/admin/approvaled" className="sidebar__feature-item">
                    <i className="fas fa-th-list"></i>
                    <span>Khóa học đã duyệt</span>
                </Link>
                <a onClick={handleLogout} className="sidebar__feature-item">
                    <i className="fas fa-th-list"></i>
                    <span>Đăng xuất</span>
                </a>
            </Sidebar>
            <div className="course-manage-content">
                {(feature == 'overview' || !feature) && <Overview />}
                {feature == 'approval' && <Approval Search={handleSearch} />}
                {feature == 'course-manage' && <CourseManage Search={handleSearch} />}
                {feature == 'user-manage' && <UserManage Search={handleSearch} />}
                {feature == 'approvaled' && <Approvaled Search={handleSearch} />}
            </div>
        </div>
    )
}
function Overview() {
    const topUserColumn = [
        {
            name: 'Họ tên',
            selector: row => <Link to={`/profile/${row.USER_ID}`} target="_blank">{row.FULLNAME}</Link>,
            sortable: true,
        },
        {
            name: 'Vote từ cmt',
            selector: row => row.cmt,
            sortable: true,
        },
        {
            name: 'Sô bài học',
            selector: row => row.baihoc,
            sortable: true,
        },
        {
            name: 'Vote từ khóa học',
            selector: row => row.khoahoc,
            sortable: true,
        },
        {
            name: 'Chỉ số tích cực',
            selector: row => row.total,
            sortable: true,
        },
    ]
    const topCourseColumn = [
        {
            name: 'CourseID',
            selector: row => row.COURSE_ID,
            sortable: true,
        },
        {
            name: 'Tên khóa học',
            selector: row => row.COURSE_NAME,
            sortable: true,
        },
        {
            name: 'Số lượt đăng ký',
            selector: row => row.registered,
            sortable: true,
        },
    ]
    const [data, setData] = useState();
    const updateOverview = async () => {
        const res = await axios.get('/api/get-overview-admin');
        console.log(res);
        setData(res.data.message);

    }
    useEffect(() => {
        updateOverview();
    }, [])
    useEffect(() => {
        if (data) {
            updateAnalBox()
        }
    }, [data])
    const labelsThisYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const TempDataAnal = {
        labels: labelsThisYear,
        datasets: [
            {
                label: 'Dataset 1',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    const [dataanal, setDataanal] = useState(TempDataAnal);
    const [timevalue, setTimevalue] = useState('7d');
    const [typevalue, setTypevalue] = useState('Payments');
    const [TimeContent, setTimeContent] = useState('7 ngày qua')
    const [TypeContent, setTypeContent] = useState('Doanh thu')
    const [TotalContent, setTotalContent] = useState(0)
    const updateAnalBox = (TYPE = typevalue, TIME = timevalue) => {
        var NumberLabel = parseInt(TIME.substring(0, 2));

        const LabelAnal = [];
        const DataAnal = TempDataAnal.datasets;
        var Timetype = 'days';
        var FormatType = 'DD/MM/YYYY';
        if (TIME === "12m") {
            Timetype = 'months'
            FormatType = 'MM/YYYY';
        }
        var CreateAt = TYPE == 'Payments' ? 'ENROLL_TIME' : 'CREATED_AT'
        var Total = 0;
        for (var i = NumberLabel; i > -1; --i) {
            var thisMoment = moment().subtract(i, Timetype)
            LabelAnal.push(thisMoment.format(FormatType.replace('/YYYY', '')))
            var number = 0;
            if (TYPE != 'Payments') {
                number = data[TYPE].filter(item => moment(item[CreateAt], "YYYY-MM-DD HH:mm:ss").format(FormatType) == thisMoment.format(FormatType)).length
            } else {
                number = data[TYPE].filter(item => moment(item[CreateAt], "YYYY-MM-DD HH:mm:ss").format(FormatType) == thisMoment.format(FormatType)).reduce((a, b) => a + b.AMOUNT, 0)

            }
            DataAnal[0].data.push(number)
            Total += number;
        }
        DataAnal[0].label = TYPE == 'Payments' ? "Doanh thu" : TYPE == 'Courses' ? "Khóa học" : "Người dùng";

        setTotalContent(Total)
        setDataanal({ labels: LabelAnal, datasets: DataAnal })
    }
    const handleTypeChange = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        setTypeContent(e.nativeEvent.target[index].text)
        const type = e.target.value
        setTypevalue(type);

        updateAnalBox(type);
    }
    const handleTimeChange = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        setTimeContent(e.nativeEvent.target[index].text)
        const time = e.target.value;
        setTimevalue(time)
        updateAnalBox(typevalue, time);

    }

    const CourseToday = !data ? "Loading..." :
        data.Courses.filter(e => moment().format("DD/MM/YYYY") == moment(e.CREATED_AT, "YYYY-MM-DD HH:mm:ss")
            .format("DD/MM/YYYY")).length
    const CourseYesterday = !data ? "Loading..." :
        data.Courses.filter(e => moment().subtract(1, 'days').format("DD/MM/YYYY") == moment(e.CREATED_AT, "YYYY-MM-DD HH:mm:ss")
            .format("DD/MM/YYYY")).length
    return (
        <div className="admin-manage-overview">

            <div className="overview-top-info">
                <div className="overview-info-left">
                    <div className="overview-info-left-top">
                        <div className="card-body p-3 text-center border-shadow-box">
                            <p className="text text-center" style={{ color: "green" }} >
                                {!data ? "Loading..." :((data.RevenueToDay - data.RevenueYesterDay)*100
                                    / ((data.RevenueToDay + data.RevenueYesterDay) == 0 ? 1 : (data.RevenueToDay + data.RevenueYesterDay))).toFixed(2)}%</p>
                            <div className="h1 m-0">{!data ? "Loading..." : formatNumber(data.RevenueToDay)} đ</div>
                            <p className="text  mb-4" color="gray">Doanh thu hôm nay</p>
                        </div>
                        <div className="card-body p-3 text-center border-shadow-box">
                            <p className="text text-center" style={{ color: "green" }} >
                                {!data ? "Loading..." : ((data.UserToDay - data.UserYesterDay)*100
                                    / ((data.UserToDay + data.UserYesterDay) == 0 ? 1 : (data.UserToDay + data.UserYesterDay))).toFixed(2)}%</p>
                            <div className="h1 m-0">{!data ? "Loading..." : data.UserToDay}</div>
                            <p className="text  mb-4" color="gray">Người dùng hôm nay</p>
                        </div>
                        <div className="card-body p-3 text-center border-shadow-box">
                            <p className="text text-center" style={{ color: "green" }} >
                                {((CourseToday - CourseYesterday) *100/ 
                                ((CourseToday + CourseYesterday) == 0 ? 1 : (CourseToday + CourseYesterday))).toFixed(2)}%</p>
                            <div className="h1 m-0">{CourseToday}</div>
                            <p className="text  mb-4" color="gray">Khóa học hôm nay</p>
                        </div>
                    </div>
                    <div className="overview-info-left-bottom">
                        <div className="card-body p-3 text-center border-shadow-box">
                            <p className="text text-center" style={{ color: "green" }} >
                                {!data ? "Loading..." : ((data.RevenueToDay - data.RevenueYesterDay)
                                    / ((data.TotalRevenue) == 0 ? 1 : (data.TotalRevenue))).toFixed(4)}%</p>
                            <div className="h1 m-0">{!data ? "Loading..." : formatNumber(data.TotalRevenue)} đ</div>
                            <p className="text  mb-4" color="gray">Tổng doanh thu</p>
                        </div>
                    </div>
                </div>
                <div className="overview-info-right">
                    <AnalysisBox Data={dataanal}>
                        <span>{TypeContent} trong {TimeContent}: {formatNumber(TotalContent)}</span>
                        <select value={timevalue} onChange={handleTimeChange} className="time-combobox">
                            <option value="7d">7 ngày qua</option>
                            <option value="30d">30 ngày qua</option>
                            <option value="90d">3 Tháng qua</option>
                            <option value="12m">Năm này</option>
                        </select>
                        <select value={typevalue} onChange={handleTypeChange} className="type-combobox">
                            <option value="Payments">Doanh thu</option>
                            <option value="Accounts">Người dùng</option>
                            <option value="Courses">Khóa học</option>
                        </select>

                    </AnalysisBox>
                </div>
            </div>
            <div className="overview-bottom-info">
                <div className="border-shadow-box overview-info-left d-block">
                    <h5>Top 5 người dùng tích cực </h5>
                    <DataTable
                        columns={topUserColumn}
                        customStyles={customStyles}
                        highlightOnHover
                        data={data && data.topUser}
                    />
                </div>
                <div className="border-shadow-box overview-info-right d-block">
                    <h5>Top 5 khóa học nổi bật</h5>

                    <DataTable
                        columns={topCourseColumn}
                        customStyles={customStyles}
                        highlightOnHover
                        data={data && data.topCourse}
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
        selector: row => formatNumber(row.COIN),
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
        selector: row => <UpdateAction view={`/profile/${row.USER_ID}`} edit={"edit/" + row.USER_ID} />,
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


function Approval(props) {
    const [searchvalue, setSearchvalue] = useState('');
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
            selector: row => <Link to={`/profile/${row.Author.UserID}`}>{row.Author.FullName}</Link>,
            sortable: true,
        },
        {
            name: 'Ngày đăng ký',
            selector: row => row.CourseCreate,
            sortable: true,
        },
        {
            name: 'Giá',
            selector: row => formatNumber(row.Fee),
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
            selector: row => <ApprovalAction actiontype={row.ActionType} callback={updateapp} _id={row._id} />,
            minWidth: '200px',
        },
    ]
    return (
        <div className="course-manage-page">
            <h4 className="admin-page-title">Duyệt khóa học</h4>
            <div className="admin-search-box">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input type="text" value={searchvalue} onChange={e => setSearchvalue(e.target.value)} />
                </div>
            </div>
            <DataTable
                columns={approvalColumn}
                data={props.Search(data, searchvalue)}
                customStyles={customStyles}
                highlightOnHover
                progressPending={pending}
            />
        </div>

    )
}
function CourseManage(props) {
    const [searchvalue, setSearchvalue] = useState('');
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
            name: 'ID khóa học',
            selector: row => row.CourseID,
            sortable: true,
        },
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
            selector: row => formatNumber(row.Fee),
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
                edit={"edit/" + row.CourseID} state={row.CourseState} course_id={row.CourseID} />,
            minWidth: '200px',
        },
    ];
    return (
        <div className="course-manage-page">
            <h4 className="admin-page-title">Khóa học</h4>
            <div className="admin-search-box">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input type="text" value={searchvalue} onChange={e => setSearchvalue(e.target.value)} />
                </div>
            </div>
            <DataTable
                columns={coursemanageColumn}
                data={props.Search(data, searchvalue)}
                customStyles={customStyles}
                highlightOnHover
            />
        </div>

    )
}
function UserManage(props) {
    const [data, setData] = useState();
    const [searchvalue, setSearchvalue] = useState('');
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
                    <input type="text" value={searchvalue} onChange={e => setSearchvalue(e.target.value)} />
                </div>
            </div>
            <DataTable
                columns={usermanageColumn}
                data={props.Search(data, searchvalue)}
                customStyles={customStyles}
                highlightOnHover
            />
        </div>

    )
}
function Approvaled(props) {
    const [searchvalue, setSearchvalue] = useState('');
    const approvaledColumn = [

        {
            name: 'ApprovalID',
            selector: row => row.APPROVAL_ID,
            sortable: true,
        },
        {
            name: 'ID khóa học',
            selector: row => row.COURSE_ID,
            sortable: true,
        },
        {
            name: 'Thời gian',
            selector: row => row.APPROVE_TIME,
            sortable: true,
        },
        {
            name: 'Hành động',
            selector: row => row.ACCEPT ? "Chấp nhận" : "Từ chối",
            sortable: true,
        },
        {
            name: 'Lý do',
            selector: row => row.REASON,
            sortable: true,
        },

    ];
    const [data, setData] = useState();
    useEffect(async () => {
        const res = await axios.get('/api/get-list-approvaled')
        console.log(res)
        setData(res.data.message)
    }, [])
    return (
        <div className="course-manage-page">
            <h4 className="admin-page-title">Duyệt bài</h4>
            <div className="admin-search-box">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input type="text" value={searchvalue} onChange={e => setSearchvalue(e.target.value)} />
                </div>
            </div>
            <DataTable
                columns={approvaledColumn}
                data={props.Search(data, searchvalue)}
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
        var url = '/api/action-course'
        if (props.actiontype == 'Sửa đổi') {
            url = '/api/update-course-app'
        }
        const res = await axios.post(url, { _id: props._id, accept: true })
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
    const lock_Classname = props.state == "Công khai" ? "fas fa-lock" : props.state == "Bị khóa" ? "fas fa-lock-open" : "";
    const handleLock = () => {
        if (props.state == "Công khai") {
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
                    const res = await axios.post('/api/lock-course-action', { course_id: props.course_id, reason: reason })
                    console.log(res)
                    props.callback();
                },
                allowOutsideClick: () => !Swal.isLoading()
            })
        } else {
            Swal.fire({
                title: 'Bạn có chắc mở khóa khóa học này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xác nhận'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.post('/api/lock-course-action', { course_id: props.course_id })
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
            <a onClick={handleLock} className={lock_Classname ? "btn my-custom-button-default" : "d-none"}><i className={lock_Classname}></i></a>
        </>
    )
}
function Feature({ feature, action, id }) {
    const [data, setData] = useState({});
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
        if (url && post_obj) {
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
            case 'approval':
                return <Learn LearnData={data} Admin />
            case 'course-manage':
                return <Learn Admin />
            default:
                break;
        }
    }

}