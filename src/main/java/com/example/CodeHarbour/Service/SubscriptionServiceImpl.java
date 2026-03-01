package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.PlanType;
import com.example.CodeHarbour.Model.Subscription;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Repository.SubscriptionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class SubscriptionServiceImpl implements SubscriptionService{

    @Autowired
    private UserServices userServices;

    @Autowired
    private SubscriptionRepo subscriptionRepo;


    @Override
    public Subscription createSubscription(User user) {
        Subscription subscription=new Subscription();
        subscription.setUser(user);
        subscription.setSubscriptionStartDate(LocalDate.now());
        subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
        subscription.setValid(true);
        subscription.setPlanType(PlanType.FREE);

        return subscriptionRepo.save(subscription);

    }

    @Override
    public Subscription getUsersSubscription(Long userId) throws Exception {
       Subscription subscription=subscriptionRepo.findByUserId(userId);
       if(!isvalid(subscription)) {
           subscription.setPlanType(PlanType.FREE);
           subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
           subscription.setSubscriptionStartDate(LocalDate.now());
       }
       return subscriptionRepo.save(subscription);
    }

    @Override
    public Subscription upgradeSubscription(Long userId, PlanType planType) {
        Subscription subscription=subscriptionRepo.findByUserId(userId);
        subscription.setPlanType(planType);
        subscription.setSubscriptionStartDate(LocalDate.now());
        if (planType.equals(PlanType.YEARLY)){
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
        }else{
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(1));
        }
        return subscriptionRepo.save(subscription);
    }

    @Override
    public boolean isvalid(Subscription subscription) {
        if(subscription.getPlanType().equals(PlanType.FREE)){
            return true;
        }
        LocalDate endDate=subscription.getSubscriptionEndDate();
        LocalDate currentDate=LocalDate.now();

        return endDate.isAfter(currentDate)||endDate.isEqual(currentDate);

    }
}
