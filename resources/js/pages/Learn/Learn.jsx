import React, { useState, useRef, useEffect, memo } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    generatePath,
    Switch,
    Route,
    useHistory,
    useParams,
    useNavigate
} from "react-router-dom";
import YouTube from 'react-youtube';
import Collapsible from '../../components/Collapsible/Collapsible';
import './Learn.css'
import { ListCourse } from '../../Data.js'
const CommentData = [
    {
        user: {
            FULLNAME: "Lisa",
            avt: 'http://media.doisongphapluat.com/695/2021/2/10/Lisa.jpg',
        },
        content: 'Thắng đẹp trai',
        upvote: 1025,
        downvote: 0,
        repl_comment: [
            {
                user: {
                    FULLNAME: "Nancy",
                    avt: 'http://media.doisongphapluat.com/695/2021/2/10/Nancy.jpg',
                },
                content: '+1 Confirm',
                upvote: 125,
                downvote: 0,
            },
            {
                user: {
                    FULLNAME: "Tzuyu",
                    avt: 'https://top10az.com/wp-content/uploads/2021/05/lisa.jpg',
                },
                content: '+1 Confirm',
                upvote: 125,
                downvote: 0,
            },
        ]
    },
    {
        user: {
            FULLNAME: "Khá Bảnh",
            avt: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kh%C3%A1_B%E1%BA%A3nh_khai_tr%C6%B0%C6%A1ng_shop_b%C3%A1n_qu%E1%BA%A7n_%C3%A1o_%E1%BB%9F_Qu%E1%BB%91c_Oai_2019-03-16.png/250px-Kh%C3%A1_B%E1%BA%A3nh_khai_tr%C6%B0%C6%A1ng_shop_b%C3%A1n_qu%E1%BA%A7n_%C3%A1o_%E1%BB%9F_Qu%E1%BB%91c_Oai_2019-03-16.png',
        },
        content: 'Bài học rat hay!',
        upvote: 1025,
        downvote: 0,
        repl_comment: []
    }]

