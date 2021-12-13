import React from 'react';

function CourseLesson({lessonName}) {
    return (
        <div className="collapse-item"><i className="fas fa-play-circle"></i>{lessonName}</div>
    )
}

export default CourseLesson;