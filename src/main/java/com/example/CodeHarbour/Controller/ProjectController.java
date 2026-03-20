package com.example.CodeHarbour.Controller;

import com.example.CodeHarbour.Model.Chat;
import com.example.CodeHarbour.Model.Invitation;
import com.example.CodeHarbour.Model.Project;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Request.InviteRequest;
import com.example.CodeHarbour.Service.InvitationService;
import com.example.CodeHarbour.Service.ProjectServices;
import com.example.CodeHarbour.Service.UserServices;
import com.example.CodeHarbour.authResponse.MessageResponse;
import org.springframework.aop.target.LazyInitTargetSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectServices projectServices;

    @Autowired
    private UserServices userServices;

    @Autowired
    private InvitationService invitationService;

    @GetMapping
    public ResponseEntity<List<Project>>getprojects(
            @RequestParam(required = false)String category,
            @RequestParam(required = false)String tag,
            @RequestHeader("Authorization")String jwt
    ) throws Exception {
        User User=userServices.findUserProfilebyjwt(jwt);
        List<Project> projects=projectServices.getprojectbyTeam(User,category,tag);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project>getprojectById(
            @PathVariable Long projectId,
            @RequestHeader("Authorization")String jwt
    ) throws Exception {
        User User=userServices.findUserProfilebyjwt(jwt);
        Project projects=projectServices.getProjectbyId(projectId);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Project>createProject(

            @RequestHeader("Authorization")String jwt,
            @RequestBody Project project
    ) throws Exception {
        User User=userServices.findUserProfilebyjwt(jwt);
        Project projects=projectServices.createproject(project,User);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }


    @PatchMapping("/{projectId}")
    public ResponseEntity<Project>updatedProject(
            @PathVariable Long projectId,
            @RequestHeader("Authorization")String jwt,
            @RequestBody Project project
    ) throws Exception {
        User User=userServices.findUserProfilebyjwt(jwt);
        Project projects=projectServices.updateProject(project,projectId);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }


    @DeleteMapping("/{projectId}")
    public ResponseEntity<MessageResponse>deleteProject(
            @PathVariable Long projectId,
            @RequestHeader("Authorization")String jwt

    ) throws Exception {
        User User=userServices.findUserProfilebyjwt(jwt);
        projectServices.deleteProject(projectId,User.getId());
        MessageResponse messageResponse=new MessageResponse("Project Deleted SuccessFully");
        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Project>>searchprojects(
            @RequestParam(required = false)String keyword,

            @RequestHeader("Authorization")String jwt
    ) throws Exception {
        User User=userServices.findUserProfilebyjwt(jwt);
        List<Project> projects=projectServices.searchProject(keyword ,User);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }


    @GetMapping("/{projectId}/chat")
    public ResponseEntity<Chat>searchprojects(
            @PathVariable Long projectId,

            @RequestHeader("Authorization")String jwt
    ) throws Exception {
        User User=userServices.findUserProfilebyjwt(jwt);
        Chat projects=projectServices.getChatbyProject(projectId);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }


    @PostMapping("/invite")
    public ResponseEntity<MessageResponse>sendInvitation(
            @RequestBody InviteRequest req,
            @RequestHeader("Authorization")String jwt

    ) throws Exception {
        User User=userServices.findUserProfilebyjwt(jwt);
        invitationService.sendInvitation(req.getEmail(),req.getProjectId());
        MessageResponse messageResponse=new MessageResponse("User Invitation Sent");
        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }


    @GetMapping("/accept_invitation")
    public ResponseEntity<Invitation>AcceptInvitation(
            @RequestParam String token,
            @RequestHeader("Authorization")String jwt

    ) throws Exception {
        User User=userServices.findUserProfilebyjwt(jwt);
       Invitation invitation =invitationService.acceptInvitaion(token,User.getId());
       projectServices.addUserToProject(invitation.getProjectID(),User.getId());

        return new ResponseEntity<>(invitation, HttpStatus.ACCEPTED);
    }


}