export default memo(function Learn() {
    const { course, lesson } = useParams();
    const [dataLearning, setData] = useState({});
    const [comments, setComments] = useState([]);
    const [videoid, setVideoID] = useState('');
    const onClickRepl = (index, parentindex, repl,parent) => {
        console.log(parent)
        const newcomments = [...comments];
        if (repl) {
            const sub_comment = newcomments[parentindex]['SubComments'][index + 1];
            if (!sub_comment || !sub_comment['thisuser'])
                newcomments[parentindex]['SubComments'].splice(index + 1, 0, { thisuser: true ,parent_comment:parent})
        } else if (!newcomments[index]['SubComments'][0] || !newcomments[index]['SubComments'][0]['thisuser']) {
            newcomments[index]['SubComments'].splice(0, 0, { thisuser: true,parent_comment:parent })
        }
        setComments(newcomments);
    }
    const onClickCancel = (index, parentindex) => {
        const newcomments = [...comments];
        newcomments[parentindex]['SubComments'].splice(index, 1)
        setComments(newcomments);

    }
    const _onReady = (e) => {
        console.log(e);
    }
    const opts = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            host: 'https://www.youtube.com',
        },
    };
    function youtube_id(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }
    const navigate = useNavigate();
    useEffect(async () => {
        try {
            const res = await axios.get(`/api/get-learn/${course}/${lesson}`)
            if (res.data.message.LastLessonLearnt == -1) {
                navigate(`/learn/${course}/${res.data.message.ListLearn[0].Lesson[0].LESSON_ID}`)
            } else {
                navigate(`/learn/${course}/${res.data.message.LastLessonLearnt}`)
            }
            setData(res.data.message)
            setVideoID(youtube_id(res.data.message.LearningURL))

        } catch (error) {
            console.log(error)
        }
    }, [])
    const showComment=async()=>{
        try {
            const res = await axios.post(`/api/get-comments`, { lesson_id: lesson });
            console.log(res)
            setComments(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        showComment();
    },[])
    const handleLesson = (lesson_url, lesson_id, status) => {
        if (status != 'block-item') {

            navigate(`/learn/${course}/${lesson_id}`)
            setVideoID(youtube_id(lesson_url))
        }
    }
    let TimerId = 0;
    const handleVideoPlaying = async (e) => {
        console.log('vao handle')
        if (e.data == 1) {
            TimerId = setInterval(() => {
                if (e.target.getCurrentTime() / e.target.getDuration() > 0.8) {
                    if (dataLearning.LastLessonLearnt + 1 == lesson || dataLearning.LastLessonLearnt == -1) {
                        // var url = dataLearning.ListLearn.map(e => {
                        //     var t = e.Lesson.filter(r => (r.LESSON_ID == 1116))
                        //     if (t.length > 0) return t
                        // }).filter(c => c)[0][0].LESSON_URL
                        setData({ ...dataLearning, LastLessonLearnt: parseInt(lesson) })
                        axios.post('/api/add-learn', { lesson_id: parseInt(lesson) }).then((e) => { console.log(e) })
                    }
                    clearInterval(TimerId)
                }
                console.log(TimerId)
            }, 1000)

        } else {
            clearInterval(TimerId)
        }
    }
    return (<>
        <div id="left-learning">
            <div className="breadcrumb">
                <a className="breadcrumb-item" href="/"><i className="fas fa-home"></i></a>
                <a className="breadcrumb-item" href="/learn">Khóa học</a>
                <a className="breadcrumb-item" href="/learn/lap-trinh-7">Lập trình</a>
                <span className="breadcrumb-item active">{dataLearning.CourseTitle}</span>
            </div>
            <div className="video-learning">
                <YouTube opts={opts} videoId={videoid} onReady={_onReady} onStateChange={handleVideoPlaying} />
            </div>
            <div className="info-learning">
                <div className="container">
                    <div className="info-learning-content">
                        <div className="tabs-bar">
                            <div className="tab-item selected-tab">Trao đổi</div>
                            <div className="tab-item">Bài giảng</div>
                            <div className="tab-item">File đính kèm</div>
                        </div>
                        <div className="info-learning-comment">
                            <UserComment updateComment={showComment}/>
                            <div className="person-comment-block">
                                <ul>
                                    {comments.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <Comment key={index} User={item.User} index={index} Content={item.Content} 
                                                Upvote={item.UpVote} Downvote={item.DownVote} handleRepl={onClickRepl} commentID={item.commentID} />
                                                {item.SubComments.map((item2, index2) => {
                                                    if (item2.thisuser) {
                                                        return (<UserComment key={index2} parent_index={index} updateComment={showComment} 
                                                            index={index2} repl parentComment={item2.parent_comment} handleCancel={onClickCancel}  />);
                                                    } else {
                                                        return (
                                                            <Comment parent_index={index} index={index2} key={index2} 
                                                                repl User={item2.User} Content={item2.Content} handleRepl={onClickRepl}
                                                                Upvote={item2.UpVote} Downvote={item2.DownVote} commentID={item.commentID}/>
                                                        );
                                                    }
                                                })}
                                            </li>
                                        );

                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div id="right-learning">
            <header className="playlist-header" style={{ '--process': "67%" }}>
                <div className="background-process">
                </div>
                <div className="playlist-header-content">
                    <h1 className="playlist-title">{dataLearning.CourseTitle}</h1>
                    <div className="playlist-info">
                        <p className="playlist-description">
                            Hoàn thành
                            <strong>76</strong>/<strong>113</strong>
                            bài học (<strong>67%</strong>)
                        </p>
                    </div>
                </div>
            </header>
            {dataLearning.ListLearn && dataLearning.ListLearn.map((item, index) => {
                return (
                    <Collapsible className="playlist-wrapper" key={index}>
                        <Chaper title={item.ChapterTitle} />
                        <div className="playlist-wrapper-list">
                            {item.Lesson.map((less, index2) => {
                                if (less.LESSON_ID == dataLearning.LastLessonLearnt + 1 || (dataLearning.LastLessonLearnt == -1 && less.LESSON_ID == lesson)) {
                                    status = 'normal-item'
                                } else if (less.LESSON_ID < dataLearning.LastLessonLearnt + 1) {
                                    status = 'learnt-item'
                                } else if (less.LESSON_ID > dataLearning.LastLessonLearnt + 1) {
                                    status = 'block-item'
                                }
                                if (less.LESSON_ID == lesson) {
                                    status += ' learning-item'
                                }
                                return (
                                    <Lession status={status} handleLesson={handleLesson} lesson_id={less.LESSON_ID} videoURL={less.LESSON_URL} key={index2} title={less.LESSON_NAME} duration={less.DURATION} />
                                );
                            })}
                        </div>
                    </Collapsible>
                );
            })}
        </div>
    </>);
})

