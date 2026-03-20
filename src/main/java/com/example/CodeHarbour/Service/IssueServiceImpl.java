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
public class IssueServiceImpl implements IssueService {

    @Autowired
    private IssueRepo issueRepo;

    @Autowired
    private ProjectServices projectServices;

    @Autowired
    private UserServices userServices;

    @Override
    public Issue getIssueById(Long issueId) throws Exception {
        Optional<Issue> issue = issueRepo.findById(issueId);
        if (issue.isPresent()) {
            return issue.get();
        }
        throw new Exception("No issue found with id: " + issueId);
    }

    @Override
    public List<Issue> getIssuedByProjectId(Long projectId) throws Exception {
        return issueRepo.findByProjectId(projectId);
    }

    @Override
    public Issue createIssue(IssueRequest issueRequest, User user) throws Exception {
        System.out.println("projectId: " + issueRequest.getProjectId());  // ✅ add this
        System.out.println("title: " + issueRequest.getTitle());
        Project project = projectServices.getProjectbyId(issueRequest.getProjectId());

        Issue issue = new Issue();
        issue.setTitle(issueRequest.getTitle());
        issue.setDescription(issueRequest.getDescription());
        issue.setStatus(issueRequest.getStatus() != null ? issueRequest.getStatus() : "PENDING");
        issue.setProjectID(issueRequest.getProjectId());
        issue.setProject(project);
        issue.setPriority(issueRequest.getPriority() != null ? issueRequest.getPriority() : "MEDIUM");
        issue.setAssignee(user);

        return issueRepo.save(issue);
    }

    @Override
    public void deleteIssue(Long issueId, Long userId) throws Exception {
        getIssueById(issueId);
        issueRepo.deleteById(issueId);
    }

    @Override
    public Issue addUserToIssue(Long issueId, Long userId) throws Exception {
        User user = userServices.findUserById(userId);
        Issue issue = getIssueById(issueId);
        issue.setAssignee(user);
        return issueRepo.save(issue);
    }

    @Override
    public Issue updateStatus(Long issueId, String status) throws Exception {
        Issue issue = getIssueById(issueId);
        issue.setStatus(status);
        return issueRepo.save(issue);
    }
}