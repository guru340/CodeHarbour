package com.example.CodeHarbour.Controller;

import com.example.CodeHarbour.DTO.IssueDTO;
import com.example.CodeHarbour.Model.Issue;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Request.IssueRequest;
import com.example.CodeHarbour.Service.IssueService;
import com.example.CodeHarbour.Service.UserServices;
import com.example.CodeHarbour.authResponse.AuthResponse;
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

    // @GetMapping
    // public ResponseEntity<List<Issue>> getAllIssues() throws IssueException {
    //     List<Issue> issues = issueService.getAllIssues();
    //     return ResponseEntity.ok(issues);
    // }

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long issueId)
            throws Exception {

        return ResponseEntity.ok((Issue) issueService.getIssuedByProjectId(issueId));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> getIssueByProjectId(@PathVariable Long projectId)
            throws Exception {

        return ResponseEntity.ok((List<Issue>) issueService.getIssueById(projectId));
    }
    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(@RequestBody IssueRequest issue, @RequestHeader("Authorization")String jwt) throws Exception {
        System.out.println("issue---"+issue);
        User tokenUser=userService.findUserProfilebyjwt(jwt);
        User user=userService.findUserById(tokenUser.getId());


            Issue CreatedIssue=issueService.createIssue(issue,tokenUser);
            IssueDTO issueDTO=new IssueDTO();
            issueDTO.setDescription(CreatedIssue.getDescription());
            issueDTO.setTags(CreatedIssue.getTags());
            issueDTO.setTitle(CreatedIssue.getTitle());
            issueDTO.setUserDate(CreatedIssue.getUserDate());
            issueDTO.setProjectID(CreatedIssue.getProjectID());
            issueDTO.setPriority(CreatedIssue.getPriority());
            issueDTO.setStatus(CreatedIssue.getStatus());
            issueDTO.setId(CreatedIssue.getId());
            issueDTO.setAssignee(CreatedIssue.getAssignee());

            return ResponseEntity.ok(issueDTO);


    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<MessageResponse>deleteIssue(@PathVariable Long issueId,@RequestHeader("Authorization")String token)throws  Exception{
     User user =userService.findUserProfilebyjwt(token);
      issueService.deleteIssue(issueId,user.getId());

     MessageResponse auth=new MessageResponse();
     auth.setMessage("Issue Deleted");

     return ResponseEntity.ok(auth);
    }

    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(@PathVariable Long issueId,
                                                @PathVariable Long userId)throws Exception{
        Issue issue=issueService.addUserToIssue(issueId,userId);
        return ResponseEntity.ok(issue);
    }
    @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue> UpdateIssueStatus(@PathVariable String Status,@PathVariable Long issueId)throws Exception{
        Issue issues=issueService.updateStatus(issueId,Status);
        return ResponseEntity.ok(issues);

    }
}




