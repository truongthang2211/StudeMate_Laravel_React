import { React, useState } from 'react';
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
function Index() {
    const [ShowForm, setShowForm] = useState(false)
    const [User, setUser] = useState(async()=>{
        const res = await axios.get('/get-user')
        
        setUser( res.data.user);
        return res.data.user;
    })
    const handleShowForm = () => {
        setShowForm(pre => !pre)
    }
    console.log(User)
    return (
        <>
            <BrowserRouter>
                <Navbar User={User} ShowForm={ShowForm} handleShowForm={handleShowForm} />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/course" element={<Course />} />
                    <Route exact path="/learn" element={!User?<Home/>:<Learn User={User}/>} />
                    <Route exact path="/profile" element={!User?<Home/>:<Profile User={User}/>} />
                    <Route exact path="/myinfo" element={!User?<Home/>:<MyInfo User={User}/>} />
                    <Route exact path="/login" element={User?<Home/>:<Login />} />


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
