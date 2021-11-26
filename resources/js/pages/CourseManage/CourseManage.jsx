import React from 'react';
import './CourseManage.css';
import { ProfileHeader, ProfileCourseItem } from '../Profile/Profile.jsx'
import Sidebar from '../../components/Sidebar/Sidebar';

function CourseManage(props) {
    return (
        <>
           <Sidebar User={props.User}/>
        </>
    );
}

export default CourseManage;
// function ManageCourseItem(courseItem) {

// }