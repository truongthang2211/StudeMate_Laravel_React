import React from 'react';

function CourseChapter({chapterTitle, numOfChapterLess}) {
    return (
        <div className="list-title">
            <span className="main-title">{chapterTitle}</span>
            <span className="video-count">{numOfChapterLess}</span>
        </div>
    )
}

export default CourseChapter;