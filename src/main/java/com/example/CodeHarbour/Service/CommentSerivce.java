package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.Comments;

import java.util.List;

public interface CommentSerivce {

    Comments createComment(Long issueId,Long userId,String Comment) throws Exception;

    void deleteComment(Long commentId,Long userId) throws Exception;

    List<Comments> findCommentByIssueId(Long issueId);
}
