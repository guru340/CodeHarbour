package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.Issue;
import com.example.CodeHarbour.Model.Project;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Repository.IssueRepo;
import com.example.CodeHarbour.Request.IssueRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueServiceImpl implements IssueService{



    @Autowired
    private IssueRepo issueRepo;
    @Autowired
    private ProjectServices projectServices;
    @Autowired
    private UserServices userServices;

    @Override
    public Issue getIssueById(Long issueId) throws Exception {
        Optional<Issue> issue=issueRepo.findById(issueId);
        if (issue.isPresent()) {
            return issue.get();
        }
        throw new Exception("No issues found with issueid"+issueId);
    }

    @Override
    public List<Issue> getIssuedByProjectId(Long ProjectId) throws Exception {
        return issueRepo.findByProjectId(ProjectId);
    }

    @Override
    public Issue createIssue(IssueRequest issueRequest, User user) throws Exception {
        Project project=projectServices.getProjectbyId(issueRequest.getProjectID());

        Issue issue=new Issue();
        issue.setTitle(issueRequest.getTitle());
        issue.setDescription(issueRequest.getDescription());
        issue.setProjectID(issueRequest.getProjectID());
        issue.setStatus(issueRequest.getStatus());
        issue.setUserDate(issueRequest.getUserDate());

        issue.setProject(project);
        return issueRepo.save(issue);


    }

    @Override
    public void deleteIssue(Long issueId, Long userId) throws Exception {
        getIssueById(userId);
        issueRepo.deleteById(issueId);
    }

    @Override
    public Issue addUserToIssue(Long issueId, Long userId) throws Exception {
        User user=userServices.findUserById(userId);
        Issue issue=getIssueById(issueId);
        issue.setAssignee(user);
        return issueRepo.save(issue);
    }

    @Override
    public Issue updateStatus(Long Issueid, String status) throws Exception {
       Issue issue=getIssueById(Issueid);
       issue.setStatus(status);
       return issueRepo.save(issue);
    }
}
