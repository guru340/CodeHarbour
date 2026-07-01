package com.example.CodeHarbour.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String title;
    private String description;
    private String status;
    private Long ProjectID;
    private String priority;
    private LocalDate userDate;
    @ElementCollection
    private List<String> tags=new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @ManyToOne
    private Project project;

    @JsonIgnore
    @OneToMany(mappedBy = "issue",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Comments> comments=new ArrayList<>();
}
