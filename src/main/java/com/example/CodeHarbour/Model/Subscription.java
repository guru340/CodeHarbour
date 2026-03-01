package com.example.CodeHarbour.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDate SubscriptionStartDate;
    private LocalDate SubscriptionEndDate;

    private PlanType planType;

    private boolean isValid;

    @OneToOne
    private User user;


}
