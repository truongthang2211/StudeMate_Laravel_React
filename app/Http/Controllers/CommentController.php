<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Comment_Vote;
use App\Models\User;

class CommentController extends Controller
{
    //
    public function GetListCommentByLesson(Request $request)
    {
        try {
            $commentlist = Comment::where('LESSON_ID', $request->lesson_id)->where('PARENT_COMMENT_ID',null)->get();
            $ans = array();

            foreach ($commentlist as $comment) {
                $user = User::where('USER_ID', $comment->USER_ID)->first();
                $subcomments = Comment::where('PARENT_COMMENT_ID', $comment->COMMENT_ID)->get();
                $comment_vote = Comment_Vote::where('COMMENT_ID', $comment->COMMENT_ID);
                $ans2 = array();
                foreach ($subcomments as $subcomment) {
                    $sub_comment_vote = Comment_Vote::where('COMMENT_ID', $subcomment->COMMENT_ID);
                    $sub_user = User::where('USER_ID', $subcomment->USER_ID)->first();
                    $object = (object)[
                        'commentID' => $subcomment->COMMENT_ID,
                        'User' => $sub_user,
                        'Content' => $subcomment->CONTENT,
                        'ParentComment' => $subcomment->PARENT_COMMENT_ID,
                        'CommentTime' => $subcomment->COMMENT_TIME,
                        'UpVote' => $sub_comment_vote->where('COMMENT_VOTE_STATE', 1)->count(),
                        'DownVote' => $sub_comment_vote->where('COMMENT_VOTE_STATE', 0)->count(),
                    ];
                    array_push($ans2, $object);
                }
                $object = (object)[
                    'commentID' => $comment->COMMENT_ID,
                    'User' => $user,
                    'Content' => $comment->CONTENT,
                    'ParentComment' => $comment->PARENT_COMMENT_ID,
                    'CommentTime' => $comment->COMMENT_TIME,
                    'SubComments' => $ans2,
                    'UpVote' => $comment_vote->where('COMMENT_VOTE_STATE', 1)->count(),
                    'DownVote' => $comment_vote->where('COMMENT_VOTE_STATE', 0)->count(),
                ];
                array_push($ans, $object);
            }
            return response()->json([
                'status' => 200,
                'message' => $ans,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th,
            ]);
        }
    }
    public function AddComment(Request $request)
    {
        try {
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
                $comment = new Comment();
                $comment->USER_ID = $id;
                $comment->LESSON_ID = $request->lesson_id;
                $comment->content = $request->content;
                $comment->PARENT_COMMENT_ID = $request->parent_comment_id;
                $comment->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Thêm comment thành công',
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'Cookies het han',
                    'user' => null
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th,
            ]);
        }
    }
}
