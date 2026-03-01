package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.Chat;
import com.example.CodeHarbour.Model.Project;
import com.example.CodeHarbour.Model.User;

import java.util.List;

public interface ProjectServices {
    Project createproject(Project project, User user) throws Exception;

    List<Project> getprojectbyTeam(User user, String category, String tag) throws Exception;

    Project getProjectbyId(Long ProjectId)throws Exception;

    void deleteProject(Long ProjectId,Long UserId) throws Exception;

    Project updateProject(Project updateProject,Long id)throws Exception;

    void addUserToProject(Long projectId,Long userId) throws Exception;

    void removeUserFromProject(Long projectId,Long userId)throws Exception;

    Chat getChatbyProject(Long ProjectId) throws Exception;

    List<Project> searchProject(String keyword,User user) throws Exception;
}
