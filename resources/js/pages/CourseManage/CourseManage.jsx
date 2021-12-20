import React, { useState, useRef, useEffect } from 'react';
import './CourseManage.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import AnalysisBox, { AnalysisItemInfo } from '../../components/AnalysisBox/AnalysisBox';
import DataTable from 'react-data-table-component';
import RatingBox from '../../components/RatingBox/RatingBox';
import moment from 'moment';
import CreateCourse from '../CreateCourse/CreateCourse';
import My404 from '../My404/My404'
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+\b)/g, ",")
}
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
const columns2 = [
    {
        selector: row => <img src={'/' + row.CourseIMG} width="184px" height="130px" style={{ margin: "16px 0", borderRadius: "5px" }} />,
        width: '216px',
        compact: true
    },
    {
        name: 'Tên khóa học',
        selector: row => row.CourseTitle,
    },
    {
        name: 'Ngày đăng ký',
        selector: row => row.Created_at,
        compact: true
    },
    {
        name: 'Giá',
        selector: row =>formatNumber( row.Price),
    },

    {
        name: 'Hoa hồng',
        selector: row => row.Commission,
    },
    {
        name: 'Tình trạng',
        selector: row => row.Status,
    },
    {
        name: 'Đánh giá',
        selector: row => <RatingBox up={row.Rate.up} down={row.Rate.down} />,
        width: '160px',
        compact: true
    },
    {
        name: 'Tiền kiếm được',
        selector: row => formatNumber(row.Earn) + ' VND',
    },
    {
        name: 'Số người đăng ký',
        selector: row => row.Subcribe,
    },
    {
        name: 'Hành động',
        selector: row => <Link to={"edit/" + row.CourseID} target="_blank"><i className="fas fa-edit"></i></Link>,
    },
];
function CourseManage(props) {
    const { feature, course_id } = useParams();
    if (course_id) {

        return <Feature feature={feature} id={course_id} />
    }
    console.log(feature);
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
        <>
            <div id="course-manage">
                <Sidebar User={props.User} >
                    <Link to="/course-manage/overview" className="sidebar__feature-item">
                        <i className="fas fa-home"></i>
                        <span>Tổng quan</span>
                    </Link >
                    <Link to="/course-manage/registeredcourse" className="sidebar__feature-item">
                        <i className="fas fa-list-alt"></i>
                        <span>Khóa học đã đăng ký</span>
                    </Link>
                    <Link to="/course-manage/mycourse" className="sidebar__feature-item">
                        <i className="fas fa-th-list"></i>
                        <span>Khóa học của bạn</span>
                    </Link>
                    <Link to="/course-manage/mycourseapp" className="sidebar__feature-item">
                        <i className="fas fa-th-list"></i>
                        <span>Khóa học chờ duyệt</span>
                    </Link>
                </Sidebar>
                <div className="course-manage-content">
                    {(feature == 'overview' || !feature) && <Overview />}
                    {feature == 'registeredcourse' && <RegisteredCourse Search={handleSearch} />}
                    {feature == 'mycourse' && <MyCourse />}
                    {feature == 'mycourseapp' && <MyCourseApproving />}
                </div>

            </div>

        </>
    );
}
export default CourseManage;
function Overview() {
    const [data, setData] = useState();
    const updateOverview = async () => {
        const res = await axios.get('/api/get-overview');
        console.log(res);
        setData(res.data.message);

    }
    useEffect(() => {
        updateOverview();
    }, [])
    useEffect(() => {
        if (data) {
            updateAnalBox()
            setInfoToday({
                Revenue: data['payments'].filter(item => moment(item['ENROLL_TIME'], "YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY') == moment().format('DD/MM/YYYY')).reduce((a, b) => a + b.AMOUNT, 0),
                Register: data['enrollments'].filter(item => moment(item['ENROLL_TIME'], "YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY') == moment().format('DD/MM/YYYY')).length,
                Learnt: data['learns'].filter(item => moment(item['LEARN_TIME'], "YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY') == moment().format('DD/MM/YYYY')).length,
            })
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
    const [typevalue, setTypevalue] = useState('payments');
    const [TimeContent, setTimeContent] = useState('7 ngày qua')
    const [TypeContent, setTypeContent] = useState('Doanh thu')
    const [TotalContent, setTotalContent] = useState(0)
    const [InfoToday, setInfoToday] = useState({ Revenue: 0, Register: 0, Learnt: 0 })




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
        var CreateAt = TYPE != 'learns' ? 'ENROLL_TIME' : 'LEARN_TIME'
        var Total = 0;
        for (var i = NumberLabel; i > -1; --i) {

            var thisMoment = moment().subtract(i, Timetype)
            LabelAnal.push(thisMoment.format(FormatType.replace('/YYYY', '')))
            var number = 0;
            if (TYPE != 'payments') {
                number = data[TYPE].filter(item => moment(item[CreateAt], "YYYY-MM-DD HH:mm:ss").format(FormatType) == thisMoment.format(FormatType)).length
            } else {
                number = data[TYPE].filter(item => moment(item[CreateAt], "YYYY-MM-DD HH:mm:ss").format(FormatType) == thisMoment.format(FormatType)).reduce((a, b) => a + b.AMOUNT, 0)

            }

            DataAnal[0].data.push(number)

            Total += number;
        }
        DataAnal[0].label = TYPE == 'payments' ? "Doanh thu" : TYPE == 'learns' ? "Bài học" : "Người đăng ký";
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
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+\b)/g, ",")
    }

    return (
        <div className="course-manage-overview">
            <AnalysisBox Data={dataanal}>
                <span>{TypeContent} trong {TimeContent}: {formatNumber(TotalContent)}</span>
                <select value={timevalue} onChange={handleTimeChange} className="time-combobox">
                    <option value="7d">7 ngày qua</option>
                    <option value="30d">30 ngày qua</option>
                    <option value="90d">3 Tháng qua</option>
                    <option value="12m">Năm này</option>
                </select>
                <select value={typevalue} onChange={handleTypeChange} className="type-combobox">
                    <option value="payments">Doanh thu</option>
                    <option value="enrollments">Nguời đăng ký</option>
                    <option value="learns">Bài học</option>
                </select>

            </AnalysisBox>
            <div className="anal-infos">
                <AnalysisItemInfo title="Doanh thu của bạn" content={formatNumber(InfoToday.Revenue) + " VNĐ"} time="Hôm nay" className="anal-item-custom" />
                <AnalysisItemInfo title="Số người đăng ký" content={InfoToday.Register} time="Hôm nay" className="anal-item-custom" />
                <AnalysisItemInfo title="Bài học đã học" content={InfoToday.Learnt} time="Hôm nay" className="anal-item-custom" />
            </div>
        </div>
    );
}
function RegisteredCourse(props) {
    const [searchvalue, setSearchvalue] = useState('');
    const [data, setData] = useState();
    const updateData = async () => {
        const res = await axios.get('/api/get-registered-courses')
        console.log(res)
        setData(res.data.message)
    }
    useEffect(async () => {
        updateData()
    }, [])
    const coursemanageColumn = [
        {
            selector: row => <img src={'/' + row.IMG} width="184px" height="130px" style={{ margin: "16px 0", borderRadius: "5px" }} />,
            width: '216px',
            compact: true
        },
        {
            name: 'Tên khóa học',
            selector: row => <Link to={'/course/' + row.COURSE_ID} target="_blank">{row.COURSE_NAME}</Link>,
            sortable: true,
        },
        {
            name: 'Tác giả',
            selector: row => <Link to={'/profile/' + row.AUTHOR_ID} target="_blank">{row.FULLNAME}</Link>,
            sortable: true,
        },
        {
            name: 'Ngày đăng ký',
            selector: row => row.ENROLL_TIME,
            sortable: true,
        },
        {
            name: 'Giá',
            selector: row => formatNumber(row.paid),
            sortable: true,
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
function MyCourse() {
    const [mycoursedata, setData] = useState([]);
    useEffect(async () => {
        try {
            const res = await axios.get('/api/my-course');
            setData([...res.data.message]);
            console.log([...res.data.message]);
        } catch (error) {
            console.log(error.response.data.message);
        }

    }, [])
    return (
        <DataTable
            columns={columns2}
            data={mycoursedata}
            customStyles={customStyles}
            highlightOnHover
            responsive="false"
        />

    );
}
function MyCourseApproving() {
    const MyCourseAppColumn = [
        {
            selector: row => <img src={'/' + row.CourseIMG} width="184px" height="130px" style={{ margin: "16px 0", borderRadius: "5px" }} />,
            width: '216px',
            compact: true
        },
        {
            name: 'Tên khóa học',
            selector: row => row.CourseTitle,
        },
        {
            name: 'Ngày đăng ký',
            selector: row => row.CourseCreate,
            compact: true
        },
        {
            name: 'Giá',
            selector: row => formatNumber(row.Fee),
        },

        {
            name: 'Tình trạng',
            selector: row => row.CourseState,
        },
        {
            name: 'Hành động',
            selector: row => row.ActionType,
        },
    ];
    const [mycoursedata, setData] = useState([]);
    useEffect(async () => {
        try {
            const res = await axios.get('/api/my-course-app');
            setData([...res.data.message]);
            console.log(res);
        } catch (error) {
            console.log(error.response.data.message);
        }

    }, [])
    return (
        <DataTable
            columns={MyCourseAppColumn}
            data={mycoursedata}
            customStyles={customStyles}
            highlightOnHover
            responsive="false"
        />

    );
}
function Feature({ feature, id }) {
    const [data, setData] = useState();
    useEffect(async () => {
        let url;
        let post_obj;
        url = '/api/get-course';
        post_obj = { course_id: id }
        if (url && post_obj) {
            const res = await axios.post(url, post_obj)
            console.log(res);

            setData(res.data.message);
        }
    }, [])
    const cookieObj = new URLSearchParams(document.cookie.replaceAll("; ", "&"))
    const user_id = cookieObj.get("StudyMate")
    if (data && (user_id != data.Author)) {
        return <My404 />
    }
    switch (feature) {

        case 'mycourse':
            return <CreateCourse CourseData={data} Edit />
        default:
            break;
    }


}
