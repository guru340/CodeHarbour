package com.example.CodeHarbour.Repository;

import com.example.CodeHarbour.Model.Project;
import com.example.CodeHarbour.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepo extends JpaRepository<Project,Long> {



    List<Project> findByNameContainingAndTeamContaining(String partialName,User user);



    List<Project> findByTeamContainingOrOwner(User user,User owner);
}
