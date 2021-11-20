import React, { useEffect, memo, useState, useRef } from 'react';
import './CreateCourse.css'

const CreateData = {
    CourseTitle: '',
    Price: 0,
    Description: '',
    Category: -1,
    SubCategory: -1,
    Image: 'https://imic.com.vn/public/site/images/no-image.jpg',
    ListIn: [],
    ListOut: [],
    AutoTitle: false,
    AutoCreateList: false,
    ListCourse: []
}

const ListCategory = [{
    title: 'Ngoại ngữ',
    subCatogory: ['Tiếng Anh', 'Tiếng Trung', 'Tiếng Hàn', 'Tiếng Nhật', 'Khác']
}, {
    title: 'Marketing',
    subCatogory: ['Marketing Online', 'Google Ads', 'Seo'
        , 'Branding', 'Content Marketing', 'Video Marketing', 'Khác']
}, {
    title: 'Tin học văn phòng',
    subCatogory: ['Exel', 'Word', 'Word', 'Khác']
}, {
    title: 'Thiết kế',
    subCatogory: ['Thiết kế quảng cáo', 'Phần mềm thiết kế'
        , 'Thiêt kế website', 'Kiến trúc, nội thất', 'Khác']
}, {
    title: 'Kinh doanh',
    subCatogory: ['Bất động sản', 'Crypto',
        'Kinh doanh Online', 'Startup', 'Kinh doanh Cafe', 'Kiếm tiền Online',
        'Quản trị doanh nghiệp', 'Chứng khoán', 'Dropshipping', 'Kế toán'
        , 'Đầu tư forex', 'Khác']
}, {
    title: 'Phát triển cá nhân',
    subCatogory: ['Thương hiệu cá nhân', 'Tài chính cá nhân',
        'Đàm phán', 'Ký năng lãnh đạo', 'Quản trị nhân sự', 'MC',
        'Rèn luyện trí nhớ', 'Kỹ năng mềm', 'Giao tiếp', 'Kỹ năng quản lý'
        , 'Thuyết trình', 'Khác']
}, {
    title: 'Sales, bán hàng',
    subCatogory: ['Bán hàng online', 'Telesales',
        'Bán hàng livestream', 'Chăm sóc khách hàng', 'Chiến lược bán hàng', 'Khác']
}, {
    title: 'Công nghệ thông tin',
    subCatogory: ['Bán hàng online', 'Telesales',
        'Bán hàng livestream', 'Chăm sóc khách hàng', 'Chiến lược bán hàng', 'Khác']
}]

export default function CreateCourse() {

    const [Data, setData] = useState(CreateData);
    const handleOnchange = (list) => {
        const newData = { ...Data };
        list.forEach(element => {
            newData[element[0]] = element[1];
        });
        setData(newData);
        console.log(newData);
    }
    const [Page, setPage] = useState(1);
    const handleNextPage = () => {
        if (Page === 4)
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
            default:
                return true;
        }
    }
    const buttonClassName = "btn my-custom-button-default";
    return (
        <div className="container">
            <form action="" className="create-course-form">
                <h2 className="create-course-title">Tạo khóa học</h2>
                {Page === 1 && <PageOne Data={Data} handleOnchange={handleOnchange} />}
                {Page === 2 && <PageTwo Data={Data} handleOnchange={handleOnchange} />}
                {Page === 3 && <PageThree Data={Data} handleOnchange={handleOnchange} />}
                {Page === 4 && <PageFour Data={Data} handleOnchange={handleOnchange} />}
                <div>
                    <a onClick={handlePrevious} className={Page === 1 ? buttonClassName + " disabled" : buttonClassName}>Lùi lại</a>
                    <a onClick={handleNextPage} className={CheckInput() ? buttonClassName : buttonClassName + " disabled"}>Tiếp theo</a>
                    <a onClick={handleNextPage} className="btn my-custom-button-default my-custom-button-simple">Lưu tạm</a>
                </div>
            </form>

        </div >
    );
}

