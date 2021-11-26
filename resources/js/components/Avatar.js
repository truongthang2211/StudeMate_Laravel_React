import React from 'react';

function Avatar(props) {
    return (
        <div className="profile-avt" style={{width: props.Width, height: props.Height}}>
            <img src={props.User.avatar || "https://genk.mediacdn.vn/thumb_w/600/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188.png"} />
        </div>
    );
}

export default Avatar;

