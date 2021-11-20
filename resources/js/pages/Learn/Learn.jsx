import React from 'react';
import Collapsible from '../../components/Collapsible/Collapsible';
import './Learn.css'
export default function Learn({ User }) {
    return (<>
        <div id="left-learning">
            <div className="breadcrumb">
                <a className="breadcrumb-item" href="/"><i className="fas fa-home"></i></a>
                <a className="breadcrumb-item" href="/learn">Khóa học</a>
                <a className="breadcrumb-item" href="/learn/lap-trinh-7">Lập trình</a>
                <span className="breadcrumb-item active">HTML, CSS từ con gà đến thần thánh</span>
            </div>
            <div className="video-learning">
                <iframe src='https://www.youtube.com/embed/E7wJTI-1dvQ'
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                />
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
                            <div id="user-comment-block">
                                <div className="comment-block">
                                    <div className="comment-avt">
                                        <img className="CommentBox_myAvatar__3Mi09" src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.6435-9/123519836_2709233069342309_404418965952590855_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=RgcZJjsDznYAX8z8I7d&_nc_ht=scontent.fsgn5-11.fna&oh=7adb61cf34a3a80f2a8d55187cbd42b7&oe=619C89A0" alt="Thang Nguyen" />
                                    </div>
                                    <div className="comment-content align-items-end">
                                        <div className="comment-input" contentEditable="true" placeholder="Viết gì gì đó đi..." tabIndex="0" dir="ltr" spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off"></div>
                                        <button className="btn btn-comment">
                                            Bình luận
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="person-comment-block">
                                <ul>
                                    <li>
                                        <div className="comment-block">
                                            <div className="comment-avt">
                                                <img className="CommentBox_myAvatar__3Mi09" src="https://danviet.mediacdn.vn/upload/2-2019/images/2019-04-02/Vi-sao-Kha-Banh-tro-thanh-hien-tuong-dinh-dam-tren-mang-xa-hoi-khabanh-1554192528-width660height597.jpg" alt="Banh Ngo" />
                                            </div>
                                            <div className="comment-content">
                                                <div className="comment-user-name">

                                                    <a href="">Khá Bảnh</a>
                                                </div>
                                                <div className="comment-body">Thắng đẹp trai</div>
                                                <div className="comment-footer">
                                                    <span className="comment-vote">
                                                        <span className="upvote">
                                                            <a href="">
                                                                <i className="fas fa-arrow-up font-size-h5 fa-fw"></i>
                                                            </a>
                                                            <span>1025</span>
                                                        </span>
                                                        <span className="downvote">
                                                            <a href="">
                                                                <i className="fas fa-arrow-down font-size-h5 fa-fw"></i>
                                                            </a>
                                                            <span>0</span>
                                                        </span>
                                                    </span>
                                                    <span className="comment-repl" href="">Trả lời</span>
                                                    <span className="comment-datetime">Hôm qua</span>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="comment-block comment-block-repl">
                                            <div className="comment-avt">
                                                <img className="CommentBox_myAvatar__3Mi09" src="https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.6435-9/240679543_1519728035044432_6519949385141440995_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=bCZ_HXjQx7gAX-fynHN&_nc_ht=scontent.fsgn5-1.fna&oh=cd292c66ff07f89ff018b441aacb5351&oe=619A91F5" alt="Son Chu" />
                                            </div>
                                            <div className="comment-content">
                                                <div className="comment-user-name">

                                                    <a href="">Xuân Sơn</a>
                                                </div>
                                                <div className="comment-body">+1 Confirm</div>
                                                <div className="comment-footer">
                                                    <span className="comment-vote">
                                                        <span className="upvote">
                                                            <a href="">
                                                                <i className="fas fa-arrow-up font-size-h5 fa-fw"></i>
                                                            </a>
                                                            <span>1025</span>
                                                        </span>
                                                        <span className="downvote">
                                                            <a href="">
                                                                <i className="fas fa-arrow-down font-size-h5 fa-fw"></i>
                                                            </a>
                                                            <span>0</span>
                                                        </span>
                                                    </span>
                                                    <span className="comment-repl" href="">Trả lời</span>
                                                    <span className="comment-datetime">Hôm qua</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="comment-block comment-block-repl">
                                            <div className="comment-avt">
                                                <img className="CommentBox_myAvatar__3Mi09" src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/148452596_1416726315326312_7062280632353748357_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=K1sAQvVWdpAAX9jhm6C&_nc_ht=scontent.fsgn5-8.fna&oh=d48b92962f4e460b701bed3866625fdd&oe=619DAAFC" alt="Thu Huynh" />
                                            </div>
                                            <div className="comment-content">
                                                <div className="comment-user-name">

                                                    <a href="">Minh Thư Huỳnh</a>
                                                </div>
                                                <div className="comment-body">+1 Confirm</div>
                                                <div className="comment-footer">
                                                    <span className="comment-vote">
                                                        <span className="upvote">
                                                            <a href="">
                                                                <i className="fas fa-arrow-up font-size-h5 fa-fw"></i>
                                                            </a>
                                                            <span>1025</span>
                                                        </span>
                                                        <span className="downvote">
                                                            <a href="">
                                                                <i className="fas fa-arrow-down font-size-h5 fa-fw"></i>
                                                            </a>
                                                            <span>0</span>
                                                        </span>
                                                    </span>
                                                    <span className="comment-repl" href="#">Trả lời</span>
                                                    <span className="comment-datetime">Hôm qua</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="comment-block">
                                            <div className="comment-avt">
                                                <img className="CommentBox_myAvatar__3Mi09" src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.6435-9/123519836_2709233069342309_404418965952590855_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=RgcZJjsDznYAX8z8I7d&_nc_ht=scontent.fsgn5-11.fna&oh=7adb61cf34a3a80f2a8d55187cbd42b7&oe=619C89A0" alt="Thang Nguyen" />
                                            </div>
                                            <div className="comment-content">
                                                <div className="comment-user-name">

                                                    <a href="">Nguyễn Thắng</a>
                                                </div>
                                                <div className="comment-body">Bài học rất hay!!</div>
                                                <div className="comment-footer">
                                                    <span className="comment-vote">
                                                        <span className="upvote">
                                                            <a href="">
                                                                <i className="fas fa-arrow-up font-size-h5 fa-fw"></i>
                                                            </a>
                                                            <span>1025</span>
                                                        </span>
                                                        <span className="downvote">
                                                            <a href="">
                                                                <i className="fas fa-arrow-down font-size-h5 fa-fw"></i>
                                                            </a>
                                                            <span>0</span>
                                                        </span>
                                                    </span>
                                                    <span className="comment-repl">Trả lời</span>
                                                    <span className="comment-datetime">Hôm qua</span>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
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
            <Collapsible className="playlist-wrapper">
                <div className="playplist-wrapper-header">
                    <h2 className="wrapper-header-title">Phần 1: Giới thiệu</h2>
                    <p className="wrapper-header-detail">2/2 | 05:44</p>
                </div>
                <div className="playlist-wrapper-list">
                    <div className="playlist-wrapper-item learnt-item">
                        <div className="wrapper-icon-status">
                            <i className="fas fa-check"></i>
                            <i className="fas fa-lock"></i>

                        </div>
                        <div className="wrapper-item-info">
                            <p className="wrapper-item-title">1. Làm được gì sau khóa học?</p>
                            <div className="wrapper-item-detail">
                                <i className="far fa-play-circle"></i>
                                <span>03:15</span>
                            </div>
                        </div>
                    </div>
                    <div className="playlist-wrapper-item learnt-item">
                        <div className="wrapper-icon-status">
                            <i className="fas fa-check"></i>
                            <i className="fas fa-lock"></i>
                        </div>
                        <div className="wrapper-item-info">
                            <p className="wrapper-item-title">2. Bạn có phù hợp để học HTML, CSS?</p>
                            <div className="wrapper-item-detail">
                                <i className="far fa-play-circle"></i>
                                <span>03:15</span>
                            </div>
                        </div>
                    </div>
                    <div className="playlist-wrapper-item learnt-item">
                        <div className="wrapper-icon-status">
                            <i className="fas fa-check"></i>
                            <i className="fas fa-lock"></i>

                        </div>
                        <div className="wrapper-item-info">
                            <p className="wrapper-item-title">3. HTML, CSS là cái gì?</p>
                            <div className="wrapper-item-detail">
                                <i className="far fa-play-circle"></i>
                                <span>03:15</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Collapsible>

            <div className="playlist-wrapper">
                <div className="playplist-wrapper-header">
                    <h2 className="wrapper-header-title">Phần 2: Bí quyết kinh doanh</h2>
                    <p className="wrapper-header-detail">2/2 | 05:44</p>
                </div>
                <div className="playlist-wrapper-item learnt-item">
                    <div className="wrapper-icon-status">
                        <i className="fas fa-check"></i>
                        <i className="fas fa-lock"></i>

                    </div>
                    <div className="wrapper-item-info">
                        <p className="wrapper-item-title">4. Bán kem đánh răng hiệu quả</p>
                        <div className="wrapper-item-detail">
                            <i className="far fa-play-circle"></i>
                            <span>03:15</span>
                        </div>
                    </div>
                </div>
                <div className="playlist-wrapper-item learning-item">
                    <div className="wrapper-icon-status">
                        <i className="fas fa-check"></i>
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="wrapper-item-info">
                        <p className="wrapper-item-title">5. Nhạc Rasputin cực căng</p>
                        <div className="wrapper-item-detail">
                            <i className="far fa-play-circle"></i>
                            <span>03:15</span>
                        </div>
                    </div>
                </div>
                <div className="playlist-wrapper-item block-item">
                    <div className="wrapper-icon-status">
                        <i className="fas fa-check"></i>
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="wrapper-item-info">
                        <p className="wrapper-item-title">6. Bao nhiêu lâu nữa thì bán được 1 tỷ gói mè?</p>
                        <div className="wrapper-item-detail">
                            <i className="far fa-play-circle"></i>
                            <span>03:15</span>
                        </div>
                    </div>
                </div>
                <div className="playlist-wrapper-item block-item">
                    <div className="wrapper-icon-status">
                        <i className="fas fa-check"></i>
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="wrapper-item-info">
                        <p className="wrapper-item-title">7. Bao nhiêu lâu nữa thì bán được 1 tỷ gói mè?</p>
                        <div className="wrapper-item-detail">
                            <i className="far fa-play-circle"></i>
                            <span>03:15</span>
                        </div>
                    </div>
                </div>
                <div className="playlist-wrapper-item block-item">
                    <div className="wrapper-icon-status">
                        <i className="fas fa-check"></i>
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="wrapper-item-info">
                        <p className="wrapper-item-title">8. Bao nhiêu lâu nữa thì bán được 1 tỷ gói mè?</p>
                        <div className="wrapper-item-detail">
                            <i className="far fa-play-circle"></i>
                            <span>03:15</span>
                        </div>
                    </div>
                </div>
                <div className="playlist-wrapper-item block-item">
                    <div className="wrapper-icon-status">
                        <i className="fas fa-check"></i>
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="wrapper-item-info">
                        <p className="wrapper-item-title">9. Bao nhiêu lâu nữa thì bán được 1 tỷ gói mè?</p>
                        <div className="wrapper-item-detail">
                            <i className="far fa-play-circle"></i>
                            <span>03:15</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="playlist-wrapper">
                <div className="playplist-wrapper-header">
                    <h2 className="wrapper-header-title">Phần 3: Câu hỏi cần được trả lời</h2>
                    <p className="wrapper-header-detail">2/2 | 05:44</p>
                </div>
                <div className="playlist-wrapper-item block-item">
                    <div className="wrapper-icon-status">
                        <i className="fas fa-check"></i>
                        <i className="fas fa-lock"></i>

                    </div>
                    <div className="wrapper-item-info">
                        <p className="wrapper-item-title">10. Bao nhiêu lâu nữa thì bán được 1 tỷ gói mè?</p>
                        <div className="wrapper-item-detail">
                            <i className="far fa-play-circle"></i>
                            <span>03:15</span>
                        </div>
                    </div>
                </div>
                <div className="playlist-wrapper-item block-item">
                    <div className="wrapper-icon-status">
                        <i className="fas fa-check"></i>
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="wrapper-item-info">
                        <p className="wrapper-item-title">11. Bao nhiêu lâu nữa thì bán được 1 tỷ gói mè?</p>
                        <div className="wrapper-item-detail">
                            <i className="far fa-play-circle"></i>
                            <span>03:15</span>
                        </div>
                    </div>
                </div>
                <div className="playlist-wrapper-item block-item">
                    <div className="wrapper-icon-status">
                        <i className="fas fa-check"></i>
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="wrapper-item-info">
                        <p className="wrapper-item-title">12. Bao nhiêu lâu nữa thì bán được 1 tỷ gói mè?</p>
                        <div className="wrapper-item-detail">
                            <i className="far fa-play-circle"></i>
                            <span>03:15</span>
                        </div>
                    </div>
                </div>
                <div className="playlist-wrapper-item block-item">
                    <div className="wrapper-icon-status">
                        <i className="fas fa-check"></i>
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="wrapper-item-info">
                        <p className="wrapper-item-title">13. Bao nhiêu lâu nữa thì bán được 1 tỷ gói mè?</p>
                        <div className="wrapper-item-detail">
                            <i className="far fa-play-circle"></i>
                            <span>03:15</span>
                        </div>
                    </div>
                </div>
                <div className="playlist-wrapper-item block-item">
                    <div className="wrapper-icon-status">
                        <i className="fas fa-check"></i>
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="wrapper-item-info">
                        <p className="wrapper-item-title">14. Bao nhiêu lâu nữa thì bán được 1 tỷ gói mè?</p>
                        <div className="wrapper-item-detail">
                            <i className="far fa-play-circle"></i>
                            <span>03:15</span>
                        </div>
                    </div>
                </div>
                <div className="playlist-wrapper-item block-item">
                    <div className="wrapper-icon-status">
                        <i className="fas fa-check"></i>
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="wrapper-item-info">
                        <p className="wrapper-item-title">15. Bao nhiêu lâu nữa thì bán được 1 tỷ gói mè?</p>
                        <div className="wrapper-item-detail">
                            <i className="far fa-play-circle"></i>
                            <span>03:15</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}