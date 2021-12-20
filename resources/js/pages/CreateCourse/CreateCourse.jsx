import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import './CreateCourse.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import { ListCategory, ListCourse } from '../../Data.js'
const API_KEY = 'AIzaSyAzSvXwjoICRPziR_FXQmuus_eSvMTin7I';

const CreateData = {
    CourseTitle: '',
    Price: 0,
    TotalDuration: 0,
    Description: '',
    Category: -1,
    SubCategory: -1,
    State: 'Chờ duyệt bài',
    Image: 'https://imic.com.vn/public/site/images/no-image.jpg',
    ListIn: [],
    ListOut: [],
    AutoTitle: true,
    AutoCreateList: false,
    Commission: 20,
    ListCourse: [],
    Author: -1,
    Created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
}



let fd;
export default function CreateCourse({ User, CourseData, Admin }) {
    const nav = useNavigate();
    const [Data, setData] = useState(CourseData ?? CreateData);
    useEffect(() => {
        if (!CourseData && User) {
            setData({ ...Data, Author: User.USER_ID, ActionType: 'Thêm mới' })
        }
    }, [User])
    useEffect(() => {
        if (CourseData && !User) {
            setData({ ...Data, ...CourseData, ActionType: 'Sửa đổi' })
        }
    }, [CourseData])
    const handleOnchange = (list) => {
        const newData = { ...Data };
        list.forEach(element => {
            newData[element[0]] = element[1];
        });
        setData(newData);
        console.log(newData)
    }
    const [Page, setPage] = useState(1);
    const handleNextPage = () => {
        if (Page === 2) {
            fd = new FormData(document.querySelector('#create-course-form'));
            console.log(fd)
        }
        else if (Page === 4)
            return;

        setPage(pre => pre + 1);
    }
    const handlePrevious = () => {
        if (Page === 1)
            return;
        setPage(pre => pre - 1);
    }
    const CheckInput = () => {
        switch (Page) {
            case 1:
                return (Data.CourseTitle != '' && Data.Description != ''
                    && Data.Category != -1 && Data.SubCategory != -1)
            case 2:
                return (Data.Image != 'https://imic.com.vn/public/site/images/no-image.jpg')
            case 4:
                for (var i = 0; i < Data.ListCourse.length; ++i) {
                    if (Data.ListCourse[i].type == 'lesson' && Data.ListCourse[i].error) {
                        return false;
                    }
                }
                return true;
            default:
                return true;
        }
    }
    const buttonClassName = "btn my-custom-button-default";
    function youtube_id(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    const handleSubmit = async () => {
        if (Data.ListCourse.length < 1 || Data.ListCourse[0].type != 'chapter') {
            Swal.fire({
                text: 'Phải có chương ở vị trí đầu tiên',
                icon: 'error',
                confirmButtonText: 'Hay'
            })
            return;
        }
        Swal.fire({
            title: 'Bạn có chắc muốn ' + Data.ActionType.toLowerCase() + ' khóa học?',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            showLoaderOnConfirm: true,
            icon: "question",
            preConfirm: async () => {
                const newListCourse = [];
                for (var i = 0; i < Data.ListCourse.length; ++i) {
                    if (Data.ListCourse[i].type == 'chapter') {
                        newListCourse.push({ title: Data.ListCourse[i].title, lesson: [], id: Data.ListCourse[i].id ?? null })
                    } else {
                        let duration = '';
                        let youtb_id = youtube_id(Data.ListCourse[i].URL);
                        await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${youtb_id}&key=${API_KEY}`)
                            .then(data => data.json()).then(data => {
                                console.log(data)
                                duration = (moment.duration(data.items[0].contentDetails.duration).asMilliseconds())

                            })
                        newListCourse.at(-1).lesson = [
                            ...newListCourse.at(-1).lesson,
                            {
                                id: Data.ListCourse[i].id ?? null,
                                title: Data.ListCourse[i].title,
                                url: Data.ListCourse[i].URL,
                                duration: duration
                            }]
                    }
                }
                const newData = { ...Data, ListCourse: newListCourse }
                console.log(newData)
                fd.append('data', JSON.stringify(newData))
                const url = Admin ? "/api/update-course" : "/api/create-course-approval"
                return axios.post(url, fd, { "enctype": "multipart/form-data" })
                    .then(async (res) => {
                        console.log(res)
                        if (res.data.status == 200) {
                            await Swal.fire({
                                text: res.data.message,
                                icon: 'success',
                                confirmButtonText: 'Hay'
                            })
                            nav("/");
                        } else {
                            await Swal.fire({
                                text: res.data.message,
                                icon: 'error',
                                confirmButtonText: 'Hay'
                            })
                        }
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        })



    }
    return (
        <div className="container">
            <form id="create-course-form" className="create-course-form">
                <h2 className="create-course-title">Tạo khóa học</h2>
                {Page === 1 && <PageOne Data={Data} Admin={Admin} handleOnchange={handleOnchange} />}
                {Page === 2 && <PageTwo Data={Data} handleOnchange={handleOnchange} />}
                {Page === 3 && <PageThree Data={Data} handleOnchange={handleOnchange} />}
                {Page === 4 && <PageFour Data={Data} handleOnchange={handleOnchange} />}
                <div>
                    <a onClick={handlePrevious} className={Page === 1 ? buttonClassName + " disabled" : buttonClassName}>Lùi lại</a>
                    <a onClick={Page === 4 ? handleSubmit : handleNextPage} className={CheckInput() ? buttonClassName : buttonClassName + " disabled"}>{Page === 4 ? "Xác nhận" : "Tiếp theo"}</a>
                </div>
            </form>

        </div >
    );
}

function PageOne(props) {
    const [subCategoryList, setSubList] = useState(() => {
        if (ListCategory[props.Data.Category - 1111]) {
            return ListCategory[props.Data.Category - 1111].subCatogory
        }
        console.log()
        return []
    });
    useEffect(() => {
        if (ListCategory[props.Data.Category - 1111]) {
            setSubList(ListCategory[props.Data.Category - 1111].subCatogory)
        }
    }, [props.Data.Category])
    const handleClickCategory = (index) => {
        setSubList(ListCategory[index].subCatogory)
        props.handleOnchange([['Category', index + 1111], ['SubCategory', -1]])

    }
    const handleClickSubCategory = (id) => {
        props.handleOnchange([['SubCategory', id]])
    }
    function formatNumber(num) {
        return num?num.toString().replace(/\B(?=(\d{3})+\b)/g, ","):"0";
    }
    const onPriceChange = (e) => {
        if (/[a-zA-Z]/.test(e.target.value.toString())) {
            return;
        }
        e.target.value = e.target.value == '' ? '0' : e.target.value;
        let SoTien = parseInt(e.target.value.replace(/,/g, ""))
        if (SoTien > 10000000) {
            SoTien = 10000000
        }
        props.handleOnchange([['Price', SoTien]])
    }
    const onCommissionChange = (e) => {
        if (/[a-zA-Z]/.test(e.target.value.toString())) {
            return;
        }
        e.target.value = e.target.value == '' ? '0' : e.target.value;
        let HoaHong = parseInt(e.target.value.replace(/,/g, ""))
        if (HoaHong > 100) {
            HoaHong = 100
        }
        props.handleOnchange([['Commission', HoaHong]])
    }
    return (
        <div className="page-one-form">
            <div className="page-one-input">
                <div className="create-course-input-item">
                    <div className="input-field">
                        <input autoFocus type="text" name="CourseTitle" value={props.Data.CourseTitle || ''} onChange={(e) => props.handleOnchange([[e.target.name, e.target.value]])} className="create-course-form-input" placeholder=" " />
                        <label htmlFor="title" className="create-course-form-label">Tên khóa học</label>
                    </div>
                </div>
                <div className="create-course-input-item">
                    <div className="input-field PriceInput">
                        <input type="text" name="Price" value={formatNumber(props.Data.Price)} onChange={(e) => onPriceChange(e)} className="create-course-form-input" placeholder=" " />
                        <label htmlFor="title" className="create-course-form-label">Giá bán</label>
                    </div>
                </div>
                {props.Admin&&<div className="create-course-input-item">
                    <div className="input-field">
                        <input type="text" name="Commission" value={formatNumber(props.Data.Commission)} onChange={(e) => onCommissionChange(e)} className="create-course-form-input" placeholder=" " />
                        <label htmlFor="title" className="create-course-form-label">Hoa hồng</label>
                    </div>
                </div>}
                <div className="create-course-input-item">
                    <div className="input-field input-desc">
                        <textarea type="text" name="Description" value={props.Data.Description} onChange={(e) => props.handleOnchange([[e.target.name, e.target.value]])} className="create-course-form-input course-form-area" placeholder=" " />
                        <label htmlFor="title" className="create-course-form-label course-form-label">Mô tả</label>
                    </div>
                </div>


            </div>
            <div className="page-one-input-desc">

                <div className="category-list create-course-input-item">
                    <ul className="scroll-item">
                        {ListCategory.map((item, index) => {
                            return (
                                <li onClick={() => handleClickCategory(index)} key={index} className={props.Data.Category == index + 1111 ? "category-item selected" : "category-item"}>
                                    <p>{item.title}</p>
                                    <i className="fas fa-greater-than"></i>
                                </li>
                            );
                        })}
                    </ul>
                    <ul className="scroll-item">

                        {subCategoryList.map((item, index) => {
                            return (
                                <li onClick={(e) => handleClickSubCategory(item.ID)} key={index} className={props.Data.SubCategory === item.ID ? "category-item selected" : "category-item"}>
                                    <p>{item.NAME}</p>
                                    <i className="fas fa-greater-than"></i>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>

    );
}
function PageTwo(props) {
    const handleOnChange = (e) => {
        const file = e.target;
        const ImgSr = URL.createObjectURL(file.files[0])
        props.handleOnchange([['Image', ImgSr]])
    }
    return (
        <div className="page-two-form">
            <label className="create-course-input-text" htmlFor="">Hãy chọn hình ảnh đại diện cho khóa học của bạn</label>
            <div className="input-field create-course-img">
                <img src={props.Data.Image} alt="Ảnh đại diện khóa học" />
                <input onChange={handleOnChange} type="file" name="course-img" id="create-coure-file" />
            </div>
        </div>
    );
}
function PageThree(props) {
    const InInput = useRef();
    const OutInput = useRef();
    const [In, setIn] = useState('');
    const [Out, setOut] = useState('');
    const AddIn = () => {
        if (In.trim() != '') {
            props.handleOnchange([['ListIn', [...props.Data.ListIn, { CONTENT: In }]]])
            setIn('');
            InInput.current.focus();
        }
    }
    const AddOut = () => {
        if (Out.trim() != '') {
            props.handleOnchange([['ListOut', [...props.Data.ListOut, { CONTENT: Out }]]])
            setOut('');
            OutInput.current.focus();
        }
    }
    const DeleteIn = (index) => {
        const newIns = [...props.Data.ListIn]
        newIns.splice(index, 1)
        props.handleOnchange([['ListIn', newIns]])
    }
    const DeleteOut = (index) => {
        const newOuts = [...props.Data.ListOut]
        newOuts.splice(index, 1)
        props.handleOnchange([['ListOut', newOuts]])
    }
    const handleKeydown = (e) => {
        if (e.key === 'Enter') {
            if (document.activeElement === InInput.current) {
                AddIn();
            } else if (document.activeElement === OutInput.current) {
                AddOut();
            }
        }
    }
    return (
        <div className="create-course-in-out page-three-form" onKeyDown={handleKeydown}>
            <div className="create-course-in">
                <p className="create-course-input-text">Yêu cầu đầu vào</p>
                <div className="create-course-todo-input">
                    <div className="create-course-input-item">
                        <div className="input-field">
                            <input autoFocus ref={InInput} value={In} onChange={e => setIn(e.target.value)} placeholdertype="text" name="title" className="create-course-form-input" placeholder=" " />
                            <label htmlFor="title" className="create-course-form-label">Yêu cầu</label>
                        </div>
                        <button onClick={AddIn} className="todo-button" type="button">Thêm</button>
                    </div>
                </div>
                <div className="course-require">
                    <ul className="fa-ul">
                        {props.Data.ListIn.map((In, index) => (
                            <li key={index}>
                                <i className="fa-li fa fa-check"></i>
                                <span>{In.CONTENT}</span>
                                <i onClick={() => DeleteIn(index)} className="fas fa-trash"></i>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="create-course-out">
                <p className="create-course-input-text">Kết quả đầu ra</p>
                <div className="create-course-todo-input">
                    <div className="create-course-input-item">
                        <div className="input-field">
                            <input ref={OutInput} value={Out} onChange={e => setOut(e.target.value)} type="text" name="title" className="create-course-form-input" placeholder=" " />
                            <label htmlFor="title" className="create-course-form-label">Kết quả</label>
                        </div>
                        <button onClick={AddOut} className="todo-button" type="button">Thêm</button>
                    </div>
                </div>
                <div className="course-require">
                    <ul className="fa-ul">
                        {props.Data.ListOut.map((Out, index) => (
                            <li key={index}>
                                <i className="fa-li fa fa-check"></i>
                                <span>{Out.CONTENT}</span>
                                <i onClick={() => DeleteOut(index)} className="fas fa-trash"></i>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );


}
function PageFour(props) {
    const chapterRef = useRef();
    const autocreateList = useRef();

    const handleKeydown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (document.activeElement === chapterRef.current) {
                AddChapter();
            } else if (document.activeElement === autocreateList.current) {
                CreateAutoList();
            }
        }
    }
    function youtube_validate(url) {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(p)) {
            return url.match(p)[1];
        }
        return false;
    }
    function playlist_id(url) {
        var regPlaylist = /[?&]list=([^#\&\?]+)/;
        var match = url.match(regPlaylist);
        return match[1];
    }
    const [chapter, setChapter] = useState({ title: '', type: 'chapter' })
    const AddChapter = () => {
        if (props.Data.ListCourse[0] && props.Data.ListCourse[0].type != 'chapter') {
            props.handleOnchange([['ListCourse', [chapter, ...props.Data.ListCourse]]])
            return;
        }
        props.handleOnchange([['ListCourse', [...props.Data.ListCourse, chapter]]])
    }
    const Addlesson = (index) => {
        const newArray = [...props.Data.ListCourse];
        while (newArray[index + 1] && newArray[index + 1]['type'] !== 'chapter') index++;
        newArray.splice(index + 1, 0, { title: '', URL: '', type: 'lesson', error: true })
        props.handleOnchange([['ListCourse', newArray]])

    }
    const DeleteHandle = (index) => {
        const newArray = [...props.Data.ListCourse];
        newArray.splice(index, 1);
        props.handleOnchange([['ListCourse', newArray]])
    }

    const OnChangeHandle = async (e, index) => {
        let Title = null;
        let Error = false;
        const newObject = { ...props.Data.ListCourse[index], [e.target.name]: e.target.value };
        if (e.target.name == 'URL') {
            if (youtube_validate(e.target.value)) {
                try {
                    await fetch(`http://www.youtube.com/oembed?url=${e.target.value}&format=json`)
                        .then(res => res.json()).then(data => {
                            Title = data.title;
                        })
                    if (e.target.classList.contains("input-error")) {
                        e.target.classList.remove("input-error");
                    }
                } catch (error) {
                    Error = true;
                    if (!e.target.classList.contains("input-error")) {
                        e.target.classList.add("input-error");
                    }
                }
            } else {
                Error = true;
                if (!e.target.classList.contains("input-error")) {
                    e.target.classList.add("input-error");
                }
            }
        }

        if (Title && props.Data.AutoTitle) {
            newObject['title'] = Title;
        }
        newObject['error'] = Error;
        const newArray = [...props.Data.ListCourse];
        newArray[index] = newObject;
        props.handleOnchange([['ListCourse', newArray]])

    }
    const [autolist, setAutolist] = useState('')
    const CreateAutoList = async () => {
        if (youtube_validate(autolist)) {
            var playlistid = playlist_id(autolist);
            let ArrayCourse = [];
            try {
                let nextPage = null;
                await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistid}&key=${API_KEY}`)
                    .then(res => res.json()).then(data => {
                        nextPage = data.nextPageToken;
                        data.items.forEach(item => {
                            ArrayCourse.push({
                                title: item.snippet.title,
                                URL: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
                                type: 'lesson',
                                error: false,
                            })
                        })

                    })
                if (nextPage) {
                    await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${nextPage}&playlistId=${playlistid}&key=${API_KEY}`)
                        .then(res => res.json()).then(data => {
                            nextPage = 'nextPageToken' in data;
                            data.items.forEach(item => {
                                ArrayCourse.push({
                                    title: item.snippet.title,
                                    URL: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
                                    type: 'lesson',
                                    error: false,
                                })
                            })

                        })
                }
                props.handleOnchange([['ListCourse', ArrayCourse]])
            } catch (error) {
                Swal.fire({
                    text: 'URL không hợp lệ hoặc có lỗi đã xảy ra',
                    icon: 'error',
                    confirmButtonText: 'Hay'
                })
            }
        } else {
            Swal.fire({
                text: 'URL không hợp lệ',
                icon: 'error',
                confirmButtonText: 'Hay'
            })
        }
    }
    function handleOnDragEnd(result) {
        if (!result.destination) {
            DeleteHandle(result.source.index);
            return;
        }


        const items = Array.from(props.Data.ListCourse);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        props.handleOnchange([['ListCourse', items]])
    }
    return (
        <div className="page-four-form" onKeyDown={handleKeydown}>
            <div className="checkbox-item">
                <input type="checkbox" id="autoTitle" onChange={() => props.handleOnchange([['AutoTitle', !props.Data.AutoTitle]])} checked={props.Data.AutoTitle} />
                <label htmlFor="autoTitle"> Tự động tạo tiêu đề</label><br></br>
            </div>
            <div className="checkbox-item">
                <input ref={autocreateList} type="checkbox" id="autocreatelist" onChange={() => props.handleOnchange([['AutoCreateList', !props.Data.AutoCreateList]])} checked={props.Data.AutoCreateList} />
                <label htmlFor="autocreatelist"> Tự động tạo danh sách dựa vào URL danh sách của Youtube</label><br></br>
                {props.Data.AutoCreateList &&
                    <div className="auto-create-input">
                        <div className="create-course-input-item">
                            <div className="input-field">
                                <input value={autolist} onChange={e => setAutolist(e.target.value)} type="text" name="title" className="create-course-form-input" placeholder=" " />
                                <label htmlFor="title" className="create-course-form-label">URL danh sách khóa học</label>
                            </div>
                            <button onClick={CreateAutoList} className="todo-button" type="button">Kiểm tra</button>
                        </div>
                    </div>}
            </div>
            <div className="chapter-input">
                <i onClick={AddChapter} className="fas fa-plus-circle"></i>
                <input autoFocus ref={chapterRef} value={chapter.title} onChange={(e) => setChapter({ ...chapter, title: e.target.value })} className="text-input-simple" placeholder="Tên chương của khóa học" type="text" />
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="courselist">
                    {(provided) => (
                        <div className="list-course-create" {...provided.droppableProps} ref={provided.innerRef}>{
                            props.Data.ListCourse.map((data, index) => {
                                if (data.type === 'chapter') {
                                    return (
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {(provided) => (
                                                <div className="list-title" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <i onClick={() => Addlesson(index)} className="fas fa-plus-circle"></i>
                                                    <span className="main-title">{data.title}</span>
                                                    {!data.id && <i onClick={() => DeleteHandle(index)} className="fas fa-trash"></i>}
                                                </div>
                                            )}

                                        </Draggable>
                                    );
                                } else if (data.type === 'lesson') {
                                    return (
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {(provided) => (
                                                <div className="list-item-create-course" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <input className="text-input-simple mw-100 border-0 h6" placeholder="Tiêu đề của bài học" type="text" name="title" value={data.title} onChange={(e) => OnChangeHandle(e, index)} />
                                                    <br />
                                                    <input className="text-input-simple mw-100 border-0" placeholder="URL của bài học" type="text" name="URL" value={data.URL} onChange={(e) => OnChangeHandle(e, index)} />
                                                    {(!data.id )&& <i onClick={() => DeleteHandle(index)} className="fas fa-trash"></i>}
                                                </div>
                                            )}

                                        </Draggable>

                                    )
                                }
                            })}
                            {provided.placeholder}
                        </div>
                    )

                    }
                </Droppable>

            </DragDropContext>

        </div>
    );
}