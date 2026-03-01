package com.example.CodeHarbour.Repository;

import com.example.CodeHarbour.Model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionRepo extends JpaRepository<Subscription,Long> {
    Subscription findByUserId(Long userId);
}
