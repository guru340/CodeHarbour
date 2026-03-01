package com.example.CodeHarbour.Repository;

import com.example.CodeHarbour.Model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<Comments,Long> {
    List<Comments> findByIssueId(Long IssueId);
}
