import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './MyInfo.css';

function MyInfo({ User }) {

    //const history = useHistory();
    const [userInfo, setUserInfo] = useState({ date_of_birth: "2021-01-01" });

    const [password, setPassword] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errorInput, setError] = useState([]);
    // if (!userInfo.name) {

    //     setUserInfo({
    //         username: User.username,
    //         name: User.name,
    //         email: '',
    //         password: '',
    //     })
    // }
    useEffect(() => {
        setUserInfo({ ...User })

        // axios.get('/api/myinfo').then(res => {

        //     if (res.data.status === 200) {
        //         console.log(set.data.message);
        //         this.setUserInfo({
        //             name: res.data.user.name,
        //             email: res.data.user.email,
        //         });
        //     }
        //     else if (res.data.status === 404) {
        //         swal("Error", res.data.message, "error");
        //     }
        // });

    }, [User]);

    const handleInput = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }

    const handleDateOfBirthChange = (e) => {
        setUserInfo({
            ...userInfo,
            date_of_birth: e.target.value
        });
    }

    const handleCityChange = (e) => {
        setUserInfo({
            ...userInfo,
            city_id: e.target.value
        });
    }

    const handleSchoolIdChange = (e) => {
        setUserInfo({
            ...userInfo,
            school_id: e.target.value
        });
    }

    const handleAvatarChange = (e) => {
        let img = e.target.files[0];
        setUserInfo({
            ...userInfo,
            //avatar: e.target.files[0]
            avatar: URL.createObjectURL(img)
        });
    }
    const handleBackgroundImgChange = (e) => {
        let img = e.target.files[0];
        setUserInfo({
            ...userInfo,
            background_img: URL.createObjectURL(img)
        });
    }



    const handleUpdateMyInfo = (e) => {
        e.preventDefault();
        //alert(userInfo.avatar)

        axios.put('/api/update-myinfo', userInfo).then(res => {
            console.log(res);
            if (res.data.status === 200) {
                Swal.fire({
                    text: 'Thành công',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                setError([]);
                //history.push('/myinfo');
            }
            else if (res.data.status === 422) {
                Swal.fire({
                    text: 'Thất bại',
                    icon: 'warning',
                    confirmButtonText: 'Cancel'
                })
                //Swal("All fields are mandetory", "", "error");
                setError(res.data.validationErrors);
            }
            else if (res.data.status === 404) {
                Swal.fire({
                    text: 'Thất bại',
                    icon: 'error',
                    confirmButtonText: 'Cancel'
                })
                //Swal("Error", res.data.message, "error");
                //history.push('/myinfo');
            }
        });
    }

    const handleCancle = (e) => {
        setUserInfo({ ...User });
    }

    const handlePasswordChange = (e) => {
        setPassword({
            ...password,
            email: User.email,
            [e.target.name]: e.target.value
        });
    }

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        //alert(password.newPassword + password.confirmPassword + password.currentPassword + password.email + User.password)

        if (password.newPassword !== password.confirmPassword) {
            Swal.fire({
                text: 'Mật khẩu không hợp lệ',
                icon: 'warning',
                confirmButtonText: 'Cancel'
            })
        }

        else {
            axios.put('/api/update-password', password).then(res => {
                console.log(res);
                if (res.data.status === 200) {
                    Swal.fire({
                        text: 'Thành công',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    setError([]);
                }
                else if (res.data.status === 422) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Mật khẩu không hợp lệ!',
                        confirmButtonText: 'Cancel'
                    })
                    setError(res.data.validationErrors);
                }
                else if (res.data.status === 404) {
                    Swal.fire({
                        text: 'Thất bại',
                        icon: 'error',
                        confirmButtonText: 'Cancel'
                    })
                }
            });
        }
    }


    return (<>
        <div className="zone zone-content">
            <div className="container">
                <div className="user--profile">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="user--profile-left">
                                <ul className="user--profile--list-function">
                                    <li className="active"><a href="#">Thông tin &amp; liên hệ </a></li>
                                    <li><a href="#change-userName">Đổi tên người dùng </a></li>
                                    <li><a href="#change-password">Đổi mật khẩu</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-9 user--profile-right-container">
                            <div className="user--profile-right editing">
                                <div className="user--profile-group">
                                    <h2 className="user--profile-title-group">Thông tin</h2>
                                    <form id="frm-info" onSubmit={handleUpdateMyInfo}>
                                        <div className="row">

                                            <div className="col-md-6 col-xs-12">
                                                <div className="row myinfo-avt">
                                                    <img id="AvtPreview" src={userInfo.avatar || "https://i.pinimg.com/564x/c8/44/4d/c8444dd338a5921ae93b2199e0604a91.jpg"} className="no-img" />
                                                </div>
                                                <div className="row avatar-selector">
                                                    <div className="form-group UploadAvatar">
                                                        <label style={{ display: 'block' }}>Ảnh đại diện của bạn</label>
                                                        <label htmlFor="Avatar" className="browse btn btn-primary input-sm" type="button" id="Upload-Ava" style={{ display: 'block' }}>Chọn ảnh</label>
                                                        <input name="ImgFile" id="Avatar" className="file" type="file" onChange={handleAvatarChange} accept="image/png,image/x-png,image/gif,image/jpeg,image/jpg" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-xs-12">
                                                <div className="row myinfo-background">
                                                    <img id="BackGroundPreview" src={userInfo.background_img || "https://i.pinimg.com/564x/c8/44/4d/c8444dd338a5921ae93b2199e0604a91.jpg"} className="no-img" />

                                                </div>
                                                <div className="row avatar-selector">
                                                    <div className="form-group UploadBackground">
                                                        <label style={{ display: 'block' }}>Ảnh nền trang user của bạn</label>
                                                        <label htmlFor="Background" className="browse btn btn-primary input-sm" type="button" id="Upload-Ava" style={{ display: 'block' }}>Chọn ảnh</label>
                                                        <input name="ImgFile" id="Background" className="file" type="file" onChange={handleBackgroundImgChange} accept="image/png,image/x-png,image/gif,image/jpeg,image/jpg" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-4 col-xs-12">
                                                        <div className="form-group">
                                                            <label htmlFor="name" className="required" aria-required="true">Họ và Tên</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-sm-8 col-xs-12">
                                                        <div className="form-group">
                                                            <span id="span-name" className="span-display" style={{ display: "none" }}></span>
                                                            <input name="name" type="text" onChange={handleInput} value={userInfo.name || ''} className="form-control is-required" id="name" autoComplete="family-name" aria-required="true" style={{ display: 'block' }} />
                                                            <label id="name-error" class="error" for="name">{errorInput.name}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-4 col-xs-12">
                                                        <div className="form-group">
                                                            <label htmlFor="BirthYear">Ngày sinh</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-sm-8 col-xs-12">
                                                        <div className="form-group">
                                                            <span id="span-birthday" className="span-display" style={{ display: "none" }}></span>

                                                            <input name="BirthYear" type="date" onChange={handleDateOfBirthChange} value={userInfo.date_of_birth} id="BirthYear" className="form-control" style={{ display: 'block' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-4 col-xs-12">
                                                        <div className="form-group">
                                                            <label htmlFor="text" className="required" aria-required="true">Số điện thoại</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-sm-8 col-xs-12">
                                                        <div className="form-group">
                                                            <span id="span-phone" className="span-display" style={{ display: "none" }}></span>
                                                            <input name="phone" type="text" onChange={handleInput} value={userInfo.phone || ''} className="form-control is-required" id="PhoneNumber" placeholder="Số điện thoại" autoComplete="tel-national" style={{ display: 'block' }} />
                                                            <label id="phone-error" class="error" for="phone">{errorInput.phone}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-4 col-xs-12">
                                                        <div className="form-group">
                                                            <label htmlFor="email" className="required" aria-required="true">Email</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-sm-8 col-xs-12">
                                                        <div className="form-group">
                                                            <span id="span-email" className="span-display" style={{ display: "none" }}></span>
                                                            <input name="email" type="email" value={userInfo.email || ''} disabled className="form-control" id="email" placeholder="Email" autoComplete="email" style={{ display: 'block' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-4 col-xs-12">
                                                        <div className="form-group">
                                                            <label htmlFor="GraduatedSchool" aria-required="true">Trường</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-sm-8 col-xs-12">
                                                        <div className="form-group">
                                                            <span id="span-school" className="span-display" style={{ display: "none" }}></span>
                                                            <input name="GraduatedSchool" type="text" onChange={handleSchoolIdChange} value={userInfo.school_id || ''} className="form-control" id="GraduatedSchool" autoComplete="graduated-school" aria-required="true" style={{ display: 'block' }} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-4 col-xs-12">
                                                        <div className="form-group">
                                                            <label htmlFor="StateId" className="required" aria-required="true">Thành phố</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-sm-8 col-xs-12">
                                                        <div className="form-group">
                                                            <select className="form-select" id="StateSelect" name="StateSelect" onChange={handleCityChange} value={userInfo.city_id}>
                                                                <option value="-1" defaultValue="selected">Chọn thành phố</option>
                                                                <option value="4360">An Giang</option>
                                                                <option value="4361">Kon Tum</option>
                                                                <option value="4362">Đắk Nông</option>
                                                                <option value="4363">Sóc Trăng</option>
                                                                <option value="4364">Bình Phước</option>
                                                                <option value="4365">Hưng Yên</option>
                                                                <option value="4366">Thanh Hóa</option>
                                                                <option value="4367">Quảng Trị</option>
                                                                <option value="4368">Tuyên Quang</option>
                                                                <option value="4369">Quảng Ngãi</option>
                                                                <option value="4370">Hà Nội</option>
                                                                <option value="4371">Lào Cai</option>
                                                                <option value="4372">Vĩnh Long</option>
                                                                <option value="4373">Lâm Đồng</option>
                                                                <option value="4374">Bình Định</option>
                                                                <option value="4375">Nghệ An</option>
                                                                <option value="4376">Kiên Giang</option>
                                                                <option value="4377">Hà Giang</option>
                                                                <option value="4378">Phú Yên</option>
                                                                <option value="4379">Lạng Sơn</option>
                                                                <option value="4380">Đà Nẵng</option>
                                                                <option value="4381">Sơn La</option>
                                                                <option value="4382">Tây Ninh</option>
                                                                <option value="4383">Nam Định</option>
                                                                <option value="4384">Lai Châu</option>
                                                                <option value="4385">Bến Tre</option>
                                                                <option value="4386">Khánh Hòa</option>
                                                                <option value="4387">Bình Thuận</option>
                                                                <option value="4388">Cao Bằng</option>
                                                                <option value="4389">Hải Phòng</option>
                                                                <option value="4390">Ninh Bình</option>
                                                                <option value="4391">Yên Bái</option>
                                                                <option value="4392">Gia Lai</option>
                                                                <option value="4393">Hoà Bình</option>
                                                                <option value="4394">Bà Rịa - Vũng Tàu</option>
                                                                <option value="4395">Cà Mau</option>
                                                                <option value="4396">Bình Dương</option>
                                                                <option value="4397">Cần Thơ</option>
                                                                <option value="4398">Thừa Thiên Huế</option>
                                                                <option value="4399">Đồng Nai</option>
                                                                <option value="4400">Tiền Giang</option>
                                                                <option value="4401">Điện Biên</option>
                                                                <option value="4402">Vĩnh Phúc</option>
                                                                <option value="4403">Quảng Nam</option>
                                                                <option value="4404">Đắk Lắk</option>
                                                                <option value="4405">Thái Nguyên</option>
                                                                <option value="4406">Hải Dương</option>
                                                                <option value="4407">Bạc Liêu</option>
                                                                <option value="4408">Trà Vinh</option>
                                                                <option value="4409">Thái Bình</option>
                                                                <option value="4410">Hà Tĩnh</option>
                                                                <option value="4411">Ninh Thuận</option>
                                                                <option value="4412">Đồng Tháp</option>
                                                                <option value="4413">Long An</option>
                                                                <option value="4414">Hậu Giang</option>
                                                                <option value="4415">Quảng Ninh</option>
                                                                <option value="4416">Phú Thọ</option>
                                                                <option value="4417">Quảng Bình</option>
                                                                <option value="4418">Hồ Chí Minh</option>
                                                                <option value="4419">Hà Nam</option>
                                                                <option value="4420">Bắc Ninh</option>
                                                                <option value="4421">Bắc Giang</option>
                                                                <option value="4422">Bắc Kạn</option>
                                                            </select>
                                                            <label id="StateSelect-error" class="error" for="StateSelect">{errorInput.city_id}</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* <div className="row">
                                                    <div className="col-lg-3 col-sm-4 col-xs-12">
                                                        <div className="form-group">
                                                            <label htmlFor="CityName">Địa chỉ</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-sm-8 col-xs-12">
                                                        <div className="form-group">
                                                            <span id="span-cityName" className="span-display" style={{ display: "none" }}></span>
                                                            <textarea name="CityName" type="text" className="form-control" id="CityName" placeholder="Tỉnh/Thành phố bạn đang sống" style={{ display: 'block' }}></textarea>
                                                        </div>
                                                    </div>
                                                </div> */}

                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-4 col-xs-12">
                                                        <div className="form-group">
                                                            <label>Facebook</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-sm-8 col-xs-12">
                                                        <div className="form-group">
                                                            <span id="span-facebook" className="span-display" style={{ display: "none" }} title=""></span>
                                                            <input type="text" name="facebook" onChange={handleInput} value={userInfo.facebook || ''} className="form-control" id="facebook" placeholder="Your profile link" style={{ display: 'block' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-4 col-xs-12">
                                                        <div className="form-group">
                                                            <label>LinkedIn</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-sm-8 col-xs-12">
                                                        <div className="form-group">
                                                            <span id="span-linkedIn" className="span-display" style={{ display: "none" }} title=""></span>
                                                            <input type="text" name="LinkedIn" className="form-control" id="linkedIn" placeholder="Your profile link" style={{ display: 'block' }} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-4 col-xs-12">
                                                        <div className="form-group">
                                                            <label>Mô tả bản thân</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-sm-8 col-xs-12">
                                                        <div className="form-group">
                                                            <p id="span-summary" style={{ display: "none" }}></p>
                                                            <textarea rows="5" name="Summary" type="text" className="form-control" id="summary" style={{ display: 'block' }}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-4 col-xs-12">
                                                        <div className="form-group">
                                                            <label>Thành tích</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-sm-8 col-xs-12">
                                                        <div className="form-group">
                                                            <ul id="span-achievement" style={{ display: "none" }}></ul>
                                                            <textarea rows="5" name="Achievement" type="text" className="form-control" id="achievement" style={{ display: 'block' }}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group pull-right">
                                                        <button className="btn btn-sm pull-right btn-save save-info-button my--cus-button" type="submit" id="btnSaveInfo" >Lưu</button>
                                                        <button className="btn btn-sm pull-right btn-cancel my--cus-button" type="button" id="btnCancelInfo" onClick={handleCancle}>Hủy</button>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>


                                    </form>

                                    <h2 className="user--profile-title-group">Đổi mật khẩu</h2>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <div id="change-password" className="tab-pane active">
                                                    <form id="frmChangePassword" onSubmit={handleUpdatePassword}>
                                                        <div className="form-group">
                                                            <label htmlFor="currentPassword">Mật khẩu</label>
                                                            <input name="currentPassword" type="password" onChange={handlePasswordChange} className="form-control" placeholder="Mật khẩu" autoComplete="current-password" />
                                                        </div>
                                                        <p>
                                                            {/* <!--link cho form quên mật khẩu điền sau--> */}
                                                            <a href="#" className="pull-right">Quên mật khẩu?</a>
                                                        </p>
                                                        <div className="form-group">
                                                            <label htmlFor="newPassword">Mật khẩu mới</label>
                                                            <input name="newPassword" type="password" onChange={handlePasswordChange} className="form-control" placeholder="Mật khẩu mới" />
                                                            <label id="newPassword-error" class="error" for="newPassword">{errorInput.newPassword}</label>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="confirmPassword">Mật khẩu xác nhận</label>
                                                            <input name="confirmPassword" type="password" onChange={handlePasswordChange} className="form-control" placeholder="Mật khẩu xác nhận" />
                                                            <label id="confirmPassword-error" class="error" for="confirmPassword">{errorInput.confirmPassword}</label>
                                                        </div>
                                                        <div className="form-group">
                                                            <button className="btn btn-sm pull-right btn-save save-info-button my--cus-button" type="submit" id="btnSavePass" >Thay đổi</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    </>);
}

export default MyInfo;