function UserComment(props) {
    const [commentData, setComment] = useState();
    const ClassName = props.repl ? "comment-block comment-block-repl" : "comment-block"
    const { lesson } = useParams();
    const commentRef = useRef()
    useEffect(() => {
        if (props.repl) commentRef.current.focus();
    })
    const handleonPaste = (e) => {
        e.preventDefault();
        var text = (e.originalEvent || e).clipboardData.getData('text/plain');
        document.execCommand("insertHTML", false, text);
    }
    const handleonInput = (e) => {
        if (e.target.innerText != "") {
            commentRef.current.parentNode.classList.add('comment-box')
        } else {
            commentRef.current.parentNode.classList.remove('comment-box')
        }
    }
    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        // In case you have a limitation
        // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
    }
    const handleOnChange = (e) => {
        setComment(e.target.value);

    }
    const handleSubmit = async () => {
        const data = {
            lesson_id: lesson,
            content: commentData,
            parent_comment_id: props.parentComment?props.parentComment:null,
        };
        setComment('')
        const res = await axios.post('/api/add-comment', data)
        if (res.data.status==200){
            props.updateComment();
        }
        
    }
    return (
        <div id="user-comment-block">
            <div className={ClassName}>
                <div className="comment-avt">
                    <img className="CommentBox_myAvatar__3Mi09" src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.6435-9/123519836_2709233069342309_404418965952590855_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=i1SBPX81GKUAX_deJFe&_nc_ht=scontent.fsgn5-11.fna&oh=d685f02a12ebb0131217f4705e5c5795&oe=61C416A0" alt="Thang Nguyen" />
                </div>
                <div className="comment-content align-items-end">
                    <textarea ref={commentRef} className="comment-input" autoFocus
                        placeholder="Viết gì gì đó đi..." tabIndex="0" dir="ltr" spellCheck="false"
                        autoComplete="off" autoCorrect="off" autoCapitalize="off" onPaste={handleonPaste} onKeyDown={handleKeyDown}
                        onInput={handleonInput} onChange={(e) => console.log('thang dep trai')} value={commentData} onChange={handleOnChange}></textarea>
                    <div>
                        <button onClick={handleSubmit} className="btn btn-comment">
                            Bình luận
                        </button>
                        {props.repl && <button onClick={() => props.handleCancel(props.index, props.parent_index)}
                            className="btn btn-comment btn-comment-remove">
                            Hủy
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    );
}
function Comment(props) {
    const ClassName = props.repl ? "comment-block comment-block-repl" : "comment-block"
    return (
        <div className={ClassName}>
            <div className="comment-avt">
                <img className="CommentBox_myAvatar__3Mi09" src={props.User.avt || 'https://genk.mediacdn.vn/thumb_w/600/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188.png'} alt={props.User.FULLNAME} />
            </div>
            <div className="comment-content">
                <div className="comment-user-name">
                    <a href="">{props.User.FULLNAME}</a>
                </div>
                <div className="comment-body">{props.Content}</div>
                <div className="comment-footer">
                    <span className="comment-vote">
                        <span className="upvote">
                            <a href="">
                                <i className="fas fa-arrow-up font-size-h5 fa-fw"></i>
                            </a>
                            <span>{props.Upvote}</span>
                        </span>
                        <span className="downvote">
                            <a href="">
                                <i className="fas fa-arrow-down font-size-h5 fa-fw"></i>
                            </a>
                            <span>{props.Downvote}</span>
                        </span>
                    </span>
                    <span onClick={() => { props.handleRepl(props.index, props.parent_index, props.repl,props.commentID) }} className="comment-repl" href="">Trả lời</span>
                    <span className="comment-datetime">{props.Time}</span>
                </div>
            </div>
        </div>
    );
}
function Chaper({ title }) {
    return (
        <div className="playplist-wrapper-header">
            <h2 className="wrapper-header-title">{title}</h2>
            <p className="wrapper-header-detail">2/2 | 05:44</p>
        </div>
    );
}
function Lession({ title, duration, handleLesson, videoURL, lesson_id, status }) {
    return (

        <div onClick={() => handleLesson(videoURL, lesson_id, status)} className={"playlist-wrapper-item " + status}>
            <div className="wrapper-icon-status">
                <i className="fas fa-check"></i>
                <i className="fas fa-lock"></i>

            </div>
            <div className="wrapper-item-info">
                <p className="wrapper-item-title">{title}</p>
                <div className="wrapper-item-detail">
                    <i className="far fa-play-circle"></i>
                    <span>{duration}</span>
                </div>
            </div>
        </div>
    );
}