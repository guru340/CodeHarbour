package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.Issue;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Request.IssueRequest;

import java.beans.ExceptionListener;
import java.util.List;
import java.util.Optional;

public interface IssueService {

    Issue getIssueById(Long issueId) throws Exception;

    List<Issue> getIssuedByProjectId(Long ProjectId) throws Exception;

    Issue createIssue(IssueRequest issueRequest, User user) throws Exception;

    void deleteIssue(Long issueId,Long userId) throws Exception;

    Issue addUserToIssue(Long issueId,Long userId) throws Exception;

    Issue updateStatus( Long Issueid,String status) throws Exception;
}
