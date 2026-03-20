package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.Chat;
import com.example.CodeHarbour.Model.Project;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Repository.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectImpl implements ProjectServices {

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private UserServices userServices;
    @Autowired
    private ChatService chatService;

    @Override
    public Project createproject(Project project, User user) throws Exception {
        Project createdProject=new Project();
        createdProject.setOwner(user);
        createdProject.setTags(project.getTags());
        createdProject.setName(project.getName());
        createdProject.setCategory(project.getCategory());
        createdProject.setDescription(project.getDescription());
        createdProject.getTeam().add(user);

        Project savedProject=projectRepo.save(createdProject);

        Chat chat=new Chat() ;
        chat.setProject(savedProject);

        Chat projectchat=chatService.createChat(chat);
        projectchat.setProject(savedProject);
        return savedProject;
    }

    @Override
    public List<Project> getprojectbyTeam(User user, String category, String tag) throws Exception {
        List<Project> projects=projectRepo.findByTeamContainingOrOwner(user ,user);
        if (category!=null){
            projects=projects.stream().filter(project -> project.getCategory().equals(category))
                    .collect(Collectors.toList());
        }
        if (tag!=null){
            projects=projects.stream().filter(project -> project.getTags().equals(tag))
                    .collect(Collectors.toList());
        }


        return projects;
    }

    @Override
    public Project getProjectbyId(Long ProjectId) throws Exception {
        Optional<Project>  optionalProject=projectRepo.findById(ProjectId);
        if (optionalProject.isEmpty()){
            throw new Exception("project not found");
        }
        return optionalProject.get();
    }

    @Override
    public void deleteProject(Long ProjectId, Long UserId) throws Exception {
            getProjectbyId(ProjectId);
            projectRepo.deleteById(ProjectId);
    }

    @Override
    public Project updateProject(Project updateProject, Long id) throws Exception {
        Project project=getProjectbyId(id);
        project.setName(updateProject.getName());
        project.setDescription(updateProject.getDescription());
        project.setTags(updateProject.getTags());
        return projectRepo.save(project);
    }

    @Override
    public void addUserToProject(Long projectId, Long userId) throws Exception {
        Project project=getProjectbyId(projectId);
       User user=userServices.findUserById(userId);
       if (!project.getTeam().contains(user)){
           project.getChat().getUsers().add(user);
           project.getTeam().add(user);
       }

       projectRepo.save(project);
    }

    @Override
    public void removeUserFromProject(Long projectId, Long userId) throws Exception {
            Project project=getProjectbyId(projectId);
            User user=userServices.findUserById(userId);
            if (project.getTeam().contains(user)){
                project.getChat().getUsers().remove(user);
                project.getTeam().remove(user);
            }
            projectRepo.save(project);
    }

    @Override
    public Chat getChatbyProject(Long ProjectId) throws Exception {
        Project project=getProjectbyId(ProjectId);
        return project.getChat();
    }

    @Override
    public List<Project> searchProject(String keyword, User user) throws Exception {

        String partialName="%" + keyword + "%";
        return projectRepo.findByNameContainingAndTeamContaining(keyword,user);

    }
}
