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
            $commentlist = Comment::where('LESSON_ID', $request->lesson_id)->where('PARENT_COMMENT_ID', null)->get();
            $ans = array();
            foreach ($commentlist as $comment) {
                $user = User::where('USER_ID', $comment->USER_ID)->first();
                $subcomments = Comment::where('PARENT_COMMENT_ID', $comment->COMMENT_ID)->get();
                $users_voted = Comment_Vote::where('COMMENT_ID', $comment->COMMENT_ID)->get('USER_ID');
                $ans2 = array();
                foreach ($subcomments as $subcomment) {
                    $sub_user = User::where('USER_ID', $subcomment->USER_ID)->first();
                    $users_sub_voted = Comment_Vote::where('COMMENT_ID', $subcomment->COMMENT_ID)->get('USER_ID');
                    $object = (object)[
                        'commentID' => $subcomment->COMMENT_ID,
                        'User' => $sub_user,
                        'Content' => $subcomment->CONTENT,
                        'ParentComment' => $subcomment->PARENT_COMMENT_ID,
                        'CommentTime' => $subcomment->COMMENT_TIME,
                        'UsersVoted'=>Comment_Vote::where('COMMENT_ID', $subcomment->COMMENT_ID)->get(),
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
                    'UsersVoted'=>Comment_Vote::where('COMMENT_ID', $comment->COMMENT_ID)->get(),
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
                'message' => $th->getMessage(),
            ]);
        }
    }
    public function VoteComment(Request $request)
    {
        try {
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
                if ($request->comment_state == -1) {
                    Comment_Vote::where('COMMENT_ID', $request->comment_id)->delete();
                } else {
                    Comment_Vote::updateOrInsert(['USER_ID' => $id, 'COMMENT_ID' => $request->comment_id], ['USER_ID' => $id, 'COMMENT_ID' => $request->comment_id, 'COMMENT_VOTE_STATE' => $request->comment_state]);
                }
                return response()->json([
                    'status' => 200,
                    'message' => 'Thành công',
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'Cookies het han',
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th->getMessage(),
            ]);
        }
    }
}
