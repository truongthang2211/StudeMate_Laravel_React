import { React, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navigation/Navbar';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import My404 from './components/My404';
import MyInfo from './pages/MyInfo/MyInfo';
import Course from './pages/Course/Course';
import Learn from './pages/Learn/Learn';
import CreateCourse from './pages/CreateCourse/CreateCourse';
import CourseManage from './pages/CourseManage/CourseManage';
import MyCourse from './pages/MyCourse/MyCourse';
function Index() {
    const [ShowForm, setShowForm] = useState(false)
    const [User, setUser] = useState(() => {
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("; ", "&"))
        return cookieObj.get("StudyMate") ? { loading: false } : { loading: true }
    })
    const handleShowForm = () => {
        setShowForm(pre => !pre)
    }
    useEffect(() => {
        LoadUser();

    }, [])
    const LoadUser = async () => {
        const res = await axios.get('/get-user')
        console.log(res);
        if (res.data.user) {
            setUser({ ...res.data.user, loading: false });
        }
    }
    return (
        <>
            <BrowserRouter>
                <Navbar User={User} ShowForm={ShowForm} handleShowForm={handleShowForm} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route exact path="/course" element={<Course User={User} handleShowForm={handleShowForm} />} />
                    <Route exact path="/learn/:course/:lesson" element={User.loading ? <Home /> : <Learn  />} />
                    <Route exact path="/learn/:course" element={User.loading ? <Home /> : <Learn  />} />
                    <Route exact path="/profile" element={User.loading ? <Home /> : <Profile User={User} />} />
                    <Route exact path="/myinfo" element={User.loading ? <Home /> : <MyInfo User={User} />} />
                    <Route exact path="/course-manage/:feature" element={User.loading ? <Home /> : <CourseManage User={User} />} />
                    {/* <Route exact path="/mycourse" element={User.loading ? <Home /> : <MyCourse User={User} />} /> */}
                    <Route exact path="/create-course" element={User.loading ? <Home /> : <CreateCourse User={User}/>} />
                    <Route exact path="/login" element={!User.loading ? <Home /> : <Login />} />


                    <Route path='*' exact={true} element={<My404 />} />

                </Routes>
            </BrowserRouter>



        </>
    );
}

export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}