function PageOne(props) {
    const [subCategoryList, setSubList] = useState(() => {
        if (ListCategory[props.Data.Category]) {
            return ListCategory[props.Data.Category].subCatogory
        }
        return []
    });

    const handleClickCategory = (index) => {
        setSubList(ListCategory[index].subCatogory)
        props.handleOnchange([['Category', index], ['SubCategory', -1]])

    }
    const handleClickSubCategory = (index) => {
        props.handleOnchange([['SubCategory', index]])
    }
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+\b)/g, ",")
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

    return (
        <div className="page-one-form">
            <div className="page-one-input">
                <div className="create-course-input-item">
                    <div className="input-field">
                        <input type="text" name="CourseTitle" value={props.Data.CourseTitle} onChange={(e) => props.handleOnchange([[e.target.name, e.target.value]])} className="create-course-form-input" placeholder=" " />
                        <label htmlFor="title" className="create-course-form-label">Tên khóa học</label>
                    </div>
                </div>
                <div className="create-course-input-item">
                    <div className="input-field PriceInput">
                        <input type="text" name="Price" value={formatNumber(props.Data.Price)} onChange={(e) => onPriceChange(e)} className="create-course-form-input" placeholder=" " />
                        <label htmlFor="title" className="create-course-form-label">Giá bán</label>
                    </div>
                </div>
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
                                <li onClick={() => handleClickCategory(index)} key={index} className={props.Data.Category == index ? "category-item selected" : "category-item"}>
                                    <p>{item.title}</p>
                                    <i className="fas fa-greater-than"></i>
                                </li>
                            );
                        })}
                    </ul>
                    <ul className="scroll-item">

                        {subCategoryList.map((item, index) => {
                            return (
                                <li onClick={(e) => handleClickSubCategory(index)} key={index} className={props.Data.SubCategory === index ? "category-item selected" : "category-item"}>
                                    <p>{item}</p>
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
        const file = e.target.files[0];
        props.handleOnchange([['Image', URL.createObjectURL(file)]])
    }
    return (
        <div className="page-two-form">
            <label className="create-course-input-text" htmlFor="">Hãy chọn hình ảnh đại diện cho khóa học của bạn</label>
            <div className="input-field create-course-img">
                <img src={props.Data.Image} alt="Ảnh đại diện khóa học" />
                <input onChange={handleOnChange} type="file" name="" id="create-coure-file" />
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
            props.handleOnchange([['ListIn', [...props.Data.ListIn, In]]])
            setIn('');
            InInput.current.focus();
        }
    }
    const AddOut = () => {
        if (Out.trim() != '') {
            props.handleOnchange([['ListOut', [...props.Data.ListOut, Out]]])
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
                            <input ref={InInput} value={In} onChange={e => setIn(e.target.value)} placeholdertype="text" name="title" className="create-course-form-input" placeholder=" " />
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
                                <span>{In}</span>
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
                                <span>{Out}</span>
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
    const [chapter, setChapter] = useState({ title: '', type: 'chapter' })
    const AddChapter = () => {
        props.handleOnchange([['ListCourse', [...props.Data.ListCourse, chapter]]])
    }
    const AddLession = (index) => {
        const newArray = [...props.Data.ListCourse];
        while (newArray[index + 1] && newArray[index + 1]['type'] !== 'chapter') index++;
        newArray.splice(index + 1, 0, { title: '', URL: '', type: 'lession' })
        props.handleOnchange([['ListCourse', newArray]])
    }
    const DeleteHandle = (index) => {
        const newArray = [...props.Data.ListCourse];
        newArray.splice(index, 1);
        props.handleOnchange([['ListCourse', newArray]])
    }
    const OnChangeHandle = (e, index) => {
        const newObject = { ...props.Data.ListCourse[index], [e.target.name]: e.target.value };
        const newArray = [...props.Data.ListCourse];
        newArray[index] = newObject;
        props.handleOnchange([['ListCourse', newArray]])
    }
    return (
        <div className="page-four-form">
            <div className="checkbox-item">
                <input type="checkbox" id="autoTitle" onChange={() => props.handleOnchange([['AutoTitle', !props.Data.AutoTitle]])} checked={props.Data.AutoTitle} />
                <label htmlFor="autoTitle"> Tự động tạo tiêu đề</label><br></br>
            </div>
            <div className="checkbox-item">
                <input type="checkbox" id="autocreatelist" onChange={() => props.handleOnchange([['AutoCreateList', !props.Data.AutoCreateList]])} checked={props.Data.AutoCreateList} />
                <label htmlFor="autocreatelist"> Tự động tạo danh sách dựa vào URL danh sách của Youtube</label><br></br>
                {props.Data.AutoCreateList &&
                    <div className="auto-create-input">
                        <div className="create-course-input-item">
                            <div className="input-field">
                                <input type="text" name="title" className="create-course-form-input" placeholder=" " />
                                <label htmlFor="title" className="create-course-form-label">URL danh sách khóa học</label>
                            </div>
                            <button className="todo-button" type="button">Kiểm tra</button>
                        </div>
                    </div>}
            </div>
            <div className="chapter-input">
                <i onClick={AddChapter} className="fas fa-plus-circle"></i>
                <input value={chapter.title} onChange={(e) => setChapter({ ...chapter, title: e.target.value })} className="text-input-simple" placeholder="Tên chương của khóa học" type="text" name="" id="" />
            </div>
            <div className="list-course-create">{
                props.Data.ListCourse.map((data, index) => {
                    if (data.type === 'chapter') {
                        return (
                            <div className="list-title" key={index}>
                                <i onClick={() => AddLession(index)} className="fas fa-plus-circle"></i>
                                <span className="main-title">{data.title}</span>
                                <i onClick={() => DeleteHandle(index)} className="fas fa-trash"></i>
                            </div>);
                    } else if (data.type === 'lession') {
                        return (
                            <div className="list-item-create-course" key={index}>
                                <input className="text-input-simple mw-100 border-0" placeholder="Tiêu đề của bài học" type="text" name="title" value={data.title} onChange={(e) => OnChangeHandle(e, index)} />
                                <br />
                                <input className="text-input-simple mw-100 border-0" placeholder="URL của bài học" type="text" name="URL" value={data.URL} onChange={(e) => OnChangeHandle(e, index)} />
                                <i onClick={() => DeleteHandle(index)} className="fas fa-trash"></i>
                            </div>
                        )
                    }
                })}



            </div>
        </div>
    );
}