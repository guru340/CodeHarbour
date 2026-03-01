package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.PlanType;
import com.example.CodeHarbour.Model.Subscription;
import com.example.CodeHarbour.Model.User;

public interface SubscriptionService {

    Subscription createSubscription(User user);

    Subscription getUsersSubscription(Long userId)throws Exception;

    Subscription upgradeSubscription (Long userId, PlanType planType);

    boolean isvalid(Subscription subscription);
}
