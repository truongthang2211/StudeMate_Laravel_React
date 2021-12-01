import React, { useState, useRef, useEffect } from 'react';
import {
    BrowserRouter as Router,
    generatePath,
    Switch,
    Route,
    useHistory,
    useParams
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

export default function Learn({ User }) {
    // const { lesson } = useParams();
    // console.log(id)
    const [comments, setComments] = useState(CommentData);
    const onClickRepl = (index, parentindex, repl) => {
        const newcomments = [...comments];
        if (repl) {
            const sub_comment = newcomments[parentindex]['repl_comment'][index + 1];
            if (!sub_comment || !sub_comment['thisuser'])
                newcomments[parentindex]['repl_comment'].splice(index + 1, 0, { thisuser: true })
        } else if (!newcomments[index]['repl_comment'][0] || !newcomments[index]['repl_comment'][0]['thisuser']) {
            newcomments[index]['repl_comment'].splice(0, 0, { thisuser: true })
        }
        setComments(newcomments);
    }
    const onClickCancel = (index, parentindex) => {
        const newcomments = [...comments];
        newcomments[parentindex]['repl_comment'].splice(index, 1)
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

    return (<>
        <div id="left-learning">
            <div className="breadcrumb">
                <a className="breadcrumb-item" href="/"><i className="fas fa-home"></i></a>
                <a className="breadcrumb-item" href="/learn">Khóa học</a>
                <a className="breadcrumb-item" href="/learn/lap-trinh-7">Lập trình</a>
                <span className="breadcrumb-item active">HTML, CSS từ con gà đến thần thánh</span>
            </div>
            <div className="video-learning">
                <YouTube opts={opts} videoId="2g811Eo7K8U" onReady={_onReady} />
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
                            <UserComment />
                            <div className="person-comment-block">
                                <ul>
                                    {comments.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <Comment key={index} User={item.user} index={index} Content={item.content} Upvote={item.upvote} Downvote={item.downvote} handleRepl={onClickRepl} />
                                                {item.repl_comment.map((item2, index2) => {
                                                    if (item2.thisuser) {
                                                        return (<UserComment key={index2} parent_index={index}
                                                            index={index2} repl handleCancel={onClickCancel} />);
                                                    } else {
                                                        return (
                                                            <Comment parent_index={index} index={index2} key={index2}
                                                                repl User={item2.user} Content={item2.content} handleRepl={onClickRepl}
                                                                Upvote={item2.upvote} Downvote={item2.downvote} />
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
                    <h1 className="playlist-title">HTML, CSS từ con gà đến thần thánh</h1>
                    <div className="playlist-info">
                        <p className="playlist-description">
                            Hoàn thành
                            <strong>76</strong>/<strong>113</strong>
                            bài học (<strong>67%</strong>)
                        </p>
                    </div>
                </div>
            </header>
            {ListCourse[0].ListCourse.map((item, index) => {
                return (
                    <Collapsible className="playlist-wrapper" key={index}>
                        <Chaper title={item.title} />
                        <div className="playlist-wrapper-list">
                            {item.lession.map((less, index2) => {
                                return (
                                    <Lession key={index2} title={less.title} duration={less.duration} />
                                );
                            })}
                        </div>
                    </Collapsible>
                );
            })}
        </div>
    </>);
}
function UserComment(props) {
    const ClassName = props.repl ? "comment-block comment-block-repl" : "comment-block"
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
    return (
        <div id="user-comment-block">
            <div className={ClassName}>
                <div className="comment-avt">
                    <img className="CommentBox_myAvatar__3Mi09" src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.6435-9/123519836_2709233069342309_404418965952590855_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=i1SBPX81GKUAX_deJFe&_nc_ht=scontent.fsgn5-11.fna&oh=d685f02a12ebb0131217f4705e5c5795&oe=61C416A0" alt="Thang Nguyen" />
                </div>
                <div className="comment-content align-items-end">
                    <div ref={commentRef} className="comment-input" autoFocus contentEditable="true"
                        placeholder="Viết gì gì đó đi..." tabIndex="0" dir="ltr" spellCheck="false"
                        autoComplete="off" autoCorrect="off" autoCapitalize="off" onPaste={handleonPaste}
                        onInput={handleonInput}></div>
                    <div>
                        <button className="btn btn-comment">
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
                <img className="CommentBox_myAvatar__3Mi09" src={props.User.avt} alt={props.User.FULLNAME} />
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
                    <span onClick={() => { props.handleRepl(props.index, props.parent_index, props.repl) }} className="comment-repl" href="">Trả lời</span>
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
function Lession({ title, duration }) {
    return (
        <div className="playlist-wrapper-item learnt-item">
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