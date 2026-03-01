package com.example.CodeHarbour.Controller;

import com.example.CodeHarbour.Model.PlanType;
import com.example.CodeHarbour.Model.Subscription;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Service.SubscriptionService;
import com.example.CodeHarbour.Service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private UserServices userServices;

    @GetMapping("/user")
    public ResponseEntity<Subscription> getUserSubscription(
            @RequestHeader("Authorization")String jwt)throws Exception{
        User user=userServices.findUserProfilebyjwt(jwt);

        Subscription subscription=subscriptionService.getUsersSubscription(user.getId());

        return new ResponseEntity<>(subscription, HttpStatus.OK);
    }

    @PatchMapping("/upgrade")
    public ResponseEntity<Subscription> upgradesubscripton(
            @RequestHeader("Authorization")String jwt,
            @RequestParam PlanType planType
            )throws Exception{

        User user=userServices.findUserProfilebyjwt(jwt);
        Subscription subscription=subscriptionService.upgradeSubscription(user.getId(), planType);
        return new ResponseEntity<>(subscription,HttpStatus.OK);
    }


}
