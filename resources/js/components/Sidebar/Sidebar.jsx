import React from 'react';
import Avatar from '../Avatar';
import './Sidebar.css'

function Sidebar(props) {
    console.log('render sidebar')
    return (
        <>
            <div id="sidebar">
                <div className="sidebar__userinfo">
                    <Avatar User={props.User} Width="112px" Height="112px" />
                    <h5>{props.User.FULLNAME}</h5>
                </div>
                <div className="sidebar__listfeature">
                        {props.children}
                </div>
            </div>
        </>
    );
}

export default (Sidebar);