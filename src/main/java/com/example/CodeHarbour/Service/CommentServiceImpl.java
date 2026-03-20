package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.Comments;
import com.example.CodeHarbour.Model.Issue;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Repository.CommentRepo;
import com.example.CodeHarbour.Repository.IssueRepo;
import com.example.CodeHarbour.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentSerivce {
    @Autowired
    private IssueRepo issueRepo;
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private UserRepo userRepo;

    @Override
    public Comments createComment(Long issueId, Long userId, String content) throws Exception {
        Optional<Issue> issueOptional=issueRepo.findById(issueId);
        Optional<User> userOptional=userRepo.findById(userId);

        if (issueOptional.isEmpty()){
            throw new Exception("User not Found with id"+issueId);

        }
        if(userOptional.isEmpty()){
            throw new Exception("user not found with id"+userId);
        }
        Issue issue=issueOptional.get();
        User user=userOptional.get();

        Comments comments=new Comments();
        comments.setIssue(issue);
        comments.setUser(user);
        comments.setContent(content);
        comments.setCreatedDatetime(LocalDateTime.now());

        Comments savedComment=commentRepo.save(comments);

        issue.getComments().add(savedComment);

        return savedComment;

    }

    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {
        Optional<Comments> commentsOptional=commentRepo.findById(commentId);
        Optional<User> userOptional=userRepo.findById(userId);

        if (commentsOptional.isEmpty()){
            throw new Exception("User not Found with id"+commentId);

        }
        if(userOptional.isEmpty()){
            throw new Exception("user not found with id"+userId);
        }
        Comments comments=commentsOptional.get();
        User user=userOptional.get();

        if (comments.getUser().equals(user)){
            commentRepo.delete(comments);
        } else{
            throw new Exception("User does not have permission to delete this comment!");
        }

    }

    @Override
    public List<Comments> findCommentByIssueId(Long issueId) {
        return commentRepo.findByIssueId(issueId);
    }
}
