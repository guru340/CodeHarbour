package com.example.CodeHarbour.Controller;

import com.example.CodeHarbour.DTO.IssueDTO;
import com.example.CodeHarbour.Model.Issue;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Request.IssueRequest;
import com.example.CodeHarbour.Service.IssueService;
import com.example.CodeHarbour.Service.UserServices;
import com.example.CodeHarbour.authResponse.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private UserServices userService;

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long issueId)
            throws Exception {
        return ResponseEntity.ok((Issue) issueService.getIssueById(issueId));
    }


    @GetMapping
    public ResponseEntity<List<Issue>> getIssueByProjectId(
            @RequestParam Long projectId) throws Exception {
        return ResponseEntity.ok((List<Issue>) issueService.getIssuedByProjectId(projectId));
    }

    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(
            @RequestBody IssueRequest issue,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User tokenUser = userService.findUserProfilebyjwt(jwt);

        Issue createdIssue = issueService.createIssue(issue, tokenUser);

        IssueDTO issueDTO = new IssueDTO();
        issueDTO.setDescription(createdIssue.getDescription());
        issueDTO.setTags(createdIssue.getTags());
        issueDTO.setTitle(createdIssue.getTitle());
        issueDTO.setUserDate(createdIssue.getUserDate());
        issueDTO.setProjectId(createdIssue.getProjectID());
        issueDTO.setPriority(createdIssue.getPriority());
        issueDTO.setStatus(createdIssue.getStatus());
        issueDTO.setId(createdIssue.getId());
        issueDTO.setAssignee(createdIssue.getAssignee());

        return ResponseEntity.ok(issueDTO);
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<MessageResponse> deleteIssue(
            @PathVariable Long issueId,
            @RequestHeader("Authorization") String token) throws Exception {

        User user = userService.findUserProfilebyjwt(token);
        issueService.deleteIssue(issueId, user.getId());

        MessageResponse response = new MessageResponse();
        response.setMessage("Issue Deleted");

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(
            @PathVariable Long issueId,
            @PathVariable Long userId) throws Exception {

        Issue issue = issueService.addUserToIssue(issueId, userId);
        return ResponseEntity.ok(issue);
    }

    @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue> updateIssueStatus(
            @PathVariable Long issueId,
            @PathVariable String status) throws Exception {  // ✅ lowercase 'status'

        Issue issue = issueService.updateStatus(issueId, status);
        return ResponseEntity.ok(issue);
    }
}